import React, {useEffect} from 'react';
import {connect} from "react-redux";
import BaseLayer from "./BaseLayer.jsx";
import DataProvider from "../data/DataProvider.jsx";
import DataConsumer from "../data/DataConsumer.jsx";
import {parse} from "../utils/parseUtils.js";
import * as d3 from "d3";
import {injectIntl} from "react-intl";

import BreaksStyles from "./BreaksStyles.js";

class DataLayer extends BaseLayer {
    constructor() {
        super();
        this.createDataLayer = this.createDataLayer.bind(this)

    }


    createDataLayer(json) {
        const {
            format,
            path,
            tooltip,
            markFillColor,
            markBorderColor,
            markSizeScale, //circle size
            featureJoinAttribute,
            apiJoinAttribute,
            projection,
            breaks,
            markSizeScale2, //arrow size
            flowValuesFrom,
            measures,
        } = this.props

        const measure = measures[0];


        const brStyles = new BreaksStyles({
            breaks: breaks,
            defaultFillColor: markFillColor,
            defaultBorderColor: markBorderColor,
            defaultSize: markSizeScale2
        })

        const numberFormat = {
            style: (format.style === 'compacted') ? 'decimal' : format.style,
            notation: (format.style === 'compacted') ? 'compact' : "standard",
            currency: format.currency,
            minimumFractionDigits: parseInt(format.minimumFractionDigits),
            maximumFractionDigits: parseInt(format.maximumFractionDigits)
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
            originPoints.push(d1) //started points to be rendered later

            d1.properties.destinations.forEach(child => {
                const value = child[measure] //value by target country

                json.features.filter(feature => feature.properties[featureJoinAttribute] == child.value)
                    .forEach(d2 => {

                        const originID = d1.properties[featureJoinAttribute]
                        const id = d1.properties[featureJoinAttribute] + "--" + d2.properties[featureJoinAttribute];

                        const link = {
                            type: "LineString", coordinates: [
                                [projection.invert(path.centroid(d1))[0],
                                    projection.invert(path.centroid(d1))[1]
                                ],
                                [projection.invert(path.centroid(d2))[0],
                                    projection.invert(path.centroid(d2))[1]]]
                        } // Change these data to see ho the great circle reacts
                        //d1 is origin
                        //d2 is destination

                        this.g.select("defs")
                            .append("marker")
                            .attr("id", "arrow" + id)
                            .attr("markerUnits", "strokeWidth")
                            .attr("markerWidth", "6")
                            .attr("markerHeight", "6")
                            .attr("viewBox", "0 0 24 24")
                            .attr("refX", "6")
                            .attr("refY", "6")
                            .attr("orient", "auto")
                            .append("path")
                            .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
                            .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
                            .attr("style", e => {

                                return "fill: " + brStyles.getColor(value) + ";"
                            });

                        const g = this.g;

                        this.g.append("path")

                            .attr("d", path(link))
                            .attr("class", "flow-line")
                            .style("fill", "none")
                            .style("cursor", "pointer")
                            .style("stroke-dasharray", "0")
                            .style("stroke", d => {

                                return brStyles.getColor(value)
                            })
                            .style("stroke-width", d => {

                                return brStyles.getSize(value)
                            })
                            .attr("marker-end", "url(#arrow" + id + ")")

                            .on("mouseenter", (event, d) => {
                                g.selectAll("marker").transition().duration("200").style("opacity", 0)
                                g.selectAll(".start-point").transition().duration("200").style("opacity", 0)
                                g.selectAll(".flow-line").transition().duration("200")
                                    .style("opacity", 0)

                                d3.select(event.target).transition().duration("200").style("opacity", 1)

                                g.selectAll("#arrow" + id).transition().duration("200").style("opacity", 1)


                                g.selectAll(".start-point.circle_" + originID).transition().duration("200").style("opacity", 1)

                                if (value) {
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
                                            value,
                                        }
                                    }
                                    this.showToolTip(tooltip, variables, brStyles.getColor(d2.properties._value))
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

        originPoints.forEach(d1 => {
            this.g.append("circle")
                .attr("fill", markFillColor)
                .attr("stroke", markBorderColor)
                .attr("class", "start-point circle_" + d1.properties[featureJoinAttribute])
                .attr("stroke-width", 2)
                .style("vector-effect", "non-scaling-stroke")
                .attr("cx", path.centroid(d1)[0])
                .attr("cy", path.centroid(d1)[1])
                .attr('r', () => {
                    return markSizeScale * 1 / k
                })
                .on("mouseenter", d => {

                    this.showToolTip("{name_en}", d1.properties, "")

                })
                .on("mouseout", d => {
                    /*Hidden others paths*/
                    this.hiddenToolTip()


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
            flowValuesFrom
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
                            d.properties.destinations = values[0].children
                        }
                    } else if (app == 'csv') {
                        // do something
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

        const {id} = this.props

        return <g id={"data-" + id} className={"data " + id} ref={this.gRef}>
            <defs>

            </defs>
        </g>
    }

}

const DataWrapper = (props) => {
    const {id, unique, filters, csv, app, group = "default", flowOrigin, editing, flowDestination} = props

    const params = {}

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
