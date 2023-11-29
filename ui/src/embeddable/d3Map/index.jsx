import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {decode, parse, compareJsonProps} from "../utils/parseUtils";
import Map from "./Map"
import BaseLayer from './BaseLayer'
import DataLayer from './DataLayer'
import LatLongLayer from './LatLongLayer'
import ZoomControl from "./ZoomControl";
import {Container} from "semantic-ui-react";
import ProjectedContainer from "./ProjectedContainer";
import Legends from "./Legends"
import FlowLayer from "./FlowLayer";


const MapWrapper = (props) => {
    const {
        unique,
        editing,
        "data-group": group,
        "data-layers": dataLayers,
        "data-height": height = 400,
        "data-width": width = 1000,
        "data-back-ground-color": bgColorParam = '#88e8dc',
        "data-map-position": paramMapPosition = {},
        "data-projection": projectionName = "geoMercator",
        "data-zoom-enabled": zoomEnabled = true,
        "data-rotation-enabled": rotationEnabled = false,
        intl
    } = props


    const [layers, setLayers] = useState(parse(dataLayers))
    const ref = useRef(null);
    const zoomRef = useRef(null);
    const [transform, setTransform] = useState(null)

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


    return (
        <div ref={ref} className={"d3map-container"}>
                <ProjectedContainer backgroundColor={decode(bgColorParam)}
                                    height={height}
                                    width={width}
                                    projectionName={projectionName}
                                    editing={editing} initialPosition={parse(paramMapPosition, editing)}>
                    <Map rotationEnabled={parse(rotationEnabled, editing)}>
                        {layers.filter(l => l.visible != false).map((layer, i) => {
                            if (layer.type === 'base') {
                                return <BaseLayer transform={transform} intl={intl} zoom={zoomRef} unique={unique}
                                                  key={i} {...layer} />
                            }
                            if (layer.type === 'data') {
                                return <DataLayer  onLayerCreated={e => {

                                }
                                } transform={transform} intl={intl}
                                                  group={group} zoom={zoomRef}
                                                  unique={unique}
                                                  key={i} {...layer} />

                            }
                            if (layer.type === 'flow') {
                                return <FlowLayer transform={transform} intl={intl} group={group} zoom={zoomRef}
                                                  unique={unique}
                                                  key={i} {...layer} />
                            }
                            if (layer.type === 'dataPoints') {
                                return <LatLongLayer transform={transform} intl={intl} group={group} zoom={zoomRef}
                                                     unique={unique}
                                                     key={i} {...layer} />
                            }

                        })}


                    </Map>

                    <Legends patternsData={null} layers={layers} group={group} onItemClick={toggleLayerView}></Legends>


                    <ZoomControl rootationEmabled={parse(rotationEnabled, editing)}
                                 zoomEnabled={parse(zoomEnabled, editing)} onZoomed={setTransform} width={width}
                                 height={height} ref={zoomRef} group={group}
                                 editing={editing}/>


                </ProjectedContainer>

        </div>
    );

}


const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(MapWrapper)
