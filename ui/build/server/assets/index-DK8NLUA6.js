import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import React__default, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Container, Accordion, Icon } from "semantic-ui-react";
import "react-compiler-runtime";
import { c as PostProvider, d as PostConsumer, M as MediaProvider, k as MediaConsumer, b as PostContent } from "./server-build-C_g_IF5C.js";
import { P as PostIcon } from "./PostIcon-CMH9qQYi.js";
import { P as PostIntro } from "./PostIntro-5si_cZk4.js";
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
import "./PostIntro-aMWZI1YM.js";
const AccordionContent = ({ posts, activeItem, setActive, colors }) => {
  const [activeIndex, setActiveIndex] = useState(posts.findIndex((p) => p.slug === activeItem));
  const [scrollTarget, setScrollTarget] = useState(null);
  const findElementAndAddStyles = (elementClass, containerClass, hasContainerClass) => {
    const elements = document.querySelectorAll(elementClass);
    elements.forEach((element) => {
      if (element.querySelector(containerClass)) {
        element.classList.add(hasContainerClass);
      }
    });
  };
  useEffect(() => {
    if (scrollTarget) {
      const element = scrollTarget;
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
    findElementAndAddStyles(".ui.fluid.container.viz.featured.tabs", ".accordion", "has-accordion");
    findElementAndAddStyles(".ui.fluid.container.viz.featured.tabs", "blockquote", "has-blockquote");
    findElementAndAddStyles(".ui.fluid.container.viz.featured.tabs", ".accordion .accordion-post-ft-title", "has-accordion-title");
    findElementAndAddStyles(".ui.fluid.container.viz.featured.tabs", ".accordion .accordion-post-vft-content", "has-accordion-content");
    findElementAndAddStyles(".ui.fluid.container.viz.featured.tabs", ".vt-accordion-post-intro figure", "has-vt-accordion-figure");
    findElementAndAddStyles(".ui.fluid.container.viz.featured.tabs", ".content.active.accordion-post-content .wp-block-columns", "has-wp-block-columns");
  }, [scrollTarget]);
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
    setActive(posts[index].slug);
    if (newIndex !== -1) {
      setScrollTarget(e.currentTarget);
    }
  };
  return /* @__PURE__ */ jsx(Accordion, { fluid: true, styled: true, children: posts.map((post, index) => {
    const iconUrl = post.meta_fields && post.meta_fields.icon ? post.meta_fields.icon[0] : null;
    return /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
      /* @__PURE__ */ jsx(
        Accordion.Title,
        {
          active: activeIndex === index,
          index,
          onClick: handleClick,
          style: { backgroundColor: colors[`color_${index}`] },
          children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }, children: [
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
              iconUrl && /* @__PURE__ */ jsx(MediaProvider, { id: iconUrl, children: /* @__PURE__ */ jsx(MediaConsumer, { children: /* @__PURE__ */ jsx(PostIcon, { className: "icon" }) }) }),
              /* @__PURE__ */ jsx(PostIntro, { post, className: "vt-accordion-post-intro" })
            ] }),
            /* @__PURE__ */ jsx(Icon, { name: "chevron down" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(Accordion.Content, { className: "accordion-post-content accordion-post-vft-content", active: activeIndex === index, children: /* @__PURE__ */ jsx(PostContent, { post }) })
    ] }, post.id);
  }) });
};
const IntroWithFeaturedImage = ({ post, count, backgroundColor, active, dimensions, height, coverWidth }) => {
  const media = post["_embedded"] ? post["_embedded"]["wp:featuredmedia"] : null;
  const [isHovered, setIsHovered] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "content-area", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "cover",
        style: {
          "width": `${coverWidth}px`,
          "backgroundColor": backgroundColor,
          "backgroundImage": "url(" + (media ? media[0].source_url : "") + ")"
        },
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        children: [
          /* @__PURE__ */ jsx("div", { className: "rotator", style: { width: height + "px", "transform": `translate(${coverWidth / 2}px, 0px) rotate(90deg)` }, children: /* @__PURE__ */ jsx(PostIntro, { post }) }),
          /* @__PURE__ */ jsxs("div", { className: "overlay-label-container", children: [
            /* @__PURE__ */ jsx("div", { className: `overlay-label ${isHovered && !active ? "visible" : ""}`, children: "CLICK TO EXPAND" }),
            /* @__PURE__ */ jsx("div", { className: "arrow-svg" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `collapsable-content ${active ? "expanded" : "collapsed"}`,
        style: {
          "backgroundColor": "#f9f9f9",
          width: dimensions.width - coverWidth * count + "px",
          "marginLeft": `${coverWidth}px`
        },
        children: /* @__PURE__ */ jsx(PostContent, { post })
      }
    )
  ] });
};
const FeaturedTabs = ({ editing, posts, height, colors, coverWidth }) => {
  const [active, setActive] = useState(null);
  const targetRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const toggleAnimation = (k) => {
    setActive(k);
  };
  useLayoutEffect(() => {
    if (targetRef.current && targetRef.current.parentElement) {
      setDimensions({
        width: targetRef.current.parentElement.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, []);
  return /* @__PURE__ */ jsx(Container, { fluid: true, className: `vertical featured tabs ${editing ? "editing" : ""}`, children: posts && posts.map((post, i) => {
    const isActive = active ? post.slug === active : i === 0;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref: targetRef,
        onClick: (e) => toggleAnimation(post.slug),
        className: isActive ? "item expanded" : "item collapsed",
        style: { "minHeight": height + "px", "minWidth": `${coverWidth}px` },
        children: [
          /* @__PURE__ */ jsx("a", { id: post.slug }),
          /* @__PURE__ */ jsx(
            IntroWithFeaturedImage,
            {
              coverWidth,
              height,
              backgroundColor: colors["color_" + i],
              count: posts.length,
              dimensions,
              active: isActive,
              post
            }
          )
        ]
      },
      post.slug
    );
  }) });
};
const Root = (props) => {
  var _a;
  const {
    "data-height": height,
    "data-type": type,
    "data-taxonomy": taxonomy,
    "data-categories": categories,
    "data-count": items,
    "data-colors": colors,
    "data-cover-width": coverWidth = 50,
    "data-read-more-label": moreLabel = "READ More",
    editing,
    parent,
    unique
  } = props;
  const locale = props.intl.locale;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1440);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1250);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const decode = (value) => {
    if (editing) {
      return value;
    }
    return decodeURIComponent(value);
  };
  const parse = (value) => {
    try {
      return JSON.parse(decode(value));
    } catch (error) {
      console.error("error parsing value:" + value);
    }
    return null;
  };
  return /* @__PURE__ */ jsx(
    Container,
    {
      style: { "max-width": "100%" },
      className: `viz featured tabs ${editing ? "editing" : ""}`,
      fluid: true,
      children: /* @__PURE__ */ jsx(
        PostProvider,
        {
          type,
          locale,
          taxonomy,
          categories: parse(categories).join(","),
          store: "vertical_tabs" + parent + "_" + unique,
          page: 1,
          perPage: items,
          children: /* @__PURE__ */ jsx(PostConsumer, { children: isMobile ? /* @__PURE__ */ jsx(
            AccordionContent,
            {
              posts: items,
              activeItem: (_a = items[0]) == null ? void 0 : _a.slug,
              colors: parse(colors),
              setActive: () => {
              }
            }
          ) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
            FeaturedTabs,
            {
              editing,
              coverWidth,
              moreLabel,
              colors: parse(colors),
              height
            }
          ) }) })
        }
      )
    }
  );
};
export {
  Root as default
};
