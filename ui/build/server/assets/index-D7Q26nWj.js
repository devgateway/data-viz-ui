import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { l as useDispatch, m as useSelector, o as cleanMeasures, q as setMeasures } from "./server-build-C_g_IF5C.js";
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
const useAppDispatch = () => useDispatch();
const useAppSelector = useSelector;
const Measures = (props) => {
  const {
    parent,
    editing = false,
    unique,
    "data-label": label,
    "data-group": group,
    "data-app": app,
    "data-measures-groups": dataGroups
  } = props;
  let groups;
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.getIn(["data", "measures", app, group]));
  const actions = {
    onReset: cleanMeasures,
    onChange: setMeasures
  };
  if (dataGroups instanceof String || typeof dataGroups == "string") {
    groups = JSON.parse(decodeURIComponent(dataGroups));
  } else {
    groups = dataGroups;
  }
  useEffect(() => {
    if (groups && groups[app]) {
      groups[app].forEach((g) => {
        if (g.defaultSelected) {
          dispatch(actions.onChange({ app, group, mGroup: g }));
        }
      });
    }
  }, []);
  if (groups && groups[app]) {
    const items = groups[app];
    return /* @__PURE__ */ jsxs(Container, { className: "measures group", fluid: true, children: [
      label && /* @__PURE__ */ jsx("span", { children: label }),
      items.map((i) => {
        return /* @__PURE__ */ jsxs("div", { className: "inputs lists", onClick: (e) => dispatch(actions.onChange({ app, group, mGroup: i })), children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              readOnly: true,
              checked: selected && selected.idx == i.idx ? true : false,
              type: "radio"
            }
          ),
          /* @__PURE__ */ jsx("span", { children: i.label })
        ] }, i.idx);
      })
    ] });
  } else {
    return /* @__PURE__ */ jsx(Container, { className: "measures group", fluid: true, children: label && /* @__PURE__ */ jsx("span", { children: label }) });
  }
};
export {
  Measures as default
};
