import React from 'react';
import {connect} from "react-redux";
import BaseLayer from "./BaseLayer";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import Map from "../map/map";
import {parse} from "../utils/parseUtils";


const getFilters = (filters) => {
    const ff = parse(filters) || []
    let params = {};
    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
    } else {
        params = ff;
    }

    return params
}

class DataLayer extends BaseLayer {
    constructor() {
        super();
    }

    render() {

        const {layer} = this.props

        console.log(layer)
        return super.render();
    }

}

const DataWrapper = (props) => {
    const {
        name,
        unique,
        filters,
        csv,
        app,
        group="default",
        apiJoinAttribute,
        editing
    } = props


    return (<DataProvider
        params={getFilters(filters)}
        app={app}
        csv={decodeURIComponent(csv)}
        group={group}
        editing={editing}
        store={[app, unique, name]}
        source={[apiJoinAttribute]}>
        <DataConsumer>
            <DataLayer {...props}></DataLayer>
        </DataConsumer>

    </DataProvider>)
}

export default DataWrapper