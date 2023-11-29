import {
    AnglePickerControl, Button, PanelBody, PanelRow, RangeControl, SelectControl, TextControl
} from "@wordpress/components";
import {PanelColorSettings} from "@wordpress/block-editor";
import {__} from '@wordpress/i18n';

import Papa from 'papaparse'
const defaultPatternColor="#000000"
const Patterns = ({csv, app, onChangeProperty, patterns, patternDiscriminator, defaultFillColor}) => {

    const patternsOptions = [
        {label: 'Lines', value: 'lines'},
        {label: 'Dots', value: 'dots'},
        {label: 'Squares', value: 'squares'},
        {label: 'Triangle', value: 'triangle'}]

    const data = Papa.parse(csv, {header: true, dynamicTyping: true});


    const fieldsOptions = data ? data.meta.fields.map(f => {
        return {label: f, value: f}
    }) : []
    const values = patternDiscriminator != 'none' ? [...(new Set(data.data.filter(d => d[patternDiscriminator] != null && d[patternDiscriminator].toString().trim() !== "").map(d => d[patternDiscriminator].toString().trim())))] : []
    return <PanelBody title={"Patterns"}>
        <PanelRow>
            <SelectControl
                label={__("Discriminator")}
                value={patternDiscriminator}

                onChange={(v) => {
                    onChangeProperty('patternDiscriminator', v)
                }}
                options={[{label: "None", value: "none"}, ...fieldsOptions]}/>
        </PanelRow>

        {values.map(field => <PanelBody title={field}>
            <PanelRow>
                <SelectControl
                    label={"Symbol"}
                    value={patterns[field + '_symbol'] ? patterns[field + '_symbol'] : 'none'}
                    onChange={(v) => {
                        onChangeProperty('patterns', {...patterns, [field + '_symbol']: v})
                    }}
                    options={[{label: "None", value: "none"}, ...patternsOptions]}/>
            </PanelRow>
            <PanelRow>
                <PanelColorSettings
                    title={__(`Color`)}
                    colorSettings={[{
                        value: patterns[field + '_color'] ? patterns[field + '_color'] : defaultPatternColor,
                        label: __('Fill Color'),
                        onChange: (color) => {
                            onChangeProperty('patterns', {...patterns, [field + '_color']: color})
                        },
                    }]}
                />
            </PanelRow>
            <PanelRow>
                <AnglePickerControl label={__("Rotation")} onChange={value => onChangeProperty('patterns', {
                    ...patterns, [field + '_rotation']: value
                })} value={patterns[field + '_rotation'] ? patterns[field + '_rotation'] : 0}/>
            </PanelRow>
        </PanelBody>)}


    </PanelBody>
}


export default Patterns;