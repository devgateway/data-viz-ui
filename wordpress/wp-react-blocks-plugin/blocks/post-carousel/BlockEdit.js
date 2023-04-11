import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {
    __experimentalNumberControl as NumberControl,
    Panel,
    PanelBody,
    PanelRow,
    ResizableBox,
    ToggleControl    
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BlockEditWithFilters, SizeConfig} from "../commons";


class BlockEdit extends BlockEditWithFilters {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            toggleSelection,
            setAttributes,
            attributes: {
                count,
                type,
                taxonomy,
                categories,
                height = 650,
                autoSwitch,
                interval
            },
        } = this.props;

        const queryString = `editing=true&data-type=${type}&data-taxonomy=${taxonomy}&data-categories=${categories}&data-items=${count}&data-height=${height}&data-auto-switch=${autoSwitch}&data-interval=${interval}`
        const divStyles = {height: height+'px', width: '100%'}

        return (
            <div>
                <InspectorControls>

                    <Panel header={__("Carousel Configuration","dg")}>
                        <SizeConfig initialOpen={false} setAttributes={setAttributes} height={height} panelStatus={this.props.attributes.panelStatus}></SizeConfig>
                        <PanelBody>
                            <PanelRow>
                                <NumberControl
                                    isShiftStepEnabled={true}
                                    onChange={(count) => setAttributes({ count })}
                                    shiftStep={10}
                                    value={count}
                                    label={__("Items","dg")} />
                            </PanelRow>
                            <PanelRow>
                                <ToggleControl
                                    label={__("Automatically switch slides","dg")}
                                    checked={autoSwitch}
                                    onChange={(autoSwitch) => setAttributes({ autoSwitch: autoSwitch })} />

                            </PanelRow>
                            {autoSwitch &&
                                <PanelRow>
                                    <NumberControl
                                        value={interval}
                                        onChange={(interval) => setAttributes({ interval })}
                                        label={__("Interval","dg")} />
                                </PanelRow>
                            }
                        </PanelBody>
                        
                        {this.renderFilters()}
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
                        {this.state.react_ui_url&&<iframe style={divStyles} scrolling={"no"}
                                 src={this.state.react_ui_url + "/embeddable/postscarousel?" + queryString}/>}
                    </div>
                </ResizableBox>


            </div>
        );

    }
}

const Edit = (props) => {
    const blockProps = useBlockProps({className: 'wp-react-component'});
    return <div {...blockProps}><BlockEdit {...props}/></div>;

}
export default Edit;

