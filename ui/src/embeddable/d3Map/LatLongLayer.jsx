import React, {useEffect} from 'react';
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

class DataLayer extends React.Component {

    constructor() {
        super();
        this.create = this.create.bind(this)
        this.gRef = React.createRef();
    }

    create() {

        const {
            app, data, markFillColor, markBorderColor, markSizeScale, markerLabelSize, measures, projection, name
        } = this.props

        let points = []
        const g = d3.select(this.gRef.current)

        if (app != 'csv' && data && data.children) {


        } else if (app == 'csv') {

            const latField = data.meta.fields[0]
            const longField = data.meta.fields[1]
            const valueField = data.meta.fields[2]

            points = data.data.map((d) => {

                return {
                    x: d[latField], y: d[longField], value: d[valueField]
                }
            })


        }
        g.attr("class", "lat-long " + name)
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
            .attr("r", markSizeScale)
            .attr("stroke-width", 2)
            .style("vector-effect", "non-scaling-stroke")
            .attr("stroke", markBorderColor)
            .attr("fill", markFillColor)


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
            name,

        } = this.props

        return <g className={"latLong " + name} ref={this.gRef}/>
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