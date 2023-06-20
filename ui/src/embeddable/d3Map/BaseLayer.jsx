import React, {useEffect} from 'react';
import {connect} from "react-redux";
import * as d3 from 'd3' // d3 plugin
import * as topojson from "topojson-client";

const loadJSON = (url) => {
    return new Promise((resolve, reject) => {
        d3.json(url).then(function (us, error) {
            if (error) reject(error);
            resolve(us)
        });
    })
}

class BaseLayer extends React.Component {


    constructor() {
        super();
        this.createLayer = this.createLayer.bind(this)
        this.gRef = React.createRef();
    }

    createLayer() {
        
        const {
            name,
            file,
            path,
            onLayerCreated,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            editing
        } = this.props


        const g = d3.select(this.gRef.current)
        loadJSON(file).then((json) => {
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
                .attr("font-size", labelFontSize + "em")
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

            onLayerCreated()
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.createLayer()
    }

    componentDidMount() {
        this.createLayer()
    }

    render() {
        const {name,height,width} = this.props
        return <g className={"base " + name} ref={this.gRef}/>
    }
}


export default BaseLayer

