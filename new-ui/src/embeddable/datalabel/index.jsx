import React, {useRef, useState} from "react";
import {Container} from "semantic-ui-react";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import {PostContent} from "@devgateway/wp-react-lib";
import Messages from "../common/Messages";
import {connect} from "react-redux";

const Chart = (props) => {
    const {
        editing = false,
        unique,
        intl,
        childContent,
        "data-csv": csv = "",
        "data-no-data-message": noDataMsg = "No data matches your selection",
        "data-view-mode": editMode = 'info',
        'data-height': height,
        'data-dimension1': dimension1,
        'data-app': app,
        'data-measures': measures = {},
        'data-format': format = '{}',
        'data-group': group,
        'data-filters': filters = [],
        'data-value-type': valueType
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

    let showNotEnoughParameters = false

    const dimensions = []
    if (dimension1 != 'none') {
        dimensions.push(dimension1)
    }

    if (app != 'csv') {
        if (!dimensions.length || !parse(measures)[0]) {
            showNotEnoughParameters = true
        }
    }

    return (<div ref={ref}>
        <Container className={"chart container data-label"} style={{"height": height + 'px'}} fluid={true}>
            <DataProvider
                style={{"height": `${contentHeight}px`}}
                params={params}
                app={app}
                group={group}
                csv={csv}
                editing={editing}
                store={[app, unique, ...dimensions]} source={dimensions.join("/")}>
                <Container style={{"height": `${contentHeight}px`}} className={"body data-label-body"} fluid={true}>
                    {!showNotEnoughParameters && <DataConsumer>
                        <DataFrame
                          locale={locale}
                          dimensions={[...dimensions]}
                          valueType={valueType}
                          intl={intl}
                          app={app}
                          format={numberFormat}
                          measure={parse(measures)[0] || null}>

                        </DataFrame>
                    </DataConsumer>}
                </Container>
            </DataProvider>

            <br/>
            {childContent && viewMode == 'info' &&
                <Container fluid={true} style={{"height": contentHeight + 'px'}} className={"body data-label-body"}>
                    <PostContent post={{content: {rendered: childContent}}}></PostContent>
                </Container>}

        </Container>
    </div>)

}

const DataFrame = (props) => {
    const {valueType, measure, data, format, intl} = props
    let formattedLabel = 'N/A'
    if (valueType === 'first') {
        const labelData =data.children[0][measure]
        formattedLabel = intl.formatNumber(format.style === 'percent' ? labelData / 100 : labelData, {...format})
    } else if (valueType === 'total') {
        const labelData = data[measure]
        formattedLabel = intl.formatNumber(format.style === 'percent' ? labelData / 100 : labelData, {...format})
    } else if (valueType === 'min' && !isNaN(data[measure])) {
        const labelData = Math.min(...data.children.map(d => d[measure]))
        formattedLabel = intl.formatNumber(format.style === 'percent' ? labelData / 100 : labelData, {...format})
    } else if (valueType === 'max' && !isNaN(data[measure])) {
        const labelData = Math.max(...data.children.map(d => d[measure]))
        formattedLabel = intl.formatNumber(format.style === 'percent' ? labelData / 100 : labelData, {...format})
    } else if (valueType === 'avg' && !isNaN(data[measure])) {
        const values = data.children.map(d => d[measure])
        const labelData = values.reduce((a, b) => a + b, 0) / values.length
        formattedLabel = intl.formatNumber(format.style === 'percent' ? labelData / 100 : labelData, {...format})
    }
    return <div>{formattedLabel}</div>
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
