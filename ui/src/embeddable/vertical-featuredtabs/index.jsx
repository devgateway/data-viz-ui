import React, {useLayoutEffect, useRef, useState} from 'react'
import {Container} from 'semantic-ui-react'
import {
    PostConsumer,
    PostProvider,
    PostContent
} from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";


const IntroWithFeaturedImage = ({ post, count, backgroundColor, active, dimensions, height, coverWidth }) => {
    const media = post['_embedded'] ? post['_embedded']["wp:featuredmedia"] : null;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={"content-area"}>
            <div
                className={"cover"}
                style={{
                    'width': `${coverWidth}px`,
                    "backgroundColor": backgroundColor,
                    "backgroundImage": 'url(' + (media ? media[0].source_url : '') + ')'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="rotator" style={{ width: height + 'px', "transform": `translate(${coverWidth / 2}px, 0px) rotate(90deg)` }}>
                    <PostIntro post={post} />
                </div>
                <div className="overlay-label-container">
                    <div className={`overlay-label ${isHovered && !active ? 'visible' : ''}`}>CLICK TO EXPAND</div>
                    <div className="arrow-svg"></div>
                </div>
            </div>
            <div className={`collapsable-content ${active ? 'expanded' : 'collapsed'}`}
                 style={{
                     "backgroundColor": "#f9f9f9",
                     width: dimensions.width - (coverWidth * count) + 'px',
                     "marginLeft": `${coverWidth}px`
                 }}
            >
                <PostContent post={post} />
            </div>
        </div>
    );
};


const FeaturedTabs = ({editing, posts, height, colors, coverWidth}) => {

    const [active, setActive] = useState(null)

    //const arrayColors = color.split(',')
    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({width: 0, height: 0});


    const toggleAnimation = (k) => {
        setActive(k)
    }
    /*
    useEffect(e => {
        if (posts && posts.length > 0) {
            setActive(posts[0].slug)
        }

        if (!editing) {
            window.setTimeout(() => {
                    if (window.location.hash) {
                        const slug = window.location.hash.substr(1)
                        const element = document.getElementById(slug);

                        if (element && posts.map(p => p.slug).indexOf(slug) > -1) {
                            setActive(slug)
                            element.scrollIntoView({behavior: "auto", block: "start"});
                        }

                    }
                }, 0
            )
        }
    }, posts)
*/
    useLayoutEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.parentElement.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, []);

    return (
        <Container fluid={true} className={`vertical featured tabs ${editing ? 'editing' : ''}`}>
            {posts && posts.map((post, i) => {
                const isActive = active ? post.slug === active : i == 0
                return <div
                    key={post.slug}
                    ref={targetRef}
                    onClick={e => toggleAnimation(post.slug)}
                    className={isActive ? "item expanded" : "item collapsed"}
                    style={{"minHeight": height + 'px', "minWidth": `${coverWidth}px`}}>
                    <anchor id={post.slug}></anchor>
                    <IntroWithFeaturedImage coverWidth={coverWidth}
                                            height={height}
                                            backgroundColor={colors['color_' + i]} count={posts.length}
                                            dimensions={dimensions} active={isActive} post={post}/>
                </div>

            })}


        </Container>
    )
}


const Root = (props) => {
    const {
        "data-height": height,
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-count": items,
        "data-colors": colors,
        "data-cover-width": coverWidth = 50,
        "data-read-more-label": moreLabel = "READ More",
        editing, parent, unique
    } = props
    const locale = props.intl.locale
    const decode = (value) => {
        if (editing) {
            return value
        }
        return decodeURIComponent(value)
    }
    const parse = (value) => {
        try {
            return JSON.parse(decode(value))
        } catch (error) {
            console.error("error parsing value:" + value)
        }

        return null
    }


    const [random, setRandom] = useState(Math.random())
    return <Container style={{"max-width": "100%"}} className={`viz featured tabs ${editing ? 'editing' : ''}`}
                      fluid={true}>
        <PostProvider type={type}
                      locale={locale}
                      taxonomy={taxonomy}
                      categories={parse(categories).join(',')}
                      store={"vertical_tabs" + parent + "_" + unique}
                      page={1}
                      perPage={items}>
            <PostConsumer>
                <FeaturedTabs editing={editing} coverWidth={coverWidth} moreLabel={moreLabel} colors={parse(colors)}
                              height={height}></FeaturedTabs>
            </PostConsumer>
        </PostProvider>
    </Container>
}


export default Root
