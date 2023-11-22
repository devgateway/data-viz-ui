import {
    Button,
    ButtonGroup,
    PanelBody,
    PanelRow,
    SelectControl,
    TextareaControl,
    TextControl
} from '@wordpress/components';
import {PanelColorSettings} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';
import {togglePanel} from "../commons/Util";
import ChartMeasures from "../commons/ChartMeasures";

const overLayPrototype = (preFillCsv) => {
    return {
        app: 'csv',
        lineColor: "#555555",
        csvLineLayerData: preFillCsv,
        tooltip: "",
        title: "",
        measure: [],
    }
}

const LineOverlay = (props) => {
    const {
        setAttributes,
        allDimensions,
        allMeasures,
        allCategories,
        apps,
        attributes: {panelStatus, overlays, dimension1, app}
    } = props;


    const add = () => {

        let preFillCsv = ""
        if (app != "csv" && dimension1) {
            const dimension = allDimensions.filter(d => d.value === dimension1).reduce(((a, b) => b), null)
            const cat = allCategories.filter(c => c.type == dimension.type).reduce(((a, b) => b), null)
            preFillCsv = cat ? cat.items.sort((s1, s2) => s1.position - s2.position).map(i => i.value).join(",\r\n") + "," : ""
        }
        const newOverlay = [...overlays, overLayPrototype(preFillCsv)];
        setAttributes({overlays: newOverlay});
    };


    const remove = () => {
        const newOverlay = [...overlays]
        newOverlay.pop()
        setAttributes({overlays: newOverlay})

    }

    const onChange = (idx, attribute, value) => {
        const newOverlay = [...overlays]
        newOverlay[idx][attribute] = value

        setAttributes({overlays: newOverlay})
    }

    return <>{overlays && overlays.map((o, idx) => {
        const overlayMeasures = {}
        overlayMeasures[o.app] = {}
        overlayMeasures[o.app][o.measure] = {selected: true}
        return <PanelBody title={o.title} panelStatus={panelStatus['series_'] + idx}
                          onToggle={e => togglePanel(panelStatus['series_'] + idx, panelStatus, setAttributes)}>

            <PanelRow>
                <SelectControl
                    value={[o.app]} // e.g: value = [ 'a', 'c' ]
                    onChange={value => onChange(idx, "app", value)}
                    options={apps}
                />
            </PanelRow>
            <PanelRow>
                <TextControl
                    label={__('Title', "dg")}
                    value={o.title}
                    onChange={value => onChange(idx, "title", value)}
                />
            </PanelRow>


            {o.app == "csv" &&
                <PanelRow><p>{__("First value should match with bar x value", "dg")} </p></PanelRow>}
            {o.app == "csv" && <PanelRow>
                <TextareaControl
                    label={__("CSV Data", "dg")}
                    value={o.csvLineLayerData}
                    onChange={value => onChange(idx, "csvLineLayerData", value)}>
                </TextareaControl>
            </PanelRow>}

            {o.app != "csv" &&
                <ChartMeasures
                    title={"Select Measure"}
                    onMeasuresChange={e => null}
                    onFormatChange={a => alert("format")}
                    onSetSingleMeasure={value => onChange(idx, "measure", [value])}
                    allMeasures={allMeasures}
                    setAttributes={setAttributes}
                    attributes={{
                        panelStatus,
                        measures: overlayMeasures,
                        dimension1: null,
                        dimension2: null,
                        type: 'overlay',
                        app: o.app,
                    }
                    }
                />

            }

            <PanelRow>
                <PanelColorSettings
                    colorSettings={[
                        {
                            value: o.lineColor,
                            onChange: (color) => {
                                
                                if (color) {
                                    onChange(idx, "lineColor", color)
                                }

                            },
                            label: o.lineColor,
                        }
                    ]}
                />
            </PanelRow>
            <PanelRow>
                <TextareaControl
                    label={__("Tooltip", "dg")}
                    value={o.tooltip}
                    help={__("You can use {x} and {y} variables and # % #C formatters", "dg")}
                    onChange={value => onChange(idx, "tooltip", value)}
                />
            </PanelRow>

        </PanelBody>
    })}

        <PanelRow>
            <ButtonGroup>
                <Button isSecondary={true}
                        onClick={add}>
                    {__("Add Series")}
                </Button>
                <Button isSecondary={true}
                        onClick={remove}>
                    {__("Remove Series")}
                </Button>
            </ButtonGroup>
        </PanelRow>
    </>


}

export default LineOverlay