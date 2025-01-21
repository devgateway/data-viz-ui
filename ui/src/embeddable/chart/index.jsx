import React, { useEffect, useRef, useState } from "react";
import { Container } from "semantic-ui-react";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import { buildDivergingOptions, buildPieOptions } from "./prevalenceBuilder";
import HalfPie from "./Pie";

import Radar from "./Radar";
import Bar from "./Bar";
import Line from "./Line";

import { PostContent } from "@devgateway/wp-react-lib";
import dataFrames from "./data/index";

import CSVDataFrame from "./CSVDataFrame";
import ColorProvider from "./colors/ColorProvider";
import Messages from "./Messages";
import { connect } from "react-redux";
import deviceType from '../../utils/deviceType';


const isMobile = deviceType() === 'mobile';
const isTablet = deviceType() === 'tablet';
const isMidTablet = deviceType() === 'midTablet';
const isMobileOrTablet = deviceType() === 'mobile' || deviceType() === 'tablet' || deviceType() === 'midTablet';

const PieChart = (props) => {
  const { data, legends, colors, height } = props;
  const options = buildPieOptions(data, true);
  return (
    <HalfPie
      height={height}
      legends={legends}
      colors={colors}
      options={options}
      format={{ style: "percent" }}
    ></HalfPie>
  );
};

