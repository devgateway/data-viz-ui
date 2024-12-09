import { jsx, jsxs } from "react/jsx-runtime";
import { Menu, Image, Label, Container } from "semantic-ui-react";
import { InView } from "react-intersection-observer";
import React__default, { useState, useCallback } from "react";
import "react-compiler-runtime";
import { P as PageProvider, a as PageConsumer, M as MediaProvider, k as MediaConsumer, b as PostContent } from "./server-build-C_g_IF5C.js";
import { injectIntl } from "react-intl";
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
function smoothscroll(idx) {
  const offset = () => 10;
  const $anchor = idx ? document.getElementById(idx) : null;
  if ($anchor) {
    const offsetTop2 = $anchor.getBoundingClientRect().top + window.pageYOffset;
    window.scroll({
      top: offsetTop2 - offset(),
      behavior: "smooth"
    });
  }
}
const decodeHtmlEntity$1 = function(str) {
  if (str) {
    return str.toString().replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  }
  return "";
};
const Navigator = (props) => {
  const { contextRef, sections = [], navTitle, toTopLabel } = props;
  return /* @__PURE__ */ jsx("div", { className: "left navigator", children: /* @__PURE__ */ jsxs(Menu, { vertical: true, children: [
    /* @__PURE__ */ jsx(Menu.Item, { header: true, children: navTitle }),
    sections.map((s) => /* @__PURE__ */ jsxs(Menu.Item, { active: s.active, onClick: () => smoothscroll(s.id), children: [
      s.iconComponent ? s.iconComponent : /* @__PURE__ */ jsx(Image, { src: s.icon }),
      /* @__PURE__ */ jsx(Label, { basic: true, children: decodeHtmlEntity$1(s.label) })
    ] }, s.label))
  ] }) });
};
const decodeHtmlEntity = function(str) {
  if (str) {
    return str.toString().replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  }
  return "";
};
const SectionHeader = ({ title, subtitle, icon, media }) => {
  return /* @__PURE__ */ jsxs(Menu, { className: "header title", text: true, children: [
    /* @__PURE__ */ jsx(Menu.Item, { children: /* @__PURE__ */ jsx(Image, { src: media && media.guid ? media.guid.rendered : icon }) }),
    /* @__PURE__ */ jsx(Menu.Header, { children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "has-light-blue-color", children: title }),
      /* @__PURE__ */ jsx("h2", { className: "has-gray-color", children: subtitle })
    ] }) })
  ] });
};
const MediaImage = (props) => /* @__PURE__ */ jsx("img", { src: props.media && props.media.guid ? props.media.guid.rendered : null });
const Module = ({ page, locale }) => {
  return /* @__PURE__ */ jsxs(Container, { fluid: true, className: "section " + page.slug, id: page.id, children: [
    /* @__PURE__ */ jsx("div", { id: `${page.slug}` }),
    /* @__PURE__ */ jsx(MediaProvider, { id: page.meta_fields && page.meta_fields.icon ? page.meta_fields.icon[0] : null, children: /* @__PURE__ */ jsx(MediaConsumer, { children: /* @__PURE__ */ jsx(
      SectionHeader,
      {
        title: decodeHtmlEntity(page.title.rendered),
        subtitle: decodeHtmlEntity(page.meta_fields.subtitle)
      }
    ) }) }),
    page && /* @__PURE__ */ jsx(PostContent, { as: Container, fluid: true, post: page })
  ] });
};
const PageIterator = ({ pages, locale, editing, navTitle, toTopLabel }) => {
  const [modules, setModules] = useState([]);
  const onVisibilityUpdate = useCallback((id, {
    onScreen,
    direction
  }) => {
    var _a;
    const bboxScreen = document.body.getBoundingClientRect();
    const bbox = (_a = document.getElementById(id)) == null ? void 0 : _a.getBoundingClientRect();
    let active = false;
    if (onScreen && bbox) {
      if ((direction === "down" || direction === "up") && bbox.y / bboxScreen.height < 0.7) {
        active = true;
      }
    }
    setModules((prevModules) => {
      if (active && !prevModules.includes(id)) {
        return [...prevModules, id];
      } else if (!active) {
        return prevModules.filter((d) => d !== id);
      }
      return prevModules;
    });
  }, []);
  const childPages = pages ? pages.sort((a, b) => a.menu_order - b.menu_order) : [];
  const list = childPages.map((p) => ({
    active: modules.includes(p.id),
    id: p.id,
    label: p.meta_fields.label ? p.meta_fields.label : p.title.rendered,
    iconComponent: /* @__PURE__ */ jsx(MediaProvider, { id: p.meta_fields && p.meta_fields.icon ? p.meta_fields.icon[0] : null, children: /* @__PURE__ */ jsx(MediaConsumer, { children: /* @__PURE__ */ jsx(MediaImage, {}) }) })
  }));
  return /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
    !editing && /* @__PURE__ */ jsx(Navigator, { navTitle, toTopLabel, sections: list }),
    /* @__PURE__ */ jsx("div", { className: "pages", children: childPages.map((p) => /* @__PURE__ */ jsx(
      InView,
      {
        as: "div",
        onChange: (inView, entry) => onVisibilityUpdate(p.id, {
          onScreen: inView,
          direction: entry.boundingClientRect.top < 0 ? "up" : "down"
        }),
        children: /* @__PURE__ */ jsx(
          Module,
          {
            locale,
            page: p,
            onVisibilityUpdate
          }
        )
      },
      p.id
    )) })
  ] });
};
const Root = (props) => {
  const {
    "data-type": type,
    "data-taxonomy": taxonomy,
    "data-categories": categories,
    "data-items": items,
    "data-nav-label": navTitle = "Sections",
    "data-to-top-label": toTopLabel = "TO THE TOP",
    editing,
    parent,
    unique,
    intl: { locale }
  } = props;
  return /* @__PURE__ */ jsx(Container, { className: "viz dashboard green", fluid: true, children: props.parent && /* @__PURE__ */ jsx(PageProvider, { locale, parent: props.parent, store: "modules_" + parent + "_" + unique, perPage: 100, children: /* @__PURE__ */ jsx(PageConsumer, { children: /* @__PURE__ */ jsx(
    PageIterator,
    {
      toTopLabel,
      navTitle,
      editing: editing === "true",
      locale
    }
  ) }) }) });
};
const index = injectIntl(Root);
export {
  SectionHeader,
  index as default
};
