import {
    AnglePickerControl, Button, PanelBody, PanelRow, RangeControl, SelectControl, TextControl
} from "@wordpress/components";
import {PanelColorSettings} from "@wordpress/block-editor";
import {__} from '@wordpress/i18n';

import Papa from 'papaparse'

const Patterns = ({
                      allCategories,
                      allDimensions,
                      app,
                      onChangeProperty,
                      patterns,
                      patternDiscriminator,
                      defaultFillColor
                  }) => {

    const patternsOptions = [{label: 'Lines', value: 'lines'}, {label: 'Dots', value: 'dots'}, {
        label: 'Squares',
        value: 'squares'
    }, {label: 'Triangle', value: 'triangle'}]

    debugger;


    const dims = allDimensions ? allDimensions : []
    const cats = patternDiscriminator && allCategories ? allCategories.filter(c => c.type.toUpperCase() == patternDiscriminator.toUpperCase()) : []


    const items = cats.length > 0 ? cats[0].items : []
    const values = items.map(i => i.value)

    debugger;
    return <PanelBody title={"Patterns"}>
        <PanelRow>
            <SelectControl
                label={__("Discriminator")}
                value={patternDiscriminator}
                onChange={(v) => {
                    onChangeProperty('patternDiscriminator', v)
                }}
                options={[{label: "None", value: "none"}, ...dims]}/>
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
                        value: patterns[field + '_color'] ? patterns[field + '_color'] : defaultFillColor,
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