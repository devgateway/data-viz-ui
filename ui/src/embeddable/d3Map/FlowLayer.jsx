import React, {useEffect} from 'react';
import {connect} from "react-redux";
import BaseLayer from "./BaseLayer";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import {parse} from "../utils/parseUtils";
import * as d3 from "d3";
import {injectIntl} from "react-intl";


class DataLayer extends BaseLayer {
    constructor() {
        super();
        this.createDataLayer = this.createDataLayer.bind(this)

    }


    createDataLayer(json) {
        const {
            app,
            svg,
            format,
            id,
            file,
            path,
            onLayerCreated,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            tooltip,
            markFillColor,
            markFillColor2,
            markLabelColor,
            markBorderColor,
            markBorderColor2,
            markSizeScale,
            markSizeScale2,
            markerLabelSize,
            featureJoinAttribute,
            apiJoinAttribute,
            measures,
            editing,
            data,
            patternDiscriminator,
            breaks,
            patterns,
            projection,
            useBreaks,
            useCentroidPoint,
            usePattern,
            patternWidth = .35,
            patternHeight = .25,
            intl,


        } = this.props


        let numberFormat = {
            style: (format.style === 'compacted') ? 'decimal' : format.style,
            notation: (format.style === 'compacted') ? 'compact' : "standard",
            currency: format.currency,
            minimumFractionDigits: parseInt(format.minimumFractionDigits),
            maximumFractionDigits: parseInt(format.maximumFractionDigits)
        }

        const sizeScale = d3.scaleThreshold()
            .domain(breaks.map(d => d.end))
            .range(breaks.map(d => d.size));

        const colorScale = d3.scaleThreshold()
            .domain(breaks.map(d => d.end))
            .range(breaks.map(d => d.color));

        let getSize = (value) => {
            if (breaks.length > 0) {
                return markSizeScale2 + sizeScale(value)
            }
            return markSizeScale2
        }

        let getColor = (value, isMarker) => {
            if (breaks.length > 0) {
                if (value > Math.max(...breaks.map(d => parseInt(d.end)))) {
                    return markFillColor
                } else {
                    return colorScale(value)
                }
            }
            return markFillColor
        }

        const filteredData = json.features.filter(f => f.properties._value != null)


        const getTooltipVariables = (d) => {
            if (d.properties._value) {
                const variables = {
                    ...d.properties, meta: {
                        [apiJoinAttribute]: d.properties.meta ? d.properties.meta.value : '', ...d.properties.meta,
                        value: d.properties._value
                    }
                }
                return variables
            }
            return {}

        }
        this.g = d3.select(this.gRef.current)
        this.g.attr("class", "base-layer") //add unique name
        if (this.props.transform) {
            this.g.attr("transform", this.props.transform)
        }
        this.g.selectAll(".flow-line").remove()
        this.g.selectAll(".start-point").remove()
        this.g.selectAll(".end-point").remove()
        this.g.select("defs").selectAll("*").remove()


        const k = this.props.transform ? this.props.transform.k : 1

        const originPoints = []


        filteredData.forEach(d1 => {
            //collect starting points ro be rendered later and keep them on top of the svg layers
            originPoints.push(d1)
            d1.properties.destinations.forEach(dest => {
                dest.children.forEach(child => {
                    json.features.filter(feature => feature.properties[featureJoinAttribute] == child.value)
                        .forEach(d2 => {


                            var link = {
                                type: "LineString", coordinates: [
                                    [projection.invert(path.centroid(d1))[0],
                                        projection.invert(path.centroid(d1))[1]
                                    ],
                                    [projection.invert(path.centroid(d2))[0],
                                        projection.invert(path.centroid(d2))[1]]]
                            } // Change these data to see ho the great circle reacts

                            this.g.select("defs")
                                .append("marker")
                                .attr("id", "arrow" + d1.properties[featureJoinAttribute])
                                .attr("markerUnits", "strokeWidth")
                                .attr("markerWidth", "6")
                                .attr("markerHeight", "6")
                                .attr("viewBox", "0 0 12 12")
                                .attr("refX", "6")
                                .attr("refY", "6")
                                .attr("orient", "auto")
                                .append("path")

                                .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
                                .attr("style", "fill: " + getColor(d1.properties._value) + ";");

                            const g = this.g;

                            this.g.append("path")

                                .attr("d", path(link))
                                .attr("class", "flow-line")
                                .style("fill", "none")
                                .style("cursor", "pointer")
                                .style("stroke-dasharray", "0")
                                .style("stroke", d => {
                                    return getColor(d1.properties._value)
                                })
                                .style("stroke-width", d => {
                                    return getSize(d1.properties._value)
                                })
                                .attr("marker-end", "url(#arrow" + d1.properties[featureJoinAttribute] + ")")

                                .on("mouseenter", d => {
                                    g.selectAll("marker").transition().duration("200").style("opacity", 0)
                                    g.selectAll(".start-point").transition().duration("200").style("opacity", 0)
                                    g.selectAll(".flow-line").transition().duration("200")
                                        .style("opacity", 0)
                                    d3.select(d3.event.target).transition().duration("200").style("opacity", 1)
                                    g.selectAll("#arrow" + d1.properties[featureJoinAttribute]).transition().duration("200").style("opacity", 1)
                                    g.selectAll(".start-point.circle_" + d1.properties[featureJoinAttribute]).transition().duration("200").style("opacity", 1)

                                    if (d1.properties._value) {
                                        const origin = {}
                                        const target = {}
                                        Object.keys(d1.properties).forEach(key => {
                                            origin["origin_" + key] = d1.properties[key]
                                        })
                                        Object.keys(d2.properties).forEach(key => {
                                            target["target_" + key] = d2.properties[key]
                                        })
                                        const variables = {
                                            ...origin,
                                            ...target,
                                            meta: {
                                                [apiJoinAttribute]: d1.properties.meta ? d1.properties.meta.value : '',
                                                ...d1.properties.meta,
                                                value: d1.properties._value,
                                            }
                                        }
                                        this.showToolTip(tooltip, variables, getColor(d1.properties._value))
                                    }
                                })
                                .on("mouseout", d => {
                                    /*Hidden others paths*/
                                    this.hiddenToolTip()
                                    d3.selectAll(".flow-line").transition().duration("100").style("opacity", 1)
                                    g.selectAll(".start-point").transition().duration("100").style("opacity", 1)
                                    g.selectAll("marker").transition().duration("100").style("opacity", 1)

                                })


                        })


                })
            })
        })
        originPoints.forEach(d1 => {
            this.g.append("circle")
                .attr("fill", getColor(d1.properties._value))
                .attr("stroke", markBorderColor)
                .attr("class", "start-point circle_" + d1.properties[featureJoinAttribute])
                .attr("stroke-width", 2)
                .style("vector-effect", "non-scaling-stroke")
                .attr("cx", path.centroid(d1)[0])
                .attr("cy", path.centroid(d1)[1])
                .attr('r', () => {
                    return markSizeScale * 1 / k
                })
        })
    }


