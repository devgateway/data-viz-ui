import {__} from '@wordpress/i18n';
import {CheckboxControl, PanelBody, PanelRow, ToggleControl, TextControl} from '@wordpress/components';
import {getTranslation} from "../commons/APIutils";


const Measures = (props) => {
    const {
        currentType,
        onMeasuresChange,
        onSetSingleMeasure,
        allMeasures,
        setAttributes,
        attributes: {
            measures,
            dimension2,
            customMeasureLabels
        }
    } = props


    const MeasureToggle = ({measure}) => {
        return (<ToggleControl
            label={measure.label}
            checked={measures.indexOf(measure.value) > -1}
            onChange={(value) => onMeasuresChange(measure.value)}/>)
    }
    const MeasureCheckBox = ({measure}) => {
        return <CheckboxControl
            label={measure.label}
            checked={measures.indexOf(measure.value) > -1}
            onChange={(value) => onSetSingleMeasure(measure.value)}/>
    }

    const onCustomLabelToggleChange = (measure) => {
        let newCustomMeasureLabels = {...customMeasureLabels}
        if (newCustomMeasureLabels[measure]) {
            newCustomMeasureLabels[measure].hasCustomLabel = !newCustomMeasureLabels[measure].hasCustomLabel
        } else {
            newCustomMeasureLabels[measure] = {hasCustomLabel: true, customLabel: ""}
        }
        setAttributes({customMeasureLabels: newCustomMeasureLabels})
    }

    const onCustomLabelChange = (measure, value) => {
        let newCustomMeasureLabels = {...customMeasureLabels}
        if (newCustomMeasureLabels[measure]) {
            newCustomMeasureLabels[measure].customLabel = value
        } else {
            newCustomMeasureLabels[measure] = {hasCustomLabel: true, customLabel: value}
        }
        setAttributes({customMeasureLabels: newCustomMeasureLabels})
    }


    return <><PanelBody initialOpen={false} title={__("Measures")}>
              {
            [...new Set(allMeasures.map(p => getTranslation(p.group)))].map(g => {
                    return (<PanelBody title={g}>
                            {allMeasures.filter(f => getTranslation(f.group) === g).map(m => <PanelRow><MeasureCheckBox
                                measure={m}></MeasureCheckBox></PanelRow>)}
                        </PanelBody>
                    )
                }
            )
            }
    </PanelBody>
        {measures && measures.length > 0 &&
        <PanelBody initialOpen={false} title={__("Measure Label Customization")}>    {
            [...new Set(allMeasures.filter(p => measures && measures.indexOf(p.value) != -1).map(p => getTranslation(p.group)))].map(g => {
                return (<PanelBody title={g}>
                    {allMeasures.filter(f => getTranslation(f.group) === g && measures && measures.indexOf(f.value) != -1).map(m =>
                        <>
                            <PanelRow>
                                <ToggleControl
                                    label={getTranslation(m)}
                                    checked={customMeasureLabels && customMeasureLabels[m.value] ? customMeasureLabels[m.value].hasCustomLabel : false}
                                    onChange={(value) => onCustomLabelToggleChange(m.value)} /> </PanelRow>
                            {customMeasureLabels && customMeasureLabels[m.value] && customMeasureLabels[m.value].hasCustomLabel &&
                                <PanelRow>
                                    <TextControl label={__("Custom Label")} value={customMeasureLabels && customMeasureLabels[m.value] ? customMeasureLabels[m.value].customLabel : ""} onChange={(value) => onCustomLabelChange(m.value, value)} />
                                </PanelRow>}
                        </>)}
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