import React from 'react';
import * as d3 from 'd3' // d3 plugin
import Layer from "./Layer";
import BreaksStyles from "@/embeddable/d3Map/BreaksStyles.js";
import GradientColors from "@/embeddable/d3Map/GradientColors.js";

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
            this.g.attr("class", "base-layer zoomable") //add unique name
            this.g.selectAll(".borders").remove()
            this.g.selectAll(".feature-label").remove()
            this.g.selectAll(".borders")
                .data(json.features)
                .enter()
                .append("path")
                .attr("fill", fillColor)
                .attr("stroke", borderColor)
                .attr("id", "state-borders")
                .attr("class", "borders")
                .attr("d", path)
                .style("vector-effect", "non-scaling-stroke")

        }
    }


    createLabels(json) {
        const {
            path,
            labelFilter = [],
            labelSettings = {},
            labelField,
            labelFontSize,
            labelColor,
            projection,
            initialPosition,
            minLabelZoomVisible
        } = this.props

        if (this.gRef && this.gRef.current) {
            this.g = d3.select(this.gRef.current)
            const scale = projection.scale();
            const k = this.props.transform ? this.props.transform.k : initialPosition.k

            this.g.selectAll(".feature-label")
                .data(json.features.filter(f => {
                    return labelFilter.indexOf(f.properties[labelField]) == -1
                }))
                .enter()
                .append("text")
                .attr("class", "feature-label")
                .attr("font-size", d => {
                    return Math.max(.5, labelFontSize / k) + "px";
                })
                .style("pointer-events", "none")
                .text(function (d) {
                    return d.properties[labelField]
                })

                .attr("color", labelColor)
                .attr("fill", labelColor)
                .attr("transform", function (d) {
                    const rotation = labelSettings[d.properties[labelField] + "_rotation"] || 0
                    const offsetX = labelSettings[d.properties[labelField] + "_offsetX"] || 0
                    const offsetY = labelSettings[d.properties[labelField] + "_offsetY"] || 0
                    const x = path.centroid(d)[0] + (offsetX / scale)
                    const y = path.centroid(d)[1] + (offsetY / scale)
                    return "translate(" + [x, y] + "),rotate(" + (rotation ? rotation : 0) + ")"
                })
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
            if (k < minLabelZoomVisible){
                console.log("remove layers")
                this.g.selectAll(".feature-label").transition().style("display","none")
            }else{
                this.g.selectAll(".feature-label").style("display","")
            }

        }
    }


    resize() {
        const {
            labelFontSize,
            minLabelZoomVisible=-1

        } = this.props
        //eslint-disable-next-line

        const k = this.props.transform ? this.props.transform.k : 1
        console.log("minLabelZoomVisible",minLabelZoomVisible,k)


        if (k < minLabelZoomVisible){
            console.log("remove layers")
            this.g.selectAll(".feature-label").transition().style("display","none")
        }else{
            this.g.selectAll(".feature-label").style("display","")
        }
        this.g.selectAll(".feature-label").attr("font-size", d => {
            return Math.max(.5, labelFontSize / k) + "px";
        })


    }

    createLayer(json) {


        this.createPaths(json);
        this.createLabels(json);

        if (this.props.onReady) {
            //eslint-disable-next-line

            this.props.onReady();
        }
    }


    componentDidMount() {
        super.componentDidMount()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            editing
        } = this.props
        //eslint-disable-next-line

        if (editing) {
            this.create()
        }
        if (prevProps.visible != this.props.visible) {
            this.g.style("display", this.props.visible ? "block" : "none")

        }
        if(this.g){
            this.resize()
        }

    }

    render() {
        const {name, height, width} = this.props
        return <g ref={this.gRef}/>
    }
}


export default BaseLayer

