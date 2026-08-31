import { FormattedMessage, injectIntl } from "react-intl";
import * as d3 from "d3"; // d3 plugin
import {
  Container,
  Grid,
  Icon,
  Popup,
  Dimmer,
  Loader,
  Segment,
  Message,
} from "semantic-ui-react";
import React, { useEffect, useRef, useState } from "react";
import Legend from "./legend";
import { formatContent } from "../common/MapTooltip";
import getDeviceCategory from "../../utils/deviceType";
import {
  getTranslatedItemLabel,
  classColor as classColorHelper,
  generateBreaks as generateBreaksHelper,
  fillColor as fillColorHelper,
  getLabelBoxWidth as getLabelBoxWidthHelper,
  getLabelBoxHeight as getLabelBoxHeightHelper,
  getCollectionField as getCollectionFieldHelper,
  extractFeatures as extractFeaturesHelper,
  getTranslatedLocationName as getTranslatedLocationNameHelper,
  createLabel as createLabelHelper,
  getFilters as getFiltersHelper,
  getHighlightedLocationColor as getHighlightedLocationColorHelper,
  LOCATION,
  SHOW_ALL,
  SHOW_IF_HAS_DATA,
  deviceMapHeight,
  deviceMapWidth,
} from "./mapHelpers";
import { Config } from "@/conf";

export { getTranslatedItemLabel };

// Computed once at module load (matches original behavior - not reactive to viewport resize).
const isMobile = ["mobile", "tablet", "midTablet"].includes(
  getDeviceCategory()
);
const isMobileOrTablet = ["mobile", "tablet"].includes(getDeviceCategory());

