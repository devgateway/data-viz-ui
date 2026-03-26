import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";
import { decode, parse, compareJsonProps } from "../utils/index.js";
import Map from "./Map"
import BaseLayer from './BaseLayer'
import DataLayer from './DataLayer'
import LatLongLayer from './LatLongLayer'
import ZoomControl from "./ZoomControl";
import ProjectedContainer from "./ProjectedContainer";
import Legends from "./Legends"
import FlowLayer from "./FlowLayer";


const MEASURABLE_LAYER_TYPES = new Set(['data', 'flow', 'dataPoints']);

const humanizeMeasureName = (measureName) => {
    const tokenLabels = {
        avg: 'Average',
        ha: 'Hectares',
        pct: 'Percent',
        perc: 'Percent',
        prod: 'Production',
        qty: 'Quantity',
    };

    return measureName
        ?.toString()
        .split('_')
        .filter(Boolean)
        .map((token) => {
            const normalizedToken = token.toLowerCase();
            return tokenLabels[normalizedToken] || `${normalizedToken.charAt(0).toUpperCase()}${normalizedToken.slice(1)}`;
        })
        .join(' ');
};

const getLayerMeasures = (layer) => Array.isArray(layer?.measures) ? layer.measures.filter(Boolean) : [];


const MapWrapper = (props) => {
    const {
        unique,
        editing,
        "data-identifier": identifier,
        "data-group": group,
        "data-layers": dataLayers = '[]',
        "data-height": dataHeight = 400,
        "data-width": dataWidth = 1000,
        "data-back-ground-color": bgColorParam = '#88e8dc',
        "data-map-position": dataMapPosition = '{}',
        "data-projection": projectionName = "geoMercator",
        "data-zoom-enabled": zoomEnabled = true,
        "data-rotation-enabled": rotationEnabled = false,
        "data-enable-measure-selector": enableMeasureSelector = false,
        "data-measure-selector-label": measureSelectorLabel = 'Measure',
        "data-measure-selector-default-measure": defaultMeasure = '',
        "data-wait-for-filters": waitForFilters = "false",
        intl
    } = props

    // Measure the real container width so every child uses fluid dimensions
    const [containerWidth, setContainerWidth] = useState(null);

    const width = containerWidth;

    const [paramMapPosition, setParamMapPosition] = useState(parse(dataMapPosition, editing), [])

    const [layers, setLayers] = useState(parse(dataLayers), [])
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        // Measure synchronously on mount to avoid placeholder flash
        const w = ref.current.clientWidth;
        if (w > 0) setContainerWidth(w);

        // Coalesce resize events to one redraw per animation frame (~60fps max)
        let rafId = null;
        const measure = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                if (!ref.current) return;
                const w = ref.current.clientWidth;
                if (w > 0) setContainerWidth(w);
            });
        };

        const ro = new ResizeObserver(measure);
        ro.observe(ref.current);

        return () => {
            ro.disconnect();
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []); // run once – the observer handles subsequent changes
    const zoomRef = useRef(null);
    const [transform, setTransform] = useState(null)

    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedPoint, setSelectedPoint] = useState(null)
    const selectorEnabled = enableMeasureSelector == true || enableMeasureSelector == "true";
    const decodedMeasureSelectorLabel = decode(measureSelectorLabel || '');
    const normalizedMeasureSelectorLabel = typeof decodedMeasureSelectorLabel === 'string'
        ? decodedMeasureSelectorLabel.trim()
        : '';
    const effectiveMeasureSelectorLabel = normalizedMeasureSelectorLabel || (selectorEnabled ? 'Measure' : '');

    const selectorEligibleLayers = layers.filter((layer) => {
        return MEASURABLE_LAYER_TYPES.has(layer?.type) && getLayerMeasures(layer).length > 1;
    });

    const commonSelectableMeasures = selectorEligibleLayers.reduce((commonMeasures, layer, index) => {
        const layerMeasures = getLayerMeasures(layer);
        if (index === 0) {
            return [...layerMeasures];
        }

        return commonMeasures.filter((measure) => layerMeasures.includes(measure));
    }, []);

    const measureLabelMap = selectorEligibleLayers.reduce((labels, layer) => {
        const customLabels = layer?.customMeasuresLabels || {};
        getLayerMeasures(layer).forEach((measureName) => {
            const configuredLabel = customLabels?.[measureName];
            if (!labels[measureName] && configuredLabel && configuredLabel.toString().trim().length > 0) {
                labels[measureName] = configuredLabel;
            }
        });

        return labels;
    }, {});

    const measureSelectorOptions = commonSelectableMeasures.map((measureName) => ({
        value: measureName,
        label: measureLabelMap[measureName] || humanizeMeasureName(measureName) || measureName,
    }));
    const showMeasureSelector = selectorEnabled && measureSelectorOptions.length > 1;
    const measureSelectorOptionsKey = measureSelectorOptions.map((option) => option.value).join('|');
    const [activeMeasure, setActiveMeasure] = useState(measureSelectorOptions[0]?.value || '');

    useEffect(() => {
        if (measureSelectorOptions.length === 0) {
            if (activeMeasure !== '') {
                setActiveMeasure('');
            }
            return;
        }

        const preferredMeasure = defaultMeasure && measureSelectorOptions.some((option) => option.value === defaultMeasure)
            ? defaultMeasure
            : measureSelectorOptions[0].value;

        if (!measureSelectorOptions.some((option) => option.value === activeMeasure)) {
            setActiveMeasure(preferredMeasure);
        }
    }, [activeMeasure, defaultMeasure, measureSelectorOptionsKey]);

    useEffect(() => {
        if (defaultMeasure && measureSelectorOptions.some((option) => option.value === defaultMeasure)) {
            setActiveMeasure(defaultMeasure);
        }
    }, [defaultMeasure, measureSelectorOptionsKey]);

    const renderedLayers = layers.map((layer) => {
        const layerMeasures = getLayerMeasures(layer);
        if (!showMeasureSelector || !activeMeasure || layerMeasures.length === 0 || !layerMeasures.includes(activeMeasure)) {
            return layer;
        }

        return {
            ...layer,
            measures: [activeMeasure],
        };
    });
    const measureSelectorHeight = showMeasureSelector ? 48 : 0;
    const height = Math.max(Number(dataHeight) - measureSelectorHeight, 120);

    useEffect(() => {
        const newPosition = parse(dataMapPosition, editing)
        if (!compareJsonProps(paramMapPosition, newPosition)) {
            setParamMapPosition(newPosition)
        }
    }, [dataMapPosition])

    useEffect(() => {
        const newLayers = parse(dataLayers)
        if (!compareJsonProps(layers, newLayers)) {
            setLayers(newLayers)
        }
    }, [dataLayers])

    const toggleLayerView = (id) => {
        const newLayers = layers.slice()
        const ly = newLayers.find(l => l.id == id);
        if (ly) {
            ly.visible = !ly.visible
        }
        setLayers(newLayers)
    }

    const togglePatterns = (id) => {
        const newLayers = layers.slice()
        const ly = newLayers.find(l => l.id == id);

        if (ly) {
            ly.patternsVisible = ly.patternsVisible == null ? false : !ly.patternsVisible;
        }

        setLayers(newLayers)
    }

    const zoomToPoint = (xy) => {
        setSelectedPoint(xy)
    }

    const toggleColorLayer = (id) => {
        const newLayers = layers.slice()
        const ly = newLayers.find(l => l.id == id);

        if (ly) {
            ly.colorLayerVisible = ly.colorLayerVisible == null ? false : !ly.colorLayerVisible;
        }

        setLayers(newLayers)
    }
    const [readyToZoom, setReadyToZoom] = useState(false);
    const readyLayersCount = useRef(0);
    const totalLayers = layers.length;
    const handleLayerReady = () => {
        readyLayersCount.current += 1;
        if (readyLayersCount.current >= layers.length) {
            setReadyToZoom(true);
        }
    }

    // Don't render until we have a real measured width to avoid
    // building the D3 projection against the wrong number.
    if (!containerWidth) {
        return <div ref={ref} className={"d3map-container"} style={{ width: '100%', height: `${dataHeight}px` }} />;
    }

    return (
        <div ref={ref} className={"d3map-container"} style={{ width: '100%', height: `${dataHeight}px` }}>
            {showMeasureSelector && (
                <div className={"chart-measure-selector-row"}>
                    <div className={"chart-measure-selector-control"}>
                        {effectiveMeasureSelectorLabel !== '' && (
                            <label
                                className={"chart-measure-selector-label"}
                                htmlFor={`${unique || group || 'd3map'}-measure-selector`}
                            >
                                {effectiveMeasureSelectorLabel}
                            </label>
                        )}
                        <div className={"chart-measure-selector-input-wrap"}>
                            <select
                                className={"chart-measure-selector-select"}
                                id={`${unique || group || 'd3map'}-measure-selector`}
                                aria-label={
                                    effectiveMeasureSelectorLabel ||
                                    ((intl?.formatMessage && intl.formatMessage({
                                        id: 'd3map.measureSelector.ariaLabel',
                                        defaultMessage: 'Select measure',
                                    })) || 'Select measure')
                                }
                                onChange={(event) => setActiveMeasure(event.target.value)}
                                value={activeMeasure}
                            >
                                {measureSelectorOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
            <div
                className={`d3map-body${showMeasureSelector ? ' has-measure-selector' : ''}`}
                style={{
                    height: `${dataHeight}px`,
                    paddingTop: showMeasureSelector ? `${measureSelectorHeight}px` : 0,
                    boxSizing: 'border-box',
                }}>
                <ProjectedContainer
                    backgroundColor={decode(bgColorParam)}
                    height={height}
                    width={width}
                    projectionName={projectionName}
                    editing={editing}
                    initialPosition={paramMapPosition}>

                <Map rotationEnabled={parse(rotationEnabled, editing)}>
                    {renderedLayers.map((layer, i) => {


                        if (layer.type === 'base') {
                            return <BaseLayer
                                minLabelZoomVisible={layer.minLabelZoomVisible}
                                onReady={handleLayerReady}
                                transform={transform} intl={intl} zoom={zoomRef} unique={unique}
                                key={layer.id} {...layer} />
                        }
                        if (layer.type === 'data') {
                            return <DataLayer
                                minLabelZoomVisible={layer.minLabelZoomVisible}
                                editing={editing}
                                onLayerCreated={e => {

                                }}
                                onReady={handleLayerReady}
                                transform={transform}
                                intl={intl}
                                group={group} zoom={zoomRef}
                                unique={unique}
                                key={layer.id} {...layer}
                                settings={props.wordress}
                                togglePatterns={togglePatterns}
                                initialPosition={paramMapPosition}
                                waitForFilters={waitForFilters == "true" || waitForFilters == true}
                            />

                        }
                        if (layer.type === 'flow') {
                            return <FlowLayer

                                onReady={handleLayerReady}
                                transform={transform} intl={intl} group={group} zoom={zoomRef}
                                unique={unique}
                                key={layer.id} {...layer}
                                waitForFilters={waitForFilters == "true" || waitForFilters == true}
                            />
                        }
                        if (layer.type === 'dataPoints') {
                            return <LatLongLayer
                                onReady={handleLayerReady}
                                onZoomToPoint={zoomToPoint} selectedItem={selectedItem}
                                transform={transform} intl={intl}
                                group={group} zoom={zoomRef}
                                unique={unique}
                                key={layer.id} {...layer}
                                waitForFilters={waitForFilters == "true" || waitForFilters == true}
                            />
                        }

                    })}


                </Map>

                <Legends selectedItem={selectedItem}
                    unique={unique}
                    d2Click={e => setSelectedItem(e)} patternsData={null}
                    layers={renderedLayers} group={group}
                    onItemClick={toggleLayerView} toggleColorLayer={toggleColorLayer}></Legends>


                <ZoomControl
                    readyToZoom={readyToZoom}
                    selectedPoint={selectedPoint}
                    rootationEmabled={parse(rotationEnabled, editing)}
                    zoomEnabled={parse(zoomEnabled, editing)} onZoomed={setTransform} width={width}
                    height={height} ref={zoomRef} group={group} identifier={identifier}
                    editing={editing} />

                </ProjectedContainer>
            </div>

        </div>
    );

}


const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(MapWrapper)
