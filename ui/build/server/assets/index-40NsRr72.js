var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React__default from "react";
import { e as connect_default } from "./server-build-C_g_IF5C.js";
import { D as DataProvider, a as DataConsumer } from "./DataConsumer-Bpiyfpil.js";
import { FormattedMessage, injectIntl } from "react-intl";
import * as d3 from "d3";
import { Container, Segment, Dimmer, Loader, Icon, Popup, Grid } from "semantic-ui-react";
import * as topojson from "topojson-client";
import template from "string-template";
import { g as getDeviceType } from "./deviceType-CnQNKjrj.js";
import * as geoStats from "geostats";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "use-sync-external-store/with-selector.js";
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
import "./DataContext-BNxY-bMy.js";
class Legend extends React__default.Component {
  constructor(props) {
    super(props);
  }
  formatNumber(value) {
    const { intl, format } = this.props;
    return intl.formatNumber(format.style === "percent" ? value / 100 : value, {
      style: format.style,
      notation: format.notation,
      maximumFractionDigits: format.maximumFractionDigits,
      minimuFractionDigits: 0,
      currency: format.currency
    });
  }
  render() {
    const {
      filteredBreaks,
      formattedLegendTitle,
      showLegendLabels,
      symbols,
      legendFontSize,
      legendFontWeight,
      autoGenerateBreaks,
      intl,
      numberFormat,
      mapNoDataColor,
      showNoDataLegendItem,
      noDataText
    } = this.props;
    const legendStyle = {
      fontSize: legendFontSize + "px",
      fontWeight: legendFontWeight
    };
    return /* @__PURE__ */ jsxs("div", { className: "legend-container", children: [
      /* @__PURE__ */ jsxs("div", { className: "legend-title-container", children: [
        /* @__PURE__ */ jsx("span", { className: "legend-title", children: filteredBreaks && filteredBreaks.length > 0 ? formattedLegendTitle : "" }),
        filteredBreaks.length > 0 && /* @__PURE__ */ jsx("span", { className: "vertical-spacer", children: "|" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "legend", children: /* @__PURE__ */ jsxs("ul", { className: "legend-items-container", children: [
        filteredBreaks && filteredBreaks.map((range, i) => {
          return /* @__PURE__ */ jsxs("li", { className: "legend-item", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "symbol",
                style: { backgroundColor: range.color }
              }
            ),
            showLegendLabels && !autoGenerateBreaks && /* @__PURE__ */ jsx("span", { className: "legend-label", style: legendStyle, children: range.label }),
            (!showLegendLabels || autoGenerateBreaks) && range.min != null && range.max != null && /* @__PURE__ */ jsxs("span", { className: "legend-label", style: legendStyle, children: [
              this.formatNumber(range.min),
              " -",
              " ",
              this.formatNumber(range.max)
            ] }),
            (!showLegendLabels || autoGenerateBreaks) && range.min == null && range.max != null && /* @__PURE__ */ jsxs("span", { className: "legend-label", style: legendStyle, children: [
              " ",
              "< ",
              this.formatNumber(range.max)
            ] }),
            (!showLegendLabels || autoGenerateBreaks) && range.min != null && range.max == null && /* @__PURE__ */ jsxs("span", { className: "legend-label", style: legendStyle, children: [
              " ",
              "> ",
              this.formatNumber(range.min),
              " "
            ] })
          ] }, "lg" + i);
        }),
        console.log("showNoDataLegendItem", showNoDataLegendItem),
        showNoDataLegendItem && /* @__PURE__ */ jsxs("li", { className: "legend-item", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "symbol",
              style: { backgroundColor: mapNoDataColor }
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "legend-label", style: legendStyle, children: noDataText })
        ] }),
        console.log("symbols", symbols),
        symbols && symbols.map((symbol, i) => {
          return /* @__PURE__ */ jsxs("li", { className: "legend-item", children: [
            /* @__PURE__ */ jsx("span", { className: "vertical-spacer", children: "|" }),
            symbol.image && /* @__PURE__ */ jsx(
              "img",
              {
                style: {
                  width: "40px",
                  height: "40px",
                  marginTop: "-8px",
                  marginRight: "-4px"
                },
                src: "/" + symbol.image
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "legend-label", style: legendStyle, children: symbol.label ? symbol.label : "" })
          ] }, "k" + i);
        })
      ] }) })
    ] });
  }
}
const percentExpresion = /(\%)[\(]([A-z0-9,.]+)\)/gi;
const numericExpresion = /(\#)[\(]([A-z0-9,.]+)\)/gi;
const compactExpresion = /(\#C)[\(]([A-z0-9,.]+)\)/gi;
const currencyExpresion = /(\$)[\(]([A-z0-9,.]+)\)/gi;
const currencies = [
  {
    name: "USD Dollar",
    code: "USD",
    symbol: "$"
  },
  {
    name: "Naira",
    code: "NGN",
    symbol: "₦"
  },
  {
    name: "South Africa Rand",
    code: "ZAR",
    symbol: "R"
  },
  {
    name: "Ethiopian Birr",
    code: "ETB",
    symbol: "Br"
  },
  {
    name: "Zambian Kwacha",
    code: "ZMW",
    symbol: "ZK"
  },
  {
    name: "Kenyan Shilling",
    code: "KES",
    symbol: "KSh"
  }
];
const applyFormat = (expresion, str, style, isPercent, intl) => {
  let result;
  let str1 = str;
  while ((result = expresion.exec(str)) !== null) {
    const arg = result[2];
    const format = (n, d = 2) => intl.formatNumber(isPercent ? n / 100 : n, {
      maximumFractionDigits: d,
      ...style
    });
    const params = arg.split(",");
    const formatted = params.length > 0 && params[0] ? format.apply(void 0, params) : "No Data";
    str1 = str1.replaceAll(result[0], formatted);
  }
  return str1;
};
const applyCurrencySymbol = (expresion, str) => {
  let result;
  let str1 = str;
  while ((result = expresion.exec(str)) !== null) {
    if (result.length > 2) {
      const expression = result[0];
      const currencyNameorCode = result[2];
      const currency = currencies.find((c) => processStringForComparison(c.code) == processStringForComparison(currencyNameorCode) || processStringForComparison(c.name) == processStringForComparison(currencyNameorCode) || processStringForComparison(c.symbol) == processStringForComparison(currencyNameorCode));
      if (currency) {
        str1 = str1.replaceAll(expression, currency.symbol);
      }
    }
  }
  return str1;
};
const processStringForComparison = (str) => {
  if (str) {
    return str.trim().toLowerCase();
  }
  return str;
};
const formatContent = (tooltip, variables, intl) => {
  let str = template(tooltip, variables).replace(/(?:\r\n|\r|\n)/g, "<br>");
  str = applyFormat(percentExpresion, str, { style: "percent" }, true, intl);
  str = applyFormat(numericExpresion, str, { style: "decimal" }, false, intl);
  str = applyFormat(compactExpresion, str, { notation: "compact" }, false, intl);
  str = applyCurrencySymbol(currencyExpresion, str);
  return str;
};
var define_process_env_default = { VITE_PROTOCOL: "https", VITE_DOMAIN: "et.tcdi.dgstg.org", VITE_REACT_APP_TITLE: "Tobacco Control Data Initiative", VITE_REACT_APP_WP_API: "https://et.tcdi.dgstg.org/wp/wp-json", VITE_REACT_APP_WP_STYLES: "https://et.tcdi.dgstg.org/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' id='wp-block-library-css", VITE_REACT_APP_GA_CODE: "en", VITE_REACT_APP_DEFAULT_LOCALE: "en", VITE_REACT_APP_WP_HOSTS: "https://et.tcdi.dgstg.org", VITE_REACT_APP_USE_HASH_LINKS: "false", VITE_REACT_APP_THEME: "cash", VITE_REACT_APP_WP_SEARCH_END_POINT: "/dg/v1/search", VITE_REACT_APP_API_ROOT: "https://et.tcdi.dgstg.org" };
const COLOR_VARIABLE = "_Color_";
const LOCATION = "location";
const SHOW_ALL = "showAll";
const SHOW_IF_HAS_DATA = "ifUnitHasData";
const MAX_LABEL_LEN = 10;
const deviceTranslateMap = {
  "mobile": 4,
  "tablet": 4,
  "midTablet": 2,
  "laptop": 2,
  "desktop": 2,
  "wide": 2
};
const deviceMapHeight = {
  "mobile": 330,
  "tablet": 250,
  "midTablet": 250,
  "laptop": 200,
  "desktop": 100,
  "wide": 100
};
const deviceMapWidth = {
  "mobile": 250,
  "tablet": 250,
  "midTablet": 250,
  "laptop": 0,
  "desktop": 0,
  "wide": 0
};
const colorSchemes = {
  greens: [
    "#ccffdd",
    "#b3ffcc",
    "#99ffbb",
    "#80ffaa",
    "#66ff99",
    "#4dff88",
    "#33ff77",
    "#1aff66",
    "#00ff55",
    "#00e64d"
  ],
  greys: [
    "#f2f2f2",
    "#e6e6e6",
    "#d9d9d9",
    "#cccccc",
    "#bfbfbf",
    "#b3b3b3",
    "#a6a6a6",
    "#999999",
    "#8c8c8c",
    "#808080"
  ],
  oranges: [
    "#fff0e6",
    "#ffe0cc",
    "#ffd1b3",
    "#ffc299",
    "#ffb380",
    "#ffa366",
    "#ff944d",
    "#ff8533",
    "#ff751a",
    "#ff6600"
  ],
  purples: [
    "#ffe6ff",
    "#ffccff",
    "#ffb3ff",
    "#ff99ff",
    "#ff80ff",
    "#ff66ff",
    "#ff4dff",
    "#ff33ff",
    "#ff1aff",
    "#ff00ff"
  ],
  reds: [
    "#ffe6e6",
    "#ffcccc",
    "#ffb3b3",
    "#ff9999",
    "#ff8080",
    "#ff6666",
    "#ff4d4d",
    "#ff3333",
    "#ff1a1a",
    "#ff0000"
  ],
  blues: [
    "#e6eeff",
    "#ccddff",
    "#b3ccff",
    "#99bbff",
    "#80aaff",
    "#6699ff",
    "#4d88ff",
    "#3377ff",
    "#1a66ff",
    "#0055ff"
  ]
};
const isMobile = ["mobile", "tablet", "midTablet"].includes(getDeviceType());
const isMobileOrTablet = ["mobile", "tablet"].includes(getDeviceType());
class Map extends React__default.Component {
  constructor(props) {
    super(props);
    __publicField(this, "handleScroll", () => {
      let scrollTimeout = null;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const labelsExist = d3.select(this.getMapId()).selectAll(".map-labels-container").size() > 0;
        if (!labelsExist) {
          this.updateFeatures(this.getFeatures(), false);
        }
      }, 300);
    });
    this.mapContainer = React__default.createRef();
    this.state = { mainLayer: null, layers: null };
    this.classColor = this.classColor.bind(this);
    this.featuresZoom = this.featuresZoom.bind(this);
    this.fullView = this.fullView.bind(this);
    this.onZoomIn = this.onZoomIn.bind(this);
    this.onZoomOut = this.onZoomOut.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onClick = this.onClick.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.updateFeatures = this.updateFeatures.bind(this);
    this.d3Map = this.d3Map.bind(this);
    this.getFeatures = this.getFeatures.bind(this);
    this.boundingExtent = this.boundingExtent.bind(this);
    this.getMapId = this.getMapId.bind(this);
    this.zoomed = this.zoomed.bind(this);
    this.zoomEnd = this.zoomEnd.bind(this);
    this.drawPoints = this.drawPoints.bind(this);
    this.extractFeatures = this.extractFeatures.bind(this);
    this.getLayers = this.getLayers.bind(this);
    this.onPointClick = this.onPointClick.bind(this);
    this.onPolygonClick = this.onPolygonClick.bind(this);
    this.getCenter = this.getCenter.bind(this);
    this.mapPosition = null;
    this.zooming = false;
    this.translateValue = deviceTranslateMap[getDeviceType()];
    this.projection = d3.geoMercator().scale(props.scale).center(props.center).translate([this.getWidth() / this.translateValue, this.getHeight() / 2]);
    this.path = d3.geoPath().projection(this.projection);
    this.zoom = d3.zoom().scaleExtent([1, 16]).on("zoom", this.zoomed).on("end", this.zoomEnd);
    this.centered = null;
    this.state = {
      selectedMeasure: props.transformedData && props.transformedData.measures && props.transformedData.measures.length > 1 ? props.transformedData.measures[0] : null,
      generatedBreaks: [],
      selectedPolygon: null,
      layersLoading: false
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("touchmove", this.handleScroll, { passive: true });
    this.loadLayers();
    this.tooltip = d3.select("body").append("div").style("position", "absolute").style("visibility", "hidden");
  }
  componentDidCatch(error, info) {
    console.log(error);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  loadLayers() {
    const { source, mainLayerId, enabledLayers } = this.props;
    this.setState({
      layers: [],
      layersLoading: true
    });
    if (enabledLayers && enabledLayers.length > 0) {
      const metadataFuncs = [];
      enabledLayers.forEach((l) => {
        metadataFuncs.push(
          new Promise((resolve, reject) => {
            d3.json(define_process_env_default.VITE_REACT_APP_WP_API + "/wp/v2/media/" + l.id).then((data) => {
              resolve({ id: l.id, url: data.source_url, index: l.index });
            }).catch(function(error) {
              resolve({ id: l.id, url: null, index: l.index });
            });
          })
        );
      });
      Promise.all(metadataFuncs).then((metadata) => {
        const layerFuncs = [];
        metadata.forEach((m) => {
          if (m.url) {
            layerFuncs.push(
              new Promise((resolve, reject) => {
                d3.json(m.url).then((data) => {
                  resolve({ id: m.id, data, index: m.index });
                });
              })
            );
          }
        });
        Promise.all(layerFuncs).then((layers) => {
          this.setState({
            layers,
            layersLoading: false
          });
        });
      });
    } else {
      d3.json(source).then((data) => {
        this.setState({
          layers: [{ id: null, url: source, data, index: 0 }],
          layersLoading: false
        });
      });
    }
  }
  getMainLayer() {
    const layers = this.getLayers();
    const { mainLayerId, enabledLayers } = this.props;
    let layer;
    if (layers) {
      layer = layers.filter(
        (layer2) => layer2.id == mainLayerId || layer2.id == null
      )[0] || layers[0];
    }
    return layer ? layer.data : null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { selectedMeasure, layers, selectedPolygon } = this.state;
    const mainLayer = this.getMainLayer();
    const { transformedData, intl, zoomOnFilterField, appliedFilters } = this.props;
    const { appliedFilters: prevAppliedFilters } = prevProps;
    if (zoomOnFilterField) {
      const prevAppliedItems = [];
      const appliedItems = [];
      if (prevAppliedFilters) {
        Object.keys(prevAppliedFilters).forEach((k) => {
          prevAppliedItems.push(
            ...prevAppliedFilters[k].filter(
              (v) => v != Number.MIN_SAFE_INTEGER
            )
          );
        });
      }
      if (appliedFilters) {
        Object.keys(appliedFilters).forEach((k) => {
          appliedItems.push(
            ...appliedFilters[k].filter((v) => v != Number.MIN_SAFE_INTEGER)
          );
        });
      }
      if (prevAppliedItems.length > 0 && appliedItems.length == 0) {
        this.onReset();
      }
    }
    this.tooltip.style("visibility", "hidden");
    if (prevProps.enabledLayers.length != this.props.enabledLayers.length) {
      this.loadLayers();
    }
    const features = this.getFeatures();
    if (prevProps.center !== this.props.center) {
      this.mapPosition = null;
      this.projection.scale(this.props.scale).center(this.props.center).translate([this.getWidth() / 2, this.getHeight() / 2]);
    }
    const filterUpdated = this.filterUpdated(prevProps, prevState);
    this.d3Map(features, filterUpdated);
    if (layers && transformedData && (transformedData != prevProps.transformedData || layers != prevState.layers || selectedMeasure != prevState.selectedMeasure || selectedPolygon != prevState.selectedPolygon || mainLayer != prevState.mainLayer || prevProps.mainLayerId !== this.props.mainLayerId || JSON.stringify(prevProps.enabledLayers) != JSON.stringify(this.props.enabledLayers))) {
      this.updateFeatures(this.getFeatures(), filterUpdated);
    }
  }
  getHeight() {
    return this.props.height;
  }
  getWidth() {
    if (this.mapContainer.current) {
      return this.mapContainer.current.offsetWidth;
    }
    return this.props.width;
  }
  boundingExtent(features) {
    let x0, x1, y0, y1;
    for (const x in features) {
      const [[xx0, yy0], [xx1, yy1]] = this.path.bounds(features[x]);
      if (xx0 < x0 || x0 == null) {
        x0 = xx0;
      }
      if (xx1 > x1 || x1 == null) {
        x1 = xx1;
      }
      if (yy0 < y0 || y0 == null) {
        y0 = yy0;
      }
      if (yy1 > y1 || y1 == null) {
        y1 = yy1;
      }
    }
    return [
      [x0, y0],
      [x1, y1]
    ];
  }
  onReset() {
    this.mapPosition = null;
    this.tooltip.style("visibility", "hidden");
    this.fullView();
  }
  resizeLabels() {
    const { labelFontSize, mapLabelField } = this.props;
    const labels = d3.select(this.getMapId()).select("svg").select("g").selectAll(".map-labels-container");
    labels.each((d, i, nodes) => {
      const label = d3.select(nodes[i]);
      const transform = d3.zoomTransform(label.node());
      const position = this.getLabelPosition(d);
      let boxWidth = this.getLabelBoxWidth(d);
      let boxHeight = this.getLabelBoxHeight(d);
      if (d.properties[mapLabelField]) {
        boxWidth = transform.k > 1 ? boxWidth / transform.k : boxWidth;
        boxHeight = transform.k > 1 ? boxHeight / transform.k : boxHeight;
      }
      const scalingFactor = Math.pow(transform.k, 0.5);
      label.attr("x", position[0] - boxWidth / 2).attr("y", position[1] - (transform.k > 1 ? 10 / transform.k : 10)).attr("width", boxWidth).attr("height", boxHeight).attr(
        "font-size",
        (transform.k > 1 ? labelFontSize / scalingFactor : labelFontSize) + "px"
      );
    });
  }
  resizePointLabels() {
    const { labelFontSize, mapLabelField } = this.props;
    const labels = d3.select(this.getMapId()).select("svg").select("g").selectAll(".point-labels-container");
    labels.each((d, i, nodes) => {
      const label = d3.select(nodes[i]);
      const transform = d3.zoomTransform(label.node());
      let boxWidth = this.getLabelBoxWidth(d) + 20;
      boxWidth = transform.k > 1 ? boxWidth / transform.k : boxWidth;
      const position = this.projection([
        d.geometry.coordinates[1],
        d.geometry.coordinates[0]
      ]);
      let adjustment = this.getLabelBoxHeight(d) / 2;
      adjustment = transform.k > 1 ? adjustment / transform.k : adjustment;
      const width = this.getLabelBoxWidth(d) + 30;
      const fontSize = transform.k > 1 ? labelFontSize / transform.k : labelFontSize;
      label.attr("x", position[0] - boxWidth / 2).attr("y", position[1] - adjustment).attr("width", width).attr("font-size", fontSize + "px");
    });
  }
  resizeCircles(transform) {
    const circles = d3.select(this.getMapId()).select("svg").selectAll("circle");
    circles.attr("r", transform.k > 1 ? 6 / transform.k : 6);
  }
  zoomed(event) {
    this.tooltip.style("visibility", "hidden");
    const transform = event.transform;
    const g = d3.select(this.getMapId()).select("svg").select("g");
    g.attr("transform", transform);
    this.resizeCircles(transform);
    this.resizeLabels(transform);
    this.resizePointLabels(transform);
  }
  zoomEnd(event) {
    const { editing } = this.props;
    const transform = event.transform;
    this.mapPosition = { k: transform.k, x: transform.x, y: transform.y };
    if (editing) {
      const parentWindow = window.parent;
      parentWindow.postMessage(
        { type: "map", value: JSON.stringify(this.mapPosition) },
        "*"
      );
    }
  }
  classColor(d) {
    let { zoomEnabled } = this.props;
    if (!zoomEnabled) {
      zoomEnabled = ["mobile", "tablet", "midTablet"].includes(getDeviceType()) ? true : false;
    }
    if (zoomEnabled) {
      return "active zoom-enabled";
    } else {
      return "active";
    }
  }
  generateBreaks(data) {
    const { autoGenerateBreaks, numberOfBreaks, colorScheme } = this.props;
    const generatedBreaks = [];
    if (autoGenerateBreaks && data && data.length > 0) {
      const parsedData = data.filter((d) => d.properties && d.properties.value != null).map((d) => {
        return d.properties.value.toFixed(2);
      });
      const values = [];
      parsedData.forEach((item) => {
        if (item > 0) {
          const floor = item * 0.99;
          const ceil = item * 1.01;
          if (values.indexOf(floor) === -1) {
            values.push(floor);
          }
          if (values.indexOf(ceil) === -1) {
            values.push(ceil);
          }
        }
      });
      const colors = colorSchemes[colorScheme];
      if (values.length > 0) {
        const serie = new geoStats(values);
        serie.setPrecision(2);
        const numberOfRanges = values.length > 1 ? values.length - 1 : values.length;
        serie.getJenks(Math.min(numberOfBreaks, numberOfRanges));
        serie.ranges.forEach((range, i) => {
          const legendBreak = {};
          const adjustment = 0.01;
          legendBreak.min = parseFloat(range.substr(0, range.indexOf("-") - 1)) + (i > 0 ? adjustment : 0);
          legendBreak.max = parseFloat(
            range.substr(range.indexOf("-") + 2, range.length)
          );
          legendBreak.color = colors[i];
          generatedBreaks.push(legendBreak);
        });
        return generatedBreaks;
      }
    }
    return generatedBreaks;
  }
  getBreaks() {
    const { legendBreaks, autoGenerateBreaks } = this.props;
    if (autoGenerateBreaks) {
      const features = this.getFeatures();
      return this.generateBreaks(features);
    } else {
      let filteredBreaks = legendBreaks;
      if (this.getSelectedMeasure()) {
        filteredBreaks = legendBreaks.filter((b) => b.measure === this.getSelectedMeasure()).filter((f) => {
          const result = true;
          if (f.filters && f.filters.length > 0) {
            if (this.props.appliedFilters && JSON.stringify(this.props.appliedFilters) !== "{}") {
              const keys = Object.keys(this.props.appliedFilters);
              const found = f.filters.filter((filter) => {
                if (keys.indexOf(filter.field) != -1) {
                  const appliedFieldValues = this.props.appliedFilters[filter.field];
                  const breaksFilterValues = filter.values;
                  return appliedFieldValues.join(",").indexOf(breaksFilterValues) != -1;
                }
                return false;
              });
              return found.length > 0;
            }
          }
          return result;
        });
      }
      return filteredBreaks;
    }
  }
  fillColor(d, breaks) {
    const { mapNoDataColor, mainLayerId } = this.props;
    let overrideColor;
    if (d.properties && d.properties.variables && this.state.selectedMeasure && d.properties.value != null) {
      const key = COLOR_VARIABLE + this.state.selectedMeasure;
      overrideColor = d.properties.variables[key.trim()];
      if (overrideColor) {
        return overrideColor;
      }
    }
    if (d.properties.value != null && (mainLayerId && d.properties.layerId === mainLayerId || !mainLayerId)) {
      const breakItem = breaks.find((item) => {
        if (item.min != null && item.max != null) {
          return d.properties.value >= item.min && d.properties.value <= item.max;
        }
        if (item.min != null) {
          return d.properties.value >= item.min;
        }
        if (item.max != null) {
          return d.properties.value <= item.max;
        }
      });
      return breakItem && breakItem.color ? breakItem.color : mapNoDataColor;
    }
    const layerProps = this.props.enabledLayers.filter(
      (l) => l.id === d.properties.layerId
    )[0];
    if (layerProps && layerProps.bgColor && layerProps.bgColor != "undefined") {
      return layerProps.bgColor;
    }
    return mapNoDataColor;
  }
  setValues() {
    const features = this.getFeatures();
    const group = d3.select(this.getMapId()).select("svg").select("g");
    group.selectAll("path").data(features).join("path").attr("d", this.path);
  }
  getLabelPosition(d) {
    if (d.properties.LABEL_LATITUDE && d.properties.LABEL_LONGITUDE) {
      return this.projection([
        d.properties.LABEL_LONGITUDE,
        d.properties.LABEL_LATITUDE
      ]);
    } else {
      return this.path.centroid(d);
    }
  }
  updateFeatures(features, filterUpdated) {
    const { mapLabelField, symbols, highlightedLocation } = this.props;
    const sortedFeatures = [
      ...features.filter((f) => {
        return highlightedLocation != f.properties[mapLabelField];
      }),
      ...features.filter((f) => {
        return highlightedLocation == f.properties[mapLabelField];
      })
    ];
    this.drawPolygons(sortedFeatures);
    this.drawLabels(sortedFeatures);
    this.drawPoints(sortedFeatures, filterUpdated);
    if (symbols.length > 0) {
      this.addSymbols(symbols, sortedFeatures);
    }
  }
  drawLabels(sortedFeatures) {
    const {
      mapLabelField,
      mapLabelShowValue,
      intl,
      valueFormat,
      showNoDataLabel,
      labelFontColor,
      labelFontWeight,
      labelFontSize,
      showAdminUnitLabel,
      mapType,
      noDataText,
      labelsExclusionList
    } = this.props;
    const group = d3.select(this.getMapId()).select("svg").select("g");
    const labelsExist = group.selectAll(".map-labels-container").size() > 0;
    if (labelsExist) {
      console.log("Labels already exist, skipping redraw...");
      return;
    }
    group.selectAll(".map-labels").data(
      sortedFeatures.filter((f) => {
        if (labelsExclusionList && labelsExclusionList.length > 0) {
          return !labelsExclusionList.includes(f.properties[mapLabelField]);
        }
        return true;
      })
    ).enter().append("foreignObject").attr("class", "map-labels-container").attr("x", (d) => {
      const position = this.getLabelPosition(d);
      if (d.properties[mapLabelField]) {
        const boxWidth = this.getLabelBoxWidth(d);
        return position[0] - boxWidth / 2;
      } else {
        return position[0];
      }
    }).attr("y", (d) => {
      const position = this.getLabelPosition(d);
      return position[1] - 10;
    }).attr("width", (d) => this.getLabelBoxWidth(d)).attr("height", (d) => this.getLabelBoxHeight(d)).attr("font-size", (d, i) => labelFontSize + "px").attr("overflow", "visible").attr("opacity", 1).style("display", (d) => {
      if (showAdminUnitLabel == SHOW_ALL || showAdminUnitLabel == SHOW_IF_HAS_DATA && d.properties.hasDataRow) {
        return "block";
      } else {
        return "none";
      }
    }).attr("pointer-events", mapType == "POINTS_MAP" ? "none" : "all").on("mouseover", this.showTooltip).on("mousemove", this.mousemove).on("mouseout", this.mouseout).append("xhtml:div").style("color", (d, i) => labelFontColor).style("font-weight", (d) => labelFontWeight).style("background-color", (d) => {
      if (d.properties.hasDataRow && mapLabelShowValue) {
        if (d.properties.value != null || d.properties.value == null && showNoDataLabel) {
          return "#fff6e1";
        }
      }
      return "none";
    }).style("border-radius", (d) => "4px").style("line-height", "95%").style("text-align", "center").html((d, i) => {
      return this.createLabel(d);
    });
  }
  createLabel(d) {
    const {
      mapLabelField,
      mapLabelShowValue,
      intl,
      valueFormat,
      showNoDataLabel,
      showAdminUnitLabel,
      noDataText
    } = this.props;
    let label = "";
    if (showAdminUnitLabel == SHOW_ALL || showAdminUnitLabel == SHOW_IF_HAS_DATA && d.properties.hasDataRow) {
      label = d.properties[mapLabelField];
      const abbrev = d.properties["abbrev"];
      if (label && label.length > MAX_LABEL_LEN && abbrev) {
        label = abbrev;
      }
      if (mapLabelShowValue) {
        if (d.properties.value != null) {
          const variables = d.properties.variables || {};
          label += "<br><span class='map-label-value'>" + formatContent(
            valueFormat,
            {
              value: d.properties.value,
              measure: this.getSelectedMeasure(),
              ...variables
            },
            intl
          ) + "</span>";
        } else {
          if (showNoDataLabel == true && d.properties.value == null && d.properties.hasDataRow) {
            label += "<br><span class='map-label-value'>" + noDataText + "</span>";
          }
        }
      }
    }
    return label;
  }
  drawPolygons(sortedFeatures) {
    const {
      mapLabelField,
      mapBoundaryColor,
      mapFocusBoundaryColor,
      highlightedLocation
    } = this.props;
    const breaks = this.getBreaks();
    const group = d3.select(this.getMapId()).select("svg").select("g");
    const polygons = sortedFeatures.filter(
      (f) => f.geometry && f.geometry && (f.geometry.type == "Polygon" || f.geometry.type == "MultiPolygon")
    );
    if (polygons.length > 0) {
      group.selectAll("path").data(polygons).join("path").attr("d", this.path).attr("fill", (d) => this.fillColor(d, breaks)).attr("stroke-width", (d) => {
        if (highlightedLocation == d.properties[mapLabelField]) {
          return 1.2;
        } else {
          return 0.4;
        }
      }).attr("stroke", (d) => {
        if (highlightedLocation == d.properties[mapLabelField]) {
          return mapFocusBoundaryColor;
        } else {
          return mapBoundaryColor;
        }
      }).on("click", this.onPolygonClick);
    }
  }
  drawPoints(sortedFeatures, filterUpdated) {
    const {
      intl,
      pointLabelColor,
      pointLabelFormat,
      transformedData,
      defaultPointColor,
      appliedFilters,
      zoomOnFilterField,
      noDataText,
      showShadingLayerLabels
    } = this.props;
    const group = d3.select(this.getMapId()).select("svg").select("g");
    let pointsFromData = [];
    if (transformedData.pointsData) {
      let selectedLocation = this.state.selectedPolygon;
      if (filterUpdated && appliedFilters && appliedFilters[zoomOnFilterField]) {
        selectedLocation = appliedFilters[zoomOnFilterField];
      }
      pointsFromData = transformedData.pointsData.filter((p) => p.lat && p.lng && p.label == selectedLocation).map((p) => {
        return {
          properties: {
            label: p.label,
            lat: p.lat,
            lng: p.lng,
            value: p.value,
            variables: p.variables
          }
        };
      });
      group.selectAll(".circle").data(pointsFromData).enter().append("circle").attr("id", (d, i) => {
        return "circle" + i;
      }).attr("cx", (d) => {
        const position = this.projection([
          d.properties.lng,
          d.properties.lat
        ]);
        return position[0];
      }).attr("cy", (d) => {
        const position = this.projection([
          d.properties.lng,
          d.properties.lat
        ]);
        return position[1];
      }).attr("r", (d, i) => {
        return 2;
      }).style("stroke-width", 0.5).style("fill", (d, i) => {
        return defaultPointColor;
      }).on("mouseover", (d, i) => this.onPointClick(d, i)).on("mouseout", this.mouseout);
    }
    const breaks = this.getBreaks();
    let points = [];
    if (showShadingLayerLabels == SHOW_ALL) {
      points = sortedFeatures.filter(
        (f) => f.geometry && f.geometry.type == "Point"
      );
    } else if (showShadingLayerLabels == SHOW_IF_HAS_DATA) {
      points = sortedFeatures.filter(
        (p) => p.geometry && p.geometry.type == "Point" && p.properties.hasDataRow
      );
    }
    if (points.length > 0) {
      group.selectAll(".point-labels").data(points).enter().append("foreignObject").attr("id", (d, i) => {
        return "point-label" + i;
      }).attr("class", "point-labels-container").attr("x", (d) => {
        const width = this.getLabelBoxWidth(d) + 20;
        const position = this.projection([
          d.geometry.coordinates[1],
          d.geometry.coordinates[0]
        ]);
        return position[0] - width / 2;
      }).attr("y", (d) => {
        const position = this.projection([
          d.geometry.coordinates[1],
          d.geometry.coordinates[0]
        ]);
        return position[1] - this.getLabelBoxHeight(d) / 2;
      }).attr("width", (d) => this.getLabelBoxWidth(d) + 20).attr("height", (d) => "1px").attr("overflow", "visible").attr("font-size", "12px").style("opacity", 1).append("xhtml:div").style("color", (d, i) => pointLabelColor).style("font-weight", (d) => "bold").style("background-color", (d) => this.fillColor(d, breaks)).style("padding", (d) => "5px 3px 5px 3px").style("border-radius", (d) => "4px").style("line-height", "100%").style("text-align", "center").html((d, i) => {
        return formatContent(
          pointLabelFormat,
          {
            value: d.properties.value,
            locationName: d.properties[this.props.mapLabelField]
          },
          intl
        );
      }).on("mouseover", (event, d, i) => {
        d3.select(this.getMapId()).select("svg").select("g").select("#point-label" + i).raise();
        this.showTooltip(event, d);
      }).on("mousemove", this.mousemove).on("mouseout", this.mouseout);
    }
  }
  addSymbols(symbols, features) {
    const { mappingField } = this.props;
    const group = d3.select(this.getMapId()).select("svg").select("g");
    symbols.forEach((symbol) => {
      if (symbol.field && symbol.image && symbol.values) {
        const filteredFeaturesWithGpsCoords = features.filter((f) => {
          const fieldName = LOCATION == symbol.field ? mappingField : "value";
          const fiedValue = (f.properties[fieldName] || (f.properties.variables ? f.properties.variables[fieldName] : "")) + "";
          const valuesToMatch = symbol.values + "";
          const valuesToMatchArr = valuesToMatch.split(",");
          return f.properties.LATITUDE && f.properties.LONGITUDE && valuesToMatchArr.filter(
            (v) => v.trim().toLowerCase() == fiedValue.trim().toLowerCase()
          ).length > 0;
        });
        const filteredFeaturesNoCoords = features.filter((f) => {
          const fieldName = LOCATION == symbol.field ? mappingField : "value";
          const fiedValue = (f.properties[fieldName] || (f.properties.variables ? f.properties.variables[fieldName] : "")) + "";
          const valuesToMatch = symbol.values + "";
          const valuesToMatchArr = valuesToMatch.split(",");
          return !f.properties.LATITUDE && !f.properties.LONGITUDE && valuesToMatchArr.filter(
            (v) => v.trim().toLowerCase() == fiedValue.trim().toLowerCase()
          ).length > 0;
        });
        group.selectAll("image").data(filteredFeaturesWithGpsCoords).enter().append("image").attr("width", 40).attr("height", 40).attr("class", "map-symbol").attr("xlink:href", "/" + symbol.image).attr("transform", (d) => {
          return "translate(" + this.projection([d.properties.LONGITUDE, d.properties.LATITUDE]) + ")";
        }).on("mouseover", this.showTooltip).on("mousemove", this.mousemove).on("mouseout", this.mouseout);
        group.selectAll("image").data(filteredFeaturesNoCoords).enter().append("image").attr("width", 40).attr("height", 40).attr("class", "map-symbol").attr("xlink:href", "/" + symbol.image).attr("x", (d) => {
          return this.path.centroid(d)[0] - 20;
        }).attr("y", (d) => {
          return this.path.centroid(d)[1];
        }).on("mouseover", this.showTooltip).on("mousemove", this.mousemove).on("mouseout", this.mouseout);
      }
    });
  }
  getLabelBoxHeight() {
    const { mapLabelShowValue } = this.props;
    if (mapLabelShowValue) {
      return 30;
    }
    return 25;
  }
  getLabelBoxWidth(d) {
    const { mapLabelField } = this.props;
    const defaultLength = 80;
    if (d.properties[mapLabelField]) {
      const textLength = d.properties[mapLabelField].length;
      if (textLength < 10) {
        return defaultLength;
      }
      return textLength * 8;
    }
    return 0;
  }
  featuresZoom(fs, immediate, callback) {
    const svg = d3.select(this.getMapId()).select("svg");
    const bounds = this.boundingExtent(fs);
    const [[x0, y0], [x1, y1]] = bounds;
    const width = this.getWidth();
    const height = this.getHeight();
    const scale = Math.min(
      8,
      0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)
    );
    const translate = [width / 2 - (x0 + x1) / 2, height / 2 - (y0 + y1) / 2];
    if (immediate) {
      svg.call(
        this.zoom.transform,
        d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
      );
    } else {
      svg.transition().duration(450).call(
        this.zoom.transform,
        d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
      ).on("end", callback);
    }
  }
  fullView() {
    const { mapPosition, editing } = this.props;
    const svg = d3.select(this.getMapId()).select("svg");
    const paths = svg.select("g").selectAll(".active");
    paths.attr("class", function() {
      return d3.select(this).attr("class").replace(/background/gi, "");
    });
    let targetTransform = d3.zoomIdentity;
    if (mapPosition && !editing) {
      targetTransform = targetTransform.translate(mapPosition.x, mapPosition.y).scale(mapPosition.k);
    } else {
      targetTransform = targetTransform.translate(0, 0).scale(1);
    }
    svg.transition().duration(300).call(this.zoom.transform, targetTransform);
  }
  showTooltip(event, d) {
    const {
      showTooltip,
      tooltipTheme,
      customTooltips,
      tooltipFontSize,
      tooltipFormat,
      intl,
      mappingField,
      showNoDataTooltip,
      fields,
      mapType,
      noDataText
    } = this.props;
    let { zoomEnabled } = this.props;
    zoomEnabled = ["mobile", "tablet", "midTablet"].includes(getDeviceType()) ? true : false;
    if (showTooltip && d.properties.value != null || showTooltip && showNoDataTooltip) {
      const svg = d3.select(this.getMapId()).select("svg");
      const elements = svg.select("g").selectAll(".active");
      elements.attr("class", (p) => {
        if (p.properties[mappingField] === d.properties[mappingField]) {
          return "focus" + (zoomEnabled ? " zoom-enabled" : "");
        } else {
          return "active" + (zoomEnabled ? " zoom-enabled" : "");
        }
      });
      const format = tooltipFormat || "{locationName} %({value},2) \n {label}: %({value},2)";
      const dataVars = d.properties.variables || {};
      const variables = {
        ...d.properties,
        value: d.properties.value,
        measure: this.getSelectedMeasure(),
        measureLabel: d.properties.measureLabel,
        locationName: d.properties[mappingField],
        ...dataVars
      };
      this.tooltip.attr("class", tooltipTheme).style("position", "absolute").style("visibility", "hidden").style("visibility", "visible").html((e) => {
        let html = `<div style='font-size:${tooltipFontSize}px;' class='tooltip-content' >`;
        if (d.properties.value != null) {
          const lines = format.split("\n");
          const headerFormat = lines[0];
          const overallFormat = lines.length > 1 ? lines[1] : null;
          let breakdownLineIndex = 1;
          let breakdownFormat;
          if (fields.length > 1 && mapType != "POINTS_MAP") {
            breakdownLineIndex = lines.length > 2 ? 2 : 1;
            breakdownFormat = lines[breakdownLineIndex];
          } else {
            breakdownFormat = null;
          }
          if (headerFormat) {
            html += formatContent(headerFormat, variables, intl);
          }
          if (overallFormat) {
            if (!html.endsWith("<hr>")) {
              html += "<hr>";
            }
            html += formatContent(overallFormat, variables, intl);
          }
          if (breakdownFormat) {
            if (d.properties.children) {
              d.properties.children.forEach((child, index2) => {
                const vars = {
                  value: child.value,
                  label: child.label,
                  measure: this.getSelectedMeasure(),
                  measureLabel: d.properties.measureLabel,
                  ...dataVars
                };
                if (!html.endsWith("<hr>")) {
                  html += "<hr>";
                }
                html += formatContent(
                  breakdownFormat,
                  vars,
                  intl
                );
              });
            }
          }
          if (lines.length > breakdownLineIndex + 1) {
            if (!html.endsWith("<hr>")) {
              html += "<hr>";
            }
            lines.forEach((line, index2) => {
              if (index2 > breakdownLineIndex) {
                if (!html.endsWith("<hr>")) {
                  html += "<hr>";
                }
                html += formatContent(line, variables, intl);
              }
            });
          }
          const tooltips = customTooltips.filter(
            (t) => t.location === d.properties[mappingField]
          );
          tooltips.forEach((t) => {
            if (!html.endsWith("<hr>")) {
              html += "<hr>";
            }
            html += t.tooltip;
          });
        } else {
          const format2 = tooltipFormat || "{locationName} %({value},2) \n {label}: %({value},2)";
          const variables2 = {
            value: null,
            measure: this.getSelectedMeasure(),
            measureLabel: d.properties.measureLabel,
            locationName: d.properties[mappingField],
            ...dataVars
          };
          html += formatContent(format2, variables2, intl);
          html += "</div>";
        }
        return html;
      });
    }
  }
  mousemove(event, d) {
    this.tooltip.style("top", event.pageY + "px").style("left", event.pageX + 5 + "px");
  }
  mouseout(event, d) {
    const { showTooltip } = this.props;
    if (showTooltip) {
      const svg = d3.select(this.getMapId()).select("svg");
      const paths = svg.select("g").selectAll(".focus");
      paths.attr("class", "active");
      this.tooltip.style("visibility", "hidden");
    }
  }
  onClick(event, d) {
    if (d.properties) {
      this.tooltip.style("visibility", "visible").style("top", event.pageY + "px").style("left", event.pageX + 5 + "px");
    }
    event.stopPropagation();
    event.preventDefault();
  }
  onPointClick(event, d, i) {
    this.showTooltip(event, d);
    this.tooltip.style("visibility", "visible").style("top", event.pageY + "px").style("left", event.pageX + 5 + "px");
    const svg = d3.select(this.getMapId()).select("svg").select("g");
    svg.selectAll("circle").style("fill", this.props.defaultPointColor).style("stroke", "none");
    svg.select("#circle" + i).raise().style("fill", "#fff");
  }
  onPolygonClick(event, d) {
    const { mappingField } = this.props;
    if (this.state.selectedPolygon !== d.properties[mappingField] && d.properties.value !== null) {
      this.setState({ selectedPolygon: d.properties[mappingField] });
    }
  }
  onZoomIn(e) {
    const svg = d3.select(this.getMapId()).select("svg");
    svg.transition().call(this.zoom.scaleBy, 1.5);
  }
  onZoomOut() {
    const svg = d3.select(this.getMapId()).select("svg");
    svg.transition().call(this.zoom.scaleBy, 0.6667);
  }
  getSelectedMeasure() {
    let measure = this.state.selectedMeasure;
    if (!measure && this.props.transformedData && this.props.transformedData.measures && this.props.transformedData.measures.length > 1) {
      measure = this.props.transformedData.measures[0];
    }
    return measure;
  }
  getCollectionField(mainLayer) {
    const { topoJSONField } = this.props;
    if (mainLayer && mainLayer.objects) {
      const fields = Object.keys(mainLayer.objects);
      for (const index2 in fields) {
        const field = fields[index2];
        if (mainLayer.objects[field].type == "GeometryCollection") {
          return field;
        }
      }
    }
    return topoJSONField;
  }
  extractFeatures(mainLayer) {
    const collectionField = this.getCollectionField(mainLayer);
    if (mainLayer && mainLayer.objects && mainLayer.objects[collectionField]) {
      return topojson.feature(mainLayer, mainLayer.objects[collectionField]).features;
    } else if (mainLayer && mainLayer.features) {
      return mainLayer.features;
    }
    return [];
  }
  getLayers() {
    const { layers } = this.state;
    const { enabledLayers } = this.props;
    if (layers && layers.length > 0) {
      const updatedLayers = layers.map((layer) => {
        const found = enabledLayers.find((l) => l.id == layer.id);
        layer.index = found ? found.index : 0;
        return layer;
      });
      return updatedLayers.sort((a, b) => {
        if (parseInt(a.index) < parseInt(b.index)) {
          return 1;
        }
        if (parseInt(a.index) > parseInt(b.index)) {
          return -1;
        }
        return 0;
      });
    }
    return [];
  }
  getFeatures() {
    const mainLayer = this.getMainLayer();
    const layers = this.getLayers();
    if (mainLayer) {
      const { transformedData, mappingField, app, mainLayerId, enabledLayers } = this.props;
      let features = [];
      try {
        features = this.extractFeatures(mainLayer);
        features.map((f) => {
          f.properties.layerId = mainLayerId;
          return f;
        });
        if (layers) {
          layers.forEach((layer) => {
            if (layer.id != mainLayerId) {
              let tt = this.extractFeatures(layer.data);
              tt = tt.map((f) => {
                f.properties.layerId = layer.id;
                return f;
              });
              features = [...tt, ...features];
            }
          });
        }
      } catch (error) {
        console.log("error updating features .." + error);
      }
      const filteredFeatures = features.filter((d) => d.properties != null);
      let filterLocationsData = transformedData.locationsData;
      if (transformedData.measures && transformedData.measures.length > 1) {
        filterLocationsData = transformedData.locationsData.filter(
          (d) => d.measure === this.getSelectedMeasure()
        );
      }
      filteredFeatures.map((f) => {
        if (filterLocationsData) {
          const dataItem = filterLocationsData.find((d) => {
            const nameOnData = d.label ? d.label.toLowerCase() : "";
            const nameOnMapFile = f.properties[mappingField] ? f.properties[mappingField].toLowerCase() : "";
            return nameOnData === nameOnMapFile;
          });
          if (dataItem) {
            let measureLabel = dataItem.measure;
            if (transformedData.measureLabelMap && dataItem.measure && transformedData.measureLabelMap[dataItem.measure]) {
              measureLabel = transformedData.measureLabelMap[dataItem.measure];
            }
            f.properties.value = dataItem.value;
            f.properties.measure = dataItem.measure;
            f.properties.measureLabel = measureLabel;
            f.properties.children = dataItem.children;
            f.properties.variables = dataItem.variables;
            f.properties.hasDataRow = true;
            Object.keys(dataItem).forEach((key) => {
              f.properties[key] = dataItem[key];
            });
          } else {
            f.properties.value = null;
            f.properties.measure = null;
            f.properties.children = null;
            f.properties.measureLabel = null;
            f.properties.hasDataRow = false;
          }
        }
      });
      return filteredFeatures;
    }
    return [];
  }
  getMapId() {
    const { unique } = this.props;
    return ".map.wrapper." + unique;
  }
  filterUpdated(prevProps, prevState) {
    const { zoomOnFilterField } = this.props;
    const prevFilters = prevProps && prevProps.appliedFilters || {};
    const appliedFilters = this.props.appliedFilters || {};
    let filterUpdated = false;
    if (prevFilters[zoomOnFilterField] != appliedFilters[zoomOnFilterField]) {
      filterUpdated = true;
    }
    return filterUpdated;
  }
  getCenter(features, filterUpdated) {
    const { zoomOnFilter, zoomOnFilterField, mappingField, appliedFilters } = this.props;
    let center = null;
    if (zoomOnFilter && zoomOnFilterField) {
      let selectedLocation = this.state.selectedPolygon;
      if (filterUpdated && appliedFilters && appliedFilters[zoomOnFilterField]) {
        selectedLocation = appliedFilters[zoomOnFilterField];
      }
      const featureToCenterOn = features.filter(
        (d) => d.properties != null && d.properties[mappingField] == selectedLocation
      )[0];
      if (featureToCenterOn && featureToCenterOn.properties != null && featureToCenterOn.properties.value) {
        center = featureToCenterOn;
      }
    }
    return center;
  }
  area(poly) {
    let s = 0;
    const coordinates = poly.coordinates.length > 1 ? poly.coordinates[0][0] : poly.coordinates[0];
    for (let i = 0; i < coordinates.length - 1; i++) {
      s += coordinates[i][0] * coordinates[i + 1][1] - coordinates[i + 1][0] * coordinates[i][1];
    }
    return 0.5 * s;
  }
  centroid(poly) {
    const c = [0, 0];
    const coordinates = poly.coordinates.length > 1 ? poly.coordinates[0][0] : poly.coordinates[0];
    for (let i = 0; i < coordinates.length - 1; i++) {
      c[0] += (coordinates[i][0] + coordinates[i + 1][0]) * (coordinates[i][0] * coordinates[i + 1][1] - coordinates[i + 1][0] * coordinates[i][1]);
      c[1] += (coordinates[i][1] + coordinates[i + 1][1]) * (coordinates[i][0] * coordinates[i + 1][1] - coordinates[i + 1][0] * coordinates[i][1]);
    }
    const a = this.area(poly);
    c[0] /= a * 6;
    c[1] /= a * 6;
    return c;
  }
  d3Map(features, filterUpdated) {
    const { mapContainerBgColor, mapPosition, editing, mapType } = this.props;
    let zoomEnabled = this.props.zoomEnabled;
    if (!zoomEnabled) {
      zoomEnabled = ["mobile", "tablet"].includes(getDeviceType()) ? true : false;
    }
    const breaks = this.getBreaks();
    const container = d3.select(this.getMapId());
    let svg = container.select("svg");
    let containerWidth = this.getWidth();
    if (containerWidth === 0) {
      containerWidth = window.innerWidth + deviceMapWidth[getDeviceType()];
    } else {
      containerWidth += deviceMapWidth[getDeviceType()];
    }
    const containerHeight = this.getHeight() - 100;
    if (svg.empty()) {
      svg = container.append("svg");
    } else {
      svg.selectAll("*").remove();
    }
    svg.attr(
      "style",
      `background-color:${mapContainerBgColor};`
    ).attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`).attr("preserveAspectRatio", "xMidYMid meet");
    svg.append("g").selectAll("path").data(features).enter().append("path").attr("fill", (d) => this.fillColor(d, breaks)).attr("d", d3.geoPath().projection(this.projection)).attr("class", (d) => this.classColor(d)).on("mouseover", mapType !== "POINTS_MAP" ? this.showTooltip : null).on("mousemove", mapType !== "POINTS_MAP" ? this.mousemove : null).on("mouseout", mapType !== "POINTS_MAP" ? this.mouseout : null);
    if (this.mapPosition) {
      svg.transition().duration(300).call(
        this.zoom.transform,
        d3.zoomIdentity.translate(this.mapPosition.x, this.mapPosition.y).scale(this.mapPosition.k)
      );
    }
    if (!this.mapPosition && mapPosition && mapPosition.x && mapPosition.y && mapPosition.k) {
      svg.transition().duration(300).call(
        this.zoom.transform,
        d3.zoomIdentity.translate(mapPosition.x, mapPosition.y).scale(mapPosition.k)
      );
      if (mapType === "POINTS_MAP") {
        const deviceTranslates = {
          "mobile": 100,
          "tablet": 0,
          "midTablet": 0,
          "desktop": 0,
          "laptop": 0,
          "wide": 0
        };
        const translateVal = deviceTranslates[getDeviceType()];
        svg.transition().duration(300).call(
          this.zoom.transform,
          d3.zoomIdentity.translate(mapPosition.x + translateVal, mapPosition.y).scale(mapPosition.k)
        );
      }
    }
    if (zoomEnabled || editing) {
      svg.call(this.zoom);
    } else {
      svg.on("dblclick.zoom", null);
    }
    const center = this.getCenter(features, filterUpdated);
    if (center) {
      const bounds = this.path.bounds(center);
      const centerx = [
        (bounds[0][0] + bounds[1][0]) / 2,
        (bounds[0][1] + bounds[1][1]) / 2
      ];
      svg.transition().duration(750).call(
        this.zoom.transform,
        d3.zoomIdentity.translate(containerWidth / 2, containerHeight / 2).scale(12).translate(-centerx[0], -centerx[1])
      );
    }
  }
  getAvg() {
    const { transformedData } = this.props;
    return transformedData.nationalData.value;
  }
  selectedMeasureChanged(selected) {
    if (this.state.selectedMeasure != selected) {
      this.setState({ selectedMeasure: selected });
    }
  }
  getFilters() {
    const { appliedFilters } = this.props;
    const results = {};
    if (appliedFilters) {
      const keys = Object.keys(appliedFilters);
      keys.forEach((k) => {
        const selected = appliedFilters[k];
        if (selected) {
          results[k] = Array.isArray(selected) ? selected.join(" ,") : selected;
        }
      });
    }
    return results;
  }
  getHighlightedLocationData() {
    const { highlightedLocation, transformedData } = this.props;
    let filterLocationsData = transformedData.locationsData;
    if (transformedData.measures && transformedData.measures.length > 1) {
      filterLocationsData = transformedData.locationsData.filter(
        (d) => d.measure === this.getSelectedMeasure()
      );
    }
    const dataItem = filterLocationsData.find(
      (d) => d.label === highlightedLocation
    );
    return dataItem;
  }
  getHighlightedLocationColor(data) {
    const breaks = this.getBreaks();
    const { mapNoDataColor } = this.props;
    const value = data ? data.value : null;
    if (value != null) {
      const breakItem = breaks.find((item) => {
        if (item.min != null && item.max != null) {
          return value >= item.min && value <= item.max;
        }
        if (item.min != null) {
          return value >= item.min;
        }
        if (item.max != null) {
          return value <= item.max;
        }
      });
      return breakItem && breakItem.color ? breakItem.color : mapNoDataColor;
    }
    return mapNoDataColor;
  }
  renderLoader() {
    return /* @__PURE__ */ jsx(Container, { className: "loading", children: /* @__PURE__ */ jsx(
      Segment,
      {
        basic: true,
        padded: true,
        textAlign: "center",
        style: { margin: "30px" },
        children: /* @__PURE__ */ jsx(Dimmer, { active: true, inverted: true, children: /* @__PURE__ */ jsx(Loader, { size: "medium" }) })
      }
    ) });
  }
  render() {
    const {
      app,
      legendTitle,
      nationalAverageLabel,
      intl,
      transformedData,
      measureSelectorLabel,
      valueFormat,
      showOverallValue,
      unique,
      highlightedLocation,
      labelFontColor,
      legendFontSize,
      editing,
      highlightedLocLabelFormat,
      noDataText
    } = this.props;
    let {
      zoomEnabled
    } = this.props;
    if (!zoomEnabled) {
      zoomEnabled = ["mobile", "tablet", "midTablet"].includes(getDeviceType()) ? true : false;
    }
    const nationalAverage = this.getAvg();
    const filters = this.getFilters();
    const highlightedLocData = this.getHighlightedLocationData();
    const highlightedLocStyle = {
      backgroundColor: this.getHighlightedLocationColor(highlightedLocData),
      color: labelFontColor,
      fontSize: legendFontSize + "px"
    };
    if (editing) {
      highlightedLocStyle.marginTop = "25px";
    }
    const MapLegendComponent = () => /* @__PURE__ */ jsxs(Container, { fluid: true, className: "footnote ", children: [
      /* @__PURE__ */ jsxs(Grid, { columns: 2, children: [
        app !== "csv" && showOverallValue && /* @__PURE__ */ jsx(Grid.Column, { textAlign: "left", width: 4, children: /* @__PURE__ */ jsxs("div", { className: "national-average-div", children: [
          /* @__PURE__ */ jsx("span", { className: "national-avg-label", children: nationalAverageLabel }),
          /* @__PURE__ */ jsx("span", { className: "national-avg-value", children: formatContent(
            valueFormat,
            { value: nationalAverage },
            intl
          ) })
        ] }) }),
        /* @__PURE__ */ jsx(
          Grid.Column,
          {
            textAlign: "right",
            width: app !== "csv" && showOverallValue ? 12 : 16,
            children: /* @__PURE__ */ jsx(
              Legend,
              {
                filteredBreaks: this.getBreaks(),
                formattedLegendTitle: formatContent(
                  legendTitle,
                  { ...filters },
                  intl
                ),
                selectedMeasure: this.state.selectedMeasure,
                ...this.props
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "measure-selector", children: /* @__PURE__ */ jsxs("ul", { children: [
        measureSelectorLabel && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { className: "label", children: measureSelectorLabel }) }),
        transformedData && transformedData.measures && transformedData.measures.length > 1 && transformedData.measures.map((measure) => {
          return /* @__PURE__ */ jsxs(
            "li",
            {
              onClick: this.selectedMeasureChanged.bind(
                this,
                measure
              ),
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    checked: this.getSelectedMeasure() === measure,
                    type: "radio",
                    readOnly: true,
                    value: measure
                  }
                ),
                /* @__PURE__ */ jsx("label", { children: transformedData.measureLabelMap[measure] || measure })
              ]
            }
          );
        })
      ] }) })
    ] });
    return /* @__PURE__ */ jsxs("div", { className: "map component wp-data-viz-map", ref: this.mapContainer, children: [
      this.state.layersLoading && this.renderLoader(),
      !this.state.layersLoading && /* @__PURE__ */ jsxs(Fragment, { children: [
        !isMobileOrTablet && /* @__PURE__ */ jsx(MapLegendComponent, {}),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "map wrapper scaling-svg-container " + unique,
            style: { height: this.props.height - deviceMapHeight[getDeviceType()] + "px" },
            children: [
              highlightedLocData && highlightedLocData.value && /* @__PURE__ */ jsx(
                "div",
                {
                  className: "highlighted-loc-info",
                  style: highlightedLocStyle,
                  children: /* @__PURE__ */ jsxs("span", { children: [
                    " ",
                    formatContent(
                      highlightedLocLabelFormat,
                      {
                        value: highlightedLocData.value,
                        locationName: highlightedLocData.label,
                        measureName: highlightedLocData.measure
                      },
                      intl
                    )
                  ] })
                }
              ),
              (editing || zoomEnabled) && !isMobile && /* @__PURE__ */ jsxs("div", { className: "control panel ignore", children: [
                /* @__PURE__ */ jsx("div", { className: "zoom plus", onClick: this.onZoomIn, children: /* @__PURE__ */ jsx(Icon, { name: "plus", size: "large" }) }),
                /* @__PURE__ */ jsx("div", { className: "zoom minus", onClick: this.onZoomOut, children: /* @__PURE__ */ jsx(Icon, { name: "minus", size: "large" }) }),
                /* @__PURE__ */ jsx(
                  Popup,
                  {
                    content: /* @__PURE__ */ jsx(
                      FormattedMessage,
                      {
                        id: "map.reset.tooltip",
                        defaultMessage: "Reset zoom"
                      }
                    ),
                    trigger: /* @__PURE__ */ jsx("div", { className: "reset", onClick: this.onReset, children: /* @__PURE__ */ jsx(Icon, { name: "repeat", size: "large" }) })
                  }
                )
              ] })
            ]
          }
        ),
        isMobileOrTablet && /* @__PURE__ */ jsx(MapLegendComponent, {})
      ] })
    ] });
  }
}
const Map$1 = injectIntl(Map);
const MapDataFrame = ({ children, data, measures, customMeasureLabels }) => {
  const transformedData = {
    locationsData: [],
    nationalData: {},
    measureLabelMap: {}
  };
  data.metadata.measures.forEach((m) => {
    if (customMeasureLabels && customMeasureLabels[m.value] && customMeasureLabels[m.value].hasCustomLabel && customMeasureLabels[m.value].customLabel) {
      transformedData.measureLabelMap[m.value] = customMeasureLabels[m.value].customLabel;
    } else {
      transformedData.measureLabelMap[m.value] = m.label;
    }
  });
  const measuresArray = measures.split(",");
  if (data && data.children) {
    data.children.forEach((item) => {
      measuresArray.forEach((measure) => {
        const newItem = {
          ...item,
          label: item.value,
          value: item[measure],
          measure
        };
        if (item.children) {
          newItem.children = [];
          item.children.forEach((child) => {
            newItem.children.push({ ...child, label: child.value, value: child[measure] });
          });
        }
        transformedData.locationsData.push(newItem);
      });
    });
    transformedData.measures = measuresArray.length > 1 ? measuresArray : null;
    transformedData.nationalData.value = data[measures];
  }
  return React__default.Children.map(children, (child) => React__default.cloneElement(child, { transformedData }));
};
const MapCSVDataFrame = (props) => {
  const { mapType } = props;
  if (mapType == "POINTS_MAP") {
    return pointsMap(props);
  } else {
    return defaultMap(props);
  }
};
const pointsMap = (props) => {
  const { children, data, multipleMeasures, aggregationFormula } = props;
  const transformedData = {
    locationsData: [],
    nationalData: {},
    measures: [],
    measureLabelMap: {}
  };
  const indexOfValueColumn = data.meta.fields.findIndex((f, i) => {
    return i > 2 && !f.startsWith("_");
  });
  const adminLocationsData = [];
  if (data && data.data && data.meta.fields && data.meta.fields.length >= 2) {
    data.data.forEach((item) => {
      const newItem = {
        label: item[data.meta.fields[0]],
        lat: item[data.meta.fields[1]],
        lng: item[data.meta.fields[2]],
        value: item[data.meta.fields[indexOfValueColumn]] || 1,
        measure: data.meta.fields[indexOfValueColumn]
      };
      const variables = {};
      if (multipleMeasures && !transformedData.measures.includes(data.meta.fields[indexOfValueColumn])) {
        transformedData.measures.push(data.meta.fields[indexOfValueColumn]);
      }
      if (data.meta.fields.length > indexOfValueColumn) {
        newItem.children = [];
        for (let i = indexOfValueColumn + 1; i <= data.meta.fields.length; i++) {
          const columnName = data.meta.fields[i];
          const value = item[data.meta.fields[i]];
          if (columnName) {
            if (columnName.trim().startsWith("_")) {
              variables[columnName] = value;
            } else {
              if (value != null) {
                if (multipleMeasures) {
                  const measureData = { label: item[data.meta.fields[0]], value, measure: data.meta.fields[i] };
                  measureData.variables = variables;
                  adminLocationsData.push(measureData);
                  if (!transformedData.measures.includes(data.meta.fields[i])) {
                    transformedData.measures.push(data.meta.fields[i]);
                  }
                } else {
                  newItem.children.push({ label: data.meta.fields[i], value });
                }
              }
            }
          }
        }
      }
      newItem.variables = variables;
      adminLocationsData.push(newItem);
    });
    const summaryData = [];
    adminLocationsData.forEach((locData) => {
      let summaryItem = summaryData.find((s) => s.label == locData.label);
      if (!summaryItem) {
        summaryItem = { label: locData.label, value: aggregationFormula == "COUNT" ? 1 : locData.value ? locData.value : 0 };
        summaryData.push(summaryItem);
      } else {
        if (aggregationFormula == "COUNT") {
          ++summaryItem.value;
        } else if (aggregationFormula == "SUM") {
          summaryItem.value += locData.value;
        }
      }
    });
    transformedData.pointsData = adminLocationsData;
    transformedData.locationsData = summaryData;
    transformedData.nationalData.value = 0;
  }
  return React__default.Children.map(children, (child) => React__default.cloneElement(child, { transformedData, appliedFilters: data.appliedFilters }));
};
const defaultMap = (props) => {
  const { children, data, multipleMeasures } = props;
  const transformedData = {
    locationsData: [],
    nationalData: {},
    measures: [],
    measureLabelMap: {}
  };
  const indexOfValueColumn = data.meta.fields.findIndex((f, i) => {
    return i != 0 && !f.startsWith("_");
  });
  if (data && data.data && data.meta.fields && data.meta.fields.length >= 2) {
    data.data.forEach((item) => {
      const newItem = {
        label: item[data.meta.fields[0]],
        value: item[data.meta.fields[indexOfValueColumn]],
        measure: data.meta.fields[indexOfValueColumn]
      };
      const variables = {};
      if (multipleMeasures && !transformedData.measures.includes(data.meta.fields[indexOfValueColumn])) {
        transformedData.measures.push(data.meta.fields[indexOfValueColumn]);
      }
      if (data.meta.fields.length > indexOfValueColumn) {
        newItem.children = [];
        for (let i = indexOfValueColumn + 1; i <= data.meta.fields.length; i++) {
          const columnName = data.meta.fields[i];
          const value = item[data.meta.fields[i]];
          if (columnName) {
            if (columnName.trim().startsWith("_")) {
              variables[columnName] = value;
            } else {
              if (multipleMeasures) {
                const measureData = { label: item[data.meta.fields[0]], value, measure: data.meta.fields[i] };
                measureData.variables = variables;
                transformedData.locationsData.push(measureData);
                if (!transformedData.measures.includes(data.meta.fields[i])) {
                  transformedData.measures.push(data.meta.fields[i]);
                }
              } else {
                newItem.children.push({ label: data.meta.fields[i], value });
              }
            }
          }
        }
      }
      newItem.variables = variables;
      transformedData.locationsData.push(newItem);
    });
    transformedData.nationalData.value = 0;
  }
  return React__default.Children.map(children, (child) => React__default.cloneElement(child, { transformedData, appliedFilters: data.appliedFilters }));
};
const countries = [
  { label: "KENYA", value: "KEN", center: [35.8166634, 0.1], scale: 2e3 },
  { label: "Nigeria", value: "NGA", center: [7.491302, 9.072264], scale: 2e3 },
  { label: "South Africa", value: "ZAF", center: [24.676997, -28.48322], scale: 2e3 },
  { label: "West Africa", value: "West Africa", center: [-7.293255, 13.90572], scale: 1500 },
  { label: "Africa", value: "Africa", center: [13.134227, -11.523088], scale: 550 },
  { label: "Ethiopia", value: "ETH", center: [35.8166634, 1.7], scale: 2e3 },
  { label: "Zambia", value: "ZMB", center: [26.459455, -14.668135], scale: 2e3 },
  { label: "Democratic Republic of the Congo", value: "DRC", center: [23.174338, -5.837475], scale: 1250 },
  { label: "World", value: "World", center: [0, 20.050043], scale: 150 }
];
const MapWrapper = (props) => {
  const {
    unique,
    editing,
    "data-filters": filters = "{}",
    "data-app": app = "csv",
    "data-csv": csv = "",
    "data-dimension1": dimension1 = "",
    "data-dimension2": dimension2 = "",
    "data-measures": measures = "prevalenceSmokeAny",
    "data-height": height = 600,
    width = 960,
    "data-data-source-text": dataSourceText = "NIDS",
    "data-data-source-label": dataSourceLabel = "Source",
    "data-national-average-label": nationalAverageLabel = "National Prevalence Avg",
    "data-legend-title": legendTitle = "Tobacco Prevalence Rate",
    "data-legend-breaks": legendBreaks = "[]",
    "data-zoom-enabled": zoomEnabled = false,
    "data-show-legend-labels": showLegendLabels = false,
    "data-map-file": mapFile = "NG_Zones_topoJSON.json",
    "data-mapping-field": mappingField = "zone",
    "data-map-label-field": mapLabelField = "admin",
    "data-has-multiple-measures": hasMultipleMeasures = "false",
    topoJSONField = "collection",
    "data-map-center": mapCenter = "NGA",
    //country        
    "data-map-label-show-value": mapLabelShowValue = "false",
    "data-show-tooltip": showTooltip = "true",
    "data-measure-selector-label": measureSelectorLabel = "",
    "data-value-format": valueFormat = "",
    "data-show-overall-value": showOverallValue = "false",
    "data-auto-generate-breaks": autoGenerateBreaks = "false",
    "data-number-of-breaks": numberOfBreaks = 5,
    "data-scheme": colorScheme = "reds",
    "data-show-no-data-label": showNoDataLabel = "false",
    "data-group": group = "default",
    "data-map-symbols": mapSymbols = "[]",
    "data-tooltip-theme": tooltipTheme = "map-tooltip-dark",
    "data-label-font-size": labelFontSize = 12,
    "data-label-font-weight": labelFontWeight = "normal",
    "data-label-font-color": labelFontColor = "#595959",
    "data-legend-font-size": legendFontSize = 12,
    "data-legend-font-weight": legendFontWeight = "normal",
    "data-custom-tooltips": customTooltips = "[]",
    "data-format-style": style = "decimal",
    "data-decimals": decimals = "2",
    "data-currency": currency = "",
    "data-tooltip-font-size": tooltipFontSize = 14,
    "data-show-admin-unit-label": showAdminUnitLabel = "showAll",
    "data-map-no-data-color": mapNoDataColor = "#f8f8f8",
    "data-map-boundary-color": mapBoundaryColor = "#000",
    "data-map-focus-boundary-color": mapFocusBoundaryColor = "#000",
    "data-highlighted-location": highlightedLocation = "",
    "data-tooltip-format": tooltipFormat = "{locationName} %({value},2) \n {label}: %({value},2)",
    "data-show-no-data-tooltip": showNoDataTooltip = "false",
    "data-map-container-bg-color": mapContainerBgColor = "#fff",
    "data-map-position": mapPosition = "{}",
    "data-main-layer-id": mainLayerId = "",
    "data-enabled-layers": enabledLayers = "",
    "data-point-label-color": pointLabelColor = "#fff",
    "data-point-label-format": pointLabelFormat = "{locationName} %({value},2)",
    "data-show-no-data-legend-item": showNoDataLegendItem = false,
    "data-highlighted-loc-label-format": highlightedLocLabelFormat = "{locationName} - Score: #({value},2)",
    "data-enable-summary-view": enableSummaryView = "false",
    "data-map-type": mapType = "DEFAULT",
    "data-default-point-color": defaultPointColor = "#FFFF00",
    "data-aggregation-formula": aggregationFormula = "COUNT",
    "data-zoom-level-to-show-points": zoomLevelToShowPoints = 2,
    "data-zoom-on-filter": zoomOnFilter = "false",
    "data-zoom-on-filter-field": zoomOnFilterField = "",
    "data-no-data-text": noDataText = "No Data",
    "data-labels-exclusion-list": labelsExclusionList = "",
    "data-custom-measure-labels": customMeasureLabels = "{}",
    "data-show-shading-layer-labels": showShadingLayerLabels = "ifUnitHasData"
  } = props;
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
  };
  const getBreaks = (legendBreaks2) => {
    let legendBreaksNew = parse(legendBreaks2) || [];
    legendBreaksNew = legendBreaksNew.map((b) => {
      if (b.min) {
        b.min = parseFloat(b.min);
      }
      if (b.max) {
        b.max = parseFloat(b.max);
      }
      b.color = decodeURIComponent(b.color);
      return b;
    });
    return legendBreaksNew;
  };
  const getFilters = (filters2) => {
    const ff = parse(filters2) || [];
    let params = {};
    if (ff && ff.forEach) {
      ff.forEach((f) => {
        if (f.value != null && f.value.filter((v) => v != null && v.toString().trim() != "").length > 0)
          params[f.param] = f.value;
      });
    } else {
      params = ff;
    }
    return params;
  };
  const numberFormat = {
    style: style === "compacted" ? "decimal" : style,
    notation: style === "compacted" ? "compact" : "standard",
    currency,
    minimumFractionDigits: parseInt(decimals),
    maximumFractionDigits: parseInt(decimals)
  };
  let layers = parse(enabledLayers) || [];
  layers = layers.map((l) => {
    l.bgColor = decodeURIComponent(l.bgColor);
    l.fontColor = decodeURIComponent(l.fontColor);
    return l;
  });
  const country = countries.find((c) => c.value === mapCenter);
  const multipleMeasures = hasMultipleMeasures == true || hasMultipleMeasures == "true";
  const levels = [dimension1, dimension2];
  const source = levels.filter((l) => l != "none" && l != null).join("/");
  const mapProps = {
    unique,
    editing,
    source: "/" + mapFile,
    center: country.center,
    scale: country.scale,
    measures,
    legendTitle,
    height,
    width,
    topoJSONField,
    mappingField,
    dataSourceText,
    dataSourceLabel,
    nationalAverageLabel,
    legendBreaks: getBreaks(legendBreaks),
    mapLabelField,
    zoomEnabled: zoomEnabled == true || zoomEnabled == "true",
    showLegendLabels: showLegendLabels == true || showLegendLabels == "true",
    multipleMeasures,
    app,
    mapLabelShowValue: mapLabelShowValue == true || mapLabelShowValue == "true",
    showTooltip: showTooltip == true || showTooltip == "true",
    showOverallValue: showOverallValue == true || showOverallValue == "true",
    measureSelectorLabel,
    valueFormat,
    autoGenerateBreaks: autoGenerateBreaks == true || autoGenerateBreaks == "true",
    showNoDataLabel: showNoDataLabel == true || showNoDataLabel == "true",
    numberOfBreaks,
    colorScheme,
    group,
    symbols: parse(mapSymbols) || [],
    tooltipTheme,
    labelFontSize,
    labelFontColor: decodeURIComponent(labelFontColor),
    labelFontWeight,
    legendFontSize,
    legendFontWeight,
    customTooltips: parse(customTooltips) || [],
    format: numberFormat,
    tooltipFontSize,
    showAdminUnitLabel,
    mapNoDataColor: decodeURIComponent(mapNoDataColor),
    mapBoundaryColor: decodeURIComponent(mapBoundaryColor),
    mapFocusBoundaryColor: decodeURIComponent(mapFocusBoundaryColor),
    highlightedLocation,
    tooltipFormat,
    showNoDataTooltip: showNoDataTooltip == true || showNoDataTooltip == "true",
    fields: source.split("/"),
    mapContainerBgColor: decodeURIComponent(mapContainerBgColor),
    mapPosition: parse(mapPosition),
    mainLayerId,
    enabledLayers: layers,
    pointLabelColor: decodeURIComponent(pointLabelColor),
    pointLabelFormat,
    showNoDataLegendItem: showNoDataLegendItem == true || showNoDataLegendItem == "true",
    highlightedLocLabelFormat,
    mapType,
    defaultPointColor: decodeURIComponent(defaultPointColor),
    zoomLevelToShowPoints,
    zoomOnFilter: zoomOnFilter == true || zoomOnFilter == "true",
    zoomOnFilterField,
    noDataText,
    labelsExclusionList: labelsExclusionList.split(",").map((l) => l.trim()),
    showShadingLayerLabels
  };
  const measureLabels = parse(customMeasureLabels) || {};
  const DataFrame = app === "csv" ? MapCSVDataFrame : MapDataFrame;
  const measuresCSV = editing ? (parse(measures) || []).join(",") : measures;
  return /* @__PURE__ */ jsx(
    DataProvider,
    {
      params: getFilters(filters),
      app,
      csv: decodeURIComponent(csv),
      group,
      editing,
      store: [app, unique, ...source.split("/")],
      source,
      children: /* @__PURE__ */ jsx(DataConsumer, { children: /* @__PURE__ */ jsx(DataFrame, { measures: measuresCSV, multipleMeasures, mapType, aggregationFormula, customMeasureLabels: measureLabels, children: /* @__PURE__ */ jsx(Map$1, { ...mapProps }) }) })
    }
  );
};
const mapStateToProps = (state, ownProps) => {
  return {};
};
const mapActionCreators = {};
const index = connect_default(mapStateToProps, mapActionCreators)(MapWrapper);
export {
  index as default
};
