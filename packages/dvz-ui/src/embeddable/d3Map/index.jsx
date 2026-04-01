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
import MeasureSelector from "../MeasureSelector";

const SELECTABLE_LAYER_TYPES = ['data', 'dataPoints', 'flow'];

const getLayerMeasures = (layer) => {
    if (!layer || !layer.measures || !Array.isArray(layer.measures)) {
        return [];
    }

    return [...new Set(layer.measures.filter(Boolean))];
}

const getSharedMeasures = (layers = []) => {
    const layerMeasures = layers
        .filter(layer => SELECTABLE_LAYER_TYPES.includes(layer.type))
        .map(getLayerMeasures)
        .filter(measures => measures.length > 0);

    if (layerMeasures.length === 0) {
        return [];
    }

    return layerMeasures.slice(1).reduce((shared, measures) => {
        return shared.filter(measure => measures.includes(measure));
    }, [...layerMeasures[0]]);
}

const getMeasureLabel = (layers = [], measure) => {
    if (!measure) {
        return '';
    }

    const layerWithMeasure = layers.find(layer => getLayerMeasures(layer).includes(measure));
    const customLabel = layerWithMeasure?.customMeasuresLabels?.[measure];

    return customLabel && customLabel.toString().trim().length > 0 ? customLabel : measure;
}


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
        "data-measure-selector-label": measureSelectorLabel = "Measure",
        "data-measure-selector-default-measure": defaultMeasure = "",
        "data-wait-for-filters": waitForFilters = "false",
        intl
    } = props

    // Measure the real container width so every child uses fluid dimensions
    const [containerWidth, setContainerWidth] = useState(null);

    // Preserve the aspect ratio defined by the data-width / data-height attributes
    const aspectRatio = Number(dataHeight) / Number(dataWidth);
    const width = containerWidth;
    const height = Number(dataHeight);
    //containerWidth ? Math.round(containerWidth * aspectRatio) :

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
    const [selectedMeasure, setSelectedMeasure] = useState(null)

    const selectorEnabled = enableMeasureSelector == true || enableMeasureSelector == "true";
    const availableMeasures = getSharedMeasures(layers);
    const selectorOptions = availableMeasures.map(measure => ({
        value: measure,
        label: getMeasureLabel(layers, measure)
    }));

    useEffect(() => {
        if (!selectorEnabled || availableMeasures.length <= 1) {
            setSelectedMeasure(null)
            return
        }

        const nextMeasure = availableMeasures.includes(defaultMeasure)
            ? defaultMeasure
            : availableMeasures[0]

        setSelectedMeasure(previousMeasure => {
            return availableMeasures.includes(previousMeasure) ? previousMeasure : nextMeasure
        })
    }, [selectorEnabled, defaultMeasure, availableMeasures])

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
        <div ref={ref} className={"d3map-container"} style={{ width: '100%' }}>
            {selectorEnabled && availableMeasures.length > 1 && (
                <MeasureSelector
                    label={decode(measureSelectorLabel) || "Measure"}
                    options={selectorOptions}
                    value={selectedMeasure || availableMeasures[0] || ""}
                    onChange={setSelectedMeasure}
                />
            )}
            <ProjectedContainer
                backgroundColor={decode(bgColorParam)}
                height={height}
                width={width}
                projectionName={projectionName}
                editing={editing}
                initialPosition={paramMapPosition}>

                <Map rotationEnabled={parse(rotationEnabled, editing)}>
                    {layers.map((layer, i) => {


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
                                selectedMeasure={selectedMeasure}
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
                                selectedMeasure={selectedMeasure}
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
                                selectedMeasure={selectedMeasure}
                                key={layer.id} {...layer}
                                waitForFilters={waitForFilters == "true" || waitForFilters == true}
                            />
                        }

                    })}


                </Map>

                <Legends selectedItem={selectedItem}
                    selectedMeasure={selectedMeasure}
                    unique={unique}
                    d2Click={e => setSelectedItem(e)} patternsData={null}
                    layers={layers} group={group}
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
    );

}


const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(MapWrapper)
