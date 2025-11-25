import React, {useRef, useState} from "react";
import {Container, Grid} from "semantic-ui-react";
import DataProvider from "../data/DataProvider.jsx";
import DataConsumer from "../data/DataConsumer.jsx";
import {PostContent} from "@devgateway/wp-react-lib";
import {connect} from "react-redux";
import {alphaSort} from "../utils/common.js";
import template from 'string-template';


const Chart = (props) => {
    const {
        editing = false,
        unique,
        intl,
        childContent,
        "data-csv": csv = "",
        "data-dvz-proxy-dataset-id": dvzProxyDatasetId,
        "data-no-data-message": noDataMsg = "No data matches your selection",
        "data-view-mode": editMode = 'info',
        'data-height': height,
        'data-app': app,
        'data-measures': measures = '{}',
        'data-format': format = '{}',
        'data-group': group,
        'data-filters': filters = '[]',
        'data-text-color': textColor = '#5a5d68',
        'data-back-ground-color': backgroundColor = 'none',
        'data-font-size': fontSize = 14,
        'data-dimension1': dimension1,        
        "data-wait-for-filters": waitForFilters = "false",
        "data-no-data-text": noDataText = "-" ,
        "data-manual-colors": manualColors = "{}",
        "data-default-bar-color": defaultBarColor = "#3182ce",
        "data-bar-background-color": barBackgroundColor = "none"

    } = props


    const locale = intl.locale
    const ref = useRef(null);
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
        return null
    }

    const formatObject = parse(format)
    const numberFormat = formatObject ? {
        style: (formatObject.style === 'compacted') ? 'decimal' : formatObject.style,
        notation: (formatObject.style === 'compacted') ? 'compact' : "standard",
        currency: formatObject.currency,
        minimumFractionDigits: parseInt(formatObject.minimumFractionDigits),
        maximumFractionDigits: parseInt(formatObject.maximumFractionDigits),
        prefix: formatObject.prefix ? formatObject.prefix : '',
        suffix: formatObject.suffix ? formatObject.suffix : ''
    } : {
        notation: "standard",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }

    const [mode, setMode] = useState(editMode)
    const viewMode = editing ? editMode : mode
    const contentHeight = (editing ? height - 80 : height - 40)

    const params = {}
    const ff = parse(filters) || {}

    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
    }

    if (dvzProxyDatasetId) {
        params.dvzProxyDatasetId = dvzProxyDatasetId;
      }

    const dimensions = []
    if (dimension1 != "none") {
        dimensions.push(dimension1)
    }

    return (<div ref={ref}>
        <Container className={`chart container grouped-bars-container ${editing ? 'editing' : ''}`} style={{"height": height + 'px', backgroundColor:backgroundColor}} fluid={true}>
            <DataProvider
                style={{"height": `${contentHeight}px`}}
                params={params}
                app={app}
                group={group}
                csv={csv}
                editing={editing}
                waitForFilters={waitForFilters === "true"}
                store={[app, unique, ...dimensions]} source={dimensions.join("/")}>
                    <DataConsumer>
                        <DataFrame
                        editing={editing}
                        locale={locale}
                        intl={intl}
                        app={app}
                        format={numberFormat}
                        dimension1={dimension1}
                        manualColors={parse(manualColors)}
                        measure={parse(measures)[0] || null}
                        fontSize={fontSize}
                        textColor={textColor}
                        backGroundColor={backgroundColor}
                        noDataText={noDataText}
                        defaultBarColor={defaultBarColor}
                        barBackgroundColor={barBackgroundColor}
                        >
                       </DataFrame>
                    </DataConsumer>
            </DataProvider>

        </Container>
    </div>)

}

const DataFrame = (props) => {
    const { editing,
        app, measure,
        dimension1,
        data,
        format,
        textColor,
        fontSize,             
        intl,
        noDataText,
        manualColors,
        defaultBarColor,
        barBackgroundColor
    } = props

    let dataItems = [];
    let dimensionField
    let measureField

    if (app =="csv") {
        const { data: json, meta: { fields } } = data
        dimensionField = fields[0];
        measureField = fields[1];
        dataItems = data.data.map(d => {
            return {
                value: d[dimensionField],
                [measureField]: d[measureField],
                [dimensionField]: d[dimensionField]
            }
        })
    } else {
        
        dataItems = !data.children  || data.children.length == 0 ? [] : data.children
        measureField = measure;
        dimensionField = dimension1;

        dataItems = dataItems.map(d => {
            return {
                value: d.value,
                [measureField]: d[measureField],
                [dimensionField]:d.value
            }
        })        
   }


    if (dataItems.length > 0) {
        dataItems = dataItems.sort((a, b) => {
            return alphaSort(false, intl.locale, a.value, b.value)
        })

        
    }

    const barTotal = dataItems.reduce((acc, item) => acc + item[measureField], 0)  ;
    if (dataItems.length == 0  || !measureField  || !dimensionField) {
        return (<div className="grouped-bars-data-frame">
            <div className="no-data-text" style={{"color":textColor}}>No data to display</div>
        </div>)
    }

    return (<div className="grouped-bars-data-frame">
        {dataItems.length > 0 && dataItems.map((item, index) => {
            const measureValue = item[measureField]
            const dimensionValue = item[dimensionField]
            const barWidth = measureValue && barTotal ? (measureValue / barTotal) * 100 : 0
            let barColor = defaultBarColor
            if (dimensionValue && manualColors && manualColors[app] && manualColors[app][dimensionValue]) {
                barColor = manualColors[app][dimensionValue]
            }
            
            return (<div key={index} className="grouped-bar-item" style={{"marginBottom":"10px"}}>
                <div style={{"display":"flex", "justifyContent":"space-between", "alignItems":"center", "marginBottom":"4px"}}>
                    <div className="grouped-bar-label" style={{"fontSize":fontSize + 'px', "color":textColor}}>{dimensionValue}</div>
                    <div className="grouped-bar-measure" style={{"fontSize":fontSize + 'px', "color":textColor}}>{
                    format.prefix + new Intl.NumberFormat(intl.locale, format).format(measureValue) + format.suffix}</div>
                </div>
                <div className="grouped-bar-bar-container" style={{"backgroundColor": barBackgroundColor, "height":"32px", "borderRadius":"8px", "overflow":"hidden", "position":"relative"}}>
                    <div className="grouped-bar-bar" style={{"width":barWidth + '%', "backgroundColor": barColor, "height":"100%", "display":"flex", "alignItems":"center", "paddingLeft":"8px"}}>
                        <span style={{"color":"#ffffff", "fontSize":"14px", "fontWeight":"500"}}>{barWidth.toFixed(1)}%</span>
                    </div>
                </div>
            </div>)
        })}
    </div>)
}


const mapStateToProps = (state, ownProps) => {
    const {"data-app": app, "data-group": group,} = ownProps
    const injectedMeasures = state.getIn(['data', 'measures', app, group])
    if (injectedMeasures) {
        return {
            "injectedMeasures": injectedMeasures,
        }
    } else {
        return {}
    }
}
const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(Chart)
