import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    getColorClassName,
    InspectorControls,
    PanelColorSettings,
    useBlockProps,
    withColors
} from '@wordpress/block-editor';
import {Generic} from '../icons/index.js'
import {Panel, PanelBody, PanelRow, TextControl} from '@wordpress/components';
import {BlockEditWithFilters} from "../commons";

const EditComponent = (props) => {
    const {
        backgroundColor,
        setBackgroundColor,
        attributes: {
            label,
            placeholder,
            successMessage,
            failureMessage,
            alignment,
            list,
            tag
        },
    } = props;

    let divClass;
    let divStyles = {"text-align": alignment, "padding": '5px'};


    if (backgroundColor != undefined) {
        if (backgroundColor.class != undefined) {
            divClass = backgroundColor.class;
        } else {
            divStyles['background-color'] = backgroundColor.color;
        }
    }

    const blockProps = useBlockProps(
        {
            style: divStyles,
            className: divClass
        }
    );


    const queryString = `editing=true&label=${label}&list=${list}&tag=${tag}&placeholder=${placeholder}&successmessage=${successMessage}&failuremessage=${failureMessage}&alignment=${alignment}`;

    return (
        <div>
            <InspectorControls>
                <Panel header="Block Settings">
                    <PanelBody>
                        <PanelRow>
                            <PanelColorSettings
                                title={__('Color settings')}
                                colorSettings={[
                                    {
                                        value: backgroundColor.color,
                                        onChange: setBackgroundColor,
                                        label: __('Background color')
                                    },
                                ]}
                            />
                        </PanelRow>


                        <PanelRow>
                            <TextControl
                                value={list}
                                onChange={(list) => props.setAttributes({list})}
                                label={__("Mailchimp list id")}/>

                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                value={tag}
                                onChange={(tag) => props.setAttributes({tag})}
                                label={__("Country TAG")}/>

                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                value={placeholder}
                                onChange={(placeholder) => props.setAttributes({placeholder})}
                                label={__("Input Placeholder")}/>
                        </PanelRow>

                        <PanelRow>
                            <TextControl
                                value={label}
                                onChange={(label) => props.setAttributes({label})}
                                label={__("Submit Label")}/>
                        </PanelRow>
                        <PanelRow>
                            <TextControl

                                value={successMessage}
                                onChange={(successMessage) => props.setAttributes({successMessage: successMessage})}
                                label={__("Success Message")}/>
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                value={failureMessage}
                                onChange={(failureMessage) => props.setAttributes({failureMessage: failureMessage})}
                                label={__("Failure Message")}/>
                        </PanelRow>
                    </PanelBody>
                </Panel>

            </InspectorControls>
            <div {...blockProps}  >
                <iframe  style={{width:'100%'}} scrolling={"no"}
                        src={props.src + queryString}/>

            </div>

        </div>
    );
}
const SaveComponent = (props) => {
    const {setAttributes} = props;
    const {
        customBackgroundColor,
        backgroundColor,
        alignment
    } = props.attributes;


    const divClass = getColorClassName('background-color', backgroundColor);

    const divStyles = {
        "background-color": customBackgroundColor,
        "text-align": alignment,
        "margin": 'auto'
    };
    const blockProps = useBlockProps.save(
        {
            style: divStyles,
            className: divClass
        }
    );
    return (<div {...blockProps}>
            <div {...props.attributes} className={"viz-component"} data-component={"newsletter"}></div>
        </div>


    );
}

class EditWithSettings extends BlockEditWithFilters {
    render() {
        return <EditComponent
            src={this.state.react_ui_url + "/embeddable/newsletter?"} {...this.props}></EditComponent>
    }
}

registerBlockType(process.env.BLOCKS_NS + '/newsletter',
    {
        title: __('Newsletter Form'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            label: {
                type: 'string',
                default: "Send",
            }
            ,
            placeholder: {
                type: 'string',
                default: "Enter your email",
            }
            ,
            successMessage: {type: 'string', default: "Thanks for submitting"},
            failureMessage: {type: 'string', default: "Something didn't go well, please try again later"},
            list: {
                type: 'string',
                default: "",
            },
            tag: {
                type: 'string',
                default: "",
            }


        }
        ,
        edit: withColors('backgroundColor', {textColor: 'color'})(EditWithSettings),
        save: SaveComponent,
    }
)
;
