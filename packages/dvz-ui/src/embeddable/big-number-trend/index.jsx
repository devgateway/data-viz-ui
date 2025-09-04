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
        'data-text-color': textColor = '#000000',        
        'data-big-number-font-size': bigNumberFontSize = 20,
        'data-label-font-size': labelFontSize = 20,
        'data-percent-font-size': percentFontSize = 20,        
        'data-label': label = '',
        'data-dimension1': dimension1,
        'data-show-percentage-change': showPercentageChange = 'false',
        "data-wait-for-filters": waitForFilters = "false",
        "data-no-data-text": noDataText = "-"

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
        maximumFractionDigits: parseInt(formatObject.maximumFractionDigits)
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
        <Container className={"chart container big-number-trend-container"} style={{"height": height + 'px'}} fluid={true}>
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
                          measure={parse(measures)[0] || null}
                            label={label}
                            bigNumberFontSize={bigNumberFontSize}
                            textColor={textColor}
                            labelFontSize={labelFontSize}
                            percentFontSize={percentFontSize}
                            showPercentageChange={showPercentageChange == 'true' || showPercentageChange == true} 
                            noDataText={noDataText}
                            >
                       </DataFrame>
                    </DataConsumer>                
            </DataProvider>           

        </Container>
    </div>)

}

const DataFrame = (props) => {
    const { editing, app, measure, dimension1, data, format, label, textColor, bigNumberFontSize, 
        percentFontSize, labelFontSize, showPercentageChange, intl, noDataText} = props
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
    
    let currentValue = null
    let previousValue = null
    let percentChange;
    let percentChangeFormatted;
    let formattedNumber

    if (dataItems.length > 0) {
        dataItems = dataItems.sort((a, b) => {
            return alphaSort(false, intl.locale, a.value, b.value)
        })

        currentValue = dataItems[dataItems.length - 1][measureField]

        if (dataItems.length > 1) {
            previousValue = dataItems[dataItems.length - 2][measureField]
        }


        formattedNumber = intl.formatNumber(format.style === 'percent' ? currentValue / 100 : currentValue, { ...format })

        if (previousValue) {
            percentChange = ((currentValue - previousValue) / previousValue)
            percentChangeFormatted = intl.formatNumber(percentChange, { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })
        } 
    } 

    if (currentValue == null) {
       formattedNumber = noDataText;
    }   

    const numberStyle = {
        color: decodeURIComponent(textColor),
        fontSize: bigNumberFontSize + 'px',
    }
    const percentStyle = {
        color: decodeURIComponent(textColor),
        fontSize: percentFontSize + 'px',
    }
    const labelStyle = {
        color: decodeURIComponent(textColor),
        fontSize: labelFontSize + 'px'        
    }

    return <div className="trend">       
           <div className="label" style={labelStyle}>{template(label, dataItems[dataItems.length - 1])}</div>      

        <div className="number-and-icon">
            <span className="number" style={numberStyle}>{formattedNumber}</span>
            {percentChange &&
                <div className={percentChange > 0 ? "icon trend arrow up" : "icon trend arrow down"}/>
            }
        </div>
        {showPercentageChange && percentChange &&
            <div className="percentage" style={percentStyle}>{percentChangeFormatted}</div>
        }
    </div>
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
