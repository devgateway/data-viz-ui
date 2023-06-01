import {InspectorControls, PanelColorSettings, useBlockProps} from '@wordpress/block-editor'
import {
    Panel,
    PanelBody,
    PanelRow,
    SelectControl,
    ResizableBox,
    ToggleControl,
    TextControl, Button
} from '@wordpress/components'

import {__} from '@wordpress/i18n'
import {BlockEditWithAPIMetadata, ComponentWithSettings, SizeConfig} from '../commons/index'
import LayerSettings from "./Layer";
import LayerObject from "./LayerObject"
import {togglePanel} from "../commons/Util";

class BlockEdit extends ComponentWithSettings {
    constructor(props) {
        super(props);
        this.onChangeLayer = this.onChangeLayer.bind(this)
        //this.addLayer = this.addLayer.bind(this)
        //this.removeLayer = this.removeLayer.bind(this)
        //this.removeLayer = this.removeLayer.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {attributes: {app}} = this.props
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    componentDidMount() {
        const {setAttributes} = this.props;
        super.componentDidMount();

        window.addEventListener("message", (event) => {
                if (event.data.type == 'd3map') {

                    const iframeOrigin = event.origin.split(':')[0]
                    const parentOrigin = window.location.origin.split(':')[0]
                    if (iframeOrigin == parentOrigin) {
                        setAttributes({mapPosition: event.data.value})
                    }
                }
            },
            false);
    }

    addLayer() {
        const {setAttributes, attributes: {layers}} = this.props
        const newLayers = [...layers]
        debugger;
        newLayers.push(new LayerObject())
        setAttributes({layers: newLayers})
    }

    removeLayer(layer) {
        const {setAttributes, attributes: {layers}} = this.props
        const {id, name} = layer
        debugger;
        const newLayers = layers.filter(l => l.id != id)
        setAttributes({layers: newLayers})
    }
    onChangeLayer(layer) {
        const {setAttributes, attributes: {layers}} = this.props
        const newLayers = [...layers]
        const index = layers.findIndex(l => l.id === layer.id);
        if (index !== -1) {
            newLayers[index] = layer;
        }
        setAttributes({layers: newLayers})
    }
    render() {
        const {
            className,
            isSelected,
            toggleSelection,
            setAttributes,
            attributes: {
                panelStatus,
                height,
                group,
                backGroundColor,
                layers = [],
            }
        } = this.props;

        const divStyles = {height: height + 'px', width: '100%'};

        return ([isSelected && (<InspectorControls>
                <Panel header={__("Map Configuration")}>
                    <PanelBody
                        initialOpen={panelStatus['GROUP']}
                        onToggle={e => togglePanel("GROUP", panelStatus, setAttributes)}
                        title={__("Group")}>
                        <PanelRow>
                            <TextControl
                                label={__('Name')}
                                value={group}
                                onChange={(group) => setAttributes({group})}
                            />
                        </PanelRow>
                    </PanelBody>
                    <SizeConfig setAttributes={setAttributes} panelStatus={panelStatus}
                                height={height}></SizeConfig>

                    <PanelBody
                        initialOpen={panelStatus['COLORS']}
                        onToggle={e => togglePanel("COLORS", panelStatus, setAttributes)}
                        title={__("Colors")}>


                        <PanelColorSettings
                            title={__('Background')}
                            colorSettings={[{
                                value: decodeURIComponent(backGroundColor), onChange: (color) => {
                                    if (color) {
                                        setAttributes({backGroundColor: encodeURIComponent(color)})
                                    } else {
                                        setAttributes({backGroundColor: null})
                                    }
                                }, label: __('Background Color')
                            }]}
                        />


                    </PanelBody>
                    <PanelBody initialOpen={panelStatus['LAYERS']}
                               onToggle={e => togglePanel("LAYERS", panelStatus, setAttributes)}
                               title={__("Layers")}>

                        {
                            layers.map((layer) => <LayerSettings
                                onRemoveLayer={(e) => this.removeLayer(layer)}
                                onChange={this.onChangeLayer}
                                layer={layer}
                                {...this.props}
                            />)
                        }
                        <PanelRow>
                            <Button variant={"primary"} onClick={e => this.addLayer()}>Add New Layer</Button>
                        </PanelRow>

                    </PanelBody>
                </Panel>
            </InspectorControls>),

                (
                    <ResizableBox
                        size={{height}}
                        style={{"margin": "auto", width: "100%"}}
                        minHeight="50"
                        minWidth="50"
                        enable={{
                            top: false,
                            right: false,
                            bottom: true,
                            left: false,
                            topRight: false,
                            bottomRight: false,
                            bottomLeft: false,
                            topLeft: false,
                        }}
                        onResizeStop={(event, direction, elt, delta) => {
                            setAttributes({
                                height: parseInt(height + delta.height, 10),
                            });
                            toggleSelection(true);
                        }}
                        onResizeStart={() => {
                            toggleSelection(false);
                        }}>

                        <div>
                            {this.state.react_ui_url && <iframe ref={this.iframe} scrolling={"no"}
                                                                style={divStyles}
                                                                src={this.state.react_ui_url + "/embeddable/newMap?"}/>}
                        </div>
                    </ResizableBox>
                )]
        );

    }
}

const Edit = (props) => {
    const blockProps = useBlockProps({className: 'wp-react-component'});
    return <div {...blockProps}><BlockEdit {...props} /></div>;
}
export default Edit;