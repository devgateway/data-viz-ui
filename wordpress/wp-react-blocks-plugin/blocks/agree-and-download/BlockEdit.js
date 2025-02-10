import {InspectorControls, PanelColorSettings, useBlockProps} from '@wordpress/block-editor';
import {
    Button,
    CheckboxControl,
    FormToggle,
    Panel,
    PanelBody,
    PanelRow, RadioControl,
    RangeControl,
    ResizableBox,
    TextControl, ToggleControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BlockEditWithFilters} from '../commons'
import {MediaUpload} from "@wordpress/media-utils";


class BlockEdit extends BlockEditWithFilters {

    constructor(props) {
        super(props);
        this.getPosts = this.getPosts.bind(this)
    }

    getPosts() {

        const {attributes: {type, taxonomy, categories}} = this.props

        wp.apiFetch({
            path: `/wp/v2/${type}?per_page=10&${taxonomy != 'none' && categories && categories.length > 0 ? taxonomy + '=' + categories.join(',') : ''}=${categories}`,
        }).then(data => {

            const types = data
            this.setState({
                ...this.state,
                posts: data

            });
        });

    }

    componentDidMount() {
        super.componentDidMount();
        this.getPosts()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            setAttributes,
            attributes: {
                type,
                taxonomy,
                categories,
                count
            },
        } = this.props;

        super.componentDidUpdate(prevProps, prevState, snapshot)

        if (prevProps.attributes) {
            if (type != prevProps.attributes.type ||
                taxonomy != prevProps.attributes.taxonomy ||
                categories != prevProps.attributes.categories) {
                this.getPosts()
            }

        }

    }

    render() {
        const {
            className,
            isSelected,
            toggleSelection,
            setAttributes,
            attributes: {
                type,
                agree,
                cancel,
                taxonomy,
                categories,
                post_id,
                post_slug,
                download_style,
                media,
                text

            },
        } = this.props;
        const MyFormFileUpload = () => (


            <MediaUpload
                onSelect={(media) => {
                    setAttributes({media})
                }
                }
                allowedTypes={""}
                value={media ? media.id : null}
                render={({open}) => {

                    if (download_style == 'link') {
                        return (<a className={"agree-and-download link"} onClick={open}>{media ? text : __("Open Media Library")}</a>)
                    } else {
                        return (<Button className={"ui button agree-and-download"} onClick={open}>{media ? text : __("Open Media Library")}</Button>)
                    }
                }
                }
            />

        );

        return (
            <div>
                <InspectorControls>
                    <Panel header={__("Tabs Configuration")}>

                        <PanelBody title={__("Style")}>
                            <PanelRow>
                                <TextControl
                                    value={text}
                                    label={__("Download Text")}
                                    onChange={text => setAttributes({text})}
                                />

                            </PanelRow>
                            <PanelRow>
                                <TextControl
                                    value={agree}
                                    label={__("Agree Text")}
                                    onChange={agree => setAttributes({agree})}
                                />

                            </PanelRow>
                            <PanelRow>
                                <TextControl
                                    value={cancel}
                                    label={__("Cancel Text")}
                                    onChange={cancel => setAttributes({cancel})}
                                />

                            </PanelRow>
                            <PanelRow>
                                    <ToggleControl
                                    label={__("Link Style")}
                                    checked={download_style == 'link'}
                                    onChange={e => setAttributes({download_style: 'link'})}
                                    />

                            </PanelRow>
                            <PanelRow>
                                <ToggleControl
                                    label={__("Button Style")}
                                    checked={download_style == 'button'}
                                    onChange={e => setAttributes({download_style: 'button'})}
                                    />
                            </PanelRow>
                        </PanelBody>
                        {this.renderFilters()}
                        <PanelBody title={__("Agreement Post")}>


                            {this.state.posts && this.state.posts.map(o =>
                                <PanelRow>
                                    <ToggleControl
                                        label={o.title.rendered}
                                        checked={post_id == o.id}
                                        onChange={(e) => {
                                            setAttributes({post_id: o.id, post_slug: o.slug})
                                        }
                                        }
                                    /></PanelRow>)}
                        </PanelBody>

                    </Panel>
                </InspectorControls>
                <MyFormFileUpload></MyFormFileUpload>
            </div>
        );

    }
}


const Edit = (props) => {
    const blockProps = useBlockProps({className: 'wp-react-component'});
    return <div {...blockProps}><BlockEdit {...props}/></div>;

}
export default Edit;
