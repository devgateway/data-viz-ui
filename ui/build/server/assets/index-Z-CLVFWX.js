import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { useState, useEffect } from "react";
import { Container, Grid, Label } from "semantic-ui-react";
import "react-compiler-runtime";
import { c as PostProvider, d as PostConsumer, M as MediaProvider, k as MediaConsumer, u as utils } from "./server-build-C_g_IF5C.js";
import { P as PostIcon } from "./PostIcon-CMH9qQYi.js";
import { P as PostIntro } from "./PostIntro-5si_cZk4.js";
import { useParams } from "react-router";
import { P as PostContent } from "./PostContent-BfHll6z5.js";
import "node:stream";
import "@react-router/node";
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
import "./PostIntro-aMWZI1YM.js";
const ListOfPost = (props) => {
  const { posts, showIcons, showContentToggle, contentToggleHPosition, locale } = props;
  const [toggleState, setToggleState] = useState({});
  const postTopRef = React__default.createRef();
  useEffect(() => {
    window.setTimeout(
      () => {
        if (window.location.hash) {
          const element = document.getElementById(window.location.hash.substr(1));
          if (element) {
            element.scrollIntoView({ behavior: "auto", block: "start" });
          }
        }
      },
      0
    );
  }, [posts]);
  const getBody = (post) => {
    const contentParts = post.content ? post.content.rendered.split("<!--more-->") : [];
    const content = contentParts.length > 1 ? contentParts[1] : contentParts[0];
    return content;
  };
  const getContentToggle = (slug) => {
    const show = toggleState[slug] || false;
    const linkText = show ? "Read less" : "Read more";
    return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { style: { position: "relative", left: contentToggleHPosition + "%" }, children: /* @__PURE__ */ jsx("a", { className: "link", onClick: () => {
      if (postTopRef.current && show) {
        postTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        postTopRef.current.scrollTop = 0;
      }
      setToggleState({ ...toggleState, [slug]: !show });
    }, children: linkText }) }) });
  };
  const getIntro = (post) => {
    const contentParts = post.content ? post.content.rendered.split("<!--more-->") : [];
    const content = contentParts.length > 1 ? contentParts[0] : null;
    return content ? content.trim() : null;
  };
  const hasBody = (post) => {
    const contentParts = post.content ? post.content.rendered.split("<!--more-->") : [];
    return contentParts.length > 1 && contentParts[1].trim().length > 0;
  };
  return /* @__PURE__ */ jsx(Container, { fluid: true, className: "inline list", children: posts && posts.map((p) => /* @__PURE__ */ jsxs(Grid, { children: [
    showIcons && /* @__PURE__ */ jsxs(Grid.Column, { textAlign: "center", width: 1, children: [
      /* @__PURE__ */ jsx("a", { id: p.slug }),
      /* @__PURE__ */ jsx(
        MediaProvider,
        {
          id: p.meta_fields && p.meta_fields.icon ? p.meta_fields.icon[0] : null,
          children: /* @__PURE__ */ jsx(MediaConsumer, { children: /* @__PURE__ */ jsx(PostIcon, { as: Label }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Grid.Column, { width: showIcons ? 15 : 16, children: [
      getIntro(p) && /* @__PURE__ */ jsx(PostIntro, { as: Container, fluid: true, post: p, ref: postTopRef }),
      !getIntro(p) && /* @__PURE__ */ jsx(
        PostContent,
        {
          post: { content: { rendered: getBody(p) } },
          style: { clear: "both", display: "block" }
        }
      ),
      hasBody(p) && /* @__PURE__ */ jsxs(Container, { children: [
        showContentToggle && /* @__PURE__ */ jsxs(Fragment, { children: [
          !toggleState[p.slug] && getContentToggle(p.slug),
          /* @__PURE__ */ jsx(
            PostContent,
            {
              post: { content: { rendered: getBody(p) } },
              style: {
                clear: "both",
                display: toggleState[p.slug] ? "block" : "none"
              }
            }
          ),
          toggleState[p.slug] && getContentToggle(p.slug)
        ] }),
        !showContentToggle && /* @__PURE__ */ jsx("a", { href: utils.replaceLink(p.link), className: "link", children: "Read More" })
      ] })
    ] })
  ] })) });
};
const Root = (props) => {
  useState(Math.random() * (99999 - 1) + 1);
  const { locale } = useParams();
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
    "data-content-toggle-h-position": contentToggleHPosition,
    //horizontal position
    parent,
    editing,
    component,
    unique
  } = props;
  return /* @__PURE__ */ jsx(Container, { fluid: true, children: /* @__PURE__ */ jsx(
    PostProvider,
    {
      type,
      locale,
      taxonomy,
      categories,
      store: "inline_list_" + parent + "_" + unique,
      page: 1,
      perPage: items,
      children: /* @__PURE__ */ jsx(PostConsumer, { children: /* @__PURE__ */ jsx(ListOfPost, { locale: locale ?? "en", showIcons: showIcons === "true", showContentToggle: showContentToggle === "true", contentToggleHPosition }) })
    }
  ) });
};
export {
  Root as default
};
