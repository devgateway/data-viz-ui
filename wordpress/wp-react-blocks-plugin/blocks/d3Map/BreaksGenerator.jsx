import {Button, PanelBody, PanelRow, RangeControl, TextControl} from "@wordpress/components";
import {PanelColorSettings} from "@wordpress/block-editor";
import {__} from '@wordpress/i18n';

const BreaksGenerator = ({onChangeProperty, breaks = []}) => {

    const add = () => {
        const newBreaks = [...breaks]
        newBreaks.push({
            start: 0,
            end: 1,
            color: '#000000',
            size: .1
        })
        onChangeProperty("breaks", newBreaks)
    }

    const update = (property, index , value ) => {
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
            return (<PanelBody title={"Breaks"}>
                <PanelRow>
                    <TextControl
                        type={"Number"}
                        label={__("Start", "dg")}
                        value={br.start}
                        onChange={(value) => update("start", index, value)}
                    />
                </PanelRow>
                <PanelRow>
                    <TextControl
                        type={"Number"}
                        label={__("End", "dg")}
                        value={br.end}
                        onChange={(value) => update("end", index, value)}
                    />
                </PanelRow>
                <PanelRow>
                    <RangeControl
                        label="Maker Base Size"
                        value={br.size}
                        onChange={(value) => {
                            update("size", index, value)
                        }}
                        step={0.5}
                        min={0}
                        max={10}
                    />
                </PanelRow>
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
                    <PanelColorSettings
                        title={__(`Border Color`)}
                        colorSettings={[{
                            value: br.color,
                            onChange: (borderColor) => {
                                update("color", index, borderColor)
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