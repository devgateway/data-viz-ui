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
import TileBasemapLayer from "./TileBasemapLayer";
import PixelLayer from "./PixelLayer";
import MeasureSelector from "../MeasureSelector";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

const SELECTABLE_LAYER_TYPES = ['data', 'dataPoints', 'flow', 'pixelGrid'];
// Only these layers currently emit `onReady` reliably.
const READY_SIGNAL_LAYER_TYPES = ['base', 'data', 'pixelGrid', 'tileBasemap'];
const DATA_LOADING_LAYER_TYPES = ['data', 'flow', 'dataPoints', 'pixelGrid'];

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
    const readySignalLayerIds = layers
        .filter((layer) => {
            if (layer?.id == null || !READY_SIGNAL_LAYER_TYPES.includes(layer.type)) {
                return false;
            }

            // Data and pixel layers are unmounted while loading, so they cannot emit onReady.
            return !props.loadingByLayerId?.[`${layer.id}`];
        })
        .map((layer) => `${layer.id}`);
    const readySignalLayerIdsKey = readySignalLayerIds.join('|');

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
    const [readyToZoom, setReadyToZoom] = useState(readySignalLayerIds.length === 0);
    const [isInitializingLayers, setIsInitializingLayers] = useState(readySignalLayerIds.length > 0);
    const readyLayerIds = useRef(new Set());

    useEffect(() => {
        const hasReadySignalLayers = readySignalLayerIds.length > 0;
        readyLayerIds.current = new Set();
        setReadyToZoom(!hasReadySignalLayers);
        setIsInitializingLayers(hasReadySignalLayers);
    }, [readySignalLayerIdsKey]);

    const handleLayerReady = (layerId) => {
        if (layerId == null) {
            return;
        }
        const normalizedId = `${layerId}`;
        if (!readySignalLayerIds.includes(normalizedId)) {
            return;
        }
        if (!readyLayerIds.current.has(normalizedId)) {
            readyLayerIds.current.add(normalizedId);
        }
        if (readyLayerIds.current.size >= readySignalLayerIds.length) {
            setReadyToZoom(true);
            setIsInitializingLayers(false);
        }
    }

    const visibleReloadableLayerIds = layers
        .filter((layer) =>
            layer?.id != null &&
            DATA_LOADING_LAYER_TYPES.includes(layer.type) &&
            layer.visible !== false &&
            layer.app &&
            layer.app !== 'none' &&
            layer.app !== 'csv'
        )
        .map((layer) => `${layer.id}`);

    const hasVisibleReloadingLayers = visibleReloadableLayerIds.some(
        (layerId) => !!props.loadingByLayerId?.[layerId]
    );

    // Spinner is only for layers that fetch data from backend APIs.
    const showMapLoading = !editing && hasVisibleReloadingLayers;

    // Don't render until we have a real measured width to avoid
    // building the D3 projection against the wrong number.
    if (!containerWidth) {
        return <div ref={ref} className={"d3map-container"} style={{ width: '100%', height: `${dataHeight}px` }} />;
    }

    return (
        <div ref={ref} className={"d3map-container"} style={{ width: '100%', position: 'relative' }}>
            {showMapLoading && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 3,
                        pointerEvents: 'none'
                    }}
                >
                    <Segment basic padded style={{ height: '100%', margin: 0, background: 'transparent' }}>
                        <Dimmer active inverted style={{ background: 'transparent' }}>
                            <Loader size='medium' style={{ background: 'transparent' }} />
                        </Dimmer>
                    </Segment>
                </div>
            )}
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

                {/* Tile basemap layers are rendered as absolutely-positioned divs BEHIND the SVG */}
                {layers.map((layer) => {
                    if (layer.type === 'tileBasemap') {
                        return (
                            <TileBasemapLayer
                                key={layer.id}
                                tileSource={layer.tileSource}
                                tileOpacity={layer.tileOpacity != null ? layer.tileOpacity : 1}
                                transform={transform}
                                visible={layer.visible !== false}
                                onReady={() => handleLayerReady(layer.id)}
                            />
                        );
                    }
                    return null;
                })}

                <Map rotationEnabled={parse(rotationEnabled, editing)}>
                    {layers.map((layer, i) => {
                        const layerIsLoading = !!props.loadingByLayerId?.[`${layer.id}`];


                        if (layer.type === 'base') {
                            return <BaseLayer
                                minLabelZoomVisible={layer.minLabelZoomVisible}
                                onReady={() => handleLayerReady(layer.id)}
                                transform={transform} intl={intl} zoom={zoomRef} unique={unique}
                                key={layer.id} {...layer} />
                        }
                        if (layer.type === 'data') {
                            if (layerIsLoading) {
                                return null;
                            }
                            return <DataLayer
                                minLabelZoomVisible={layer.minLabelZoomVisible}
                                editing={editing}
                                onLayerCreated={e => {

                                }}
                                onReady={() => handleLayerReady(layer.id)}
                                transform={transform}
                                intl={intl}
                                group={group} zoom={zoomRef}
                                unique={unique}
                                key={layer.id} {...layer}
                                visible={layer.visible !== false}
                                settings={props.wordress}
                                selectedMeasure={selectedMeasure}
                                togglePatterns={togglePatterns}
                                initialPosition={paramMapPosition}
                                waitForFilters={waitForFilters == "true" || waitForFilters == true}
                            />

                        }
                        if (layer.type === 'flow') {
                            if (layerIsLoading) {
                                return null;
                            }
                            return <FlowLayer

                                onReady={() => handleLayerReady(layer.id)}
                                transform={transform} intl={intl} group={group} zoom={zoomRef}
                                unique={unique}
                                selectedMeasure={selectedMeasure}
                                key={layer.id} {...layer}
                                visible={layer.visible !== false}
                                waitForFilters={waitForFilters == "true" || waitForFilters == true}
                            />
                        }
                        if (layer.type === 'dataPoints') {
                            if (layerIsLoading) {
                                return null;
                            }
                            return <LatLongLayer
                                onReady={() => handleLayerReady(layer.id)}
                                onZoomToPoint={zoomToPoint} selectedItem={selectedItem}
                                transform={transform} intl={intl}
                                group={group} zoom={zoomRef}
                                unique={unique}
                                selectedMeasure={selectedMeasure}
                                key={layer.id} {...layer}
                                visible={layer.visible !== false}
                                waitForFilters={waitForFilters == "true" || waitForFilters == true}
                            />
                        }
                        if (layer.type === 'pixelGrid') {
                            if (layerIsLoading) {
                                return null;
                            }
                            return <PixelLayer
                                onReady={() => handleLayerReady(layer.id)}
                                transform={transform}
                                intl={intl}
                                group={group}
                                zoom={zoomRef}
                                unique={unique}
                                selectedMeasure={selectedMeasure}
                                key={layer.id} {...layer}
                                visible={layer.visible !== false}
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
    const unique = ownProps?.unique;
    const parsedLayers = parse(ownProps?.["data-layers"]) || [];
    const loadingByLayerId = {};

    if (Array.isArray(parsedLayers) && unique != null) {
        parsedLayers.forEach((layer) => {
            if (!layer || layer.id == null || !DATA_LOADING_LAYER_TYPES.includes(layer.type)) {
                return;
            }
            if (!layer.app || layer.app === 'none' || layer.app === 'csv') {
                return;
            }

            const layerLoading = !!state.getIn(['data', layer.app, unique, layer.id, 'loading']);
            loadingByLayerId[`${layer.id}`] = layerLoading;
        });
    }

    return {
        loadingByLayerId,
    }
}

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(MapWrapper)