    create() {
        const {
            app,
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
            featureJoinAttribute,
            editing,
            data,
            breaks,
            markFillColor,
            markSizeScale,
            measures,
            patternDiscriminator
        } = this.props


        if (file != "none") {
            this.loadJSON(file).then(json => {

                const features = json.features.map(d => {
                    const joinValue = d.properties[featureJoinAttribute]

                    if (app != 'csv' && data && data.children) {
                        const values = data.children.filter(d => d.value.indexOf(joinValue) > -1)
                        if (values.length > 0) {
                            const measureValue = (values[0][measures[0]])
                            d.properties.meta = values[0]
                            d.properties._value = measureValue
                            d.properties.destinations = values
                        }
                    } else if (app == 'csv') {
                        debugger;
                    }
                    return d
                })
                const newJson = {...json, features}
                this.createDataLayer(newJson);
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {projection} = this.props
        this.create()
    }

    componentDidMount() {
        this.create()
        this.props.zoom.current.fullView()
    }

    render() {

        const {
            id,
            file,
            path,
            zoom,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            featureJoinAttribute,
            apiJoinAttribute,
            editing,
            markFillColor2,
        } = this.props

        return <g id={"data-" + id} className={"data " + id} ref={this.gRef}>
            <defs>

            </defs>
        </g>
    }

}

const DataWrapper = (props) => {
    const {
        id, unique, filters, csv, app, group = "default", flowOrigin, editing, flowDestination,
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
        source={flowOrigin + "/" + flowDestination}>
        <DataConsumer>
            <DataLayer {...props}></DataLayer>
        </DataConsumer>

    </DataProvider>)
}

export default injectIntl(DataWrapper)