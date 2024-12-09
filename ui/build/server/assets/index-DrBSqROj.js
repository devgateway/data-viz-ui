import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Container } from "semantic-ui-react";
import { D as DataProvider, a as DataConsumer } from "./DataConsumer-Bpiyfpil.js";
import "react-compiler-runtime";
import { e as connect_default, b as PostContent } from "./server-build-C_g_IF5C.js";
import "react-intl";
import "./DataContext-BNxY-bMy.js";
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
const Chart = (props) => {
  const {
    editing = false,
    unique,
    intl,
    childContent,
    "data-csv": csv = "",
    "data-no-data-message": noDataMsg = "No data matches your selection",
    "data-view-mode": editMode = "info",
    "data-height": height,
    "data-dimension1": dimension1,
    "data-app": app,
    "data-measures": measures = {},
    "data-format": format = "{}",
    "data-group": group,
    "data-filters": filters = [],
    "data-value-type": valueType
  } = props;
  const locale = intl.locale;
  const ref = useRef(null);
  const decode = (value) => {
    if (editing) {
      return value;
    }
    return decodeURIComponent(value);
  };
  const parse = (value) => {
    try {
      return JSON.parse(decode(value));
    } catch (error) {
      console.error("error parsing value:" + value);
    }
    return null;
  };
  const formatObject = parse(format);
  const numberFormat = formatObject ? {
    style: formatObject.style === "compacted" ? "decimal" : formatObject.style,
    notation: formatObject.style === "compacted" ? "compact" : "standard",
    currency: formatObject.currency,
    minimumFractionDigits: parseInt(formatObject.minimumFractionDigits),
    maximumFractionDigits: parseInt(formatObject.maximumFractionDigits)
  } : {
    notation: "standard",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };
  const [mode, setMode] = useState(editMode);
  const viewMode = editing ? editMode : mode;
  const contentHeight = editing ? height - 80 : height - 40;
  const params = {};
  const ff = parse(filters) || {};
  if (ff && ff.forEach) {
    ff.forEach((f) => {
      if (f.value != null && f.value.filter((v) => v != null && v.toString().trim() != "").length > 0)
        params[f.param] = f.value;
    });
  }
  let showNotEnoughParameters = false;
  const dimensions = [];
  if (dimension1 != "none") {
    dimensions.push(dimension1);
  }
  if (app != "csv") {
    if (!dimensions.length || !parse(measures)[0]) {
      showNotEnoughParameters = true;
    }
  }
  return /* @__PURE__ */ jsx("div", { ref, children: /* @__PURE__ */ jsxs(Container, { className: "chart container data-label", style: { "height": height + "px" }, fluid: true, children: [
    /* @__PURE__ */ jsx(
      DataProvider,
      {
        style: { "height": `${contentHeight}px` },
        params,
        app,
        group,
        csv,
        editing,
        store: [app, unique, ...dimensions],
        source: dimensions.join("/"),
        children: /* @__PURE__ */ jsx(Container, { style: { "height": `${contentHeight}px` }, className: "body data-label-body", fluid: true, children: !showNotEnoughParameters && /* @__PURE__ */ jsx(DataConsumer, { children: /* @__PURE__ */ jsx(
          DataFrame,
          {
            locale,
            dimensions: [...dimensions],
            valueType,
            intl,
            app,
            format: numberFormat,
            measure: parse(measures)[0] || null
          }
        ) }) })
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    childContent && viewMode == "info" && /* @__PURE__ */ jsx(Container, { fluid: true, style: { "height": contentHeight + "px" }, className: "body data-label-body", children: /* @__PURE__ */ jsx(PostContent, { post: { content: { rendered: childContent } } }) })
  ] }) });
};
const DataFrame = (props) => {
  const { valueType, measure, data, format, intl } = props;
  let formattedLabel = "N/A";
  if (valueType === "first") {
    const labelData = data.children[0][measure];
    formattedLabel = intl.formatNumber(format.style === "percent" ? labelData / 100 : labelData, { ...format });
  } else if (valueType === "total") {
    const labelData = data[measure];
    formattedLabel = intl.formatNumber(format.style === "percent" ? labelData / 100 : labelData, { ...format });
  } else if (valueType === "min" && !isNaN(data[measure])) {
    const labelData = Math.min(...data.children.map((d) => d[measure]));
    formattedLabel = intl.formatNumber(format.style === "percent" ? labelData / 100 : labelData, { ...format });
  } else if (valueType === "max" && !isNaN(data[measure])) {
    const labelData = Math.max(...data.children.map((d) => d[measure]));
    formattedLabel = intl.formatNumber(format.style === "percent" ? labelData / 100 : labelData, { ...format });
  } else if (valueType === "avg" && !isNaN(data[measure])) {
    const values = data.children.map((d) => d[measure]);
    const labelData = values.reduce((a, b) => a + b, 0) / values.length;
    formattedLabel = intl.formatNumber(format.style === "percent" ? labelData / 100 : labelData, { ...format });
  }
  return /* @__PURE__ */ jsx("div", { children: formattedLabel });
};
const mapStateToProps = (state, ownProps) => {
  const { "data-app": app, "data-group": group } = ownProps;
  const injectedMeasures = state.getIn(["data", "measures", app, group]);
  if (injectedMeasures) {
    return {
      "injectedMeasures": injectedMeasures
    };
  } else {
    return {};
  }
};
const mapActionCreators = {};
const index = connect_default(mapStateToProps, mapActionCreators)(Chart);
export {
  index as default
};
