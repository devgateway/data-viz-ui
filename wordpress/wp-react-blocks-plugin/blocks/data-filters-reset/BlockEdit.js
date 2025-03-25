import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, TextControl, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BlockEditWithAPIMetadata} from '../commons/index'


class BlockEdit extends BlockEditWithAPIMetadata {

    constructor(props) {
        super(props);
        this.iframe = React.createRef();
    }

    render() {
        const {
            isSelected,
            setAttributes,
            attributes: {
                group,
                app,
                resetLabel
            }
        } = this.props;

        
        const queryString = `data-group=${group}&data-app=${app}&data-reset-label=${resetLabel}`
        const iframeStyles = {height: '30px'}

        return ([isSelected && (<InspectorControls>
                <Panel header={__("Filter Reset Configuration")}>
                    <PanelBody initialOpen={false} title={__("Group")}>
                        <PanelRow>
                            <TextControl
                                label={__('Name')}
                                value={group}
                                onChange={(group) => setAttributes({group})}
                            />
                        </PanelRow>
                    </PanelBody>   
                    <PanelBody initialOpen={false} title={__("API & Source")}>
                        <PanelRow>
                            <SelectControl
                                value={app}
                                onChange={(app) => {                                    
                                    setAttributes({app: app})
                                }}
                                options={this.state.apps}
                            />
                        </PanelRow>
                    </PanelBody> 
                    <PanelBody initialOpen={false} title={__("Labels")}>
                        <PanelRow>
                            <TextControl
                                label={__('Reset Label')}
                                value={resetLabel}
                                onChange={(resetLabel) => setAttributes({resetLabel})}
                            />
                        </PanelRow>
                    </PanelBody>                  
                </Panel>
            </InspectorControls>),
                (<div>

                        {this.state.react_ui_url &&
                        <iframe  ref={this.iframe} scrolling={"no"}
                                style={iframeStyles}
                                src={this.state.react_ui_url + "/embeddable/datafiltersreset"}/>}
                    </div>

                )]
        );

    }
}


const Edit = (props) => {
    const blockProps = useBlockProps({className: 'wp-react-component'});
    return (<div {...blockProps}>
        <p className={"iframe container"}>
            <BlockEdit {...props}/>
        </p>

    </div>)

}

export default Edit;