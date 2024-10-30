import React from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3' // d3 plugin
import Tooltip from "./Tooltip";

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
        this.state = {json: null}

    }

    loadJSON(url) {

        return new Promise((resolve, reject) => {
            d3.json(url).then(function (us, error) {
                if (error) {
                    console.log("Error loading JSON: " + error)
                }
                ;
                resolve(us)
            }.bind(this));
        })
    }


    createLayer(json) {
        alert("please implement createLayer")
    }

    create() {
        const {
            file,
        } = this.props

        if (this.state.json) {
            this.createLayer(this.state.json)
        } else {
            this.loadJSON(file).then(json => {
                this.createLayer(json)

            })
        }
    }


    showToolTip(content, data, color, event) {
        debugger;
        if (data) {

            const tip = d3.select("body").append("div")
                .attr("class", "d3MapTooltip")
                .style("position", "absolute")
                //.style("background-color", color)
                .html("")
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 50) + "px")

            ReactDOM.render(<Tooltip intl={this.props.intl} tooltip={content} data={data}
                                     tooltipEnableMarkdown={false}/>, tip._groups[0][0])
        }
    }


    moveToolTip(event) {
        if (event) {
            const tip = d3.select(".d3MapTooltip")
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 50) + "px")
        }
    }

    hiddenToolTip(event) {
        d3.selectAll(".d3MapTooltip").remove();

    }


    componentDidMount() {
        this.create()
        if (this.props.zoom && this.props.current) {
            this.props.zoom.current.fullView()
        }
    }

    render() {
        const {name, height, width} = this.props
        return <g className={"layer"} ref={this.gRef}/>
    }
}


export default BaseLayer

