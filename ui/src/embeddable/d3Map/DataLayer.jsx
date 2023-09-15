import React from 'react';
import {connect} from "react-redux";
import BaseLayer from "./BaseLayer";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import Map from "../map/map";
import {parse} from "../utils/parseUtils";
import * as d3 from "d3";
import {injectIntl} from "react-intl";


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

class DataLayer extends BaseLayer {
    constructor() {
        super();
        this.createDataLayer = this.createDataLayer.bind(this)

    }


    createDataLayer(json) {
        const {
            format,
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
            tooltip,
            markFillColor,
            markBorderColor,
            markSizeScale,
            featureJoinAttribute,
            apiJoinAttribute,
            measures,
            editing,
            data,
            breaks,
            projection,
            intl
        } = this.props
        const g = d3.select(this.gRef.current)



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
                return sizeScale(value) * markSizeScale / projection.scale()
            }
            return markSizeScale
        }
        let getColor = (value) => {
            if (breaks.length > 0) {
                return colorScale(value)
            }
            return markFillColor
        }


        const filteredData = json.features.filter(f => f.properties._value != null)

        g.attr("class", "data-layer " + name)
        g.selectAll(".point").remove()
        g.selectAll(".point")
            .data(filteredData)
            .enter()
            .append("circle")
            .attr("fill", d => getColor(d.properties._value))
            .attr("stroke", markBorderColor)
            .attr("class", "point")
            .attr("stroke-width", 2)
            .style("vector-effect", "non-scaling-stroke")
            .attr("cx", d => path.centroid(d)[0])
            .attr("cy", d => path.centroid(d)[1])
            .attr('r', d => {
                return getSize(d.properties._value);
            })

            .on("mouseenter", (d) => {

                this.showToolTip(tooltip, d.properties, getColor(d.properties._value))

            })

            .on("mouseleave", (d) => {
                this.hiddenToolTip()
            })

        g.selectAll(".point-label").remove()
        g.selectAll(".point-label").data(filteredData)
            .enter()
            .append("text")
            .attr("class", "point-label")
            .attr("x", d => path.centroid(d)[0])
            .attr("y", d => path.centroid(d)[1])
            .attr("font-size", d => {

                return labelFontSize / projection.scale() + "em"
            })
            .attr("fill", labelColor)
            .text(d => {
                return intl.formatNumber(format.style === 'percent' ? d.properties._value / 100 : d.properties._value, numberFormat)

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
            measures
        } = this.props

        this.loadJSON(file).then(json => {

            const features = json.features.map(d => {

                const joinValue = d.properties[featureJoinAttribute]

                if (app != 'csv' && data && data.children) {
                    const values = data.children.filter(d => d.value.indexOf(joinValue) > -1)

                    if (values.length > 0) {
                        const measureValue = (values[0][measures[0]])
                        d.properties.meta = values[0]
                        d.properties._value = measureValue

                    } else {
                        d.properties._value = null
                    }

                } else if (app == 'csv') {
                    const values = data.data.filter(d => d[data.meta.fields[0]] == joinValue)
                    if (values.length > 0) {
                        d.properties.meta = values[0]
                        d.properties._value = values[0][data.meta.fields[1]]
                    } else {
                        d.properties._value = null
                    }


                } else {
                    d.properties._value = null
                }
                return d
            })


            const newJson = {...json, features}


            this.createBaseLayer(newJson)
            this.createDataLayer(newJson);


        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.create()
    }

    componentDidMount() {
        this.create()
        this.props.zoom.current.fullView()
    }

    render() {

        const {
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
            apiJoinAttribute,

            editing
        } = this.props

        return <g className={"data " + name} ref={this.gRef}/>
    }

}

const DataWrapper = (props) => {
    const {
        name, unique, filters, csv, app, group = "default", apiJoinAttribute, editing
    } = props

    return (<DataProvider
        editing={editing}
        params={filters}
        app={app}
        csv={decodeURIComponent(csv)}
        group={group}
        editing={editing}
        ignoreErrors={true}
        isSvg={true}
        store={[app, unique, name]}
        source={[apiJoinAttribute]}>
        <DataConsumer>
            <DataLayer {...props}></DataLayer>
        </DataConsumer>

    </DataProvider>)
}

export default injectIntl(DataWrapper)