import {useBlockProps} from '@wordpress/block-editor';
import {ComponentWithSettings} from "../commons";
import {useDispatch, useSelect} from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import {arrowUp} from '@wordpress/icons';
import {Container, Search} from "semantic-ui-react";
import {__} from '@wordpress/i18n';

const Metadata = ({url}) => {
    const {editPost} = useDispatch('core/editor');

    if (url) {
        editPost({meta: {redirect_url: url}})
    }
    const redirect_url = useSelect(select => {
        const meta= select('core/editor').getEditedPostAttribute('meta')
        if (meta){
            return meta.redirect_url
        }
        return null;
    })
    return <h4 style={{"color": "#c66061"}}> {__("This page redirects to:","dg")} {redirect_url} </h4>
}


class BlockEdit extends ComponentWithSettings {

    constructor(props) {
        super(props);
        this.state = {results: [], search: ""}
        this.search = this.search.bind(this)
    }

    search(e, search) {
        this.setState({search: search.value})
        apiFetch({path: '/wp/v2/search?per_page=10&search=' + search.value}).then((posts) => {

            this.setState({results: posts});
        });
    }

    componentDidMount() {
        super.componentDidMount();
    }

    render() {
        const {isSelected, setAttributes, attributes: {redirect_url}} = this.props;


        const resultRenderer = ({type, subtype, url, title}) => {
            return <div><span>{subtype} -> </span><span dangerouslySetInnerHTML={{ __html: title }} ></span><br></br>
                <a onClick={(e) => false}>{url}</a></div>
        }


        return (
            <div className={"tcdi redirect"}>
                {isSelected ? <Search
                    fluid={true}
                    aligned
                    icon={false}
                    placeholder={redirect_url ? redirect_url : 'Search...'}
                    onResultSelect={(e, data) => {

                        setAttributes({"redirect_url": data.result.url})
                    }}
                    resultRenderer={resultRenderer}
                    onSearchChange={this.search}
                    results={this.state.results}

                /> : null}

                <Metadata url={redirect_url ?redirect_url : ''}></Metadata>
            </div>
        );
    }
}


const Edit = (props) => {
    const blockProps = useBlockProps();
    return <div {...blockProps}><BlockEdit {...props}/></div>;
}

export default Edit;