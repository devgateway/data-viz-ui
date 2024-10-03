import React, {useEffect} from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from "react-redux";
import * as d3 from 'd3' // d3 plugin
import * as topojson from "topojson-client";
import Tooltip from "./Tooltip";
import {injectIntl} from "react-intl";
import Layer from "./Layer";

class BaseLayer extends Layer {


    constructor() {
        super();

        this.gRef = React.createRef();

    }

    createPaths(json) {
        const {
            path, fillColor, borderColor, projection

        } = this.props

        if (this.gRef && this.gRef.current) {
            this.g = d3.select(this.gRef.current)

            const svg = d3.select(this.gRef.current.parentElement);
            

            this.g.attr("class", "base-layer") //add unique name
            this.g.selectAll("path").remove()
            this.g.selectAll(".label").remove()
            this.g.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("fill", fillColor)
                .attr("stroke", borderColor)
                .attr("id", "state-borders")
                .attr("d", path)

            if (this.props.transform) {
                this.g.attr("transform", this.props.transform)
            }
        }
    }

    createLabels(json) {
        const {
            path, labelFilter = [], labelSettings = {}, labelField, labelFontSize, labelColor, projection
        } = this.props
        if (this.gRef && this.gRef.current) {
            this.g = d3.select(this.gRef.current)

            const k = this.props.transform ? this.props.transform.k : 1

            this.g.selectAll(".label")
                .data(json.features.filter(f => {
                    return labelFilter.indexOf(f.properties[labelField]) == -1
                }))
                .enter().append("text")
                .attr("class", "label")
                .attr("font-size", d => {
                    return Math.min((labelFontSize * 1 / k), labelFontSize / 2) + "px"
                })
                .text(function (d) {
                    return d.properties[labelField]
                })
                .attr("color", labelColor)
                .attr("fill", labelColor)
                .attr("transform", function (d) {
                    const rotation = labelSettings[d.properties[labelField] + "_rotation"] || 0
                    const offsetX = labelSettings[d.properties[labelField] + "_offsetX"] || 0
                    const offsetY = labelSettings[d.properties[labelField] + "_offsetY"] || 0
                    const x = path.centroid(d)[0] + (offsetX / projection.scale())
                    const y = path.centroid(d)[1] + (offsetY / projection.scale())
                    return "translate(" + [x, y] + "),rotate(" + (rotation ? rotation : 0) + ")"
                })
            if (this.props.transform) {
                this.g.attr("transform", this.props.transform)
            }
        }
    }


    createLayer(json) {
        this.createPaths(json)
        this.createLabels(json)
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            name,
            file,
            path,
            transform,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            projection,
            update,


        } = this.props
        
        if (file !== prevProps.file || path !== prevProps.path || projection !== prevProps.projection || transform !== prevProps.transform || labelFilter !== prevProps.labelFilter || labelField !== prevProps.labelField || labelFontSize !== prevProps.labelFontSize || labelColor !== prevProps.labelColor || fillColor !== prevProps.fillColor || borderColor !== prevProps.borderColor) {
            this.create()
        }


    }

    render() {
        const {name, height, width} = this.props
        return <g className={"base"} ref={this.gRef}/>
    }
}


export default BaseLayer

