import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "semantic-ui-react";
import { PostContent } from "@devgateway/wp-react-lib";

import DataProvider from "../../data/DataProvider";
import DataConsumer from "../../data/DataConsumer";
import MeasureSelector from "../../MeasureSelector";
import ColorProvider from "../colors/ColorProvider";
import Messages from "../Messages";
import getDeviceType from "../../../utils/deviceType";

import {
  DEFAULT_CHART_TYPE,
  getChartDefinition,
  resolveChartDataFrame,
} from "./chartDefinitions";

const decodeValue = (value, editing) => {
  try {
    if (editing) {
      return value;
    }
    return decodeURIComponent(value);
  } catch (error) {
    console.error(`error decoding value:${value}`);
    return value;
  }
};

const parseJsonValue = (value, editing) => {
  try {
    return JSON.parse(decodeValue(value, editing));
  } catch (error) {
    console.error(`error parsing value:${value}`);
    return null;
  }
};

const parseBoolean = (value) => {
  if (value === true || value === "true") {
    return true;
  }
  if (value === false || value === "false") {
    return false;
  }
  return false;
};

const parseHiddenBars = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const parseNumberFormat = (selectedFormat) => {
  if (selectedFormat) {
    return {
      style: selectedFormat.style === "compacted" ? "decimal" : selectedFormat.style,
      notation: selectedFormat.style === "compacted" ? "compact" : "standard",
      currency: selectedFormat.currency,
      minimumFractionDigits: parseInt(selectedFormat.minimumFractionDigits),
      maximumFractionDigits: parseInt(selectedFormat.maximumFractionDigits),
    };
  }

  return {
    notation: "standard",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
};

const parseGroupTotalFormat = (groupTotalFormatObject) => ({
  style:
    groupTotalFormatObject?.style === "compacted"
      ? "decimal"
      : groupTotalFormatObject?.style,
  notation:
    groupTotalFormatObject?.style === "compacted" ? "compact" : "standard",
  currency: groupTotalFormatObject?.currency,
  minimumFractionDigits: parseInt(groupTotalFormatObject?.minimumFractionDigits),
  maximumFractionDigits: parseInt(groupTotalFormatObject?.maximumFractionDigits),
});

const ChartEmbeddableRuntime = (props) => {
  let {
    parent,
    editing = false,
    unique,
    childContent,
    categories,
    injectedMeasures,
    pageModuleProps,
    forcedType = null,

    // Data source and runtime identity
    "data-app": app = "csv",
    "data-dvz-proxy-dataset-id": dvzProxyDatasetId,
    "data-group": group = "default",
    "data-height": height = 500,
    "data-type": configuredType = DEFAULT_CHART_TYPE,
    "data-view-mode": editMode = "info",
    "data-csv": csv = "",
    "data-filters": filters = "[]",
    "data-wait-for-filters": waitForFilters = "false",
    "data-no-data-message": noDataMsg = "No data matches your selection",

    // Dimensions and measures
    "data-dimension1": dimension1,
    "data-dimension2": dimension2,
    "data-dimension3": dimension3,
    "data-measures": measures = "{}",
    "data-format": format = "{}",
    "data-include-overall": includeOverall = "false",
    "data-overall-label": overallLabel = "Overall",
    "data-enable-measure-selector": enableMeasureSelector = "false",
    "data-measure-selector-label": measureSelectorLabel = "Measure",
    "data-measure-selector-default-measure": defaultMeasure = "",

    // Layout, axes, and legends
    "data-group-mode": groupMode = "grouped",
    "data-layout": layout = "vertical",
    "data-reverse": reverse = "false",
    "data-left-legend": left = "Left Legend",
    "data-bottom-legend": bottom = "Bottom Legend",
    "data-right-legend": rightLegend = "",
    "data-legend-position": legendPosition = "right",
    "data-show-legends": showLegends = "true",
    "data-legend-label": legendLabel = "",
    "data-margin-left": marginLeft = 50,
    "data-margin-top": marginTop = 25,
    "data-margin-right": marginRight = 25,
    "data-margin-bottom": marginBottom = 25,
    "data-tick-rotation": tickRotation = 0,
    "data-tick-color": tickColor = "rgb(92,93,99)",
    "data-offset-right": offsetRight = "40",
    "data-offset-bottom": offsetBottom = "40",
    "data-offset-text": offsetText = 0,
    "data-show-legends-in-columns": showLegendsInColumns = "false",
    "data-number-of-legend-columns": numberOfLegendColumns = 4,
    "data-use-check-box-background": legendCheckBack = "false",
    "data-use-label-background": legendLabelBack = "true",
    "data-legend-label-color": legendLabelColor = "#000",
    "data-reverse-legend": reverseLegend = "false",

    // Tooltip and content toggles
    "data-data-source-label": dataSourceLabel = "Source",
    "data-chart-data-source": dataSource = "Data Source",
    "data-toggle-info-label": toggleInfoLabel = "Info Graphic",
    "data-toggle-chart-label": toggleChartLabel = "Chart",
    "data-dualmode": dualMode,
    "data-tooltip-html": tooltip = "",
    "data-tooltip-enabled": tooltipEnabled = "true",
    "data-tooltip-enable-markdown": tooltipEnableMarkdown = "false",

    // Colors and scales
    "data-color-by": colorBy = "index",
    "data-scheme": scheme = "system",
    "data-manual-colors": manualColors = "{}",
    "data-bar-color": barColor = "rgb(0,0,0)",
    "data-value-scale": valueScale = "linear",
    "data-max-value": maxValue = "auto",
    "data-fixed-min-value": fixedMinValue = 0,
    "data-fixed-max-value": fixedMaxValue = 0,
    "data-min-max-clamp": minMaxClamp = "false",
    "data-show-percentage": showPercentage = "false",

    // Bar-specific
    "data-swap": swap = "false",
    "data-bar-padding": barPadding = 0.15,
    "data-bar-inner-padding": barInnerPadding = 0.7,
    "data-bar-label-position": barLabelPosition = "middle",
    "data-bar-label-color": barLabelColor = "#000",
    "data-show-group-total": showGroupTotal = "true",
    "data-group-total-measure": groupTotalMeasure = "",
    "data-group-total-label": groupTotalLabel = "",
    "data-group-total-format": groupTotalFormat = "{}",
    "data-group-total-label-offset": groupTotalOffset,
    "data-group-total-fixed-position": groupTotalFixedPosition = "false",
    "data-hidden-bars": hiddenBars = [],

    // Line-specific
    "data-offset-y": offsetY = "-40",
    "data-line-layer-enabled": lineLayerEnabled = "false",
    "data-overlays": overlays = "[]",
    "data-line-label-position": lineLabelPosition = "none",
    "data-enable-area": enableArea = "false",
    "data-area-shading-criteria": areaShadingCriteria = "DEFAULT",
    "data-area-lower-bound": areaLowerBound = "",
    "data-area-upper-bound": areaUpperBound = "",
    "data-show-points": showPoints = "true",
    "data-confidence-intervals": confidenceIntervals = "[]",
    "data-show-grid": showGrid = "true",
    "data-enable-grid-y": enableGridY = "true",
    "data-enable-grid-x": enableGridX = "false",
    "data-highlight-xaxis-line": highlightXAxisLine = "false",
    "data-show-tick-line": showTickLine = "true",
    "data-show-right-axis": showRightAxis = "true",
    "data-line-curve": lineCurve = "linear",
    "data-line-x-axis-tick-mode": lineXAxisTickMode = "none",
    "data-line-x-axis-tick-count": lineXAxisTickCount = 10,
    "data-line-x-axis-tick-every": lineXAxisTickEvery = 1,
    "data-x-axis-tick-values": xAxisTickValues = "10",
    "data-y-axis-tick-values": yAxisTickValues = "10",
    "data-x-label-color": xLabelColor = "#000",
    "data-override-tick-color": overrideTickColor = "false",

    // Pie / sunburst-specific
    "data-start-angle": startAngle = 0,
    "data-end-angle": endAngle = 360,
    "data-center-label": centerLabel = "",
    "data-show-arc-labels": showArcLabels = "true",
    "data-show-arc-link-labels": showArcLinkLabels = "true",
    "data-slice-padding": slicePadding = 1,
    "data-center-label-font-weight": centerLabelFontWeight = "normal",
    "data-center-label-font-size": centerLabelFontSize = "12",
    "data-center-label-xoffset": centerLabelXOffset = 0,
    "data-center-label-yoffset": centerLabelYOffset = 0,

    // Radar-specific
    "data-radar-curve": radarCurve = "linearClosed",
    "data-radar-fill-opacity": radarFillOpacity = 0.25,
    "data-radar-border-width": radarBorderWidth = 2,
    "data-radar-grid-levels": radarGridLevels = 3,
    "data-radar-grid-shape": radarGridShape = "circular",
    "data-radar-grid-label-offset": radarGridLabelOffset = 36,
    "data-radar-enable-dots": radarEnableDots = "true",
    "data-radar-dot-size": radarDotSize = 8,
    "data-radar-enable-dot-label": radarEnableDotLabel = "true",
    "data-radar-dot-label-offset": radarDotLabelOffset = -12,

    // Scatter-specific
    "data-scatter-min-size": scatterMinSize = 10,
    "data-scatter-max-size": scatterMaxSize = 30,
    "data-scatter-show-labels": scatterShowLabels = "false",
    "data-scatter-connect-points": scatterConnectPoints = "false",
    "data-scatter-point-opacity": scatterPointOpacity = 0.85,
    "data-scatter-reference-x": scatterReferenceX = "",
    "data-scatter-reference-y": scatterReferenceY = "",
    "data-scatter-reference-x-label": scatterReferenceXLabel = "",
    "data-scatter-reference-y-label": scatterReferenceYLabel = "",
    "data-scatter-quadrant-top-left-label": scatterQuadrantTopLeftLabel = "",
    "data-scatter-quadrant-top-right-label": scatterQuadrantTopRightLabel = "",
    "data-scatter-quadrant-bottom-left-label": scatterQuadrantBottomLeftLabel = "",
    "data-scatter-quadrant-bottom-right-label": scatterQuadrantBottomRightLabel = "",

    // Responsive preview
    "data-mobile-customization": mobileCustomization = "{}",
    "data-preview-mode": previewModeProp = "Desktop",
  } = props;

  const type = forcedType || configuredType || DEFAULT_CHART_TYPE;
  const definition = getChartDefinition(type);
  const locale = props.intl.locale;
  const ref = useRef(null);

  let previewMode = previewModeProp;
  if (pageModuleProps?.previewMode && pageModuleProps?.editing) {
    previewMode = pageModuleProps.previewMode;
    editing = pageModuleProps.editing;
  }

  const mobileConfigSettings = useMemo(
    () => parseJsonValue(mobileCustomization, editing) || {},
    [mobileCustomization, editing],
  );
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 1250 : false,
  );
  const isMobileConfigEnabled =
    isMobileOrTablet && (mobileConfigSettings?.showCustomization ?? false);

  const isTabletEditMode = ["Tablet"].includes(previewMode) && editing;
  const isMobileEditMode = ["Mobile"].includes(previewMode) && editing;
  const isDesktopEditMode = ["Desktop"].includes(previewMode) && editing;
  const isNotDesktopPreview = isMobileConfigEnabled && previewMode !== "Desktop";
  const isNotEditingAndIsMobileOrTablet = isMobileConfigEnabled && !editing;

  const getTickRotation = () => {
    if (typeof window === "undefined") {
      return tickRotation;
    }

    const isTabletViewport = window.matchMedia(
      "(min-width: 768px) and (max-width: 1250px)",
    ).matches;
    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;

    switch (true) {
      case isDesktopEditMode:
        return tickRotation;
      case isTabletEditMode:
        return isMobileConfigEnabled
          ? (mobileConfigSettings?.tabletXAxisTextRotation ?? tickRotation)
          : tickRotation;
      case isMobileEditMode:
        return isMobileConfigEnabled
          ? (mobileConfigSettings?.mobileXAxisTextRotation ?? tickRotation)
          : tickRotation;
      case isTabletViewport:
        return isMobileConfigEnabled
          ? (mobileConfigSettings?.tabletXAxisTextRotation ?? tickRotation)
          : tickRotation;
      case isMobileViewport:
        return isMobileConfigEnabled
          ? (mobileConfigSettings?.mobileXAxisTextRotation ?? tickRotation)
          : tickRotation;
      default:
        return tickRotation;
    }
  };

  const [deviceTickRotation, setTickRotation] = useState(getTickRotation());
  const decode = (value) => decodeValue(value, editing);
  const parse = (value) => parseJsonValue(value, editing);

  const getManualColor = () => {
    const parsedColors = parse(manualColors);
    if (!parsedColors) return null;

    const appColors = parsedColors[app];
    if (app === "csv" && appColors && scheme === "manual") {
      if (appColors[colorBy] !== undefined) {
        return appColors;
      }

      if (
        typeof appColors === "object" &&
        appColors !== null &&
        !Array.isArray(appColors)
      ) {
        const hasColorValues = Object.values(appColors).some(
          (value) =>
            typeof value === "string" &&
            (value.startsWith("#") || value.startsWith("rgb")),
        );

        if (hasColorValues) {
          return { [colorBy]: appColors };
        }
      }
    }

    return appColors;
  };

  const getMeasuresObject = () => parse(measures);
  let measuresObject = getMeasuresObject();

  const getSelectedFormat = (activeMeasures = null) => {
    if (measuresObject?.[app]) {
      let selectedFormat = measuresObject?.[app]?.format;
      if (!selectedFormat) {
        const keys = activeMeasures && activeMeasures.length > 0
          ? activeMeasures
          : Object.keys(measuresObject?.[app]);

        for (let index = 0; index < keys.length; index += 1) {
          if (
            measuresObject?.[app][keys[index]] &&
            (activeMeasures ? true : measuresObject?.[app][keys[index]].selected) &&
            measuresObject?.[app][keys[index]].format
          ) {
            selectedFormat = measuresObject?.[app][keys[index]].format;
            break;
          }
        }
      }
      return selectedFormat;
    }

    return measuresObject?.csv ? measuresObject.csv.format : null;
  };

  const getCustomAxisFormat = () => {
    if (measuresObject?.[app]) {
      const useCustomAxisFormat = measuresObject[app].useCustomAxisFormat;
      if (useCustomAxisFormat && measuresObject[app].customFormat) {
        return measuresObject[app].customFormat;
      }
    } else if (measuresObject?.csv) {
      const useCustomAxisFormat = measuresObject.csv.useCustomAxisFormat;
      if (useCustomAxisFormat && measuresObject.csv.customFormat) {
        return measuresObject.csv.customFormat;
      }
    }

    return null;
  };

  const getSelectedMeasures = () => {
    if (measuresObject?.[app]) {
      return Object.keys(measuresObject[app])
        .map((measureKey) => ({ value: measureKey, ...measuresObject[app][measureKey] }))
        .filter((measureConfig) => measureConfig.selected)
        .map((measureConfig) => measureConfig.value);
    }

    return [];
  };

  const getCustomLabels = (activeMeasures = null) => {
    const customLabels = {};
    if (measuresObject?.[app]) {
      const labelMeasures = Object.keys(measuresObject[app])
        .map((measureKey) => ({ value: measureKey, ...measuresObject[app][measureKey] }))
        .filter((measureConfig) => {
          if (activeMeasures && activeMeasures.length > 0) {
            return activeMeasures.includes(measureConfig.value) && measureConfig.hasCustomLabel;
          }
          return measureConfig.selected && measureConfig.hasCustomLabel;
        });

      labelMeasures.forEach((measureConfig) => {
        customLabels[measureConfig.value] = measureConfig.customLabel;
      });
    }
    return customLabels;
  };

  const getUserMeasures = () => {
    if (measuresObject?.[app]) {
      return Object.keys(measuresObject[app]).filter(
        (key) => measuresObject[app][key].allowSelection,
      );
    }
    return [];
  };

  let selectedMeasures = getSelectedMeasures();
  let selectedFormat = getSelectedFormat();
  const userMeasures = getUserMeasures();
  const selectorMeasures = userMeasures.length > 0 ? userMeasures : selectedMeasures;
  let leftLegendForSelectedMeasure = left;
  let rightLegendForSelectedMeasure = rightLegend;
  let tooltipForSelectedMeasure = decode(tooltip);

  if (injectedMeasures?.[app]) {
    const selected = Object.keys(injectedMeasures[app].measures)
      .map((measureKey) => ({ value: measureKey, ...injectedMeasures[app].measures[measureKey] }))
      .filter((measureConfig) => measureConfig.selected)
      .map((measureConfig) => measureConfig.value);

    measuresObject = injectedMeasures;
    selectedMeasures = selected;
    selectedFormat = getSelectedFormat();
    leftLegendForSelectedMeasure = injectedMeasures.leftTitle;
    rightLegendForSelectedMeasure = injectedMeasures.rightTitle;

    if (injectedMeasures.customTooltip) {
      tooltipForSelectedMeasure = injectedMeasures.customTooltip;
    }
  }

  const enableMeasureSelectorBool = parseBoolean(enableMeasureSelector);
  const selectorEnabled =
    definition.supportsMeasureSelector !== false &&
    enableMeasureSelectorBool &&
    !injectedMeasures?.[app] &&
    selectorMeasures.length > 1;
  const [selectedUserMeasure, setSelectedUserMeasure] = useState("");

  const buildSelectorOptions = () =>
    selectorMeasures.map((measure) => ({
      value: measure,
      label:
        (typeof measuresObject?.[app]?.[measure]?.customLabel === "string" &&
          measuresObject?.[app]?.[measure]?.customLabel.trim().length > 0 &&
          measuresObject?.[app]?.[measure]?.hasCustomLabel)
          ? measuresObject[app][measure].customLabel.trim()
          : (measuresObject?.[app]?.[measure]?.labels?.[locale?.toUpperCase?.()] ||
              measuresObject?.[app]?.[measure]?.label ||
              measure),
    }));

  useEffect(() => {
    if (!selectorEnabled) {
      setSelectedUserMeasure("");
      return;
    }

    const availableMeasures = selectorMeasures.filter(
      (measure) => measuresObject?.[app]?.[measure],
    );
    const fallbackMeasure = availableMeasures.includes(defaultMeasure)
      ? defaultMeasure
      : availableMeasures.find((measure) => selectedMeasures.includes(measure)) ||
        availableMeasures[0] ||
        "";

    setSelectedUserMeasure((previousMeasure) =>
      availableMeasures.includes(previousMeasure) ? previousMeasure : fallbackMeasure,
    );
  }, [
    selectorEnabled,
    defaultMeasure,
    app,
    measuresObject,
    selectorMeasures,
    selectedMeasures,
  ]);

  const runtimeFallbackMeasure =
    selectorMeasures.find((measure) => selectedMeasures.includes(measure)) ||
    (selectorMeasures.length > 0 ? selectorMeasures[0] : selectedMeasures[0] || "");
  const effectiveSelectedMeasures =
    selectorEnabled && selectedUserMeasure
      ? [selectedUserMeasure]
      : selectedMeasures.length > 0
        ? selectedMeasures
        : runtimeFallbackMeasure
        ? [runtimeFallbackMeasure]
        : selectedMeasures;
  selectedFormat = getSelectedFormat(effectiveSelectedMeasures);
  const effectiveCustomLabels = getCustomLabels(effectiveSelectedMeasures);
  const numberFormat = parseNumberFormat(selectedFormat);
  const customAxisFormat = getCustomAxisFormat();
  const groupTotalFormatParsed = parseGroupTotalFormat(parse(groupTotalFormat));
  const [mode, setMode] = useState(editMode);
  const viewMode = editing ? editMode : mode;
  const colors = {
    scheme,
    colorBy,
  };
  const contentHeight = editing ? height - 80 : height;

  const showXAxisTitle = () =>
    (isNotDesktopPreview || isNotEditingAndIsMobileOrTablet) &&
    !mobileConfigSettings?.showXAxisTitle
      ? ""
      : bottom;

  const showYAxisTitle = () => {
    if (isNotDesktopPreview || isNotEditingAndIsMobileOrTablet) {
      return mobileConfigSettings?.showYAxisTitle ? leftLegendForSelectedMeasure : "";
    }
    return leftLegendForSelectedMeasure;
  };

  const showRightAxisTitle = () => {
    if (isNotDesktopPreview || isNotEditingAndIsMobileOrTablet) {
      return mobileConfigSettings?.showRightAxisTitle ? rightLegendForSelectedMeasure : "";
    }
    return rightLegendForSelectedMeasure;
  };

  const legends = {
    left: showYAxisTitle(),
    bottom: showXAxisTitle(),
    right: showRightAxisTitle(),
  };

  const switchGridLines = () => {
    if (parseBoolean(enableGridX) && !parseBoolean(enableGridY)) {
      enableGridX = false;
      enableGridY = true;
    } else if (!parseBoolean(enableGridX) && parseBoolean(enableGridY)) {
      enableGridX = true;
      enableGridY = false;
    }
  };

  const switchLayout = () => {
    if (layout === "horizontal") {
      switchGridLines();
      return "vertical";
    }
    switchGridLines();
    return "horizontal";
  };

  const mobileLayout = () => {
    if (mobileConfigSettings?.chartLayoutOverride) {
      return switchLayout();
    }
    return layout;
  };

  const getMarginValue = (mobileEnabled, mobileSetting, defaultValue) =>
    mobileEnabled ? (Number.parseInt(mobileSetting) ?? defaultValue) : defaultValue;

  const getBarPadValue = (mobileEnabled, mobileSetting, defaultValue) =>
    mobileEnabled ? (mobileSetting ?? defaultValue) : defaultValue;

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const updateDeviceType = () => {
      setIsMobileOrTablet(window.innerWidth <= 1250);
      setTickRotation(getTickRotation());
    };

    window.addEventListener("resize", updateDeviceType);
    setTickRotation(getTickRotation());

    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, [
    editing,
    previewMode,
    isMobileConfigEnabled,
    tickRotation,
    mobileConfigSettings?.tabletXAxisTextRotation,
    mobileConfigSettings?.mobileXAxisTextRotation,
  ]);

  const determineLegendPosition = () => {
    const isTabletOrMobile = ["tablet", "mobile", "midTablet"].includes(getDeviceType());
    if (editing && previewMode === "Desktop") {
      return legendPosition;
    }
    return isTabletOrMobile ? "bottom" : legendPosition;
  };

  const normalizedHiddenBars = parseHiddenBars(hiddenBars);
  const sharedChartProps = {
    app,
    editing,
    previewMode,
    type,
    height: `${contentHeight}px`,
    colors,
    colorBy,
    legendPosition: determineLegendPosition(),
    legends,
    showLegends: parseBoolean(showLegends),
    legendLabel,
    legendLabelColor: decode(legendLabelColor),
    legendLabelBack: parseBoolean(legendLabelBack),
    legendCheckBack: parseBoolean(legendCheckBack),
    reverseLegend: parseBoolean(reverseLegend),
    tooltipEnabled: parseBoolean(tooltipEnabled),
    tooltipEnableMarkdown: parseBoolean(tooltipEnableMarkdown),
    tooltip:
      parseBoolean(tooltipEnableMarkdown)
        ? tooltipForSelectedMeasure
        : tooltipForSelectedMeasure.replace(/\r\n/g, "<hr/>").replace(/[\r\n]/g, "<hr/>"),
    format: numberFormat,
    customAxisFormat,
    selectedMeasures: effectiveSelectedMeasures,
    userMeasures,
    locale,
    categories,
    showPercentage: parseBoolean(showPercentage),
    mobileCustomization,
  };

  const axisAndLayoutProps = {
    tickColor: decode(tickColor),
    tickRotation: deviceTickRotation,
    layout:
      isNotDesktopPreview || isNotEditingAndIsMobileOrTablet ? mobileLayout() : layout,
    reverse: parseBoolean(reverse),
    marginLeft: getMarginValue(
      isNotDesktopPreview || isNotEditingAndIsMobileOrTablet,
      Number.parseInt(mobileConfigSettings?.marginLeft),
      parseInt(marginLeft),
    ),
    marginTop: getMarginValue(
      isNotDesktopPreview || isNotEditingAndIsMobileOrTablet,
      Number.parseInt(mobileConfigSettings?.marginTop),
      parseInt(marginTop),
    ),
    marginRight: getMarginValue(
      isNotDesktopPreview || isNotEditingAndIsMobileOrTablet,
      Number.parseInt(mobileConfigSettings?.marginRight),
      Number.parseInt(marginRight),
    ),
    marginBottom: getMarginValue(
      isNotDesktopPreview || isNotEditingAndIsMobileOrTablet,
      Number.parseInt(mobileConfigSettings?.marginBottom),
      Number.parseInt(marginBottom),
    ),
    xAxisTickValues:
      isNotDesktopPreview || isNotEditingAndIsMobileOrTablet
        ? (mobileConfigSettings.xAxisTickValues ?? xAxisTickValues)
        : xAxisTickValues,
    yAxisTickValues:
      isNotDesktopPreview || isNotEditingAndIsMobileOrTablet
        ? (mobileConfigSettings.yAxisTickValues ?? yAxisTickValues)
        : yAxisTickValues,
    lineXAxisTickMode,
    lineXAxisTickCount: parseInt(lineXAxisTickCount) || 10,
    lineXAxisTickEvery: parseInt(lineXAxisTickEvery) || 1,
    offsetText,
    xLabelColor: decode(xLabelColor),
    showTickLine: parseBoolean(showTickLine),
    showRightAxis: parseBoolean(showRightAxis),
    rightLegend: rightLegendForSelectedMeasure,
    offsetRight,
    offsetBottom,
    enableGridY: parseBoolean(enableGridY),
    enableGridX: parseBoolean(enableGridX),
    highlightXAxisLine: parseBoolean(highlightXAxisLine),
    overrideTickColor: parseBoolean(overrideTickColor),
  };

  const measureAndSortingProps = {
    overallLabel,
    includeOverall: parseBoolean(includeOverall),
    hiddenBars: normalizedHiddenBars,
    sort: props["data-sort"] || "default",
    sortReverse: parseBoolean(props["data-sort-reverse"]),
    sortSecondDimension: props["data-sort-second-dimension"] || "default",
    sortReverseSecondDimension: parseBoolean(props["data-sort-reverse-second-dimension"]),
    customLabels: effectiveCustomLabels,
  };

  const valueAndScaleProps = {
    maxValue,
    valueScale,
    fixedMinValue,
    fixedMaxValue,
    minMaxClamp,
  };

  const barProps = {
    groupMode,
    swap: parseBoolean(swap),
    barColor: decode(barColor),
    barPadding: getBarPadValue(
      isNotDesktopPreview || isNotEditingAndIsMobileOrTablet,
      mobileConfigSettings?.barPadding,
      barPadding,
    ),
    barInnerPadding: getBarPadValue(
      isNotDesktopPreview || isNotEditingAndIsMobileOrTablet,
      mobileConfigSettings?.barInnerPadding,
      barInnerPadding,
    ),
    barLabelPosition,
    barLabelColor: decode(barLabelColor),
    showGroupTotal: parseBoolean(showGroupTotal),
    groupTotalMeasure,
    groupTotalLabel,
    groupTotalFormat: groupTotalFormatParsed,
    groupTotalOffset,
    groupTotalFixedPosition: parseBoolean(groupTotalFixedPosition),
  };

  const lineProps = {
    offsetY,
    lineLayerEnabled: parseBoolean(lineLayerEnabled),
    overlays: parse(overlays) || [],
    lineLabelPosition,
    enableArea: parseBoolean(enableArea),
    areaShadingCriteria,
    areaLowerBound,
    areaUpperBound,
    showPoints: parseBoolean(showPoints),
    confidenceIntervals: parse(confidenceIntervals) || [],
    showGrid: parseBoolean(showGrid),
    lineCurve,
  };

  const pieProps = {
    startAngle,
    endAngle,
    centerLabel,
    showArcLabels: parseBoolean(showArcLabels),
    showArcLinkLabels: parseBoolean(showArcLinkLabels),
    slicePadding,
    centerLabelFontWeight,
    centerLabelFontSize,
    centerLabelXOffset,
    centerLabelYOffset,
  };

  const radarProps = {
    radarCurve,
    radarFillOpacity,
    radarBorderWidth,
    radarGridLevels,
    radarGridShape,
    radarGridLabelOffset,
    radarEnableDots: parseBoolean(radarEnableDots),
    radarDotSize,
    radarEnableDotLabel: parseBoolean(radarEnableDotLabel),
    radarDotLabelOffset,
  };

  const scatterProps = {
    scatterMinSize,
    scatterMaxSize,
    scatterShowLabels: parseBoolean(scatterShowLabels),
    scatterConnectPoints: parseBoolean(scatterConnectPoints),
    scatterPointOpacity,
    scatterReferenceX,
    scatterReferenceY,
    scatterReferenceXLabel: decode(scatterReferenceXLabel),
    scatterReferenceYLabel: decode(scatterReferenceYLabel),
    scatterQuadrantTopLeftLabel: decode(scatterQuadrantTopLeftLabel),
    scatterQuadrantTopRightLabel: decode(scatterQuadrantTopRightLabel),
    scatterQuadrantBottomLeftLabel: decode(scatterQuadrantBottomLeftLabel),
    scatterQuadrantBottomRightLabel: decode(scatterQuadrantBottomRightLabel),
  };

  const chartProps = {
    ...sharedChartProps,
    ...axisAndLayoutProps,
    ...measureAndSortingProps,
    ...valueAndScaleProps,
    ...barProps,
    ...lineProps,
    ...pieProps,
    ...radarProps,
    ...scatterProps,
    showLegendsInColumns: parseBoolean(showLegendsInColumns),
    numberOfLegendColumns: parseInt(numberOfLegendColumns) || 4,
  };

  const params = {};
  const parsedFilters = parse(filters) || {};
  if (parsedFilters && parsedFilters.forEach) {
    parsedFilters.forEach((filterConfig) => {
      if (
        filterConfig.value != null &&
        filterConfig.value.filter((value) => value != null && value.toString().trim() !== "")
          .length > 0
      ) {
        params[filterConfig.param] = filterConfig.value;
      }
    });
  }

  if (dvzProxyDatasetId) {
    params.dvzProxyDatasetId = dvzProxyDatasetId;
  }

  const dimensions = [];
  if (dimension1 !== "none") dimensions.push(dimension1);
  if (dimension2 !== "none") dimensions.push(dimension2);

  const { component: ChartComponent } = definition;
  const { component: ChartDataFrame, runtimeType } = resolveChartDataFrame({ type, app });
  const showNotEnoughParameters = definition.isMissingRequiredParams({
    app,
    dimension1,
    dimension2,
    selectedMeasures: effectiveSelectedMeasures,
  });

  const [legendsContainerHeight, setLegendsContainerHeight] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      if (isMobileOrTablet && ref.current) {
        const legendsContainer =
          ref.current.querySelector(
            ".legends.container.has-standard-12-font-size.bottom",
          ) ||
          ref.current.querySelector(
            ".legends.container.items-section:not(.legends.container.top .items-section)",
          );

        if (!legendsContainer) return;
        if (legendsContainer.closest(".legends.container.top")) return;

        const { clientHeight: legendsHeight } = legendsContainer;
        const styles = window.getComputedStyle(legendsContainer);
        const marginTopValue = parseInt(styles.marginTop);
        const marginBottomValue = parseInt(styles.marginBottom);
        const paddingTop = parseInt(styles.paddingTop);
        const paddingBottom = parseInt(styles.paddingBottom);
        const totalHeight =
          legendsHeight + marginTopValue + marginBottomValue + paddingTop + paddingBottom;

        const container = legendsContainer.closest(".ui.fluid.container.content");
        if (container) {
          const dataSourceParagraph = container.querySelector(".data-source");
          if (dataSourceParagraph) {
            const dataSourceRect = dataSourceParagraph.getBoundingClientRect();
            const legendsRect = legendsContainer.getBoundingClientRect();

            if (legendsRect.bottom !== 0 && dataSourceRect.top !== 0) {
              if (legendsContainer.textContent.trim() === "") return;

              const adjustedLegendsBottom = legendsRect.bottom + marginBottomValue;
              const dataSourceStyles = window.getComputedStyle(dataSourceParagraph);
              const dataSourceMarginTop = parseFloat(dataSourceStyles.marginTop) || 0;
              const adjustedDataSourceTop = dataSourceRect.top - dataSourceMarginTop;

              if (adjustedLegendsBottom > adjustedDataSourceTop) {
                let overlap = adjustedLegendsBottom - adjustedDataSourceTop;
                if (overlap < 5) overlap += 1;
                dataSourceParagraph.style.marginTop = `${overlap + 1}px`;
              }
            }
          }
        }

        const chartContainer = legendsContainer.closest(".chart.container");
        if (chartContainer) {
          const chartContainerRect = chartContainer.getBoundingClientRect();
          const chartContainerStyles = window.getComputedStyle(chartContainer);
          const chartContainerMarginBottom =
            Number.parseFloat(chartContainerStyles.marginBottom) || 0;
          const adjustedChartContainerBottom =
            chartContainerRect.bottom + chartContainerMarginBottom;
          const legendsRect = legendsContainer.getBoundingClientRect();
          const legendsMarginTop = Number.parseFloat(styles.marginTop) || 0;
          const adjustedLegendsTop = legendsRect.top - legendsMarginTop;

          if (adjustedLegendsTop < adjustedChartContainerBottom) {
            const overlap = adjustedChartContainerBottom - adjustedLegendsTop;
            const maxMargin = 200;
            const marginToApply = Math.min(overlap + 1, maxMargin);
            if (overlap > 0 && overlap < maxMargin) {
              legendsContainer.style.marginTop = `${marginToApply}px`;
            }
          }
        }

        setLegendsContainerHeight(totalHeight);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isMobileOrTablet]);

  const ChartFrameContent = ({ data, options }) => {
    const selectorOptions = buildSelectorOptions();
    const chartNode = <ChartComponent {...chartProps} options={options} />;

    return (
      <>
        {selectorEnabled && (
          <MeasureSelector
            label={decode(measureSelectorLabel) || "Measure"}
            options={selectorOptions}
            data={data}
            metadataMeasures={options?.metadata?.measures}
            locale={locale}
            value={effectiveSelectedMeasures[0] || selectorOptions[0]?.value || ""}
            onChange={setSelectedUserMeasure}
          />
        )}
        {definition.requiresColorProvider !== false ? (
          <ColorProvider
            type={type}
            app={app}
            locale={locale}
            overallLabel={overallLabel}
            customLabels={effectiveCustomLabels}
            manualColors={getManualColor()}
            colorBy={colorBy}
            scheme={scheme}
            barColor={chartProps.barColor}
            options={options}
          >
            {chartNode}
          </ColorProvider>
        ) : (
          chartNode
        )}
      </>
    );
  };

  const ChartRuntimeContent = ({ data }) => (
    <>
      <Messages data={data} app={app} group={group} noDataMsg={noDataMsg}> </Messages>
      <ChartDataFrame
        data={data}
        locale={locale}
        colorBy={colorBy}
        hiddenBars={normalizedHiddenBars}
        swap={parseBoolean(swap)}
        type={runtimeType}
        includeTotal={true}
        includeOverall={parseBoolean(includeOverall)}
        overallLabel={overallLabel}
        measures={effectiveSelectedMeasures}
        dimensions={[...dimensions]}
        sort={measureAndSortingProps.sort}
        sortReverse={measureAndSortingProps.sortReverse}
        sortSecondDimension={measureAndSortingProps.sortSecondDimension}
        sortReverseSecondDimension={measureAndSortingProps.sortReverseSecondDimension}
        customLabels={effectiveCustomLabels}
      >
        <ChartFrameContent data={data} />
      </ChartDataFrame>
    </>
  );

  return (
    <div ref={ref}>
      <Container
        className={"chart container"}
        style={{
          minHeight:
            type === "pie" && typeof window !== "undefined" && window.innerWidth <= 480
              ? `${parseInt(height) + parseInt(legendsContainerHeight) * 0.5}px`
              : `${parseInt(height) + parseInt(legendsContainerHeight)}px`,
        }}
        fluid={true}
      >
        <DataProvider
          editing={editing}
          style={{ height: `${contentHeight}px` }}
          params={params}
          waitForFilters={waitForFilters === "true"}
          app={app}
          group={group}
          csv={csv}
          store={[app, unique, ...dimensions, type]}
          source={dimensions.join("/")}
        >
          <Container
            style={{ height: `${contentHeight}px` }}
            className={"body"}
            fluid={true}
          >
            {showNotEnoughParameters && <Messages editing={editing}></Messages>}
            {!showNotEnoughParameters && (
              <DataConsumer>
                <ChartRuntimeContent />
              </DataConsumer>
            )}
          </Container>
        </DataProvider>

        <br />
        {dualMode === "true" && childContent && viewMode === "info" && (
          <Container
            fluid={true}
            style={{ height: `${contentHeight}px` }}
            className={"body"}
          >
            <PostContent post={{ content: { rendered: childContent } }} />
          </Container>
        )}
      </Container>
    </div>
  );
};

export default ChartEmbeddableRuntime;

