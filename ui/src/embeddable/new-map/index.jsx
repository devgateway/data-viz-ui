import React from 'react';
import { connect } from "react-redux";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import Map from './map';
import MapDataFrame from './MapDataFrame';
import MapCSVDataFrame from './MapCSVDataFrame';


const theMap=(props) => {

    return <h1>MAP</h1>
}

const MapWrapper = (props) => {
    const {
        unique,
        editing,
        "data-filters": filters = '{}',
        "data-group": group = "default",
        "data-app": app = 'csv',
        "data-csv": csv = '',
        'data-dimension1': dimension1 = '',
        'data-dimension2': dimension2 = '',
        "data-height": height = 600,
          width = 960,


    } = props  

    const decode = (value) => {
        if (editing) {
            return value
        }
        return decodeURIComponent(value)
    }

    const parse = (value) => {
        try {
            return JSON.parse(decode(value))
        } catch (error) {
            console.error("error parsing value:" + value)
        } 
    }

    const getBreaks = (legendBreaks) => {
        let legendBreaksNew = parse(legendBreaks) || []
        legendBreaksNew = legendBreaksNew.map((b) => {
            if (b.min) {
                b.min =  parseFloat(b.min);
            }
            
            if (b.max) {
                b.max =  parseFloat(b.max);
            }    
    
            b.color = decodeURIComponent(b.color);
            return b;    
        })

        return legendBreaksNew;
    }

    const getFilters = (filters) => {
        const ff = parse(filters)  || []  
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



    
    const DataFrame = app === "csv" ? MapCSVDataFrame : MapDataFrame;   
    let measuresCSV = editing ? (parse(measures) || []).join(',') : measures    
    return (<DataProvider 
        params={getFilters(filters)}
        app={app}
        csv={decodeURIComponent(csv)}
        group={group}
        editing={editing}
        store={[app, unique, ...source.split("/")]} source={source}>
        <DataConsumer>
            <DataFrame measures={measuresCSV}>

            </DataFrame>
        </DataConsumer>

    </DataProvider>);

};

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(MapWrapper)
