import {PanelBody, PanelRow, SelectControl, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import ChartColors from "../commons/ChartColors.jsx"
import ChartLegends from '../commons/ChartLegends.jsx'
import AxisConfig from './AxisConfig.jsx'
import Labels from "./Labels.jsx"
import Format from "./Format.jsx"
import Papa from 'papaparse'


const RadarChart = (props) => {
    const {
        allMeasures,
        setAttributes, attributes: {
            measures,
            app,
            dimension1,
            dimension2,
            layout,
            format,
            groupMode,
            reverse,
            colorBy,
            lineLayerEnabled,
            valueScale,
            maxValue,
            swap,
            csv,
            fixedMaxValue,
            fixedMinValue,
            barPadding,
            barLabelPosition,
            showGrid,
            includeOverall,
            barInnerPadding,
            highlightXAxisLine,
            showTickLine,
            showRightAxis,
            enableArea,
            areaShadingCriteria,
            areaLowerBound,
            areaUpperBound,
            showPoints,
            enableGridY,
            enableGridX
        }
    } = props;

    let measuresOptions = []
    if (app == 'csv') {
        const data = Papa.parse(csv, {header: true, dynamicTyping: true});
        measuresOptions.push({value: '', label: ''})
        data.meta.fields.forEach((field, i) => {
            if (i !== 0) {
                measuresOptions.push({value: field, label: field})
            }
        })
    } else {
        if (allMeasures && measures && measures[app]) {
            const list = allMeasures.filter(measure => {
                return (measures[app][measure.value] && measures[app][measure.value].selected)
            }).map(m => {
                return {value: m.value, label: m.group + ' - ' + m.label}
            }).sort((a, b) => {
                return (a.label > b.label) ? 1 : -1
            })

            measuresOptions = [{value: '', label: ''}, ...list]
        }
    }

    return [<PanelBody initialOpen={false} title={__("Radar Options")}>
        <PanelBody initialOpen={false} title={__("Layout")}>
            <PanelRow>
                <ToggleControl
                    label={__("Grouped")}
                    checked={groupMode === "grouped"}
                    onChange={() => setAttributes({groupMode: (groupMode === "grouped" ? "stacked" : "grouped")})}/>
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label={__("Show Line Points")}
                    checked={showPoints}
                    onChange={() => setAttributes({showPoints: !showPoints})}/>
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label={__("Enable Y Grid Lines")}
                    checked={enableGridY}
                    onChange={() => setAttributes({enableGridY: !enableGridY})}/>
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label={__("Enable X Grid Lines")}
                    checked={enableGridX}
                    onChange={() => setAttributes({enableGridX: !enableGridX})}/>
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label={__("Enable Area")}
                    checked={enableArea}
                    onChange={() => setAttributes({enableArea: !enableArea})}/>
            </PanelRow>
            {enableArea &&
                <>
                    <PanelRow>
                        <SelectControl
                            label={__('Shading Criteria')}
                            value={[areaShadingCriteria]}
                            onChange={(areaShadingCriteria) => {
                                setAttributes({areaShadingCriteria})
                            }}
                            options={[{value: "DEFAULT", label: "default"}, {
                                value: "CUSTOM_BETWEEN_TWO_LINES",
                                label: "Custom (Shade area between lines)"
                            }]}
                        />
                    </PanelRow>
                    {areaShadingCriteria == "CUSTOM_BETWEEN_TWO_LINES" &&
                        <>
                            <PanelRow>
                                <SelectControl
                                    style={{width: 150}}
                                    label={__('Area Lower Bound')}
                                    value={[areaLowerBound]}
                                    onChange={(areaLowerBound) => {
                                        setAttributes({areaLowerBound})
                                    }}
                                    options={measuresOptions}
                                />
                            </PanelRow>
                            <PanelRow>
                                <SelectControl
                                    style={{width: 150}}
                                    label={__('Area Upper Bound')}
                                    value={[areaUpperBound]}
                                    onChange={(areaUpperBound) => {
                                        setAttributes({areaUpperBound})
                                    }}
                                    options={measuresOptions}
                                />
                            </PanelRow>
                        </>
                    }
                </>
            }
        </PanelBody>
        <PanelBody initialOpen={false} title={__("Colors")}>
            <ChartColors {...props}></ChartColors>
        </PanelBody>
        <AxisConfig {...props}></AxisConfig>
        <Labels {...props}></Labels>
        <ChartLegends {...props}></ChartLegends>
    </PanelBody>]
}

export default RadarChart