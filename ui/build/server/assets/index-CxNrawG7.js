import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { Children, useRef, useState, useEffect } from "react";
import { e as connect_default } from "./server-build-C_g_IF5C.js";
import { p as parse, c as compareJsonProps, d as decode } from "./parseUtils-DYrYiyKB.js";
import * as d3 from "d3";
import * as ReactDOM from "react-dom";
import template from "string-template";
import { D as DataProvider, a as DataConsumer } from "./DataConsumer-Bpiyfpil.js";
import { injectIntl, FormattedMessage } from "react-intl";
import { Icon, Popup } from "semantic-ui-react";
import { symbol } from "prop-types";
import Papa from "papaparse";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "use-sync-external-store/with-selector.js";
import "react-compiler-runtime";
import "react-dom/client";
import "immutable";
import "@devgateway/customizer";
import "@reduxjs/toolkit";
import "@artsy/fresnel";
import "clsx";
import "semantic-ui-react/dist/commonjs/lib/index.js";
import "query-string";
import "./DataContext-BNxY-bMy.js";
class Map extends React__default.Component {
  constructor(props) {
    super(props);
    this.svgRef = React__default.createRef();
    this.dragged = this.dragged.bind(this);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.projection !== this.props.projection) {
      const path = d3.geoPath().projection(this.props.projection);
      this.setState({ projection: this.props.projection, path });
    }
    const { rotationEnabled } = this.props;
    const group = d3.select(this.svgRef.current).datum({
      x: 0,
      y: 0
    });
    if (rotationEnabled) {
      group.call(d3.drag().on("drag", this.dragged));
    } else {
      group.on(".drag", null);
    }
  }
  componentDidMount() {
    const { rotationEnabled } = this.props;
    const group = d3.select(this.svgRef.current).datum({
      x: 0,
      y: 0
    });
    if (rotationEnabled) {
      group.call(d3.drag().on("drag", this.dragged));
    }
  }
  dragged(event, d) {
    const origin = {
      x: 0,
      y: 0
    };
    const { projection, width, height } = this.props;
    const λ = d3.scaleLinear().domain([-width, width]).range([-180, 180]);
    const φ = d3.scaleLinear().domain([-height, height]).range([90, -90]);
    const r = {
      x: λ(d.x = event.x),
      y: φ(d.y = event.y)
    };
    projection.rotate([origin.x + r.x, origin.y + r.y]);
    const path = d3.geoPath().projection(projection);
    this.setState({ projection, path });
  }
  render() {
    const { projection, width, height, path } = this.props;
    return /* @__PURE__ */ jsx("svg", { viewBox: `0 0 ${width} ${height}`, className: "map", height, width, ref: this.svgRef, children: projection ? this.props.children.map((child) => React__default.cloneElement(child, {
      ...this.props,
      svg: this.svgRef.current,
      ...this.state
    })) : null });
  }
}
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
const formatContent = (tooltip, variables, intl) => {
  let str = template(tooltip, { ...variables, ...variables.meta }).replace(/(?:\r\n|\r|\n)/g, "<br>");
  str = applyFormat(percentExpresion, str, { style: "percent" }, true, intl);
  str = applyFormat(numericExpresion, str, { style: "decimal" }, false, intl);
  str = applyFormat(compactExpresion, str, { notation: "compact" }, false, intl);
  return str;
};
const Tooltip = ({ tooltip, data, intl }) => {
  if (data) {
    const str = formatContent(tooltip, data, intl);
    return /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: str } });
  } else {
    return /* @__PURE__ */ jsx("div", {});
  }
};
let BaseLayer$1 = class BaseLayer extends React__default.Component {
  constructor() {
    super();
    this.loadJSON = this.loadJSON.bind(this);
    this.create = this.create.bind(this);
    this.createLayer = this.createLayer.bind(this);
    this.loadJSON = this.loadJSON.bind(this);
    this.showToolTip = this.showToolTip.bind(this);
    this.moveToolTip = this.moveToolTip.bind(this);
    this.gRef = React__default.createRef();
    this.state = { json: null };
  }
  loadJSON(url) {
    return new Promise((resolve, reject) => {
      d3.json(url).then((function(us, error) {
        if (error) {
          console.log("Error loading JSON: " + error);
        }
        resolve(us);
      }).bind(this));
    });
  }
  createLayer(json) {
    alert("please implement createLayer");
  }
  create() {
    const {
      file
    } = this.props;
    if (this.state.json) {
      this.createLayer(this.state.json);
    } else {
      this.loadJSON(file).then((json) => {
        this.createLayer(json);
      });
    }
  }
  showToolTip(content, data, color, event) {
    if (data) {
      const tip = d3.select("body").append("div").attr("class", "d3MapTooltip").style("position", "absolute").html("").style("left", event.pageX + 15 + "px").style("top", event.pageY - 50 + "px");
      ReactDOM.render(/* @__PURE__ */ jsx(
        Tooltip,
        {
          intl: this.props.intl,
          tooltip: content,
          data,
          tooltipEnableMarkdown: false
        }
      ), tip._groups[0][0]);
    }
  }
  moveToolTip(event) {
    d3.select(".d3MapTooltip").style("left", event.pageX + 15 + "px").style("top", event.pageY - 50 + "px");
  }
  hiddenToolTip(event) {
    d3.selectAll(".d3MapTooltip").remove();
  }
  componentDidMount() {
    this.create();
    if (this.props.zoom && this.props.current) {
      this.props.zoom.current.fullView();
    }
  }
  render() {
    this.props;
    return /* @__PURE__ */ jsx("g", { className: "layer", ref: this.gRef });
  }
};
class BaseLayer2 extends BaseLayer$1 {
  constructor() {
    super();
    this.gRef = React__default.createRef();
  }
  createPaths(json) {
    const {
      path,
      fillColor,
      borderColor,
      projection
    } = this.props;
    if (this.gRef && this.gRef.current) {
      this.g = d3.select(this.gRef.current);
      d3.select(this.gRef.current.parentElement);
      this.g.attr("class", "base-layer");
      this.g.selectAll("path").remove();
      this.g.selectAll(".label").remove();
      this.g.selectAll("path").data(json.features).enter().append("path").attr("fill", fillColor).attr("stroke", borderColor).attr("id", "state-borders").attr("d", path);
      if (this.props.transform) {
        this.g.attr("transform", this.props.transform);
      }
    }
  }
  createLabels(json) {
    const {
      path,
      labelFilter = [],
      labelSettings = {},
      labelField,
      labelFontSize,
      labelColor,
      projection
    } = this.props;
    if (this.gRef && this.gRef.current) {
      this.g = d3.select(this.gRef.current);
      const k = this.props.transform ? this.props.transform.k : 1;
      this.g.selectAll(".label").data(json.features.filter((f) => {
        return labelFilter.indexOf(f.properties[labelField]) == -1;
      })).enter().append("text").attr("class", "label").attr("font-size", (d) => {
        return Math.min(labelFontSize * 1 / k, labelFontSize / 2) + "px";
      }).text(function(d) {
        return d.properties[labelField];
      }).attr("color", labelColor).attr("fill", labelColor).attr("transform", function(d) {
        const rotation = labelSettings[d.properties[labelField] + "_rotation"] || 0;
        const offsetX = labelSettings[d.properties[labelField] + "_offsetX"] || 0;
        const offsetY = labelSettings[d.properties[labelField] + "_offsetY"] || 0;
        const x = path.centroid(d)[0] + offsetX / projection.scale();
        const y = path.centroid(d)[1] + offsetY / projection.scale();
        return "translate(" + [x, y] + "),rotate(" + (rotation ? rotation : 0) + ")";
      });
      if (this.props.transform) {
        this.g.attr("transform", this.props.transform);
      }
    }
  }
  createLayer(json) {
    this.createPaths(json);
    this.createLabels(json);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      name,
      file,
      path,
      transform,
      labelFilter = [],
      labelField,
      labelFontSize,
      labelColor,
      fillColor,
      borderColor,
      projection,
      update
    } = this.props;
    if (file !== prevProps.file || path !== prevProps.path || projection !== prevProps.projection || transform !== prevProps.transform || labelFilter !== prevProps.labelFilter || labelField !== prevProps.labelField || labelFontSize !== prevProps.labelFontSize || labelColor !== prevProps.labelColor || fillColor !== prevProps.fillColor || borderColor !== prevProps.borderColor) {
      this.create();
    }
  }
  render() {
    this.props;
    return /* @__PURE__ */ jsx("g", { className: "base", ref: this.gRef });
  }
}
class BreaksStyles {
  constructor(props) {
    const { breaks, defaultFillColor, defaultBorderColor, defaultSize } = props;
    this.breaks = breaks;
    this.defaultFillColor = defaultFillColor;
    this.defaultBorderColor = defaultBorderColor;
    this.defaultSize = defaultSize;
    const lessThan = breaks.filter((b) => b.type !== "graterThan");
    const graterThanStyles = breaks.filter((b) => b.type === "graterThan");
    if (graterThanStyles.length > 0) {
      this.graterThanStyle = graterThanStyles[0];
    }
    this.domain = lessThan.map((d) => Number(d.end));
    this.sizeScale = d3.scaleThreshold().domain(this.domain).range(lessThan.map((d) => d.size));
    this.colorScale = d3.scaleThreshold().domain(lessThan.map((d) => d.end)).range(breaks.map((d) => d.color));
    this.getSize = this.getSize.bind(this);
    this.getColor = this.getColor.bind(this);
  }
  getSize(value) {
    if (this.breaks.length > 0) {
      if (value > Math.max(...this.domain)) {
        return this.graterThanStyle.size;
      }
      return this.defaultSize + this.sizeScale(value);
    }
    return this.defaultSize;
  }
  getColor(value, isMarker) {
    if (this.breaks.length > 0) {
      if (value > Math.max(...this.domain)) {
        return this.graterThanStyle.color;
      }
      return this.colorScale(value);
    }
    return this.defaultFillColor;
  }
}
const toGenericID = (key) => {
  if (!key) return "";
  return key.toString().replace(/ /g, "_");
};
const toId = (key) => {
  if (!key) return "";
  return "pattern_" + toGenericID(key);
};
let DataLayer$2 = class DataLayer extends BaseLayer2 {
  constructor() {
    super();
    this.createDataLayer = this.createDataLayer.bind(this);
  }
  createDataLayer(json) {
    const {
      app,
      svg,
      format,
      id,
      file,
      path,
      onLayerCreated,
      labelFilter = [],
      labelField,
      labelFontSize,
      labelColor,
      fillColor,
      borderColor,
      tooltip,
      markFillColor,
      markLabelColor,
      markBorderColor,
      markSizeScale,
      markerLabelSize,
      featureJoinAttribute,
      apiJoinAttribute,
      measures,
      editing,
      data,
      patternDiscriminator,
      patternDiscriminatorLabel,
      breaks,
      patterns,
      projection,
      useBreaks,
      useCentroidPoint,
      usePattern,
      intl
    } = this.props;
    const brStyles = new BreaksStyles({
      breaks,
      defaultFillColor: markFillColor,
      defaultBorderColor: markBorderColor,
      defaultSize: markSizeScale
    });
    if (this.gRef && this.gRef.current) {
      this.g = d3.select(this.gRef.current);
      const numberFormat = {
        style: format.style === "compacted" ? "decimal" : format.style,
        notation: format.style === "compacted" ? "compact" : "standard",
        currency: format.currency,
        minimumFractionDigits: parseInt(format.minimumFractionDigits),
        maximumFractionDigits: parseInt(format.maximumFractionDigits)
      };
      const filteredData = json.features.filter((f) => f.properties._value != null);
      const getTooltipVariables = (d) => {
        if (d.properties._value) {
          const variables = {
            ...d.properties,
            meta: {
              [apiJoinAttribute]: d.properties.meta ? d.properties.meta.value : "",
              ...d.properties.meta,
              value: d.properties._value
            }
          };
          return variables;
        }
        return {};
      };
      this.g.attr("class", "base-layer");
      this.createPaths(json);
      this.g.selectAll(".point").remove();
      this.g.selectAll(".point-label").remove();
      this.g.selectAll(".shape-pattern").remove();
      this.g.selectAll("defs").remove();
      const k = this.props.transform ? this.props.transform.k : 1;
      const patternWidth = 10 * 1 / k;
      const patternHeight = 10 * 1 / k;
      const defs = this.g.append("defs");
      let patternsData = [];
      if (app == "csv" && patternDiscriminator != "none") {
        patternsData = [...new Set(data.data.map((d) => d[patternDiscriminator]))].map((key) => {
          return {
            key,
            type: patterns[key + "_symbol"],
            color: patterns[key + "_color"],
            rotation: patterns[key + "_rotation"]
          };
        });
      } else if (patternDiscriminator != "none") {
        const types = data.metadata.types.filter((d) => d.dimension == patternDiscriminator);
        patternsData = types && types.length > 0 ? types[0].items.map((item) => {
          const key = item.value;
          return {
            key,
            type: patterns[key + "_symbol"],
            color: patterns[key + "_color"],
            rotation: patterns[key + "_rotation"]
          };
        }) : [];
      }
      defs.selectAll("pattern").remove();
      defs.selectAll("pattern").data(patternsData).enter().append("pattern").attr("id", (d) => toId(d.key)).attr("patternUnits", "userSpaceOnUse").attr("width", patternWidth).attr("height", patternHeight).attr("x", 0).attr("y", 0).attr("patternTransform", (d) => `rotate(${d.rotation})`);
      patternsData.forEach((d) => {
        if (d.type === "lines") {
          defs.select("#" + toId(d.key)).append("rect").attr("x", 0.05).attr("width", patternWidth / 2).attr("height", patternHeight).attr("opacity", 1).attr("fill", d.color);
        }
        if (d.type === "squares") {
          defs.select("#" + toId(d.key)).append("rect").attr("width", patternWidth / 2).attr("height", patternHeight / 2).attr("fill", d.color).attr("opacity", 1).attr("stroke-width", 1);
        }
        if (d.type === "dots") {
          defs.select("#" + toId(d.key)).append("circle").attr("cx", patternWidth / 2).attr("cy", patternHeight / 2).attr("r", patternWidth / 2.5).attr("fill", d.color).attr("opacity", 1).attr("stroke-width", 1);
        }
        if (d.type === "triangle") {
          defs.select("#" + toId(d.key)).append("polygon").attr("points", `${patternWidth / 2} 0, 0 ${patternWidth}, ${patternWidth}  ${patternWidth} `).attr("fill", d.color).attr("opacity", 1).attr("stroke-width", 1);
        }
      });
      if (!useCentroidPoint) {
        this.g.selectAll("path").attr("fill", (d) => {
          if (!d || !d.properties || !d.properties._value) {
            return fillColor;
          }
          return brStyles.getColor(d.properties._value);
        }).attr("stroke", borderColor).attr("id", "state-borders").attr("d", path).on("mouseenter", (d) => {
          if (d.properties._value) {
            this.showToolTip(tooltip, getTooltipVariables(d), brStyles.getColor(d.properties._value));
          }
        }).on("mouseleave", (d) => {
          this.hiddenToolTip();
        }).on("mousemove", (d) => {
          this.moveToolTip();
        });
        this.createLabels(json);
      }
      if (usePattern && json && json.features) {
        json.features.forEach((d) => {
          let patterns2 = [];
          if (d.properties && d.properties.meta) {
            patterns2 = app != "csv" ? d.properties.meta[patternDiscriminator] ? d.properties.meta[patternDiscriminator] : [] : [d.properties.meta[patternDiscriminator]];
            if (patterns2 && patterns2.length > 0) {
              patterns2.forEach((p) => {
                this.g.append("path").attr("d", path(d)).attr("class", "shape-pattern").attr("opacity", (d2) => {
                  if (useBreaks) {
                    return 0.7;
                  }
                }).attr("fill", (d2) => {
                  return "transparent";
                }).attr("style", () => {
                  return "none;fill:url(#" + toId(p) + ");";
                }).on("mouseenter", () => {
                  this.showToolTip(tooltip, getTooltipVariables(d), brStyles.getColor(d.properties._value));
                }).on("mousemove", (d2) => {
                  this.moveToolTip();
                }).on("mouseleave", (d2) => {
                  this.hiddenToolTip();
                });
              });
            }
          }
        });
        patternsData = patternsData.filter((p) => {
          return p.type != void 0;
        }).sort((a, b) => {
          return new Intl.Collator(intl.locale, { caseFirst: "upper", numeric: true, sensitivity: "variant" }).compare(a.key, b.key);
        });
        d3.select(this.gRef.current.parentNode.parentNode).select(`.layer_${toGenericID(id)}`).select("svg").remove();
        const g = d3.select(this.gRef.current.parentNode.parentNode).select(`.layer_${toGenericID(id)}`).append("svg");
        const defs2 = g.append("defs");
        defs2.selectAll("pattern").remove();
        defs2.selectAll("pattern").data(patternsData).enter().append("pattern").attr("id", (d) => "l_" + toId(d.key)).attr("patternUnits", "userSpaceOnUse").attr("width", 5).attr("height", 5).attr("x", 0).attr("y", 0).attr("patternTransform", (d) => `rotate(${!d.rotation ? 0 : d.rotation})`);
        patternsData.forEach((d) => {
          if (d.type === "lines") {
            defs2.select("#l_" + toId(d.key)).append("rect").attr("x", 0).attr("width", 1).attr("height", 10).attr("opacity", 0.75).attr("fill", d.color);
          }
          if (d.type === "squares") {
            defs2.select("#l_" + toId(d.key)).append("rect").attr("width", 3).attr("height", 3).attr("fill", d.color).attr("opacity", 1).attr("stroke-width", 1);
          }
          if (d.type === "dots") {
            defs2.select("#l_" + toId(d.key)).append("circle").attr("cx", 2).attr("cy", 2).attr("r", 2).attr("fill", d.color).attr("opacity", 1).attr("stroke-width", 1);
          }
          if (d.type === "triangle") {
            defs2.select("#l_" + toId(d.key)).append("polygon").attr("points", "5,0 8,8 0,5").attr("fill", d.color).attr("opacity", 1).attr("stroke-width", 1);
          }
        });
        g.attr("width", "150px").attr("height", patternsData.length * 40 + "px");
        g.append("text").attr("class", "patterns-title").attr("y", 5).attr("x", 12).text((a) => app === "csv" ? patternDiscriminator : patternDiscriminatorLabel);
        g.selectAll(".legend-squares").data(patternsData).enter().append("rect").attr("width", 18).attr("height", 18).attr("y", (d, i) => i * 22 + 25).attr("x", 20).attr("stroke", borderColor).attr("style", (d) => {
          return "none;fill:url(#l_" + toId(d.key) + ");";
        });
        g.selectAll(".patterns-labels").data(patternsData).enter().append("text").attr("class", "patterns-labels").attr("y", (d, i) => i * 22 + 25).attr("x", 40).text((d) => d.key);
      }
      if (useCentroidPoint) {
        this.createLabels(json);
        this.g.selectAll(".point").data(filteredData).enter().append("circle").attr("fill", (d) => brStyles.getColor(d.properties._value, true)).attr("stroke", markBorderColor).attr("class", "point").attr("stroke-width", 2).style("vector-effect", "non-scaling-stroke").attr("cx", (d) => path.centroid(d)[0]).attr("cy", (d) => path.centroid(d)[1]).attr("r", (d) => {
          return brStyles.getSize(d.properties._value) * 1 / k;
        }).on("mouseenter", (d) => {
          if (d.properties._value) {
            const variables = {
              ...d.properties,
              meta: {
                [apiJoinAttribute]: d.properties.meta ? d.properties.meta.value : "",
                ...d.properties.meta,
                value: d.properties._value
              }
            };
            this.showToolTip(tooltip, variables, brStyles.getColor(d.properties._value));
          }
        }).on("mouseleave", (d) => {
          this.hiddenToolTip();
        });
        this.g.selectAll(".point-label").data(filteredData).enter().append("text").attr("class", "point-label").attr("x", (d) => path.centroid(d)[0]).attr("y", (d) => path.centroid(d)[1]).attr("font-size", (d) => {
          return markerLabelSize * (1 / k) + "px";
        }).attr("fill", markLabelColor).text((d) => {
          return intl.formatNumber(format.style === "percent" ? d.properties._value / 100 : d.properties._value, numberFormat);
        }).on("mouseover", (d) => {
        });
      }
    }
  }
  create() {
    const {
      app,
      name,
      file,
      path,
      zoom,
      labelFilter = [],
      labelField,
      labelFontSize,
      labelColor,
      fillColor,
      borderColor,
      featureJoinAttribute,
      editing,
      data,
      measures,
      patternDiscriminator
    } = this.props;
    if (file != "none") {
      this.loadJSON(file).then((json) => {
        const features = json.features.map((d) => {
          const joinValue = d.properties[featureJoinAttribute];
          if (app != "csv" && data && data.children) {
            const values = data.children.filter((d2) => d2.value.indexOf(joinValue) > -1);
            if (values.length > 0) {
              const measureValue = values[0][measures[0]];
              d.properties.meta = values[0];
              d.properties._value = measureValue;
              if (patternDiscriminator && patternDiscriminator != "none") {
                const patternsValues = values[0] && values[0].children ? values[0].children.filter((f) => f.type == patternDiscriminator).map((d2) => d2.value) : [];
                d.properties.meta[patternDiscriminator] = patternsValues;
              }
            } else {
              d.properties._value = null;
            }
          } else if (app == "csv") {
            const values = data.data.filter((d2) => d2[data.meta.fields[0]] == joinValue);
            if (values.length > 0) {
              d.properties.meta = values[0];
              d.properties._value = values[0][data.meta.fields[1]];
            } else {
              d.properties._value = null;
            }
          } else {
            d.properties._value = null;
          }
          return d;
        });
        const newJson = { ...json, features };
        this.createDataLayer(newJson);
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props;
    this.create();
  }
  componentDidMount() {
    this.create();
    this.props.zoom.current.fullView();
  }
  render() {
    const {
      id,
      file,
      path,
      zoom,
      labelFilter = [],
      labelField,
      labelFontSize,
      labelColor,
      fillColor,
      borderColor,
      featureJoinAttribute,
      apiJoinAttribute,
      editing
    } = this.props;
    return /* @__PURE__ */ jsx("g", { id: "data-" + id, className: "data " + id, ref: this.gRef });
  }
};
const DataWrapper$2 = (props) => {
  const {
    id,
    unique,
    filters,
    csv,
    app,
    group = "default",
    apiJoinAttribute,
    editing,
    patternDiscriminator,
    intl
  } = props;
  const params = {};
  const ff = filters || {};
  if (ff && ff.forEach) {
    ff.forEach((f) => {
      if (f.value != null && f.value.filter((v) => v != null && v.toString().trim() != "").length > 0)
        params[f.param] = f.value;
    });
  }
  return /* @__PURE__ */ jsx(
    DataProvider,
    {
      editing,
      params,
      app,
      csv: decodeURIComponent(csv),
      group,
      ignoreErrors: true,
      isSvg: true,
      store: [app, unique, id],
      source: apiJoinAttribute + (patternDiscriminator != "none" ? "/" + patternDiscriminator : ""),
      children: /* @__PURE__ */ jsx(DataConsumer, { children: /* @__PURE__ */ jsx(DataLayer$2, { ...props }) })
    }
  );
};
const DataLayer$3 = injectIntl(DataWrapper$2);
let DataLayer$1 = class DataLayer2 extends React__default.Component {
  constructor() {
    super();
    this.create = this.create.bind(this);
    this.showToolTip = this.showToolTip.bind(this);
    this.moveToolTip = this.moveToolTip.bind(this);
    this.gRef = React__default.createRef();
  }
  showToolTip(content, data, color, event) {
    const tip = d3.select("body").append("div").attr("class", "d3MapTooltip").style("position", "absolute").html("").style("left", event.pageX + 15 + "px").style("top", event.pageY - 50 + "px");
    ReactDOM.render(/* @__PURE__ */ jsx(
      Tooltip,
      {
        intl: this.props.intl,
        tooltip: content,
        data,
        tooltipEnableMarkdown: false
      }
    ), tip._groups[0][0]);
  }
  moveToolTip(event) {
    d3.select(".d3MapTooltip").style("left", event.pageX + 15 + "px").style("top", event.pageY - 50 + "px");
  }
  hiddenToolTip(event) {
    d3.selectAll(".d3MapTooltip").remove();
  }
  create() {
    const {
      app,
      tooltip,
      data,
      markFillColor,
      markBorderColor,
      markSizeScale,
      markerLabelSize,
      measures,
      projection,
      id,
      useBreaks,
      breaks,
      pointDimensionStyles = [],
      pointStyleBy,
      dimension2,
      visible = true
    } = this.props;
    const sizeScale = d3.scaleThreshold().domain(breaks.map((d) => d.end)).range(breaks.map((d) => d.size));
    const colorScale = d3.scaleThreshold().domain(breaks.map((d) => d.end)).range(breaks.map((d) => d.color));
    const borderScale = d3.scaleThreshold().domain(breaks.map((d) => d.end)).range(breaks.map((d) => d.borderColor));
    let points = [];
    const g = d3.select(this.gRef.current);
    if (app != "csv" && data && data.children) {
      points = data.children.map((d) => {
        const latLong = d.value.split(",");
        let pointStyle = { color: markFillColor, size: markSizeScale, border: markBorderColor };
        let value = 1;
        if (pointStyleBy === "measure") {
          value = d[measures[0]];
          pointStyle = { color: colorScale(value), size: sizeScale(value), border: borderScale(value) };
        } else if (pointStyleBy === "dimension") {
          if (d.children) {
            value = d.children[0].value;
            pointStyle = {
              color: pointDimensionStyles[value + "_color"] || markFillColor,
              size: pointDimensionStyles[value + "_size"] || markSizeScale,
              border: pointDimensionStyles[value + "_border"] || markBorderColor
            };
          }
        }
        return {
          x: latLong[0],
          y: latLong[1],
          value,
          metadata: d,
          pointStyle
        };
      });
    } else if (app == "csv") {
      const latField = data.meta.fields[0];
      const longField = data.meta.fields[1];
      const valueField = data.meta.fields[2];
      points = data.data.map((d) => {
        return {
          x: d[latField],
          y: d[longField],
          value: d[valueField],
          meta: d
        };
      });
    }
    const getTooltipVariables = (d) => {
      const { pointStyleBy: pointStyleBy2, dimension2: dimension22 } = this.props;
      const dimensionVariable = {};
      if (pointStyleBy2 === "dimension" && dimension22 != "none") {
        dimensionVariable[dimension22] = d.metadata.children[0].value;
      }
      return { ...dimensionVariable, ...d, ...d.metadata };
    };
    const k = this.props.transform ? this.props.transform.k : 1;
    g.attr("class", "lat-long " + id);
    g.selectAll(".latLong").remove();
    g.selectAll(".latLong").data(points).enter().append("circle").attr("cx", function(d) {
      return projection([d.y, d.x])[0];
    }).attr("cy", function(d) {
      return projection([d.y, d.x])[1];
    }).attr("class", "latLong").attr("r", (e) => e.pointStyle.size * 1 / k).attr("stroke-width", 2).style("vector-effect", "non-scaling-stroke").attr("stroke", (e) => e.pointStyle.border).attr("fill", (e) => e.pointStyle.color).on("mouseenter", (event, d) => {
      this.showToolTip(tooltip, getTooltipVariables(d), d.pointStyle.color, event);
    }).on("mousemove", (event, d) => {
      this.moveToolTip(event);
    }).on("mouseleave", (event, d) => {
      this.hiddenToolTip(event);
    });
    if (this.props.transform) {
      g.attr("transform", this.props.transform);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props;
    this.create();
  }
  componentDidMount() {
    this.create();
  }
  render() {
    const {
      id
    } = this.props;
    return /* @__PURE__ */ jsx("g", { className: "latLong " + id, ref: this.gRef });
  }
};
const DataWrapper$1 = (props) => {
  const {
    id,
    unique,
    filters,
    csv,
    app,
    group = "default",
    apiJoinAttribute,
    editing,
    dimension2,
    pointStyleBy
  } = props;
  const secondDimension = pointStyleBy === "dimension" && dimension2 != "none" ? "/" + dimension2 : "";
  const params = {};
  const ff = filters || {};
  if (ff && ff.forEach) {
    ff.forEach((f) => {
      if (f.value != null && f.value.filter((v) => v != null && v.toString().trim() != "").length > 0)
        params[f.param] = f.value;
    });
  }
  return /* @__PURE__ */ jsx(
    DataProvider,
    {
      editing,
      params,
      app,
      csv: decodeURIComponent(csv),
      group,
      ignoreErrors: true,
      isSvg: true,
      store: [app, unique, id],
      source: [apiJoinAttribute + secondDimension],
      children: /* @__PURE__ */ jsx(DataConsumer, { children: /* @__PURE__ */ jsx(DataLayer$1, { ...props }) })
    }
  );
};
const LatLongLayer = injectIntl(DataWrapper$1);
class ZoomControl extends React__default.Component {
  constructor(props) {
    super(props);
    this.zooming = false;
    this.zoomstarted = this.zoomStarted.bind(this);
    this.zoomEnd = this.zoomEnd.bind(this);
    this.zoomed = this.zoomed.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.reset = this.reset.bind(this);
    this.fullView = this.fullView.bind(this);
    this.transition2fullView = this.transition2fullView.bind(this);
    this._fullView = this._fullView.bind(this);
    this.zoomRef = React__default.createRef();
    this.zoom = d3.zoom().scaleExtent([0, 300]).on("start", this.zoomStarted).on("zoom", this.zoomed).on("end", this.zoomEnd);
  }
  componentDidMount() {
    const { zoomEnabled = true, rotationEnabled } = this.props;
    const selection = this.getSelection();
    if (selection) {
      if (zoomEnabled) {
        selection.call(this.zoom);
        this.transition2fullView();
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const selection = this.getSelection();
    if (prevProps.zoomEnabled != this.props.zoomEnabled) {
      if (this.props.zoomEnabled) {
        if (selection) {
          selection.call(this.zoom);
          selection.on(".zoom", this.zoom);
          this.transition2fullView();
        }
      } else {
        if (selection) {
          selection.on(".zoom", null);
        }
      }
    }
    if (!prevProps.readyState && this.props.readyState) {
      this.fullView();
    }
    if (prevProps.height !== this.props.height || prevProps.width !== this.props.width) {
      this.fullView();
    }
  }
  reset() {
    const {
      editing
    } = this.props;
    if (editing) {
      const selection = this.getSelection();
      if (selection) {
        selection.call(
          this.zoom.transform,
          d3.zoomIdentity.translate(0, 0).scale(1)
        );
      }
    } else {
      this.transition2fullView();
    }
  }
  zoomStarted() {
  }
  zoomed(event) {
    this.props.onZoomed(event.transform);
  }
  /*Button Zoom in*/
  zoomIn(e) {
    const selection = this.getSelection();
    if (selection) {
      selection.transition().call(this.zoom.scaleBy, 1.5);
    }
  }
  /*Button zoom oit*/
  zoomOut() {
    const selection = this.getSelection();
    if (selection) {
      selection.transition().call(this.zoom.scaleBy, 0.6667);
    }
  }
  getSelection() {
    const selection = this.zoomRef.current ? d3.select(this.zoomRef.current.parentNode.getElementsByTagName("svg")[0]) : null;
    return selection;
  }
  _fullView(transition = true) {
    const { editing, initialPosition: { x = 100, y = 23, k = 1, width: oW, height: oH }, width, height } = this.props;
    const selection = this.getSelection();
    if (oH && oW && k && selection) {
      selection.transition().call(
        this.zoom.transform,
        d3.zoomIdentity.translate(x, y).scale(k)
      );
    }
  }
  transition2fullView() {
    this._fullView(true);
  }
  fullView() {
    this._fullView(false);
  }
  zoomEnd(event) {
    const { group, editing, width, height } = this.props;
    if (editing) {
      const { x, y, k } = event.transform;
      window.parent.postMessage({ type: `d3_map_${group}`, value: { k, x, y, width, height } }, "*");
    }
  }
  render() {
    const { editing, zoomEnabled = true } = this.props;
    return /* @__PURE__ */ jsx("div", { ref: this.zoomRef, className: `zoom ${zoomEnabled ? "" : "disabled"}`, children: (editing || zoomEnabled) && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: " button plus", onClick: this.zoomIn, children: /* @__PURE__ */ jsx(Icon, { name: "plus", size: "small" }) }),
      /* @__PURE__ */ jsx("div", { className: " button minus", onClick: this.zoomOut, children: /* @__PURE__ */ jsx(Icon, { name: "minus", size: "small" }) }),
      /* @__PURE__ */ jsx(
        Popup,
        {
          content: /* @__PURE__ */ jsx(FormattedMessage, { id: "map.reset.tooltip", defaultMessage: "Reset zoom" }),
          trigger: /* @__PURE__ */ jsx("div", { className: "button reset", onClick: this.reset, children: /* @__PURE__ */ jsx(Icon, { name: "repeat", size: "small" }) })
        }
      )
    ] }) });
  }
}
class ProjectedContainer extends React__default.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.divRef = React__default.createRef();
    this.createProjection = this.createProjection.bind(this);
  }
  createProjection() {
    const { editing, height, width, scale = 200, center = [0, 0], projectionName } = this.props;
    const projection = d3[projectionName]().fitSize([width, height]).scale(scale).center(center).translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);
    return { path, projection };
  }
  componentDidMount() {
    this.props;
    const { path, projection } = this.createProjection();
    this.setState({ path, projection });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.height !== this.props.height || prevProps.width !== this.props.width || prevProps.projectionName !== this.props.projectionName) {
      const { path, projection } = this.createProjection();
      this.setState({ path, projection });
    }
  }
  render() {
    const { editing, backgroundColor, height, width, scale = 190, center = [0, 0], initialPosition } = this.props;
    const arrayChildren = Children.toArray(this.props.children);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "projected",
        width,
        height,
        style: {
          margin: "auto",
          backgroundColor,
          height: `${height}px`,
          width: `${width}px`
        },
        children: Children.map(arrayChildren, (child) => {
          return React__default.cloneElement(child, {
            ...this.state,
            initialPosition,
            editing,
            height,
            width
          });
        })
      }
    );
  }
}
const Breaks = ({ breaks, isPoint }) => {
  return breaks.length > 0 && /* @__PURE__ */ jsx("div", { className: "legend-breaks", children: breaks.map((b, i) => {
    if (b.type !== "graterThan") {
      return /* @__PURE__ */ jsxs("div", { className: "break", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `break-item ${isPoint ? "point" : ""}`,
            style: {
              backgroundColor: b.color,
              border: `1px solid ${b.borderColor}`
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "break-label", children: [
          " < ",
          b.end
        ] })
      ] });
    } else {
      return /* @__PURE__ */ jsxs("div", { className: "break", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `break-item ${symbol}`,
            style: {
              backgroundColor: b.color,
              border: `1px solid ${b.borderColor}`
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "break-label", children: [
          " > ",
          b.end
        ] })
      ] });
    }
  }) });
};
const FlowLayerLegend = (props) => {
  const {
    name,
    breaks,
    pointStyleBy,
    dimension2,
    pointDimensionStyles = {},
    markFillColor,
    markBorderColor,
    measures,
    visible,
    id,
    onItemClick,
    customMeasuresLabels
  } = props;
  let measureLabel = measures[0];
  if (customMeasuresLabels) {
    measureLabel = customMeasuresLabels[measures[0]];
  }
  [...new Set(Object.keys(pointDimensionStyles).map((k) => k.split("_")[0]))];
  return /* @__PURE__ */ jsx("div", { className: "legend", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "legend-item", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "legend-color legend-check",
          onClick: (e) => onItemClick(id),
          style: {
            backgroundColor: markFillColor,
            borderColor: markBorderColor
          },
          children: visible != false && /* @__PURE__ */ jsx(Fragment, { children: "✓" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "legend-label", children: [
        name,
        " (",
        measureLabel,
        ")"
      ] })
    ] }),
    visible != false && /* @__PURE__ */ jsx(Breaks, { breaks, symbol: "arrow" })
  ] }) });
};
const DataPointsLayerLegend = (props) => {
  const {
    id,
    name,
    breaks,
    pointStyleBy,
    dimension2,
    pointDimensionStyles = {},
    markFillColor,
    markBorderColor,
    measures,
    visible,
    onItemClick,
    customMeasuresLabels,
    allCategories
  } = props;
  let measureLabel = measures[0];
  if (customMeasuresLabels) {
    measureLabel = customMeasuresLabels[measures[0]];
  }
  const cats = dimension2 && allCategories ? allCategories.filter((c) => c.type.toUpperCase() == dimension2.toUpperCase()) : [];
  const items = cats.length > 0 ? cats[0].items : [];
  const dimensionValues = items.map((i) => i.value);
  const fieldLabel = pointStyleBy === "dimension" ? dimension2 : measureLabel;
  return /* @__PURE__ */ jsx("div", { className: "legend", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "legend-item", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "legend-color legend-check",
          onClick: (e) => onItemClick(id),
          style: {
            backgroundColor: markFillColor,
            borderColor: markBorderColor
          },
          children: visible != false && /* @__PURE__ */ jsx(Fragment, { children: "✓" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "legend-label", children: [
        name,
        " "
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "legend", children: /* @__PURE__ */ jsx("div", { className: "legend-item", children: /* @__PURE__ */ jsx("div", { className: "legend-label", children: fieldLabel }) }) }),
    pointStyleBy === "dimension" && visible != false && /* @__PURE__ */ jsx("div", { className: "legend-breaks", children: dimensionValues.map((d) => {
      return /* @__PURE__ */ jsxs("div", { className: "break", children: [
        /* @__PURE__ */ jsx("div", { className: "break-item", style: {
          backgroundColor: pointDimensionStyles[d + "_color"] || markFillColor,
          border: `1px solid ${pointDimensionStyles[d + "_border"] || markBorderColor}`
        } }),
        /* @__PURE__ */ jsx("div", { className: "break-label", children: d })
      ] });
    }) }),
    pointStyleBy === "measure" && visible != false && /* @__PURE__ */ jsx("div", { className: "legend-breaks", children: breaks.map((b, i) => {
      return /* @__PURE__ */ jsxs("div", { className: "break", children: [
        /* @__PURE__ */ jsx("div", { className: "break-item", style: {
          backgroundColor: b.color,
          border: `1px solid ${b.borderColor}`
        } }),
        /* @__PURE__ */ jsxs("div", { className: "break-label", children: [
          " < ",
          b.end
        ] })
      ] });
    }) })
  ] }) });
};
const BaseLayerLegend = (props) => {
  const { fillColor, borderColor, name, visible, id, onItemClick } = props;
  return /* @__PURE__ */ jsx("div", { className: "legend", children: /* @__PURE__ */ jsxs("div", { className: "legend-item", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "legend-color legend-check",
        onClick: (e) => onItemClick(id),
        style: { backgroundColor: fillColor, borderColor },
        children: visible != false && /* @__PURE__ */ jsx(Fragment, { children: "✓" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "legend-label", children: name })
  ] }) });
};
const DataLayerLegend = (props) => {
  const {
    markFillColor,
    fillColor,
    markSizeScale,
    markBorderColor,
    useCentroidPoint,
    name,
    useBreaks,
    breaks,
    usePattern,
    patternsData,
    patternDiscriminator,
    patternDiscriminatorLabel,
    measures,
    borderColor,
    data,
    app,
    customMeasuresLabels,
    divRef,
    id,
    patternWidth = 0.35,
    patternHeight = 0.25,
    group,
    csv,
    visible,
    onItemClick
  } = props;
  let measureLabel = "";
  if (app != "csv" && customMeasuresLabels) {
    measureLabel = customMeasuresLabels[measures[0]];
  } else {
    const parsed = Papa.parse(csv, { header: true, dynamicTyping: true });
    measureLabel = parsed.meta.fields.length > 0 ? parsed.meta.fields[1] : "";
  }
  const toId2 = (key) => {
    if (!key) return "";
    return key.toString().replace(/ /g, "_").toLocaleLowerCase();
  };
  return /* @__PURE__ */ jsx("div", { className: `legend layer_${toId2(id)}`, id: toId2(`${group} ${name} ${id}`), children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "legend-item", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "legend-color legend-check",
          onClick: (e) => onItemClick(id),
          style: { backgroundColor: fillColor, borderColor },
          children: visible != false && /* @__PURE__ */ jsx(Fragment, { children: "✓" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "legend-label", children: [
        name,
        " ",
        !useCentroidPoint && /* @__PURE__ */ jsxs("span", { children: [
          "(",
          measureLabel,
          ")"
        ] })
      ] })
    ] }),
    useCentroidPoint && !useBreaks && visible != false && /* @__PURE__ */ jsx("div", { className: "legend-breaks", children: /* @__PURE__ */ jsxs("div", { className: "break", children: [
      /* @__PURE__ */ jsx("div", { className: "break-item point", style: {
        backgroundColor: markFillColor,
        border: `1px solid ${markBorderColor}`
      } }),
      measureLabel
    ] }) }),
    useBreaks && visible != false && /* @__PURE__ */ jsxs("div", { children: [
      useCentroidPoint && /* @__PURE__ */ jsx("div", { className: "legend-breaks", children: /* @__PURE__ */ jsx("div", { className: "break-item", children: measureLabel }) }),
      /* @__PURE__ */ jsx(Breaks, { symbol: useCentroidPoint ? "point" : "square", breaks, visible })
    ] })
  ] }) });
};
const Legends = (props) => {
  const divRef = useRef(null);
  const { layers = [], onItemClick, patternsData, group } = props;
  return /* @__PURE__ */ jsx("div", { className: "legends", ref: divRef, children: layers.map((l) => {
    return /* @__PURE__ */ jsxs("div", { children: [
      l.type == "base" && /* @__PURE__ */ jsx(BaseLayerLegend, { ...l, group, onItemClick }),
      l.type == "data" && /* @__PURE__ */ jsx(
        DataLayerLegend,
        {
          group,
          patternsData: patternsData ? patternsData[l.id] : null,
          divRef,
          ...l,
          onItemClick
        }
      ),
      l.type == "dataPoints" && /* @__PURE__ */ jsx(DataPointsLayerLegend, { group, ...l, onItemClick }),
      l.type == "flow" && /* @__PURE__ */ jsx(FlowLayerLegend, { group, ...l, onItemClick })
    ] });
  }) });
};
class DataLayer3 extends BaseLayer2 {
  constructor() {
    super();
    this.createDataLayer = this.createDataLayer.bind(this);
  }
  createDataLayer(json) {
    const {
      format,
      path,
      tooltip,
      markFillColor,
      markBorderColor,
      markSizeScale,
      //circle size
      featureJoinAttribute,
      apiJoinAttribute,
      projection,
      breaks,
      markSizeScale2,
      //arrow size
      flowValuesFrom,
      measures
    } = this.props;
    const measure = measures[0];
    const brStyles = new BreaksStyles({
      breaks,
      defaultFillColor: markFillColor,
      defaultBorderColor: markBorderColor,
      defaultSize: markSizeScale2
    });
    ({
      style: format.style === "compacted" ? "decimal" : format.style,
      notation: format.style === "compacted" ? "compact" : "standard",
      currency: format.currency,
      minimumFractionDigits: parseInt(format.minimumFractionDigits),
      maximumFractionDigits: parseInt(format.maximumFractionDigits)
    });
    const filteredData = json.features.filter((f) => f.properties._value != null);
    this.g = d3.select(this.gRef.current);
    this.g.attr("class", "base-layer");
    if (this.props.transform) {
      this.g.attr("transform", this.props.transform);
    }
    this.g.selectAll(".flow-line").remove();
    this.g.selectAll(".start-point").remove();
    this.g.selectAll(".end-point").remove();
    this.g.select("defs").selectAll("*").remove();
    const k = this.props.transform ? this.props.transform.k : 1;
    const originPoints = [];
    filteredData.forEach((d1) => {
      originPoints.push(d1);
      d1.properties.destinations.forEach((child) => {
        const value = child[measure];
        json.features.filter((feature) => feature.properties[featureJoinAttribute] == child.value).forEach((d2) => {
          const originID = d1.properties[featureJoinAttribute];
          const id = d1.properties[featureJoinAttribute] + "--" + d2.properties[featureJoinAttribute];
          const link = {
            type: "LineString",
            coordinates: [
              [
                projection.invert(path.centroid(d1))[0],
                projection.invert(path.centroid(d1))[1]
              ],
              [
                projection.invert(path.centroid(d2))[0],
                projection.invert(path.centroid(d2))[1]
              ]
            ]
          };
          this.g.select("defs").append("marker").attr("id", "arrow" + id).attr("markerUnits", "strokeWidth").attr("markerWidth", "6").attr("markerHeight", "6").attr("viewBox", "0 0 24 24").attr("refX", "6").attr("refY", "6").attr("orient", "auto").append("path").attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2").attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2").attr("style", (e) => {
            return "fill: " + brStyles.getColor(value) + ";";
          });
          const g = this.g;
          this.g.append("path").attr("d", path(link)).attr("class", "flow-line").style("fill", "none").style("cursor", "pointer").style("stroke-dasharray", "0").style("stroke", (d) => {
            return brStyles.getColor(value);
          }).style("stroke-width", (d) => {
            return brStyles.getSize(value);
          }).attr("marker-end", "url(#arrow" + id + ")").on("mouseenter", (event, d) => {
            g.selectAll("marker").transition().duration("200").style("opacity", 0);
            g.selectAll(".start-point").transition().duration("200").style("opacity", 0);
            g.selectAll(".flow-line").transition().duration("200").style("opacity", 0);
            d3.select(event.target).transition().duration("200").style("opacity", 1);
            g.selectAll("#arrow" + id).transition().duration("200").style("opacity", 1);
            g.selectAll(".start-point.circle_" + originID).transition().duration("200").style("opacity", 1);
            if (value) {
              const origin = {};
              const target = {};
              Object.keys(d1.properties).forEach((key) => {
                origin["origin_" + key] = d1.properties[key];
              });
              Object.keys(d2.properties).forEach((key) => {
                target["target_" + key] = d2.properties[key];
              });
              const variables = {
                ...origin,
                ...target,
                meta: {
                  [apiJoinAttribute]: d1.properties.meta ? d1.properties.meta.value : "",
                  ...d1.properties.meta,
                  value
                }
              };
              this.showToolTip(tooltip, variables, brStyles.getColor(d2.properties._value));
            }
          }).on("mouseout", (d) => {
            this.hiddenToolTip();
            d3.selectAll(".flow-line").transition().duration("100").style("opacity", 1);
            g.selectAll(".start-point").transition().duration("100").style("opacity", 1);
            g.selectAll("marker").transition().duration("100").style("opacity", 1);
          });
        });
      });
    });
    originPoints.forEach((d1) => {
      this.g.append("circle").attr("fill", markFillColor).attr("stroke", markBorderColor).attr("class", "start-point circle_" + d1.properties[featureJoinAttribute]).attr("stroke-width", 2).style("vector-effect", "non-scaling-stroke").attr("cx", path.centroid(d1)[0]).attr("cy", path.centroid(d1)[1]).attr("r", () => {
        return markSizeScale * 1 / k;
      }).on("mouseenter", (d) => {
        this.showToolTip("{name_en}", d1.properties, "");
      }).on("mouseout", (d) => {
        this.hiddenToolTip();
      });
    });
  }
  create() {
    const {
      app,
      name,
      file,
      path,
      zoom,
      labelFilter = [],
      labelField,
      labelFontSize,
      labelColor,
      fillColor,
      borderColor,
      featureJoinAttribute,
      editing,
      data,
      breaks,
      markFillColor,
      markSizeScale,
      measures,
      flowValuesFrom
    } = this.props;
    if (file != "none") {
      this.loadJSON(file).then((json) => {
        const features = json.features.map((d) => {
          const joinValue = d.properties[featureJoinAttribute];
          if (app != "csv" && data && data.children) {
            const values = data.children.filter((d2) => d2.value.indexOf(joinValue) > -1);
            if (values.length > 0) {
              const measureValue = values[0][measures[0]];
              d.properties.meta = values[0];
              d.properties._value = measureValue;
              d.properties.destinations = values[0].children;
            }
          }
          return d;
        });
        const newJson = { ...json, features };
        this.createDataLayer(newJson);
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props;
    this.create();
  }
  componentDidMount() {
    this.create();
    this.props.zoom.current.fullView();
  }
  render() {
    const { id } = this.props;
    return /* @__PURE__ */ jsx("g", { id: "data-" + id, className: "data " + id, ref: this.gRef, children: /* @__PURE__ */ jsx("defs", {}) });
  }
}
const DataWrapper = (props) => {
  const { id, unique, filters, csv, app, group = "default", flowOrigin, editing, flowDestination } = props;
  const params = {};
  const ff = filters || {};
  if (ff && ff.forEach) {
    ff.forEach((f) => {
      if (f.value != null && f.value.filter((v) => v != null && v.toString().trim() != "").length > 0)
        params[f.param] = f.value;
    });
  }
  return /* @__PURE__ */ jsx(
    DataProvider,
    {
      editing,
      params,
      app,
      csv: decodeURIComponent(csv),
      group,
      ignoreErrors: true,
      isSvg: true,
      store: [app, unique, id],
      source: flowOrigin + "/" + flowDestination,
      children: /* @__PURE__ */ jsx(DataConsumer, { children: /* @__PURE__ */ jsx(DataLayer3, { ...props }) })
    }
  );
};
const FlowLayer = injectIntl(DataWrapper);
const MapWrapper = (props) => {
  const {
    unique,
    editing,
    "data-group": group,
    "data-layers": dataLayers,
    "data-height": height = 400,
    "data-width": width = 1e3,
    "data-back-ground-color": bgColorParam = "#88e8dc",
    "data-map-position": paramMapPosition = {},
    "data-projection": projectionName = "geoMercator",
    "data-zoom-enabled": zoomEnabled = true,
    "data-rotation-enabled": rotationEnabled = false,
    intl
  } = props;
  const [layers, setLayers] = useState(parse(dataLayers));
  const ref = useRef(null);
  const zoomRef = useRef(null);
  const [transform, setTransform] = useState(null);
  useEffect(() => {
    const newLayers = parse(dataLayers);
    if (!compareJsonProps(layers, newLayers)) {
      setLayers(newLayers);
    }
  }, [dataLayers]);
  const toggleLayerView = (id) => {
    const newLayers = layers.slice();
    const ly = newLayers.find((l) => l.id == id);
    if (ly) {
      ly.visible = !ly.visible;
    }
    setLayers(newLayers);
  };
  return /* @__PURE__ */ jsx("div", { ref, className: "d3map-container", children: /* @__PURE__ */ jsxs(
    ProjectedContainer,
    {
      backgroundColor: decode(bgColorParam),
      height,
      width,
      projectionName,
      editing,
      initialPosition: parse(paramMapPosition, editing),
      children: [
        /* @__PURE__ */ jsx(Map, { rotationEnabled: parse(rotationEnabled, editing), children: layers.filter((l) => l.visible != false).map((layer, i) => {
          if (layer.type === "base") {
            return /* @__PURE__ */ jsx(
              BaseLayer2,
              {
                transform,
                intl,
                zoom: zoomRef,
                unique,
                ...layer
              },
              i
            );
          }
          if (layer.type === "data") {
            return /* @__PURE__ */ jsx(
              DataLayer$3,
              {
                onLayerCreated: (e) => {
                },
                transform,
                intl,
                group,
                zoom: zoomRef,
                unique,
                ...layer
              },
              i
            );
          }
          if (layer.type === "flow") {
            return /* @__PURE__ */ jsx(
              FlowLayer,
              {
                transform,
                intl,
                group,
                zoom: zoomRef,
                unique,
                ...layer
              },
              i
            );
          }
          if (layer.type === "dataPoints") {
            return /* @__PURE__ */ jsx(
              LatLongLayer,
              {
                transform,
                intl,
                group,
                zoom: zoomRef,
                unique,
                ...layer
              },
              i
            );
          }
        }) }),
        /* @__PURE__ */ jsx(Legends, { patternsData: null, layers, group, onItemClick: toggleLayerView }),
        /* @__PURE__ */ jsx(
          ZoomControl,
          {
            rootationEmabled: parse(rotationEnabled, editing),
            zoomEnabled: parse(zoomEnabled, editing),
            onZoomed: setTransform,
            width,
            height,
            ref: zoomRef,
            group,
            editing
          }
        )
      ]
    }
  ) });
};
const mapStateToProps = (state, ownProps) => {
  return {};
};
const mapActionCreators = {};
const index = connect_default(mapStateToProps, mapActionCreators)(MapWrapper);
export {
  index as default
};
