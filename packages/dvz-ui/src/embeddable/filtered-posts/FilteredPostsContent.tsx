import React, { Suspense } from 'react'
import { EmbeddedGateway, utils, dvizTranslate } from '@devgateway/wp-react-lib'
import { Container } from "semantic-ui-react";
import { useIntl } from 'react-intl';

const injectLocaleIntoLinks = (html: string, locale: string): string => {
    if (!html || !locale) return html;
    return html.replace(/href\s*=\s*(['"])(https?:\/\/[^'"]+)\1/ig, (match, quote, href) => {
        try {
            const url = new URL(href);
            const wpIndex = url.pathname.indexOf('/wp/');
            if (wpIndex === -1) return match;
            const afterWp = url.pathname.slice(wpIndex + 3); // strip '/wp'
            url.pathname = afterWp.startsWith('/' + locale)
                ? afterWp
                : '/' + locale + afterWp;
            return `href=${quote}${url.toString()}${quote}`;
        } catch {
            return match;
        }
    });
};

const Enhance = (props: any) => {
    const Component = props.as ? props.as : Container;
    const filteredProps = ['post', 'pageNumber', 'visibility', 'intl', "as"]
    const newProps = {}
    Object.keys(props).filter(p => p).forEach(e => {
        if (filteredProps.indexOf(e) == -1) {
            newProps[e] = props[e]
        }
    })
    return <Component {...newProps}>{props.children}</Component>
}

const Content = (props: any) => {
    const intl = useIntl();
    const [showContentEnabled, setShowContentEnabled] = React.useState(false);



    React.useEffect(() => {
        if (props.onLoad) {
            props.onLoad();
        }
    }, []);

    const {
        post, pageNumber, showTitle, showContent, showIntro, showDate, showLoading, as, locale: localeProp, messages, preview
    } = props;
    const locale = localeProp || intl.locale;

    if (post) {
        const contentParts = post.content ? post.content.rendered.split("<!--more-->") : []
        const intro = contentParts.length > 1 ? contentParts[0] : null
        const content = contentParts.length > 1 ? contentParts[1] : contentParts[0]
        const pages = content ? content.split("<!--nextpage-->") : '';

        let body = ''
        if (pageNumber != null && pages.length > 0) {
            body = pages[pageNumber]
        } else {
            body = content
        }

        return <EmbeddedGateway parentUnique={props.parentUnique} messages={messages}
                                parent={preview ? post.parent : post.id}>
            <Enhance className="entry-content" {...props}>
                <div></div>
                {showDate && <Container fluid className="date">{post.date.toLocaleString()}</Container>}
                {showTitle && <span id={post.slug} className="title"
                                    dangerouslySetInnerHTML={{__html: post.title.rendered}} key="title"/>}
                {showIntro && <Container fluid className="excerpt"
                                         dangerouslySetInnerHTML={{__html: utils.removePatternBrackets(injectLocaleIntoLinks(dvizTranslate(intro, locale), locale))}} key="intro"/>}
                {showContent && <Container fluid className="content "
                                           dangerouslySetInnerHTML={{__html: utils.removePatternBrackets(injectLocaleIntoLinks(dvizTranslate(body, locale), locale))}} key="content"/>}

            </Enhance>
            
        </EmbeddedGateway>
    } else {
        return showLoading ? 'Loading' : false;
    }
}


export const FilteredPostContent = (props: any) => {
    return <Suspense>
        <Content {...props} showContent={true}></Content>
    </Suspense>
}

export default FilteredPostContent;
