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
    TextControl,
    ToggleControl
} from '@wordpress/components'

import {__} from '@wordpress/i18n';
import {BlockEditWithFilters, SizeConfig} from "../commons";
import apiFetch from '@wordpress/api-fetch';
import {useEffect} from "react";

const COLORS = ["#6acbd5", "#fcb535", "#f79132", "#e54957", "#0e5583", "#2fb2e4", "#fcb535"]
const FontSelector = (props) => {

    const {
        setAttributes, attributes: {
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
        this.iframe = React.createRef();
    }


    componentDidMount() {
        super.componentDidMount();
        this.onLoadPosts()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        super.componentDidUpdate(prevProps, prevState, snapshot)
        const {attributes: {taxonomy, categories}} = this.props;
        const {attributes: {taxonomy: prevTaxonomy, categories: prevCategories}} = prevProps;

        if (taxonomy !== prevTaxonomy || categories !== prevCategories) {
            this.onLoadPosts()
        }
    }

    onLoadPosts() {
        const {
            setAttributes, attributes: {
                configuration, type, taxonomy, categories, height = 450
            },
        } = this.props;


        // path: '/wp/v2/' + taxonomy + '?per_page=100',
        let url = "/wp/v2/" + (type ? type : 'posts')

        url += (categories ? (taxonomy ? '?' + taxonomy : '&categories') + "=" + (categories ? categories : "") : '') //ids
        apiFetch({path: url}).then((data) => {
            
            const newConfig = [...configuration]
            data.forEach((post, i) => {
                if (!newConfig[i]) {
                    newConfig.push({})
                    newConfig[i].offset = i
                    newConfig[i].speed = 0
                    newConfig[i].sticky = false
                    newConfig[i].stickyStart = i
                    newConfig[i].stickyEnd = i
                    setAttributes({configuration: newConfig})
                }
                newConfig[i].title = post.title.rendered
            })
            setAttributes({configuration: newConfig})
        })
    }

    onCategoryChanged(checked, value) {
        super.onCategoryChanged(checked, value)


    }

    render() {
        const {
            toggleSelection, setAttributes, attributes: {
                horizontal, panelStatus, scrolls, configuration, count, height = 768
            },
        } = this.props;

        const queryString = `random=` + Math.random() * (99999 - 1) + 1
        const divStyles = {height: height + 'px', width: '100%'}
        const {posts = []} = this.state
        const newConfig = [...configuration]


        return (<div>
            <InspectorControls>
                <Panel header={__("Settings")}>
                    <SizeConfig initialOpen={false} setAttributes={setAttributes} height={height}
                                panelStatus={panelStatus}></SizeConfig>

                    {this.renderFilters()}

                    <PanelBody title={__("Settings")}>
                        <PanelRow>
                            <RangeControl
                                isShiftStepEnabled={true}
                                onChange={(scrolls) => {
                                    setAttributes({scrolls: parseInt(scrolls)})

                                }}
                                shiftStep={1}
                                min={1}
                                max={20}
                                value={scrolls}
                                label={__("Number of Scrolls")}
                                style={{width: "150px"}}
                            />
                        </PanelRow>

                        <PanelRow>
                            <ToggleControl label={__("Horizontal")}
                                           checked={horizontal}
                                           onChange={(horizontal) => {
                                               setAttributes({horizontal})
                                           }}/>
                        </PanelRow>
                    </PanelBody>
                    {newConfig && newConfig.map((config, i) => {
                        return <PanelBody title={config.title}>
                            <PanelRow>
                                <RangeControl
                                    label={__('Offset')}
                                    value={config.offset}
                                    onChange={(offset) => {
                                        newConfig[i].offset = offset
                                        setAttributes({config: newConfig})
                                    }}
                                    step={.1}
                                    min={0}
                                    max={scrolls}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label={__('Speed')}
                                    value={config.speed}
                                    onChange={(speed) => {
                                        newConfig[i].speed = speed

                                        setAttributes({config: newConfig})

                                    }}
                                    step={.1}
                                    min={-10}
                                    max={10}
                                />
                            </PanelRow>

                            <PanelRow>
                                <ToggleControl label={__("Sticky")}
                                               checked={newConfig[i].sticky}
                                               onChange={(sticky) => {
                                                   newConfig[i].sticky = sticky

                                                   setAttributes({configuration: newConfig})
                                               }}/>
                            </PanelRow>
                            {newConfig[i].sticky && <PanelBody title={"Sticky Settings"}>
                                <PanelRow>
                                    <RangeControl
                                        label={__('Start')}
                                        value={newConfig[i].stickyStart}
                                        onChange={(stickyStart) => {
                                            newConfig[i].stickyStart = stickyStart
                                            setAttributes({config: newConfig})
                                        }}
                                        step={1}
                                        min={0}
                                        max={scrolls}
                                    />
                                </PanelRow>
                                <PanelRow>
                                    <RangeControl
                                        label={__('End')}
                                        value={newConfig[i].stickyEnd}
                                        onChange={(stickyEnd) => {
                                            newConfig[i].stickyEnd = stickyEnd

                                            setAttributes({config: newConfig})
                                        }}
                                        step={1}
                                        min={0}
                                        max={scrolls}
                                    />

                                </PanelRow>
                            </PanelBody>}
                        </PanelBody>
                    })}


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
                    setAttributes({height: parseInt(height + delta.height, 10),});
                    toggleSelection(true);
                }}
                onResizeStart={() => {
                    toggleSelection(false);
                }}>
                <div style={divStyles}>
                    {this.state.react_ui_url && <iframe ref={this.iframe} style={divStyles} scrolling={"no"}
                                                        src={this.state.react_ui_url + "/embeddable/parallaxContainer?" + queryString}/>}
                </div>
            </ResizableBox>
        </div>);

    }
}

const Edit = (props) => {
    const blockProps = useBlockProps({className: 'wp-react-component'});
    const colorsFeature = useSetting('custom-font-sizes');
    const colorsFeature2 = useSetting('editor-font-sizes');

    return <div {...blockProps}><BlockEdit {...props}/></div>;

}
export default Edit;


