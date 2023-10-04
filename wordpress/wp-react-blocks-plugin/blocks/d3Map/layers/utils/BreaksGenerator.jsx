import {Button, PanelBody, PanelRow, RangeControl, TextControl} from "@wordpress/components";
import {PanelColorSettings} from "@wordpress/block-editor";
import {__} from '@wordpress/i18n';

var ss = require('simple-statistics')
const BreaksGenerator = ({onChangeProperty, breaks = [], defaultFillColor, defaultBorderColor, showSize}) => {

    const add = () => {
        const newBreaks = [...breaks]

        newBreaks.push({
            start: 0,
            end: 1,
            color: defaultFillColor,
            borderColor: defaultBorderColor,
            size: 1
        })
        onChangeProperty("breaks", newBreaks)
    }

    const update = (property, index, value) => {
        const newBreaks = [...breaks]
        newBreaks[index][property] = value
        onChangeProperty("breaks", newBreaks)
    }

    const remove = (index) => {

        const newBreaks = [...breaks]
        newBreaks.pop()
        onChangeProperty("breaks", newBreaks)
    }

    return <>
        {breaks.map((br, index) => {
            return (<PanelBody title={"Break (" + br.end + ")"}>
                <PanelRow>
                    <TextControl
                        type={"Number"}
                        label={__("Threshold", "dg")}
                        value={br.end}
                        onChange={(value) => update("end", index, value)}
                    />
                </PanelRow>
                {showSize && <PanelRow>
                    <RangeControl
                        label="Size"
                        value={br.size}
                        onChange={(value) => {
                            update("size", index, value)
                        }}
                        step={1}
                        min={0}
                        max={200}
                    />
                </PanelRow>}
                <PanelRow>
                    <PanelColorSettings
                        title={__(`Fill Color`)}
                        colorSettings={[{
                            value: br.color,
                            onChange: (fillColor) => {
                                update("color", index, fillColor)
                            },

                        }]}
                    />

                </PanelRow>
            </PanelBody>)
        })
        }


        <PanelRow>
            <Button isLink onClick={e => add()}>Add Break</Button>
            <Button isLink onClick={e => remove()}>Remove Break</Button>
        </PanelRow>
    </>
}


export default BreaksGenerator;