import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { useState, useRef } from "react";
import { Segment, Header, Button, Container } from "semantic-ui-react";
import { D as DataProvider, a as DataConsumer } from "./DataConsumer-Bpiyfpil.js";
import "react-compiler-runtime";
import { e as connect_default, f as cleanFilter, b as PostContent } from "./server-build-C_g_IF5C.js";
import { sequentialColorInterpolators, colorSchemes, isSequentialColorScheme, isCategoricalColorScheme } from "@nivo/colors";
import * as d3 from "d3";
import { ResponsiveSankey } from "@nivo/sankey";
import { injectIntl } from "react-intl";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import template from "string-template";
import Papa from "papaparse";
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
import "@devgateway/customizer";
import "@reduxjs/toolkit";
import "@artsy/fresnel";
import "clsx";
import "semantic-ui-react/dist/commonjs/lib/index.js";
import "query-string";
class Colors {
  constructor(colorBy, scheme, data, keys, indexBy) {
    this._colorBy = colorBy;
    this._scheme = scheme;
    this._data = data;
    this._keys = keys;
    this._indexBy = indexBy;
    this._domain = [];
    this._color = null;
  }
  get domain() {
    return this._domain;
  }
  get color() {
    return this._color;
  }
  get maxValue() {
    return this.domain && this.domain.length > 0 ? this.domain[1] : 0;
  }
  get minValue() {
    return this.domain && this.domain.length > 0 ? this.domain[0] : 0;
  }
  get colorBy() {
    return this._colorBy;
  }
  get scheme() {
    return this._scheme;
  }
  get data() {
    return this._data;
  }
  get keys() {
    return this._keys;
  }
  get indexBy() {
    return this._indexBy;
  }
  getColor(id, datum) {
  }
  getColorByIndex(value) {
  }
  getColorByKey(value) {
  }
  getColorByValue(value) {
    return this.color ? this.color(value) : null;
  }
}
const DEFAULT_SYSTEM_COLOR = "#9F9F9F";
class SystemColors extends Colors {
  constructor(app, type, colorBy, scheme, data, keys, indexBy, dimensionsMetadata, measuresMetadata, locale) {
    super(colorBy, scheme, data, keys, indexBy);
    this.colorMap = {};
    this._colorBy = type == "line" ? "id" : colorBy;
    if (this._indexBy && dimensionsMetadata) {
      [...dimensionsMetadata].forEach((c) => {
        if (c && c.items) {
          c.items.forEach((s) => {
            if (locale && s.labels && s.labels[locale.toUpperCase()]) {
              this.colorMap[s.labels[locale.toUpperCase()]] = s.categoryStyle;
            } else {
              this.colorMap[s.value] = s.categoryStyle;
            }
          });
        }
      });
    }
    if (measuresMetadata) {
      [...measuresMetadata].forEach((c) => {
        if (c && c.styles) {
          if (locale && c.labels && c.labels[locale.toUpperCase()]) {
            this.colorMap[c.labels[locale.toUpperCase()]] = c.styles;
          } else {
            this.colorMap[c.label] = c.styles;
          }
        }
      });
    }
  }
  getColor(id, datum) {
    if (this._colorBy === "index") {
      return this.colorMap[datum[this._indexBy]] ? this.colorMap[datum[this._indexBy]].color : DEFAULT_SYSTEM_COLOR;
    } else {
      return this.colorMap[id] ? this.colorMap[id].color : DEFAULT_SYSTEM_COLOR;
    }
  }
  getColorByIndex(value) {
    return this.colorMap[value] ? this.colorMap[value].color : DEFAULT_SYSTEM_COLOR;
  }
  getColorByKey(value) {
    return this.colorMap[value] ? this.colorMap[value].color : DEFAULT_SYSTEM_COLOR;
  }
}
class PlainColor extends Colors {
  constructor(color) {
    super();
    this._color = color;
  }
  getColor(id, datum) {
    return this._color;
  }
  getColorByIndex(value) {
    return this._color;
  }
  getColorByKey(value) {
    return this._color;
  }
}
class CustomColors extends Colors {
  constructor(app, type, colorBy, scheme, data, dimensionsMetadata, measuresMetadata, keys, indexBy, manualColors, locale, overallLabel, customLabels) {
    super(colorBy, scheme, data, keys, indexBy);
    this._manualColor = {};
    this._manualColor[overallLabel] = manualColors ? manualColors["Overall"] : null;
    if (app != "csv") {
      const mapByDimension = (whichDimension2) => {
        const selectedDimension = [...dimensionsMetadata][whichDimension2];
        if (selectedDimension) {
          items = selectedDimension.items;
        }
        if (manualColors != null && manualColors != void 0) {
          Object.keys(manualColors).forEach((k) => {
            const vals = items.filter((i) => i.code === k);
            if (vals.length > 0 && vals[0].labels) {
              let translated;
              if (locale) {
                translated = vals[0].labels[locale.toUpperCase()];
              }
              if (translated) {
                this._manualColor[translated] = manualColors[k];
              } else {
                this._manualColor[vals[0].value] = manualColors[k];
              }
            }
          });
        }
      };
      const mapByMeasure = () => {
        items = measuresMetadata;
        Object.keys(manualColors).forEach((k) => {
          const vals = [...items].filter((i) => i.value === k);
          if (vals.length > 0 && vals[0].labels) {
            const customLabel = customLabels[k];
            if (customLabels && customLabel) {
              this._manualColor[customLabel] = manualColors[k];
            }
            let translated;
            if (locale) {
              translated = vals[0].labels[locale.toUpperCase()];
            }
            if (translated) {
              this._manualColor[translated] = manualColors[k];
            } else {
              this._manualColor[vals[0].label] = manualColors[k];
            }
          }
        });
      };
      const mapByKeys = () => {
        Object.keys(manualColors).forEach((k) => {
          this._manualColor[k] = manualColors[k];
        });
      };
      let items = [];
      const whichDimension = type == "line" ? 1 : colorBy === "index" ? 0 : 1;
      if (!dimensionsMetadata && !measuresMetadata) {
        mapByKeys();
      } else if (!dimensionsMetadata) {
        mapByMeasure();
      } else if (dimensionsMetadata.size == 1 && whichDimension == 1) {
        if (indexBy == "measure") {
          mapByDimension(0);
        } else {
          mapByMeasure();
        }
      } else {
        mapByDimension(whichDimension);
      }
    } else {
      this._manualColor = manualColors;
    }
  }
  getColor(id, datum) {
    if (this.colorBy === "index") {
      const color = this._manualColor[id] || this._manualColor[datum[this.indexBy]];
      return color ? color : "#5555";
    }
    if (this.colorBy === "id") {
      return this._manualColor[id] ? this._manualColor[id] : "#5555";
    }
    return "#5555";
  }
  getColorByIndex(value) {
  }
  getColorByKey(value) {
    return this._manualColor[value] ? this._manualColor[value] : "#5555";
  }
}
class SequentialColors extends Colors {
  constructor(colorBy, scheme, data, keys, indexBy) {
    super(colorBy, scheme, data, keys, indexBy);
    if (colorBy === "index") {
      this._domain = [0, this.data.length];
    }
    if (colorBy === "id") {
      this._domain = [0, this.keys.length];
    }
    if (colorBy === "values") {
      const values = data.map((d) => keys.map((k) => d[k])).flatMap((d) => d).filter((n) => n != void 0);
      this._domain = [Math.min(...values), Math.max(...values)];
    }
    const interpolator = sequentialColorInterpolators[this.scheme];
    this._color = d3.scaleSequential(interpolator);
    this._color.domain(this._domain);
  }
  getColor(id, datum) {
    if (this.colorBy === "index") {
      const indexes = this.data.map((d) => d[this.indexBy]);
      return this.color(indexes.indexOf(datum[this.indexBy]));
    }
    if (this.colorBy === "id") {
      return this.color(this.keys.indexOf(id));
    }
    if (this.colorBy === "values") {
      return this.color(datum[id]);
    }
  }
  getColorByIndex(value) {
    const indexes = this.data.map((d) => d[this.indexBy]);
    return this.color(indexes.indexOf(value));
  }
  getColorByKey(value) {
    return this.color(this.keys.indexOf(value));
  }
}
class CategoricalColors extends Colors {
  constructor(colorBy, scheme, data, keys, indexBy) {
    super(colorBy, scheme, data, keys, indexBy);
    if (colorBy === "index") {
      this._domain = this.data.map((d) => d[this.indexBy]);
    }
    if (colorBy === "id") {
      this._domain = this.keys;
    }
    if (colorBy === "values") {
      const values = data.map((d) => keys.map((k) => d[k])).flatMap((d) => d).filter((n) => n != void 0);
      this._domain = [Math.min(...values), Math.max(...values)];
    }
    this._color = d3.scaleOrdinal(colorSchemes[this.scheme]);
    this._color.domain(this._domain);
  }
  getColorByValue(value) {
    if (this.colorBy === "values") {
      return "gray";
    }
    return this.color(value);
  }
  getColor(id, datum) {
    if (this.colorBy === "index") {
      return this.color(datum[this.indexBy]);
    }
    if (this.colorBy === "id") {
      return this.color(id);
    }
    return "gray";
  }
  getColorByIndex(value) {
    if (this.colorBy === "values") {
      return "gray";
    }
    return this.color(value);
  }
  getColorByKey(value) {
    if (this.colorBy === "values") {
      return "gray";
    }
    return this.color(value);
  }
}
const ColorProvider = ({
  app,
  type,
  colorBy,
  scheme,
  barColor,
  manualColors,
  locale,
  overallLabel,
  customLabels,
  options: { data, keys, indexBy, dimensionsMetadata, measuresMetadata },
  children
}) => {
  let colorManager;
  if (data) {
    if (scheme === "system") {
      colorManager = new SystemColors(app, type, colorBy, scheme, data, keys, indexBy, dimensionsMetadata, measuresMetadata, locale);
    } else if (scheme === "plain_color") {
      colorManager = new PlainColor(barColor);
    } else if (scheme === "manual") {
      colorManager = new CustomColors(app, type, colorBy, scheme, data, dimensionsMetadata, measuresMetadata, keys, indexBy, manualColors, locale, overallLabel, customLabels);
    } else {
      if (isSequentialColorScheme(scheme)) {
        colorManager = new SequentialColors(colorBy, scheme, data, keys, indexBy);
      }
      if (isCategoricalColorScheme(scheme)) {
        colorManager = new CategoricalColors(colorBy, scheme, data, keys, indexBy);
      }
    }
    return /* @__PURE__ */ jsx("div", { children: React__default.Children.map(children, (child) => {
      if (React__default.isValidElement(child)) {
        return React__default.cloneElement(child, {
          colorGenerator: colorManager
        });
      }
      return child;
    }) });
  } else {
    return null;
  }
};
const Messages = (props) => {
  const { data, noDataMsg, app, group, onClean, editing } = props;
  if (data && data.itemsSize && data.itemsSize > 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Segment, { placeholder: true, className: "chartNoDataMessage", children: [
    /* @__PURE__ */ jsxs(Header, { icon: true, children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          className: "noDataSVG",
          viewBox: "0 0 512 512",
          children: /* @__PURE__ */ jsx("path", { d: "M403.7,96.3c-41-41-95.6-63.6-153.7-63.6c-58,0-112.6,22.6-153.7,63.6c-41,41-63.6,95.6-63.6,153.7\n                        c0,58,22.6,112.6,63.6,153.7c41,41,95.6,63.6,153.7,63.6c58,0,112.6-22.6,153.7-63.6c41-41,63.7-95.6,63.7-153.7\n                        C467.3,192,444.7,137.4,403.7,96.3z M57.7,250C57.7,144,144,57.7,250,57.7c37.2,0,72,10.6,101.5,29l-63,77.1c-2.8-3.5-6-6.8-9.5-10\n                        c-18.2-16.7-39.9-24.5-65.1-23.5c-25.2,1.1-46.2,10.7-62.9,28.9c-16.7,18.2-24.5,39.9-23.5,65.1c1.1,25.2,10.7,46.2,28.9,62.9\n                        c6.2,5.7,12.8,10.3,19.8,14l-66,80.8C77.7,347.6,57.7,301.1,57.7,250z M280.2,217.8c0.7,17.3-4.7,32.3-16.3,45\n                        c-10.9,11.9-24.3,18.5-40.2,19.9l56.3-68.9C280.1,215.2,280.2,216.5,280.2,217.8z M194.6,278.8c-6.9-2.7-13.3-6.8-19.2-12.2\n                        c-12.7-11.6-19.4-26.1-20.1-43.5c-0.7-17.3,4.7-32.4,16.3-45c11.6-12.7,26.1-19.4,43.5-20.1c17.3-0.7,32.3,4.7,45,16.3\n                        c4,3.7,7.3,7.6,10.1,11.8L194.6,278.8z M250,442.3c-46,0-88.2-16.2-121.3-43.2l73.1-89.5c6.4,1,13,1.4,19.9,1.1\n                        c10.2-0.4,19.7-2.5,28.6-6.1c8.9-3.6,16.7-8.4,23.4-14.2l81,74.4c2.6,2.4,6,3.6,9.3,3.6c3.7,0,7.4-1.5,10.1-4.5\n                        c5.1-5.6,4.8-14.3-0.8-19.4l-81-74.4c5.3-7.2,9.3-15.3,12.2-24.5c2.8-9.2,4.1-18.8,3.6-29c-0.5-10.7-2.5-20.6-6-29.8l69.8-85.5\n                        c43,35.3,70.5,88.8,70.5,148.7C442.3,356,356,442.3,250,442.3z" })
        }
      ),
      editing && /* @__PURE__ */ jsx("div", { className: "WPnoDataMsg", children: "Not enough parameters to render the chart" }),
      /* @__PURE__ */ jsx("div", { className: "WPnoDataMsg", children: noDataMsg })
    ] }),
    /* @__PURE__ */ jsx(Button, { onClick: (e) => onClean({ app, group }), children: "Clear Filter" })
  ] });
};
const mapActionCreators$1 = {
  onClean: cleanFilter
};
const Messages$1 = connect_default(null, mapActionCreators$1)(Messages);
const percentExpresion = /(\+?\%)[\(]([A-z0-9,.,-]+)\)/gi;
const numericExpresion = /(\+?\#)[\(]([A-z0-9,.,-]+)\)/gi;
const compactExpresion = /(\+?\#C)[\(]([A-z0-9,.,-]+)\)/gi;
const applyFormat = (expresion, str, style, isPercent, intl, container) => {
  let result;
  let str1 = str;
  while ((result = expresion.exec(str)) !== null) {
    const arg = result[2];
    const numFormat = result[1];
    const format = (n, d = 2) => {
      return intl.formatNumber(isPercent ? n / 100 : n, {
        maximumFractionDigits: d,
        ...style,
        signDisplay: numFormat && numFormat.startsWith("+") ? "never" : "auto"
      });
    };
    const formatted = format.apply(void 0, arg.split(","));
    str1 = str1.replaceAll(result[0], formatted);
  }
  return str1;
};
const formatContent = (tooltip, variables, intl, tooltipEnableMarkdown) => {
  let str = tooltipEnableMarkdown ? template(tooltip, variables) : template(tooltip, variables).replace(/(?:\r\n|\r|\n)/g, "<br>");
  str = applyFormat(percentExpresion, str, { style: "percent" }, true, intl);
  str = applyFormat(numericExpresion, str, { style: "decimal" }, false, intl);
  str = applyFormat(compactExpresion, str, { notation: "compact" }, false, intl);
  return str;
};
const ChartTooltip = ({ tooltip, d, intl, tooltipEnableMarkdown }) => {
  const { color, data } = d.datum || d.point || d;
  const current = d.value || (d.datum ? d.datum.value : null) || (d.point ? d.point.data.y : null);
  if (data) {
    const vars = data.variables ? data.variables[d.id] || data.variables : data;
    const params = { field: d.point ? d.point.serieId : d.id, ...vars, value: current };
    if (data.measureFieldName) {
      params.populationValue = data.variables[data.measureFieldName + "Population"];
    }
    const str = formatContent(tooltip, params, intl, tooltipEnableMarkdown);
    if (tooltipEnableMarkdown) {
      return /* @__PURE__ */ jsx(ReactMarkdown, { children: str, remarkPlugins: [remarkGfm], rehypePlugins: [rehypeRaw], className: "chart tooltip" });
    } else {
      return /* @__PURE__ */ jsx("div", { className: "chart tooltip", children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: str } }) });
    }
  } else {
    return /* @__PURE__ */ jsx("div", {});
  }
};
const Chart$1 = (props) => {
  const {
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    options,
    intl,
    format,
    colors,
    height,
    showLegends,
    tickColor,
    colorGenerator,
    legendLabel,
    legendCheckBack,
    legendLabelBack,
    legendLabelColor,
    reverseLegend,
    measures,
    dimension1,
    dimension2,
    dimension3,
    mode,
    app,
    tooltipHTML,
    tooltip,
    filters,
    layout,
    group,
    noDataMessage,
    tooltipEnabled,
    tooltipEnableMarkdown,
    sort,
    nodeThickness,
    nodeOpacity,
    nodeHoverOpacity,
    nodeInnerPadding,
    nodeSpacing,
    nodeHoverOthersOpacity,
    nodeBorderWidth,
    nodeBorderRadius,
    linkOpacity,
    linkHoverOpacity,
    linkHoverOthersOpacity,
    linkContract,
    enableLinkGradient,
    enableLabels,
    labelPosition,
    labelPadding,
    useCustomLabelColor,
    labelTextColor,
    labelOrientation,
    legendPosition,
    useLabelBackground,
    useCheckBoxBackground
  } = props;
  const [filter, setFilter] = useState([]);
  const toggle = (id) => {
    const newFilter = filter.slice();
    if (newFilter.indexOf(id) > -1) {
      const index2 = newFilter.indexOf(id);
      newFilter.splice(index2, 1);
    } else {
      newFilter.push(id);
    }
    setFilter(newFilter);
  };
  const margins = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft };
  const legendTitle = () => {
    return /* @__PURE__ */ jsx(Fragment, { children: showLegends && legendLabel && /* @__PURE__ */ jsx("div", { className: "legend item", children: /* @__PURE__ */ jsx("label", { className: "legend-title", children: legendLabel }) }) });
  };
  const legendItems = () => {
    const chartLegends = props.options.data.nodes.slice();
    if (reverseLegend) {
      chartLegends.reverse();
    }
    return /* @__PURE__ */ jsx(Fragment, { children: showLegends && chartLegends.map((legend) => {
      const legendEnabled = filter.indexOf(legend.id) == -1;
      return /* @__PURE__ */ jsxs("div", { className: `legend item ${legendEnabled ? "" : "ignore"}`, onClick: () => toggle(legend.id), children: [
        useCheckBoxBackground && /* @__PURE__ */ jsx(
          "input",
          {
            className: legendEnabled ? "" : "ignore",
            type: "checkbox",
            checked: legendEnabled,
            readOnly: true,
            style: {
              backgroundColor: legend.color,
              color: "#000"
            }
          }
        ),
        !useCheckBoxBackground && /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: legendEnabled,
            readOnly: true,
            style: {
              color: "#000"
            }
          }
        ),
        useCheckBoxBackground && /* @__PURE__ */ jsx(
          "span",
          {
            className: "checkmark-with-bg",
            style: { backgroundColor: legend.color }
          }
        ),
        !useCheckBoxBackground && /* @__PURE__ */ jsx("span", { className: "checkmark" }),
        useLabelBackground && /* @__PURE__ */ jsx(
          "label",
          {
            className: legendEnabled ? "" : "ignore",
            style: {
              backgroundColor: legend.color,
              color: legendLabelColor
            },
            children: legend.id
          }
        ),
        !useLabelBackground && /* @__PURE__ */ jsx(
          "label",
          {
            className: legendEnabled ? "" : "ignore",
            style: {
              color: legendLabelColor
            },
            children: legend.id
          }
        )
      ] });
    }) });
  };
  let filteredData = { nodes: [], links: [] };
  console.log("sankey props ===>", props);
  if (props.options.data && props.options.data.nodes && props.options.data.nodes.length) {
    const { links, nodes } = props.options.data;
    nodes.forEach((node) => {
      node.color = colorGenerator.getColor(node.id);
    });
    const filteredLinks = links.filter((l) => filter.indexOf(l.source) == -1 && filter.indexOf(l.target) == -1) || [];
    const filteredNodes = nodes.filter((n) => filter.indexOf(n.id) == -1 && filteredLinks.find((fl) => fl.source == n.id || fl.target == n.id));
    filteredData = {
      links: filteredLinks,
      nodes: filteredNodes
    };
  }
  return /* @__PURE__ */ jsx("div", { style: { height }, children: /* @__PURE__ */ jsxs(Fragment, { children: [
    filteredData.nodes.length && filteredData.links.length ? /* @__PURE__ */ jsx(
      ResponsiveSankey,
      {
        data: filteredData,
        margin: margins,
        layout,
        align: "justify",
        sort,
        colors: { datum: "color" },
        nodeOpacity,
        nodeHoverOthersOpacity,
        nodeThickness,
        nodeSpacing,
        nodeBorderWidth,
        nodeBorderColor: {
          from: "color",
          modifiers: [
            [
              "darker",
              0.8
            ]
          ]
        },
        linkTooltip: (d) => {
          if (tooltipEnabled && tooltip && tooltip.trim().length > 0) {
            return /* @__PURE__ */ jsx(ChartTooltip, { intl, format, d, tooltip, tooltipEnableMarkdown });
          }
          return null;
        },
        enableLabels,
        linkHoverOpacity,
        nodeHoverOpacity,
        nodeInnerPadding,
        nodeBorderRadius,
        linkOpacity,
        linkHoverOthersOpacity,
        linkContract,
        enableLinkGradient,
        labelPosition,
        labelOrientation,
        labelPadding,
        labelTextColor: useCustomLabelColor ? labelTextColor : {
          from: "color",
          modifiers: [
            [
              "darker",
              1
            ]
          ]
        }
      }
    ) : /* @__PURE__ */ jsx(Fragment, {}),
    (legendPosition == "top" || legendPosition == "bottom") && /* @__PURE__ */ jsx("div", { className: `legends container has-standard-12-font-size  ${legendPosition}`, children: /* @__PURE__ */ jsxs("div", { className: "legend-sections", children: [
      /* @__PURE__ */ jsx("div", { className: "title-section", children: legendTitle() }),
      /* @__PURE__ */ jsx("div", { className: `legends container has-standard-12-font-size items-section`, children: legendItems() })
    ] }) }),
    (legendPosition == "right" || legendPosition == "left") && /* @__PURE__ */ jsxs("div", { className: `legends container has-standard-12-font-size  ${legendPosition}`, children: [
      legendTitle(),
      legendItems()
    ] })
  ] }) });
};
const SankeyChart = injectIntl(Chart$1);
const Chart = (props) => {
  const {
    parent,
    editing = false,
    unique,
    childContent,
    categories,
    injectedMeasures,
    "data-csv": csv = "",
    "data-no-data-message": noDataMsg = "No data matches your selection",
    "data-view-mode": editMode = "info",
    "data-height": height,
    "data-source": source,
    "data-dimension1": dimension1,
    "data-dimension2": dimension2,
    "data-dimension3": dimension3,
    "data-scheme": scheme = "nivo",
    "data-margin-left": marginLeft,
    "data-margin-top": marginTop,
    "data-margin-right": marginRight,
    "data-margin-bottom": marginBottom,
    "data-show-legends": showLegends,
    "data-legend-position": legendPosition,
    "data-app": app,
    "data-measures": measures = {},
    "data-format": format = "{}",
    "data-tooltip-html": tooltipHTML,
    "data-layout": layout,
    "data-group": group,
    "data-filters": filters = [],
    "data-no-data-message": noDataMessage,
    "data-legend-label": legendLabel,
    "data-tooltip-enabled": tooltipEnabled,
    "data-use-label-background": useLabelBackground,
    "data-use-check-box-background": useCheckBoxBackground,
    "data-legend-label-color": legendLabelColor,
    "data-tooltip-enable-markdown": tooltipEnableMarkdown,
    "data-reverse-legend": reverseLegend,
    "data-sort": sort,
    "data-node-thickness": nodeThickness,
    "data-node-opacity": nodeOpacity,
    "data-node-hover-opacity": nodeHoverOpacity,
    "data-node-inner-padding": nodeInnerPadding,
    "data-node-spacing": nodeSpacing,
    "data-node-hover-others-opacity": nodeHoverOthersOpacity,
    "data-node-border-width": nodeBorderWidth,
    "data-node-border-radius": nodeBorderRadius,
    "data-link-opacity": linkOpacity,
    "data-link-hover-opacity": linkHoverOpacity,
    "data-link-hover-others-opacity": linkHoverOthersOpacity,
    "data-link-contract": linkContract,
    "data-enable-link-gradient": enableLinkGradient,
    "data-enable-labels": enableLabels,
    "data-label-position": labelPosition,
    "data-label-padding": labelPadding,
    "data-use-custom-label-color": useCustomLabelColor,
    "data-label-text-color": labelTextColor,
    "data-label-orientation": labelOrientation,
    "data-manual-colors": manualColors = "{}"
  } = props;
  const locale = props.intl.locale;
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
  const getManualColor = () => {
    return parse(manualColors)[app];
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
  const colors = {
    scheme
  };
  const contentHeight = editing ? height - 80 : height - 40;
  const legends = {};
  const chartProps = {
    app,
    layout,
    showLegends: showLegends == true || showLegends == "true",
    legendLabel,
    marginLeft: parseInt(marginLeft),
    marginTop: parseInt(marginTop),
    marginRight: parseInt(marginRight),
    marginBottom: parseInt(marginBottom),
    height: `${contentHeight}px`,
    legendPosition,
    legends,
    tooltip: tooltipEnableMarkdown == true || tooltipEnableMarkdown == "true" ? decode(tooltipHTML) : decode(tooltipHTML).replace(/\r\n/g, "<hr/>").replace(/[\r\n]/g, "<hr/>"),
    colors,
    format: numberFormat,
    categories,
    legendLabelColor: decodeURIComponent(legendLabelColor),
    tooltipEnabled: tooltipEnabled == true || tooltipEnabled == "true",
    tooltipEnableMarkdown: tooltipEnableMarkdown == true || tooltipEnableMarkdown == "true",
    reverseLegend: reverseLegend == true || reverseLegend == "true",
    sort,
    nodeThickness,
    nodeOpacity,
    nodeHoverOpacity,
    nodeInnerPadding,
    nodeSpacing,
    nodeHoverOthersOpacity,
    nodeBorderWidth,
    nodeBorderRadius: parseInt(nodeBorderRadius),
    linkOpacity,
    linkHoverOpacity,
    linkContract,
    enableLinkGradient: enableLinkGradient == true || enableLinkGradient == "true",
    linkHoverOthersOpacity,
    enableLabels: enableLabels == true || enableLabels == "true",
    labelPosition,
    labelPadding,
    useCustomLabelColor: useCustomLabelColor == true || useCustomLabelColor == "true",
    labelTextColor,
    labelOrientation,
    useLabelBackground: useLabelBackground == true || useLabelBackground == "true",
    useCheckBoxBackground: useCheckBoxBackground == true || useCheckBoxBackground == "true"
  };
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
  if (dimension2 != "none") {
    dimensions.push(dimension2);
  }
  if (dimension3 != "none") {
    dimensions.push(dimension3);
  }
  if (app != "csv") {
    if (!dimensions.length || !parse(measures)[0]) {
      showNotEnoughParameters = true;
    }
  } else {
    if (csv.length == 0) {
      showNotEnoughParameters = true;
    }
  }
  return /* @__PURE__ */ jsx("div", { ref, children: /* @__PURE__ */ jsxs(Container, { className: "chart container", style: { "minHeight": height + "px" }, fluid: true, children: [
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
        children: /* @__PURE__ */ jsxs(Container, { style: { "height": `${contentHeight}px` }, className: "body", fluid: true, children: [
          showNotEnoughParameters && /* @__PURE__ */ jsx(Messages$1, { editing }),
          !showNotEnoughParameters && /* @__PURE__ */ jsxs(DataConsumer, { children: [
            /* @__PURE__ */ jsx(Messages$1, { app, group, noDataMsg, children: " " }),
            /* @__PURE__ */ jsx(
              DataFrame,
              {
                locale,
                colorBy: "id",
                dimensions: [...dimensions],
                sort,
                csv,
                app,
                measure: parse(measures)[0] || null,
                children: /* @__PURE__ */ jsx(
                  ColorProvider,
                  {
                    app,
                    locale,
                    manualColors: getManualColor(),
                    colorBy: "id",
                    scheme,
                    barColor: chartProps.barColor,
                    children: /* @__PURE__ */ jsx(SankeyChart, { ...chartProps, dimensions, measure: parse(measures)[0] || null })
                  }
                )
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    childContent && viewMode == "info" && /* @__PURE__ */ jsx(Container, { fluid: true, style: { "height": contentHeight + "px" }, className: "body", children: /* @__PURE__ */ jsx(PostContent, { post: { content: { rendered: childContent } } }) })
  ] }) });
};
const DataFrame = (props) => {
  const { children, csv, app } = props;
  let chartData = { nodes: [], links: [] };
  let options = {
    indexBy: "",
    keys: chartData.nodes.map((n) => n.id),
    data: chartData
  };
  if (app != "csv") {
    const getData = (props2) => {
      const { data, dimensions, measure } = props2;
      const nodes = [];
      const links = [];
      const nodeValue = {};
      nodeValue[data.type] = data.value;
      fillFormChildren(data.children, nodes, links, null, measure, nodeValue);
      return { nodes, links };
    };
    const fillFormChildren = (children2 = [], nodes, links, source, measure, parentNodeValue) => {
      children2.forEach((c) => {
        const nodeValue = {};
        nodeValue[c.type] = c.value;
        if (!nodes.find((n) => n.id === c.value)) {
          nodes.push({ id: c.value });
        }
        if (source) {
          const link = links.find((l) => l.source === source && l.target === c.value);
          if (link) {
            link.value = link.value + c[measure];
          } else {
            const data = { ...c, ...nodeValue, ...parentNodeValue };
            links.push({ source, target: c.value, value: c[measure], data });
          }
        }
        if (c.children && c.children.length > 0) {
          fillFormChildren(c.children, nodes, links, c.value, measure, nodeValue);
        }
      });
    };
    chartData = getData(props);
    options = {
      indexBy: "",
      keys: chartData.nodes.map((n) => n.id),
      data: chartData
    };
  } else {
    const dataParsed = Papa.parse(csv, { header: true, dynamicTyping: true });
    const sourceList = dataParsed.meta.fields;
    const targetParameter = sourceList.shift();
    const targetList = dataParsed.data.map((d) => d[targetParameter]);
    const nodes = [...sourceList.map((s) => {
      return { id: s };
    }), ...targetList.map((s) => {
      return { id: s };
    })];
    const links = [];
    dataParsed.data.forEach((d) => {
      sourceList.forEach((source) => {
        links.push({ source, target: d[targetParameter], value: d[source] });
      });
    });
    options = {
      indexBy: "",
      keys: nodes.map((n) => n.id),
      data: { nodes, links }
    };
  }
  return React__default.Children.map(children, (child) => React__default.cloneElement(child, { options }));
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
