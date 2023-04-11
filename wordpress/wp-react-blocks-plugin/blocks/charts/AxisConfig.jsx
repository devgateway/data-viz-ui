import {AnglePickerControl, PanelBody, PanelRow, RangeControl, TextControl, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {PanelColorSettings} from '@wordpress/block-editor';

const AxisConfig = (props) => {

    const {
        toggleSelection,
        setAttributes,
        attributes: {
            leftLegend,
            offsetY,
            tickColor,
            tickRotation,
            overrideTickColor,
            xLabelColor,
            barLabelColor,
            type,
            rightLegend,
            offsetRight,
            showRightAxis,
            bottomLegend,
            offsetBottom,
            showTickLine,
            highlightXAxisLine,
            maxValue,
            fixedMinValue,
            fixedMaxValue,
            yAxisTickValues,
            offsetText,
            minMaxClamp
        }
    } = props;


    return [<PanelBody initialOpen={false}   title={__("X Axis Settings")}>
        <PanelRow>
            <ToggleControl
                label={__("Highlight X Axis Line")}
                checked={highlightXAxisLine}
                onChange={(highlightXAxisLine) => setAttributes({highlightXAxisLine})}/>
        </PanelRow>
        <PanelRow>
            <ToggleControl
                label={__("Show X axis label lines")}
                checked={showTickLine === true}
                onChange={(value) => setAttributes({showTickLine: !showTickLine})}/>
        </PanelRow>
            {<PanelRow>
                <ToggleControl
                    label={__("Override X Axis Text Background")}
                    checked={overrideTickColor === true}
                    onChange={(value) => setAttributes({overrideTickColor: !overrideTickColor})}/>
            </PanelRow>}

            {overrideTickColor && <PanelRow>
                <PanelColorSettings
                    title={__('X Axis Text Background')}
                    colorSettings={[
                        {
                            value: decodeURIComponent(tickColor ? tickColor : "#f0f0f1"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({tickColor: encodeURIComponent(color)})
                                } else {
                                    setAttributes({tickColor: null})
                                }
                            },
                            label: __("")
                        }
                    ]}

                />
            </PanelRow>}

            <PanelRow>
                <AnglePickerControl label={__("X Axis Text Rotation")} value={tickRotation}
                                    onChange={value => setAttributes({tickRotation: value})}/>
            </PanelRow>

            <PanelRow>
                <RangeControl
                    label={__('X Axis Text Offset')}
                    value={offsetText}
                    onChange={(offsetText) => setAttributes({ offsetText })}
                    min={-200}
                    max={200}
                />
            </PanelRow>

            <PanelRow>
                <PanelColorSettings
                    title={__('X Axis Text Color')}
                    colorSettings={[
                        {
                            value: decodeURIComponent(xLabelColor ? xLabelColor : "#000000"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({xLabelColor: encodeURIComponent(color)})
                                } else {
                                    setAttributes({xLabelColor: null})
                                }
                            },
                            label: __("")
                        }
                    ]}
                />
            </PanelRow>
            {type=='bar'&& <PanelRow>
                <PanelColorSettings
                    title={__('Bar Text Color')}
                    colorSettings={[
                        {
                            value: decodeURIComponent(barLabelColor ? barLabelColor : "#000000"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({barLabelColor: encodeURIComponent(color)})
                                } else {
                                    setAttributes({barLabelColor: null})
                                }
                            },
                            label: __("")
                        }
                    ]}
                />
            </PanelRow>}
            <PanelRow>
                        <TextControl
                            label={__('X Axis Title')}
                            value={bottomLegend}
                            onChange={(bottomLegend) => setAttributes({ bottomLegend })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <RangeControl
                            label={__('X Axis Title Offset')}
                            value={offsetBottom}
                            onChange={(offsetBottom) => setAttributes({ offsetBottom })}
                            min={-200}
                            max={200}
                        />
                    </PanelRow>
        </PanelBody>,
        <PanelBody initialOpen={false}   title={__("Y Axis Settings")}>
            <PanelRow>
                <TextControl
                    label={__('Title')}
                    value={leftLegend}
                    onChange={(leftLegend) => setAttributes({ leftLegend })}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Left Axis Title Offset')}
                    value={offsetY}
                    onChange={(offsetY) => setAttributes({ offsetY })}
                    min={-500}
                    max={500}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Number of Intervals')}
                    value={yAxisTickValues}
                    onChange={(yAxisTickValues) => setAttributes({ yAxisTickValues })}
                    min={0}
                    max={50}
                />
            </PanelRow>
            <PanelRow>
            <ToggleControl
                label={__("Show Right Axis")}
                checked={showRightAxis}
                onChange={(showRightAxis) => setAttributes({showRightAxis})}/>
          </PanelRow> 
            {showRightAxis &&
                <>
                    <PanelRow>
                        <TextControl
                            label={__('Right Axis Title')}
                            value={rightLegend}
                            onChange={(rightLegend) => setAttributes({ rightLegend })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <RangeControl
                            label={__('Right Axis Title Offset')}
                            value={offsetRight}
                            onChange={(offsetRight) => setAttributes({ offsetRight })}
                            min={-500}
                            max={500}
                        />
                    </PanelRow>
                </>
            }   
              <PanelRow>
                <ToggleControl
                    label={__("Use Fixed Min & Max Values")}
                    checked={maxValue === "fixed"}
                    onChange={() => setAttributes({maxValue: (maxValue === "auto" ? "fixed" : "auto")})}/>

            </PanelRow>
            {maxValue === 'fixed' &&
                <>
                <PanelRow>
                <ToggleControl
                    label={__("Chop off Chart at Min & Max Values")}
                    checked={minMaxClamp === true}
                    onChange={() => setAttributes({minMaxClamp: !minMaxClamp})}/>
               </PanelRow>
                    <PanelRow>
                        <TextControl value={fixedMinValue} label={__("Min y-Axis Value")}
                                     onChange={(value) => setAttributes({fixedMinValue: value})} type="number"/>
                    </PanelRow>
                    <PanelRow>
                        <TextControl value={fixedMaxValue} label={__("Max y-Axis Value")}
                                     onChange={(value) => setAttributes({fixedMaxValue: value})} type="number"/>
                    </PanelRow>
                </>
            }               
        </PanelBody>
    ]
}

export default AxisConfig