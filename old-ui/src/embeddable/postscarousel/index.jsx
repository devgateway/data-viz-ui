import {PostConsumer, PostContent, PostIntro, PostProvider} from "@devgateway/wp-react-lib";

import 'pure-react-carousel/dist/react-carousel.es.css';
import React, {useState} from "react";
import {Container} from "semantic-ui-react";
import {CarouselProvider, DotGroup, Slide, Slider} from "pure-react-carousel";

const Carousel = (props) => {
    let i = 0
    const {posts,height, interval, autoSwitch} = props
    return (<CarouselProvider
        interval={interval}
        isPlaying= {autoSwitch}
        totalSlides={posts.length}>
        <Slider  style={{height:`${height}px`}} tag="ul">
            {posts.map(p => <Slide index={i++} tag="li">
                    <PostIntro post={p} fluid/>
            </Slide>)}
        </Slider>
        <DotGroup/>
    </CarouselProvider>)


}
const Carousel1 = (props) => {
    let i = 0
    const {posts,height} = props
    return (<div
        totalSlides={posts.length}>
            {posts.map(p => <div index={i++}>
                <PostIntro post={p} fluid/>
            </div>)}


    </div>)


}


const _Carousel = (props) => {
    let i = 0
    const {posts} = this.props
    return <Container fluid={true} className={"carousel"}>
        <CarouselProvider totalSlides={posts.length}>
            <Slider>
                {posts.map(p => <Slide index={i++}>
                    <PostIntro post={p}/>
                </Slide>)}
            </Slider>
            <DotGroup/>
        </CarouselProvider>
    </Container>

}
const PostCarousel = (props) => {
    const {
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-items": items,
        "data-height": height,
        "data-auto-switch": autoSwitch = "false",
        "data-interval": interval = 10000,
        editing, parent, unique
    } = props
    return <Container style={{height:`${height}px`}} className={`viz post carousel ${editing ? 'editing' : ''}`} fluid={true}>

        <PostProvider type={type} taxonomy={taxonomy} categories={categories}
                      store={"carousel_" + parent + "_" + unique} page={1}
                      perPage={items}>
            <PostConsumer>
                <Carousel height={height} interval={interval} autoSwitch={autoSwitch == "true"}></Carousel>
            </PostConsumer>
        </PostProvider>
    </Container>
}
export default PostCarousel