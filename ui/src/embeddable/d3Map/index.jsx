import React, {useLayoutEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {decode, parse} from "../utils/parseUtils";
import Map from "./Map"
import BaseLayer from './BaseLayer'
import DataLayer from './DataLayer'
import LatLongLayer from './LatLongLayer'
import ZoomControl from "./ZoomControl";
import {Container} from "semantic-ui-react";
import ProjectedContainer from "./ProjectedContainer";
import Legends from "./Legends"

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
            intl
        } = props

        const layers = parse(dataLayers)
        const layerCreated = []

        const ref = useRef(null);
        const zoomRef = useRef(null);

        const [transform, setTransform] = useState(null)


        return (
            <div ref={ref} className={"d3map-container"}>
                <ProjectedContainer backgroundColor={decode(bgColorParam)}
                                    height={height}
                                    width={width}
                                    editing={editing} initialPosition={parse(paramMapPosition, editing)}>
                    <Map>
                        {layers.map((layer, i) => {
                            if (layer.type === 'base') {
                                return <BaseLayer transform={transform} intl={intl} zoom={zoomRef} unique={unique}
                                                  key={i} {...layer} />
                            }
                            if (layer.type === 'data') {
                                return <DataLayer transform={transform} intl={intl} group={group} zoom={zoomRef}
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

                    <ZoomControl onZoomed={setTransform} width={width} height={height} ref={zoomRef} group={group} editing={editing}/>

                    <Legends layers={layers}></Legends>

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
