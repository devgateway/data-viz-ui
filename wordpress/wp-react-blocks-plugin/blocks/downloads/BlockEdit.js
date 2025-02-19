import {
    getFontSizeClass,
    InspectorControls,
    PanelColorSettings,
    RichText,
    useBlockProps,
    useSetting
} from '@wordpress/block-editor';
import {
    CheckboxControl,
    FontSizePicker,
    Panel,
    PanelBody,
    PanelRow,
    RangeControl,
    TextareaControl,
    TextControl,
    ToggleControl
} from '@wordpress/components';
import {InnerBlocks} from '@wordpress/editor'; // or wp.editor
import {__} from '@wordpress/i18n';
import {ComponentWithSettings} from "../commons";


class BlockEdit extends ComponentWithSettings {

    constructor(props) {
        super(props);
        this.iframe = React.createRef();
    }

    render() {
        const {
            className,
            setAttributes,
            fontSizes,
            attributes: {
                color,
                type,
                height,
                checkPng,
                checkJpg,
                buttonLabel,
                defaultFormat,
                pngLabel,
                jpgLabel,
                pngText,
                jpgText,
                title,
                useTitle,
                sectionTitle,
                style,
                fontSize,
                fontClass,
                tooltip,
                downloadTooltip,
                includeSourceURL,
                sourceURLMarginLeft,
                sourceURLMarginTop,
                sourceURLFontSize
            },
        } = this.props;

        const titleStyle = {
            'font-size': (!fontClass) ? fontSize : 'auto',
            'color': color
        }
        ;
        //migration code
        if (tooltip != '') {
            ;
            setAttributes({downloadTooltip: tooltip, tooltip: ''})
            return null;
        }
       
        return (

            <div>
                <InspectorControls>
                    <Panel>
                        <PanelBody title={__("Default Format")}>
                            <PanelRow>
                                <div>
                                    <input type="radio" id="png" name="png" checked={defaultFormat === 'PNG'}
                                           value='PNG'
                                           onChange={() => setAttributes({
                                               defaultFormat: event.target.value,
                                               checkPng: true,
                                           })}/>
                                    <label for="PNG">PNG</label></div>
                                <div>
                                    <input type="radio" id="jpg" name="jpg" checked={defaultFormat === 'JPG'}
                                           value='JPG'
                                           onChange={() => setAttributes({
                                               defaultFormat: event.target.value,
                                               checkJpg: true
                                           })}/>

                                    <label for="JPG">JPG</label></div>
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Allowed Format")}>
                            <PanelRow>
                                <CheckboxControl
                                    label="PNG"
                                    checked={checkPng}
                                    onChange={(value) => {
                                        setAttributes({
                                            checkPng: value,
                                            checkJpg: value == false ? true : checkJpg,
                                            defaultFormat: value == false && defaultFormat === 'PNG' ? 'JPG' : defaultFormat
                                        })
                                    }}/>
                            </PanelRow>
                            <PanelRow>
                                <CheckboxControl
                                    label="JPG"
                                    checked={checkJpg}
                                    onChange={(value) =>
                                        setAttributes({
                                            checkJpg: value,
                                            checkPng: value == false ? true : checkPng,
                                            defaultFormat: value == false && defaultFormat === 'JPG' ? 'PNG' : defaultFormat
                                        })}/>
                            </PanelRow>
                        </PanelBody>

                        <PanelBody>
                            <PanelRow>
                                <ToggleControl
                                    label={__("Use Title")}
                                    checked={useTitle}
                                    onChange={() => setAttributes({useTitle: !useTitle})}/>

                            </PanelRow>
                            {useTitle && <PanelBody>
                                <PanelRow>
                                    <FontSizePicker
                                        fontSizes={fontSizes}
                                        withSlider={true}
                                        fallbackFontSize={14}
                                        value={fontSize}
                                        onChange={(fontSize) => {
                                            const current = fontSizes.filter(f => f.size === fontSize).shift()
                                            if (current) {
                                                setAttributes({
                                                    fontClass: getFontSizeClass(current.slug),
                                                    fontSize: fontSize
                                                })
                                            } else {
                                                setAttributes({fontClass: '', fontSize: fontSize})
                                            }
                                        }}>
                                    </FontSizePicker>
                                </PanelRow>
                                <PanelRow>
                                    <PanelColorSettings
                                        colorSettings={[
                                            {
                                                value: color,
                                                onChange: (color) => {
                                                    if (color) {
                                                        setAttributes({color})
                                                    } else {
                                                        setAttributes({color: null})
                                                    }
                                                },
                                                label: __('Text color')
                                            }
                                        ]}
                                    />
                                </PanelRow>
                            </PanelBody>}
                            <PanelRow>
                                <ToggleControl
                                    label={__("Use Light Style")}
                                    checked={style === 'light'}
                                    onChange={() => setAttributes({style: style === 'light' ? 'heavy' : 'light'})}/>

                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Button Label")}>
                            <PanelRow>

                                <TextControl
                                    value={buttonLabel}
                                    onChange={(buttonLabel) => setAttributes({buttonLabel})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Drop Down Label")}>
                            <PanelRow>

                                <TextControl
                                    value={title}
                                    onChange={(title) => setAttributes({title})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("PNG File Name")}>
                            <PanelRow>

                                <TextControl
                                    value={pngLabel}
                                    onChange={(pngLabel) => setAttributes({pngLabel})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("JPG File Name")}>
                            <PanelRow>

                                <TextControl
                                    value={jpgLabel}
                                    onChange={(jpgLabel) => setAttributes({jpgLabel})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("PNG Text")}>
                            <PanelRow>

                                <TextControl
                                    value={pngText}
                                    onChange={(pngText) => setAttributes({pngText})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("JPG Text")}>
                            <PanelRow>

                                <TextControl
                                    value={jpgText}
                                    onChange={(jpgText) => setAttributes({jpgText})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Tooltip")}>
                            <PanelRow>
                                <TextareaControl
                                    value={downloadTooltip}
                                    onChange={(downloadTooltip) => setAttributes({downloadTooltip})}/>
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Source URL")}>
                            <PanelRow>
                                <ToggleControl
                                    label={__("Include Source URL")}
                                    checked={includeSourceURL}
                                    onChange={() => setAttributes({includeSourceURL: !includeSourceURL})}/>
                            </PanelRow>
                            {includeSourceURL &&
                                <>
                                    <RangeControl
                                        label={__('Margin Left')}
                                        value={sourceURLMarginLeft}
                                        onChange={(sourceURLMarginLeft) => setAttributes({sourceURLMarginLeft})}
                                        min={0}
                                        max={300}
                                    />

                                    <RangeControl
                                        label={__('Margin Top')}
                                        value={sourceURLMarginTop}
                                        onChange={(sourceURLMarginTop) => setAttributes({sourceURLMarginTop})}
                                        min={0}
                                        max={50}
                                    />
                                    <RangeControl
                                        label={__('Font Size')}
                                        value={sourceURLFontSize}
                                        onChange={(sourceURLFontSize) => setAttributes({sourceURLFontSize})}
                                        min={8}
                                        max={24}
                                    />
                                </>
                            }
                        </PanelBody>
                    </Panel>
                </InspectorControls>

                <div className={`${className} ${className.split('-').join(' ')}`} >

                    <div style={{"display": "flex"}}>
                        {useTitle && <div style={{"flex-grow": "1"}}>
                            <RichText
                                tagName="p"
                                style={titleStyle}
                                className={`download title ${fontClass ? fontClass : ''}`}
                                value={sectionTitle}
                                onChange={(sectionTitle) => setAttributes({sectionTitle})}
                                placeholder={__('Title...')}
                            />
                        </div>}
                        <div style={!useTitle ? {"flex-grow": "1"} : {}}>

                            {this.state.react_ui_url && <iframe width={"100%"} ref={this.iframe} scrolling={"no"}
                                                                src={this.state.react_ui_url + "/embeddable/download?"}></iframe>
                            }
                        </div>

                    </div>


                    <InnerBlocks/>

                </div>
            </div>
        );

    }
}


const Edit = (props) => {
    const blockProps = useBlockProps();
    const fontSizes = useSetting ? useSetting('typography.fontSizes') : [];
    return <div {...blockProps}><BlockEdit fontSizes={fontSizes} {...props} /></div>;

}
export default Edit;