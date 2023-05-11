import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, SelectControl, TextControl, ToggleControl, ResizableBox} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BlockEditWithAPIMetadata, ComponentWithSettings} from '../commons/index'
import {Component} from "@wordpress/element";

const DEFAULT_VALUE_INPUT = 'DEFAULT_VALUE_INPUT'
const LOWEST_VALUE = 'LOWEST_VALUE'
const HIGHEST_VALUE = 'HIGHEST_VALUE'


class BlockEdit extends ComponentWithSettings {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            toggleSelection,
            isSelected,
            setAttributes,
            attributes: {
                height,
                name,
                showIcons,
                showLabels,
            }
        } = this.props;

        const iframeStyles = {height: height+ "px", width: "100%"}

        return ([isSelected && (<InspectorControls>
            <Panel header={__("Menu Configuration")}>
                <PanelBody>

                    <PanelRow>
                        <TextControl
                            label={__('Name')}
                            value={name}
                            onChange={(name) => setAttributes({name})}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label="Show Icons"
                            checked={showIcons}
                            onChange={() => setAttributes({showIcons: !showIcons})}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label="Show Labels"
                            checked={showLabels}
                            onChange={() => setAttributes({showLabels: !showLabels})}
                        />
                    </PanelRow>
                </PanelBody>
            </Panel>
        </InspectorControls>),
            (
                <ResizableBox
                    size={{height}}
                    style={{"margin": "auto", width: "100%"}}
                    minHeight="200"
                    minWidth="100"
                    enable={{
                        top: false,
                        right: false,
                        bottom: true,
                        left: false,
                        topRight: true,
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

                    {this.state.react_ui_url &&
                        <iframe ref={this.iframe}
                                scrolling={"no"}
                                style={iframeStyles}
                                src={this.state.react_ui_url + "/embeddable/menu"}/>}
                </div>
                </ResizableBox>
            )]);

    }
}


const Edit = (props) => {

    const blockProps = useBlockProps({className: 'wp-react-component'});
    return (<div {...blockProps}>
        <p className={"iframe container"}>
            <BlockEdit {...props}/>
        </p>

    </div>)


}
export default Edit;