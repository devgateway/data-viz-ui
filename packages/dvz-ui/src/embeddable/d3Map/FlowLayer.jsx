import React from 'react';
import BaseLayer from "./BaseLayer.jsx";
import DataProvider from "../data/DataProvider.jsx";
import DataConsumer from "../data/DataConsumer.jsx";
import * as d3 from "d3";
import { injectIntl } from "react-intl";
import Papa from "papaparse";
import BreaksStyles from "./BreaksStyles.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            measures,
            zoom,
            offsetPixels = 10,
            waitForFilters,
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

        this.g.attr("class", "base-layer zoomable flow") //add unique name

        if (this.props.transform) {
            this.g.attr("transform", this.props.transform)
        }
        this.g.selectAll(".flow-line").remove()
        this.g.selectAll(".start-point").remove()
        this.g.selectAll(".end-point").remove()
        this.g.select("defs").selectAll("*").remove()

        const kLevel = this.props.transform ? this.props.transform.k : 1
        const originPoints = []
        //eslint-disable-next-line

        filteredData.forEach(d1 => {

            //collect starting points ro be rendered later and keep them on top of the svg layers
            originPoints.push(d1) //started points to be rendered later

            d1.properties.destinations.sort((a, b) => a[measure] - b[measure]).forEach(child => {

                const value = child[measure] //value by target country
                json.features.filter(feature => feature.properties[featureJoinAttribute] == child.value)
                    .forEach(d2 => {
                        d2.properties.meta = child
                        const originID = d1.properties[featureJoinAttribute]
                        const id = d1.properties[featureJoinAttribute] + "--" + d2.properties[featureJoinAttribute];


                        const startPx = path.centroid(d1); // [x1, y1] in pixels
                        const endPx = path.centroid(d2);   // [x2, y2] in pixels

                        const dx = endPx[0] - startPx[0];
                        const dy = endPx[1] - startPx[1];
                        const length = Math.sqrt(dx * dx + dy * dy);

                        const ux = dx / length;
                        const uy = dy / length;

                        const adjustedEndPx = [
                            endPx[0] - ux * offsetPixels,
                            endPx[1] - uy * offsetPixels
                        ];
                        const adjustedEndGeo = projection.invert(adjustedEndPx);

                        const link = {
                            type: "LineString",
                            coordinates: [
                                projection.invert(startPx), // Start in geo coords
                                adjustedEndGeo              // New endpoint before d2
                            ]
                        };
                        // Change these data to see ho the great circle reacts
                        //d1 is origin
                        //d2 is destination
                        const theG = this.g

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


                        theG.append("path")
                            .attr("d", path(link))
                            .attr("id", id)
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

                                theG.selectAll("marker").transition().duration("200").style("opacity", 0)
                                theG.selectAll(".start-point").transition().duration("200").style("opacity", 0)
                                theG.selectAll(".flow-line").transition().duration("200")
                                    .style("opacity", 0)

                                d3.select(event.target).transition().duration("200").style("opacity", 1)

                                theG.selectAll("#arrow" + id).transition().duration("200").style("opacity", 1)


                                theG.selectAll(".start-point.circle_" + originID).transition().duration("200").style("opacity", 1)

                                if (value) {
                                    const origin = {}
                                    const target = {}
                                    Object.keys(d1.properties).forEach(key => {
                                        origin["origin_" + key] = d1.properties[key]
                                    })


                                    Object.keys(d2.properties).forEach(key => {
                                        target["target_" + key] = d2.properties[key]
                                    })

                                    Object.keys(d2.properties.meta).forEach(key => {
                                        target["target_" + key] = d2.properties.meta[key]
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
                                theG.selectAll(".start-point").transition().duration("100").style("opacity", 1)
                                theG.selectAll("marker").transition().duration("100").style("opacity", 1)

                            })

                        theG.append("text")
                            .append("textPath") //append a textPath to the text element
                            .attr("xlink:href", id) //place the ID of the path here
                            .style("text-anchor", "middle") //place the text halfway on the arc
                            .attr("startOffset", "50%")
                            .attr("fill", "#fff")
                            .text("Yay, my text is on a wavy path");



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
                    return markSizeScale * 1 / kLevel
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


    _buildLayer(rawJson) {
        const {
            featureJoinAttribute,
            app,
            data,
            measures,
            csv,
        } = this.props

        const features = rawJson.features.map(d => {
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
                const parsed = Papa.parse(csv, { header: true, dynamicTyping: true });
                const origin = d.properties[featureJoinAttribute]
                const record = parsed.data.filter(r => r.origin == origin)[0]
                if (record != undefined) {
                    alert("CSV Not implemented Yet, please do it if you have time")
                    d.properties.meta = record
                    d.properties._value = record.value
                    d.properties.destinations = record.destination
                }
            }
            return d
        })

        this.createDataLayer({ ...rawJson, features });
    }

    create() {
        const { file } = this.props

        if (file != "none") {
            if (this.state.json) {
                // GeoJSON already cached — skip network request, just re-join and redraw
                this._buildLayer(this.state.json);
            } else {
                this.loadJSON(file).then(json => {
                    this.setState({ json }) // cache raw GeoJSON for future calls
                    this._buildLayer(json);
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { projection, editing, data, measures } = this.props
        const measuresChanged = (prevProps.measures || []).join('|') !== (measures || []).join('|')
        if (editing || prevProps.data !== data || prevProps.path !== this.props.path || measuresChanged) {
            this.create()
        }

        if (prevProps.visible != this.props.visible) {
            //eslint-disable-next-line

            this.g.style("display", this.props.visible ? "" : "none")
        }
    }

    componentDidMount() {
        this.create()
        this.props.zoom.current.fullView()
    }

    render() {

        const { id } = this.props

        return <g id={"data-" + id} className={"data " + id} ref={this.gRef}>
            <defs>

            </defs>
        </g>
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
        flowOrigin,
        editing,
        flowDestination,
        dvzProxyDatasetId,
        waitForFilters
    } = props

    const params = { dvzProxyDatasetId }

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
        waitForFilters={waitForFilters}
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