function Map(props) {
  const {
    unique,
    editing,
    source,
    center,
    scale,
    height,
    width,
    topoJSONField,
    mappingField,
    transformedData,
    legendBreaks,
    mapLabelField,
    mapLabelShowValue,
    showOverallValue,
    measureSelectorLabel,
    valueFormat,
    autoGenerateBreaks,
    showNoDataLabel,
    numberOfBreaks,
    colorScheme,
    symbols,
    tooltipTheme,
    labelFontSize,
    labelFontColor,
    labelFontWeight,
    legendFontSize,
    customTooltips,
    tooltipFontSize,
    showAdminUnitLabel,
    mapNoDataColor,
    mapBoundaryColor,
    mapFocusBoundaryColor,
    highlightedLocation,
    tooltipFormat,
    showNoDataTooltip,
    fields,
    mapContainerBgColor,
    mapPosition,
    mainLayerId,
    enabledLayers,
    pointLabelColor,
    pointLabelFormat,
    highlightedLocLabelFormat,
    mapType,
    defaultPointColor,
    zoomOnFilter,
    zoomOnFilterField,
    noDataText,
    labelsExclusionList,
    showShadingLayerLabels,
    appliedFilters,
    intl,
    legendTitle,
    nationalAverageLabel,
    zoomEnabled,
    showTooltip: showTooltipProp,
  } = props;

  console.log("Map props:", props);

  // ----- state (was `this.state`) -----
  const [selectedMeasure, setSelectedMeasure] = useState(() =>
    transformedData &&
    transformedData.measures &&
    transformedData.measures.length > 1
      ? transformedData.measures[0]
      : null
  );
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [layersLoading, setLayersLoading] = useState(false);
  const [layers, setLayers] = useState(null);

  // ----- refs (DOM nodes / mutable D3 objects / instance-style fields) -----
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(null);
  const projectionRef = useRef(null);
  const pathRef = useRef(null);
  const zoomRef = useRef(null);
  const mapPositionRef = useRef(null); // equivalent of the old `this.mapPosition`
  const hasMountedRef = useRef(false);
  const prevPropsRef = useRef(null);
  const prevStateRef = useRef(null);
  const latestHandlersRef = useRef({});
  const handleScrollRef = useRef(null);

  // Recomputed every render from current props (fixes a staleness bug in the original,
  // which captured `this.metadataTypes` once in the constructor and never updated it).
  const metadataTypes = transformedData?.types || [];

  function getWidth() {
    if (mapContainerRef.current) {
      return mapContainerRef.current.offsetWidth;
    }
    return width;
  }

  function getHeight() {
    return height;
  }

  // One-time setup (mirrors the constructor), computed during render via lazy refs so it
  // runs before the container ref is attached to the DOM - matching the original timing
  // where `this.mapContainer.current` was still null at construction time.
  if (zoomRef.current === null) {
    zoomRef.current = d3
      .zoom()
      .scaleExtent([1, 16])
      .on("zoom", (event) => latestHandlersRef.current.zoomed(event))
      .on("end", (event) => latestHandlersRef.current.zoomEnd(event));
  }

  if (projectionRef.current === null) {
    projectionRef.current = d3
      .geoMercator()
      .scale(scale)
      .center(center) // centers map at given coordinates
      .translate([getWidth() / 2, getHeight() / 2]);
    pathRef.current = d3.geoPath().projection(projectionRef.current);
  }d

  function getMapId() {
    return ".map.wrapper." + unique;
  }

  function getSelectedMeasure() {
    let measure = selectedMeasure;
    if (
      !measure &&
      transformedData &&
      transformedData.measures &&
      transformedData.measures.length > 1
    ) {
      measure = transformedData.measures[0];
    }
    return measure;
  }

  function getLayers() {
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

  function getMainLayer() {
    const resolvedLayers = getLayers();
    let layer;
    if (resolvedLayers) {
      layer =
        resolvedLayers.filter((l) => l.id == mainLayerId || l.id == null)[0] ||
        resolvedLayers[0];
    }
    return layer ? layer.data : null;
  }

  function getCollectionField(mainLayer) {
    return getCollectionFieldHelper(mainLayer, topoJSONField);
  }

  function extractFeatures(mainLayer) {
    return extractFeaturesHelper(mainLayer, topoJSONField);
  }

  function getFeatures() {
    const mainLayer = getMainLayer();
    const resolvedLayers = getLayers();
    if (mainLayer) {
      let features = [];
      try {
        features = extractFeatures(mainLayer);
        features.map((f) => {
          f.properties.layerId = mainLayerId;
          // Add layer properties from the resolved metadata in `layers` state
          const layerMetadata = resolvedLayers.find(
            (layer) => String(layer.id) === String(mainLayerId)
          );
          if (layerMetadata) {
            f.properties.layerMappingField = layerMetadata.layerMappingField;
            f.properties.layerDatasource = layerMetadata.layerDatasource;
            f.properties.layerApiField = layerMetadata.layerApiField;
            f.properties.layerLocale = layerMetadata.layerLocale;
            f.properties.displayLayerLabels = layerMetadata.displayLayerLabels;
          }
          // Also add original layer properties from enabledLayers for backward compatibility
          enabledLayers.forEach((layer) => {
            if (String(layer.id) == mainLayerId) {
              Object.keys(layer || {}).forEach((key) => {
                f.properties[key] = layer[key];
              });
            }
          });
          return f;
        });
        if (resolvedLayers) {
          resolvedLayers.forEach((layer) => {
            if (layer.id != mainLayerId) {
              let tt = extractFeatures(layer.data);
              tt = tt.map((f) => {
                f.properties.layerId = layer.id;
                f.properties.layerMappingField = layer.layerMappingField;
                f.properties.layerDatasource = layer.layerDatasource;
                f.properties.layerApiField = layer.layerApiField;
                f.properties.layerLocale = layer.layerLocale;
                f.properties.displayLayerLabels = layer.displayLayerLabels;
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
          (d) => d.measure === getSelectedMeasure()
        );
      }

      filteredFeatures.map((f) => {
        if (filterLocationsData) {
          const dataItem = filterLocationsData.find((d) => {
            const nameOnData = d.label ? ("" + d.label).toLowerCase() : "";
            const nameOnMapFile = f.properties[mappingField]
              ? f.properties[mappingField].toLowerCase()
              : "";
            return nameOnData === nameOnMapFile;
          });

          if (dataItem) {
            let measureLabel = dataItem.measure;
            if (
              transformedData.measureLabelMap &&
              dataItem.measure &&
              transformedData.measureLabelMap[dataItem.measure]
            ) {
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

  function loadLayers() {
    setLayers([]);
    setLayersLoading(true);
    if (enabledLayers && enabledLayers.length > 0) {
      const metadataFuncs = [];
      enabledLayers.forEach((l) => {
        metadataFuncs.push(
          new Promise((resolve) => {
            d3.json(Config.REACT_APP_WP_API + "/wp/v2/media/" + l.id)
              .then((data) => {
                resolve({
                  id: l.id,
                  url: data.source_url,
                  index: l.index,
                  layerMappingField: l.layerMappingField,
                  layerDatasource: l.datasource,
                  layerApiField: l.apiField,
                  layerLocale: l.locale,
                  displayLayerLabels: l.displayLayerLabels,
                });
              })
              .catch(function () {
                resolve({
                  id: l.id,
                  url: null,
                  index: l.index,
                  layerMappingField: l.layerMappingField,
                  layerDatasource: l.datasource,
                  layerApiField: l.apiField,
                  layerLocale: l.locale,
                  displayLayerLabels: l.displayLayerLabels,
                });
              });
          })
        );
      });

      Promise.all(metadataFuncs).then((metadata) => {
        const layerFuncs = [];
        metadata.forEach((m) => {
          if (m.url) {
            layerFuncs.push(
              new Promise((resolve) => {
                d3.json(m.url).then((data) => {
                  resolve({
                    id: m.id,
                    data,
                    index: m.index,
                    layerMappingField: m.layerMappingField,
                    layerDatasource: m.layerDatasource,
                    layerApiField: m.layerApiField,
                    layerLocale: m.layerLocale,
                    displayLayerLabels: m.displayLayerLabels,
                  });
                });
              })
            );
          }
        });

        Promise.all(layerFuncs).then((resolvedLayers) => {
          setLayers(resolvedLayers);
          setLayersLoading(false);
        });
      });
    } else {
      d3.json(source).then((data) => {
        setLayers([
          {
            id: null,
            url: source,
            data,
            index: 0,
            layerMappingField: null,
            layerDatasource: null,
            layerApiField: null,
            layerLocale: null,
            displayLayerLabels: false,
          },
        ]);
        setLayersLoading(false);
      });
    }
  }

  function resizeCircles(transform) {
    // Invert the radius of circles based on the zoom scale
    const circles = d3.select(getMapId()).select("svg").selectAll("circle");
    circles.attr("r", transform.k > 1 ? 6 / transform.k : 6);
  }

  function getLabelBoxWidth(d) {
    return getLabelBoxWidthHelper(d, mapLabelField);
  }

  function getLabelBoxHeight() {
    return getLabelBoxHeightHelper(mapLabelShowValue);
  }

  function getLabelPosition(d) {
    if (d.properties.LABEL_LATITUDE && d.properties.LABEL_LONGITUDE) {
      return projectionRef.current([
        d.properties.LABEL_LONGITUDE,
        d.properties.LABEL_LATITUDE,
      ]);
    } else {
      return pathRef.current.centroid(d);
    }
  }

  function resizeLabels(transform) {
    d3.select(getMapId())
      .selectAll(".map-labels-container")
      .each((d, i, nodes) => {
        const fo = d3.select(nodes[i]);
        const div = fo.select("div");
        const scaleFactor = transform.k > 1 ? transform.k : 1;
        const newSize = labelFontSize / scaleFactor;

        div.style("font-size", `${newSize}px`);

        const position = getLabelPosition(d);
        const boxWidth = getLabelBoxWidth(d) / scaleFactor;
        const x = position[0] - boxWidth / 2;
        const yOffset = transform.k > 1 ? 10 / transform.k : 10;
        const y = position[1] - yOffset;

        fo.attr("x", x)
          .attr("y", y)
          .attr("width", getLabelBoxWidth(d) / scaleFactor)
          .attr("height", getLabelBoxHeight(d) / scaleFactor);
      });
  }

  function resizePointLabels(transform) {
    d3.select(getMapId())
      .selectAll(".point-labels-container")
      .each((d, i, nodes) => {
        const fo = d3.select(nodes[i]);
        const div = fo.select("div");
        const scaleFactor = transform.k > 1 ? transform.k : 1;
        const newSize = labelFontSize / scaleFactor;
        div.style("font-size", `${newSize}px`);

        const pos = projectionRef.current([
          d.geometry.coordinates[1],
          d.geometry.coordinates[0],
        ]);
        const boxWidth = (getLabelBoxWidth(d) + 20) / scaleFactor;
        const boxHeight = getLabelBoxHeight(d) / scaleFactor;
        const x = pos[0] - boxWidth / 2;
        const y = pos[1] - boxHeight / 2;
        fo.attr("x", x).attr("y", y).attr("width", boxWidth).attr("height", boxHeight);
      });
  }

  function zoomed(event) {
    tooltipRef.current.style("visibility", "hidden");
    const transform = event.transform;
    const g = d3.select(getMapId()).select("svg").select("g");
    g.attr("transform", transform);

    resizeCircles(transform);
    resizeLabels(transform);
    resizePointLabels(transform);
  }

  function zoomEnd(event) {
    const transform = event.transform;
    mapPositionRef.current = { k: transform.k, x: transform.x, y: transform.y };
    if (editing) {
      const parentWindow = window.parent;
      parentWindow.postMessage(
        { type: "map", value: JSON.stringify(mapPositionRef.current) },
        "*"
      );
    }
  }

  function fullView() {
    const svg = d3.select(getMapId()).select("svg");

    const paths = svg.select("g").selectAll(".active");
    paths.attr("class", function () {
      return d3.select(this).attr("class").replace(/background/gi, "");
    });

    let targetTransform = d3.zoomIdentity;
    if (mapPosition && !editing) {
      targetTransform = targetTransform
        .translate(mapPosition.x, mapPosition.y)
        .scale(mapPosition.k);
    } else {
      targetTransform = targetTransform.translate(0, 0).scale(1);
    }

    svg.transition().duration(300).call(zoomRef.current.transform, targetTransform);
  }

  function onReset() {
    mapPositionRef.current = null;
    tooltipRef.current.style("visibility", "hidden");
    fullView();
  }

  function onZoomIn() {
    const svg = d3.select(getMapId()).select("svg");
    svg.transition().call(zoomRef.current.scaleBy, 1.5);
  }

  function onZoomOut() {
    const svg = d3.select(getMapId()).select("svg");
    svg.transition().call(zoomRef.current.scaleBy, 0.6667);
  }

  function getBreaks() {
    if (autoGenerateBreaks) {
      const features = getFeatures();
      return generateBreaksHelper(features, {
        autoGenerateBreaks,
        numberOfBreaks,
        colorScheme,
      });
    } else {
      let filteredBreaks = legendBreaks;
      if (getSelectedMeasure()) {
        filteredBreaks = legendBreaks
          .filter((b) => b.measure === getSelectedMeasure())
          .filter((f) => {
            const result = true;
            if (f.filters && f.filters.length > 0) {
              if (appliedFilters && JSON.stringify(appliedFilters) !== "{}") {
                const keys = Object.keys(appliedFilters);
                const found = f.filters.filter((filter) => {
                  if (keys.indexOf(filter.field) != -1) {
                    const appliedFieldValues = appliedFilters[filter.field];
                    const breaksFilterValues = filter.values;
                    return (
                      appliedFieldValues
                        .join(",")
                        .indexOf(breaksFilterValues) != -1
                    );
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

  function fillColor(d, breaks) {
    return fillColorHelper(d, breaks, {
      mapNoDataColor,
      mainLayerId,
      enabledLayers,
      selectedMeasure,
    });
  }

  function createLabel(d) {
    return createLabelHelper(
      d,
      {
        mapLabelField,
        mapLabelShowValue,
        intl,
        valueFormat,
        showNoDataLabel,
        showAdminUnitLabel,
        noDataText,
        selectedMeasure: getSelectedMeasure(),
      },
      metadataTypes,
      formatContent
    );
  }

  function updateFeatures(features, filterUpdatedFlag) {
    const sortedFeatures = [
      ...features.filter((f) => highlightedLocation != f.properties[mapLabelField]),
      ...features.filter((f) => highlightedLocation == f.properties[mapLabelField]),
    ];

    drawPolygons(sortedFeatures);
    drawLabels(sortedFeatures);
    drawPoints(sortedFeatures, filterUpdatedFlag);
    if (symbols.length > 0) {
      addSymbols(symbols, sortedFeatures);
    }
  }

  function drawLabels(sortedFeatures) {
    const group = d3.select(getMapId()).select("svg").select("g");
    const labelsExist = group.selectAll(".map-labels-container").size() > 0;
    if (labelsExist) {
      console.log("Labels already exist, skipping redraw...");
      return; // Skip redrawing if labels are already present
    }

    group
      .selectAll(".map-labels")
      .data(
        sortedFeatures.filter((f) => {
          if (labelsExclusionList && labelsExclusionList.length > 0) {
            return !labelsExclusionList.includes(f.properties[mapLabelField]);
          }
          return true;
        })
      )
      .enter()
      .append("foreignObject")
      .attr("class", "map-labels-container")
      .attr("x", (d) => {
        const position = getLabelPosition(d);
        if (d.properties[mapLabelField]) {
          const boxWidth = getLabelBoxWidth(d);
          return position[0] - boxWidth / 2;
        }
        return position[0];
      })
      .attr("y", (d) => {
        const position = getLabelPosition(d);
        return position[1] - 10;
      })
      .attr("width", (d) => getLabelBoxWidth(d))
      .attr("height", (d) => getLabelBoxHeight(d))
      .attr("font-size", () => `${labelFontSize}px`)
      .attr("overflow", "visible")
      .attr("opacity", 1)
      .style("display", (d) => {
        if (
          showAdminUnitLabel === SHOW_ALL ||
          (showAdminUnitLabel === SHOW_IF_HAS_DATA && d.properties.hasDataRow) ||
          d.properties.displayLayerLabels
        ) {
          return "block";
        }
        return "none";
      })
      .attr("pointer-events", mapType == "POINTS_MAP" ? "none" : "all")
      .on("mouseover", showTooltip)
      .on("mousemove", mousemove)
      .on("mouseout", mouseout)
      .append("xhtml:div")
      .style("font-size", () => `${labelFontSize}px`)
      .style("color", () => labelFontColor)
      .style("font-weight", () => labelFontWeight)
      .style("background-color", (d) => {
        if (d.properties.hasDataRow && mapLabelShowValue) {
          if (
            d.properties.value != null ||
            (d.properties.value == null && showNoDataLabel)
          ) {
            return "#fff6e1";
          }
        }
        return "none";
      })
      .style("border-radius", () => "4px")
      .style("line-height", "95%")
      .style("text-align", "center")
      .html((d) => createLabel(d));
  }

  function drawPolygons(sortedFeatures) {
    const breaks = getBreaks();
    const group = d3.select(getMapId()).select("svg").select("g");

    const polygons = sortedFeatures.filter(
      (f) =>
        f.geometry &&
        f.geometry &&
        (f.geometry.type == "Polygon" || f.geometry.type == "MultiPolygon")
    );

    if (polygons.length > 0) {
      group
        .selectAll("path")
        .data(polygons)
        .join("path")
        .attr("d", pathRef.current)
        .attr("fill", (d) => fillColor(d, breaks))
        .attr("stroke-width", (d) => {
          if (highlightedLocation == d.properties[mapLabelField]) {
            return 1.2;
          } else {
            return 0.4;
          }
        })
        .attr("stroke", (d) => {
          if (highlightedLocation == d.properties[mapLabelField]) {
            return mapFocusBoundaryColor;
          } else {
            return mapBoundaryColor;
          }
        })
        .on("click", onPolygonClick);
    }
  }

  function drawPoints(sortedFeatures, filterUpdatedFlag) {
    const group = d3.select(getMapId()).select("svg").select("g");
    let pointsFromData = [];
    if (transformedData.pointsData) {
      let selectedLocation = selectedPolygon;
      if (filterUpdatedFlag && appliedFilters && appliedFilters[zoomOnFilterField]) {
        selectedLocation = appliedFilters[zoomOnFilterField];
      }

      pointsFromData = transformedData.pointsData
        .filter((p) => p.lat && p.lng && p.label == selectedLocation)
        .map((p) => ({
          properties: {
            label: p.label,
            lat: p.lat,
            lng: p.lng,
            value: p.value,
            variables: p.variables,
          },
        }));

      group
        .selectAll(".circle")
        .data(pointsFromData)
        .enter()
        .append("circle")
        .attr("id", (d, i) => "circle" + i)
        .attr("cx", (d) => {
          const position = projectionRef.current([d.properties.lng, d.properties.lat]);
          return position[0];
        })
        .attr("cy", (d) => {
          const position = projectionRef.current([d.properties.lng, d.properties.lat]);
          return position[1];
        })
        .attr("r", () => 2)
        .style("stroke-width", 0.5)
        .style("fill", () => defaultPointColor)
        .on("mouseover", (d, i) => onPointClick(d, i))
        .on("mouseout", mouseout);
    }

    const breaks = getBreaks();
    let points = [];
    if (showShadingLayerLabels == SHOW_ALL) {
      points = sortedFeatures.filter((f) => f.geometry && f.geometry.type == "Point");
    } else if (showShadingLayerLabels == SHOW_IF_HAS_DATA) {
      points = sortedFeatures.filter(
        (p) => p.geometry && p.geometry.type == "Point" && p.properties.hasDataRow
      );
    }

    if (points.length > 0) {
      group
        .selectAll(".point-labels")
        .data(points)
        .enter()
        .append("foreignObject")
        .attr("id", (d, i) => "point-label" + i)
        .attr("class", "point-labels-container")
        .attr("x", (d) => {
          const boxWidth = getLabelBoxWidth(d) + 20;
          const position = projectionRef.current([
            d.geometry.coordinates[1],
            d.geometry.coordinates[0],
          ]);
          return position[0] - boxWidth / 2;
        })
        .attr("y", (d) => {
          const position = projectionRef.current([
            d.geometry.coordinates[1],
            d.geometry.coordinates[0],
          ]);
          return position[1] - getLabelBoxHeight(d) / 2;
        })
        .attr("width", (d) => getLabelBoxWidth(d) + 20)
        .attr("height", () => "1px")
        .attr("overflow", "visible")
        .attr("font-size", "12px")
        .style("opacity", 1)
        .append("xhtml:div")
        .style("color", () => pointLabelColor)
        .style("font-weight", () => "bold")
        .style("background-color", (d) => fillColor(d, breaks))
        .style("padding", () => "5px 3px 5px 3px")
        .style("border-radius", () => "4px")
        .style("line-height", "100%")
        .style("text-align", "center")
        .html((d) =>
          formatContent(
            pointLabelFormat,
            {
              value: d.properties.value,
              locationName: d.properties[mapLabelField],
            },
            intl,
            noDataText
          )
        )
        .on("mouseover", (event, d, i) => {
          d3.select(getMapId())
            .select("svg")
            .select("g")
            .select("#point-label" + i)
            .raise();
          showTooltip(event, d);
        })
        .on("mousemove", mousemove)
        .on("mouseout", mouseout);
    }
  }

  function addSymbols(symbolsList, features) {
    const group = d3.select(getMapId()).select("svg").select("g");
    symbolsList.forEach((symbol) => {
      if (symbol.field && symbol.image && symbol.values) {
        const filteredFeaturesWithGpsCoords = features.filter((f) => {
          const fieldName = LOCATION == symbol.field ? mappingField : "value";
          const fiedValue =
            (f.properties[fieldName] ||
              (f.properties.variables ? f.properties.variables[fieldName] : "")) + "";
          const valuesToMatch = symbol.values + "";
          const valuesToMatchArr = valuesToMatch.split(",");
          return (
            f.properties.LATITUDE &&
            f.properties.LONGITUDE &&
            valuesToMatchArr.filter(
              (v) => v.trim().toLowerCase() == fiedValue.trim().toLowerCase()
            ).length > 0
          );
        });

        const filteredFeaturesNoCoords = features.filter((f) => {
          const fieldName = LOCATION == symbol.field ? mappingField : "value";
          const fiedValue =
            (f.properties[fieldName] ||
              (f.properties.variables ? f.properties.variables[fieldName] : "")) + "";
          const valuesToMatch = symbol.values + "";
          const valuesToMatchArr = valuesToMatch.split(",");
          return (
            !f.properties.LATITUDE &&
            !f.properties.LONGITUDE &&
            valuesToMatchArr.filter(
              (v) => v.trim().toLowerCase() == fiedValue.trim().toLowerCase()
            ).length > 0
          );
        });

        // if feature has lat and long, use that to position the symbol
        group
          .selectAll("image")
          .data(filteredFeaturesWithGpsCoords)
          .enter()
          .append("image")
          .attr("width", 40)
          .attr("height", 40)
          .attr("class", "map-symbol")
          .attr("xlink:href", "/" + symbol.image)
          .attr(
            "transform",
            (d) =>
              "translate(" +
              projectionRef.current([d.properties.LONGITUDE, d.properties.LATITUDE]) +
              ")"
          )
          .on("mouseover", showTooltip)
          .on("mousemove", mousemove)
          .on("mouseout", mouseout);

        // if feature does not have lat and long, use the centroid to position the symbol
        group
          .selectAll("image")
          .data(filteredFeaturesNoCoords)
          .enter()
          .append("image")
          .attr("width", 40)
          .attr("height", 40)
          .attr("class", "map-symbol")
          .attr("xlink:href", "/" + symbol.image)
          .attr("x", (d) => pathRef.current.centroid(d)[0] - 20)
          .attr("y", (d) => pathRef.current.centroid(d)[1])
          .on("mouseover", showTooltip)
          .on("mousemove", mousemove)
          .on("mouseout", mouseout);
      }
    });
  }

  function showTooltip(event, d) {
    console.log("Showing tooltip for data:", d);
    // Always recomputed from device category (the prop is intentionally ignored here,
    // matching the original method's behavior).
    const zoomEnabledForFocusClass = ["mobile", "tablet", "midTablet"].includes(
      getDeviceCategory()
    );

    if (
      (showTooltipProp && d.properties.value !== null) ||
      (showTooltipProp && showNoDataTooltip)
    ) {
      const svg = d3.select(getMapId()).select("svg");
      const elements = svg.select("g").selectAll(".active");
      elements.attr("class", (p) => {
        if (p.properties[mappingField] === d.properties[mappingField]) {
          return "focus" + (zoomEnabledForFocusClass ? " zoom-enabled" : "");
        } else {
          return "active" + (zoomEnabledForFocusClass ? " zoom-enabled" : "");
        }
      });

      const format =
        tooltipFormat || "{locationName} %({value},2) \n {label}: %({value},2)";
      const dataVars = d.properties.variables || {};

      const variables = {
        ...d.properties,
        value: d.properties.value,
        measure: getSelectedMeasure(),
        measureLabel: d.properties.measureLabel,
        locationName: getTranslatedLocationNameHelper(d, mappingField, metadataTypes),
        label: getTranslatedLocationNameHelper(d, mappingField, metadataTypes),
        ...dataVars,
        ...getFiltersHelper(appliedFilters), // expose applied filter params (e.g. {year}) to the tooltip
      };

      tooltipRef.current
        .attr("class", tooltipTheme)
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("visibility", "visible")
        .html(() => {
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
              html += formatContent(headerFormat, variables, intl, noDataText);
            }
            if (overallFormat) {
              if (!html.endsWith("<hr>")) {
                html += "<hr>";
              }
              html += formatContent(overallFormat, variables, intl, noDataText);
            }
            if (breakdownFormat) {
              if (d.properties.children) {
                d.properties.children.forEach((child) => {
                  const vars = {
                    value: child.value,
                    label: child.label,
                    measure: getSelectedMeasure(),
                    measureLabel: d.properties.measureLabel,
                    ...dataVars,
                    ...child.variables,
                    ...getFiltersHelper(appliedFilters),
                  };
                  if (!html.endsWith("<hr>")) {
                    html += "<hr>";
                  }
                  html += formatContent(breakdownFormat, vars, intl, noDataText);
                });
              }
            }

            if (lines.length > breakdownLineIndex + 1) {
              if (!html.endsWith("<hr>")) {
                html += "<hr>";
              }
              lines.forEach((line, index) => {
                if (index > breakdownLineIndex) {
                  if (!html.endsWith("<hr>")) {
                    html += "<hr>";
                  }
                  html += formatContent(line, variables, intl, noDataText);
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
            const fallbackFormat =
              tooltipFormat || "{locationName} %({value},2) \n {label}: %({value},2)";
            const fallbackVariables = {
              value: null,
              measure: getSelectedMeasure(),
              measureLabel: d.properties.measureLabel,
              locationName: getTranslatedLocationNameHelper(d, mappingField, metadataTypes),
              ...dataVars,
            };
            html += formatContent(fallbackFormat, fallbackVariables, intl, noDataText);
            html += "</div>";
          }

          return html;
        });
    }
  }

  function positionTooltip(event) {
    const offset = 8;
    const node = tooltipRef.current.node();
    const tooltipWidth = node ? node.offsetWidth : 0;
    const viewportRight = window.scrollX + document.documentElement.clientWidth;

    let left = event.pageX;
    if (tooltipWidth && left + tooltipWidth > viewportRight) {
      left = event.pageX - tooltipWidth;
      if (left < window.scrollX) {
        left = window.scrollX;
      }
    }

    tooltipRef.current
      .style("top", event.pageY + "px")
      .style("left", left + "px")
      .style("margin-left", offset + "px");
  }

  function mousemove(event) {
    positionTooltip(event);
  }

  function mouseout() {
    if (showTooltipProp) {
      const svg = d3.select(getMapId()).select("svg");
      const paths = svg.select("g").selectAll(".focus");
      paths.attr("class", "active");
      tooltipRef.current.style("visibility", "hidden");
    }
  }

  function onPointClick(event, d, i) {
    showTooltip(event, d);
    tooltipRef.current.style("visibility", "visible");
    positionTooltip(event);

    const svg = d3.select(getMapId()).select("svg").select("g");
    svg.selectAll("circle").style("fill", defaultPointColor).style("stroke", "none");

    svg.select("#circle" + i).raise().style("fill", "#fff");
  }

  function onPolygonClick(event, d) {
    if (selectedPolygon !== d.properties[mappingField] && d.properties.value !== null) {
      setSelectedPolygon(d.properties[mappingField]);
    }
  }

  function filterUpdated(prevProps) {
    const prevFilters = (prevProps && prevProps.appliedFilters) || {};
    const currentAppliedFilters = appliedFilters || {};
    return prevFilters[zoomOnFilterField] != currentAppliedFilters[zoomOnFilterField];
  }

  function getCenter(features, filterUpdatedFlag) {
    let centerFeature = null;
    if (zoomOnFilter && zoomOnFilterField) {
      let selectedLocation = selectedPolygon;
      if (filterUpdatedFlag && appliedFilters && appliedFilters[zoomOnFilterField]) {
        selectedLocation = appliedFilters[zoomOnFilterField];
      }

      const featureToCenterOn = features.filter(
        (d) => d.properties != null && d.properties[mappingField] == selectedLocation
      )[0];

      if (
        featureToCenterOn &&
        featureToCenterOn.properties != null &&
        featureToCenterOn.properties.value
      ) {
        centerFeature = featureToCenterOn;
      }
    }

    return centerFeature;
  }

  function classColor() {
    return classColorHelper(zoomEnabled);
  }

  function d3Map(features, filterUpdatedFlag) {
    let zoomEnabledForZoomBinding = zoomEnabled;
    if (!zoomEnabledForZoomBinding) {
      zoomEnabledForZoomBinding = ["mobile", "tablet"].includes(getDeviceCategory());
    }
    const breaks = getBreaks();
    const container = d3.select(getMapId());
    let svg = container.select("svg");
    let containerWidth = getWidth();
    if (containerWidth === 0) {
      containerWidth = window.innerWidth + deviceMapWidth[getDeviceCategory()];
    } else {
      containerWidth += deviceMapWidth[getDeviceCategory()];
    }
    const containerHeight = getHeight() - 100;

    if (svg.empty()) {
      svg = container.append("svg");
    } else {
      svg.selectAll("*").remove();
    }

    svg
      .attr("style", `background-color:${mapContainerBgColor};`)
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg
      .append("g")
      .selectAll("path")
      .data(features)
      .enter()
      .append("path")
      .attr("fill", (d) => fillColor(d, breaks))
      .attr("d", d3.geoPath().projection(projectionRef.current))
      .attr("class", () => classColor())
      .on("mouseover", mapType !== "POINTS_MAP" ? showTooltip : null)
      .on("mousemove", mapType !== "POINTS_MAP" ? mousemove : null)
      .on("mouseout", mapType !== "POINTS_MAP" ? mouseout : null);

    if (mapPositionRef.current) {
      svg
        .transition()
        .duration(300)
        .call(
          zoomRef.current.transform,
          d3.zoomIdentity
            .translate(mapPositionRef.current.x, mapPositionRef.current.y)
            .scale(mapPositionRef.current.k)
        );
    }

    if (
      !mapPositionRef.current &&
      mapPosition &&
      mapPosition.x &&
      mapPosition.y &&
      mapPosition.k
    ) {
      svg
        .transition()
        .duration(300)
        .call(
          zoomRef.current.transform,
          d3.zoomIdentity
          .translate(mapPosition.x, mapPosition.y)
          .scale(mapPosition.k)
        );
      if (mapType === "POINTS_MAP") {
        const deviceTranslates = {
          mobile: 100,
          tablet: 0,
          midTablet: 0,
          desktop: 0,
          laptop: 0,
          wide: 0,
        };
        const translateVal = deviceTranslates[getDeviceCategory()];
        svg
          .transition()
          .duration(300)
          .call(
            zoomRef.current.transform,
            d3.zoomIdentity
              .translate(mapPosition.x + translateVal, mapPosition.y)
              .scale(mapPosition.k)
          );
      }
    }

    if (zoomEnabledForZoomBinding || editing) {
      svg.call(zoomRef.current);
    } else {
      svg.on("dblclick.zoom", null);
    }

    const centerFeature = getCenter(features, filterUpdatedFlag);
    if (centerFeature) {
      const bounds = pathRef.current.bounds(centerFeature);
      const centerx = [
        (bounds[0][0] + bounds[1][0]) / 2,
        (bounds[0][1] + bounds[1][1]) / 2,
      ];
      svg
        .transition()
        .duration(750)
        .call(
          zoomRef.current.transform,
          d3.zoomIdentity
            .translate(containerWidth / 2, containerHeight / 2)
            .scale(12)
            .translate(-centerx[0], -centerx[1])
        );
    }
  }

  function getAvg() {
    return transformedData.nationalData.value;
  }

  function selectedMeasureChanged(selected) {
    if (selectedMeasure != selected) {
      setSelectedMeasure(selected);
    }
  }

  function getHighlightedLocationData() {
    let filterLocationsData = transformedData.locationsData;
    if (transformedData.measures && transformedData.measures.length > 1) {
      filterLocationsData = transformedData.locationsData.filter(
        (d) => d.measure === getSelectedMeasure()
      );
    }
    return filterLocationsData.find((d) => d.label === highlightedLocation);
  }

  function getTranslatedHighlightedLocationName() {
    if (!highlightedLocation) {
      return null;
    }

    const features = getFeatures();
    const matchingFeature = features.find(
      (f) => f.properties[mapLabelField] === highlightedLocation
    );

    if (
      matchingFeature &&
      matchingFeature.properties.displayLayerLabels &&
      matchingFeature.properties.layerLocale
    ) {
      const labelField = matchingFeature.properties.layerMappingField || mapLabelField;
      const rawLabel = matchingFeature.properties[labelField];
      return getTranslatedItemLabel(
        metadataTypes,
        rawLabel,
        matchingFeature.properties.layerLocale
      );
    }

    return highlightedLocation;
  }

  function getHighlightedLocationColor(data) {
    return getHighlightedLocationColorHelper(data, getBreaks(), mapNoDataColor);
  }

  function renderLoader() {
    return (
      <Container className={"loading"}>
        <Segment basic={true} padded={true} textAlign={"center"} style={{ margin: "30px" }}>
          <Dimmer active inverted>
            <Loader size="medium"></Loader>
          </Dimmer>
        </Segment>
      </Container>
    );
  }

  function noMapSelected() {
    return (
      <Message icon warning>
        <Icon name="map outline" />
        <Message.Content>
          <Message.Header>No map selected</Message.Header>
          Pick one from the list in the <strong>Map Layers</strong> section.
        </Message.Content>
      </Message>
    );
  }

  // Keep the D3 handlers that were bound once (on the zoom behavior / scroll listener)
  // pointing at the latest closures so they never see stale props/state.
  latestHandlersRef.current.zoomed = zoomed;
  latestHandlersRef.current.zoomEnd = zoomEnd;
  latestHandlersRef.current.getFeatures = getFeatures;
  latestHandlersRef.current.updateFeatures = updateFeatures;
  latestHandlersRef.current.getMapId = getMapId;

  if (!handleScrollRef.current) {
    handleScrollRef.current = () => {
      // adds debounce to scroll to prevent event from rerendering the map too often
      let scrollTimeout = null;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const labelsExist =
          d3
            .select(latestHandlersRef.current.getMapId())
            .selectAll(".map-labels-container")
            .size() > 0;
        if (!labelsExist) {
          latestHandlersRef.current.updateFeatures(latestHandlersRef.current.getFeatures(), false);
        }
      }, 300);
    };
  }

  // ----- mount-only effect (was componentDidMount / componentWillUnmount) -----
  useEffect(() => {
    const scrollHandler = handleScrollRef.current;
    window.addEventListener("scroll", scrollHandler, { passive: true });
    window.addEventListener("touchmove", scrollHandler, { passive: true });
    loadLayers();
    tooltipRef.current = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("pointer-events", "none"); 

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("touchmove", scrollHandler);
      tooltipRef.current?.remove();
    };
  }, []);

  // ----- runs after every update (was componentDidUpdate) -----
  // This mirrors the original class lifecycle exactly: componentDidUpdate ran after every
  // re-render (regardless of what changed) and internally diffed against prevProps/prevState.
  // Splitting this into several dependency-driven effects would risk reordering the
  // prevProps/prevState comparisons that d3Map/updateFeatures/filterUpdated rely on, so a
  // single "run after every render, skip the first" effect is the most faithful translation.
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      prevPropsRef.current = props;
      prevStateRef.current = { selectedMeasure, layers, selectedPolygon };
      return;
    }

    const prevProps = prevPropsRef.current;
    const prevState = prevStateRef.current;

    if (zoomOnFilterField) {
      const prevAppliedItems = [];
      const appliedItems = [];
      const prevAppliedFiltersSnapshot = prevProps.appliedFilters;
      if (prevAppliedFiltersSnapshot) {
        Object.keys(prevAppliedFiltersSnapshot).forEach((k) => {
          if (
            prevAppliedFiltersSnapshot[k] != null &&
            prevAppliedFiltersSnapshot[k] instanceof Array
          ) {
            prevAppliedItems.push(
              ...prevAppliedFiltersSnapshot[k].filter((v) => v != Number.MIN_SAFE_INTEGER)
            );
          }
        });
      }
      if (appliedFilters) {
        Object.keys(appliedFilters).forEach((k) => {
          if (appliedFilters[k] != null && appliedFilters[k] instanceof Array) {
            appliedItems.push(
              ...appliedFilters[k].filter((v) => v != Number.MIN_SAFE_INTEGER)
            );
          }
        });
      }
      // filters reset
      if (prevAppliedItems.length > 0 && appliedItems.length == 0) {
        onReset();
      }
    }

    tooltipRef.current.style("visibility", "hidden");

    if (prevProps.enabledLayers.length != enabledLayers.length) {
      loadLayers();
    }

    const features = getFeatures();
    if (prevProps.center !== center) {
      // Applies translation to center the map at the given coordinates
      mapPositionRef.current = null;
      projectionRef.current
        .scale(scale)
        .center(center) // centers map at given coordinates
        .translate([getWidth() / 2, getHeight() / 2]);
    }

    const filterUpdatedFlag = filterUpdated(prevProps);
    d3Map(features, filterUpdatedFlag);

    if (
      layers &&
      transformedData &&
      (transformedData != prevProps.transformedData ||
        layers != prevState.layers ||
        selectedMeasure != prevState.selectedMeasure ||
        selectedPolygon != prevState.selectedPolygon ||
        prevProps.mainLayerId !== mainLayerId ||
        JSON.stringify(prevProps.enabledLayers) != JSON.stringify(enabledLayers))
    ) {
      updateFeatures(getFeatures(), filterUpdatedFlag);
    }

    prevPropsRef.current = props;
    prevStateRef.current = { selectedMeasure, layers, selectedPolygon };
  });

  let zoomEnabledForControls = zoomEnabled;
  if (!zoomEnabledForControls) {
    zoomEnabledForControls = !!["mobile", "tablet", "midTablet"].includes(
      getDeviceCategory()
    );
  }

  const nationalAverage = getAvg();
  const filters = getFiltersHelper(appliedFilters);
  const highlightedLocData = getHighlightedLocationData();

  const highlightedLocStyle = {
    backgroundColor: getHighlightedLocationColor(highlightedLocData),
    color: labelFontColor,
    fontSize: legendFontSize + "px",
  };
  if (editing) {
    highlightedLocStyle.marginTop = "25px";
  }

  const MapLegendComponent = () => (
    <Container fluid className={"footnote "}>
      {
        <Grid columns={2}>
          {props.app !== "csv" && showOverallValue && (
            <Grid.Column textAlign={"left"} width={4}>
              <div className="national-average-div">
                <span className="national-avg-label">{nationalAverageLabel}</span>
                <span className="national-avg-value">
                  {formatContent(valueFormat, { value: nationalAverage }, intl, noDataText)}
                </span>
              </div>
            </Grid.Column>
          )}
          <Grid.Column
            textAlign={"right"}
            width={props.app !== "csv" && showOverallValue ? 12 : 16}
          >
            <Legend
              filteredBreaks={getBreaks()}
              formattedLegendTitle={formatContent(legendTitle, { ...filters }, intl, noDataText)}
              selectedMeasure={selectedMeasure}
              {...props}
            />
          </Grid.Column>
        </Grid>
      }
      <div className="measure-selector">
        <ul>
          {measureSelectorLabel && (
            <li>
              <span className="label">{measureSelectorLabel}</span>
            </li>
          )}
          {transformedData &&
            transformedData.measures &&
            transformedData.measures.length > 1 &&
            transformedData.measures.map((measure) => {
              return (
                <li key={measure} onClick={() => selectedMeasureChanged(measure)}>
                  <input
                    checked={getSelectedMeasure() === measure}
                    type="radio"
                    value={measure}
                    readOnly
                  />
                  <label>{transformedData.measureLabelMap[measure] || measure}</label>
                </li>
              );
            })}
        </ul>
      </div>
    </Container>
  );

  return (
    <div className="map component wp-data-viz-map" ref={mapContainerRef}>
      {layersLoading && (editing ? noMapSelected() : renderLoader())}
      {!layersLoading && (
        <>
          {!isMobileOrTablet && <MapLegendComponent />}
          <div
            className={"map wrapper scaling-svg-container " + unique}
            style={{ height: height - deviceMapHeight[getDeviceCategory()] + "px" }}
          >
            {highlightedLocData ? (
              <div className="highlighted-loc-info" style={highlightedLocStyle}>
                <span>
                  {" "}
                  {formatContent(
                    highlightedLocLabelFormat,
                    {
                      value: highlightedLocData.value,
                      locationName:
                        getTranslatedHighlightedLocationName() || highlightedLocData.label,
                      measureName: highlightedLocData.measure,
                    },
                    intl,
                    noDataText
                  )}
                </span>
              </div>
            ) : (
              <> </>
            )}

            {(editing || zoomEnabledForControls) && !isMobile && (
              <div className="control panel ignore">
                <div className="zoom plus" onClick={onZoomIn}>
                  <Icon name="plus" size="large" />
                </div>
                <div className="zoom minus" onClick={onZoomOut}>
                  <Icon name="minus" size="large" />
                </div>
                <Popup
                  content={
                    <FormattedMessage id="map.reset.tooltip" defaultMessage="Reset zoom" />
                  }
                  trigger={
                    <div className="reset" onClick={onReset}>
                      <Icon name="repeat" size="large" />
                    </div>
                  }
                />
              </div>
            )}
          </div>
          {isMobileOrTablet && <MapLegendComponent />}
        </>
      )}
    </div>
  );
}

export default injectIntl(Map);
