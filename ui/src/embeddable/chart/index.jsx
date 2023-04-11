import React, {useRef, useState} from "react";
import {Container} from "semantic-ui-react";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import {buildDivergingOptions, buildPieOptions} from './prevalenceBuilder'
import HalfPie from "./Pie";
import Bar from "./Bar";
import Line from "./Line";
import {PostContent} from "@devgateway/wp-react-lib";
import dataFrames from './data/index'


import CSVDataFrame from "./CSVDataFrame";
import ColorProvider from "./colors/ColorProvider"
import Messages from "./Messages";
import {connect} from "react-redux";

const PieChart = (props) => {
    const {data, legends, colors, height} = props
    const options = buildPieOptions(data, true)
    return <HalfPie height={height} legends={legends} colors={colors} options={options}
                    format={{style: "percent"}}></HalfPie>
}

const Diverging = (props) => {
    const {data, legends, colors, height} = props
    const options = buildDivergingOptions(data, true)
    return <Diverging height={height} legends={legends} colors={colors} options={options}
                      format={{style: "percent", currency: "EUR"}}></Diverging>
}
const Chart = (props) => {
    const {
        parent,
        editing = false,
        unique,
        childContent,
        categories,
        injectedMeasures,
        "data-app": app = "prevalence",
        "data-group": group = "default",
        "data-height": height = 500,
        "data-type": type = 'bar',
        //'data-source': source = 'gender/smoke',f
        'data-dimension1': dimension1,
        'data-dimension2': dimension2,
        'data-dimension3': dimension3,
        'data-color-by': colorBy = 'index',
        'data-scheme': scheme = 'system',
        'data-group-mode': groupMode = 'grouped',
        'data-left-legend': left = 'Left Legend',
        'data-legend-label': legendLabel = "",
        'data-bottom-legend': bottom = 'Bottom Legend',
        'data-dualmode': dualMode,
        'data-legend-position': legendPosition = "right",
        'data-show-legends': showLegends = "true",
        'data-data-source-label': dataSourceLabel = "Source",
        'data-chart-data-source': dataSource = "Data Source",
        'data-toggle-info-label': toggleInfoLabel = "Info Graphic",
        'data-toggle-chart-label': toggleChartLabel = "Chart",
        //'data-number-format': format = '{"style":"percent", "minimumFractionDigits": 1, "maximumFractionDigits": 1}',
        'data-tick-rotation': tickRotation = 0,
        'data-tick-color': tickColor = "rgb(92,93,99)",
        'data-measures': measures = "{}",
        'data-format': format = "{}",
        "data-csv": csv = "",
        "data-margin-left": marginLeft = 50,
        "data-margin-top": marginTop = 25,
        "data-margin-right": marginRight = 25,
        "data-margin-bottom": marginBottom = 25,
        "data-start-angle": startAngle = 0,
        "data-end-angle": endAngle = 360,
        "data-view-mode": editMode = 'info',
        "data-filters": filters = '[]', //filters
        "data-tooltip-html": tooltip = "",
        "data-layout": layout = "vertical",
        "data-reverse": reverse = "false",
        "data-offset-y": offsetY = "-40",
        "data-line-layer-enabled": lineLayerEnabled = "false",

        //"data-csv-line-layer-data": csvLineLayerData = "",
        //"data-csv-line-color": lineColor = "#000000",
        //"data-csv-line-tooltip": lineTooltip = "",
        //"data-csv-line-title": lineTitle = "",

        "data-overlays": overlays,
        "data-max-value": maxValue = 'auto',
        "data-value-scale": valueScale = "linear",
        "data-swap": swap = "false",
        "data-no-data-message": noDataMsg = "No data matches your selection",
        "data-bar-color": barColor = "rgb(0,0,0)",
        "data-override-tick-color": overrideTickColor = "false",
        "data-fixed-min-value": fixedMinValue = 0,
        "data-fixed-max-value": fixedMaxValue = 0,
        "data-bar-padding": barPadding = 0.15,
        "data-bar-label-position": barLabelPosition = "middle",
        "data-show-grid": showGrid = "true",
        "data-include-overall": includeOverall = "false",
        "data-bar-inner-padding": barInnerPadding = .7,
        "data-x-label-color": xLabelColor = "#000",
        "data-bar-label-color": barLabelColor = "#000",
        "data-legend-label-color": legendLabelColor = "#000",
        "data-tooltip-enabled": tooltipEnabled = "true",
        "data-use-check-box-background": legendCheckBack = "false",
        "data-use-label-background": legendLabelBack = "true",
        "data-highlight-xaxis-line": highlightXAxisLine = "false",
        "data-show-tick-line": showTickLine = "true",
        "data-show-right-axis": showRightAxis = "true",
        "data-manual-colors": manualColors = "{}",
        "data-right-legend": rightLegend = "",
        "data-offset-right": offsetRight = "40",
        "data-offset-bottom": offsetBottom = "40",
        "data-hidden-bars": hiddenBars = [],
        "data-confidence-intervals": confidenceIntervals = "[]",
        "data-enable-area": enableArea = "false",
        "data-area-shading-criteria": areaShadingCriteria = "DEFAULT",
        "data-area-lower-bound": areaLowerBound = "",
        "data-area-upper-bound": areaUpperBound = "",
        "data-show-points": showPoints = "true",
        "data-center-label": centerLabel = "",
        "data-show-arc-labels": showArcLabels = "true",
        "data-show-arc-link-labels": showArcLinkLabels = "true",
        "data-slice-padding": slicePadding = 1,
        "data-center-label-font-weight": centerLabelFontWeight = "normal",
        "data-center-label-font-size": centerLabelFontSize = "12",
        "data-center-label-xoffset": centerLabelXOffset = 0,
        "data-center-label-yoffset": centerLabelYOffset = 0,
        "data-group-total-measure": groupTotalMeasure = "",
        "data-show-group-total": showGroupTotal = "true",
        "data-group-total-label": groupTotalLabel = "",
        "data-group-total-format": groupTotalFormat = "{}",
        "data-group-total-label-offset": groupTotalOffset,
        "data-group-total-fixed-position": groupTotalFixedPosition = "false",
        "data-tooltip-enable-markdown": tooltipEnableMarkdown = "false",
        "data-y-axis-tick-values": yAxisTickValues = "10",
        "data-enable-grid-y": enableGridY = "true",
        "data-enable-grid-x": enableGridX = "false",
        "data-offset-text": offsetText = 0,
        "data-overall-label": overallLabel = "Overall",
        "data-min-max-clamp": minMaxClamp = "false",
        "data-reverse-legend": reverseLegend = "false"
    } = props

    const locale = props.intl.locale
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

    const getManualColor = () => {
        return parse(manualColors)[app]
    }

    const getMeasuresObject = () => {
        return parse(measures)
    }
    const getSelectedFormat = () => {        
        if (measuresObject[app]) {
            let format = measuresObject[app].format
            if (!format) {
                const keys = Object.keys(measuresObject[app])
                for (let i = 0; i < keys.length; i++) {
                    if (measuresObject[app][keys[i]].selected && measuresObject[app][keys[i]].format) {
                        format = measuresObject[app][keys[i]].format
                        break
                    }                
                }               
            }           
            
            return format
        } else {
            return measuresObject && measuresObject["csv"] ? measuresObject["csv"].format : null
        }
    }
    const getSelectedMeasures = () => {
        if (measuresObject[app]) {
            return Object.keys(measuresObject[app]).map(s => ({value: s, ...measuresObject[app][s]})).filter(m => m.selected).map(s => s.value)
        }
        return []
    }
    const getUserMeasures = () => {
        if (measuresObject[app]) {
            return Object.keys(measuresObject[app]).filter(k => measuresObject[app][k].allowSelection)
        }
        return []
    }

    let measuresObject = getMeasuresObject()
    let selectedMeasures = getSelectedMeasures()

    let selectedFormat = getSelectedFormat()
    let userMeasures = getUserMeasures()
    let leftLegendForSelectedMeasure = left
    let rightLegendForSelectedMeasure = rightLegend
    let tooltipForSelectedMeasure = tooltip

    if (injectedMeasures) {
        const selected = Object.keys(injectedMeasures[app].measures).map(s => ({value: s, ...injectedMeasures[app].measures[s]})).filter(m => m.selected).map(s => s.value)
        measuresObject = injectedMeasures
        selectedMeasures = selected
        selectedFormat = getSelectedFormat()

        leftLegendForSelectedMeasure = injectedMeasures.leftTitle
        rightLegendForSelectedMeasure = injectedMeasures.rightTitle
        if (injectedMeasures.customTooltip) {
            tooltipForSelectedMeasure = injectedMeasures.customTooltip
        }
    }

    let numberFormat = selectedFormat ? {
        style: (selectedFormat.style === 'compacted') ? 'decimal' : selectedFormat.style,
        notation: (selectedFormat.style === 'compacted') ? 'compact' : "standard",
        currency: selectedFormat.currency,
        minimumFractionDigits: parseInt(selectedFormat.minimumFractionDigits),
        maximumFractionDigits: parseInt(selectedFormat.maximumFractionDigits)
    } : {
        notation: "standard",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }


    const groupTotalFormatObject = parse(groupTotalFormat)

    let groupTotalFormatParsed = {
        style: (groupTotalFormatObject.style === 'compacted') ? 'decimal' : groupTotalFormatObject.style,
        notation: (groupTotalFormatObject.style === 'compacted') ? 'compact' : "standard",
        currency: groupTotalFormatObject.currency,
        minimumFractionDigits: parseInt(groupTotalFormatObject.minimumFractionDigits),
        maximumFractionDigits: parseInt(groupTotalFormatObject.maximumFractionDigits)
    }
    const [mode, setMode] = useState(editMode)
    const viewMode = editing ? editMode : mode
    const colors = {
        scheme: scheme,
        colorBy: colorBy
    }
    let child = null
    const contentHeight = (editing ? height - 80 : height - 40)
    const legends = {
        left: leftLegendForSelectedMeasure,
        bottom: bottom,
        right: rightLegendForSelectedMeasure
    }


    const chartProps = {
        app,
        tickColor: decodeURIComponent(tickColor),
        tickRotation: tickRotation,
        layout,
        reverse: (reverse == true || reverse == "true"),
        showLegends: (showLegends == true || showLegends == "true"),
        legendLabel,
        swap: (swap == true || swap == "true"),
        showGrid: (showGrid == true || showGrid == "true"),

        marginLeft: parseInt(marginLeft),
        marginTop: parseInt(marginTop),
        marginRight: parseInt(marginRight),
        marginBottom: parseInt(marginBottom),
        height: `${contentHeight}px`,
        legendPosition: legendPosition,
        legends,
        tooltip: (tooltipEnableMarkdown == true || tooltipEnableMarkdown == "true") ? tooltipForSelectedMeasure : tooltipForSelectedMeasure.replace(/\r\n/g, '<hr/>').replace(/[\r\n]/g, '<hr/>'),
        colors: colors,
        groupMode: groupMode,
        format: numberFormat,
        startAngle,
        endAngle,
        offsetY,
        // csvLineLayerData,
        // lineColor: decodeURIComponent(lineColor),
        // lineTooltip,
        // lineTitle,
        maxValue,
        valueScale,
        categories,
        lineLayerEnabled: lineLayerEnabled == true || lineLayerEnabled == "true",
        overlays: parse(overlays) || [],
        barColor: decodeURIComponent(barColor),
        overrideTickColor: overrideTickColor == true || overrideTickColor == "true",
        fixedMinValue,
        fixedMaxValue,
        barPadding,
        barLabelPosition,
        barInnerPadding,
        xLabelColor: decodeURIComponent(xLabelColor),
        barLabelColor: decodeURIComponent(barLabelColor),
        legendLabelColor: decodeURIComponent(legendLabelColor),
        tooltipEnabled: tooltipEnabled == true || tooltipEnabled == "true",
        legendLabelBack: legendLabelBack == true || legendLabelBack == "true",
        legendCheckBack: legendCheckBack == true || legendCheckBack == "true",
        highlightXAxisLine: highlightXAxisLine == true || highlightXAxisLine == "true",
        showTickLine: showTickLine == true || showTickLine == "true",
        showRightAxis: showRightAxis == true || showRightAxis == "true",
        offsetRight,
        offsetBottom,
        confidenceIntervals: parse(confidenceIntervals) || [],
        showPoints: showPoints == true || showPoints == "true",
        enableArea: enableArea == true || enableArea == "true",
        areaShadingCriteria,
        areaLowerBound,
        areaUpperBound,
        showGroupTotal: showGroupTotal == true || showGroupTotal == "true",
        groupTotalMeasure,
        groupTotalLabel,
        groupTotalFormat: groupTotalFormatParsed,
        groupTotalOffset,
        groupTotalFixedPosition: groupTotalFixedPosition == true || groupTotalFixedPosition == "true",
        centerLabel,
        showArcLabels: showArcLabels == true || showArcLabels == "true",
        showArcLinkLabels: showArcLinkLabels == true || showArcLinkLabels == "true",
        slicePadding,
        centerLabelFontWeight,
        centerLabelFontSize,
        centerLabelXOffset,
        centerLabelYOffset,
        userMeasures,
        tooltipEnableMarkdown: tooltipEnableMarkdown == true || tooltipEnableMarkdown == "true",
        yAxisTickValues,
        enableGridY: enableGridY == true || enableGridY == "true",
        enableGridX: enableGridX == true || enableGridX == "true",
        offsetText,
        selectedMeasures,
        overallLabel,
        minMaxClamp,
        reverseLegend: reverseLegend == true || reverseLegend == "true",
    }


    let params = {}
    const ff = parse(filters) || {}

    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
    }


    let ChartDataFrame = null
    let Chart = null

    if (app === "csv") {
        ChartDataFrame = CSVDataFrame
    } else {
        switch (type) {
            case  "line":
                ChartDataFrame = dataFrames.LineDataFrame
                break
            case  "pie":
                ChartDataFrame = dataFrames.PieDataFrame
                break
            default:
                ChartDataFrame = dataFrames.BarDataFrame
                break
        }
    }
    let showNotEnoughParameters = false


    switch (type) {
        case  "bar":
            Chart = Bar
            showNotEnoughParameters = app != 'csv' && dimension1 == 'none' && selectedMeasures.length == 0
            break
        case  "line":
            Chart = Line
            showNotEnoughParameters = app != 'csv' && selectedMeasures.length == 0
            break
        case "pie":
            showNotEnoughParameters = app != 'csv' && selectedMeasures.length == 0
            Chart = HalfPie
            break
        default:
            Chart = <div>No Chart</div>
            break
    }


    const dual = (dualMode === 'true')
    const dimensions = []
    if (dimension1 != 'none') {
        dimensions.push(dimension1)
    }
    if (dimension2 != 'none') {
        dimensions.push(dimension2)
    }


    return (<div ref={ref}>


        <Container className={"chart container"} style={{"minHeight": height + 'px'}} fluid={true}>


            <DataProvider
                editing={editing}
                style={{"height": `${contentHeight}px`}}
                params={params}
                          app={app}
                          group={group}
                          csv={csv}
                          editing={editing}
                          store={[app, unique, ...dimensions]} source={dimensions.join("/")}>


                <Container style={{"height": `${contentHeight}px`}} className={"body"} fluid={true}>

                    {showNotEnoughParameters && <Messages editing={editing}></Messages>}
                    {!showNotEnoughParameters && <DataConsumer>
                            <Messages app={app} group={group}>  </Messages>
                            <ChartDataFrame
                                locale={locale}
                                colorBy={colorBy}
                                hiddenBars={hiddenBars}
                                swap={swap == 'true' || swap == true} type={type} includeTotal={true}
                                includeOverall={includeOverall == true || includeOverall == "true"}
                                overallLabel={overallLabel}
                                measures={selectedMeasures}
                                dimensions={[...dimensions]}>
                                <ColorProvider
                                    type={type}
                                    app={app}
                                    locale={locale}
                                    overallLabel={overallLabel}
                                    manualColors={getManualColor()} colorBy={colorBy} scheme={scheme}
                                    barColor={chartProps.barColor}>

                                    <Chart {...chartProps}></Chart>
                                </ColorProvider>

                            </ChartDataFrame>

                    </DataConsumer>}

                </Container>

            </DataProvider>

            <br/>
            {dual && childContent && viewMode == 'info' &&
                <Container fluid={true} style={{"height": contentHeight + 'px'}} className={"body"}>
                    <PostContent post={{content: {rendered: childContent}}}></PostContent>
                </Container>}

        </Container>
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
