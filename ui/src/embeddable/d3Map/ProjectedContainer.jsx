import React, {Children, createRef, useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as topojson from "topojson-client";
import * as d3 from 'd3' // d3 plugin


class ProjectedContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {path: null, projection: null, width: 0, height: 0}
        this.divRef = React.createRef();
        this.getHeight = this.getHeight.bind(this)
        this.getWidth = this.getWidth.bind(this)
        this.project=this.project.bind(this)
    }

    getHeight() {
        return this.divRef.current.parentNode.offsetHeight ;
    }

    getWidth() {
        return this.divRef.current.parentNode.offsetWidth ;
    }

    compo

    componentDidUpdate(prevProps, prevState, snapshot) {


    }


    project() {
        const {scale = 190, center = [0, 0], initialPosition: {x = 0, y = 0, k = 0}} = this.props
        const projection = d3.geoMercator()
            .scale(scale)
            .center(center)  // centers map at given coordinates
            .translate([this.getWidth() / 2, this.getHeight() / 2])
        const path = d3.geoPath().projection(projection);
        window.setTimeout(()=>this.setState({path, projection,height:this.getHeight(),width:this.getWidth()}),500)

    }

    componentDidMount() {
        this.project()
       window.addEventListener("resize", this.project);


    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        const {initialPosition} = this.props

        const arrayChildren = Children.toArray(this.props.children);


        return <div ref={this.divRef} className={"d3Map"}>

            {this.divRef.current&&Children.map(arrayChildren, child => {
                return React.cloneElement(child, {
                    ...this.state,
                    initialPosition,
                    editing: this.props.editing

                })

            })}

        </div>
    }
}

export default ProjectedContainer