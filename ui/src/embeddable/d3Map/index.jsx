import React, {useLayoutEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {decode, parse} from "../utils/parseUtils";
import Map from "./Map"
import BaseLayer from './BaseLayer'
import DataLayer from './DataLayer'
import ZoomControl from "./ZoomControl";
import {Container} from "semantic-ui-react";
import ProjectedContainer from "./ProjectedContainer";

const MapWrapper = (props) => {
        const {
            unique,
            editing,
            "data-group": group,
            "data-layers": dataLayers,
            "data-height": height = 400,
            "data-width": width = 1000,
            "data-back-ground-color": bgColorParam = '#88e8dc',
            "data-map-position": paramMapPosition = {}
        } = props

        const layers = parse(dataLayers)
        const [readyState, setReadyState] = React.useState(false)
        const layerCreated = []

        const ref = useRef(null);
        const onLayerCreated = (layer) => {
            layerCreated.push(layer)
            if (layerCreated.length == layers.length) {
                setReadyState(true)
            }
        }


        return (
            <div ref={ref} className={"d3map-container"}>

                <ProjectedContainer backgroundColor={decode(bgColorParam)}
                                    height={height}
                                    width={width}
                                    editing={editing} initialPosition={parse(paramMapPosition, editing)}>
                    <Map>
                        {layers.map((layer, i) => {
                            if (layer.type === 'base') {
                                return <BaseLayer unique={unique} onLayerCreated={e => onLayerCreated(layer)}
                                                  key={i} {...layer} />
                            }
                            if (layer.type === 'data') {
                                return <DataLayer unique={unique} onLayerCreated={e => onLayerCreated(layer)}
                                                  key={i} {...layer} />
                            }

                        })}
                    </Map>
                    <ZoomControl group={group} readyState={readyState} editing={editing}/>
                </ProjectedContainer>
            </div>
        );

    }
;

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(MapWrapper)
