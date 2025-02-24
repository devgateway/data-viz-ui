import {InspectorControls, useBlockProps} from '@wordpress/block-editor';


import {FormToggle, Panel, PanelBody, PanelRow, RangeControl, ResizableBox} from '@wordpress/components';
import {__} from '@wordpress/i18n';

import {BlockEditWithFilters} from '../commons/index.js'
import {SizeConfig} from '../commons/index'


class BlockEdit extends BlockEditWithFilters {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            className, isSelected,
            toggleSelection,
            setAttributes,
            attributes: {
                panelStatus,
                count,
                type,
                taxonomy,
                categories,
                height,
                theme,
                useScrolls,
                showIcons,
                useLabels
            },
        } = this.props;



        const queryString = `editing=true&data-type=${type}&data-taxonomy=${taxonomy}&data-categories=${categories}&data-items=${count}&data-height=${height}&data-theme=${theme}&data-show-icons=${showIcons}&data-show-labels=${useLabels}&data-use-scrolls=${useScrolls}`
        const divStyles = {height: height + 'px', width: '100%'}
        return (
            <div>
                <InspectorControls>
                    <Panel>
                        <PanelBody title={__("Visibility","dg")}>
                            <PanelRow>
                                <p>{__("Light Theme","dg")}</p>
                                <FormToggle
                                    label={__("Show Icon","dg")}
                                    checked={theme == 'light'}
                                    onChange={() => setAttributes({theme: theme == 'light' ? 'buttons' : 'light'})}
                                />
                            </PanelRow>
                            <PanelRow>
                                <p>{__("Use Labels","dg")}</p>
                                <FormToggle
                                    checked={useLabels}
                                    onChange={() => setAttributes({useLabels: !useLabels})}
                                />
                            </PanelRow>
                            <PanelRow>
                                <p>{__("Show Icons","dg")}</p>
                                <FormToggle
                                    label={__("Show Icon","dg")}
                                    checked={showIcons}
                                    onChange={() => setAttributes({showIcons: !showIcons})}
                                />

                            </PanelRow>
                            <PanelRow>
                                <p>{__("Use Scrolls","dg")}</p>
                                <FormToggle
                                    checked={useScrolls}
                                    onChange={() => setAttributes({useScrolls: !useScrolls})}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label={__("Items", "dg")}
                                    value={count}
                                    onChange={(count) => setAttributes({count})}
                                    min={2}
                                    max={10}/>
                            </PanelRow>
                        </PanelBody>
                        <SizeConfig initialOpen={false} setAttributes={setAttributes}
                                    height={height} panelStatus={panelStatus}>

                        </SizeConfig>
                        {this.renderFilters()}
                    </Panel>
                </InspectorControls>

                <ResizableBox
                    size={{height}}
                    style={{"margin": "auto", width: "100%"}}
                    minHeight="200"
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
                    <div style={divStyles}>
                        {this.state.react_ui_url&&<iframe style={divStyles} scrolling={"no"}
                                 src={this.state.react_ui_url + "/embeddable/tabbedposts?" + queryString}/>}
                    </div>
                </ResizableBox>
            </div>
        );

    }
}


const Edit = (props) => {
    const blockProps = useBlockProps({className: 'wp-react-component'});
    return <div {...blockProps}>
        <BlockEdit {...props}/>
    </div>;
}

export default Edit;
