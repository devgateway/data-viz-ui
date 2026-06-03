import React, { Fragment, useEffect, useState } from "react";
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

const normalizeSeriesId = (id) => {
  if (id === null || id === undefined) {
    return null;
  }

  return String(id);
};

const applyOpacityToColor = (color, opacity) => {
  if (!color || opacity >= 1) {
    return color;
  }

  if (color.startsWith("#")) {
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }

    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  }

  if (color.startsWith("rgba(")) {
    const parts = color
      .replace("rgba(", "")
      .replace(")", "")
      .split(",")
      .map((p) => p.trim());

    if (parts.length >= 3) {
      return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${opacity})`;
    }
  }

  if (color.startsWith("rgb(")) {
    const parts = color
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map((p) => p.trim());

    if (parts.length >= 3) {
      return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${opacity})`;
    }
  }

  return color;
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
  customLabels,
  lineXAxisTickMode,
  lineXAxisTickCount,
  lineXAxisTickEvery
}) => {
  const mobileConfigSettings = JSON.parse(decodeURIComponent(mobileCustomization));
  const isMobileConfigEnabled = isMobileOrTablet && (mobileConfigSettings?.showCustomization ?? false);
  const isNotDesktopPreview = isMobileConfigEnabled && (previewMode !== 'Desktop');
  const isNotEditingAndIsMobileCustomizationEnabled = !editing && isMobileConfigEnabled;
  const [bottomSpacing, setBottomSpacing] = useState(50);
  const [newMarginTop, setNewMarginTop] = useState(marginTop);
  const [wrapCount, setWrapCount] = useState(0);
  const [newMarginBottom, setNewMarginBottom] = useState(marginBottom);

  const [filter, setFilter] = useState([]);
  const [activeSeriesId, setActiveSeriesId] = useState(null);



  const chartLegends = options.data.map((d) => ({
    id: d.id,
    label: customLabels && customLabels[d.id] ? customLabels[d.id] : (d.label || d.id),
    color: colorGenerator.getColor(d.id, d),
  }));




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
                  fontFamily: "sans-serif",
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
                fontFamily: "sans-serif",
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

  const shouldRenderHoverPointLabels = showPoints;

  const layers = ["grid", "axes", "lines", "legends"];
  if (enableArea) {
    layers.push(AreaLayer);
  }
  if (showPoints) {
    layers.push("points");
    if (shouldRenderHoverPointLabels) {
      layers.push(ActiveSeriesPointLabelsLayer);
    }
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
  if (isNotDesktopPreview || isNotEditingAndIsMobileCustomizationEnabled) {
    ticks = Number.parseInt(mobileConfigSettings.yAxisTickValues);
    const labels = new Map(Object.entries(mobileConfigSettings?.labels?.xAxis ?? {}));
    for (const [key, value] of labels) {
      if (!value) {
        hiddenLabels.push(key);
      }
    }
  }

  const filtered = applyFilter(options.data);
  const baseLayers = ["grid", "axes", "lines", "legends"]
  const emptyLayers = ["grid", "axes", "legends"]

  useEffect(() => {
    if (!activeSeriesId) {
      return;
    }

    const isVisible = filtered.some(
      (seriesItem) => normalizeSeriesId(seriesItem.id) === activeSeriesId
    );

    if (!isVisible) {
      setActiveSeriesId(null);
    }
  }, [activeSeriesId, filtered]);

  const formatLinePointValue = (value) => {
    return intl.formatNumber(
      format.style === "percent" ? value / 100 : value,
      format
    );
  };

  function ActiveSeriesPointLabelsLayer({ series }) {
    if (!activeSeriesId) {
      return null;
    }

    const activeSeries = series.find(
      (seriesItem) => normalizeSeriesId(seriesItem.id) === activeSeriesId
    );

    if (!activeSeries || !Array.isArray(activeSeries.data)) {
      return null;
    }

    return (
      <g>
        {activeSeries.data.map((point, idx) => {
          const pointValue = point?.data?.y;
          if (pointValue === null || pointValue === undefined) {
            return null;
          }

          const label = formatLinePointValue(pointValue);
          const labelWidth = Math.max(32, label.length * 7 + 12);
          const labelHeight = 20;

          return (
            <g
              key={`${activeSeries.id}-${idx}`}
              transform={`translate(${point.x}, ${point.y - 10})`}
            >
              <rect
                x={-labelWidth / 2}
                y={-labelHeight}
                width={labelWidth}
                height={labelHeight}
                rx={10}
                ry={10}
                fill="#111827"
                fillOpacity={0.92}
              />
              <text
                textAnchor="middle"
                y={-labelHeight / 2}
                dominantBaseline="middle"
                fill="#ffffff"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  pointerEvents: "none",
                }}
              >
                {label}
              </text>
            </g>
          );
        })}
      </g>
    );
  }

  if (options?.data && hasData > 0) {
    let filteredData = applyFilter(options.data)
    const xDomain = [];
    filteredData.forEach(series => {
      if (series && Array.isArray(series.data)) {
        series.data.forEach(p => {
          const xv = p && p.x;
          if (xv !== undefined && xDomain.indexOf(xv) === -1) xDomain.push(xv);
        });
      }
    });

    let computedXTicks;
    if (lineXAxisTickMode === 'count') {
      const total = Math.max(1, parseInt(lineXAxisTickCount));
      if (xDomain.length > 0 && total > 0) {
        if (xDomain.length <= total) {
          computedXTicks = xDomain.slice();
        } else {
          const step = (xDomain.length - 1) / (total - 1);
          const idxs = new Array(total);
          for (let i = 0; i < total; i++) {
            idxs[i] = Math.floor(i * step);
          }

          // Ensure last index points to the last domain value
          idxs[total - 1] = xDomain.length - 1;

          // Map to values
          computedXTicks = idxs.map(i => xDomain[i]);
        }
      }
    } else if (lineXAxisTickMode === 'every') {
      const every = Math.max(1, parseInt(lineXAxisTickEvery));
      if (xDomain.length > 0) {
        const vals = [];
        for (let i = 0; i < xDomain.length; i++) {
          if (i % every === 0) {
            vals.push(xDomain[i]);
          }
        }

        if (vals[vals.length - 1] !== xDomain[xDomain.length - 1]) {
          vals.push(xDomain[xDomain.length - 1]);
        }

        computedXTicks = vals;
      }
    }

    return (
      <div style={{ height: height }}>
        <ResponsiveLine
          curve={lineCurve}
          key={new Date()}
          data={filtered}
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
          layers={filtered.length === 0 ? emptyLayers : layers}
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
          enablePointLabel={false}
          pointLabel={(l) => {
            return formatLinePointValue(l.data.yFormatted);
          }
          }
          lineWidth={3}
          colors={(d) => {
            const baseColor = colorGenerator.getColor(d.id, d);
            const seriesId = normalizeSeriesId(d.id);

            if (!activeSeriesId || seriesId === activeSeriesId) {
              return baseColor;
            }

            return applyOpacityToColor(baseColor, 0.2);
          }}
          axisBottom={
            (isNotDesktopPreview || isNotEditingAndIsMobileCustomizationEnabled) && mobileConfigSettings?.xAxisDisabled === true ? null : {
              ...(computedXTicks ? { tickValues: computedXTicks } : {}),
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
          onMouseEnter={(point) => {
            const hoveredSeriesId = normalizeSeriesId(point?.serieId);
            if (hoveredSeriesId) {
              setActiveSeriesId(hoveredSeriesId);
            }
          }}
          onMouseLeave={() => {
            setActiveSeriesId(null);
          }}
          useMesh={filteredData.length > 0 && filteredData[0].data.length > 0}
        />

        {(legendPosition === "top" || legendPosition === "bottom") && (
          <div
            className={`legends container has-standard-12-font-size ${legendPosition}`}
            style={legendPosition === "top" ? { marginTop: isMobileOrTablet && `${newMarginTop}px` } : legendPosition === "bottom" ? { marginBottom: `${newMarginBottom}px` } : {}}
          >
            <div className="legend-sections">
              <div className="title-section">{legendTitle()}</div>
              <FlexWrapDetector
                onWrapChange={(count) => {
                  if (legendPosition === "top") {
                    const newMarginTop = marginTop + (count / 2) * 40;
                    setNewMarginTop(newMarginTop);
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
