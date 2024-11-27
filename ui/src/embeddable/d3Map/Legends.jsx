import React, { useRef} from 'react';
import {symbol} from "prop-types";
import Papa from "papaparse";

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


const Breaks = ({breaks, isPoint}) => {
    return (breaks.length > 0) && <div className={"legend-breaks"}>
        {breaks.map((b, i) => {
            if (b.type !== 'graterThan') {
                return (<div className={"break"}>
                    <div className={`break-item ${isPoint ? 'point' : ''}`}
                         style={{
                             backgroundColor: b.color,
                             border: `1px solid ${b.borderColor}`,
                         }}></div>
                    <div className={"break-label"}> &lt; {b.end}</div>
                </div>)
            } else {
                return (<div className={"break"}>
                    <div className={`break-item ${symbol}`}
                         style={{
                             backgroundColor: b.color,
                             border: `1px solid ${b.borderColor}`,
                         }}></div>
                    <div className={"break-label"}> &gt; {b.end}</div>

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

            {(visible != false) && <Breaks breaks={breaks} symbol={"arrow"}></Breaks>}

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
        customMeasuresLabels,
        allCategories
    } = props

    let measureLabel = measures[0]
    if (customMeasuresLabels) {
        measureLabel = customMeasuresLabels[measures[0]]
    }

    const cats = dimension2 && allCategories ? allCategories.filter(c => c.type.toUpperCase() == dimension2.toUpperCase()) : []
    const items = cats.length > 0 ? cats[0].items : []
    const dimensionValues = items.map(i => i.value)

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
                <div className={"legend-label"}>{name} </div>
            </div>
            <div className={"legend"}>
                <div className={"legend-item"}>
                    <div className={"legend-label"}>{fieldLabel}</div>

                </div>
            </div>
            {(pointStyleBy === "dimension" && visible != false) && <div className={"legend-breaks"}>
                {dimensionValues.map((d) => {
                    return (<div className={"break"}>
                        <div className={"break-item"} style={{
                            backgroundColor: pointDimensionStyles[d + '_color'] || markFillColor,
                            border: `1px solid ${pointDimensionStyles[d + '_border'] || markBorderColor}`,
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
        csv,
        visible,
        onItemClick
    } = props
    let measureLabel = ""


    if (app != "csv" && customMeasuresLabels) {
        measureLabel = customMeasuresLabels[measures[0]]
    } else {
        const parsed = Papa.parse(csv, {header: true, dynamicTyping: true});
        measureLabel = parsed.meta.fields.length > 0 ? parsed.meta.fields[1] : ''
    }


    const toId = (key) => {
        //replace blank space by underscore
        if (!key) return ""
        return key.toString().replace(/ /g, "_").toLocaleLowerCase()
    }

    return <div className={`legend layer_${toId(id)}`} id={toId(`${group} ${name} ${id}`)}>
        <div>
            <div className={"legend-item"}>
                <div className={"legend-color legend-check"} onClick={e => onItemClick(id)}
                     style={{backgroundColor: fillColor, borderColor: borderColor}}>{visible != false && <>&#10003;</>}
                </div>
                <div className={"legend-label"}>{name} {!useCentroidPoint && <span>({measureLabel})</span>}</div>

            </div>

            {((useCentroidPoint && !useBreaks && visible != false)) && <div className={"legend-breaks"}>
                <div className={"break"}>
                    <div className={"break-item point"} style={{
                        backgroundColor: markFillColor,
                        border: `1px solid ${markBorderColor}`,
                    }}></div>
                    {measureLabel}
                </div>
            </div>
            }

            {(useBreaks && visible != false) &&
                <div>
                    {useCentroidPoint && <div className={"legend-breaks"}>
                        <div className={"break-item"}>{measureLabel}</div>
                    </div>}
                    <Breaks symbol={useCentroidPoint ? "point" : 'square'} breaks={breaks} visible={visible}></Breaks>
                </div>

            }
        </div>
    </div>
}
const Legends = (props) => {
    const divRef = useRef(null);
    const {layers = [], onItemClick, patternsData, group} = props;
    return <div className={"legends"} ref={divRef}>
        {layers.map(l => {
            return <div>
                {l.type == "base" && <BaseLayerLegend {...l} group={group} onItemClick={onItemClick}/>}
                {l.type == "data" &&
                    <DataLayerLegend group={group} patternsData={patternsData ? patternsData[l.id] : null}
                                     divRef={divRef} {...l}
                                     onItemClick={onItemClick}/>}
                {l.type == "dataPoints" && <DataPointsLayerLegend group={group} {...l} onItemClick={onItemClick}/>}
                {l.type == "flow" && <FlowLayerLegend group={group} {...l} onItemClick={onItemClick}/>}
            </div>
        })}

    </div>
}

export default Legends