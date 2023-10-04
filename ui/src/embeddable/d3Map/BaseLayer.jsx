import React, {useEffect} from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from "react-redux";
import * as d3 from 'd3' // d3 plugin
import * as topojson from "topojson-client";
import Tooltip from "./Tooltip";
import {injectIntl} from "react-intl";

class BaseLayer extends React.Component {


    constructor() {
        super();
        this.loadJSON = this.loadJSON.bind(this)
        this.createBaseLayer = this.createBaseLayer.bind(this)
        this.create = this.create.bind(this)
        this.gRef = React.createRef();
        this.showToolTip = this.showToolTip.bind(this)
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
            labelSettings = {},
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            editing,
            transform,
            projection
        } = this.props
        this.g = d3.select(this.gRef.current)

        //root.selectAll(".base-layer").remove()  //add unique name
        //this.g = root.append("g")

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


        const k = this.props.transform ? this.props.transform.k : 1
        
        this.g.selectAll(".label")
            .data(json.features.filter(f => {
                return labelFilter.indexOf(f.properties[labelField]) == -1
            }))
            .enter().append("text")
            .attr("class", "label")
            .attr("font-size", (labelFontSize * 1 / k) + "px")
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
        /*Apply zoom value*/
        if (this.props.transform) {
            this.g.attr("transform", this.props.transform)
            //g.selectAll(".label").attr("transform", this.props.transform)
        }

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

        });
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
            editing,

        } = this.props

        if (file !== prevProps.file || path !== prevProps.path || transform !== prevProps.transform || labelFilter !== prevProps.labelFilter || labelField !== prevProps.labelField || labelFontSize !== prevProps.labelFontSize || labelColor !== prevProps.labelColor || fillColor !== prevProps.fillColor || borderColor !== prevProps.borderColor

        ) {
            this.create()
        }


    }

    showToolTip(content, data, color) {
        const tip = d3.select("body").append("div")
            .attr("class", "d3MapTooltip")
            .style("position", "absolute")
            //.style("background-color", color)
            .html("")
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 50) + "px")

        ReactDOM.render(<Tooltip intl={this.props.intl} tooltip={content} data={data}
                                 tooltipEnableMarkdown={false}/>, tip._groups[0][0])

    }

    hiddenToolTip() {
        d3.selectAll(".d3MapTooltip").remove();

    }

    parseToolTipContent(content) {
        const {data} = this.props
        return content.replace(/\{(.+?)\}/g, function (match, p1) {
            return data[p1]
        })
    }

    componentDidMount() {
        this.create()
        this.props.zoom.current.fullView()
    }

    render() {
        const {name, height, width} = this.props
        return <g className={"base"} ref={this.gRef}/>
    }
}


export default BaseLayer

