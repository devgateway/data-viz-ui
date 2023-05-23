import React from 'react';
import {connect} from "react-redux";
import {parse} from "../utils/parseUtils";
import Map from "./Map"
import BaseLayer from './BaseLayer'
import DataLayer from './DataLayer'
import ZoomControl from "./ZoomControl";
import {Container} from "semantic-ui-react";
const MapWrapper = (props) => {
    const {
        unique,
        editing,
        "data-layers": dataLayers,
        "data-height": height = 600,
        "data-back-ground-color": bgColorParam = '#88e8dc',
    } = props

    const layers = parse(dataLayers)
    const [transform, setZoomTransform] = React.useState(null)
    return (
        <Container fluid className={"d3Map"} style={{backgroundColor:decodeURIComponent(bgColorParam)}}>
            <Map height={height}>
                {layers.map((layer, i) => {
                    if (layer.type === 'base') {
                        return <BaseLayer transform={transform} key={i} {...layer} />
                    }
                    if (layer.type === 'data') {
                        return <DataLayer transform={transform} key={i} {...layer} />
                    }

                })}

            </Map>
            <ZoomControl onZoomEnd={setZoomTransform}/>
        </Container>
    );

};

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(MapWrapper)
