import React, {useEffect} from 'react';
import {connect} from "react-redux";
import * as d3 from 'd3' // d3 plugin
import * as topojson from "topojson-client";
import {Icon, Popup} from "semantic-ui-react";
import {FormattedMessage} from "react-intl";

/*
  id: Date.now(),
    name: 'New Layer',
    app: "csv",
    dimension1: "none",
    dimension2: "none",
    measures: [],

    filters: [],

    csv: "",

    file: 'none',

    opacity: 1,

    fillColor: '#FFFFFF',
    markFillColor: '#FFFFFF',

    borderColor: '#000000',
    markBorderColor: '#000000',
    markSizeScale: 2,

    labelColor: '#000000',
    markLabelColor: '#000000',
    labelFontSize: 2,

    labelFilter: [],
    labelSettings: {},

    labelField: 'none',
    type: 'base', //base layer user will select only a file
    //type:'shape', //shape layer user will select file and data source
    //type:'data', //will select data source and symbols + symbols configuration
    useBreaks: false,
    usePattern: false,

    format: {
        "style": "percent",
        "minimumFractionDigits": 1,
        "maximumFractionDigits": 1,
        "currency": "USD",
    },
    featureJoinAttribute: 'none',
    apiJoinAttribute: 'none',
    useCentroidPoint: false,
    patternDiscriminator: 'none',
    patterns: [],
    tooltip: "Value {value}",
    breaks: [],

* */
const BaseLayerLegend = (props) => {
    const {fillColor, borderColor, name} = props
    return <div className={"legend"}>
        <div className={"legend-item"}>
            <div className={"legend-color"} style={{backgroundColor: fillColor, borderColor: borderColor}}/>
            <div className={"legend-label"}>{name}</div>
        </div>
    </div>
}

const DataLayerLegend = (props) => {
    const {
        markFillColor,
        fillColor,
        markSizeScale,
        useCentroidPoint,
        name,
        useBreaks,
        breaks,
        usePatterns,
        patterns,
        measures,
        borderColor
    } = props


    return <div className={"legend"}>
        <div>
            <div className={"legend-item"}>
                <div className={"legend-color"} style={{backgroundColor: fillColor, borderColor: borderColor}}/>
                <div className={"legend-label"}>{name}</div>
            </div>
            {((useCentroidPoint && !useBreaks) || (!useCentroidPoint && !useBreaks)) && <div className={"legend-breaks"}>
                <div className={"break"}>
                    <div className={"break-item"} style={{
                        backgroundColor: markFillColor,
                    }}></div>
                    <div className={"break-label"}> {measures}</div>
                </div>
            </div>
            }

            {((!useCentroidPoint && useBreaks) || (useCentroidPoint && useBreaks)) && <div className={"legend-breaks"}>
                {breaks.map((b, i) => {
                    return (<div className={"break"}>
                        <div className={"break-item"} style={{
                            backgroundColor: b.color,
                        }}></div>
                        <div className={"break-label"}>  &lt; {b.end}</div>
                    </div>)
                })}
            </div>
            }
        </div>
    </div>
}
const Legends = (props) => {

    const {layers = []} = props;
    return <div className={"legends"}>
        {layers.map(l => {
            return <div>
                {l.type == "base" && <BaseLayerLegend {...l}/>}
                {l.type == "data" && <DataLayerLegend {...l}/>}
            </div>
        })}

    </div>
}

export default Legends