const Diverging = (props) => {
  const { data, legends, colors, height } = props;
  const options = buildDivergingOptions(data, true);
  return (
    <Diverging
      height={height}
      legends={legends}
      colors={colors}
      options={options}
      format={{ style: "percent", currency: "EUR" }}
    ></Diverging>
  );
};
const Chart = (props) => {
  let {
    parent,
    editing = false,
    unique,
    childContent,
    categories,
    injectedMeasures,
    "data-app": app = "prevalence",
    "data-group": group = "default",
    "data-height": height = 500,
    "data-type": type = "bar", //'data-source': source = 'gender/smoke',f
    "data-dimension1": dimension1,
    "data-dimension2": dimension2,
    "data-dimension3": dimension3,
    "data-color-by": colorBy = "index",
    "data-scheme": scheme = "system",
    "data-group-mode": groupMode = "grouped",
    "data-left-legend": left = "Left Legend",
    "data-legend-label": legendLabel = "",
    "data-bottom-legend": bottom = "Bottom Legend",
    "data-dualmode": dualMode,
    "data-legend-position": legendPosition = "right",
    "data-show-legends": showLegends = "true",
    "data-data-source-label": dataSourceLabel = "Source",
    "data-chart-data-source": dataSource = "Data Source",
    "data-toggle-info-label": toggleInfoLabel = "Info Graphic",
    "data-toggle-chart-label": toggleChartLabel = "Chart", //'data-number-format': format = '{"style":"percent", "minimumFractionDigits": 1, "maximumFractionDigits": 1}',
    "data-tick-rotation": tickRotation = 0,
    "data-tick-color": tickColor = "rgb(92,93,99)",
    "data-measures": measures = "{}",
    "data-format": format = "{}",
    "data-csv": csv = "",
    "data-margin-left": marginLeft = 50,
    "data-margin-top": marginTop = 25,
    "data-margin-right": marginRight = 25,
    "data-margin-bottom": marginBottom = 25,
    "data-start-angle": startAngle = 0,
    "data-end-angle": endAngle = 360,
    "data-view-mode": editMode = "info",
    "data-filters": filters = "[]", //filters
    "data-tooltip-html": tooltip = "",
    "data-layout": layout = "vertical",
    "data-reverse": reverse = "false",
    "data-offset-y": offsetY = "-40",
    "data-line-layer-enabled": lineLayerEnabled = "false",

    //"data-csv-line-layer-data": csvLineLayerData = "",
    //"data-csv-line-color": lineColor = "#000000",
    //"data-csv-line-tooltip": lineTooltip = "",
    //"data-csv-line-title": lineTitle = "",

    "data-overlays": overlays,
    "data-max-value": maxValue = "auto",
    "data-value-scale": valueScale = "linear",
    "data-swap": swap = "false",
    "data-no-data-message": noDataMsg = "No data matches your selection",
    "data-bar-color": barColor = "rgb(0,0,0)",
    "data-override-tick-color": overrideTickColor = "false",
    "data-fixed-min-value": fixedMinValue = 0,
    "data-fixed-max-value": fixedMaxValue = 0,
    "data-bar-padding": barPadding = 0.15,
    "data-bar-label-position": barLabelPosition = "middle",
    "data-line-label-position": lineLabelPosition = "none",
    "data-show-grid": showGrid = "true",
    "data-include-overall": includeOverall = "false",
    "data-bar-inner-padding": barInnerPadding = 0.7,
    "data-x-label-color": xLabelColor = "#000",
    "data-bar-label-color": barLabelColor = "#000",
    "data-legend-label-color": legendLabelColor = "#000",
    "data-tooltip-enabled": tooltipEnabled = "true",
    "data-use-check-box-background": legendCheckBack = "false",
    "data-use-label-background": legendLabelBack = "true",
    "data-highlight-xaxis-line": highlightXAxisLine = "false",
    "data-show-tick-line": showTickLine = "true",
    "data-show-right-axis": showRightAxis = "true",
    "data-manual-colors": manualColors = "{}",
    "data-right-legend": rightLegend = "",
    "data-offset-right": offsetRight = "40",
    "data-offset-bottom": offsetBottom = "40",
    "data-hidden-bars": hiddenBars = [],
    "data-confidence-intervals": confidenceIntervals = "[]",
    "data-enable-area": enableArea = "false",
    "data-area-shading-criteria": areaShadingCriteria = "DEFAULT",
    "data-area-lower-bound": areaLowerBound = "",
    "data-area-upper-bound": areaUpperBound = "",
    "data-show-points": showPoints = "true",
    "data-center-label": centerLabel = "",
    "data-show-arc-labels": showArcLabels = "true",
    "data-show-arc-link-labels": showArcLinkLabels = "true",
    "data-slice-padding": slicePadding = 1,
    "data-center-label-font-weight": centerLabelFontWeight = "normal",
    "data-center-label-font-size": centerLabelFontSize = "12",
    "data-center-label-xoffset": centerLabelXOffset = 0,
    "data-center-label-yoffset": centerLabelYOffset = 0,
    "data-group-total-measure": groupTotalMeasure = "",
    "data-show-group-total": showGroupTotal = "true",
    "data-group-total-label": groupTotalLabel = "",
    "data-group-total-format": groupTotalFormat = "{}",
    "data-group-total-label-offset": groupTotalOffset,
    "data-group-total-fixed-position": groupTotalFixedPosition = "false",
    "data-tooltip-enable-markdown": tooltipEnableMarkdown = "false",
    "data-y-axis-tick-values": yAxisTickValues = "10",
    "data-x-axis-tick-values": xAxisTickValues = "10",
    "data-enable-grid-y": enableGridY = "true",
    "data-enable-grid-x": enableGridX = "false",
    "data-offset-text": offsetText = 0,
    "data-overall-label": overallLabel = "Overall",
    "data-min-max-clamp": minMaxClamp = "false",
    "data-reverse-legend": reverseLegend = "false",
    "data-sort": sort = "default",
    "data-sort-reverse": sortReverse = "false",
    "data-sort2dimension": sort2Dimension = "_total",
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
    "data-mobile-customization": mobileCustomization = "{}",
  } = props;
  const mobileConfigSettings = JSON.parse(decodeURIComponent(mobileCustomization));
  const isMobileConfigEnabled = (isMobile || isTablet || isMidTablet) && (mobileConfigSettings?.  showCustomization ?? false);

  const locale = props.intl.locale;
  const ref = useRef(null);
  const decode = (value) => {
    try {
      if (editing) {
        return value;
      }
      return decodeURIComponent(value);
    } catch(err) {
      console.error("error decoding value:" + value);
      return value;
    }
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

  const getMeasuresObject = () => {
    return parse(measures);
  };
  const getSelectedFormat = () => {
    if (measuresObject[app]) {
      let format = measuresObject[app].format;
      if (!format) {
        const keys = Object.keys(measuresObject[app]);
        for (let i = 0; i < keys.length; i++) {
          if (
            measuresObject[app][keys[i]].selected &&
            measuresObject[app][keys[i]].format
          ) {
            format = measuresObject[app][keys[i]].format;
            break;
          }
        }
      }

      return format;
    } else {
      return measuresObject && measuresObject["csv"]
        ? measuresObject["csv"].format
        : null;
    }
  };

  const getCustomAxisFormat = () => {
    let format = null;
    if (measuresObject[app]) {
      const useCustomAxisFormat = measuresObject[app].useCustomAxisFormat;
      if (useCustomAxisFormat && measuresObject[app].customFormat) {
        format = measuresObject[app].customFormat;
      }
    } else {
      if (measuresObject && measuresObject["csv"]) {
        const useCustomAxisFormat = measuresObject["csv"].useCustomAxisFormat;
        if (useCustomAxisFormat && measuresObject["csv"].customFormat) {
          format = measuresObject["csv"].customFormat;
        }
      }
    }

    return format;
  };

  const getSelectedMeasures = () => {
    if (measuresObject[app]) {
      return Object.keys(measuresObject[app])
        .map((s) => ({ value: s, ...measuresObject[app][s] }))
        .filter((m) => m.selected)
        .map((s) => s.value);
    }
    return [];
  };
  const getCustomLabels = () => {
    const customLabels = {};
    if (measuresObject[app]) {
      const hasCustomLabels = Object.keys(measuresObject[app])
        .map((s) => ({ value: s, ...measuresObject[app][s] }))
        .filter((m) => m.selected && m.hasCustomLabel);
      hasCustomLabels.forEach((m) => {
        customLabels[m.value] = m.customLabel;
      });
    }
    return customLabels;
  };
  const getUserMeasures = () => {
    if (measuresObject[app]) {
      return Object.keys(measuresObject[app]).filter(
        (k) => measuresObject[app][k].allowSelection
      );
    }
    return [];
  };

  let measuresObject = getMeasuresObject();
  let selectedMeasures = getSelectedMeasures();

  let selectedFormat = getSelectedFormat();
  let userMeasures = getUserMeasures();
  let leftLegendForSelectedMeasure = left;
  let rightLegendForSelectedMeasure = rightLegend;

  /*Decoding tooltip string*/
  let tooltipForSelectedMeasure = decode(tooltip);

  if (injectedMeasures) {
    const selected = Object.keys(injectedMeasures[app].measures)
      .map((s) => ({ value: s, ...injectedMeasures[app].measures[s] }))
      .filter((m) => m.selected)
      .map((s) => s.value);
    measuresObject = injectedMeasures;
    selectedMeasures = selected;
    selectedFormat = getSelectedFormat();

    leftLegendForSelectedMeasure = injectedMeasures.leftTitle;
    rightLegendForSelectedMeasure = injectedMeasures.rightTitle;
    if (injectedMeasures.customTooltip) {
      tooltipForSelectedMeasure = injectedMeasures.customTooltip;
    }
  }

  let numberFormat = selectedFormat
    ? {
        style:
          selectedFormat.style === "compacted"
            ? "decimal"
            : selectedFormat.style,
        notation: selectedFormat.style === "compacted" ? "compact" : "standard",
        currency: selectedFormat.currency,
        minimumFractionDigits: parseInt(selectedFormat.minimumFractionDigits),
        maximumFractionDigits: parseInt(selectedFormat.maximumFractionDigits),
      }
    : {
        notation: "standard",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };

  const customAxisFormat = getCustomAxisFormat();

  const groupTotalFormatObject = parse(groupTotalFormat);

  let groupTotalFormatParsed = {
    style:
      groupTotalFormatObject.style === "compacted"
        ? "decimal"
        : groupTotalFormatObject.style,
    notation:
      groupTotalFormatObject.style === "compacted" ? "compact" : "standard",
    currency: groupTotalFormatObject.currency,
    minimumFractionDigits: parseInt(
      groupTotalFormatObject.minimumFractionDigits
    ),
    maximumFractionDigits: parseInt(
      groupTotalFormatObject.maximumFractionDigits
    ),
  };
  const [mode, setMode] = useState(editMode);
  const viewMode = editing ? editMode : mode;
  const colors = {
    scheme: scheme,
    colorBy: colorBy,
  };
  let child = null;
  const contentHeight = editing ? height - 80 : height;

  const showXAxisTitle = () => {
    if(isMobileConfigEnabled) {
      if(mobileConfigSettings?.showXAxisTitle) {
        return bottom;
      } else {
        return '';
      }
    }
    return bottom;
  }

  const showYAxisTitle = () => {
    if(isMobileConfigEnabled) {
      if(mobileConfigSettings?.showYAxisTitle) {
        return leftLegendForSelectedMeasure;
      } else {
        return '';
      }
    }
    return leftLegendForSelectedMeasure;
  }

  const showRightAxisTitle = () => {
    if(isMobileConfigEnabled) {
      if(mobileConfigSettings?.showRightAxisTitle) {
        return rightLegendForSelectedMeasure;
      } else {
        return '';
      }
    }
    return rightLegendForSelectedMeasure;
  }

  const legends = {
    left: showYAxisTitle(),
    bottom: showXAxisTitle(),
    right: showRightAxisTitle(),
  };

  const parseBoolean = (str) => {
    if (str === "true" || str === true) {
      return true;
    } else if (str === "false" || str === false) {
      return false;
    }
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
    } else {
      switchGridLines();
      return "horizontal";
    }
  };

  const mobileLayout = () => {
    if (mobileConfigSettings?.chartLayoutOverride) {
      return switchLayout();
    }
    return layout;
  };


  const getMarginValue = (mobileEnabled, mobileSetting, defaultValue) => {
    return mobileEnabled ? parseInt(mobileSetting) ?? defaultValue : defaultValue;
  }

  const getBarPadValueOuterOrInner = (mobileEnabled, mobileSetting, defaultValue) => {
    return mobileEnabled ? mobileSetting ?? defaultValue: defaultValue;
  }

  const chartProps = {
    app,
    tickColor: decodeURIComponent(tickColor),
    tickRotation: isMobileConfigEnabled ? mobileConfigSettings.tickRotation ?? tickRotation : tickRotation,
    layout: isMobileConfigEnabled ? mobileLayout() : layout,
    reverse: reverse == true || reverse == "true",
    showLegends: showLegends == true || showLegends == "true",
    legendLabel,
    swap: swap == true || swap == "true",
    showGrid: showGrid == true || showGrid == "true",

    marginLeft: getMarginValue(isMobileConfigEnabled, parseInt(mobileConfigSettings?.marginLeft), parseInt(marginLeft)),
    marginTop: getMarginValue(isMobileConfigEnabled, parseInt(mobileConfigSettings?.marginTop), parseInt(marginTop)),
    marginRight: getMarginValue(isMobileConfigEnabled, parseInt(mobileConfigSettings?.marginRight), parseInt(marginRight)),
    marginBottom: getMarginValue(isMobileConfigEnabled, parseInt(mobileConfigSettings?.marginBottom), parseInt(marginBottom)),
    height: `${contentHeight}px`,
    legendPosition: isMobileOrTablet ? "bottom" : legendPosition,
    legends,
    tooltip:
      tooltipEnableMarkdown == true || tooltipEnableMarkdown == "true"
        ? tooltipForSelectedMeasure
        : tooltipForSelectedMeasure
            .replace(/\r\n/g, "<hr/>")
            .replace(/[\r\n]/g, "<hr/>"),
    colors: colors,
    groupMode: groupMode,
    format: numberFormat,
    startAngle,
    endAngle,
    offsetY, // csvLineLayerData,
    // lineColor: decodeURIComponent(lineColor),
    // lineTooltip,
    // lineTitle,
    maxValue,
    valueScale,
    categories,
    lineLayerEnabled: lineLayerEnabled == true || lineLayerEnabled == "true",
    overlays: parse(overlays) || [],
    barColor: decodeURIComponent(barColor),
    overrideTickColor: overrideTickColor == true || overrideTickColor == "true",
    fixedMinValue,
    fixedMaxValue,
    barPadding: getBarPadValueOuterOrInner(isMobileConfigEnabled, mobileConfigSettings?.barPadding, barPadding),
    barLabelPosition,
    lineLabelPosition,
    barInnerPadding: getBarPadValueOuterOrInner(isMobileConfigEnabled, mobileConfigSettings?.barInnerPadding, barInnerPadding),
    xLabelColor: decodeURIComponent(xLabelColor),
    barLabelColor: decodeURIComponent(barLabelColor),
    legendLabelColor: decodeURIComponent(legendLabelColor),
    tooltipEnabled: tooltipEnabled == true || tooltipEnabled == "true",
    legendLabelBack: legendLabelBack == true || legendLabelBack == "true",
    legendCheckBack: legendCheckBack == true || legendCheckBack == "true",
    highlightXAxisLine:
      highlightXAxisLine == true || highlightXAxisLine == "true",
    showTickLine: showTickLine == true || showTickLine == "true",
    showRightAxis: showRightAxis == true || showRightAxis == "true",
    offsetRight,
    offsetBottom,
    confidenceIntervals: parse(confidenceIntervals) || [],
    showPoints: showPoints == true || showPoints == "true",
    enableArea: enableArea == true || enableArea == "true",
    areaShadingCriteria,
    areaLowerBound,
    areaUpperBound,
    showGroupTotal: showGroupTotal == true || showGroupTotal == "true",
    groupTotalMeasure,
    groupTotalLabel,
    groupTotalFormat: groupTotalFormatParsed,
    groupTotalOffset,
    groupTotalFixedPosition:
      groupTotalFixedPosition == true || groupTotalFixedPosition == "true",
    centerLabel,
    showArcLabels: showArcLabels == true || showArcLabels == "true",
    showArcLinkLabels: showArcLinkLabels == true || showArcLinkLabels == "true",
    slicePadding,
    centerLabelFontWeight,
    centerLabelFontSize,
    centerLabelXOffset,
    centerLabelYOffset,
    userMeasures,
    tooltipEnableMarkdown:
      tooltipEnableMarkdown == true || tooltipEnableMarkdown == "true",
    yAxisTickValues: isMobileConfigEnabled ? mobileConfigSettings.yAxisTickValues ?? yAxisTickValues : yAxisTickValues,
    xAxisTickValues,
    enableGridY: enableGridY == true || enableGridY == "true",
    enableGridX: enableGridX == true || enableGridX == "true",
    offsetText,
    selectedMeasures,
    overallLabel,
    minMaxClamp,
    reverseLegend: reverseLegend == true || reverseLegend == "true",
    customAxisFormat,
    sort,
    sortReverse: sortReverse == true || sortReverse == "true",
    radarCurve,
    radarFillOpacity,
    radarBorderWidth,
    radarGridLevels,
    radarGridShape,
    radarGridLabelOffset,
    radarEnableDots: radarEnableDots == true || radarEnableDots == "true",
    radarDotSize,
    radarEnableDotLabel:
      radarEnableDotLabel == true || radarEnableDotLabel == "true",
    radarDotLabelOffset,
    sort2Dimension,
    mobileCustomization,
    dimension1
  };

  let params = {};
  const ff = parse(filters) || {};

  if (ff && ff.forEach) {
    ff.forEach((f) => {
      if (
        f.value != null &&
        f.value.filter((v) => v != null && v.toString().trim() != "").length > 0
      )
        params[f.param] = f.value;
    });
  }

  let ChartDataFrame = null;
  let Chart = null;

  if (app === "csv") {
    ChartDataFrame = CSVDataFrame;
  } else {
    switch (type) {
      case "line":
        ChartDataFrame = dataFrames.LineDataFrame;
        break;
      case "pie":
        ChartDataFrame = dataFrames.PieDataFrame;
        break;
      case "radar":
        //TODO RADAR
        ChartDataFrame = dataFrames.BarDataFrame;
        break;
      default:
        ChartDataFrame = dataFrames.BarDataFrame;
        break;
    }
  }
  let showNotEnoughParameters = false;

  switch (type) {
    case "bar":
      Chart = Bar;
      showNotEnoughParameters =
        app != "csv" && dimension1 == "none" && selectedMeasures.length == 0;
      break;
    case "line":
      Chart = Line;
      showNotEnoughParameters =
        app !== "csv" && (selectedMeasures.length === 0 || dimension1 === "none");
      break;
    case "pie":
      showNotEnoughParameters = app != "csv" && selectedMeasures.length == 0;
      Chart = HalfPie;
      break;
    case "radar":
      showNotEnoughParameters = app != "csv" && selectedMeasures.length == 0;
      Chart = Radar;
      break;
    default:
      Chart = <div>No Chart</div>;
      break;
  }

  const dual = dualMode === "true";
  const dimensions = [];
  if (dimension1 != "none") {
    dimensions.push(dimension1);
  }
  if (dimension2 != "none") {
    dimensions.push(dimension2);
  }
  const [legendsContainerHeight, setLegendsContainerHeight] = useState(0);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isMobileOrTablet) {
        // Function to handle margin adjustment for all charts
        const adjustDataSourceMargin = () => {
          const legendsContainer =
            ref.current.querySelector(
              ".legends.container.has-standard-12-font-size.bottom"
            ) || ref.current.querySelector(".legends.container.items-section");

          if (!legendsContainer) return;

          // Get computed style and dimensions of the legends container
          const { clientHeight: height } = legendsContainer;
          const styles = window.getComputedStyle(legendsContainer);
          const marginTop = parseInt(styles.marginTop);
          const marginBottom = parseInt(styles.marginBottom);
          const paddingTop = parseInt(styles.paddingTop);
          const paddingBottom = parseInt(styles.paddingBottom);
          const totalHeight =
            height + marginTop + marginBottom + paddingTop + paddingBottom;

          // Find the closest '.ui.fluid.container.content' ancestor from the legends container
          const container = legendsContainer.closest(".ui.fluid.container.content");

          if (container) {
            const dataSourceParagraph = container.querySelector(".data-source");
            if (dataSourceParagraph) {
              const dataSourceRect = dataSourceParagraph.getBoundingClientRect();
              const legendsRect = legendsContainer.getBoundingClientRect();

              // Ensure elements are visible before adjusting margins
              if (legendsRect.bottom !== 0 && dataSourceRect.top !== 0) {
                if (legendsContainer.textContent.trim() === "") return;

                const legendsMarginBottom = marginBottom; // Legend margin-bottom is already computed
                const adjustedLegendsBottom = legendsRect.bottom + legendsMarginBottom;
                const dataSourceStyles = window.getComputedStyle(dataSourceParagraph);
                const dataSourceMarginTop = parseFloat(dataSourceStyles.marginTop) || 0;
                const adjustedDataSourceTop = dataSourceRect.top - dataSourceMarginTop;

                if (adjustedLegendsBottom > adjustedDataSourceTop) {
                  let overlap = adjustedLegendsBottom - adjustedDataSourceTop;
                  if (overlap < 5) overlap += 1;
                  dataSourceParagraph.style.marginTop = `${overlap + 1}px`; // Add padding
                }
              } else {
                // Delay adjustment if elements are not fully visible yet
                setTimeout(() => {
                  if (dataSourceRect.top < legendsRect.bottom) {
                    dataSourceParagraph.style.marginTop = `${
                      legendsRect.bottom - dataSourceRect.top + 1
                    }px`;
                  }
                }, 1000);
              }
            }
          }

          // Check for overlap with the chart container above
          const chartContainer = legendsContainer.closest(".chart.container");
          if (chartContainer) {
            const chartContainerRect = chartContainer.getBoundingClientRect();
            const chartContainerStyles = window.getComputedStyle(chartContainer);
            const chartContainerMarginBottom =
              parseFloat(chartContainerStyles.marginBottom) || 0;
            const adjustedChartContainerBottom =
              chartContainerRect.bottom + chartContainerMarginBottom;

            const legendsRect = legendsContainer.getBoundingClientRect();
            const legendsMarginTop = parseFloat(styles.marginTop) || 0;
            const adjustedLegendsTop = legendsRect.top - legendsMarginTop;

            if (adjustedLegendsTop < adjustedChartContainerBottom) {
              const overlap = adjustedChartContainerBottom - adjustedLegendsTop;
              legendsContainer.style.marginTop = `${overlap + 1}px`; // Add padding
            }
          }

          setLegendsContainerHeight(totalHeight);
        };

        adjustDataSourceMargin();
      }
    }, 100);

    // Cleanup observer and timeout
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isMobileOrTablet, ref]);

  return (
    <div ref={ref}>
      <Container
          className={"chart container"}
          style={{
            minHeight:
                type === "pie" && window.innerWidth <= 480
                    ? `${parseInt(height) + parseInt(legendsContainerHeight) * 0.5}px`
                    : `${parseInt(height) + parseInt(legendsContainerHeight)}px`,
          }}
          fluid={true}
      >
        <DataProvider
          editing={editing}
          style={{ height: `${contentHeight}px` }}
          params={params}
          app={app}
          group={group}
          csv={csv}
          store={[app, unique, ...dimensions]}
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
                <Messages app={app} group={group} noDataMsg={noDataMsg}>
                  {" "}
                </Messages>
                <ChartDataFrame
                  locale={locale}
                  colorBy={colorBy}
                  hiddenBars={hiddenBars}
                  swap={swap === "true" || swap === true}
                  type={type}
                  includeTotal={true}
                  includeOverall={
                    includeOverall === true || includeOverall === "true"
                  }
                  overallLabel={overallLabel}
                  measures={selectedMeasures}
                  dimensions={[...dimensions]}
                  sort={sort}
                  sortreverse={sortReverse === true || sortReverse === "true"}
                  sort2Dimension={sort2Dimension}
                  customLabels={getCustomLabels()}
                >
                  <ColorProvider
                    type={type}
                    app={app}
                    locale={locale}
                    overallLabel={overallLabel}
                    customLabels={getCustomLabels()}
                    manualColors={getManualColor()}
                    colorBy={colorBy}
                    scheme={scheme}
                    barColor={chartProps.barColor}
                  >
                    <Chart {...chartProps}></Chart>
                  </ColorProvider>
                </ChartDataFrame>
              </DataConsumer>
            )}
          </Container>
        </DataProvider>

        <br />
        {dual && childContent && viewMode === "info" && (
          <Container
            fluid={true}
            style={{ height: contentHeight + "px" }}
            className={"body"}
          >
            <PostContent
              post={{ content: { rendered: childContent } }}
            ></PostContent>
          </Container>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { "data-app": app, "data-group": group } = ownProps;
  const injectedMeasures = state.getIn(["data", "measures", app, group]);
  if (injectedMeasures) {
    return {
      injectedMeasures: injectedMeasures,
    };
  } else {
    return {};
  }
};
const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(Chart);