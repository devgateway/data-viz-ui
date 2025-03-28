import {__} from '@wordpress/i18n';
import {CheckboxControl, PanelBody, PanelRow, SelectControl, ToggleControl, TextControl} from '@wordpress/components';

import Format from '../charts/Format.jsx'
import {togglePanel} from "./Util";
import {getTranslation} from "./APIutils";

const defaultFormat = {
    "style": "percent",
    "minimumFractionDigits": 1,
    "maximumFractionDigits": 1,
    "currency": "USD"

}

const Measures = (props) => {
    const {
        onMeasuresChange,
        onFormatChange,
        onUseCustomAxisFormatChange,
        onSetSingleMeasure,
        onCustomLabelToggleChange,
        onCustomLabelChange,
        allMeasures,
        setAttributes,
        title,
        format,
        attributes: {
            panelStatus,
            measures,
            dimension1,
            dimension2,
            type,
            app
        }
    } = props


    const MToggle = ({measure}) => {
        const userMeasure = measures[app] ? measures[app][measure.value] : {}

        return (<ToggleControl
            label={getTranslation(measure)}
            checked={userMeasure ? userMeasure.selected : false}
            onChange={(value) => onMeasuresChange(measure.value)}/>)
    }

    const MCheckbox = ({measure}) => {
        const userMeasure = measures[app] ? measures[app][measure.value] : {}
        let isChecked 
        if (measures instanceof Array) {
            isChecked = measures.includes(measure.value)
        } else {
            isChecked = userMeasure ? userMeasure.selected : false
        }

        return <CheckboxControl
            label={getTranslation(measure)}
            checked={isChecked}
            onChange={(value) => onSetSingleMeasure(measure.value)}/>
    }


    const MeasureOptions = ({measure, single}) => {
        return <PanelRow>
            {single && <MCheckbox measure={measure}></MCheckbox>}
            {!single && <MToggle measure={measure}></MToggle>}
        </PanelRow>

    }

    const countSelected = (g) => {
        if (measures[app]) {
            const mG = allMeasures.filter(f => getTranslation(f.group) === g)
            let count = 0
            Object.keys(measures[app]).filter(l => mG.map(m => m.value).indexOf(l) > -1).forEach(k => {
                if (measures[app][k].selected) {
                    count++
                }
            })
            return count
        }
        return 0
    }
    const countTotal = (g) => {
        if (g) {
            return allMeasures.filter(f => getTranslation(f.group) === g).length
        }

        return 0
    }

    const getSelectedMeasures = () => {
        if (measures[app] && allMeasures) {
            return Object.keys(measures[app]).filter(k => measures[app][k].selected).map(k => {
                return allMeasures.filter(m => m.value === k)[0]
            }).filter(m => m)
        }
        return []
    }

   
    const selectedMeasures = getSelectedMeasures()
    return <><PanelBody title={title ? title : __("Measures")} initialOpen={panelStatus["MEASURES"]}
                        onToggle={e => togglePanel("MEASURES", panelStatus, setAttributes)}>

        {
            /*
             Multiple measures conditions

             Bar:
             no dimensions selected
             one dimension is selected
             -  not available when second dimension gets selected

             Line:
               - Always multi measure as measures represents line series, one dimension should always be selected

             Pie:
                  no dimensions selected
                   -  not available when any dimension is selected
             */

            ((type == 'line') || (type == 'radar') ||
                (type == 'bar' && dimension2 == 'none') ||
                (type == 'pie' && dimension1 == 'none' && dimension2 == 'none')) && allMeasures && [...new Set(allMeasures.map(p => getTranslation(p.group)))].map(g => {
                    return (<PanelBody initialOpen={panelStatus[g]}
                                       onToggle={e => togglePanel(g, panelStatus, setAttributes)}
                                       title={`${g} (${countSelected(g)} / ${countTotal(g)} ) `}>
                            {allMeasures.filter(f => getTranslation(f.group) === g)
                                .map(m => <PanelRow>
                                    <MeasureOptions single={false} measure={m}></MeasureOptions>
                                </PanelRow>)}
                        </PanelBody>


                    )
                }
            )
        }


        {
            /*Single measure conditions

        Bar:
               2 dimensions selected
         Line:
                never
         Pie:
              any dimensions selected

        */
            ((type=='big-number') || (type == 'bar' && dimension2 != 'none') || (type == 'pie' && (dimension1 != 'none' || dimension2 != 'none'))) && allMeasures && [...new Set(allMeasures.map(p => getTranslation(p.group)))].map(g => {
                return (<PanelBody
                        initialOpen={panelStatus[g]}
                        onToggle={e => togglePanel(g, panelStatus, setAttributes)}
                        title={`${g} (${countSelected(g)} / ${countTotal(g)} ) `}>

                        {allMeasures.filter(f => getTranslation(f.group) === g)
                            .map(m => <PanelRow>
                                <MeasureOptions single={true} measure={m}></MeasureOptions>
                            </PanelRow>)}

                    </PanelBody>
                )
            })


        }

        {
            (type == 'overlay') && allMeasures && <SelectControl
                label="Measure"
                value={selectedMeasures && selectedMeasures[0] ? selectedMeasures[0].value : null}
                options={[{value: '', label: 'Select Measure'}, ...allMeasures]}
                onChange={(measure) => onSetSingleMeasure(measure)}
                __nextHasNoMarginBottom
            />

        }


        {(type != 'overlay') && <PanelBody title={__("Format")} initialOpen={panelStatus["FORMAT"]}
                                           onToggle={e => togglePanel("FORMAT", panelStatus, setAttributes)}>
            <Format                
                hiddenCustomAxisFormat={type=='radar' || type=='big-number'}              
                format={format || (measures[app] && measures[app].format ? measures[app].format : defaultFormat)}
                customFormat={measures[app] && measures[app].customFormat ? measures[app].customFormat : defaultFormat}
                useCustomAxisFormat={measures[app] ? measures[app].useCustomAxisFormat : false}
                onFormatChange={(format, field) => {
                    onFormatChange(format, field)
                }}
                onUseCustomAxisFormatChange={value => {
                    onUseCustomAxisFormatChange(value)
                }}
            >
            </Format>
        </PanelBody>}

    </PanelBody>
        {(type != 'overlay') && selectedMeasures && selectedMeasures.length > 0 &&
            <PanelBody title={__("Measure Label Customization")}
                       initialOpen={panelStatus["MEASURES_LABEL_CUSTOMIZATION"]}
                       onToggle={e => togglePanel("MEASURES_LABEL_CUSTOMIZATION", panelStatus, setAttributes)}>

                {selectedMeasures && [...new Set(selectedMeasures.map(p => getTranslation(p.group)))].map(g => {
                        return (<PanelBody initialOpen={panelStatus[g + "_LABEL_CUSTOMIZATION"]}
                                           onToggle={e => togglePanel(g + "_LABEL_CUSTOMIZATION", panelStatus, setAttributes)}
                                           title={`${g}`}>
                                {selectedMeasures.filter(f => getTranslation(f.group) === g)
                                    .map(m => {
                                        const userMeasure = measures[app] ? measures[app][m.value] : {}
                                        return (<><PanelRow><ToggleControl
                                            label={getTranslation(m)}
                                            checked={userMeasure ? userMeasure.hasCustomLabel : false}
                                            onChange={(value) => onCustomLabelToggleChange(m.value)}/> </PanelRow>
                                            {userMeasure.hasCustomLabel &&
                                                <PanelRow>
                                                    <TextControl label={__("Custom Label")}
                                                                 value={userMeasure ? userMeasure.customLabel : ""}
                                                                 onChange={(value) => onCustomLabelChange(m.value, value)}/>
                                                </PanelRow>
                                            }
                                        </>)

                                    })}
                            </PanelBody>


                        )
                    }
                )
                }


            </PanelBody>
        }
    </>
}


export default Measures