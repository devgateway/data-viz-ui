import React, {useEffect, useState} from 'react'
import {Button, Container, Grid, Label, Menu} from 'semantic-ui-react'
import {MediaConsumer, MediaProvider, PostConsumer, PostIcon, PostLabel, PostProvider} from "@devgateway/wp-react-lib";
import {injectIntl} from "react-intl";

import PostIntro from "../connected-templates/PostIntro";

const ItemMenu = ({posts, activeItem, setActive, showLabels}) => {

    return posts ? posts.map(post => <Menu.Item key={post.id} onClick={e => setActive(post.slug)}
                                                className={post.slug === activeItem ? 'active' : ''}>

        {showLabels ? <PostLabel post={post}></PostLabel> :
            <Label><span dangerouslySetInnerHTML={{__html: post.title.rendered}}/></Label>}


    </Menu.Item>) : null

}

const GriNavigator = ({posts, activeItem, setActive, showIcons, showLabels}) => {
    const count = posts.length
    return posts ? posts.map(post => {
        const iconUrl = post['_embedded'] && post['_embedded']["wp:featuredmedia"] ? post['_embedded']["wp:featuredmedia"][0].source_url : null
        return <Grid.Column key={post.id}
                            className={(post.slug == activeItem ? 'active' : null) + (showIcons ? ' has-icon' : '')}>

            <Button onClick={e => setActive(post.slug)} className={`nav  ${count == 1 ? 'one' : ''}`}>
                {showIcons &&
                    <MediaProvider id={post.meta_fields && post.meta_fields.icon ? post.meta_fields.icon[0] : null}>
                        <MediaConsumer>
                            <PostIcon className={"icon"}></PostIcon>
                        </MediaConsumer>
                    </MediaProvider>}

                {showLabels ? <PostLabel post={post}></PostLabel> :
                    <Label><span dangerouslySetInnerHTML={{__html: post.title.rendered}}/></Label>}

            </Button>
        </Grid.Column>
    }) : null
}

const TabContent = ({posts, activeItem,height}) => {
    useEffect(() => {
        // Scroll to the top of the content when activeItem changes
        const contentContainer = document.querySelector('.ui.container.content-tab'); // You may need to adjust the selector
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

            return <PostIntro  key={p.slug} as={Container} fluid post={p} style={style}/>;
        })
    ) : null;


    //return posts ? posts.filter(p => p.slug === activeItem).map(p => <PostIntro as={Container} fluid key={p.id}                                                                                post={p}/>) : null

}


const SingleTabbedView = ({posts, showLabels,height}) => {
    const [activeItem, setActive] = useState(posts ? posts[0].slug : null);

    useEffect(() => {
        window.setTimeout(() => {
            if (window.location.hash) {
                const slug = window.location.hash.substr(1);
                const element = document.getElementById(slug);

                if (element && posts.map((p) => p.slug).indexOf(slug) > -1) {
                    setActive(slug);
                    element.scrollIntoView({behavior: 'auto', block: 'start'});
                }
            }
        }, 0);
    }, [posts]);

    useEffect(() => {
        // Add a new useEffect to reset scroll position when activeItem changes
        if (activeItem) {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }, [activeItem]);

    return (
        <React.Fragment>
            {posts.map((p) => (
                <anchor id={p.slug} key={p.slug}></anchor>
            ))}

            <Menu className="tabbed posts" text>
                <ItemMenu showLabels={showLabels} posts={posts} setActive={setActive} activeItem={activeItem}/>
            </Menu>
            <Container className={'content-tab'} style={{height:`${height}px`}}>
                <TabContent posts={posts} activeItem={activeItem}/>
            </Container>
        </React.Fragment>
    );
};


const GridTabbedView = ({posts, showLabels, showIcons, height}) => {
    const [activeItem, setActive] = useState(posts ? posts[0].slug : null)

    return (
        <React.Fragment>

            <Grid stackable className="tabbed posts" columns={posts.length} style={{"height": height + "px"}}>
                <GriNavigator showIcons={showIcons} showLabels={showLabels} posts={posts} activeItem={activeItem}
                              setActive={setActive}></GriNavigator>
                <Grid.Row style={{"height": height + "px"}}>
                    <Grid.Column width={16} className={"content"}>
                        <Container className={'content-tab'} style={{height:`${height}px`}}>
                            <TabContent className={"content-tab"} posts={posts} activeItem={activeItem}></TabContent>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </React.Fragment>
    )
}


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

    } = props
    const locale = props.intl.locale

    const scrollable = useScrolls == 'true'
    const conditionalHeight = scrollable ? height : undefined;

    return <Container className={`viz tabbed posts ${editing ? 'editing' : ''} ${scrollable ? 'scrollable' : ''}`}
                      fluid={true}>

        <PostProvider
            locale={locale}
            type={type} taxonomy={taxonomy} categories={categories}
            store={"tabbedposts_" + parent + '_' + unique} page={1}
            perPage={items}>
            <PostConsumer>
                <PostConsumer>
                    {theme === 'light' ? (
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
}

export default injectIntl(Wrapper)
