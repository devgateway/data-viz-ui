import { jsxs, jsx } from "react/jsx-runtime";
import { Container, Segment, Grid } from "semantic-ui-react";
import "react-compiler-runtime";
import "react";
import { P as PageProvider, a as PageConsumer } from "./server-build-C_g_IF5C.js";
import { P as PostIntro } from "./PostIntro-aMWZI1YM.js";
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
const HorizontalDashboardGallery = ({ pages, columns }) => {
  const childPages = pages ? pages.sort((a, b) => a.menu_order - b.menu_order) : [];
  const rows = childPages.length / parseInt(columns) + (childPages.length % parseInt(columns) > 0 ? 1 : 0);
  let index2 = -1;
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Grid, { columns, children: [...Array(parseInt(rows)).keys()].map((r, idx) => {
    return /* @__PURE__ */ jsx(Grid.Row, { children: [...Array(parseInt(columns)).keys()].map((c, _) => {
      index2++;
      return /* @__PURE__ */ jsx(Grid.Column, { children: /* @__PURE__ */ jsx(PostIntro, { as: "div", post: childPages[index2] }) }, _);
    }) }, idx);
  }) }) });
};
const Root = (props) => {
  const {
    "data-height": height,
    "data-style": style,
    "data-columns": columns,
    "data-parent": parent,
    editing,
    component,
    unique,
    intl: { locale }
  } = props;
  const options = { style, columns };
  return /* @__PURE__ */ jsxs(Container, { fluid: true, className: `viz dashboard gallery ${style}`, children: [
    parent && /* @__PURE__ */ jsx(
      PageProvider,
      {
        locale,
        parent,
        store: "gallery_" + props.parent + "_" + props.unique,
        perPage: 100,
        children: /* @__PURE__ */ jsx(PageConsumer, { children: /* @__PURE__ */ jsx(HorizontalDashboardGallery, { ...options }) })
      }
    ),
    !parent && /* @__PURE__ */ jsx(Segment, { color: "red", children: "No child pages here" })
  ] });
};
const index = injectIntl(Root);
export {
  index as default
};
