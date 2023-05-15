import React from 'react';
import {connect} from "react-redux";
import D3Map from './D3map'
const MapWrapper = (props) => {
    const {
        unique,
        editing,
        "data-group": group = "default",
        "data-app": app = 'csv',
        'data-dimension1': dimension1 = '',
        'data-dimension2': dimension2 = '',
        "data-height": height = 600,
    } = props
    return (
        <div>
            <D3Map></D3Map>
        </div>
    );

};

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(MapWrapper)
