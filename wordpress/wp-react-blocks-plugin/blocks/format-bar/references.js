import {__} from '@wordpress/i18n';
import {useState} from "@wordpress/element";
import {
    getTextContent,
    insertObject,
    registerFormatType,
    removeFormat,
    slice,
    useAnchorRef
} from '@wordpress/rich-text';

import {registerBlockType} from '@wordpress/blocks';
import {InspectorControls, RichTextToolbarButton} from '@wordpress/block-editor';
import {speak} from '@wordpress/a11y';
import {tag as linkIcon} from '@wordpress/icons';
import {Generic} from '../icons'
import {
    Button,
    Modal,
    Panel,
    PanelBody,
    PanelRow,
    Popover,
    TextareaControl,
    TextControl,
    ToggleControl,
    SelectControl
} from '@wordpress/components';
import {BlockEditWithAPIMetadata} from "../commons";

const name = process.env.BLOCKS_NS + '/reference';
const reference = {
    name,
    object: true,
    title: __('Reference'),
    tagName: 'link',

    className: "wp-reference",
    attributes: {
        className: 'class',
        style: 'style',
        "data-index": 'data-index',
        "data-link": "data-link",
        "data-description": "data-description",
        "data-component": "data-component"
    },
    edit
};

const PopUI = ({onClose, onCancel, value}) => {
    
    const [text, setText] = useState("")
    const [link, setLink] = useState("")
    const [updateRefs, setUpdateRefs] = useState(false)

    let suggestedIndex = 1;
    let isBefore = false;
    const currentPos = value.start

    const elements = document.getElementsByClassName("wp-reference")

    const indexes = elements.length > 0 ? new Array(...elements).map(e => parseInt(e.getAttribute("data-index"))) : [0];

    const max = Math.max(...indexes) + 1


    const [index, setIndex] = useState(max)

    return <Modal title={__("Reference")} onRequestClose={e => onCancel()}>

        <TextControl value={index} label={__("Index")}
                     onChange={(value) => setIndex(value)}>

        </TextControl>

        {isBefore && <ToggleControl checked={updateRefs} label={__("Update refs")}
                                    onChange={e => {
                                        setUpdateRefs(!updateRefs)
                                    }
                                    }></ToggleControl>}
        <TextareaControl
            label={__("Description")}
            help={__("Enter reference description ")}
            value={decodeURIComponent(text)}
            onChange={(value) => setText(encodeURIComponent(value))}
        />
        <TextControl value={link} label={__("URL")}
                     onChange={(value) => setLink(value)}
        ></TextControl>
        <Button isPrimary onClick={e => onClose(text, link, updateRefs, index)}>
            {__("Done")}
        </Button>
    </Modal>

}

function InlineUI({value, onChange, activeObjectAttributes, contentRef, onClose}) {
    const [index, setIndex] = useState(activeObjectAttributes["data-index"]);
    const [content, setContent] = useState(activeObjectAttributes["data-description"]);
    const [link, setLink] = useState(activeObjectAttributes["data-link"]);

    const anchorRef = useAnchorRef({
        ref: contentRef,
        value,
        settings: reference,
    });

    return (
        <Popover
            position="bottom center"
            focusOnMount={false}
            anchorRef={anchorRef}
        >
            <Panel>
                <PanelBody>
                    <form
                        onSubmit={(event) => {
                            const newReplacements = value.replacements.slice();
                            newReplacements[value.start] = {
                                type: name,
                                attributes: {
                                    ...activeObjectAttributes,
                                    "data-description": content,
                                    "data-index": index,
                                    "data-link": link,
                                    "data-component": "reference",

                                },
                            };

                            onChange({
                                ...value,
                                replacements: newReplacements,
                            });
                            onClose()
                            event.preventDefault();
                        }}
                    >
                        <PanelRow>

                            <TextControl value={index} label={__("Index")}
                                         className="block-editor-format-toolbar__image-container-value"

                                         onChange={(value) => setIndex(value)}>

                            </TextControl>

                        </PanelRow>
                        <PanelRow>
                            <TextareaControl
                                className="block-editor-format-toolbar__image-container-value"

                                label={__("Description")}
                                value={decodeURIComponent(content)}
                                onChange={(content) => setContent(content)}
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                className="block-editor-format-toolbar__image-container-value"

                                type="string"
                                label={__('Link')}
                                value={link}
                                onChange={(newLink) => setLink(newLink)}
                            />
                        </PanelRow>
                        <PanelRow style={{"justify-content": "end"}}>
                            <Button

                                isPrimary={true}
                                label={__('Apply')}
                                type="submit"
                            >Apply</Button>
                        </PanelRow>

                    </form>
                </PanelBody>
            </Panel>

        </Popover>
    );
}

