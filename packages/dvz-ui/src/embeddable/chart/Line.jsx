import React, { Fragment, useEffect, useRef, useState } from "react";
import { injectIntl } from "react-intl";
import { ResponsiveLine } from "@nivo/line";
import Tooltip from "./Tooltip";
import { area, line } from "d3-shape";
import { useTheme } from "@nivo/theming";
import FlexWrapDetector from "@/layout/FlexWrapDetector";
import deviceType from '@/utils/deviceType'

const ZERO_LINE_COLOR = "#66676d";
const DEFAULT_TICK_BG_COLOR = "#f0f0f1";

const isMobileOrTablet = ['mobile', 'tablet', 'midTablet'].includes(deviceType());
const isMobileDevice = deviceType() === 'mobile';
const isTabletDevice = ['tablet', 'midTablet'].includes(deviceType());


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
  editing,
  previewMode,
  app,
  legends,
  tooltip,
  tooltipEnabled,
  options,
  intl,
  groupMode,
  reverse,
  marginLeft,
  lineLabelPosition,
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
  mobileCustomization,
  lineCurve,
  customLabels
}) => {
  const mobileConfigSettings = JSON.parse(decodeURIComponent(mobileCustomization));
  const isMobileConfigEnabled = isMobileOrTablet && (mobileConfigSettings?.showCustomization ?? false);
  const isNotDesktopPreview = isMobileConfigEnabled && (previewMode !== 'Desktop');
  const isNotEditingAndIsMobileCustomizationEnabled = !editing && isMobileConfigEnabled;
  const [bottomSpacing, setBottomSpacing] = useState(50);
  const [newMarginTop, setNewMarginTop] = useState(marginTop);
  const [wrapCount, setWrapCount] = useState(0);
  const [newMarginBottom, setNewMarginBottom] = useState(marginBottom);
  const legendTopRef = useRef(null);
  const stackedMobile = isNotDesktopPreview || isMobileOrTablet;
  const containerHeight =
    typeof height === "number"
      ? height
      : Number.parseInt(height, 10) || 300;

  // Keep internal margins in sync with external props
  useEffect(() => {
    setNewMarginBottom(marginBottom);
  }, [marginBottom]);
  useEffect(() => {
    setNewMarginTop(marginTop);
  }, [marginTop]);

  // Measure top legend height precisely and use it as additional top margin
  useEffect(() => {
    if (legendPosition !== "top" || stackedMobile) return;
    const el = legendTopRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) {
        setNewMarginTop(marginTop + Math.ceil(rect.height));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [legendPosition, marginTop, stackedMobile]);

  // Keep internal margins in sync with external props
  useEffect(() => {
    setNewMarginBottom(marginBottom);
  }, [marginBottom]);
  useEffect(() => {
    setNewMarginTop(marginTop);
  }, [marginTop]);

  const [filter, setFilter] = useState([]);

  const chartLegends = options.data.map((d) => ({
    id: d.id,
    label: customLabels && customLabels[d.id] ? customLabels[d.id] : (d.label || d.id),
    color: colorGenerator.getColor(d.id, d),
  }));


  console.log(lineCurve)

  const legendItems = () => {
    if (reverseLegend) {
      chartLegends.reverse();
    }
    return (
      <>
        {showLegends &&
          chartLegends.map((legend, idx) => {
            return (
              <div key={idx} className={"legend item"} onClick={() => toggle(legend.id)}>
                <input
                  className={"ignore"}
                  type="checkbox"
                  checked={filter.length === 0 || !filter.includes(legend.id)}
                  readOnly
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
    const theme = useTheme();

    if (
      (isNotDesktopPreview || isNotEditingAndIsMobileCustomizationEnabled) &&
      hiddenLabels.includes(String(tickObject.value))
    ) {
      tickObject.value = "";
    }
    let lines = [];
    let currentLine = "";
    if (isNotDesktopPreview || isNotEditingAndIsMobileCustomizationEnabled) {
      const words = String(tickObject.value).split(" ");
      let maxLineLength = 25;
      if (
        (editing && previewMode === "Mobile") ||
        (isMobileDevice && !editing)
      ) {
        maxLineLength = mobileConfigSettings?.mobileMaxTickLength ?? 25;
      } else if (
        (editing && previewMode === "Tablet") ||
        (isTabletDevice && !editing)
      ) {
        maxLineLength = mobileConfigSettings?.tabletMaxTickLength ?? 25;
      } else if (
        window.matchMedia("(min-width: 768px) and (max-width: 1250px)")
          .matches &&
        !editing
      ) {
        maxLineLength = 15;
      }

      words.forEach((word) => {
        if (currentLine.length + String(word).length <= maxLineLength) {
          currentLine += (currentLine ? " " : "") + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) {
        lines.push(currentLine);
      }
    } else {
      lines = [tickObject.value];
    }
    let lineHeight = 12;
    if ((editing && previewMode === "Mobile") || (isMobileDevice && !editing)) {
      lineHeight = mobileConfigSettings?.mobileYAxisLineHeight ?? 12;
    } else if ((editing && previewMode === "Tablet") || (isTabletDevice && !editing)) {
      lineHeight = mobileConfigSettings?.tabletYAxisLineHeight ?? 12;
    }

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
            {lines.map((line, i) => (
              <text
                key={line}
                transform={`rotate(${tickRotation})`}
                textAnchor="start"
                y={typeof tick.value === "number" ? 0 : i * lineHeight}
                dominantBaseline="middle"
                style={{
                  ...theme.axis.ticks.text,
                  fill: xLabelColor === "null" ? "black" : xLabelColor,
                  fontSize: "12px",
                  fontFamily: "Roboto",
                }}
              >
                {line}
              </text>
            ))}
          </g>
        </g>
      );
    }
    if (tickRotation > 180 && tickRotation < 360) {
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
    }
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
          {lines.map((line, i) => (
            <text
              key={line}
              transform={`rotate(${tickRotation})`}
              textAnchor="middle"
              y={typeof tick.value === "number" ? 0 : i * lineHeight}
              dominantBaseline="middle"
              style={{
                ...theme.axis.ticks.text,
                fill: xLabelColor === "null" ? "black" : xLabelColor,
                fontSize: "12px",
                fontFamily: "Roboto",
              }}
            >
              {line}
            </text>
          ))}
        </g>
      </g>
    );
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
  applyFilter(options.data).forEach((item) => {
    if (item.data) {
      values = [...values, ...item.data.map((it) => it.y)];
    }
  });

  const getMinMaxFromData = () => {
    if (groupMode === "stacked") {
      const flattenedData = [];
      const filteredData = applyFilter(options.data)
      filteredData.forEach((d) => {
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

  const baseBottom = stackedMobile ? marginBottom : newMarginBottom;
  const effectiveBottomMargin = showLegends && legendPosition === "bottom" ? Math.max(baseBottom, 150) : baseBottom;

  const margins = stackedMobile
    ? {
        top: marginTop,
        right: marginRight,
        bottom: effectiveBottomMargin,
        left: marginLeft,
      }
    : {
        top: newMarginTop,
        right: marginRight,
        bottom: effectiveBottomMargin,
        left: marginLeft,
      };

  let ticks = parseInt(yAxisTickValues);

  const hasData =
    options.data && options.data?.filter((d) => d?.data?.length > 0)?.length;

  const hiddenLabels = [];
  if(isNotDesktopPreview || isNotEditingAndIsMobileCustomizationEnabled) {
      ticks = Number.parseInt(mobileConfigSettings.yAxisTickValues);
      const labels = new Map(Object.entries(mobileConfigSettings?.labels?.xAxis ?? {}));
      for (const [key, value] of labels) {
        if (!value) {
          hiddenLabels.push(key);
        }
      }
  }

  if (options?.data && hasData > 0) {
    let filteredData = applyFilter(options.data)
    return (
      <div style={{ height: stackedMobile ? "auto" : containerHeight, position: "relative", display: stackedMobile ? "flex" : undefined, flexDirection: stackedMobile ? "column" : undefined }}>
        {stackedMobile && legendPosition === "top" && (
          <div
            className={`legends container has-standard-12-font-size ${legendPosition}`}
          >
            <div className="legend-sections">
              <div className="title-section">{legendTitle()}</div>
              <FlexWrapDetector
                onWrapChange={(count) => {
                  setWrapCount(count);
                }}
                className={`legends container has-standard-12-font-size items-section`}
              >
                {legendItems()}
              </FlexWrapDetector>
            </div>
          </div>
        )}
        <ResponsiveLine
        curve={lineCurve}
          key={new Date()}
          data={filteredData}
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
          enablePointLabel={lineLabelPosition === 'top'}
          pointLabel={(l) => {
            return intl.formatNumber(
              format.style === "percent" ? l.yFormatted / 100 : l.yFormatted,
              format
            )
          }
          }
          lineWidth={3}
          colors={(d) => {
            return colorGenerator.getColor(d.id, d);
          }}
          axisBottom={
            (isNotDesktopPreview || isNotEditingAndIsMobileCustomizationEnabled) && mobileConfigSettings?.xAxisDisabled === true ? null :{
            renderTick: CustomTick,
            legend: legends.bottom,
            legendPosition: "middle",
            legendOffset: Number.parseInt(offsetBottom),
          }}
          axisLeft={{
            tickSize: 5,
            tickValues: ticks,
            tickPadding: 5,
            tickRotation: 0,
            legend: legends.left,
            legendPosition: "middle",
            legendOffset: Number.parseInt(offsetY),
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
          useMesh={filteredData.length > 0 && filteredData[0].data.length > 0}
        />
        {!stackedMobile && (legendPosition === "top" || legendPosition === "bottom") && (
          <div
            ref={legendPosition === "top" ? legendTopRef : undefined}
            className={`legends container has-standard-12-font-size ${legendPosition}`}
            style={
              legendPosition === "bottom"
                ? { position: "absolute", left: margins.left, right: margins.right, bottom: 0 }
                : { position: "absolute", left: margins.left, right: margins.right, top: 0 }
            }
          >
            <div className="legend-sections">
              <div className="title-section">{legendTitle()}</div>
              <FlexWrapDetector
                onWrapChange={(count) => {
                  if (legendPosition === "top") {
                    setWrapCount(count);
                  } else {
                    setNewMarginBottom(marginBottom);
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
        {stackedMobile && legendPosition === "bottom" && (
          <div
            className={`legends container has-standard-12-font-size ${legendPosition}`}
          >
            <div className="legend-sections">
              <div className="title-section">{legendTitle()}</div>
              <FlexWrapDetector
                onWrapChange={(count) => {
                  setWrapCount(count);
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
