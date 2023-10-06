import React, {useEffect} from 'react';
import {connect} from "react-redux";
import BaseLayer from "./BaseLayer";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import Map from "../map/map";
import {parse} from "../utils/parseUtils";
import * as d3 from "d3";
import {injectIntl} from "react-intl";
import * as ReactDOM from "react-dom";
import Tooltip from "./Tooltip";


const getFilters = (filters) => {
    const ff = parse(filters) || []
    let params = {};
    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0) params[f.param] = f.value
        })
    } else {
        params = ff;
    }

    return params
}

class DataLayer extends React.Component {

    constructor() {
        super();
        this.create = this.create.bind(this)
        this.showToolTip = this.showToolTip.bind(this)
        this.moveToolTip = this.moveToolTip.bind(this)
        this.gRef = React.createRef();
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


    moveToolTip() {
        const tip = d3.select(".d3MapTooltip")
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 50) + "px")
    }

    hiddenToolTip() {
        d3.selectAll(".d3MapTooltip").remove();

    }

    create() {

        const {
            app,
            tooltip,
            data,
            markFillColor,
            markBorderColor,
            markSizeScale,
            markerLabelSize,
            measures,
            projection,
            id
        } = this.props
        let points = []
        const g = d3.select(this.gRef.current)
        if (app != 'csv' && data && data.children) {
            points = data.children.map((d) => {
                const latLong = d.value.split(',')

                return {
                    x: latLong[0], y: latLong[1], value: 1, metadata: d,
                }

            })


        } else if (app == 'csv') {

            const latField = data.meta.fields[0]
            const longField = data.meta.fields[1]
            const valueField = data.meta.fields[2]

            points = data.data.map((d) => {

                return {
                    x: d[latField], y: d[longField], value: d[valueField], meta:d
                }
            })


        }


        const getTooltipVariables = (d) => {
            
            return {...d,...d.meta}
        }

        const k = this.props.transform ? this.props.transform.k : 1
        g.attr("class", "lat-long " + id)
        g.selectAll(".latLong").remove()
        g.selectAll(".latLong")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return projection([d.y, d.x])[0];
            })
            .attr("cy", function (d) {
                return projection([d.y, d.x])[1];
            })
            .attr("class", "latLong")
            .attr("r", e => markSizeScale * 1 / k)
            .attr("stroke-width", 2)
            .style("vector-effect", "non-scaling-stroke")
            .attr("stroke", markBorderColor)
            .attr("fill", markFillColor)
            .on("mouseenter", (d) => {
                this.showToolTip(tooltip, getTooltipVariables(d), markFillColor)
            }).on("mousemove", (d) => {
            this.moveToolTip()
        }).on("mouseleave", (d) => {
            this.hiddenToolTip()
        })


        if (this.props.transform) {
            g.attr("transform", this.props.transform)
            //g.selectAll(".label").attr("transform", this.props.transform)
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {projection} = this.props
        this.create()
    }

    componentDidMount() {
        this.create()

    }

    render() {

        const {
            id,

        } = this.props

        return <g className={"latLong " + id} ref={this.gRef}/>
    }

}

const DataWrapper = (props) => {
    const {
        id, unique, filters, csv, app, group = "default", apiJoinAttribute, editing
    } = props

    let params = {}
    const ff = filters || {}
    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
    }
    

    return (<DataProvider
        editing={editing}
        params={params}
        app={app}
        csv={decodeURIComponent(csv)}
        group={group}
        editing={editing}
        ignoreErrors={true}
        isSvg={true}
        store={[app, unique, id]}
        source={[apiJoinAttribute]}>
        <DataConsumer>
            <DataLayer {...props}></DataLayer>
        </DataConsumer>

    </DataProvider>)
}

export default injectIntl(DataWrapper)