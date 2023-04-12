import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {Generic} from '../icons/index.js'
import {Panel, PanelBody, PanelRow, ResizableBox, TextControl} from '@wordpress/components';
import {ComponentWithSettings} from "../commons";


const SaveComponent = (props) => {
    const {navLabel, topTopLabel} = props.attributes;
    return (<div className={"viz-component"} data-component={"pageModules"} data-nav-label={navLabel}
                 data-to-top-label={topTopLabel}>
        </div>
    );
}

class Edit extends ComponentWithSettings {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    render() {

        const {attributes: {width, height, navLabel, topTopLabel}, toggleSelection, setAttributes} = this.props;
        const urlParams = new URLSearchParams(window.location.search);
        const parent = urlParams.get('post');
        const queryString = `editing=true&parent=${parent}&data-nav-label=${navLabel}&data-to-top-label=${topTopLabel}`;
        const divClass = ""
        const divStyles = {height: height + 'px', width: '100%'}

        return (
            <div>

                <InspectorControls>
                    <Panel header={__("Configuration","dg")}>
                        <PanelBody title={__("Labels","dg")}>
                            <PanelRow>
                                <TextControl
                                    label={__('Navigator Label',"dg")}
                                    value={navLabel}
                                    onChange={(navLabel) => setAttributes({navLabel})}
                                />

                            </PanelRow>

                            <PanelRow>
                                <TextControl
                                    label={__('To Top Label',"dg")}
                                    value={topTopLabel}
                                    onChange={(topTopLabel) => setAttributes({topTopLabel})}
                                />

                            </PanelRow>
                        </PanelBody>
                    </Panel>
                </InspectorControls>
                <ResizableBox
                    size={{height}}
                    style={{"margin": "auto", width: "100%"}}
                    minHeight="200"
                    minWidth="500"
                    enable={{
                        top: false,
                        right: false,
                        bottom: true,
                        left: false,
                        topRight: false,
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
                    }}
                >

                    <div>
                        {this.state.react_ui_url&&<iframe
                            style={{...divStyles}} className={divClass}
                            scrolling={"no"}
                            src={this.state.react_ui_url + "/embeddable/pagemodules?" + queryString}/>}
                    </div>


                </ResizableBox>
            </div>
        );


    }
}

registerBlockType(process.env.BLOCKS_NS + '/page-modules',
    {
        title: __('Page Modules',"dg"),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            count: {
                type: 'Numeric',
                default: 3,
            },
            height: {
                type: "number",
                default: 400
            },
            width: {
                type: "number",
                default: 800
            },
            topTopLabel: {
                type: 'String',
                default: "TO THE TOP",
            },
            navLabel: {
                type: 'String',
                default: "Sections",
            }
        }
        ,
        edit: Edit,
        save: SaveComponent,
    }
)
;
