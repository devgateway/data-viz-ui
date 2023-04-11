import { Component } from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import {
    Button,
    PanelBody,
    PanelRow,
    SelectControl,
    TextareaControl,
    RangeControl,
    ToggleControl
} from '@wordpress/components';

export default class Tooltips extends Component {
    constructor(props) {
        super(props);
        this.addCustomTooltip = this.addCustomTooltip.bind(this)
        this.removeCustomTooltip = this.removeCustomTooltip.bind(this)
    }

    setFieldData(field, value, idx) {
        const { attributes: { customTooltips }, setAttributes } = this.props
        const newCustomTooltip = customTooltips.slice()
        newCustomTooltip[idx][field] = value;
        setAttributes({ customTooltips: newCustomTooltip });
    }

    addCustomTooltip() {
        const { attributes: { customTooltips }, setAttributes } = this.props
        let index = customTooltips.length;
        const newCustomTooltip = {}
        let newCustomTooltips = customTooltips.slice()
        newCustomTooltips.push(newCustomTooltip)
        setAttributes({ customTooltips: newCustomTooltips })
    }

    removeCustomTooltip(f) {
        const { attributes: { customTooltips }, setAttributes } = this.props
        let newCustomTooltips = customTooltips.slice(0, -1)
        setAttributes({ customTooltips: newCustomTooltips })
    }

    render() {
        const { setAttributes, attributes: { customTooltips, app, tooltipFormat, showTooltip, showNoDataTooltip, tooltipTheme, tooltipFontSize}, locations } = this.props;
        return [
            <PanelBody initialOpen={false} title={__("Tooltips")}>
                <PanelRow>
                        <ToggleControl
                            label="Show tooltip"
                            checked={showTooltip}
                            onChange={() => setAttributes({ showTooltip: !showTooltip })} />

                    </PanelRow>
               {showTooltip &&
                   <>
                     <PanelRow>
                        <ToggleControl
                            label="Show 'No Data' tooltip"
                            checked={showNoDataTooltip}
                            onChange={() => setAttributes({ showNoDataTooltip: !showNoDataTooltip })} />
                            
                     </PanelRow>
                       <PanelRow>
                           <SelectControl
                               style={{ width: 100 }}
                               label={__('Tooltip theme')}
                               value={[tooltipTheme]}
                               onChange={(tooltipTheme) => {
                                   setAttributes({ tooltipTheme })
                               }}
                               options={[{ label: "Dark", value: "map-tooltip-dark" }, { label: "Light", value: "map-tooltip-light" }]}>

                           </SelectControl>
                       </PanelRow>
                       <PanelRow>
                           <RangeControl
                               label={__('Tooltip Font Size')}
                               value={tooltipFontSize}
                               onChange={(tooltipFontSize) => setAttributes({ tooltipFontSize })}
                               min={0}
                               max={20} />
                       </PanelRow>
                       <PanelRow>
                            <span style={{"font-size":"11px"}}>Location -> { '{locationName}'}</span>
                        </PanelRow>
                        <PanelRow>
                            <span style={{"font-size":"11px"}}>Field Label -> { '{label}'}</span>
                        </PanelRow>
                        <PanelRow>
                            <span style={{"font-size":"11px"}}>Measure Label -> { '{measureLabel}'}</span>
                        </PanelRow>
                        <PanelRow>
                            <span style={{"font-size":"11px"}}>Field Value -> { '{value}'}</span>
                        </PanelRow>
                        <PanelRow>
                            <span style={{"font-size":"11px"}}>All variables/columns that start with an _ in csv</span>
                        </PanelRow>
                <PanelRow>
                <TextareaControl
                    label={__("Tooltip Format")}
                    value={tooltipFormat}
                     onChange={(tooltipFormat) => setAttributes({tooltipFormat})}
                />
            </PanelRow>
            <PanelBody initialOpen={false} title={__("Custom Tooltips")}>
            {customTooltips.map((f, index) => {
                return (
                    <PanelBody initialOpen={true} title={__(`Custom Tooltip for: ${f.location ? f.location : ''}`)}>
                        {<SelectControl
                            style={{ width: 150 }}
                            label={__('Location to Match')}
                            value={[f.location]}
                            onChange={(value) => {
                                this.setFieldData('location', value, index)
                            }}
                            options={locations ? [{value:'', label: 'Select Location'}, ...locations] : []}>
                        </SelectControl>}

                        {<TextareaControl label={__("Tooltip text")}
                            value={f.tooltip} onChange={value => this.setFieldData('tooltip', value, index)} />}
                    </PanelBody>)
            })}
            <PanelRow>
                <Button isLink onClick={this.addCustomTooltip}>{__("Add Custom Tooltip")}</Button>
                <Button isLink onClick={this.removeCustomTooltip}>{__("Remove Custom Tooltip")}</Button>
            </PanelRow>
        </PanelBody>
                   </>
               }       
        </PanelBody>
        ]
    }
}