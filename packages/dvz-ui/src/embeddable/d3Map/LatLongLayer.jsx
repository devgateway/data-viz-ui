import React from 'react';
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
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
        this.resize = this.resize.bind(this)
        this.gRef = React.createRef();
    }


    showToolTip(content, data, color, event) {
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


    moveToolTip(event) {
        const tip = d3.select(".d3MapTooltip")
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY - 50) + "px")
    }

    hiddenToolTip(event) {
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
            id,
            format,
            intl,
            useBreaks,
            breaks,
            pointDimensionStyles = [],
            pointStyleBy,
            dimension2,
            visible = true,
            showDim2OnLegends,
            dim2LegendLabel
        } = this.props


        const numberFormat = {
            style: (format.style === 'compacted') ? 'decimal' : format.style,
            notation: (format.style === 'compacted') ? 'compact' : "standard",
            currency: format.currency,
            minimumFractionDigits: parseInt(format.minimumFractionDigits),
            maximumFractionDigits: parseInt(format.maximumFractionDigits)
        }
        const sizeScale = d3.scaleThreshold()
            .domain(breaks.map(d => d.end))
            .range(breaks.map(d => markSizeScale + d.size));

        const colorScale = d3.scaleThreshold()
            .domain(breaks.map(d => d.end))
            .range(breaks.map(d => d.color));

        const borderScale = d3.scaleThreshold()
            .domain(breaks.map(d => d.end))
            .range(breaks.map(d => d.borderColor));

        let points = []
        const g = d3.select(this.gRef.current)

        if (app != 'csv' && data && data.children) {


            points = data.children.map((d) => {
                const latLong = d.value.split(',')
                let pointStyle = {color: markFillColor, size: markSizeScale, border: markBorderColor}
                let value = 1
                if (pointStyleBy === "measure") {
                    value = d[measures[0]]

                    pointStyle = {color: colorScale(value), size: sizeScale(value), border: borderScale(value)}

                } else if (pointStyleBy === "dimension") {
                    if (d.children && showDim2OnLegends) {
                        value = d.children[0].value

                        pointStyle = {
                            color: pointDimensionStyles[value + '_color'] || markFillColor,
                            size: pointDimensionStyles[value + '_size'] || markSizeScale,
                            border: pointDimensionStyles[value + '_border'] || markBorderColor
                        }
                    }
                }
                return {
                    x: latLong[0], y: latLong[1], value, metadata: d, pointStyle
                }
            })

            points.sort((a, b) => a.pointStyle.size - b.pointStyle.size)

        } else if (app == 'csv') {

            const latField = data.meta.fields[0]
            const longField = data.meta.fields[1]
            const valueField = data.meta.fields[2]

            points = data.data.map((d) => {
                let pointStyle = {color: markFillColor, size: markSizeScale, border: markBorderColor}
                return {
                    x: d[latField], y: d[longField], value: d[valueField], meta: d, pointStyle
                }
            })


        }


        const getTooltipVariables = (d) => {
            const {pointStyleBy, dimension2} = this.props
            const dimensionVariable = {}
            if (dimension2 != 'none') {
                dimensionVariable[dimension2] = d.metadata.children[0].value
            }
            return {...dimensionVariable, ...d, ...d.metadata}
        }

        const k = this.props.transform ? this.props.transform.k : 1

        g.attr("class", "zoomable lat-long " + id)
        g.selectAll(".point-group").remove()


        const pointGroups = g.selectAll(".point-group")
            .data(points)
            .enter()
            .append("g")
            .attr("class", "point-group")


        pointGroups.append("circle")
            .attr("cx", function (d) {
                return projection([d.y, d.x])[0];
            })
            .attr("cy", function (d) {
                return projection([d.y, d.x])[1];
            })
            .attr("class", "latLong")
            .attr("r", e => e.pointStyle.size * 1 / k)
            .attr("stroke-width", 2)
            .style("vector-effect", "non-scaling-stroke")
            .attr("stroke", e => e.pointStyle.border)
            .attr("fill", e => e.pointStyle.color)
            .on("mouseenter", (event, d) => {
                this.showToolTip(tooltip, getTooltipVariables(d), d.pointStyle.color, event)
            }).on("mousemove", (event, d) => {
            this.moveToolTip(event)
        }).on("mouseleave", (event, d) => {
            this.hiddenToolTip(event)
        })

        pointGroups.append("text")
            .attr("class", "point-label")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("x", d => projection([d.y, d.x])[0])
            .attr("y", d => projection([d.y, d.x])[1])
            .attr("font-size", d => {
                return (markerLabelSize * (10 / k)) + "px"
            })
            .attr("fill", "#EEE")
            .text(d => {
                //eslint-disable-next-line

                return intl.formatNumber(d.value, numberFormat)

            }).on("mouseenter", (event, d) => {
            this.showToolTip(tooltip, getTooltipVariables(d), d.pointStyle.color, event)
        }).on("mousemove", (event, d) => {
            this.moveToolTip(event)
        }).on("mouseleave", (event, d) => {
            this.hiddenToolTip(event)
        })

        if (this.props.transform) {
            g.attr("transform", this.props.transform)
            //g.selectAll(".label").attr("transform", this.props.transform)
        }

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const {editing, selectedItem, onZoomToPoint,data} = this.props
        const g = d3.select(this.gRef.current)

        if (editing || JSON.stringify(prevProps.data) !== JSON.stringify(data)) {
            this.create()

        }
        if (prevProps.visible != this.props.visible) {

            const g = d3.select(this.gRef.current)
            g.style("display", this.props.visible ? "block" : "none")

        }

        if (selectedItem != null && this.props.selectedItem != prevProps.selectedItem) {
            const selection = g.selectAll(".point-group circle");
            const filtered = selection.filter(d => {
                return d.metadata.children.find(d => d.value == selectedItem) != undefined
            })

            onZoomToPoint({x: filtered.datum().x, y: filtered.datum().y})


        }

        this.resize()

    }

    resize() {
        const {markerLabelSize} = this.props
        const g = d3.select(this.gRef.current)
        const k = this.props.transform ? this.props.transform.k : 1

        if (g) {
            g.selectAll(".point-group circle").attr("r", e => e.pointStyle.size * 1 / k)
            g.selectAll(".point-group text.point-label").attr("font-size", d => {
                return (markerLabelSize * (10 / k)) + "px"
            })
        }
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
        id,
        unique,
        filters,
        csv,
        app,
        group = "default",
        apiJoinAttribute,
        editing,
        dimension2,
        pointStyleBy,
        dvzProxyDatasetId,
        settings,
        waitForFilters
    } = props

    const secondDimension = dimension2 != 'none' ? "/" + dimension2 : ''
    const params = {}
    const ff = filters || {}
    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0) params[f.param] = f.value
        })
    }

    if (dvzProxyDatasetId) {
        params.dvzProxyDatasetId = dvzProxyDatasetId;
    }


    return (<DataProvider
        editing={editing}
        params={params}
        waitForFilters={waitForFilters}
        app={app}
        csv={decodeURIComponent(csv)}
        group={group}
        ignoreErrors={true}
        isSvg={true}
        store={[app, unique, id]}
        source={[apiJoinAttribute + (secondDimension)]}>
        <DataConsumer>
            <DataLayer {...props}></DataLayer>
        </DataConsumer>

    </DataProvider>)
}

export default injectIntl(DataWrapper)
