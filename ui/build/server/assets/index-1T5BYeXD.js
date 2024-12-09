import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "react-compiler-runtime";
import { t as MenuProvider, v as PageConsumer } from "./server-build-C_g_IF5C.js";
import { Menu, Container } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import { d as decode } from "./parseUtils-DYrYiyKB.js";
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
const localReplaceLink = (url, locale) => {
  if (url) {
    if (!url.substr(url.indexOf("/wp") + 3).startsWith("/" + locale)) {
      return "/" + locale + url.substr(url.indexOf("/wp") + 3);
    }
    return url.substr(url.indexOf("/wp") + 3);
  }
  return "";
};
const MenuChild = injectIntl((props) => {
  const { menu, locale, match, selected, active, showIcons, onSetSelected } = props;
  return /* @__PURE__ */ jsx(Fragment, { children: menu && menu.items.map((item, index) => /* @__PURE__ */ jsxs(
    Menu.Item,
    {
      className: `divided ${item.child_items ? "has-child-items" : ""} 
                    ${selected && selected.ID == item.ID ? "selected" : ""}  
                    ${active == item.slug ? "active" : ""}`,
      children: [
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx("a", { href: localReplaceLink(item.url, locale), children: item.title }) }),
        item.child_items && item.child_items.map((child, index2) => {
          return /* @__PURE__ */ jsx(Menu.Item, { children: " " });
        })
      ]
    }
  )) });
});
const InlineMenu = (props) => {
  const {
    intl,
    parent,
    editing = false,
    unique,
    onChange,
    "data-name": name = "main",
    "data-label": label,
    "data-icon": icon,
    "data-icon-id": iconId,
    "data-show-icons": showIcon,
    "data-show-labels": showLabel,
    locale
  } = props;
  const [selected, setSelected] = useState(null);
  return /* @__PURE__ */ jsx(Container, { fluid: true, textAlign: "right", children: name && name != "" && /* @__PURE__ */ jsxs(Menu, { className: "inline", size: "small", children: [
    /* @__PURE__ */ jsxs(Menu.Item, { header: true, children: [
      icon && /* @__PURE__ */ jsx("img", { src: decode(icon), className: "icon" }),
      label && /* @__PURE__ */ jsx("span", { className: "label", children: label })
    ] }),
    /* @__PURE__ */ jsx(MenuProvider, { slug: name, locale, children: /* @__PURE__ */ jsx(PageConsumer, { children: /* @__PURE__ */ jsx(MenuChild, { onSetSelected: setSelected }) }) })
  ] }) });
};
export {
  InlineMenu as default
};
