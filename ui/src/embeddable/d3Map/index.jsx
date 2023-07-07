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
            "data-map-position": paramMapPosition = {},
            intl
        } = props
        debugger;
        const layers = parse(dataLayers)
        const layerCreated = []

        const ref = useRef(null);
        const zoomRef = useRef(null);


        return (
            <div ref={ref} className={"d3map-container"}>
                <ProjectedContainer backgroundColor={decode(bgColorParam)}
                                    height={height}
                                    width={width}
                                    editing={editing} initialPosition={parse(paramMapPosition, editing)}>
                    <Map>
                        {layers.map((layer, i) => {
                            if (layer.type === 'base') {
                                return <BaseLayer intl={intl}  zoom={zoomRef} unique={unique}
                                                  key={i} {...layer} />
                            }
                            if (layer.type === 'data') {
                                return <DataLayer intl={intl} group={group} zoom={zoomRef} unique={unique}
                                                  key={i} {...layer} />
                            }

                        })}
                    </Map>
                    <ZoomControl ref={zoomRef} group={group} editing={editing}/>
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
