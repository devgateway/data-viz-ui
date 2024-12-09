import { jsx, jsxs } from "react/jsx-runtime";
import React__default, { useState, useEffect } from "react";
import { Container, Grid, Segment, Label, Icon, Accordion } from "semantic-ui-react";
import { c } from "react-compiler-runtime";
import { C as Content, c as PostProvider, d as PostConsumer, M as MediaProvider, k as MediaConsumer, b as PostContent } from "./server-build-C_g_IF5C.js";
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
const PostTitle = (props) => {
  const $ = c(2);
  let t0;
  if ($[0] !== props) {
    t0 = /* @__PURE__ */ jsx(Content, {
      ...props,
      showTitle: true
    });
    $[0] = props;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
const FeaturedPost = ({ post, onClick, active, moreLabel }) => {
  const media = post["_embedded"] ? post["_embedded"]["wp:featuredmedia"] : null;
  return /* @__PURE__ */ jsxs("div", { className: "cover", style: { "backgroundImage": "url(" + (media ? media[0].source_url : "") + ")" }, children: [
    /* @__PURE__ */ jsx(PostIntro, { post }),
    !active ? /* @__PURE__ */ jsxs(Label, { onClick, children: [
      /* @__PURE__ */ jsx(Icon, { name: "search", size: "large" }),
      " ",
      moreLabel
    ] }) : /* @__PURE__ */ jsxs(Label, { onClick, children: [
      /* @__PURE__ */ jsx(Icon, { name: "arrow alternate circle left outline", size: "large" }),
      " Back "
    ] })
  ] });
};
const GetFigureFromPost = ({ post }) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(post.content.rendered, "text/html");
  const figureElement = doc.querySelector("figure");
  if (!figureElement) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { style: {
    flex: "0 0 40px"
  }, dangerouslySetInnerHTML: { __html: figureElement.outerHTML } });
};
const FeaturedTabs = ({ posts, height, color, moreLabel }) => {
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(false);
  const [scrollPos, setScrollPos] = useState([0, 0]);
  const arrayColors = color.split(",");
  const toggleAnimation = (k) => {
    if (!visible) {
      setActive(k);
      setVisible(true);
    } else {
      setVisible(false);
      setActive(k);
    }
  };
  useEffect(() => {
    if (active) {
      setScrollPos([window.scrollX, window.scrollY]);
    }
    if (active == null) {
      window.scrollTo(scrollPos[0], scrollPos[1]);
    }
  }, [active]);
  useEffect(() => {
    window.setTimeout(
      () => {
        if (window.location.hash) {
          const slug = window.location.hash.substr(1);
          const element = document.getElementById(slug);
          if (element && posts && posts.map((p) => p.slug).indexOf(slug) > -1) {
            setActive(slug);
            element.scrollIntoView({ behavior: "auto", block: "start" });
          }
        }
      },
      0
    );
  }, posts);
  return /* @__PURE__ */ jsx(Container, { fluid: true, className: "featured tabs", style: { "min-height": height + "px" }, children: /* @__PURE__ */ jsx(Grid, { stackable: true, columns: active != null ? 1 : posts.length, className: "desktop", children: posts && posts.map((post, i) => {
    return /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
      /* @__PURE__ */ jsxs(
        Grid.Column,
        {
          style: active == null ? { display: "block", visibility: "visible", "backgroundColor": arrayColors[i] } : { display: "none", visibility: "hidden" },
          children: [
            /* @__PURE__ */ jsx("a", { id: post.slug }),
            /* @__PURE__ */ jsx(
              FeaturedPost,
              {
                post,
                moreLabel,
                active,
                onClick: (e) => toggleAnimation(post.slug)
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Grid.Column,
        {
          className: "expanded",
          style: active != post.slug ? { display: "none", visibility: "hidden" } : { display: "block", visibility: "visible" },
          children: [
            /* @__PURE__ */ jsxs(Segment, { style: { "backgroundColor": arrayColors[i] }, children: [
              post.meta_fields && post.meta_fields.icon && /* @__PURE__ */ jsx(MediaProvider, { id: post.meta_fields ? post.meta_fields.icon[0] : null, children: /* @__PURE__ */ jsx(MediaConsumer, { children: /* @__PURE__ */ jsx(PostIcon, {}) }) }),
              /* @__PURE__ */ jsx(PostTitle, { as: "h2", post, className: "has-standard-36-font-size has-white-color" }),
              /* @__PURE__ */ jsx(Label, { className: "closeIcon", onClick: (e) => setActive(null), children: /* @__PURE__ */ jsx(Icon, { name: "times circle outline", size: "large" }) })
            ] }),
            /* @__PURE__ */ jsx(PostContent, { as: "div", fluid: true, post }),
            /* @__PURE__ */ jsxs(Label, { className: "closeIconText", onClick: (e) => setActive(null), children: [
              /* @__PURE__ */ jsx(Icon, { name: "times circle outline", size: "large" }),
              " Close "
            ] })
          ]
        }
      )
    ] });
  }) }) });
};
const AccordionContent = ({ posts, activeItem, setActive, color }) => {
  const [activeIndex, setActiveIndex] = useState(posts.findIndex((p) => p.slug === activeItem));
  const [scrollTarget, setScrollTarget] = useState(null);
  const arrayColors = color.split(",");
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
      const offsetTop = scrollTarget.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
    findElementAndAddStyles(".ui.fluid.container.viz.featured.tabs", ".accordion .accordion-post-ft-title", "has-accordion-title");
    findElementAndAddStyles(".ui.fluid.container.viz.featured.tabs", ".accordion .accordion-post-vft-content", "has-accordion-content");
    findElementAndAddStyles(".ui.fluid.container.viz.featured.tabs", "blockquote", "has-blockquote");
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
          style: { backgroundColor: arrayColors[index] },
          children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }, children: [
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
              iconUrl && /* @__PURE__ */ jsx(MediaProvider, { id: iconUrl, children: /* @__PURE__ */ jsx(MediaConsumer, { children: /* @__PURE__ */ jsx(PostIcon, { className: "icon" }) }) }),
              !iconUrl && /* @__PURE__ */ jsx(GetFigureFromPost, { post }),
              /* @__PURE__ */ jsx("p", { className: "accordion-post-ft-title", dangerouslySetInnerHTML: { __html: post.title.rendered }, style: { marginLeft: "10px" } })
            ] }),
            /* @__PURE__ */ jsx(Icon, { name: "chevron down" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(Accordion.Content, { className: "accordion-post-ft-content", active: activeIndex === index, children: /* @__PURE__ */ jsx(PostContent, { post }) })
    ] }, post.id);
  }) });
};
const Root = (props) => {
  var _a;
  useState(Math.random() * (99999 - 1) + 1);
  const {
    "data-width": width,
    "data-height": height,
    "data-type": type,
    "data-taxonomy": taxonomy,
    "data-categories": categories,
    "data-items": items,
    "data-color": color,
    "data-use-scrolls": useScrolls,
    "data-read-more-label": moreLabel = "READ More",
    editing,
    parent,
    unique
  } = props;
  const locale = props.intl.locale;
  const scrollable = useScrolls == "true";
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1250);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return /* @__PURE__ */ jsx(
    Container,
    {
      className: `viz featured tabs ${editing ? "editing" : ""} ${scrollable ? "scrollable" : ""}`,
      fluid: true,
      children: /* @__PURE__ */ jsx(
        PostProvider,
        {
          locale,
          type,
          taxonomy,
          categories,
          store: `tabbedposts_${parent}_${unique}`,
          page: 1,
          perPage: items,
          children: /* @__PURE__ */ jsx(PostConsumer, { children: isMobile ? /* @__PURE__ */ jsx(
            AccordionContent,
            {
              posts: items,
              activeItem: (_a = items[0]) == null ? void 0 : _a.slug,
              color,
              setActive: () => {
              }
            }
          ) : /* @__PURE__ */ jsx(
            FeaturedTabs,
            {
              moreLabel,
              color,
              width,
              height
            }
          ) })
        }
      )
    }
  );
};
export {
  Root as default
};
