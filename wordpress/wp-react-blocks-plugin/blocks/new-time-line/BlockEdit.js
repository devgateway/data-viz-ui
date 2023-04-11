import {ColorPalette, InspectorControls, PanelColorSettings, useBlockProps, useSetting} from '@wordpress/block-editor';
import {
    __experimentalNumberControl as NumberControl,
    __experimentalText as Text,
    Button,
    ButtonGroup,
    FontSizePicker,
    Panel,
    PanelBody,
    PanelRow,
    RangeControl,
    ResizableBox,
    TextControl

} from '@wordpress/components'

import {__} from '@wordpress/i18n';
import {BlockEditWithFilters, SizeConfig} from "../commons";
import apiFetch from '@wordpress/api-fetch';

const COLORS = ["#6acbd5", "#fcb535", "#f79132", "#e54957", "#0e5583","#2fb2e4", "#fcb535"]
const FontSelector = (props) => {
    
    const {
        setAttributes,
        attributes: {
            fontSize      
        },
    } = props;
    return <FontSizePicker
        fontSizes={[]}
        value={fontSize}
        fallbackFontSize={14}
        onChange={(newFontSize) => {
            setAttributes({fontSize: newFontSize})            
        }}
    />
}

class BlockEdit extends BlockEditWithFilters {

    constructor(props) {
        super(props);
        this.onCategoryChanged = this.onCategoryChanged.bind(this)
        this.onLoadPosts = this.onLoadPosts.bind(this)
    }


    onLoadPosts() {
        const {
            toggleSelection,
            setAttributes,
            attributes: {
                fontColor,
                count,
                type,
                taxonomy,
                categories,
                height = 450,
                config,
            },
        } = this.props;

        

        // path: '/wp/v2/' + taxonomy + '?per_page=100',
        let url = "/wp/v2/" + (type ? type : 'posts')

        url += (categories ? (taxonomy ? '?' + taxonomy : '&categories') + "=" + (categories ? categories : "") : '') //ids


        apiFetch({path: url}).then((data) => {
            alert(data)
        })
    }

    onCategoryChanged(checked, value) {
        super.onCategoryChanged(checked, value)


    }

