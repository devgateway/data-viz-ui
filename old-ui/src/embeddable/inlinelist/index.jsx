import React, {useEffect, useState} from 'react'
import {Container, Grid, Label} from 'semantic-ui-react'
import {MediaConsumer, MediaProvider, PostConsumer, PostIcon, PostProvider, utils} from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";


const ListOfPost=(props)=>{
    const {posts, showIcons, showContentToggle, contentToggleHPosition, locale} = props
    const [toggleState, setToggleState] = useState({});
    const postTopRef = React.createRef();        
     useEffect(e=>{
        window.setTimeout( () => {
                if (window.location.hash) {
                     const element = document.getElementById(window.location.hash.substr(1));
                    if (element) {
                         element.scrollIntoView({behavior: "auto", block: "start"});
                    }
                }
            },0
        )
    }, posts)

    const getBody = (post) => {
        const contentParts = post.content ? post.content.rendered.split("<!--more-->") : []
        const content = contentParts.length > 1 ? contentParts[1] : contentParts[0]        
        return content
    }
    const getContentToggle = (slug) =>  {       
        const show = toggleState[slug] || false;
        const linkText = show ? 'Read less' : 'Read more';
        return (<div>
        <div style={{ position: 'relative', left: contentToggleHPosition + '%'}}>
            <a className="link" onClick={() => {
                if (postTopRef.current && show) {
                    postTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                    postTopRef.current.scrollTop = 0; // scroll postTopRef back to top
                }
                setToggleState({...toggleState, [slug]: !show})                
            }}>
                {linkText}
            </a>

        </div>
    </div>)
    }

    return (
            <Container fluid className="inline list">
                {posts && posts.map(p => (
                    <Grid>
                        {showIcons && <Grid.Column textAlign={"center"} width={1}>
                            <anchor id={p.slug}></anchor>
                            <MediaProvider
                                id={p.meta_fields && p.meta_fields.icon ? p.meta_fields.icon[0] : null}>
                                <MediaConsumer>
                                    <PostIcon as={Label}></PostIcon>
                                </MediaConsumer>
                            </MediaProvider>
                        </Grid.Column>}
                        <Grid.Column width={showIcons ? 15 : 16}>
                            <PostIntro as={Container} fluid post={p} ref={postTopRef}/>
                           <Container>
                                {(showContentToggle && getBody(p)) &&
                                    <>
                                        {!toggleState[p.slug] &&
                                            getContentToggle(p.slug)
                                        }
                                        <Container fluid className="content" style={{ clear: 'both', display: toggleState[p.slug] ? 'block' : 'none' }} dangerouslySetInnerHTML={{ __html: utils.replaceHTMLinks(getBody(p), locale) }} />
                                        {toggleState[p.slug] &&
                                            getContentToggle(p.slug)
                                        }
                                    </>
                                }
                                {!showContentToggle &&
                                    <a href={utils.replaceLink(p.link)}
                                        className="link">Read More</a>}
                                </Container>
                        </Grid.Column>

                    </Grid>
                ))}

            </Container>
        )

}


const Root = (props) => {
    const [random, setRandomStore] = useState(Math.random() * (99999 - 1) + 1);
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
        parent,
        editing,
        component, unique

    } = props

    

    return <Container fluid={true}>
                <PostProvider type={type}
                          taxonomy={taxonomy}
                          categories={categories}
                          store={"inline_list_" + parent + "_" + unique}
                          page={1}
                          perPage={items}>
                <PostConsumer>
                    <ListOfPost showIcons={showIcons === "true"} showContentToggle = {showContentToggle === "true"} contentToggleHPosition = {contentToggleHPosition}/>
                </PostConsumer>
            </PostProvider>
    </Container>
}


export default Root
