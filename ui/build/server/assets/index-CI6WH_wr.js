import { jsx, jsxs } from "react/jsx-runtime";
import "react-compiler-runtime";
import "react";
import { c as PostProvider, d as PostConsumer } from "./server-build-C_g_IF5C.js";
import { Container } from "semantic-ui-react";
import { P as PostIntro } from "./PostIntro-aMWZI1YM.js";
/* empty css                           */
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "use-sync-external-store/with-selector.js";
import "react-intl";
import "prop-types";
import "react-dom/client";
import "immutable";
import "papaparse";
import "@devgateway/customizer";
import "@reduxjs/toolkit";
import "@artsy/fresnel";
import "clsx";
import "semantic-ui-react/dist/commonjs/lib/index.js";
import "query-string";
const Carousel = (props) => {
  let i = 0;
  const { posts, height, interval, autoSwitch } = props;
  return (
    // @ts-ignore
    /* @__PURE__ */ jsxs(
      CarouselProvider,
      {
        interval,
        isPlaying: autoSwitch,
        totalSlides: posts.length,
        naturalSlideHeight: height,
        children: [
          /* @__PURE__ */ jsx(Slider, { style: { height: `${height}px` }, trayTag: "ul", children: posts.map((p) => /* @__PURE__ */ jsx(Slide, { index: i++, tag: "li", children: /* @__PURE__ */ jsx(PostIntro, { post: p, fluid: true }) })) }),
          /* @__PURE__ */ jsx(DotGroup, {})
        ]
      }
    )
  );
};
const PostCarousel = (props) => {
  const {
    "data-type": type,
    "data-taxonomy": taxonomy,
    "data-categories": categories,
    "data-items": items,
    "data-height": height,
    "data-auto-switch": autoSwitch = "false",
    "data-interval": interval = 1e4,
    editing,
    parent,
    unique
  } = props;
  return /* @__PURE__ */ jsx(Container, { style: { height: `${height}px` }, className: `viz post carousel ${editing ? "editing" : ""}`, fluid: true, children: /* @__PURE__ */ jsx(
    PostProvider,
    {
      type,
      taxonomy,
      categories,
      store: "carousel_" + parent + "_" + unique,
      page: 1,
      perPage: items,
      children: /* @__PURE__ */ jsx(PostConsumer, { children: /* @__PURE__ */ jsx(Carousel, { height, interval, autoSwitch: autoSwitch == "true" }) })
    }
  ) });
};
export {
  PostCarousel as default
};
