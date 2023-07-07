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

    showToolTip(content, data,color) {
        const tip = d3.select("body").append("div")
            .attr("class", "d3MapTooltip")
            .style("position", "absolute")
            //.style("background-color", color)
            .html("")
            .style("left", (d3.event.pageX+15) + "px")
            .style("top", (d3.event.pageY-50) + "px")

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
        return <g className={"base " + name} ref={this.gRef}/>
    }
}


export default BaseLayer

