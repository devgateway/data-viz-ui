import React, {Children, createRef, useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as topojson from "topojson-client";
import * as d3 from 'd3'
import {decode} from "../utils/parseUtils"; // d3 plugin


class ProjectedContainer extends React.Component {
    constructor(props) {
        super(props);
        this.divRef = React.createRef();
        this.createProjection = this.createProjection.bind(this)
    }

    createProjection() {
        const {editing, height, width, scale = 200, center = [0, 0], projectionName} = this.props
        const projection = d3[projectionName]()
            .fitSize([width, height])
            .scale(scale)
            .center(center)  // centers map at given coordinates
            .translate([width / 2, height / 2])

        const path = d3.geoPath().projection(projection);
        return {path, projection}
    }

    componentDidMount() {

        const {svg} = this.props
        const {path, projection} = this.createProjection()

        this.setState({path, projection})
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.height !== this.props.height || prevProps.width !== this.props.width || prevProps.projectionName !== this.props.projectionName) {
            const {path, projection} = this.createProjection()
            this.setState({path, projection})
        }
    }

    render() {
        const {editing, backgroundColor, height, width, scale = 190, center = [0, 0], initialPosition} = this.props
        const arrayChildren = Children.toArray(this.props.children);

        return <div
            className={"projected"}
            width={width}
            height={height}
            style={{
                margin: "auto",
                backgroundColor: backgroundColor,
                height: `${height}px`,
                width: `${width}px`,

            }
            }
        >
            {Children.map(arrayChildren, child => {
                return React.cloneElement(child, {
                    ...this.state,
                    initialPosition,
                    editing,
                    height,
                    width,
                })

            })}

        </div>
    }
}

export default ProjectedContainer