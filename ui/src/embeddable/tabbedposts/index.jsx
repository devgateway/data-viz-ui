import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Label, Menu, Accordion, Icon } from 'semantic-ui-react';
import { MediaConsumer, MediaProvider, PostConsumer, PostIcon, PostLabel, PostProvider } from "@devgateway/wp-react-lib";
import { injectIntl } from "react-intl";
import PostIntro from "../connected-templates/PostIntro";

const ItemMenu = ({ posts, activeItem, setActive, showLabels }) => {
    return posts ? posts.map(post => (
        <Menu.Item key={post.id} onClick={() => setActive(post.slug)} className={post.slug === activeItem ? 'active' : ''}>
            {showLabels ? <PostLabel post={post} /> : <Label><span dangerouslySetInnerHTML={{ __html: post.title.rendered }} /></Label>}
        </Menu.Item>
    )) : null;
};

const GriNavigator = ({ posts, activeItem, setActive, showIcons, showLabels }) => {
    const count = posts.length;
    return posts ? posts.map(post => {
        const iconUrl = post['_embedded'] && post['_embedded']["wp:featuredmedia"] ? post['_embedded']["wp:featuredmedia"][0].source_url : null;
        return (
            <Grid.Column key={post.id} className={(post.slug === activeItem ? 'active' : '') + (showIcons ? ' has-icon' : '')}>
                <Button onClick={() => setActive(post.slug)} className={`nav  ${count === 1 ? 'one' : ''}`}>
                    {showIcons && (
                        <MediaProvider id={post.meta_fields && post.meta_fields.icon ? post.meta_fields.icon[0] : null}>
                            <MediaConsumer>
                                <PostIcon className={"icon"} />
                            </MediaConsumer>
                        </MediaProvider>
                    )}
                    {showLabels ? <PostLabel post={post} /> : <Label><span dangerouslySetInnerHTML={{ __html: post.title.rendered }} /></Label>}
                </Button>
            </Grid.Column>
        );
    }) : null;
};

const TabContent = ({ posts, activeItem }) => {
    useEffect(() => {
        const contentContainer = document.querySelector('.ui.container.content-tab');
        if (contentContainer) {
            contentContainer.scrollTop = 0;
        }
    }, [activeItem]);

    return posts ? (
        posts.map((p) => {
            let style = {};
            if (p.slug !== activeItem) {
                style = {
                    position: 'absolute',
                    left: '-3000px',
                    width: 'auto',
                    height: '0px',
                    overflow: 'hidden',
                    visibility: 'hidden',
                };
            } else {
                style = {
                    visibility: 'visible',
                    position: 'relative',
                    width: 'auto',
                };
            }
            return <PostIntro key={p.slug} as={Container} fluid post={p} style={style} />;
        })
    ) : null;
};

const AccordionContent = ({ posts, activeItem, setActive }) => {
    const [activeIndex, setActiveIndex] = useState(posts.findIndex(p => p.slug === activeItem));
    const [scrollTarget, setScrollTarget] = useState(null);

    useEffect(() => {
        if (scrollTarget) {
            const offsetTop = scrollTarget.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    }, [scrollTarget]);

    const handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
        setActive(posts[index].slug);

        // Set the scroll target after updating the activeIndex
        if (newIndex !== -1) {
            setScrollTarget(e.currentTarget);
        }
    };

    return (
        <Accordion fluid styled>
            {posts.map((post, index) => {
                const iconUrl = post.meta_fields && post.meta_fields.icon ? post.meta_fields.icon[0] : null;

                return (
                    <React.Fragment key={post.id}>
                        <Accordion.Title
                            active={activeIndex === index}
                            index={index}
                            onClick={handleClick}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {iconUrl && (
                                        <MediaProvider id={iconUrl}>
                                            <MediaConsumer>
                                                <PostIcon className="icon" />
                                            </MediaConsumer>
                                        </MediaProvider>
                                    )}
                                    <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} style={{ marginLeft: iconUrl ? '10px' : '0' }} />
                                </div>
                                <Icon name="chevron down" />
                            </div>
                        </Accordion.Title>
                        <Accordion.Content className={"accordion-post-content"} active={activeIndex === index}>
                            <PostIntro post={post} as={Container} fluid />
                        </Accordion.Content>
                    </React.Fragment>
                );
            })}
        </Accordion>
    );
};




const SingleTabbedView = ({ posts, showLabels, height }) => {
    const [activeItem, setActive] = useState(posts ? posts[0].slug : null);

    useEffect(() => {
        window.setTimeout(() => {
            if (window.location.hash) {
                const slug = window.location.hash.substr(1);
                const element = document.getElementById(slug);

                if (element && posts.map((p) => p.slug).indexOf(slug) > -1) {
                    setActive(slug);
                    element.scrollIntoView({ behavior: 'auto', block: 'start' });
                }
            }
        }, 0);
    }, [posts]);

    useEffect(() => {
        if (activeItem) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [activeItem]);

    return (
        <React.Fragment>
            {posts.map((p) => (
                <anchor id={p.slug} key={p.slug}></anchor>
            ))}

            <Menu className="tabbed posts" text>
                <ItemMenu showLabels={showLabels} posts={posts} setActive={setActive} activeItem={activeItem} />
            </Menu>
            <Container className={'content-tab'} style={{ height: `${height}px` }}>
                <TabContent posts={posts} activeItem={activeItem} />
            </Container>
        </React.Fragment>
    );
};

const GridTabbedView = ({ posts, showLabels, showIcons, height }) => {
    const [activeItem, setActive] = useState(posts ? posts[0].slug : null);

    return (
        <React.Fragment>
            <Grid stackable className="tabbed posts" columns={posts.length} style={{ height: height + "px" }}>
                <GriNavigator showIcons={showIcons} showLabels={showLabels} posts={posts} activeItem={activeItem} setActive={setActive} />
                <Grid.Row style={{ height: height + "px" }}>
                    <Grid.Column width={16} className={"content"}>
                        <Container className={'content-tab'} style={{ height: `${height}px` }}>
                            <TabContent className={"content-tab"} posts={posts} activeItem={activeItem} />
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </React.Fragment>
    );
};

const Wrapper = (props) => {
    const {
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-items": items,
        "data-theme": theme = 'light',
        "data-show-icons": showIcons,
        "data-use-scrolls": useScrolls,
        "data-show-labels": showLabels,
        "data-height": height,
        parent, editing, unique
    } = props;
    const locale = props.intl.locale;

    const scrollable = useScrolls === 'true';
    const conditionalHeight = scrollable ? height : undefined;

    // Determine screen width and conditionally render components
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1250);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1250);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Container className={`viz tabbed posts ${editing ? 'editing' : ''} ${scrollable ? 'scrollable' : ''}`} fluid={true}>
            <PostProvider
                locale={locale}
                type={type}
                taxonomy={taxonomy}
                categories={categories}
                store={"tabbedposts_" + parent + '_' + unique} page={1}
                perPage={items}>
                <PostConsumer>
                    <PostConsumer>
                        {isMobile ? (
                            <AccordionContent posts={items} activeItem={items[0]?.slug} setActive={() => { }} />
                        ) : theme === 'light' ? (
                            <SingleTabbedView height={conditionalHeight} showLabels={showLabels === 'true'} />
                        ) : (
                            <GridTabbedView
                                height={conditionalHeight}
                                showLabels={showLabels === 'true'}
                                showIcons={showIcons === 'true'}
                            />
                        )}
                    </PostConsumer>
                </PostConsumer>
            </PostProvider>
        </Container>
    );
};

export default injectIntl(Wrapper);
