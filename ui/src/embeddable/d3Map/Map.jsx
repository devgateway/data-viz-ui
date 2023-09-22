import React, {createRef, useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as topojson from "topojson-client";
import * as d3 from 'd3' // d3 plugin


class Map extends React.Component {
    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
    }

    render() {
        const {height, width,projection} = this.props

        return(<svg viewBox= {`0 0 ${width} ${height}`}   className={"map"} height={height} width={width}>
                    {projection ? this.props.children.map(child =>  React.cloneElement(child, {...this.props})) : null}
                </svg>)
    }
}

export default Map