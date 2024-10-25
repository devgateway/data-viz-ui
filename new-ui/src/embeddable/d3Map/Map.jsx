import React, {createRef, useEffect, useState} from 'react';
import * as d3 from 'd3' // d3 plugin


class Map extends React.Component {
    constructor(props) {
        super(props);
        this.svgRef = React.createRef()
        this.dragged = this.dragged.bind(this)
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.projection !== this.props.projection) {
            const path = d3.geoPath().projection(this.props.projection);
            this.setState({projection: this.props.projection, path})
        }

        const {rotationEnabled} = this.props
        const group = d3.select(this.svgRef.current).datum({
            x: 0,
            y: 0
        })

        if (rotationEnabled) {
            group.call(d3.drag().on('drag', this.dragged));
            //  group.on(".drag", this.dragged);

        } else {
              group.on(".drag", null);
        }

    }

    componentDidMount() {

        const {rotationEnabled} = this.props
        const group = d3.select(this.svgRef.current).datum({
            x: 0,
            y: 0
        })
        if (rotationEnabled) {
            group.call(d3.drag().on('drag', this.dragged));
        }

    }

    dragged(event, d) {
        const origin = {
            x: 0,
            y: 0
        };
        const {projection, width, height} = this.props
        const λ = d3.scaleLinear()
            .domain([-width, width])
            .range([-180, 180])
        const φ = d3.scaleLinear()
            .domain([-height, height])
            .range([90, -90]);

        const r = {
            x: λ((d.x = event.x)),
            y: φ((d.y = event.y))
        };
        projection.rotate([origin.x + r.x, origin.y + r.y]);
        const path = d3.geoPath().projection(projection);
        this.setState({projection, path})
    }


    render() {

        const {projection, width, height, path} = this.props


        return (
            <svg viewBox={`0 0 ${width} ${height}`} className={"map"} height={height} width={width} ref={this.svgRef}>
                {projection ? this.props.children.map(child => React.cloneElement(child, {
                    ...this.props,
                    svg: this.svgRef.current,
                    ...this.state
                })) : null}
            </svg>)
    }
}

export default Map
