import {InspectorControls, useBlockProps, MediaUpload} from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    Button,
    PanelRow,
    SelectControl,
    TextControl,
    ToggleControl,
    ResizableBox,
    ButtonGroup
} from '@wordpress/components';
import {__} from '@wordpress/i18n';

import {BlockEditWithAPIMetadata, ComponentWithSettings} from '../commons/index'
import apiFetch from '@wordpress/api-fetch';

const DEFAULT_VALUE_INPUT = 'DEFAULT_VALUE_INPUT'
const LOWEST_VALUE = 'LOWEST_VALUE'
const HIGHEST_VALUE = 'HIGHEST_VALUE'


class BlockEdit extends ComponentWithSettings {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        super.componentDidMount()
        apiFetch({
            path: '/menus/v1/menus',
            method: 'GET'
        }).then((res) => {
            if (res) {
                debugger;
                const menus = res.map((item, index) => {
                    return {label: item.name, value: item.name}
                })
                this.setState({menus: [{label: __("None"), value: ""}, ...menus]})
            }

        });
    }

    render() {
        const {
            toggleSelection, isSelected, setAttributes, attributes: {
                label,
                height, icon, name, showIcons, showLabels,
            }
        } = this.props;

        const iframeStyles = {height: height + "px", width: "100%"}

        return ([isSelected && (<InspectorControls>
            <Panel header={__("Menu Configuration")}>
                <PanelBody>
                    <PanelRow>
                        <img src={icon}/>
                    </PanelRow>
                    <PanelRow>
                        <MediaUpload
                            onSelect={(media) => {
                                setAttributes({icon: media.url, icon_media_id: media.id})
                            }}
                            allowedTypes={['image']}
                            value={icon}
                            render={({open}) => (
                                <ButtonGroup>
                                    <Button onClick={e => setAttributes({icon: null, icon_media_id: null})}>Remove
                                        Icon</Button>
                                    <Button variant={"primary"} onClick={open}>Set Icon</Button>
                                </ButtonGroup>
                            )}
                        />
                    </PanelRow>

                    <PanelRow>
                        <TextControl
                            disabled
                            label={__('Height')}
                            value={height}
                            onChange={(value) => setAttributes({height: parseInt(value)})}
                        />
                    </PanelRow>
                    <PanelRow>
                        <SelectControl
                            label={__('Name')}
                            value={name}
                            onChange={(name) =>{
                                debugger;
                                setAttributes({name: name})

                            } }


                            options={this.state.menus ? this.state.menus : []}
                        >
                        </SelectControl>

                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={__('Heading Label')}
                            value={label}
                            onChange={(label) => setAttributes({label})}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label="Show Icons"
                            help={"Icon custom field required"}
                            checked={showIcons}
                            onChange={() => setAttributes({showIcons: !showIcons})}
                        />
                    </PanelRow>

                </PanelBody>
            </Panel>
        </InspectorControls>), (<ResizableBox
            size={{height}}
            style={{"margin": "auto", width: "100%"}}
            minHeight="30"
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

                {this.state.react_ui_url && <iframe ref={this.iframe}
                                                    scrolling={"no"}
                                                    style={iframeStyles}
                                                    src={this.state.react_ui_url + "/embeddable/menu"}/>}
            </div>
        </ResizableBox>)]);

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