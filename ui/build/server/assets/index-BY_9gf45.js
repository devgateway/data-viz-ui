import { jsx } from "react/jsx-runtime";
import React__default, { useState } from "react";
import * as customizer from "@devgateway/customizer";
const Root = (props) => {
  useState(Math.random() * (99999 - 1) + 1);
  const {
    "data-width": width,
    "data-height": height,
    "data-name": name,
    parent,
    editing,
    component,
    unique
  } = props;
  let C2 = () => {
    return /* @__PURE__ */ jsx("div", { children: "Not found" });
  };
  if (customizer[name]) {
    C2 = customizer[name];
  } else {
    C2 = React__default.lazy(() => import("../" + name + "/"));
  }
  return /* @__PURE__ */ jsx("div", { style: { width: "100%", height: height + "px" }, className: "parallax-container", children: /* @__PURE__ */ jsx(React__default.Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsx(C2, { ...props }) }) });
};
export {
  Root as default
};
