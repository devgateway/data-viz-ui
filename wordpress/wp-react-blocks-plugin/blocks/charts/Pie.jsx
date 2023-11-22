import {
    AnglePickerControl,
    Button,
    ButtonGroup,
    PanelBody,
    PanelRow,
    RangeControl,
    TextareaControl,
    ToggleControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import ChartColors from "../commons/ChartColors.jsx"
import ChartLegends from "../commons/ChartLegends.jsx";

const PieOptions = (props) => {

    const {
        setAttributes, attributes: {
            endAngle,
            startAngle,
            centerLabel,
            showArcLabels,
            format,
            showArcLinkLabels,
            slicePadding,
            centerLabelFontWeight,
            centerLabelFontSize,
            centerLabelXOffset,
            centerLabelYOffset
        }
    } = props;

    
    return [<PanelBody initialOpen={false} title={__("Pie Options")}>
        <ChartColors {...props}></ChartColors>
        <PanelRow title={"Start Angle"}>
            <AnglePickerControl value={startAngle} onChange={value => setAttributes({startAngle: value})}/>
        </PanelRow>
        <PanelRow title={"End Angle"}>
            <AnglePickerControl value={endAngle} onChange={value => setAttributes({endAngle: value})}/>
        </PanelRow>
        <PanelRow>
            <RangeControl
                label={__('Slice Padding')}
                value={slicePadding}
                initialPosition={1}
                onChange={(slicePadding) => setAttributes({slicePadding})}
                step={0.5}
                min={0}
                max={20}/>
        </PanelRow>

        <PanelRow>
            <ToggleControl
                label={__("Show Slice Labels")}
                checked={showArcLabels}
                onChange={() => setAttributes({showArcLabels: !showArcLabels})}/>
        </PanelRow>
        <PanelRow>
            <ToggleControl
                label={__("Show Link Labels")}
                checked={showArcLinkLabels}
                onChange={() => setAttributes({showArcLinkLabels: !showArcLinkLabels})}/>
        </PanelRow>
        <ChartLegends {...props}></ChartLegends>


        <PanelBody initialOpen={false} title={__("Center Label")}>
            <PanelBody initialOpen={false} title={__("Variables")}>
                <PanelRow>
                    <span style={{"font-size": "11px"}}>Total Value -> {'{totalValue}'}</span>
                </PanelRow>
            </PanelBody>
            <PanelRow>
                <TextareaControl
                    label={__("Label")}
                    value={centerLabel}
                    help={__("You can use variables {var_name}.")}
                    onChange={(centerLabel) => setAttributes({centerLabel})}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Font Size')}
                    value={centerLabelFontSize}
                    onChange={(centerLabelFontSize) => setAttributes({centerLabelFontSize})}
                    min={0}
                    max={100}
                />
            </PanelRow>
            <PanelRow>
                <ButtonGroup>
                    <Button isPrimary={centerLabelFontWeight == 'lighter'}
                            isSecondary={centerLabelFontWeight != 'lighter'}
                            onClick={e => setAttributes({centerLabelFontWeight: "lighter"})}>
                        {__("Lighter")}
                    </Button>
                    <Button isPrimary={centerLabelFontWeight == 'normal'}
                            isSecondary={centerLabelFontWeight != 'normal'}
                            onClick={e => setAttributes({centerLabelFontWeight: "normal"})}>
                        {__("Normal")}
                    </Button>
                    <Button isPrimary={centerLabelFontWeight == 'bold'} isSecondary={centerLabelFontWeight != 'bold'}
                            onClick={e => setAttributes({centerLabelFontWeight: "bold"})}>
                        {__("Bold")}
                    </Button>
                </ButtonGroup>
            </PanelRow>

            <PanelRow>
                <RangeControl
                    label={__('X Offset')}
                    value={centerLabelXOffset}
                    onChange={(centerLabelXOffset) => setAttributes({centerLabelXOffset})}
                    min={-100}
                    max={300}
                />
            </PanelRow>

            <PanelRow>
                <RangeControl
                    label={__('Y Offset')}
                    value={centerLabelYOffset}
                    onChange={(centerLabelYOffset) => setAttributes({centerLabelYOffset})}
                    min={-100}
                    max={300}
                />
            </PanelRow>
        </PanelBody>


    </PanelBody>]
}

export default PieOptions