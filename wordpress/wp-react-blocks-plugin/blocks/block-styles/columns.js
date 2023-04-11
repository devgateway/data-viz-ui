import {InspectorControls, PanelColorSettings} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, RangeControl, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {addFilter} from '@wordpress/hooks';
import {Fragment} from "@wordpress/element";
import {createHigherOrderComponent} from '@wordpress/compose'
import classnames from 'classnames'

const allowedBlocks = ['core/columns', 'core/column'];


const editorBlockListBlock = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
        const {
            name,
            attributes: {compacted, bordered, radius, borderColor, borderWidth},
        } = props;

        if (allowedBlocks.includes(name)) {
            let className = props.className || ""
            if (compacted != null && compacted === true) {
                className = classnames(className, "is-compacted")
            }
            if (bordered != null && bordered === true) {
                className = classnames(className, "has-border")
            }
            let newStyles = {...props.style};

            if (bordered) {
                newStyles = {
                    ...newStyles,
                    'border': `${borderWidth}px solid ${borderColor}`,
                    'border-radius': `${radius}px`
                }
            }

            const newProps = {...props, className, style: newStyles}

            return <Fragment>

                <BlockListBlock {...newProps} wrapperProps={{style: newStyles}}/>

            </Fragment>
        } else {
            return <Fragment>
                <BlockListBlock {...props} />
            </Fragment>
        }
    };
}, 'withCompactedAttribute');


function blocksRegisterBlockType(settings, name) {

    if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {
        settings.attributes = Object.assign(settings.attributes, {
            compacted: {
                type: 'boolean',
                default: false,
            },
            bordered: {
                type: 'boolean',
                default: false,
            },
            radius: {
                type: 'numeric',
                default: 0,
            },
            borderWidth: {
                type: 'numeric',
                default: 1,
            },
            borderColor: {
                type: 'string',
                value: "#000"
            }
        });

    }

    return settings;
}

/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
function saveContent(extraProps, blockType, attributes) {
    if (allowedBlocks.includes(blockType.name)) {
        const {compacted, bordered, radius, borderColor,borderWidth} = attributes;

        if (compacted === true) {
            extraProps.className = classnames(extraProps.className, "is-compacted");
        }


        if (bordered === true) {
            extraProps.className = classnames(extraProps.className, "has-border");
        }
        if (bordered) {
            extraProps.style = {
                ...extraProps.style,
                'border': `1px solid ${borderColor}`,
                'border-radius': `${radius}px`,
                'border-width': `${borderWidth}px`
            }
        }
    }

    return extraProps
}

const editorBlockEdit = createHigherOrderComponent((BlockEdit) => {
    return (props) => {

        const {
            name,
            attributes,
            setAttributes,
            isSelected,
        } = props;

        const {
            radius,
            bordered,
            borderColor,
            compacted,
            borderWidth
        } = attributes;


        return (
            <Fragment>
                <BlockEdit {...props}/>


                {isSelected && allowedBlocks.includes(name) && <InspectorControls>

                    <Panel header={__("Additional Styles","dg")}>
                        <PanelBody>
                            <PanelRow>
                                <ToggleControl
                                    label="Compacted"
                                    checked={compacted}
                                    onChange={() => {
                                        setAttributes({compacted: !compacted})
                                    }}
                                />
                            </PanelRow>
                            <PanelRow>
                                <ToggleControl
                                    label="Border"
                                    checked={bordered}
                                    onChange={() => {
                                        setAttributes({bordered: !bordered})
                                    }}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label="Width"
                                    value={borderWidth}
                                    onChange={(borderWidth) => setAttributes({borderWidth})}
                                    min={0}
                                    max={10}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label="Radius"
                                    value={radius}
                                    onChange={(radius) => setAttributes({radius})}
                                    min={0}
                                    max={10}
                                />
                            </PanelRow>
                            <PanelRow>
                                <PanelColorSettings
                                    colorSettings={[
                                        {
                                            value: borderColor,
                                            onChange: (borderColor) => {
                                                if (borderColor) {
                                                    setAttributes({borderColor})
                                                } else {
                                                    setAttributes({borderColor: null})
                                                }
                                            },
                                            label: __('Border color',"dg")
                                        }
                                    ]}
                                />
                            </PanelRow>
                        </PanelBody>
                    </Panel>
                </InspectorControls>
                }

            </Fragment>
        );
    };
}, 'withAdvancedControls');


addFilter(
    'blocks.registerBlockType',
    'dg/custom-columns-attributes',
    blocksRegisterBlockType
);
addFilter(
    'editor.BlockEdit',
    'dg/custom-column-control',
    editorBlockEdit
);
addFilter(
    'blocks.getSaveContent.extraProps',
    'dg/applyExtraClass',
    saveContent
);

addFilter('editor.BlockListBlock', 'dg/with-additional-styles', editorBlockListBlock);
