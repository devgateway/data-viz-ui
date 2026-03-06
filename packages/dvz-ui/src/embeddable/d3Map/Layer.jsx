import React from 'react';
import { createRoot } from 'react-dom/client';
import * as d3 from 'd3' // d3 plugin
import Tooltip from "./Tooltip";
import * as utils from './Utils'

class BaseLayer extends React.Component {

    constructor() {
        super();
        this.loadJSON = this.loadJSON.bind(this)
        this.create = this.create.bind(this)
        this.createLayer = this.createLayer.bind(this)
        this.loadJSON = this.loadJSON.bind(this)
        this.showToolTip = this.showToolTip.bind(this)
        this.moveToolTip = this.moveToolTip.bind(this)
        this.gRef = React.createRef();
        this.state = { json: null }

    }

    loadJSON(url) {
        return utils.loadJSON(url)
    }


    createLayer(json) {
        alert("please implement createLayer")
    }

    applyInitialTransform() {
        const { editing, initialPosition, width, height } = this.props
        if (initialPosition && initialPosition.width) {
            const { x, y, k, width: oW, height: oH } = initialPosition;
            const nx = x + (width - oW) / 2 * (1 - k);
            const ny = y + (height - oH) / 2 * (1 - k);
            d3.select(this.gRef.current).attr("transform", `translate(${nx},${ny}) scale(${k})`);
        } else {
            d3.select(this.gRef.current).attr("transform", `translate(${initialPosition.x},${initialPosition.y}) scale(${initialPosition.k})`);
        }
    }

    create() {
        const {
            file,
        } = this.props

        if (this.state.json) {
            this.createLayer(this.state.json)
        } else {
            this.loadJSON(file).then(json => {
                this.setState({ json }) // cache so subsequent calls skip the network
                this.createLayer(json)
            })
        }
    }


    showToolTip(content, data, color, event) {
        if (data) {
            const tip = d3.select("body").append("div")
                .attr("class", "d3MapTooltip")
                .style("position", "absolute")
                //.style("background-color", color)
                .html("")
                .style("left", (window.event.pageX + 15) + "px")
                .style("top", (window.event.pageY - 50) + "px")
            const root = createRoot(tip._groups[0][0]);
            root.render(<Tooltip intl={this.props.intl} tooltip={content} data={data}
                tooltipEnableMarkdown={false} />)
        }
    }


    moveToolTip(event) {
        const tip = d3.select(".d3MapTooltip")
            .style("left", (window.event.pageX + 15) + "px")
            .style("top", (window.event.pageY - 50) + "px")
    }

    hiddenToolTip(event) {
        d3.selectAll(".d3MapTooltip").remove();

    }


    componentDidMount() {
        //eslint-disable-next-line
        if (this.props.zoom && this.gRef.current) {
            this.applyInitialTransform()
        }
        this.create()
    }

    render() {
        const { name, height, width } = this.props
        return <g className={"layer"} ref={this.gRef} />
    }
}


export default BaseLayer

