import { jsx, jsxs } from "react/jsx-runtime";
import "react";
import { Popup } from "semantic-ui-react";
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
const Reference = ({
  "data-index": index = "",
  "data-description": description = "",
  "data-link": link = ""
}) => {
  return /* @__PURE__ */ jsx(
    Popup,
    {
      className: "reference-popup",
      hoverable: true,
      size: "mini",
      offset: [-16, 0],
      content: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { children: decodeContent(description) }),
        /* @__PURE__ */ jsx("a", { href: link, target: "_blank", children: link })
      ] }),
      trigger: /* @__PURE__ */ jsx("a", { "data-index": index, "data-description": description, "data-link": link, href: `#ref_${index}`, className: "wp-reference", children: index })
    }
  );
};
const mapStateToProps = (state, ownProps) => {
  return { random: state.getIn(["embeddable", "random"]) };
};
const mapActionCreators = {};
const Reference$1 = connect_default(mapStateToProps, mapActionCreators)(Reference);
export {
  Reference$1 as default
};
