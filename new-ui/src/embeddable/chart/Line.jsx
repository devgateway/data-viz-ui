import React, { Fragment, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { ResponsiveLine } from "@nivo/line";
import Tooltip from "./Tooltip";
import { area, line } from "d3-shape";
import { useTheme } from "@nivo/core";
import FlexWrapDetector from "@/layout/FlexWrapDetector";
import deviceType from '@/utils/deviceType'

const ZERO_LINE_COLOR = "#66676d";
const DEFAULT_TICK_BG_COLOR = "#f0f0f1";

const isMobile = deviceType() === "mobile";

const getTextWidth = (text, font) => {
  // re-use canvas object for better performance
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};

const lightenDarkenColor = (col, amt) => {
  let usePound = false;
  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }
  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

const Chart = ({
  app,
  legends,
  tooltip,
  tooltipEnabled,
  options,
  intl,
  groupMode,
  reverse,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  format,
  colors,
  offsetY,
  height,
  showLegends,
  legendPosition,
  tickRotation,
  offsetText,
  tickColor,
  legendLabel,
  xLabelColor,
  colorGenerator,
  legendCheckBack,
  legendLabelBack,
  legendLabelColor,
  highlightXAxisLine,
  showTickLine,
  showRightAxis,
  valueScale,
  enableArea,
  areaShadingCriteria,
  areaLowerBound,
  areaUpperBound,
  showPoints,
  maxValue,
  fixedMinValue,
  fixedMaxValue,
  offsetBottom,
  yAxisTickValues,
  enableGridY,
  enableGridX,
  overrideTickColor,
  offsetRight,
  selectedMeasures,
  tooltipEnableMarkdown,
  minMaxClamp,
  reverseLegend,
  customAxisFormat,
  mobileCustomization
}) => {
  const mobileConfigSettings = JSON.parse(decodeURIComponent(mobileCustomization));
  const isMobileConfigEnabled = isMobile && (mobileConfigSettings?.showCustomization ?? false);
  const [bottomSpacing, setBottomSpacing] = useState(50);
  const [newMarginTop, setNewMarginTop] = useState(marginTop);
  const [wrapCount, setWrapCount] = useState(0);
  const [newMarginBottom, setNewMarginBottom] = useState(marginBottom);

  const [filter, setFilter] = useState([]);

  const chartLegends = options.data.map((d) => ({
    id: d.id,
    label: d.id,
    color: colorGenerator.getColor(d.id, d),
  }));

  const legendItems = () => {
    if (reverseLegend) {
      chartLegends.reverse();
    }
    return (
      <>
        {showLegends &&
          chartLegends.map((legend) => {
            return (
              <div className={"legend item"} onClick={() => toggle(legend.id)}>
                <input
                  className={"ignore"}
                  type="checkbox"
                  checked={filter.length === 0 || !filter.includes(legend.id)}
                  style={{
                    backgroundColor:
                      legendCheckBack === true ? legend.color : "none",
                    color: legendLabelColor,
                  }}
                />
                <span
                  className={
                    legendCheckBack === true ? "checkmark-with-bg" : "checkmark"
                  }
                  style={{
                    backgroundColor:
                      legendCheckBack === true ? legend.color : "transparent",
                  }}
                ></span>
                <label
                  style={{
                    backgroundColor:
                      legendLabelBack === true ? legend.color : "transparent",
                    color: legendLabelColor,
                  }}
                >
                  {legend.label}
                </label>
              </div>
            );
          })}
      </>
    );
  };

  useEffect(() => {
    const adjustBottomForLegends = () => {
      const extraItems = Math.max(chartLegends.length - 5, 0);
      const adjustment = 5 * extraItems;
      setBottomSpacing(adjustment);
    };

    adjustBottomForLegends();
  }, [chartLegends]);

  const rightLegendDynamicStyle = {
    bottom: `-${bottomSpacing}px`,
  };

  const leftLegendDynamicStyle = {
    bottom: `-${bottomSpacing}px`,
    gap: "0px",
    top: "0px",
  };

  const applyFilter = (values) => {
    if (filter.length) {
      return values.filter((v) => filter.indexOf(v.id) === -1);
    }
    return values;
  };
  const toggle = (id) => {
    const newFilter = filter.slice();
    if (newFilter.indexOf(id) > -1) {
      const index = newFilter.indexOf(id);
      newFilter.splice(index, 1);
    } else {
      newFilter.push(id);
    }
    setFilter(newFilter);
  };

  const CustomTick = (tick) => {
    const tickObject = Object.assign({}, tick);
    if(isMobileConfigEnabled && hiddenLabels.includes(String(tickObject.value))) {
      tickObject.value = "";
    }
    const theme = useTheme();
    const width = getTextWidth(tickObject.value, "12px Roboto") + 15;

    if (tickRotation > 0 && tickRotation < 180) {
      return (
        <g transform={`translate(${tick.x},${tick.y + 30})`}>
          {showTickLine && (
            <line
              stroke={overrideTickColor ? tickColor : DEFAULT_TICK_BG_COLOR}
              strokeWidth={1.5}
              y1={-32}
              y2={-12}
            />
          )}

          <g transform={`translate(0, ${tick.y + offsetText})`}>
            {/* <rect
              transform={`rotate(${tickRotation})`}
              x={-12}
              y={-12}
              rx={2}
              ry={2}
              width={width + 12}
              height={22}
              fill={overrideTickColor ? tickColor : DEFAULT_TICK_BG_COLOR}
            /> */}

            <text
              transform={`rotate(${tickRotation})`}
              textAnchor="start"
              dominantBaseline="middle"
              style={{
                ...theme.axis.ticks.text,
                fill: xLabelColor,
                fontSize: "12px",
              }}

            >
              {tickObject.value}
            </text>
          </g>
        </g>
      );
    } else if (tickRotation > 180 && tickRotation < 360) {
      return (
        <g transform={`translate(${tick.x},${tick.y + 30})`}>
          {showTickLine && (
            <line
              stroke={overrideTickColor ? tickColor : DEFAULT_TICK_BG_COLOR}
              strokeWidth={1.5}
              y1={-32}
              y2={-12}
            />
          )}

          <g transform={`translate(0, ${tick.y + offsetText})`}>
            {/* <rect
              transform={`rotate(${tickRotation - 180})`}
              x={-12}
              y={-10}
              rx={2}
              ry={2}
              width={width + 12}
              height={22}
              fill={overrideTickColor ? tickColor : DEFAULT_TICK_BG_COLOR}
            /> */}

            <text
              transform={`rotate(${tickRotation})`}
              textAnchor="end"
              dominantBaseline="middle"
              style={{
                ...theme.axis.ticks.text,
                fill: xLabelColor,
                fontSize: "12px",
              }}
            >
              {tickObject.value}
            </text>
          </g>
        </g>
      );
    } else {
      return (
        <g transform={`translate(${tick.x},${tick.y + 30})`}>
          {showTickLine && (
            <line
              stroke={overrideTickColor ? tickColor : DEFAULT_TICK_BG_COLOR}
              strokeWidth={1.5}
              y1={-32}
              y2={-12}
            />
          )}

          <g transform={`translate(0, ${tick.y + offsetText})`}>
            {/* <rect
              transform={`rotate(${tickRotation})`}
              x={(-1 * width) / 2}
              y={-12}
              rx={2}
              ry={2}
              width={width}
              height={22}
              fill={overrideTickColor ? tickColor : DEFAULT_TICK_BG_COLOR}
            /> */}

            <text
              transform={`rotate(${tickRotation})`}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                ...theme.axis.ticks.text,
                fill: xLabelColor,
                fontSize: "12px",
              }}
              // dx={5}
              // dy={15}
            >
              {tickObject.value}
            </text>
          </g>
        </g>
      );
    }
  };

  const AreaLayer = ({ series, xScale, yScale, innerHeight }) => {
    const color = series && series.length > 0 ? series[0].color : "#3daff7";
    const measureMinValues = [];
    if (series[0]) {
      series[0].data.forEach((d) => {
        if (app == "csv") {
          options.keys.forEach((m) => {
            measureMinValues.push({ measure: m, min: d.data.variables[m] });
          });
        } else {
          selectedMeasures.forEach((m) => {
            measureMinValues.push({ measure: m, min: d.data.variables[m] });
          });
        }
      });
    }

    const sortedData = measureMinValues.sort((a, b) => {
      return a.min - b.min;
    });

    const lower =
      areaShadingCriteria == "CUSTOM_BETWEEN_TWO_LINES" && areaLowerBound
        ? areaLowerBound
        : sortedData[0].measure;
    const upper =
      areaShadingCriteria == "CUSTOM_BETWEEN_TWO_LINES" && areaUpperBound
        ? areaUpperBound
        : sortedData[sortedData.length - 1].measure;

    const areaGenerator = area()
      .x((d) => xScale(d.data.x))
      .y0((d) => yScale(d.data.variables[lower]))
      .y1((d) => yScale(d.data.variables[upper]));

    return (
      <>
        {series && series[0] && (
          <path
            d={areaGenerator(series[0].data)}
            fill={color}
            fillOpacity={0.4}
          />
        )}
      </>
    );
  };

  const drawLine = ({ series, xScale, yScale, innerHeight, innerWidth }) => {
    const points = [0, innerWidth];
    const lineGenerator = line()
      .x((xPoint, index) => {
        if (index === 0) {
          return -10;
        } else {
          return xPoint;
        }
      })
      .y((xPoint) => yScale(0));

    return (
      <Fragment>
        <path
          d={lineGenerator(points)}
          fill="none"
          stroke={ZERO_LINE_COLOR}
          style={{ pointerEvents: "none", strokeDasharray: "4 4" }}
        />
      </Fragment>
    );
  };

  const layers = ["grid", "axes", "lines", "legends"];
  if (enableArea) {
    layers.push(AreaLayer);
  }
  if (showPoints) {
    layers.push("points");
    layers.push("mesh");
  }
  if (highlightXAxisLine) {
    layers.push(drawLine);
  }

  let values = [];
  options.data.forEach((item) => {
    if (item.data) {
      values = [...values, ...item.data.map((it) => it.y)];
    }
  });

  const getMinMaxFromData = () => {
    if (groupMode === "stacked") {
      const flattenedData = [];
      options.data.forEach((d) => {
        flattenedData.push(...d.data);
      });

      const xValues = [];
      flattenedData.forEach((dd) => {
        if (xValues.indexOf(dd.x) == -1) {
          xValues.push(dd.x);
        }
      });

      max = Math.max(
        ...xValues.map((x) => {
          return flattenedData
            .filter((f) => f.x == x)
            .map((ff) => ff.y)
            .reduce((a, b) => {
              return Math.max(a + b, a + 0);
            });
        })
      );

      min = Math.min(
        ...xValues.map((x) => {
          return flattenedData
            .filter((f) => f.x == x)
            .map((ff) => ff.y)
            .reduce((a, b) => {
              return Math.min(a - b, b - a);
            });
        })
      );
    } else {
      if (values.length > 0) {
        max = Math.max(...values);
        min = Math.min(...values);
      }
    }

    //reduce/increase the min and max value of the axis by 10% to avoid the line going out of the chart
    max = max < 0 ? max * 0.9 : max * 1.1;
    min = min > 0 ? min * 0.9 : min * 1.1;
    return { min, max };
  };

  let min = "auto";
  let max = "auto";
  const minMax = getMinMaxFromData();
  if (maxValue == "fixed") {
    min =
      fixedMinValue != null && fixedMinValue != "" ? fixedMinValue : minMax.min;
    max =
      fixedMaxValue != null && fixedMaxValue != "" ? fixedMaxValue : minMax.max;
  } else {
    min = minMax.min;
    max = minMax.max;
  }

  const legendTitle = () => {
    return (
      <>
        {showLegends && legendLabel && (
          <div className={"legend item"}>
            <label className="legend-title">{legendLabel}</label>
          </div>
        )}
      </>
    );
  };

  const margins = {
    top: newMarginTop,
    right: marginRight,
    bottom: newMarginBottom,
    left: marginLeft,
  };

  let ticks = parseInt(yAxisTickValues);

  const hasData =
    options.data && options.data?.filter((d) => d?.data?.length > 0)?.length;

  const hiddenLabels = [];
  if(isMobileConfigEnabled) {
      ticks = parseInt(mobileConfigSettings.yAxisTickValues);
      const labels = new Map(Object.entries(mobileConfigSettings?.labels?.xAxis ?? {}));
      for (const [key, value] of labels) {
        if (!value) {
          hiddenLabels.push(key);
        }
      }
  }

  if (options && options.data && hasData > 0) {
    return (
      <div style={{ height: height }}>
        <ResponsiveLine
          key={new Date()}
          data={applyFilter(options.data)}
          margin={margins}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: min,
            max: max,
            stacked: groupMode == "stacked",
            reverse: false,
            clamp: minMaxClamp,
          }}
          layers={layers}
          axisTop={null}
          axisRight={
            showRightAxis
              ? {
                  tickSize: 5,
                  tickValues: ticks,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: legends.right,
                  legendPosition: "middle",
                  legendOffset: parseInt(offsetRight),
                  format: (value) => {
                    const effectiveFormat = customAxisFormat
                      ? customAxisFormat
                      : format;
                    return intl.formatNumber(
                      effectiveFormat.style === "percent" ? value / 100 : value,
                      {
                        ...effectiveFormat,
                      }
                    );
                  },
                }
              : null
          }
          enableGridY={enableGridY}
          enableGridX={enableGridX}
          lineWidth={3}
          colors={(d) => {
            return colorGenerator.getColor(d.id, d);
          }}
          axisBottom={
            isMobileConfigEnabled && mobileConfigSettings?.xAxisDisabled === true ? null :{
            renderTick: CustomTick,
            legend: legends.bottom,
            legendPosition: "middle",
            legendOffset: parseInt(offsetBottom),
          }}
          axisLeft={{
            tickSize: 5,
            tickValues: ticks,
            tickPadding: 5,
            tickRotation: 0,
            legend: legends.left,
            legendPosition: "middle",
            legendOffset: parseInt(offsetY),
            format: (value) => {
              const effectiveFormat = customAxisFormat
                ? customAxisFormat
                : format;
              return intl.formatNumber(
                effectiveFormat.style === "percent" ? value / 100 : value,
                {
                  ...effectiveFormat,
                }
              );
            },
          }}
          tooltip={(d) => {
            if (tooltipEnabled && tooltip && tooltip.trim().length > 0) {
              return (
                <Tooltip
                  intl={intl}
                  format={format}
                  d={d}
                  tooltip={tooltip}
                  tooltipEnableMarkdown={tooltipEnableMarkdown}
                />
              );
            }

            return null;
          }}
          pointSize={10}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
        />

        {(legendPosition === "top" || legendPosition === "bottom") && (
          <div
            className={`legends container has-standard-12-font-size ${legendPosition}`}
          >
            <div className="legend-sections">
              <div className="title-section">{legendTitle()}</div>
              <FlexWrapDetector
                onWrapChange={(count) => {
                  if (legendPosition === "top") {
                    setNewMarginTop(marginTop + (count / 2) * 40);
                    setWrapCount(count);
                  } else {
                    setNewMarginBottom(marginBottom + (count / 2) * 25);
                    setWrapCount(count);
                  }
                }}
                className={`legends container has-standard-12-font-size items-section`}
              >
                {legendItems()}
              </FlexWrapDetector>
            </div>
          </div>
        )}
        {(legendPosition === "right" || legendPosition === "left") && (
          <div
            className={`legends container has-standard-12-font-size  ${legendPosition}`}
            style={
              legendPosition === "right"
                ? rightLegendDynamicStyle
                : leftLegendDynamicStyle
            }
          >
            {legendTitle()}
            {legendItems()}
          </div>
        )}
      </div>
    );
  }

  return <div></div>;
};

export default injectIntl(Chart);
