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
        debugger
        const {name, file, path} = this.props
        const g =d3.select(this.gRef.current)
        loadJSON(file).then((json) => {
            debugger;
            g.attr("class", "base-layer " + name)
            g.selectAll("path").remove()
            g.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("fill", "#EEE")
                .attr("stroke", "#000")
                .attr("id", "state-borders")
                .attr("d", path);
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.createLayer()
    }

    componentDidMount() {
        const {transform} = this.props
        this.createLayer()
        if (transform){
            d3.select(this.gRef.current).attr('transform', transform)
        }

    }

    render() {
        const {name} = this.props
        debugger;
        return <g className={"base "+name} ref={this.gRef}/>
    }
}


export default BaseLayer

