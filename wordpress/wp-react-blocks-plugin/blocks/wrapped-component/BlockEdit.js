import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {
    Panel, PanelBody, PanelRow, TextControl, SelectControl, Icon, Button, ButtonGroup, ResizableBox
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BlockEditWithAPIMetadata} from '../commons/index'

class BlockEdit extends BlockEditWithAPIMetadata {

    constructor(props) {
        super(props);
        this.iframe = React.createRef();
        this.addParam = this.addParam.bind(this)
        this.updateParam = this.updateParam.bind(this)
        this.deleteParam = this.deleteParam.bind(this)
    }


    addParam() {
        const {
            setAttributes, attributes: {
                attr = []
            }
        } = this.props;
        const newAttr = [...attr, {name: 'NONE', value: ''}]
        setAttributes({attr: newAttr})
    }

    updateParam(name, value, idx) {
        const {setAttributes, attributes: {attr}} = this.props;

        const newAttr = [...attr]
        newAttr[idx][name] = value
        debugger;
        setAttributes({attr: newAttr})
    }

    deleteParam(idx) {
        const {
            isSelected, setAttributes, attributes: {
                name, attr
            }
        } = this.props;
        const newAttr = [...attr]
        newAttr.splice(idx, 1)
        debugger;
        setAttributes({attr: newAttr})
    }

    render() {
        const {
            isSelected, toggleSelection, setAttributes, attributes: {
                height, name, attr
            }
        } = this.props;
        const divStyles = {height: height + 'px', width: '100%'}
        return ([isSelected && (<InspectorControls>
            <Panel header={__("Wrapped Settings")}>
                <PanelBody>
                    <PanelRow>
                        <TextControl
                            label={__('Name')}
                            value={name}
                            onChange={(name) => setAttributes({name})}
                        />
                    </PanelRow>

                    {attr.map((p, idx) => {
                        return <PanelBody title={p.name}>
                            <PanelRow>
                                <TextControl
                                    label={__('Name')}
                                    value={p.name}
                                    onChange={(name) => this.updateParam("name", name, idx)}
                                />
                            </PanelRow>
                            <PanelRow>
                                <TextControl
                                    label={__('Value')}
                                    value={p.value}
                                    onChange={(value) => this.updateParam("value", value, idx)}
                                />
                            </PanelRow>
                            <PanelRow>
                                <ButtonGroup>
                                    <Button primary onClick={this.addParam}>Add Param</Button>
                                    {(idx == attr.length - 1) &&
                                        <Button primary onClick={e => this.deleteParam(idx)}>Remove</Button>}
                                </ButtonGroup>
                            </PanelRow>
                        </PanelBody>
                    })}

                    <PanelRow>
                        <ButtonGroup>
                            {(attr.length == 0) && <Button primary onClick={this.addParam}>Add Param</Button>}
                        </ButtonGroup>
                    </PanelRow>
                </PanelBody>
            </Panel>
        </InspectorControls>), (<ResizableBox
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
                                                    src={this.state.react_ui_url + "/embeddable/wrapped"}/>}
            </div>
        </ResizableBox>)]);

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