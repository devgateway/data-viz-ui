import {
    Button,
    PanelBody,
    PanelRow,
    RangeControl,
    AnglePickerControl,
    SelectControl,
    TextControl,
    ToggleControl, ButtonGroup
} from "@wordpress/components";
import {__} from '@wordpress/i18n';
import {getJsonFiles} from "./utils/FileUtils";
import {useEffect} from "react";
import {useState} from "@wordpress/element";
import DataLayer from "./Data";
import FlowLayer from "./Flow";
import LatLongLayer from "./LatLong";
import {BlockEditWithAPIMetadata, ComponentWithSettings} from "../../commons";
import Property from "./utils/Property";

import {PanelColorSettings} from "@wordpress/block-editor";
import {togglePanel} from "../../commons/Util";

const typeOptions = [
    {label: "Base", value: "base"},
    {label: "Data Shape", value: "data"},
    {label: "FLow layer ", value: "flow"},
    {label: "Data Points ", value: "dataPoints"}
]

const toOptions = (files) => {
    return [{label: 'None', value: 'none'}, ...files.map(file => {
        return {label: file.title.rendered, value: file.source_url}
    })]
}

const Base = (props) => {
    const {onChange, metadata, layer, layer: {name, shapeColor, labelFilter, type, file, app, labelField, visible}} = props

    const [files, setFiles] = useState([])
    const [features, setFeatures] = useState([])
    useEffect(() => {

        getJsonFiles().then(files => {
            setFiles(toOptions(files))

        })
    }, [])


    useEffect(() => {

        fetch(file).then(response => response.json()).then(data => {
            setFeatures(data.features);
        });
    }, [layer.file])

    const onChangeProperty = (atrr, value) => {
        console.log("change attribute " + atrr + " to " + value)
        const newLayer = {...layer}
        newLayer[atrr] = value
        onChange(newLayer)
    }

    return [
        <PanelRow>
            <TextControl
                type={"String"}
                label={__("Name", "dg")}
                onChange={name => onChangeProperty("name", name)}
                value={name}
            />
        </PanelRow>,
        <PanelRow>
            <ToggleControl
              label="Default visible"
              checked={visible}
              onChange={e => {
                  onChangeProperty("visible", !visible)
              }}
            />
        </PanelRow>,
        <PanelRow>
            <SelectControl
                label={__("Type", "dg")}
                value={type}
                onChange={type => onChangeProperty("type", type)}
                options={typeOptions}
            />
        </PanelRow>,
        <>{type != 'dataPoints' && <PanelRow>
            <SelectControl
                type={"String"}
                label="File"
                onChange={file => onChangeProperty("file", file)}
                value={file}
                options={files}>
            </SelectControl>
            </PanelRow>
        }</>,
        <>
            {type != 'dataPoints' && type != 'flow' && <PanelBody title={"Colors"} initialOpen={false}>
                <PanelColorSettings
                    title={__(`Fill Color`)}
                    colorSettings={[{
                        clearable: true,
                        enableAlpha: true,
                        value: layer.fillColor,
                        onChange: (fillColor) => {
                            if (fillColor != null) {
                                onChangeProperty("fillColor", fillColor)
                            } else {
                                onChangeProperty("fillColor", "transparent")
                            }
                        },
                    }]}
                />
                <PanelColorSettings
                    title={__(`Border Color`)}
                    colorSettings={[{
                        value: layer.borderColor,
                        clearable: true,
                        enableAlpha: true,
                        onChange: (borderColor) => {
                            onChangeProperty("borderColor", borderColor)
                        },

                    }]}
                />

                <PanelColorSettings
                    title={__(`Label Color`)}
                    label="Color"
                    colorSettings={[{
                        clearable: true,
                        enableAlpha: true,
                        value: layer.labelColor, onChange: (labelColor) => {
                            onChangeProperty("labelColor", labelColor)
                        },

                    }]}
                />

            </PanelBody>}
        </>,
        <>
            {type != 'dataPoints'&& type != 'flow' && <PanelBody title={"Labels"} initialOpen={false}>

                <Property
                    title={"Label Field"}
                    property={"labelField"} value={labelField}
                    onChangeProperty={onChangeProperty}
                    features={features}/>


                <PanelRow>
                    <RangeControl
                        label="Size"
                        value={layer.labelFontSize}
                        onChange={(labelFontSize) => onChangeProperty("labelFontSize", labelFontSize)}
                        min={1}
                        step={1}
                        max={100}
                    />
                </PanelRow>

                {labelField != 'none' && <PanelBody initialOpen={false} title={__("Labels")}>
                    <PanelRow>
                        <ToggleControl
                            label={"None/All"}
                            checked={labelFilter.length == 0}
                            onChange={(checked) => {
                                if (!checked) {
                                    onChangeProperty("labelFilter", features.map(f => f.properties[labelField]))
                                } else {
                                    onChangeProperty("labelFilter", [])
                                }

                            }}
                        />
                    </PanelRow>
                    {features && features.sort(f=>f.properties[labelField]).map(feature => <>
                        <PanelRow>
                            <ToggleControl
                                label={feature.properties[labelField]}
                                checked={labelFilter.indexOf(feature.properties[labelField]) == -1}
                                onChange={(selected) => {
                                    onChangeProperty("labelFilter", !selected ? [...layer.labelFilter, feature.properties[labelField]] : layer.labelFilter.filter(f => f !== feature.properties[labelField]))
                                }}
                            />
                        </PanelRow>
                        {(labelFilter.indexOf(feature.properties[labelField]) == -1) && <PanelBody title={__("Rotation")} initialOpen={false}>
                            <PanelRow>
                                <RangeControl
                                    label="Offset X"
                                    min={-500}
                                    max={500}
                                    value={layer.labelSettings[feature.properties[labelField] + "_offsetX"] || 0}
                                    onChange={(offsetX) => onChangeProperty("labelSettings", {
                                        ...layer.labelSettings, [feature.properties[labelField] + "_offsetX"]: offsetX
                                    })}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label="Offset Y"
                                    min={-500}
                                    max={500}
                                    value={layer.labelSettings[feature.properties[labelField] + "_offsetY"] || 0}
                                    onChange={(offset) => onChangeProperty("labelSettings", {
                                        ...layer.labelSettings, [feature.properties[labelField] + "_offsetY"]: offset
                                    })}
                                />
                            </PanelRow>
                            <PanelRow>
                                <AnglePickerControl label={"Rotation"}
                                                    value={layer.labelSettings[feature.properties[labelField] + "_rotation"] || 0}
                                                    onChange={(rotation) => onChangeProperty("labelSettings", {
                                                        ...layer.labelSettings,
                                                        [feature.properties[labelField] + "_rotation"]: rotation
                                                    })}>

                                    ></AnglePickerControl>
                            </PanelRow>
                        </PanelBody>}

                    </>)}

                </PanelBody>}
            </PanelBody>

            }  </>,

        <React.Fragment>
            {type == 'data' && <>
                <DataLayer
                    apps={metadata.apps}
                    onChangeProperty={onChangeProperty}
                    allDimensions={metadata.dimensions}
                    allFilters={metadata.filters}
                    allMeasures={metadata.measures}
                    allCategories={metadata.categories}
                    allApps={metadata.apps}
                    features={features}
                    layer={layer}>
                </DataLayer>

            </>}
            {type == 'flow' && <>
                <FlowLayer
                    apps={metadata.apps}
                    onChangeProperty={onChangeProperty}
                    allDimensions={metadata.dimensions}
                    allFilters={metadata.filters}
                    allMeasures={metadata.measures}
                    allCategories={metadata.categories}
                    allApps={metadata.apps}
                    features={features}
                    layer={layer}>
                </FlowLayer>

            </>}
            {type == 'dataPoints' && <>
                <LatLongLayer
                    apps={metadata.apps}
                    onChangeProperty={onChangeProperty}
                    allDimensions={metadata.dimensions}
                    allFilters={metadata.filters}
                    allMeasures={metadata.measures}
                    allCategories={metadata.categories}
                    allApps={metadata.apps}
                    features={features}
                    layer={layer}>
                </LatLongLayer>

            </>}
        </React.Fragment>,


    ]

}

