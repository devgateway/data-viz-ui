import React, { useRef, useState } from 'react';
import { symbol } from "prop-types";
import Papa from "papaparse";
import { injectIntl } from "react-intl";
import DataProvider from "../data/D3MapDataProvider.jsx";
import DataConsumer from "../data/D3MapDataConsumer.jsx";
import GradientColors from "@/embeddable/d3Map/GradientColors.js";
import { Icon } from 'semantic-ui-react';

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


const Breaks = ({ breaks, isPoint, numberFormat, intl }) => {
    return (breaks.length > 0) && <div className={"legend-breaks"}>
        {breaks.map((b, i) => {
            if (b.type !== 'graterThan') {
                return (<div className={"break"}>
                    <div className={`break-item ${isPoint ? 'point' : ''}`}
                        style={{
                            backgroundColor: b.color,
                            border: `1px solid ${b.borderColor}`,
                        }}></div>
                    <div className={"break-label"}> &lt; {intl.formatNumber(b.end, numberFormat)}</div>
                </div>)
            } else {
                return (<div className={"break"}>
                    <div className={`break-item ${isPoint ? 'point' : ''}`}
                        style={{
                            backgroundColor: b.color,
                            border: `1px solid ${b.borderColor}`,
                        }}></div>
                    <div className={"break-label"}> &gt; {intl.formatNumber(b.end, numberFormat)}</div>

                </div>)
            }
        })}
    </div>

}
const FlowLayerLegend = (props) => {
    const {
        name,
        breaks,
        pointStyleBy,
        dimension2,
        pointDimensionStyles = {},
        markFillColor,
        markBorderColor,
        measures,
        visible,
        format,
        intl,
        id,
        onItemClick,
        customMeasuresLabels
    } = props
    const numberFormat = {
        style: (format.style === 'compacted') ? 'decimal' : format.style,
        notation: (format.style === 'compacted') ? 'compact' : "standard",
        currency: format.currency,
        minimumFractionDigits: parseInt(format.minimumFractionDigits),
        maximumFractionDigits: parseInt(format.maximumFractionDigits)
    }
    let measureLabel = measures[0]
    if (customMeasuresLabels) {
        measureLabel = customMeasuresLabels[measures[0]]
    }
    const dimensionOptions = [...new Set(Object.keys(pointDimensionStyles).map(k => k.split('_')[0]))]
    return <div className={"legend"}>
        <div>
            <div className={"legend-item"}>
                <div className={"legend-color legend-check"} onClick={e => onItemClick(id)}
                    style={{
                        backgroundColor: markFillColor,
                        borderColor: markBorderColor
                    }}>{visible != false && <>&#10003;</>}
                </div>
                <div className={"legend-label"}>{name} ({measureLabel})</div>
            </div>

            {(visible != false) && <Breaks breaks={breaks} symbol={"arrow"} numberFormat={numberFormat} intl={intl}></Breaks>}

        </div>
    </div>
}

const DataPointsLayerLegend = (props) => {
    const {
        id,
        name,
        breaks,
        intl,
        pointStyleBy,
        format,
        dimension2,
        pointDimensionStyles = {},
        markFillColor,
        markBorderColor,
        measures,
        visible,
        onItemClick,
        customMeasuresLabels,
        allCategories,
        showDim2OnLegends,
        dim2LegendLabel,
        type,
        d2Click,
        selectedItem
    } = props

    const numberFormat = {
        style: (format.style === 'compacted') ? 'decimal' : format.style,
        notation: (format.style === 'compacted') ? 'compact' : "standard",
        currency: format.currency,
        minimumFractionDigits: parseInt(format.minimumFractionDigits),
        maximumFractionDigits: parseInt(format.maximumFractionDigits)
    }
    let measureLabel = measures[0]
    if (customMeasuresLabels) {
        measureLabel = customMeasuresLabels[measures[0]]
    }

    const cats = dimension2 && allCategories ? allCategories.filter(c => c.type.toUpperCase() == dimension2.toUpperCase()) : []
    const items = cats.length > 0 ? cats[0].items : []
    const dimensionValues = items.map(i => i.value)

    const fieldLabel = pointStyleBy === "dimension" || showDim2OnLegends ? dimension2 : measureLabel

    return <div className={"legend"}>
        <div>

            <div className={"legend-item"}>
                <div className={"legend-color legend-check"} onClick={e => onItemClick(id)}
                    style={pointStyleBy === "measure" || showDim2OnLegends ? {} : {
                        backgroundColor: markFillColor,
                        borderColor: markBorderColor
                    }}>{visible != false && <>&#10003;</>}
                </div>
                <div className={"legend-label"}>{name} </div>
            </div>

            {(pointStyleBy === "measure" && visible != false) && <div className={"legend-breaks"}>
                {breaks.map((b, i) => {
                    return (<div className={"break"}>
                        <div className={"break-item"} style={{
                            backgroundColor: b.color,
                            border: `1px solid ${b.borderColor}`,
                            borderRadius: type == 'dataPoints' ? "50%" : "0",
                        }}></div>
                        <div className={"break-label"}> &lt; {intl.formatNumber(b.end, numberFormat)}</div>
                    </div>)
                })}
            </div>
            }

            {visible != false && showDim2OnLegends != false &&
                <div className={"legend"}>
                    <div className={"legend-item"} >
                        <div className={"legend-label"}>{dim2LegendLabel || fieldLabel}</div>

                    </div>
                </div>
            }

            {(visible != false && showDim2OnLegends != false) && <div className={"legend-breaks"}>
                {dimensionValues.map((d) => {
                    return (<div className={"break"}>
                        {pointStyleBy === "measure" ? (
                            <span
                                className="break-item dim2-item"></span>
                        ) : (
                            <div

                                className="break-item"
                                style={{
                                    backgroundColor: pointDimensionStyles[d + '_color'] || markFillColor,
                                    border: `1px solid ${pointDimensionStyles[d + '_border'] || markBorderColor}`,
                                    borderRadius: type == 'dataPoints' ? "50%" : "0",
                                }}
                            ></div>
                        )}
                        <div className={"break-label"} onClick={e => d2Click(d)}>
                            {selectedItem == d ? <b>{d}</b> : d}
                        </div>
                    </div>)
                })}
            </div>
            }


        </div>
    </div>
}

const BaseLayerLegend = (props) => {
    const { fillColor, borderColor, name, visible, id, onItemClick } = props
    return <div className={"legend"}>
        <div className={"legend-item"}>
            <div className={"legend-color legend-check"} onClick={e => onItemClick(id)}
                style={{ backgroundColor: fillColor, borderColor: borderColor }}>{visible != false && <>&#10003;</>}
            </div>
            <div className={"legend-label"}>{name}</div>
        </div>
    </div>
}

const toId = (key) => {
    //replace blank space by underscore
    if (!key) return ""
    return "legend_pattern_" + key.toString().replace(/ /g, "_")
}

const DataLayerLegend = (props) => {
    const {
        markFillColor,
        fillColor,
        markSizeScale,
        markBorderColor,
        useCentroidPoint,
        name,
        useBreaks,
        useGradients,
        breaks,
        intl,
        usePattern,
        patternsData,
        patternDiscriminator,
        patternDiscriminatorLabel,
        measures,
        borderColor,
        data,
        app,
        customMeasuresLabels,
        divRef,
        id,
        patternWidth = .35,
        patternHeight = .25,
        group,
        format,
        csv,
        visible,
        onItemClick,
        gradientScheme,
        gradientReverse,
        toggleColorLayer,
        colorLayerVisible = true
    } = props
    let measureLabel = ""

    const numberFormat = {
        style: (format.style === 'compacted') ? 'decimal' : format.style,
        notation: (format.style === 'compacted') ? 'compact' : "standard",
        currency: format.currency,
        minimumFractionDigits: parseInt(format.minimumFractionDigits),
        maximumFractionDigits: parseInt(format.maximumFractionDigits)
    }

    const getGradientColors = (data) => (new GradientColors({
        data: data.children,
        measure: measures[0],
        defaultFillColor: markFillColor,
        gradientScheme: gradientScheme,
        gradientReverse: gradientReverse
    }))

    if (app != "csv" && customMeasuresLabels) {
        measureLabel = customMeasuresLabels[measures[0]]
    } else {
        const parsed = Papa.parse(csv, { header: true, dynamicTyping: true });
        measureLabel = parsed.meta.fields.length > 0 ? parsed.meta.fields[1] : ''
    }


    const toId = (key) => {
        //replace blank space by underscore
        if (!key) return ""
        return key.toString().replace(/ /g, "_").toLocaleLowerCase()
    }

    if (divRef.current) {
        const patternLegend = divRef.current.querySelector(
            `.legend.layer_${toId(id)} svg`
        );
        if (patternLegend) {
            patternLegend.style.display = visible === false ? "none" : "block";
        }
    }


    if (data) {
        console.log("COLOR", getGradientColors(data).getStartColor())
    }


    const getMinDataValue = (data) => {
        return Math.min(...(data.children.map(d => d[measures[0]])))
    }

    const getMaxDataValue = (data) => {
        return Math.max(...(data.children.map(d => d[measures[0]])))
    }

    return <div className={`legend layer_${toId(id)}`} id={toId(`${group} ${name} ${id}`)}>
        <div>
            <div className={"legend-item"}>
                <div className={"legend-color legend-check"} onClick={e => onItemClick(id)}
                    style={{ backgroundColor: fillColor, borderColor: borderColor }}>{visible != false && <>&#10003;</>}
                </div>
                <div className={"legend-label"}>{name}</div>

            </div>

            {((useCentroidPoint && !useBreaks && visible != false)) && <div className={"legend-breaks"}>
                <div className={"break"}>
                    <div className={`break-item point ${colorLayerVisible ? "checked" : ""}`}
                        onClick={e => toggleColorLayer(id)}
                        style={{
                            backgroundColor: markFillColor,
                            border: `1px solid ${markBorderColor}`,
                        }}>
                    </div>
                    {measureLabel}
                </div>
            </div>
            }

            {(useBreaks && visible != false) &&
                <div>

                    <div className="legend-breaks">
                        <div
                            className="legend-section-title"
                            onClick={e => toggleColorLayer(id)}>
                            <div className={`legend-section-title-checkbox ${colorLayerVisible ? "checked" : ""}`}></div>
                            <span className="measure-label">{measureLabel}</span>
                        </div>
                    </div>

                    {colorLayerVisible &&
                        <Breaks isPoint={useCentroidPoint} numberFormat={numberFormat}
                            breaks={breaks} visible={visible} intl={intl}></Breaks>
                    }
                </div>

            }

            {(useGradients && data && data.children && data.children.length > 0 && visible != false) &&
                <div className='gradient-container'>

                    <div className={"gradient-label"} style={{ float: "right" }}>{intl.formatNumber(getMaxDataValue(data), numberFormat)}</div>
                    <div className={"gradient-label"} style={{ float: "left" }}>{intl.formatNumber(getMinDataValue(data), numberFormat)}</div>

                    <div className="gradient-bar" style={{
                        background: `linear-gradient(to right, ${getGradientColors(data).getStartColor()}, ${getGradientColors(data).getEndColor()})`,
                        width: '120px',
                        height: '10px',
                    }}
                    ></div>
                </div>

            }
        </div>
    </div>

}

const Legends = (props) => {
    const divRef = useRef(null);

    const [collapsed, setCollapsed] = useState(false)

    const ChevronDown = ({ size = 16, color = "currentColor" }) => (
        <Icon name="chevron down"></Icon>
    );

    const ChevronRight = ({ size = 16, color = "currentColor" }) => (
        <Icon name="chevron right"></Icon>
    );

    const { layers = [], onItemClick, patternsData, group, intl, toggleColorLayer } = props;


    return (<div className={`legends ${collapsed ? 'collapsed' : ''}`} ref={divRef}>

        <div className='legend-collapsible-control' onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <div> <ChevronRight size={14} />   Show Legends</div> : <div><ChevronDown size={14} />   Hidden Legends</div>}
        </div>

        <div className="legends-content">
            {
                layers && layers.map(l => {


                    const params = {}
                    const ff = l.filters || {}

                    if (ff && ff.forEach) {
                        ff.forEach(f => {
                            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0) params[f.param] = f.value
                        })
                    }

                    if (l.dvzProxyDatasetId) {
                        params.dvzProxyDatasetId = l.dvzProxyDatasetId;
                    }

                    debugger;
                    return (<div key={l.id}>

                        {l.type == "base" && <BaseLayerLegend {...l} group={group} onItemClick={onItemClick} />}

                        {l.type == "data" && l.apiJoinAttribute &&
                            <DataProvider
                                waitForFilters={true}
                                editing={l.editing}
                                params={params}
                                app={l.app}
                                verbose={false}
                                csv={decodeURIComponent(l.csv)}
                                group={group}
                                ignoreErrors={true}
                                isSvg={true}
                                mySelf="Legends"
                                store={[l.app, props.unique, l.id]}
                                source={l.apiJoinAttribute + (l.patternDiscriminator != 'none' ? "/" + l.patternDiscriminator : '')}>
                                <DataConsumer>
                                    <DataLayerLegend group={group} patternsData={patternsData ? patternsData[l.id] : null} divRef={divRef} {...l} intl={props.intl} onItemClick={onItemClick} toggleColorLayer={toggleColorLayer} />
                                </DataConsumer>
                            </DataProvider>
                        }

                        {l.type == "dataPoints" && <DataPointsLayerLegend selectedItem={props.selectedItem} d2Click={props.d2Click} intl={props.intl} group={group} {...l} onItemClick={onItemClick} />}

                        {l.type == "flow" && <FlowLayerLegend group={group} {...l} onItemClick={onItemClick} intl={props.intl} />}

                    </div>)

                })
            }
        </div>



    </div>)
}

export default injectIntl(Legends)