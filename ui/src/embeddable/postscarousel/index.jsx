import {
  PostConsumer,
  PostIntro,
  PostProvider,
} from "@devgateway/wp-react-lib";

import "pure-react-carousel/dist/react-carousel.es.css";
import React, { useState, useEffect, useRef } from "react";
import { Container } from "semantic-ui-react";
import { CarouselProvider, DotGroup, Slide, Slider } from "pure-react-carousel";

const Carousel = (props) => {
  const { posts, interval, autoSwitch } = props;
  const [slideHeight, setSlideHeight] = useState(0); // Store the calculated height
  const contentRef = useRef(null); // Ref for the rendered content

  useEffect(() => {
    if (contentRef.current) {
      // Calculate the height of the referenced content
      setSlideHeight(contentRef.current.offsetHeight);
    }
  }, [posts]); // Recalculate when posts change

  return (
    <CarouselProvider
      interval={interval}
      isPlaying={autoSwitch}
      totalSlides={posts.length}
      naturalSlideWidth={100} // Fixed width ratio
      naturalSlideHeight={slideHeight || 125} // Dynamically calculated height or fallback
    >
      <Slider
        style={{
          height: `${slideHeight}px`,
          transition: "height 0.3s ease", // Smooth height adjustment
        }}
        tag="ul"
      >
        {posts.map((p, i) => (
          <Slide
            key={i}
            index={i}
            tag="li"
            style={{ height: `${slideHeight}px` }}
          >
            {/* Render the content and reference the first post */}
            <div
              ref={i === 0 ? contentRef : null} // Attach ref to the first slide
            >
              <PostIntro post={p} fluid />
            </div>
          </Slide>
        ))}
      </Slider>
      <DotGroup />
    </CarouselProvider>
  );
};

const PostCarousel = (props) => {
  const {
    "data-type": type,
    "data-taxonomy": taxonomy,
    "data-categories": categories,
    "data-items": items,
    "data-auto-switch": autoSwitch = "false",
    "data-interval": interval = 10000,
    editing,
    parent,
    unique,
  } = props;

  return (
    <Container
      className={`viz post carousel ${editing ? "editing" : ""}`}
      fluid
    >
      <PostProvider
        type={type}
        taxonomy={taxonomy}
        categories={categories}
        store={"carousel_" + parent + "_" + unique}
        page={1}
        perPage={items}
      >
        <PostConsumer>
          <Carousel
            interval={interval}
            autoSwitch={autoSwitch === "true"}
            posts={props.posts} // Pass the posts array
          />
        </PostConsumer>
      </PostProvider>
    </Container>
  );
};

export default PostCarousel;
