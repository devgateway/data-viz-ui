import React, {useEffect} from 'react';
import {connect} from "react-redux";
import * as d3 from 'd3' // d3 plugin
import * as topojson from "topojson-client";


class BaseLayer extends React.Component {


    constructor() {
        super();
        this.loadJSON = this.loadJSON.bind(this)
        this.createBaseLayer = this.createBaseLayer.bind(this)
        this.create = this.create.bind(this)
        this.gRef = React.createRef();
    }

    loadJSON(url) {
        return new Promise((resolve, reject) => {
            d3.json(url).then(function (us, error) {
                if (error) reject(error);
                resolve(us)
            });
        })
    }

    createBaseLayer(json) {
        const {
            name,
            file,
            path,
            zoom,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            editing,
            projection
        } = this.props
        const g = d3.select(this.gRef.current)
        g.attr("class", "base-layer " + name)

        g.selectAll("path").remove()
        g.selectAll(".label").remove()


        g.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("fill", fillColor)
            .attr("stroke", borderColor)
            .attr("id", "state-borders")
            .attr("d", path);


        g.selectAll(".label")
            .data(json.features.filter(f => {
                return labelFilter.indexOf(f.properties[labelField]) == -1
            }))
            .enter().append("text")
            .attr("class", "label")
            .attr("font-size", labelFontSize / projection.scale() + "em")
            .text(function (d) {
                return d.properties[labelField]
            })
            .attr("color", labelColor)
            .attr("fill", labelColor)
            .attr("transform", function (d) {
                var bbox = this.getBBox();
                var width = bbox.width;
                return "translate(" + [path.centroid(d)[0] - (width / 2), path.centroid(d)[1]] + ")"
            })


    }


    create() {
        const {
            name,
            file,
            path,
            zoom,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            editing
        } = this.props

        this.loadJSON(file).then(json => {
            this.createBaseLayer(json)
            debugger
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            name,
            file,
            path,
            zoom,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            editing
        } = this.props

            this.create()


    }


    componentDidMount() {
        this.create()
        this.props.zoom.current.fullView()
    }

    render() {
        const {name, height, width} = this.props
        return <g className={"base " + name} ref={this.gRef}/>
    }
}


export default BaseLayer

