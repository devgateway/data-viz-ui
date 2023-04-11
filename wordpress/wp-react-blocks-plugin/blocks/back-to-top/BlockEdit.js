import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    PanelRow,
    TextControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ComponentWithSettings } from "../commons";
import {PanelColorSettings} from '@wordpress/block-editor';

class BlockEdit extends ComponentWithSettings {
    constructor(props) { 
        super(props);       
    }

    render() {
        const {
            setAttributes,
            attributes: {
                buttonLabel,
                height,
                width,
                backgroundColor,
                fontColor
            },
        } = this.props;
        
        const queryString = `editing=true&data-button-label=${buttonLabel}&data-height=${height}&data-width=${width}&data-background-color=${backgroundColor}&data-font-color=${fontColor}`
        const divStyles = { height: height + 'px', width: width + 'px' }       
        return (
            <div>
                <InspectorControls>
                    <Panel header={__("Back To Top Configuration","dg")}>
                        <PanelBody>
                            <PanelRow>
                                <TextControl
                                    value={buttonLabel}
                                    onChange={(buttonLabel) => setAttributes({ buttonLabel })}
                                />
                            </PanelRow>
                            {/*<PanelRow>
                                <TextControl
                                    size={10}
                                    label="Height"
                                    value={height}
                                    onChange={(height) => setAttributes({ height: height ? parseInt(height) : 0 })}
                                />
                            </PanelRow>
                            <PanelRow>
                                <TextControl
                                    size={10}
                                    label="Width"
                                    value={width}
                                    onChange={(width) => setAttributes({ width: width ? parseInt(width) : 0 })}
                                />
                            </PanelRow>*/}
                            <PanelRow>
                                <PanelColorSettings
                                    title={__('Color settings','dg')}
                                    colorSettings={[
                                        {
                                            value: decodeURIComponent(backgroundColor),
                                            onChange: (color) => {
                                                if (color) {
                                                    setAttributes({ backgroundColor: encodeURIComponent(color) })
                                                } else {
                                                    setAttributes({ backgroundColor: null })
                                                }
                                            },
                                            label: __('Background Color','dg')
                                        }
                                    ]}
                                />
                            </PanelRow>
                            <PanelRow>
                                <PanelColorSettings
                                    title={__('Color settings','dg')}
                                    colorSettings={[
                                        {
                                            value: decodeURIComponent(fontColor),
                                            onChange: (color) => {
                                                if (color) {
                                                    setAttributes({ fontColor: encodeURIComponent(color) })
                                                } else {
                                                    setAttributes({ fontColor: null })
                                                }
                                            },
                                            label: __('Font Color','dg')
                                        }
                                    ]}
                                />
                            </PanelRow>
                        </PanelBody>
                        
                   </Panel>
                </InspectorControls>
                <div style={divStyles}>
                        {this.state.react_ui_url && <iframe style={divStyles} scrolling={"no"}
                            src={this.state.react_ui_url + "/embeddable/backtotop?" + queryString} />}
                </div>               
            </div>
        );

    }
}

const Edit = (props) => {
    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return <div {...blockProps}><BlockEdit {...props} /></div>;

}
export default Edit;

