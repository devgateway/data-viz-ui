import {Button, PanelBody, PanelRow, SelectControl, TextControl} from "@wordpress/components";
import {__} from '@wordpress/i18n';
import {getJsonFiles} from "./FileUtils";
import {useEffect} from "react";
import {useState} from "@wordpress/element";
import DataLayerSetting from "./DataLayerSettings";
import {BlockEditWithAPIMetadata, ComponentWithSettings} from "../commons";

const typeOptions = [{label: "Data", value: "data"},
    {label: "Base", value: "base"}]

const toOptions = (files) => {
    return [{label: 'None', value: 'none'}, ...files.map(file => {
        return {label: file.title.rendered, value: file.source_url}
    })]
}

const Layer = (props) => {
    const {onChange, metadata, layer, layer: {name, type, file, app}} = props

    const [files, setFiles] = useState([])
    useEffect(() => {
        getJsonFiles().then(files => {
            setFiles(toOptions(files))
        })
    }, [])

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
            <SelectControl
                label={__("Type", "dg")}
                value={type}
                onChange={type => onChangeProperty("type", type)}
                options={typeOptions}
            />
        </PanelRow>,
        <PanelRow>
            <SelectControl
                type={"String"}
                label="File"
                onChange={file => onChangeProperty("file", file)}
                value={file}
                options={files}>

            </SelectControl>
        </PanelRow>,
        <React.Fragment>
            {type=='data'&&<PanelBody initialOpen={false} title={__("API & Source")}>
                <PanelRow>
                    <SelectControl
                        value={[app]} // e.g: value = [ 'a', 'c' ]
                        onChange={(app) => {
                            onChangeProperty("app", app)
                        }}
                        options={metadata.apps}
                    />
                </PanelRow>
                <DataLayerSetting
                    onChangeProperty={onChangeProperty}
                    allDimensions={metadata.dimensions}
                    allFilters={metadata.filters}
                    allMeasures={metadata.measures}
                    allCategories={metadata.categories}
                    allApps={metadata.apps}
                    layer={layer}>
                </DataLayerSetting>
            </PanelBody>}
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
                        label: a.name,
                        value: a.instance[0].vipAddress,
                        settings: a.instance[0]
                    })), {label: 'CSV', value: 'csv'}] : [{label: 'CSV', value: 'csv'}]

                this.setState({...this.state, apps})
                this._loadMetadata(app)
            })
            .catch(function (response) {

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
        const {onRemoveLayer, layer, layer: {name, type, file, app}} = this.props
        return <PanelBody title={__(`${name}`)}>
            <Layer {...this.props} metadata={this.state}></Layer>
            <PanelRow>
                <Button variant={"primary"} type onClick={onRemoveLayer}>Delete {name}</Button>
            </PanelRow>
            <PanelRow>
            </PanelRow>
        </PanelBody>
    }

}

export default LayerWithMetadata