function edit(props) {
    const {
        isObjectActive,
        isActive,
        activeObjectAttributes,
        activeAttributes,
        value,
        onChange,
        onFocus,
        contentRef
    } = props

    const anchorRef = useAnchorRef({
        ref: contentRef,
        value,
        settings: {},
    });
    const [showInline, setShowInline] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);


    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal(referenceText, referenceLInk, updateRefs, index) {
        
        const text = getTextContent(slice(value));
        const obj = insertObject(value, {
            type: name,
            attributes: {
                className: `wp-reference viz-component wp-reference-${index}`,
                "data-index": `${index}`,
                "data-link": referenceLInk ? referenceLInk : "",
                "data-component": "reference",
                "data-description": referenceText ? referenceText : "",
            },
        })

        onChange(
            obj
        );


        setIsModalOpen(false);
    }

    function onCancel() {
        setIsModalOpen(false);
    }

    function onRemoveFormat() {
        onChange(removeFormat(value, name));
        speak(__('Link removed.'), 'assertive');
    }

    const textValue = activeObjectAttributes["data-text"]
    return (
        <>
            <RichTextToolbarButton
                icon={linkIcon}
                title={__('Reference')}
                isActive={isActive}
                onClick={openModal}
                isActive={isObjectActive}
                shortcutType="primaryShift"
                shortcutCharacter="e"/>
            {isModalOpen && <PopUI value={value} onCancel={onCancel} onClose={closeModal}/>}
            {isObjectActive && <InlineUI value={value}
                                         onClose={e => {
                                             setShowInline(false)
                                         }}
                                         onChange={onChange}
                                         activeObjectAttributes={activeObjectAttributes}
                                         contentRef={contentRef}></InlineUI>}
        </>

    );
}

registerFormatType(name, reference);



class BlockEdit extends BlockEditWithAPIMetadata {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            isSelected,
            setAttributes,
            attributes: {
                group,
                app,
                resetLabel,
                height,
                columns,
                flexDirection
            }
        } = this.props;


        const queryString = `data-group=${group}&data-app=${app}&data-reset-label=${resetLabel}&editing=true`
        const iframeStyles = {height: '65px'}

        return ([isSelected && (<InspectorControls>
            <Panel header={__("References List")}>
                <PanelBody >
                    <PanelRow>
                        <SelectControl
                            label={__('Direction')}
                            value={[flexDirection]}
                            onChange={(value) => {
                                setAttributes({ flexDirection: value })
                            }}
                            options={[{ label: 'Top to Bottom', value: 'column' }, { label: 'Left to Right', value: 'row' }]}
                        />
                    </PanelRow>
                    {flexDirection == "column" &&
                        <PanelRow>
                            <TextControl value={height} label={__("Height")}
                                onChange={(height) => setAttributes({ height })} type="number" />
                        </PanelRow>
                    }
                    <PanelRow>
                        <TextControl value={columns} label={__("Number of columns")}
                            onChange={(columns) => setAttributes({ columns })} type="number" />
                    </PanelRow>
                </PanelBody>
            </Panel>
                
            </InspectorControls>),
                (<div>

                        {this.state.react_ui_url &&
                            <iframe id={"id_description_iframe"} scrolling={"no"}
                                    style={iframeStyles}
                                    src={this.state.react_ui_url + "/embeddable/references?" + queryString}/>}
                    </div>

                )]
        );

    }
}

const BlockSave = (props) => {
        const {       
        attributes: {
            height,
            columns,
            flexDirection
        }
    } = props;

    return (<div className={"viz-component"}
                 data-component={"references"}
                 data-columns={columns}
                 data-height={height}
                 data-flex-direction={flexDirection}>
    </div>)
}

registerBlockType(process.env.BLOCKS_NS + '/reference-lists',
    {
        title: __('References List'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            height: {
                type: "Numeric",
                default: 1000
            },
            columns: {
                type: "Numeric",
                default: 3
            },
            flexDirection:{
                type: "String",
                default: "column"
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);