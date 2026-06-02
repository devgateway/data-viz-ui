import React, { useEffect, useRef, useState } from 'react'
import { Container, Grid, Label } from 'semantic-ui-react'
import { MediaConsumer, MediaProvider, PostConsumer, PostIcon, PostProvider, utils } from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";
import PostContent from '../connected-templates/PostContent';
import { injectIntl, WrappedComponentProps, useIntl } from 'react-intl';

interface ListOfPostProps {
    posts: any[],
    showIcons: boolean,
    showContentToggle: boolean,
    contentToggleHPosition: number,
    locale: string,
    readMoreLabel?: string,
    readLessLabel?: string
}

const ListOfPost: React.FC<ListOfPostProps> = (props) => {
    const { posts, showIcons, showContentToggle, contentToggleHPosition, locale, readMoreLabel, readLessLabel } = props
    const [toggleState, setToggleState] = useState<Record<string, boolean>>({});
    const postTopRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const getTranslatedLabel = (label?: string, fallback: string = 'Read More') => {
        return label && label.trim() !== '' ? label : fallback;
    };

    useEffect(() => {
        window.setTimeout(() => {
            if (window.location.hash) {
                const element = document.getElementById(window.location.hash.substr(1));
                if (element) {
                    element.scrollIntoView({ behavior: "auto", block: "start" });
                }
            }
        }, 0
        )
    }, [posts])

    const getBody = (post) => {
        const contentParts = post.content ? post.content.rendered.split("<!--more-->") : []
        const content = contentParts.length > 1 ? contentParts[1] : contentParts[0]
        return content
    }
    const getContentToggle = (slug) => {
        const show = toggleState[slug] || false;
        const linkText = show ? getTranslatedLabel(readLessLabel, 'Read less') : getTranslatedLabel(readMoreLabel, 'Read more');
        return (
            <div>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: contentToggleHPosition < 33 ? 'flex-start' : 
                                     contentToggleHPosition < 66 ? 'center' : 'flex-end' 
                }}>
                    <a className="link" onClick={() => {
                        if (show && postTopRefs.current[slug]) {
                            postTopRefs.current[slug]?.scrollIntoView({ behavior: "smooth", block: "start" });
                            postTopRefs.current[slug]!.scrollTop = 0; // scroll postTopRef back to top
                        }
                        setToggleState({ ...toggleState, [slug]: !show })
                    }}>
                        {linkText}
                    </a>

                </div>
            </div>
        )
    }

    const getIntro = (post) => {
        const contentParts = post.content
            ? post.content.rendered.split("<!--more-->")
            : [];
        const content = contentParts.length > 1 ? contentParts[0] : null;
        return content ? content.trim() : null;
    };

    const hasBody = (post) => {
        const contentParts = post.content
            ? post.content.rendered.split("<!--more-->")
            : [];
        return contentParts.length > 1 && contentParts[1].trim().length > 0;
    };

    return (
        <Container fluid className="inline list">
            {posts &&
                posts.map((p) => (
                    <Grid>
                        {showIcons && (
                            <Grid.Column textAlign={"center"} width={1}>
                                <a id={p.slug}></a>
                                <MediaProvider
                                    id={
                                        p.meta_fields && p.meta_fields.icon
                                            ? p.meta_fields.icon[0]
                                            : null
                                    }
                                >
                                    <MediaConsumer>
                                        <PostIcon as={Label}></PostIcon>
                                    </MediaConsumer>
                                </MediaProvider>
                            </Grid.Column>
                        )}
                        <Grid.Column width={showIcons ? 15 : 16}>
                            <div ref={(el) => { postTopRefs.current[p.slug] = el; }}>
                            {getIntro(p) && (
                                <PostIntro as={Container} fluid post={p} />
                            )}
                            {!getIntro(p) && (
                                <PostContent
                                    post={{ content: { rendered: getBody(p) } }}
                                    style={{ clear: "both", display: "block" }}
                                ></PostContent>
                            )}
                            {hasBody(p) && (
                                <Container>
                                    {showContentToggle && (
                                        <>
                                            {!toggleState[p.slug] && getContentToggle(p.slug)}
                                            <PostContent
                                                post={{ content: { rendered: getBody(p) } }}
                                                style={{
                                                    clear: "both",
                                                    display: toggleState[p.slug] ? "block" : "none",
                                                }}
                                            ></PostContent>
                                            {toggleState[p.slug] && getContentToggle(p.slug)}
                                        </>
                                    )}
                                    {!showContentToggle && (
                                        <a href={utils.replaceLink(p.link, locale)} className="link">
                                            {getTranslatedLabel(readMoreLabel)}
                                        </a>
                                    )}
                                </Container>
                            )}
                            </div>
                        </Grid.Column>
                    </Grid>
                ))}
        </Container>
    )

}

interface InlineListProps extends WrappedComponentProps {
    "data-width"?: string,
    "data-height"?: string,
    "data-type"?: string,
    "data-taxonomy"?: string,
    "data-categories"?: string,
    "data-items"?: string,
    "data-color"?: string,
    "data-show-post-icons"?: string,
    "data-show-content-toggle"?: string,
    "data-content-toggle-h-position"?: string,
    "data-read-more-label"?: string,
    "data-read-less-label"?: string,
    parent?: string,
    editing: boolean,
    component?: string,
    unique?: string
}


const Root = (props: InlineListProps) => {
    const [random, setRandomStore] = useState(Math.random() * (99999 - 1) + 1);
    const { locale } = useIntl();
   
    const {
        "data-width": width,
        "data-height": height,
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-items": items,
        "data-color": color,
        "data-show-post-icons": showIcons,
        "data-show-content-toggle": showContentToggle,
        "data-content-toggle-h-position": contentToggleHPosition, //horizontal position
        "data-read-more-label": readMoreLabel,
        "data-read-less-label": readLessLabel,
        parent,
        editing,
        component, unique

    } = props


    return (
        <Container fluid={true}>
            <PostProvider
                type={type}
                locale={locale}
                taxonomy={taxonomy}
                categories={categories}
                store={"inline_list_" + parent + "_" + unique}
                page={1}
                perPage={items}
            >
                <PostConsumer>
                    {/* @ts-expect-error Posts are retrieved from Wordpress */}
                    <ListOfPost
                        locale={locale ?? 'en'}
                        showIcons={showIcons === "true"}
                        showContentToggle={showContentToggle === "true"}
                        contentToggleHPosition={parseInt(contentToggleHPosition || '50', 10)}
                        readMoreLabel={readMoreLabel}
                        readLessLabel={readLessLabel}
                    />
                </PostConsumer>
            </PostProvider>
        </Container>
    )
}


export default injectIntl(React.memo(Root))
