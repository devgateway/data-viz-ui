import {InspectorControls, useBlockProps} from '@wordpress/block-editor'
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
import {BlockEditWithAPIMetadata, SizeConfig} from '../commons/index'
import APIConfig from "../map/APIConfig";
import LayerSettings from "./Layer";
import {layerPrototype} from "./Layer"

import {togglePanel} from "../commons/Util";
import CSVSourceConfig from "../commons/CSVSourceConfig";

class BlockEdit extends BlockEditWithAPIMetadata {
    constructor() {
        super();
    }

    addLayer() {
        const newLayers = [...layers]
        newLayers.push(Object.getPrototypeOf(layerPrototype))
    }

    removeLayer() {

    }

    render() {
        const {
            className, isSelected,
            toggleSelection,
            setAttributes,
            attributes: {
                panelStatus,
                height,
                group,
                app,
                layers = [],
            }
        } = this.props;

        const divStyles = {height: height + 'px', width: '100%'};

        return ([isSelected && (<InspectorControls>
                <Panel header={__("Map Configuration")}>
                    <PanelBody
                        panelStatus={panelStatus['GROUP']}
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


                    <PanelBody initialOpen={false} title={__("API & Source")}>
                        <PanelRow>
                            <SelectControl
                                value={[app]} // e.g: value = [ 'a', 'c' ]
                                onChange={(app) => {
                                    setAttributes({
                                        app: app
                                    })
                                }}
                                options={this.state.apps}
                            />
                        </PanelRow>
                    </PanelBody>
                    {app != 'csv' && <APIConfig
                        allDimensions={this.state.dimensions}
                        allFilters={this.state.filters}
                        allMeasures={this.state.measures}
                        allCategories={this.state.categories}
                        allApps={this.state.apps}
                        {...this.props}>
                    </APIConfig>}
                    {app == 'csv' &&
                        <CSVSourceConfig {...this.props}>
                        </CSVSourceConfig>}

                    <PanelBody panelStatus={panelStatus['LAYERS']}
                               onToggle={e => togglePanel("LAYERS", panelStatus, setAttributes)}
                               title={__("Layers")}>
                        {
                            layers.map((layer) => <LayerSettings layer={layer}/>)
                        }
                        <PanelRow>
                            <Button onClick={e => removeLayer()}>-</Button>
                            <Button onClick={e => addLayer()}>+</Button>
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