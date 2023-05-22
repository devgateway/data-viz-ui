import React, {createRef, useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as topojson from "topojson-client";
import * as d3 from 'd3' // d3 plugin
const Map1 = (props) => {
    const ref = createRef();

    const width = 960,
        height = 500;

    const projection = d3.geoMercator()
        .scale(100)
        .center([2.8, 41.9])
        .translate([width / 2, height / 2]);

    const path = d3.geoPath()
        .projection(projection);


    const renderRootElements = (parent) => {
        const svg = d3.select(parent).append("svg")
            .attr("width", width)
            .attr("height", height);

    }


    useEffect(() => {
        renderRootElements(ref.current)

    }, [])


    return <div ref={ref} className={"d3 map"} ref={ref}>
        {React.Children.map(props.children, (child => {
            return React.cloneElement(child, {...props, path}
            )
        }))}

    </div>
}


class Map extends React.Component {
    constructor() {
        super();
        this.state = {path: null}
        this.svgRef = React.createRef();


    }

    componentDidMount() {
        const {height} = this.props
        debugger
        const projection = d3.geoMercator()
            .scale(100)
            .center([2.8, 41.9])
            .translate([(this.svgRef.current.parentNode.clientWidth) / 2, height / 2]);

        const path = d3.geoPath()
            .projection(projection);
        debugger
        this.setState({path})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        const {height} = this.props

        debugger
        return <svg ref={this.svgRef} width={"100%"} height={height}>
            {this.state.path ? this.props.children.map(child => {
                debugger;
                return React.cloneElement(child, {path: this.state.path})
            }) : null}
        </svg>
    }
}

export default Map