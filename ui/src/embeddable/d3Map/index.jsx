import React from 'react';
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
        "data-layers": dataLayers,
        "data-height": height = 600,
        "data-back-ground-color": bgColorParam = '#88e8dc',
        "data-map-position": paramMapPosition = {}
    } = props

    const layers = parse(dataLayers)
    const [transform, setZoomTransform] = React.useState(null)

    

    return (
        <Container  className={"d3map-container"}
                   style={{backgroundColor: decode(bgColorParam), height: height+"px"}}>
            <ProjectedContainer editing={editing}  initialPosition={parse(paramMapPosition, editing)}>
                <Map>
                    {layers.map((layer, i) => {
                        if (layer.type === 'base') {
                            return <BaseLayer key={i} {...layer} />
                        }
                        if (layer.type === 'data') {
                            return <DataLayer key={i} {...layer} />
                        }

                    })}
                </Map>
                <ZoomControl editing={editing}/>

            </ProjectedContainer>
        </Container>
    );

};

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(MapWrapper)
