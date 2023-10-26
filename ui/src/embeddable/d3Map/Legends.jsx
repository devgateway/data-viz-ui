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
const DataPointsLayerLegend = (props) => {
    const {
        name,
        breaks,
        pointStyleBy,
        dimension2,
        pointDimensionStyles = {},
        markFillColor,
        markBorderColor,
        measures,
    } = props
    const dimensionOptions = [...new Set(Object.keys(pointDimensionStyles).map(k => k.split('_')[0]))]
    return <div className={"legend"}>
        <div>
            <div className={"legend-item"}>
                <div className={"legend-color"} style={{backgroundColor: markFillColor, borderColor: markBorderColor}}/>
                <div className={"legend-label"}>{name}</div>
            </div>
            {(pointStyleBy === "dimension") && <div className={"legend-breaks"}>
                <div className={"legend-label"}>{dimension2}</div>
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

            {(pointStyleBy === "measure") && <div className={"legend-breaks"}>
                <div className={"legend-label"}>{measures[0]}</div>
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
    const {fillColor, borderColor, name} = props
    return <div className={"legend"}>
        <div className={"legend-item"}>
            <div className={"legend-color"} style={{backgroundColor: fillColor, borderColor: borderColor}}/>
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

    } = props
    let measureLabel = measures

    if (customMeasuresLabels) {
        measureLabel = customMeasuresLabels[measures[0]]
    }


    const g = d3.select(`#data-${id}`)
    const renderedPatterns = g.selectAll("defs").selectAll("pattern")

    if (usePattern && divRef.current && renderedPatterns.size() > 0) {
        const patternsData = renderedPatterns.data()
        d3.select(divRef.current).select("svg").remove()
        const g = d3.select(divRef.current).append("svg")
        debugger
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
          .attr("class","patterns-title")
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
            .attr("class","patterns-labels")
            .attr("y", (d, i) => (i * 22) + 25)
            .attr("x", 40)
            .text(d=>d.key)
    }

    return <div className={"legend"}>
        <div>
            <div className={"legend-item"}>
                <div className={"legend-color"} style={{backgroundColor: fillColor, borderColor: borderColor}}/>
                <div className={"legend-label"}>{name}</div>
            </div>
            {((useCentroidPoint && !useBreaks)) && <div className={"legend-breaks"}>
                <div className={"break"}>
                    <div className={"break-item"} style={{
                        backgroundColor: markFillColor,
                        border: `1px solid ${markBorderColor}`,
                    }}></div>
                    <div className={"break-label"}> {measureLabel}</div>
                </div>
            </div>
            }

            {((!useCentroidPoint && useBreaks) || (useCentroidPoint && useBreaks)) && <div className={"legend-breaks"}>
                <div className={"legend-label"}>{measureLabel}</div>
                {breaks.map((b, i) => {
                    return (<div className={"break"}>
                        <div className={"break-item"} style={{
                            backgroundColor: b.color,
                            border: `1px solid ${borderColor}`,
                        }}></div>
                        <div className={"break-label"}> &lt; {b.end}</div>
                    </div>)
                })}
            </div>
            }
        </div>
    </div>
}
const Legends = (props) => {

    const divRef = useRef(null);
    const {layers = []} = props;
    return <div className={"legends"} ref={divRef}>
        {layers.map(l => {
            return <div>
                {l.type == "base" && <BaseLayerLegend {...l}/>}
                {l.type == "data" && <DataLayerLegend divRef={divRef} {...l}/>}
                {l.type == "dataPoints" && <DataPointsLayerLegend {...l}/>}
            </div>
        })}

    </div>
}

export default Legends