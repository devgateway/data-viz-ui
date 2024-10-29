import {PostConsumer, PostProvider} from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";
import 'pure-react-carousel/dist/react-carousel.es.css';
import React, {useState} from "react";
import {Container} from "semantic-ui-react";
import {CarouselProvider, Slide, Slider} from "pure-react-carousel";
import TimeLine from "./timeline";


const Carousel = (props) => {
    
    let i = 0
    const {posts, height, interval, autoSwitch,currentSlide} = props
    return (<CarouselProvider currentSlide={currentSlide}
        interval={interval}
        isPlaying={autoSwitch}
        totalSlides={posts.length}>
        <Slider style={{height: `${height}px`}} tag="ul">
            {posts.map(p => <Slide index={i++} tag="li">
                <PostIntro post={p} fluid/>
            </Slide>)}
        </Slider>

    </CarouselProvider>)


}
const Component = (props) => {
    const {
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-count": items,
        "data-height": height,
        "data-line-color": lineColor = "#000",
        "data-config": config = "{}",
        "data-position": position = "middle",
        "data-line-width": lineWidth = "1",
        "data-margin-left": marginLeft = 50,
        "data-margin-top": marginTop = 25,
        "data-margin-right": marginRight = 50,
        "data-margin-bottom": marginBottom = 25,
        "data-font-size": fontSize = 14,
        "data-title-width": titleWidth = 100,
        "data-subtitle-width": subtitleWidth = 50,
        editing, parent, unique
    } = props

    const [currentSlide,setCurrentSlide]=useState([0])

    const decode = (value) => {
        
        if (editing) {
            return value
        }
        return decodeURIComponent(value)
    }

    const parse = (value) => {
        return JSON.parse(decode(value))
    }

    const timeProps = {
        marginLeft,
        marginTop,
        marginRight,
        marginBottom,
        lineWidth,
        height: 150,
        position,
        lineColor: decode(lineColor),
        config: JSON.parse(decodeURIComponent(config)),
        fontSize,
        titleWidth,
        subtitleWidth
    }




    return <Container style={{height: `${height}px`}} className={`viz new-time-line ${editing ? '' : ''}`}
                      fluid={true}>


            <PostProvider type={type} taxonomy={taxonomy} categories={parse(categories)}
                          store={"carousel_" + parent + "_" + unique} page={1}
                          perPage={items}>
                <Container className={"carousel-section"}>
                    <PostConsumer>
                        <Carousel currentSlide={currentSlide}  height={height - 250} interval={5} autoSwitch={false}></Carousel>
                    </PostConsumer>
                </Container>

                <Container  className="time-line-section">
                    <PostConsumer>
                        <TimeLine currentSlide={currentSlide} onSelectSlide={(i)=>{
                            setCurrentSlide(i)
                          }}  {...timeProps}></TimeLine>
                    </PostConsumer>
                </Container>

            </PostProvider>

    </Container>
}
export default Component
