import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
    getColorClassName,
    InspectorControls,
    PanelColorSettings,
    useBlockProps,
    withColors
} from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, TextControl } from '@wordpress/components';
import Generic from "../icons";
import { BlockEditWithFilters } from "../commons";


class EditComponent extends BlockEditWithFilters {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            src,
            backgroundColor,
            setBackgroundColor,
            toggleSelection,
            setAttributes,
            attributes: {
                organization,
                name,
                email,
                country,
                message,
                submitLabel,
                resetLabel,
                successMessage,
                failureMessage,
                width,
                height,
                alignment
            },
        } = this.props;
        let divClass;
        let divStyles = { "text-align": alignment, "margin": 'auto' };
        if (backgroundColor != undefined) {
            if (backgroundColor.class != undefined) {
                divClass = backgroundColor.class;
            } else {
                divStyles['background-color'] = backgroundColor.color;
            }
        }

        const queryString = `editing=true&organization=${organization}&name=${name}&email=${email}&country=${country}&message=${message}&submitlabel=${submitLabel}&resetlabel=${resetLabel}&successmessage=${successMessage}&failuremessage=${failureMessage}&width=${width}&height=${height}&alignment=${alignment}`;


        return (
            <div>
                <InspectorControls>
                    <Panel header="Block Settings">

                        <PanelColorSettings
                            title={__('Color settings',"dg")}
                            colorSettings={[
                                {
                                    value: backgroundColor.color,
                                    onChange: setBackgroundColor,
                                    label: __('Background color',"dg")
                                },
                            ]}
                        />

                        <PanelRow>
                            <PanelBody>
                                <TextControl
                                    value={organization}
                                    onChange={(organization) => this.props.setAttributes({ organization: organization })}
                                    label={__("Organization Place Holder","dg")} />
                            </PanelBody>
                        </PanelRow>

                        <PanelRow>
                            <PanelBody>
                                <TextControl

                                    value={name}
                                    onChange={(name) => this.props.setAttributes({ name: name })}
                                    label={"Name Place Holder"} />
                            </PanelBody>
                        </PanelRow>

                        <PanelRow>
                            <PanelBody>
                                <TextControl

                                    value={email}
                                    onChange={(email) => this.props.setAttributes({ email: email })}
                                    label={"Email Place Holder"} />
                            </PanelBody>
                        </PanelRow>

                        <PanelRow>
                            <PanelBody>
                                <TextControl
                                    value={country}
                                    onChange={(country) => this.props.setAttributes({ country: country })}
                                    label={"Country Place Holder"} />
                            </PanelBody>
                        </PanelRow>

                        <PanelRow>
                            <PanelBody>
                                <TextControl

                                    value={message}
                                    onChange={(message) => this.props.setAttributes({ message: message })}
                                    label={"Message Place Holder"} />
                            </PanelBody>
                        </PanelRow>
                        <PanelRow>
                            <PanelBody>
                                <TextControl
                                    value={submitLabel}
                                    onChange={(submitLabel) => this.props.setAttributes({ submitLabel: submitLabel })}
                                    label={"Submit Label "} />
                            </PanelBody>
                        </PanelRow>
                        <PanelRow>
                            <PanelBody>
                                <TextControl
                                    value={resetLabel}
                                    onChange={(resetLabel) => this.props.setAttributes({ resetLabel: resetLabel })}
                                    label={"Reset Label "} />
                            </PanelBody>
                        </PanelRow>
                        <PanelRow>
                            <PanelBody>
                                <TextControl

                                    value={successMessage}
                                    onChange={(successMessage) => this.props.setAttributes({ successMessage: successMessage })}
                                    label={"Success Message"} />
                            </PanelBody>
                        </PanelRow>
                        <PanelRow>
                            <PanelBody>
                                <TextControl
                                    value={failureMessage}
                                    onChange={(failureMessage) => this.props.setAttributes({ failureMessage: failureMessage })}
                                    label={"Failure Message "} />
                            </PanelBody>
                        </PanelRow>
                    </Panel>
                </InspectorControls>
                <div className={divClass} style={{ ...divStyles, width, height }}>
                    {this.state.react_ui_url && <iframe scrolling={"no"} style={{ width, height }}
                        src={this.state.react_ui_url + "/embeddable/showcaseForm?" + queryString} />}
                </div>

            </div>


        );
    }
}


const Edit = (props) => {
    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return <div {...blockProps}><EditComponent {...props} /></div>;

}
export default Edit;