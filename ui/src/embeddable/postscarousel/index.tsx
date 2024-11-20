import { PostConsumer, PostIntro, PostProvider } from "@devgateway/wp-react-lib";

import 'pure-react-carousel/dist/react-carousel.es.css';
import React from "react";
import { Container } from "semantic-ui-react";
import { CarouselProvider, DotGroup, Slide, Slider } from "pure-react-carousel";

const Carousel = (props) => {
    let i = 0
    const { posts, height, interval, autoSwitch } = props
    return (
        // @ts-ignore
        <CarouselProvider
            interval={interval}
            isPlaying={autoSwitch}
            totalSlides={posts.length}
            naturalSlideHeight={height}>
            <Slider style={{ height: `${height}px` }} trayTag="ul">
                {posts.map(p => <Slide index={i++} tag="li">
                    <PostIntro post={p} fluid />
                </Slide>)}
            </Slider>
            <DotGroup />
        </CarouselProvider>
    )


}
const Carousel1 = (props) => {
    let i = 0
    const { posts, height } = props
    return (
    <div data-totalSlides={posts.length}>
        {posts.map(p => <div key={i++}>
            <PostIntro post={p} fluid />
        </div>)}


    </div>)


}


const _Carousel = (props) => {
    let i = 0
    const { posts } = props
    return <Container fluid={true} className={"carousel"}>
        {/* @ts-ignore */}
        <CarouselProvider totalSlides={posts.length}>
            <Slider>
                {posts.map(p => <Slide index={i++}>
                    <PostIntro post={p} />
                </Slide>)}
            </Slider>
            <DotGroup />
        </CarouselProvider>
    </Container>

}


interface PostCarouselProps {
    "data-type": string,
    "data-taxonomy": string,
    "data-categories": string,
    "data-items": string,
    "data-height": string,
    "data-auto-switch": string,
    "data-interval": string,
    editing: string,
    parent: string,
    unique: string
}

const PostCarousel = (props: PostCarouselProps) => {
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
    return <Container style={{ height: `${height}px` }} className={`viz post carousel ${editing ? 'editing' : ''}`} fluid={true}>

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