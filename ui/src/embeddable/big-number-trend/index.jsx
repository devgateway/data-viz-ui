import React, {useRef, useState} from "react";
import {Container, Grid} from "semantic-ui-react";
import DataProvider from "../data/DataProvider.jsx";
import DataConsumer from "../data/DataConsumer.jsx";
import {PostContent} from "@devgateway/wp-react-lib";
import {connect} from "react-redux";
import {alphaSort} from "../utils/common.js";


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
        'data-show-percentage-change': showPercentageChange = 'false'
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
                store={[app, unique, ...dimensions]} source={dimensions.join("/")}>               
                    <DataConsumer>
                        <DataFrame
                          locale={locale}                          
                          intl={intl}
                          app={app}
                          format={numberFormat}
                          measure={parse(measures)[0] || null}
                            label={label}
                            bigNumberFontSize={bigNumberFontSize}
                            textColor={textColor}
                            labelFontSize={labelFontSize}
                            percentFontSize={percentFontSize}
                            showPercentageChange={showPercentageChange == 'true' || showPercentageChange == true} >
                       </DataFrame>
                    </DataConsumer>                
            </DataProvider>           

        </Container>
    </div>)

}

const DataFrame = (props) => {
    const { measure, data, format, label, textColor, bigNumberFontSize, percentFontSize, labelFontSize, showPercentageChange, intl } = props
    
    if (!data.children  || data.children.length == 0) {
        return null
    }

    data.children = data.children.sort((a, b) => {
        return alphaSort(false, intl.locale, a.value, b.value)
    })    

    let currentValue = data.children[data.children.length - 1][measure]
    let previousValue 
    if (data.children.length > 1) {
        previousValue = data.children[data.children.length - 2][measure]
    }    

    const formattedNumber = intl.formatNumber(format.style === 'percent' ? currentValue / 100 : currentValue, { ...format })
    let percentChange;
    let percentChangeFormatted;
    if (previousValue) {
        percentChange = ((currentValue - previousValue) / previousValue)
        percentChangeFormatted = intl.formatNumber(percentChange, { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
        <div className="label" style={labelStyle}>{label}</div>
        <div className="number-and-icon">
            <span className="number" style={numberStyle}>{formattedNumber}</span>
            {percentChange &&
                <img src={percentChange > 0 ? "/trend-up.svg" : "/trend-down.svg"} alt="Arrow" className="icon" />
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
