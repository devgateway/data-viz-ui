import { jsx, jsxs } from "react/jsx-runtime";
import React__default, { useState, useEffect, useRef } from "react";
import { Label, Container, Accordion, Icon, Menu, Grid, Button } from "semantic-ui-react";
import { c } from "react-compiler-runtime";
import { c as PostProvider, d as PostConsumer, M as MediaProvider, k as MediaConsumer } from "./server-build-C_g_IF5C.js";
import { P as PostIcon } from "./PostIcon-CMH9qQYi.js";
import { injectIntl } from "react-intl";
import { P as PostIntro } from "./PostIntro-5si_cZk4.js";
import { g as getDeviceType } from "./deviceType-CnQNKjrj.js";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "use-sync-external-store/with-selector.js";
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
const PostLabel = (t0) => {
  const $ = c(2);
  const {
    post
  } = t0;
  const label = post.meta_fields ? post.meta_fields.label : "";
  let t1;
  if ($[0] !== label) {
    t1 = /* @__PURE__ */ jsx(Label, {
      children: label
    });
    $[0] = label;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  return t1;
};
const ItemMenu = ({ posts, activeItem, setActive, showLabels }) => {
  return posts ? posts.map((post) => /* @__PURE__ */ jsx(Menu.Item, { onClick: () => setActive(post.slug), className: post.slug === activeItem ? "active" : "", children: showLabels ? /* @__PURE__ */ jsx(PostLabel, { post }) : /* @__PURE__ */ jsx(Label, { children: /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: post.title.rendered } }) }) }, post.id)) : null;
};
const GriNavigator = ({ posts, activeItem, setActive, showIcons, showLabels }) => {
  const count = posts.length;
  return posts ? posts.map((post) => {
    post["_embedded"] && post["_embedded"]["wp:featuredmedia"] ? post["_embedded"]["wp:featuredmedia"][0].source_url : null;
    return /* @__PURE__ */ jsx(Grid.Column, { className: (post.slug === activeItem ? "active" : "") + (showIcons ? " has-icon" : ""), children: /* @__PURE__ */ jsxs(Button, { onClick: () => setActive(post.slug), className: `nav  ${count === 1 ? "one" : ""}`, children: [
      showIcons && /* @__PURE__ */ jsx(MediaProvider, { id: post.meta_fields && post.meta_fields.icon ? post.meta_fields.icon[0] : null, children: /* @__PURE__ */ jsx(MediaConsumer, { children: /* @__PURE__ */ jsx(PostIcon, { className: "icon" }) }) }),
      showLabels ? /* @__PURE__ */ jsx(PostLabel, { post }) : /* @__PURE__ */ jsx(Label, { children: /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: post.title.rendered } }) })
    ] }) }, post.id);
  }) : null;
};
const TabContent = ({ posts, activeItem }) => {
  useEffect(() => {
    const contentContainer = document.querySelector(".ui.container.content-tab");
    if (contentContainer) {
      contentContainer.scrollTop = 0;
    }
  }, [activeItem]);
  return posts ? posts.map((p) => {
    let style = {};
    if (p.slug !== activeItem) {
      style = {
        position: "absolute",
        left: "-3000px",
        width: "auto",
        height: "0px",
        overflow: "hidden",
        visibility: "hidden"
      };
    } else {
      style = {
        visibility: "visible",
        position: "relative",
        width: "auto"
      };
    }
    return /* @__PURE__ */ jsx(PostIntro, { as: Container, fluid: true, post: p, style }, p.slug);
  }) : null;
};
const AccordionContent = ({ posts, activeItem, setActive }) => {
  const [activeIndex, setActiveIndex] = useState(
    posts.findIndex((p) => p.slug === activeItem)
  );
  const [scrollTarget, setScrollTarget] = useState(null);
  const ref = useRef(null);
  const isMobileOrTablet = getDeviceType() === "mobile" || getDeviceType() === "tablet" || getDeviceType() === "midTablet";
  useEffect(() => {
    if (scrollTarget) {
      const offsetTop = scrollTarget.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  }, [scrollTarget]);
  useEffect(() => {
    let timeoutId;
    let observers = [];
    const adjustDataSourceMargin = (ref2) => {
      requestAnimationFrame(() => {
        var _a;
        const legendsContainers = ref2.querySelectorAll(
          ".accordion .legends.container.has-standard-12-font-size.bottom, .legends.container.items-section"
        );
        if (legendsContainers.length === 0) {
          return;
        }
        for (const legendsContainer of legendsContainers) {
          const container = legendsContainer.closest(
            ".ui.fluid.container.content"
          );
          const dataSourceParagraph = container ? container.querySelector(".data-source") : null;
          if (!dataSourceParagraph) {
            continue;
          }
          if (legendsContainer.offsetParent === null || dataSourceParagraph.offsetParent === null) {
            continue;
          }
          const dataSourceRect = dataSourceParagraph.getBoundingClientRect();
          const legendsRect = legendsContainer.getBoundingClientRect();
          const dataSourceStyles = window.getComputedStyle(dataSourceParagraph);
          const legendsStyles = window.getComputedStyle(legendsContainer);
          const dataSourceMarginTop = parseFloat(dataSourceStyles.marginTop) || 0;
          const legendsMarginBottom = parseFloat(legendsStyles.marginBottom) || 0;
          const adjustedLegendsBottom = legendsRect.bottom + legendsMarginBottom;
          const legendsMarginTop = parseFloat(legendsStyles.marginTop) || 0;
          const adjustedLegendsTop = legendsRect.top - legendsMarginTop;
          const adjustedDataSourceTop = dataSourceRect.top - dataSourceMarginTop;
          if (adjustedLegendsBottom > adjustedDataSourceTop) {
            const overlap = adjustedLegendsBottom - adjustedDataSourceTop;
            dataSourceParagraph.style.marginTop = `${overlap + 20}px`;
          }
          const wpColumnAfterChart = (_a = legendsContainer.closest(
            ".wp-block-column.is-layout-flow.wp-block-column-is-layout-flow"
          )) == null ? void 0 : _a.nextElementSibling;
          if (wpColumnAfterChart) {
            const wpColumnAfterChartRect = wpColumnAfterChart.getBoundingClientRect();
            const wpColumnAfterChartStyles = window.getComputedStyle(wpColumnAfterChart);
            const wpColumnAfterChartMarginTop = parseFloat(wpColumnAfterChartStyles.marginTop) || 0;
            const legendsMarginBottom2 = parseFloat(legendsStyles.marginBottom) || 0;
            const adjustedWpColumnAfterChartTop = wpColumnAfterChartRect.top - wpColumnAfterChartMarginTop;
            const adjustedLegendsBottom2 = legendsRect.bottom + legendsMarginBottom2;
            if (adjustedLegendsBottom2 > adjustedWpColumnAfterChartTop) {
              const overlap = adjustedLegendsBottom2 - adjustedWpColumnAfterChartTop;
              wpColumnAfterChart.style.marginTop = `${overlap + 20}px`;
            }
          }
          const chartContainer = legendsContainer.closest(
            ".chart.container"
          );
          if (chartContainer) {
            const chartContainerRect = chartContainer.getBoundingClientRect();
            const chartContainerStyles = window.getComputedStyle(chartContainer);
            const chartContainerMarginBottom = parseFloat(chartContainerStyles.marginBottom) || 0;
            const adjustedChartContainerBottom = chartContainerRect.bottom + chartContainerMarginBottom;
            if (adjustedLegendsTop < adjustedChartContainerBottom) {
              const overlap = adjustedChartContainerBottom - adjustedLegendsTop;
              legendsContainer.style.marginTop = `${overlap + 20}px`;
            }
          }
        }
      });
    };
    if (activeIndex !== -1) {
      timeoutId = setTimeout(() => {
        const accordions = document.querySelectorAll(".accordion");
        accordions.forEach((accordion) => adjustDataSourceMargin(accordion));
      }, 0);
    }
    return () => {
      clearTimeout(timeoutId);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [activeIndex, isMobileOrTablet]);
  const handleClick = (e, titleProps) => {
    const { index: index2 } = titleProps;
    const newIndex = activeIndex === index2 ? -1 : index2;
    setActiveIndex(newIndex);
    setActive(posts[index2].slug);
    if (newIndex !== -1) {
      setScrollTarget(e.currentTarget);
    }
  };
  return /* @__PURE__ */ jsx(Accordion, { fluid: true, styled: true, children: posts.map((post, index2) => {
    const iconUrl = post.meta_fields && post.meta_fields.icon ? post.meta_fields.icon[0] : null;
    return /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
      /* @__PURE__ */ jsx(
        Accordion.Title,
        {
          active: activeIndex === index2,
          index: index2,
          onClick: handleClick,
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%"
              },
              children: [
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
                  iconUrl && /* @__PURE__ */ jsx(MediaProvider, { id: iconUrl, children: /* @__PURE__ */ jsx(MediaConsumer, { children: /* @__PURE__ */ jsx(PostIcon, { className: "icon" }) }) }),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      dangerouslySetInnerHTML: { __html: post.title.rendered },
                      style: { marginLeft: iconUrl ? "10px" : "0" }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(Icon, { name: "chevron down" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        Accordion.Content,
        {
          className: "accordion-post-content",
          active: activeIndex === index2,
          children: /* @__PURE__ */ jsx("div", { ref, children: /* @__PURE__ */ jsx(PostIntro, { post, as: Container, fluid: true }) })
        }
      )
    ] }, post.id);
  }) });
};
const SingleTabbedView = ({ posts, showLabels, height }) => {
  const [activeItem, setActive] = useState(posts ? posts[0].slug : null);
  useEffect(() => {
    setTimeout(() => {
      if (window.location.hash) {
        const slug = window.location.hash.substr(1);
        const element = document.getElementById(slug);
        if (element && posts.map((p) => p.slug).indexOf(slug) > -1) {
          setActive(slug);
          element.scrollIntoView({ behavior: "auto", block: "start" });
        }
      }
    }, 0);
  }, [posts]);
  useEffect(() => {
    if (activeItem) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeItem]);
  return /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
    posts.map((p) => /* @__PURE__ */ jsx("anchor", { id: p.slug }, p.slug)),
    /* @__PURE__ */ jsx(Menu, { className: "tabbed posts", text: true, children: /* @__PURE__ */ jsx(ItemMenu, { showLabels, posts, setActive, activeItem }) }),
    /* @__PURE__ */ jsx(Container, { className: "content-tab", style: { height: `${height}px` }, children: /* @__PURE__ */ jsx(TabContent, { posts, activeItem }) })
  ] });
};
const GridTabbedView = ({ posts, showLabels, showIcons, height }) => {
  const [activeItem, setActive] = useState(posts ? posts[0].slug : null);
  return /* @__PURE__ */ jsx(React__default.Fragment, { children: /* @__PURE__ */ jsxs(Grid, { stackable: true, className: "tabbed posts", columns: posts.length, style: { height: height + "px" }, children: [
    /* @__PURE__ */ jsx(GriNavigator, { showIcons, showLabels, posts, activeItem, setActive }),
    /* @__PURE__ */ jsx(Grid.Row, { style: { height: height + "px" }, children: /* @__PURE__ */ jsx(Grid.Column, { width: 16, className: "content", children: /* @__PURE__ */ jsx(Container, { className: "content-tab", style: { height: `${height}px` }, children: /* @__PURE__ */ jsx(TabContent, { className: "content-tab", posts, activeItem }) }) }) })
  ] }) });
};
const Wrapper = (props) => {
  var _a;
  const {
    "data-type": type,
    "data-taxonomy": taxonomy,
    "data-categories": categories,
    "data-items": items,
    "data-theme": theme = "light",
    "data-show-icons": showIcons,
    "data-use-scrolls": useScrolls,
    "data-show-labels": showLabels,
    "data-height": height,
    parent,
    editing,
    unique
  } = props;
  const locale = props.intl.locale;
  const scrollable = useScrolls === "true";
  const conditionalHeight = scrollable ? height : void 0;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1250);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1250);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return /* @__PURE__ */ jsx(Container, { className: `viz tabbed posts ${editing ? "editing" : ""} ${scrollable ? "scrollable" : ""}`, fluid: true, children: /* @__PURE__ */ jsx(
    PostProvider,
    {
      locale,
      type,
      taxonomy,
      categories,
      store: "tabbedposts_" + parent + "_" + unique,
      page: 1,
      perPage: items,
      children: /* @__PURE__ */ jsx(PostConsumer, { children: /* @__PURE__ */ jsx(PostConsumer, { children: isMobile ? /* @__PURE__ */ jsx(AccordionContent, { posts: items, activeItem: (_a = items[0]) == null ? void 0 : _a.slug, setActive: () => {
      } }) : theme === "light" ? /* @__PURE__ */ jsx(SingleTabbedView, { height: conditionalHeight, showLabels: showLabels === "true" }) : /* @__PURE__ */ jsx(
        GridTabbedView,
        {
          height: conditionalHeight,
          showLabels: showLabels === "true",
          showIcons: showIcons === "true"
        }
      ) }) })
    }
  ) });
};
const index = injectIntl(Wrapper);
export {
  index as default
};
