import React from 'react';
import {connect} from "react-redux";
import BaseLayer from "./BaseLayer";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import Map from "../map/map";
import {parse} from "../utils/parseUtils";
import * as d3 from "d3";


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
            markFillColor,
            markBorderColor,
            markSizeScale,
            featureJoinAttribute,
            apiJoinAttribute,
            measures,
            editing,
            data,
            projection
        } = this.props
        const g = d3.select(this.gRef.current)


        g.attr("class", "data-layer " + name)
        g.selectAll(".point").remove()
        g.selectAll(".point")
            .data(json.features)
            .enter()
            .append("circle")
            .attr("fill", markFillColor)
            .attr("stroke", markBorderColor)
            .attr("class", "point")
            .attr("stroke-width", 2)
            .style("vector-effect", "non-scaling-stroke")
            .attr("cx", d => path.centroid(d)[0])
            .attr("cy", d => path.centroid(d)[1])
            .attr('r', d => {
                return d.properties._value * markSizeScale / projection.scale();


            })


        g.selectAll(".label").remove()
        g.selectAll(".label").data(json.features)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", d => path.centroid(d)[0])
            .attr("y", d => path.centroid(d)[1])
            .attr("font-size", d => {
                return labelFontSize / projection.scale() + "em"
            })
            .attr("fill", labelColor)
            .text(d => {
                    if (d.properties._value * markSizeScale / projection.scale() < 0.5) {
                        return ""
                    } else {
                        return d.properties._value
                    }
                }
            )


    }


    create() {
        const {
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
            featureJoinAttribute,
            editing,
            data,
            measures
        } = this.props

        this.loadJSON(file).then(json => {


            const features = json.features.map(d => {
                if (data && data.children) {
                    debugger
                    const joinValue = d.properties[featureJoinAttribute]
                    const values = data.children.filter(d => d.value.indexOf(joinValue) > -1)
                    if (values.length > 0) {
                        const measureValue = (values[0][measures[0]])
                        d.properties._value = measureValue
                    } else {
                        d.properties._value = null
                    }
                } else {
                    d.properties._value = 99
                }
                return d
            })


            const newJson = {...json, features}


            this.createBaseLayer(newJson)
            this.createDataLayer(newJson);
            onLayerCreated()
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.create()
    }

    render() {

        const {
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

export default DataWrapper