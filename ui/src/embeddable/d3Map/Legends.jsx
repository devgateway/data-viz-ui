import React, {useEffect, useRef} from 'react';
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
        id,
        onItemClick,
        customMeasuresLabels
    } = props
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

            {(breaks.length > 0 && visible != false) && <div className={"legend-breaks"}>
                {breaks.map((b, i) => {
                    if (b.type !== 'graterThan') {
                        return (<div className={"break"}>
                            <div className={"break-item"} style={{
                                backgroundColor: b.color,
                                border: `1px solid ${b.borderColor}`,
                            }}></div>
                            <div className={"break-label"}> &lt; {b.end}</div>
                        </div>)
                    }else{

                        return ( <div className={"break"}>
                            <div className={"break-item"} style={{
                                backgroundColor: b.color,
                                border: `1px solid ${b.borderColor}`,
                            }}></div>
                            <div className={"break-label"}> &gt; {b.end}</div>

                        </div>)
                    }

                })}

            </div>
            }
        </div>
    </div>
}

const DataPointsLayerLegend = (props) => {
    const {
        id,
        name,
        breaks,
        pointStyleBy,
        dimension2,
        pointDimensionStyles = {},
        markFillColor,
        markBorderColor,
        measures,
        visible,
        onItemClick,
        customMeasuresLabels
    } = props

    let measureLabel = measures[0]
    if (customMeasuresLabels) {
        measureLabel = customMeasuresLabels[measures[0]]
    }

    const dimensionOptions = [...new Set(Object.keys(pointDimensionStyles).map(k => k.split('_')[0]))]
    const fieldLabel = pointStyleBy === "dimension" ? dimension2 : measureLabel
    return <div className={"legend"}>
        <div>
            <div className={"legend-item"}>
                <div className={"legend-color legend-check"} onClick={e => onItemClick(id)}
                     style={{
                         backgroundColor: markFillColor,
                         borderColor: markBorderColor
                     }}>{visible != false && <>&#10003;</>}
                </div>
                <div className={"legend-label"}>{name} ({fieldLabel})</div>
            </div>
            {(pointStyleBy === "dimension" && visible != false) && <div className={"legend-breaks"}>
                {dimensionOptions.map((d) => {
                    return (<div className={"break"}>
                        <div className={"break-item"} style={{
                            backgroundColor: pointDimensionStyles[d + '_color'],
                            border: `1px solid ${pointDimensionStyles[d + '_border']}`,
                        }}></div>
                        <div className={"break-label"}>{d}</div>
                    </div>)
                })}
            </div>
            }

            {(pointStyleBy === "measure" && visible != false) && <div className={"legend-breaks"}>
                {breaks.map((b, i) => {
                    return (<div className={"break"}>
                        <div className={"break-item"} style={{
                            backgroundColor: b.color,
                            border: `1px solid ${b.borderColor}`,
                        }}></div>
                        <div className={"break-label"}> &lt; {b.end}</div>
                    </div>)
                })}
            </div>
            }
        </div>
    </div>
}


const BaseLayerLegend = (props) => {
    const {fillColor, borderColor, name, visible, id, onItemClick} = props
    return <div className={"legend"}>
        <div className={"legend-item"}>
            <div className={"legend-color legend-check"} onClick={e => onItemClick(id)}
                 style={{backgroundColor: fillColor, borderColor: borderColor}}>{visible != false && <>&#10003;</>}
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
        breaks,
        usePattern,
        patterns,
        patternDiscriminator,
        measures,
        borderColor,
        data,
        customMeasuresLabels,
        divRef,
        id,
        patternWidth = .35,
        patternHeight = .25,
        visible,
        onItemClick
    } = props
    let measureLabel = measures[0]

    if (customMeasuresLabels) {
        measureLabel = customMeasuresLabels[measures[0]]
    }


    const g = d3.select(`#data-${id}`)
    const renderedPatterns = g.selectAll("defs").selectAll("pattern")

    d3.select(divRef.current).select("svg").remove()
    if (usePattern && divRef.current && renderedPatterns.size() > 0 && visible != false) {
        const patternsData = renderedPatterns.data()
        const g = d3.select(divRef.current).append("svg")
        const defs = g.append("defs")
        defs.selectAll("pattern").remove()
        defs.selectAll("pattern")
            .data(patternsData).enter()
            .append("pattern")
            .attr('id', d => toId(d.key))
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 5)
            .attr('height', 5)
            .attr("x", 0).attr("y", 0)
            .attr("patternTransform", d => `rotate(${!d.rotation ? 0 : d.rotation})`)

        patternsData.forEach(d => {
            if (d.type === 'lines') {
                defs.select("#" + toId(d.key))
                    .append("rect")
                    .attr("x", 0)
                    .attr('width', 1)
                    .attr('height', 10)
                    .attr("opacity", .75)
                    .attr('fill', d.color)
            }
            if (d.type === 'squares') {
                defs.select("#" + toId(d.key))
                    .append("rect")
                    .attr('width', 3)
                    .attr('height', 3)
                    .attr('fill', d.color)
                    .attr("opacity", 1)
                    .attr("stroke-width", 1)

            }
            if (d.type === 'dots') {
                defs.select("#" + toId(d.key))
                    .append("circle")
                    .attr("cx", 2)
                    .attr("cy", 2)
                    .attr('r', 2)
                    .attr('fill', d.color)
                    .attr("opacity", 1)
                    .attr("stroke-width", 1)

            }
            if (d.type === 'triangle') {
                defs.select("#" + toId(d.key))
                    .append("polygon")
                    .attr("points", "5,0 8,8 0,5")
                    .attr('fill', d.color)
                    .attr("opacity", 1)
                    .attr("stroke-width", 1)

            }
        })


        g.attr("width", "150px")
            .attr("height", "auto")

        g.append("text")
            .attr("class", "patterns-title")
            .attr("y", 5)
            .attr("x", 12)
            .text(patternDiscriminator)

        g.selectAll(".legend-squares")
            .data(patternsData)
            .enter()
            .append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr("y", (d, i) => (i * 22) + 25)
            .attr("x", 20)
            .attr("stroke", borderColor)
            .attr("style", (d) => {
                return "none;fill:url(#" + toId(d.key) + ");"
            })

        g.selectAll(".patterns-labels")
            .data(patternsData)
            .enter()
            .append("text")
            .attr("class", "patterns-labels")
            .attr("y", (d, i) => (i * 22) + 25)
            .attr("x", 40)
            .text(d => d.key)
    }

    return <div className={"legend"}>
        <div>
            <div className={"legend-item"}>
                <div className={"legend-color legend-check"} onClick={e => onItemClick(id)}
                     style={{backgroundColor: fillColor, borderColor: borderColor}}>{visible != false && <>&#10003;</>}
                </div>
                <div className={"legend-label"}>{name} ({measureLabel})</div>
            </div>
            {((useCentroidPoint && !useBreaks && visible != false)) && <div className={"legend-breaks"}>
                <div className={"break"}>
                    <div className={"break-item"} style={{
                        backgroundColor: markFillColor,
                        border: `1px solid ${markBorderColor}`,
                    }}></div>
                </div>
            </div>
            }

            {(useBreaks && visible != false) && <div className={"legend-breaks"}>
                {breaks.map((b, i) => {
                    return (<div className={"break"}>
                        <div className={"break-item"} style={{
                            backgroundColor: b.color,
                            border: `1px solid ${borderColor}`,
                        }}></div>
                        <div className={"break-label"}> &lt; {b.end}</div>
                    </div>)
                })}
                <div className={"break"}>
                    <div className={"break-item"} style={{
                        backgroundColor: useCentroidPoint ? markFillColor : fillColor,
                        border: `1px solid ${useCentroidPoint ? markBorderColor : borderColor}`,
                    }}></div>
                    <div className={"break-label"}> &gt; {Math.max(...breaks.map(b => b.end))}</div>
                </div>
            </div>
            }
        </div>
    </div>
}
const Legends = (props) => {

    const divRef = useRef(null);
    const {layers = [], onItemClick} = props;
    return <div className={"legends"} ref={divRef}>
        {layers.map(l => {
            return <div>
                {l.type == "base" && <BaseLayerLegend {...l} onItemClick={onItemClick}/>}
                {l.type == "data" && <DataLayerLegend divRef={divRef} {...l} onItemClick={onItemClick}/>}
                {l.type == "dataPoints" && <DataPointsLayerLegend {...l} onItemClick={onItemClick}/>}
                {l.type == "flow" && <FlowLayerLegend {...l} onItemClick={onItemClick}/>}
            </div>
        })}

    </div>
}

export default Legends