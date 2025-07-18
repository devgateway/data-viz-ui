import React, {useRef, useState} from "react";
import {Container} from "semantic-ui-react";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import {PostContent} from "@devgateway/wp-react-lib";
import {connect} from "react-redux";


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
        'data-number-font-size': numberFontSize = 20,
        'data-label-font-size': labelFontSize = 20,
        'data-number-color': numberColor = '#000000',
        'data-label-color': labelColor = '#000000',
        'data-label': label = '',
        "data-wait-for-filters": waitForFilters = "false",
        "data-no-data-text": noDataText = "-",
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
    return (<div ref={ref}>
        <Container className={"chart container big-number-container"} style={{"height": height + 'px'}} fluid={true}>
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
                          locale={locale}                          
                          intl={intl}
                          app={app}
                          format={numberFormat}
                          measure={parse(measures)[0] || null}
                            label={label}
                            numberFontSize={numberFontSize}
                            numberColor={numberColor}
                            labelFontSize={labelFontSize}
                            labelColor={labelColor}
                            noDataText={noDataText}
                          >
                       </DataFrame>
                    </DataConsumer>                
            </DataProvider>           

        </Container>
    </div>)

}

const DataFrame = (props) => {
    const { app, measure, data, format, label, numberColor, numberFontSize, 
        labelColor, labelFontSize, noDataText, intl } = props

    let measureField = measure
    let dataItem = data
    if (app == 'csv') {
        const { data: json, meta: { fields } } = data
        measureField = fields[0];   
        dataItem = data.data[0]    
    } 

    let formattedNumber = ''
    if (dataItem) {
        let number = dataItem[measureField] ? dataItem[measureField] : 0        
       if (number) {           
          formattedNumber = intl.formatNumber(format.style === 'percent' ? number / 100 : number, { ...format })
        } else {
           formattedNumber = noDataText
        }
    }
    const numberStyle = {
        color: decodeURIComponent(numberColor),
        fontSize: numberFontSize + 'px',
        textAlign: 'center'
    }
    const labelStyle = {
        color: decodeURIComponent(labelColor),
        fontSize: labelFontSize + 'px',
        textAlign: 'center'
    }
    return <div >
        <div style = {numberStyle} className={"big-number"}>{formattedNumber}</div>
        {label &&
          <div style = {labelStyle} className={"big-number-label"}>{label}</div>
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