class LayerWithMetadata extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {layer: {name, type, file, app}} = this.props
        fetch(`/api/registry/eureka/apps`, {
            headers: {
                'Accept': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                const apps = data.applications ? [...data.applications.application
                    .filter(a => a.instance[0].metadata.type === 'data')
                    .map(a => ({
                        label: a.name, value: a.instance[0].vipAddress, settings: a.instance[0]
                    })), {label: 'CSV', value: 'csv'}] : [{label: 'CSV', value: 'csv'}]

                this.setState({...this.state, apps})
                this._loadMetadata(app)
            })
            .catch(function (response) {
                alert("error" + response)
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot)
        const {layer: {app}} = this.props
        const {layer: {app: prevAPP}} = prevProps
        if ((app != prevAPP) || (prevAPP == null && app != null)) {
            this._loadMetadata(app)
        }
    }

    render() {
        const {
            setAttributes,
            onMoveLayer,
            panelStatus,
            onRemoveLayer,
            layer,
            layer: {name, type, file, app}
        } = this.props

        return <PanelBody
            initialOpen={false}
            onToggle={e => togglePanel('LAYERS_' + name, panelStatus, setAttributes)} title={__("Layers")}
            title={__(`${name}`)}>
            <Base {...this.props} metadata={this.state}></Base>
            <PanelBody>
                <ButtonGroup>
                    <Button variant={"secondary"} type onClick={onRemoveLayer}>Delete</Button>
                    <Button variant={"secondary"} type onClick={e => onMoveLayer(-1, layer)}>Up</Button>
                    <Button variant={"secondary"} type onClick={e => onMoveLayer(1, layer)}>Down</Button>
                </ButtonGroup>
            </PanelBody>
            <PanelRow>
            </PanelRow>
        </PanelBody>
    }

}

export default LayerWithMetadata