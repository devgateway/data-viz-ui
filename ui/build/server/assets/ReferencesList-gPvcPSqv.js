import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Container, Grid } from "semantic-ui-react";
import { e as connect_default } from "./server-build-C_g_IF5C.js";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "use-sync-external-store/with-selector.js";
import "react-intl";
import "prop-types";
import "react-compiler-runtime";
import "react-dom/client";
import "immutable";
import "papaparse";
import "@devgateway/customizer";
import "@reduxjs/toolkit";
import "@artsy/fresnel";
import "clsx";
import "semantic-ui-react/dist/commonjs/lib/index.js";
import "query-string";
const Reference = ({ content, link, index }) => {
  return /* @__PURE__ */ jsx(Grid.Column, { children: /* @__PURE__ */ jsxs(Container, { id: "ref_" + index, className: "reference", children: [
    /* @__PURE__ */ jsx("div", { className: "index", children: index }),
    /* @__PURE__ */ jsx("div", { className: "content", children: content }),
    /* @__PURE__ */ jsx("div", { className: "link", children: /* @__PURE__ */ jsx("a", { href: link, target: "_blank", children: link }) })
  ] }) });
};
const decodeContent = (content) => {
  let result;
  try {
    result = decodeURIComponent(content);
  } catch (err) {
    result = content;
    console.error("error occurred decoding content:" + content);
  }
  return result;
};
const References = ({
  random,
  editing = false,
  "data-columns": cols = 3,
  "data-height": height = 1e3,
  "data-flex-direction": flexDirection = "row"
}) => {
  const style = { flexDirection, height: "auto" };
  const [elements, setElements] = useState([]);
  if (flexDirection == "column" && cols > 1) {
    style.height = height + "px";
  }
  useEffect(() => {
    try {
      setTimeout(() => {
        const el = window.parent.document.querySelectorAll("div.wp-reference");
        setElements(el);
      }, 3e3);
    } catch (err) {
      console.error("Error loading references", err);
    }
  });
  const items = elements ? new Array(...elements) : [];
  const unique = [];
  items.forEach((item) => {
    const found = unique.find((it) => it.getAttribute("data-index") == item.getAttribute("data-index"));
    if (!found) {
      unique.push(item);
    }
  });
  return /* @__PURE__ */ jsxs(Container, { className: "references list", children: [
    editing && /* @__PURE__ */ jsx("div", { className: "edit-mode-message", children: /* @__PURE__ */ jsx("p", { children: "No preview available. The full list of references will be displayed in the live page." }) }),
    /* @__PURE__ */ jsx(Grid, { fluid: true, stretched: true, columns: cols, style, children: unique.sort((a, b) => {
      const indexA = a.getAttribute("data-index") !== null ? parseInt(a.getAttribute("data-index")) : Number.POSITIVE_INFINITY;
      const indexB = b.getAttribute("data-index") !== null ? parseInt(b.getAttribute("data-index")) : Number.POSITIVE_INFINITY;
      return indexA - indexB;
    }).map((i) => {
      return /* @__PURE__ */ jsx(
        Reference,
        {
          index: i.getAttribute("data-index"),
          content: decodeContent(i.getAttribute("data-description")),
          link: i.getAttribute("data-link")
        },
        i.getAttribute("data-index")
      );
    }) })
  ] });
};
const mapStateToProps = (state, ownProps) => {
  return { random: state.getIn(["embeddable", "random"]) };
};
const mapActionCreators = {};
const ReferencesList = connect_default(mapStateToProps, mapActionCreators)(References);
export {
  ReferencesList as default
};
