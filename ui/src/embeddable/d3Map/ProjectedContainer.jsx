import React, {createRef, useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as topojson from "topojson-client";
import * as d3 from 'd3' // d3 plugin


class ProjectedContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {path: null, projection: null}
        this.divRef = React.createRef();
    }

    getHeight() {
        return this.divRef.current ? this.divRef.current.parentNode.offsetHeight : 0;

    }

    getWidth() {
        return this.divRef.current ? this.divRef.current.parentNode.offsetWidth : 0;
    }

    componentDidMount() {
        const {scale = 190, center = [0, 0], initialPosition: {x = 0, y = 0, k = 0}} = this.props

        const projection = d3.geoMercator()
            .scale(scale)
            .center(center)  // centers map at given coordinates
            .translate([this.getWidth() / 2, this.getHeight() / 2])


        const path = d3.geoPath().projection(projection);
        this.setState({path, projection})

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        const {scale = 190, center = [0, 0], initialPosition} = this.props

        return <div ref={this.divRef}
                    className={"d3Map"}>
            {this.state.path ? this.props.children.map(child => {
                return React.cloneElement(child, {
                    ...this.state,
                    initialPosition,
                    height: this.getHeight(),
                    width: this.getWidth(),
                    editing: this.props.editing

                },)
            }) : null}
        </div>
    }
}

export default ProjectedContainer