import React, {useRef, useState} from "react";
import {Container, Grid, GridColumn} from "semantic-ui-react";
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
        'data-number-color': numberColor = '#5a5d68',
        'data-percent-color': percentColor = '#5a5d68',
        'data-back-ground-color': backgroundColor = '#5a5d68',



        'data-big-number-font-size': bigNumberFontSize = 20,
        'data-label-font-size': labelFontSize = 20,
        'data-percent-font-size': percentFontSize = 20,
        'data-label': label = '',
        'data-dimension1': dimension1,
        'data-show-percentage-change': showPercentageChange = 'false',
        "data-wait-for-filters": waitForFilters = "false",
        "data-no-data-text": noDataText = "-",

        "data-icon-image": iconImage = "",
        "data-icon-up": iconUp = "",
        "data-icon-down": iconDown = ""

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
        notation: "standard", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2
    }

    const [mode, setMode] = useState(editMode)
    const viewMode = editing ? editMode : mode
    const contentHeight = (editing ? height - 80 : height - 40)

    const params = {}
    const ff = parse(filters) || {}

    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0) params[f.param] = f.value
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
        <Container className={`alternative big number container ${editing ? 'editing' : ''}`}
                   style={{"height": height + 'px',backgroundColor:backgroundColor}}
                   fluid={true}>
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
                        iconImage={iconImage}
                        iconUp={iconUp}
                        iconDown={iconDown}
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
                        numberColor={numberColor}
                        percentColor={percentColor}
                        backGroundColor={backgroundColor}
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
const DataFrame2 = (props) => {

    return <div class={""} fluid={true}>
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column>
                    <img src={props.iconImage}></img>
                </Grid.Column>
                <Grid.Column>
                    <img src={props.iconUp}></img>
                    <img src={props.iconDown}></img>
                </Grid.Column>
            </Grid.Row>

        </Grid>
    </div>
}
const DataFrame = (props) => {
    const {
        editing,
        app,
        measure,
        dimension1,
        data,
        format,
        label,
        textColor,
        bigNumberFontSize,
        percentFontSize,
        labelFontSize,
        showPercentageChange,
        intl,
        noDataText
    } = props
    let dataItems = [];
    let dimensionField
    let measureField

    if (app == "csv") {
        const {data: json, meta: {fields}} = data
        dimensionField = fields[0];
        measureField = fields[1];
        dataItems = data.data.map(d => {
            return {
                value: d[dimensionField], [measureField]: d[measureField], [dimensionField]: d[dimensionField]
            }
        })
    } else {
        dataItems = !data.children || data.children.length == 0 ? [] : data.children
        measureField = measure;
        dimensionField = dimension1;

        dataItems = dataItems.map(d => {
            return {
                value: d.value, [measureField]: d[measureField], [dimensionField]: d.value
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


        formattedNumber = intl.formatNumber(format.style === 'percent' ? currentValue / 100 : currentValue, {...format})

        if (previousValue) {
            percentChange = ((currentValue - previousValue) / previousValue)
            percentChangeFormatted = intl.formatNumber(percentChange, {
                style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2
            })
        }
    }

    if (currentValue == null) {
        formattedNumber = noDataText;
    }

    const numberStyle = {
        color: decodeURIComponent(props.numberColor), fontSize: bigNumberFontSize + 'px',
    }
    const percentStyle = {
        color: decodeURIComponent(props.percentColor), fontSize: percentFontSize + 'px',
    }
    const labelStyle = {
        color: decodeURIComponent(textColor), fontSize: labelFontSize + 'px'
    }

    return <Grid padded={true}>
        <Grid.Row>
            <Grid.Column width={4}>

                {props.iconImage && props.iconImage != "" && <img className={"icon main"} src={props.iconImage}></img>}
            </Grid.Column>
            <Grid.Column textAlign={"right"} width={12}>

                <img className={`icon up ${percentChange > 0 ? 'visible' : 'hidden'}`} src={props.iconUp}></img>
                <img className={`icon up ${percentChange < 0 ? 'visible' : 'hidden'}`} s src={props.iconDown}></img>

                {showPercentageChange && percentChange &&
                    <div className="percentage" style={percentStyle}> {percentChange > 0 ? '+' : ''}
                        {percentChange == 0 ? '=' : ''}{percentChangeFormatted}</div>}
            </Grid.Column>

        </Grid.Row>
        <Grid.Row>
            <Grid.Column width={16}>
                <span className="number" style={numberStyle}>{formattedNumber}</span>
            </Grid.Column>

        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <div className="label" style={labelStyle}>{template(label, dataItems[dataItems.length - 1])}</div>
            </Grid.Column>
        </Grid.Row>

    </Grid>


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
