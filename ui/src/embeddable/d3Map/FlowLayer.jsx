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
            markLabelColor,
            markBorderColor,
            markSizeScale,
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
            if (breaks.length > 0 && useBreaks) {
                return markSizeScale + sizeScale(value)
            }
            return markSizeScale
        }

        let getColor = (value, isMarker) => {

            if (breaks.length > 0 && useBreaks) {
                return colorScale(value)
            }

            if (isMarker) {
                return markFillColor
            }
            return fillColor
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
        this.createPaths(json)

        this.g.selectAll(".point").remove()
        this.g.selectAll(".point-label").remove()


        const k = this.props.transform ? this.props.transform.k : 1

        filteredData.forEach(d1 => {

            this.g.append("circle")
                .attr("fill", "red")
                .attr("stroke", "green")
                .attr("class", "point")
                .attr("stroke-width", 2)
                .style("vector-effect", "non-scaling-stroke")
                .attr("cx", path.centroid(d1)[0])
                .attr("cy", path.centroid(d1)[1])
                .attr('r', () => {
                    return 10
                })
            d1.properties.destinations.forEach(dest => {
                dest.children.forEach(child => {
                    json.features.filter(feature => feature.properties[featureJoinAttribute] == child.value)
                        .forEach(d2 => {
                               this.g.append("circle")
                                    .attr("fill", "green")
                                    .attr("stroke", "green")
                                    .attr("class", "point")
                                    .attr("stroke-width", 2)
                                    .style("vector-effect", "non-scaling-stroke")
                                    .attr("cx", path.centroid(d2)[0])
                                    .attr("cy", path.centroid(d2)[1])
                                    .attr('r', () => {
                                        return 10
                                    })



                            var link = {type: "LineString", coordinates: [
                                    [    projection.invert(path.centroid(d2))[0],
                                        projection.invert(path.centroid(d2))[1]
                                    ],
                                    [projection.invert(path.centroid(d1))[0],
                                        projection.invert(path.centroid(d1))[1]]]} // Change these data to see ho the great circle reacts

                            this.g.append("path")
                                .attr("d", path(link))

                                .style("fill", "none")
                                .style("stroke", "orange")
                                .style("stroke-width",3 )

                        })


                })
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
                            d.properties._value = 1
                            d.properties.destinations = values
                        }


                    } else if (app == 'csv') {

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

            editing
        } = this.props

        return <g id={"data-" + id} className={"data " + id} ref={this.gRef}/>
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