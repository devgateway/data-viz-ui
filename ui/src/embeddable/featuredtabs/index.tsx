import React, {useEffect, useState} from 'react'
import {Container, Grid, Icon, Label, Segment} from 'semantic-ui-react'
import {
    MediaConsumer,
    MediaProvider,
    PostConsumer,
    PostIcon,
    PostProvider,
    PostTitle,
    PostContent
} from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";

const FeaturedPost = ({post, onClick, active, moreLabel}) => {
    const media = post['_embedded'] ? post['_embedded']["wp:featuredmedia"] : null

    return (<div className="cover" style={{"backgroundImage": 'url(' + (media ? media[0].source_url : '') + ')'}}>
        <PostIntro post={post}/> {!active ?
        <Label onClick={onClick}><Icon name='search' size="large"/> {moreLabel}</Label> :
        <Label onClick={onClick}><Icon name='arrow alternate circle left outline' size="large"/> Back </Label>}
    </div>)
}

interface FeaturedTabsProps {
    posts?: any[],
    width: number,
    height: number,
    color: string,
    moreLabel: string
}

const FeaturedTabs: React.FC<FeaturedTabsProps> = ({posts, height, color, moreLabel}) => {
    const [active, setActive] = useState<string | null>(null)
    const [visible, setVisible] = useState(false)
    const [scrollPos, setScrollPos] = useState<[number, number]>([0, 0])
    const arrayColors = color.split(',')


    const toggleAnimation = (k: string) => {
        if (!visible) {
            setActive(k)
            setVisible(true)
        } else {
            setVisible(false)
            setActive(k)
        }
    }

    useEffect(() => {
        if (active) {
            setScrollPos([window.scrollX, window.scrollY])
        }
        if (active == null) {
            window.scrollTo(scrollPos[0], scrollPos[1])

        }
    }, [active])


    useEffect(() => {
        window.setTimeout(() => {
                if (window.location.hash) {
                    const slug = window.location.hash.substr(1)
                    const element = document.getElementById(slug);

                    if (element && posts && posts.map(p => p.slug).indexOf(slug) > -1) {
                        setActive(slug)
                        element.scrollIntoView({behavior: "auto", block: "start"});
                    }

                }
            }, 0
        )
    }, posts)

    return (
        <Container fluid={true} className="featured tabs" style={{ "min-height": height + 'px' }}>
            {/* @ts-ignore */}
            <Grid stackable columns={active != null ? 1 : posts.length} className="desktop">
                {posts && posts.map((post, i) => {
                    return <React.Fragment>
                        <Grid.Column
                            style={active == null ? { display: 'block', visibility: 'visible', "backgroundColor": arrayColors[i] } : { display: 'none', visibility: 'hidden' }}>

                            <a id={post.slug} />
                            <FeaturedPost post={post} moreLabel={moreLabel}
                                        active={active}
                                          onClick={e => toggleAnimation(post.slug)} />
                        </Grid.Column>

                        <Grid.Column className="expanded"
                                     style={active != post.slug ? { display: 'none', visibility: 'hidden' } : { display: 'block', visibility: 'visible'}}>
                            <Segment style={{ "backgroundColor": arrayColors[i] }}>
                                {post.meta_fields && post.meta_fields.icon &&
                                    <MediaProvider id={post.meta_fields ? post.meta_fields.icon[0] : null}>
                                        <MediaConsumer>
                                            <PostIcon></PostIcon>
                                        </MediaConsumer>
                                    </MediaProvider>
                                }
                                <PostTitle as={"h2"} post={post} className={"has-standard-36-font-size has-white-color"} />
                                <Label className={"closeIcon"} onClick={e => setActive(null)}><Icon name='times circle outline' size="large"/></Label>

                            </Segment>
                            <PostContent as={"div"} fluid={true} post={post} />
                            <Label className={"closeIconText"} onClick={e => setActive(null)}><Icon name='times circle outline' size="large" /> Close </Label>
                        </Grid.Column>
                    </React.Fragment>
                })}

            </Grid>


        </Container>
    )
}

export interface FeatureTabsProps {
    "data-width": number,
    "data-height": number,
    "data-type": string,
    "data-taxonomy": string,
    "data-categories": string,
    "data-items": number,
    "data-color": string,
    "data-read-more-label": string,
    editing: boolean,
    parent: number,
    unique: number
}


const Root = (props: FeatureTabsProps) => {
    const [random, setRandomStore] = useState(Math.random() * (99999 - 1) + 1);
    const {
        "data-width": width,
        "data-height": height,
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-items": items,
        "data-color": color,
        "data-read-more-label": moreLabel = "READ More",
        editing, parent, unique
    } = props
    return <Container className={`viz featured tabs ${editing ? 'editing' : ''}`} fluid={true}>

        <PostProvider type={type} taxonomy={taxonomy} categories={categories}
                      store={"tabbedposts_" + parent + "_" + unique} page={1}
                      perPage={items}>
            <PostConsumer>
                <FeaturedTabs moreLabel={moreLabel} color={color} width={width} height={height}></FeaturedTabs>
            </PostConsumer>
        </PostProvider>
    </Container>
}


export default Root
