import { jsx } from "react/jsx-runtime";
import React__default, { useState, useRef } from "react";
import { Container } from "semantic-ui-react";
import "react-compiler-runtime";
import { c as PostProvider, d as PostConsumer } from "./server-build-C_g_IF5C.js";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { P as PostContent } from "./PostContent-BfHll6z5.js";
import { p as parse } from "./parseUtils-DYrYiyKB.js";
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
const ListOfPost = ({ posts, locale, configuration }) => {
  const toProps = (conf) => {
    if (conf.sticky) {
      return {
        sticky: {
          start: conf.sticky ? conf.stickyStart : conf.offset,
          end: conf.sticky ? conf.stickyEnd : conf.offset
        }
      };
    } else {
      return {
        offset: conf.offset,
        speed: conf.speed
      };
    }
  };
  return /* @__PURE__ */ jsx(React__default.Fragment, { children: posts && posts.map((p, idx) => /* @__PURE__ */ jsx(React__default.Fragment, { children: configuration && configuration[idx] && /* @__PURE__ */ jsx(
    ParallaxLayer,
    {
      ...toProps(configuration[idx]),
      children: /* @__PURE__ */ jsx(PostContent, { as: Container, fluid: true, post: p })
    },
    "parallax_" + idx
  ) })) });
};
const Root = (props) => {
  useState(Math.random() * (99999 - 1) + 1);
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
  } = props;
  const configuration = parse(config);
  const parallax = useRef(null);
  return /* @__PURE__ */ jsx("div", { style: { width: "100%", height: height + "px" }, className: "parallax-container", children: /* @__PURE__ */ jsx(Parallax, { ref: parallax, pages: scrolls, children: /* @__PURE__ */ jsx(
    PostProvider,
    {
      type,
      taxonomy,
      categories,
      store: "parallax" + parent + "_" + unique,
      page: 1,
      perPage: 50,
      children: /* @__PURE__ */ jsx(PostConsumer, { children: /* @__PURE__ */ jsx(ListOfPost, { configuration }) })
    }
  ) }) });
};
export {
  Root as default
};
