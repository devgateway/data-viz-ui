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
    }

    create() {

        const {
            app,
            data,
            measures
        } = this.props


        const g = d3.select(this.gRef.current)

        if (app != 'csv' && data && data.children) {


        } else if (app == 'csv') {
            console.log(data.fields)
            const latField=data.meta.fields[0]
            const longField=data.meta.fields[1]
            const valueField=data.meta.fields[2]

            g.attr("class", "data-layer ")
            g.selectAll(".latLong").remove()
            g.selectAll(".latLong-label").remove()




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