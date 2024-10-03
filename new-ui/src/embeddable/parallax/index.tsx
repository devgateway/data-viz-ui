import React, {useEffect, useRef, useState} from 'react'
import {Container, Grid, Label} from 'semantic-ui-react'
import {MediaConsumer, MediaProvider, PostConsumer, PostIcon, PostProvider, utils} from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";
import {Parallax, ParallaxLayer} from '@react-spring/parallax'
import PostContent from "../connected-templates/PostContent";
import {parse} from "../utils/parseUtils";

interface ListOfPostProps {
    posts?: any[],
    locale?: string,
    configuration: any[]
}

const ListOfPost = ({posts, locale, configuration}: ListOfPostProps) => {


    const toProps = (conf) => {
        if (conf.sticky) {
            return {
               sticky: {
                    start: conf.sticky ? conf.stickyStart : conf.offset,
                    end: conf.sticky ? conf.stickyEnd : conf.offset
                }

            }
        } else {
            return {
                offset: conf.offset,
                speed: conf.speed
            }
        }
    }


    return (<React.Fragment>

        {posts && posts.map((p, idx) => (<React.Fragment>
            {configuration && configuration[idx] &&

                <ParallaxLayer
                    key={"parallax_" + idx}
                    {...toProps(configuration[idx])} >
                    <PostContent as={Container} fluid post={p}/>
                </ParallaxLayer>

            }
        </React.Fragment>))}

    </React.Fragment>)

}


const Root = (props) => {

    
    const [random, setRandomStore] = useState(Math.random() * (99999 - 1) + 1);
    const {
        "data-width": width,
        "data-height": height,
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-count": count,
        "data-horizontal": horizontal = false,
        "data-scrolls": scrolls,
        "data-configuration": config,
        parent,
        editing,
        component,
        unique
    } = props


    const configuration = parse(config)

    
    const parallax = useRef(null)

    return (<div style={{width: '100%', height: height + "px"}} className={"parallax-container"}>

        <Parallax  ref={parallax} pages={scrolls}>
            <PostProvider type={type}
                          taxonomy={taxonomy}
                          categories={categories}
                          store={"parallax" + parent + "_" + unique}
                          page={1}
                          perPage={50}>
                <PostConsumer>
                    <ListOfPost configuration={configuration}/>
                </PostConsumer>
            </PostProvider>
        </Parallax>
    </div>)

}


export default Root
