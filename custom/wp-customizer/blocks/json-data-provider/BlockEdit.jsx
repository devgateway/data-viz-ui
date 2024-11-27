import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    PanelRow,
    TextControl,
    SelectControl,
    Icon,
    __experimentalNumberControl as NumberControl,
    ButtonGroup,
    ResizableBox, ToggleControl
} from '@wordpress/components';

import {__} from '@wordpress/i18n';

import {BlockEditWithAPIMetadata} from '../../../../front/wordpress/wp-react-blocks-plugin/blocks/commons/'
import {useDispatch, useSelect} from '@wordpress/data';
import {store as noticesStore} from '@wordpress/notices';

const toOptions = (files) => {
    return [{label: 'None', value: 'none'}, ...files.map(file => {
        return {label: file.title.rendered, value: file.source_url}
    })]
}
const getJsonFiles = () => {
    return wp.apiFetch({path: '/wp/v2/media?per_page=100&mime_type=application/json'});
}


class BlockEdit extends BlockEditWithAPIMetadata {


    constructor(props) {
        super(props);
        this.iframe = React.createRef();

    }

    componentDidMount() {
        super.componentDidMount();

        getJsonFiles().then((files) => {
            this.setState({files: toOptions(files)});
        })
    }

    render() {
        const {
            isSelected,
            toggleSelection,
            setAttributes,
            onCreateInfoNotice,
            attributes: {file, sessionTimeOut, useAutoRestore, header, message, group}
        } = this.props;
        const {files} = this.state;
        const divStyles = {}
        const iframeStyles = {height: `400px`, width: '100%'}
        return ([isSelected && (<InspectorControls>
            <Panel header={__("Settings")}>
                <PanelBody>
                    <PanelRow>
                        <SelectControl
                            type={"String"}
                            label="File"
                            onChange={file => {
                                onCreateInfoNotice(__('Json provider updated!'), {
                                    isDismissible: true,
                                })
                                setAttributes({file})
                            }}
                            value={file}
                            options={files}>
                        </SelectControl>
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={__('Name')}
                            value={group}
                            onChange={(group) => setAttributes({group})}
                        />

                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={__('Header Text')}
                            value={header}
                            onChange={(header) => setAttributes({header})}
                        />

                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={__('Message')}
                            value={message}
                            onChange={(message) => setAttributes({message})}
                        />

                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__('Auto Restore Model')}
                            checked={useAutoRestore}
                            onChange={() => setAttributes({useAutoRestore:!useAutoRestore})}
                        />

                    </PanelRow>
                    <PanelRow>
                        <NumberControl
                            isShiftStepEnabled={true}
                            min={1}
                            max={4}
                            shiftStep={2}
                            label={__('Session Duration')}
                            value={sessionTimeOut}
                            onChange={(sessionTimeOut) => setAttributes({sessionTimeOut})}
                        />

                    </PanelRow>
                </PanelBody>
            </Panel>
        </InspectorControls>), (
            <div style={divStyles}>
                {isSelected&&<div>

                    {this.state.react_ui_url && <iframe ref={this.iframe}
                                                        style={iframeStyles}
                                                        scrolling={"no"}
                                                        src={this.state.react_ui_url + "/embeddable/jsonDataProvider"}/>}
                </div>}
            </div>
        )]);

    }
}


const Edit = (props) => {
    const blockProps = useBlockProps({className: 'wp-react-component'});

    const {createInfoNotice} = useDispatch(noticesStore); //TODO: use custom store

    const theProps = {
        ...props,
        onCreateInfoNotice: createInfoNotice
    }

    return (<div {...blockProps}>
        <p className={"iframe container"}>
            <BlockEdit {...theProps} />
        </p>

    </div>)

}

export default Edit;