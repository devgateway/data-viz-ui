import { jsxs, jsx } from "react/jsx-runtime";
import { e as connect_default, f as cleanFilter } from "./server-build-C_g_IF5C.js";
import { Container, Icon } from "semantic-ui-react";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "react";
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
const FiltersResetComponent = (props) => {
  const {
    appliedFilters,
    initialFilters,
    "data-group": group,
    onClean,
    "data-app": app = "csv",
    "data-reset-label": resetLabel = "Reset All Filters"
  } = props;
  let enabled = false;
  Object.keys(initialFilters).forEach((k) => {
    if (initialFilters[k].length != appliedFilters[k].filter((v) => v != Number.MIN_SAFE_INTEGER).length) {
      enabled = true;
    }
  });
  return /* @__PURE__ */ jsxs(Container, { fluid: true, className: `data-filters-reset ignore ${enabled ? "" : "disabled"}`, onClick: (e) => onClean({ app, group }), children: [
    /* @__PURE__ */ jsx("span", { children: resetLabel }),
    /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Icon, { name: "undo alternate", className: "custom-undo-icon" }) })
  ] });
};
const mapStateToProps = (state, ownProps) => {
  const {
    "data-group": group,
    "data-app": app = "csv"
  } = ownProps;
  return {
    appliedFilters: state.getIn(["data", "filters", app, group]) ? state.getIn(["data", "filters", app, group]).toJS() : {},
    initialFilters: state.getIn(["data", "filters", "initial", app, group]) ? state.getIn(["data", "filters", "initial", app, group]).toJS() : {}
  };
};
const mapActionCreators = {
  onClean: cleanFilter
};
const index = connect_default(mapStateToProps, mapActionCreators)(FiltersResetComponent);
export {
  index as default
};