    render() {
        const {
            toggleSelection,
            setAttributes,
            attributes: {
                lineWidth,
                position,
                config,
                count,
                type,
                lineColor,
                taxonomy,
                categories,
                height = 450,
                marginLeft,
                marginBottom,
                marginRight,
                marginTop,
                fontSize,
                titleWidth,
                subtitleWidth
            },
        } = this.props;

        const queryString = `editing=true&data-type=${type}&data-taxonomy=${taxonomy}&data-categories=${categories}&data-items=${count}&data-height=${height}&data-config=${encodeURIComponent(JSON.stringify(config))}&data-csv-line-color=${encodeURIComponent(lineColor)}&data-position=${position}&data-line-width=${lineWidth}&data-margin-left=${marginLeft}&data-margin-top=${marginTop}&data-margin-right=${marginRight}&data-margin-bottom=${marginBottom}&data-font-size=${fontSize}&data-title-width=${titleWidth}&data-subtitle-width=${subtitleWidth}`
        const divStyles = {height: height + 'px', width: '100%'}


        const newConfig = []
        if (count) {
            Array.from(Array(count).keys()).forEach(i => {
                if (!config[i]) {
                    newConfig.push({
                        circleColor: COLORS[i] || "#000000",
                        lineColor: COLORS[i]|| "#000000",
                        labelColor: "#000000",
                        titleColor: COLORS[i] || "#000000",
                        size: 10,
                        subtitleOffset: 20,
                        titleOffset: (i % 2 > 0) ? 120 : -120,
                        connectorLineHeight: 100,
                        position: (i % 2 > 0) ? "bottom" : "top",
                        readMoreLabel: "read more"
                    })
                } else {
                    newConfig.push(Object.assign({}, config[i]))
                }
            })
        }
        


        return (
            <div>
                <InspectorControls>
                    <Panel header={__("Settings")}>
                        <SizeConfig initialOpen={false} setAttributes={setAttributes} height={height} panelStatus={this.props.attributes.panelStatus}></SizeConfig>


                        {
                            this.renderFilters()
                        }


                        <PanelBody title={__("Settings")}>

                            <PanelRow>
                                <NumberControl
                                    isShiftStepEnabled={true}
                                    onChange={(count) => {
                                        setAttributes({count: parseInt(count)})
                                        setAttributes({config: newConfig})
                                    }}
                                    shiftStep={1}
                                    min={1}
                                    max={10}
                                    value={count}
                                    label={__("Items")}/>
                            </PanelRow>
                            <PanelRow>
                                <Text>{__("Position")}</Text>
                            </PanelRow>

                            <PanelRow>
                                <Button isPrimary={position == 'top'}
                                        isSecondary={position != 'top'}
                                        onClick={e => {
                                            setAttributes({position: "top"})
                                        }}>
                                    {__("Top")}
                                </Button>

                                <Button isPrimary={position == 'middle'}
                                        isSecondary={position != 'middle'}
                                        onClick={e => {
                                            setAttributes({position: "middle"})
                                        }}>
                                    {__("Middle")}
                                </Button>

                                <Button isPrimary={position == 'bottom'}
                                        isSecondary={position != 'bottom'}
                                        onClick={e => {
                                            setAttributes({position: "bottom"})
                                        }}>
                                    {__("Bottom")}
                                </Button>
                            </PanelRow>

                            <PanelRow>
                                <RangeControl
                                    label={__('Line Width')}
                                    value={lineWidth}
                                    onChange={(lineWidth) => {
                                        setAttributes({lineWidth})
                                    }}
                                    min={0}
                                    max={10}
                                />
                            </PanelRow>

                            <PanelRow>
                                <Text>{__("Font Size")}</Text>
                            </PanelRow>
                            <PanelRow>
                                <FontSelector {...this.props}></FontSelector>
                            </PanelRow>

                            <PanelRow>
                                <Text>{__("Line Color")}</Text>
                            </PanelRow>

                            <PanelRow>
                                <ColorPalette

                                    label="Line Color"
                                    value={lineColor}
                                    onChange={(value) => setAttributes({lineColor: value})}
                                />
                            </PanelRow>
                            <PanelRow>
                            <RangeControl
                                    label={__('Title Width')}
                                    value={titleWidth}
                                    onChange={(titleWidth) => {
                                        setAttributes({titleWidth})
                                    }}
                                    min={0}
                                    max={400}
                                />
                            </PanelRow>
                            <PanelRow>
                            <RangeControl
                                    label={__('Subtitle Width')}
                                    value={subtitleWidth}
                                    onChange={(subtitleWidth) => {
                                        setAttributes({subtitleWidth})
                                    }}
                                    min={0}
                                    max={400}
                                />
                            </PanelRow>

                        </PanelBody>
                        <PanelBody title={__("Margin Configuration")}>
                            <PanelRow>
                                <RangeControl
                                    label={__('Margin Bottom')}
                                    value={marginBottom}
                                    onChange={(marginBottom) => setAttributes({marginBottom})}
                                    min={0}
                                    max={300}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label={__('Margin Left')}
                                    value={marginLeft}
                                    onChange={(marginLeft) => setAttributes({marginLeft})}
                                    min={0}
                                    max={300}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label={__('Margin Right')}
                                    value={marginRight}
                                    onChange={(marginRight) => setAttributes({marginRight})}
                                    min={0}
                                    max={300}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label={__('Margin Top')}
                                    value={marginTop}
                                    onChange={(marginTop) => setAttributes({marginTop})}
                                    min={0}
                                    max={300}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Points Configuration")}>
                            {count && Array.from(Array(count).keys()).map(i => {
                                return <PanelBody title={__("Point") + " - (" + (i + 1) + ")"}>
                                    <PanelRow>
                                        <RangeControl
                                            label={__('Circle Size')}
                                            value={newConfig[i].size}
                                            onChange={(size) => {
                                                newConfig[i].size = size
                                                setAttributes({config: newConfig})
                                            }}
                                            min={0}
                                            max={100}
                                        />
                                    </PanelRow>


                                    <PanelRow>
                                        <RangeControl
                                            label={__('Subtitle Offset')}
                                            value={newConfig[i].subtitleOffset}
                                            onChange={(offset) => {
                                                newConfig[i].subtitleOffset = offset
                                                setAttributes({config: newConfig})
                                            }}
                                            min={-height}
                                            max={height}

                                        />
                                    </PanelRow>
                                    <PanelRow>
                                        <RangeControl
                                            label={__('Title Offset')}
                                            value={newConfig[i].titleOffset}
                                            onChange={(offset) => {
                                                newConfig[i].titleOffset = offset
                                                setAttributes({config: newConfig})
                                            }}
                                            min={-height}
                                            max={height}

                                        />
                                    </PanelRow>
                                    <PanelRow>
                                        <TextControl
                                            label={__('Read more label')}
                                            value={newConfig[i].readMoreLabel}
                                            onChange={(readMoreLabel) => {
                                                newConfig[i].readMoreLabel = readMoreLabel
                                                setAttributes({ config: newConfig })
                                            }}
                                        />
                                    </PanelRow>
                                    <PanelRow>
                                        <RangeControl
                                            label={__('Connector Line Height')}
                                            value={newConfig[i].connectorLineHeight}
                                            onChange={(connectorLineHeight) => {
                                                newConfig[i].connectorLineHeight = connectorLineHeight
                                                setAttributes({config: newConfig})
                                            }}
                                            min={0}
                                            max={height}

                                        />
                                    </PanelRow>
                                    <PanelRow>
                                    <Text>{__("Connector line direction")}</Text>
                                    </PanelRow>
                                    <PanelRow >                                    
                                        <ButtonGroup>                                        
                                            <Button isPrimary={newConfig[i].position == 'top'}
                                                    isSecondary={newConfig[i].position != 'top'}
                                                    onClick={e => {
                                                        newConfig[i].position = "top"
                                                        setAttributes({config: newConfig})
                                                    }}>
                                                {__("Top")}
                                            </Button>

                                            <Button isPrimary={newConfig[i].position == 'bottom'}
                                                    isSecondary={newConfig[i].position != 'bottom'}
                                                    onClick={e => {
                                                        newConfig[i].position = "bottom"
                                                        setAttributes({config: newConfig})
                                                    }}>
                                                {__("Bottom")}
                                            </Button>
                                        </ButtonGroup>
                                        <br></br>
                                    </PanelRow>

                                    <PanelColorSettings title={__('Color Settings')}
                                                        colorSettings={[
                                                            {
                                                                value: newConfig[i].circleColor,
                                                                onChange: (color) => {
                                                                    newConfig[i].circleColor = color
                                                                    setAttributes({config: newConfig})
                                                                }, label: __("Circle Color")
                                                            },
                                                            {
                                                                value: newConfig[i].labelColor,
                                                                onChange: (color) => {
                                                                    newConfig[i].labelColor = color
                                                                    setAttributes({config: newConfig})
                                                                }, label: __("Subtitle Color")
                                                            },
                                                            {
                                                                value: newConfig[i].titleColor,
                                                                onChange: (color) => {
                                                                    newConfig[i].titleColor = color
                                                                    setAttributes({config: newConfig})
                                                                }, label: __("Title Color")
                                                            },
                                                            {
                                                                value: newConfig[i].lineColor,
                                                                onChange: (color) => {
                                                                    newConfig[i].lineColor = color
                                                                    setAttributes({config: newConfig})
                                                                }, label: __("Connector Line Color")
                                                            }
                                                        ]}
                                    />


                                </PanelBody>
                            })}
                        </PanelBody>

                    </Panel>
                </InspectorControls>


                <ResizableBox
                    size={{height}}
                    style={{"margin": "auto", width: "100%"}}
                    minHeight="50"
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
                    <div style={divStyles}>
                        {this.state.react_ui_url && <iframe ref={this.iframe} style={divStyles} scrolling={"no"}
                                                            src={this.state.react_ui_url + "/embeddable/newTimeLine" }/>}
                    </div>
                </ResizableBox>


            </div>
        )
            ;

    }
}

const Edit = (props) => {
    const blockProps = useBlockProps({className: 'wp-react-component'});
    const colorsFeature = useSetting('custom-font-sizes');
    const colorsFeature2 = useSetting('editor-font-sizes');
    
    return <div {...blockProps}><BlockEdit {...props}/></div>;

}
export default Edit;


