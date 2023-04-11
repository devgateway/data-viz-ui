import {
    Button,
    ButtonGroup,
    PanelBody,
    PanelRow,
    RangeControl,
    TextControl,
    ToggleControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {PanelColorSettings} from '@wordpress/block-editor';

const Legends = (props) => {
    const {
        setAttributes, attributes: {
            showLegends, legendPosition, marginLeft,
            marginRight,
            marginBottom,
            marginTop,
            legendLabel,
            useLabelBackground,
            useCheckBoxBackground,
            legendLabelColor,
            reverseLegend
        }
    } = props;

    return [
        <PanelBody initialOpen={false}   title={__("Margins")}>
            <PanelRow>
                <RangeControl
                    label={__('Margin Bottom (Space between chart area and bottom border)')}
                    value={marginBottom}
                    onChange={(marginBottom) => setAttributes({marginBottom})}
                    min={0}
                    max={500}
                />
            </PanelRow>

            <PanelRow>
                <RangeControl
                    label={__('Margin Left (Space between chart area and left border)')}
                    value={marginLeft}
                    initialPosition={0}
                    onChange={(marginLeft) => setAttributes({marginLeft})}
                    step={1}
                    min={0}
                    max={500}/>
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Margin Right')}
                    value={marginRight}
                    onChange={(marginRight) => setAttributes({marginRight})}
                    min={0}
                    max={500}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Margin Top')}
                    value={marginTop}
                    onChange={(marginTop) => setAttributes({marginTop})}
                    min={0}
                    max={500}
                />
            </PanelRow>
        </PanelBody>,
        <PanelBody initialOpen={false}   title={__("Legends")}>

            <PanelRow>
                <ToggleControl
                    label={__("Show Legends")}
                    checked={showLegends}
                    onChange={() => setAttributes({showLegends: !showLegends})}
                />
            </PanelRow>
           
            {showLegends &&
                <PanelRow>
                    <ToggleControl
                        label={__("Reverse legend order")}
                        checked={reverseLegend}
                        onChange={() => setAttributes({ reverseLegend: !reverseLegend })}
                    />
                </PanelRow>
            }
            {showLegends && <PanelRow>
                <ToggleControl label={__("Use Label Background")} checked={useLabelBackground}
                               onChange={e => setAttributes({useLabelBackground: !useLabelBackground})}></ToggleControl>

            </PanelRow>
            }
            {showLegends && <PanelRow>
                <ToggleControl label={__("Use Checkbox Background")} checked={useCheckBoxBackground}
                               onChange={e => setAttributes({useCheckBoxBackground: !useCheckBoxBackground})}></ToggleControl>

            </PanelRow>

            }
           
             {showLegends && <PanelRow>
                <ButtonGroup>
                    <Button isPrimary={legendPosition == 'left'} isSecondary={legendPosition != 'left'}
                            onClick={e => setAttributes({legendPosition: "left"})}>
                        {__("Left")}
                    </Button>
                    <Button isPrimary={legendPosition == 'top'}
                            isSecondary={legendPosition != 'top'}
                            onClick={e => setAttributes({legendPosition: "top"})}>
                        {__("Top")}
                    </Button>
                    <Button isPrimary={legendPosition == 'right'}
                            isSecondary={legendPosition != 'right'}
                            onClick={e => setAttributes({legendPosition: "right"})}>
                        {__("Right")}
                    </Button>
                    <Button isPrimary={legendPosition == 'bottom'}
                            isSecondary={legendPosition != 'bottom'}
                            onClick={e => setAttributes({legendPosition: "bottom"})}>
                        {__("Bottom")}
                    </Button>
                </ButtonGroup>

            </PanelRow>}
            {showLegends && <PanelRow>
                <TextControl
                    label={__('Legends Title')}
                    value={legendLabel}
                    onChange={(legendLabel) => setAttributes({legendLabel})}
                />
            </PanelRow>
            }
            {showLegends && <PanelRow>
                <PanelColorSettings
                    title={__('Legends text color')}
                    colorSettings={[
                        {
                            value: decodeURIComponent(legendLabelColor ? legendLabelColor : "#000000"),

                            onChange: (color) => {

                                if (color) {
                                    setAttributes({legendLabelColor: encodeURIComponent(color)})
                                } else {
                                    setAttributes({legendLabelColor: null})
                                }
                            },

                            label: __("")
                        }
                    ]}

                /> </PanelRow>}

            
        </PanelBody>,

    ]
}

export default Legends