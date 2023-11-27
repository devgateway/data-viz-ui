import React, {useRef, useState} from "react";
import {Container} from "semantic-ui-react";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";

import {PostContent} from "@devgateway/wp-react-lib";
import ColorProvider from "../common/colors/ColorProvider"
import Messages from "../common/Messages";
import {connect} from "react-redux";
import SankeyChart from "./Sankey"
import Papa from "papaparse";

const Chart = (props) => {
    const {
        parent,
        editing = false,
        unique,
        childContent,
        categories,
        injectedMeasures,

        "data-csv": csv = "",
        "data-no-data-message": noDataMsg = "No data matches your selection",
        "data-view-mode": editMode = 'info',
        'data-height': height,
        'data-source': source,
        'data-dimension1': dimension1,
        'data-dimension2': dimension2,
        'data-dimension3': dimension3,
        'data-scheme': scheme = 'nivo',
        'data-margin-left': marginLeft,
        'data-margin-top': marginTop,
        'data-margin-right': marginRight,
        'data-margin-bottom': marginBottom,
        'data-show-legends': showLegends,
        'data-legend-position': legendPosition,
        'data-app': app,
        'data-measures': measures = {},
        'data-format': format = '{}',
        'data-tooltip-html': tooltipHTML,
        'data-layout': layout,
        'data-group': group,
        'data-filters': filters = [],
        'data-no-data-message': noDataMessage,
        'data-legend-label': legendLabel,
        'data-tooltip-enabled': tooltipEnabled,
        'data-use-label-background': useLabelBackground,
        'data-use-check-box-background': useCheckBoxBackground,
        'data-legend-label-color': legendLabelColor,
        'data-tooltip-enable-markdown': tooltipEnableMarkdown,
        'data-reverse-legend': reverseLegend,
        'data-sort': sort,
        'data-node-thickness': nodeThickness,
        'data-node-opacity': nodeOpacity,
        'data-node-hover-opacity': nodeHoverOpacity,
        'data-node-inner-padding': nodeInnerPadding,
        'data-node-spacing': nodeSpacing,
        'data-node-hover-others-opacity': nodeHoverOthersOpacity,
        'data-node-border-width': nodeBorderWidth,
        'data-node-border-radius': nodeBorderRadius,
        'data-link-opacity': linkOpacity,
        'data-link-hover-opacity': linkHoverOpacity,
        'data-link-hover-others-opacity': linkHoverOthersOpacity,
        'data-link-contract': linkContract,
        'data-enable-link-gradient': enableLinkGradient,
        'data-enable-labels': enableLabels,
        'data-label-position': labelPosition,
        'data-label-padding': labelPadding,
        'data-use-custom-label-color': useCustomLabelColor,
        'data-label-text-color': labelTextColor,
        'data-label-orientation': labelOrientation,
        'data-manual-colors': manualColors = "{}"
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
    const formatObject = parse(format)
    let numberFormat = formatObject ? {
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
    const colors = {
        scheme: scheme,
   }
    let child = null
    const contentHeight = (editing ? height - 80 : height - 40)
    const legends = {
    }

    const chartProps = {
        app,
        layout,
        showLegends: (showLegends == true || showLegends == "true"),
        legendLabel,
        marginLeft: parseInt(marginLeft),
        marginTop: parseInt(marginTop),
        marginRight: parseInt(marginRight),
        marginBottom: parseInt(marginBottom),
        height: `${contentHeight}px`,
        legendPosition: legendPosition,
        legends,
        tooltip: (tooltipEnableMarkdown == true || tooltipEnableMarkdown == "true") ? decode(tooltipHTML) : decode(tooltipHTML).replace(/\r\n/g, '<hr/>').replace(/[\r\n]/g, '<hr/>'),
        colors: colors,
        format: numberFormat,
        categories,
        legendLabelColor: decodeURIComponent(legendLabelColor),
        tooltipEnabled: tooltipEnabled == true || tooltipEnabled == "true",
        tooltipEnableMarkdown: tooltipEnableMarkdown == true || tooltipEnableMarkdown == "true",
        reverseLegend: reverseLegend == true || reverseLegend == "true",
        sort,
        nodeThickness,
        nodeOpacity,
        nodeHoverOpacity,
        nodeInnerPadding,
        nodeSpacing,
        nodeHoverOthersOpacity,
        nodeBorderWidth,
        nodeBorderRadius: parseInt(nodeBorderRadius),
        linkOpacity,
        linkHoverOpacity,
        linkContract,
        enableLinkGradient: enableLinkGradient == true || enableLinkGradient == "true",
        linkHoverOthersOpacity,
        enableLabels: enableLabels == true || enableLabels == "true",
        labelPosition,
        labelPadding,
        useCustomLabelColor: useCustomLabelColor == true || useCustomLabelColor == "true",
        labelTextColor,
        labelOrientation,
        useLabelBackground,
        useCheckBoxBackground
    }


    let params = {}
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
    if (dimension2 != 'none') {
        dimensions.push(dimension2)
    }
    if (dimension3 != 'none') {
        dimensions.push(dimension3)
    }

    if (app != 'csv') {
        if (!dimensions.length || !parse(measures)[0]) {
            showNotEnoughParameters = true
        }
    } else {
        if (csv.length == 0) {
            showNotEnoughParameters = true
        }
    }
    return (<div ref={ref}>

        <Container className={"chart container"} style={{"minHeight": height + 'px'}} fluid={true}>
            <DataProvider
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
                        <Messages app={app} group={group} noDataMsg={noDataMsg}> </Messages>
                        <DataFrame
                          locale={locale}
                          colorBy={'id'}
                          dimensions={[...dimensions]}
                          sort={sort}
                          csv={csv}
                          app={app}
                          measure={parse(measures)[0] || null}>
                            <ColorProvider
                              app={app}
                              locale={locale}
                              manualColors={getManualColor()} colorBy={'id'} scheme={scheme}
                              barColor={chartProps.barColor}>
                                <SankeyChart{...chartProps} dimensions={dimensions} measure={parse(measures)[0] || null}></SankeyChart>
                            </ColorProvider>
                        </DataFrame>
                    </DataConsumer>}
                </Container>
            </DataProvider>

            <br/>
            {childContent && viewMode == 'info' &&
                <Container fluid={true} style={{"height": contentHeight + 'px'}} className={"body"}>
                    <PostContent post={{content: {rendered: childContent}}}></PostContent>
                </Container>}

        </Container>
    </div>)

}

const DataFrame = (props) => {
    const {children, csv, app} = props
    let chartData = {nodes: [], links: []}
    let options = {
        indexBy: '',
        keys: chartData.nodes.map(n => n.id),
        data: chartData
    }
    if (app != 'csv') {
        const getData = (props) => {
            const {data, dimensions, measure} = props
            const nodes = []
            const links = []
            const nodeValue = {}
            nodeValue[data.type] = data.value
            fillFormChildren(data.children, nodes, links, null, measure, nodeValue)
            return {nodes, links}
        }

        const fillFormChildren = (children = [], nodes, links, source, measure, parentNodeValue) => {
            children.forEach(c => {
                const nodeValue = {}
                nodeValue[c.type] = c.value
                if (!nodes.find(n => n.id === c.value)) {
                    nodes.push({id: c.value});
                }
                if (source) {
                    const link = links.find(l => l.source === source && l.target === c.value)
                    if (link) {
                        link.value = link.value + c[measure]
                    } else {
                        const data = {...c, ...nodeValue, ...parentNodeValue}
                        links.push({source: source, target: c.value, value: c[measure], data})
                    }
                }
                if (c.children && c.children.length > 0) {
                    fillFormChildren(c.children, nodes, links, c.value, measure, nodeValue)
                }
            })
        }

        chartData = getData(props)
        options = {
            indexBy: '',
            keys: chartData.nodes.map(n => n.id),
            data: chartData
        }
    } else {
        const dataParsed = Papa.parse(csv, {header: true, dynamicTyping: true});
        const sourceList = dataParsed.meta.fields
        const targetParameter = sourceList.shift()
        const targetList = dataParsed.data.map(d => d[targetParameter])
        const nodes = [...sourceList.map(s => {return {id: s}}), ...targetList.map(s => {return {id: s}})]
        const links = []
        dataParsed.data.forEach(d => {
            sourceList.forEach(source => {
                links.push({source, target: d[targetParameter], value: d[source]})
            })
        })
        options = {
            indexBy: '',
            keys: nodes.map(n => n.id),
            data: {nodes, links}
        }
    }
    return React.Children.map(children, child => React.cloneElement(child, {options}))
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
