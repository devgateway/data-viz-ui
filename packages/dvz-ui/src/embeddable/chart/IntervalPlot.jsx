import React, { useMemo, useRef, useState } from "react";
import { injectIntl } from "react-intl";
import * as d3 from "d3";
import Tooltip from "./Tooltip.jsx";

const DEFAULT_INTERVAL_TOOLTIP =
  "<strong>{label}</strong><br/>{lowLabel}: #(low)<br/>{centerLabel}: #(value)<br/>{highLabel}: #(high)";

const DEFAULT_COLOR = "#4c78a8";
const VIEWBOX_WIDTH = 1000;

const toNumber = (value, fallback = null) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
};

const createPaddedDomain = (values = []) => {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  if (finiteValues.length === 0) {
    return [0, 1];
  }

  const min = Math.min(...finiteValues);
  const max = Math.max(...finiteValues);
  if (min === max) {
    const padding = min === 0 ? 1 : Math.abs(min) * 0.1;
    return [min - padding, max + padding];
  }

  const padding = (max - min) * 0.08;
  return [min - padding, max + padding];
};

const IntervalPlotChart = ({
  height,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  options,
  colorGenerator,
  tooltipEnabled,
  tooltip,
  tooltipEnableMarkdown,
  format,
  customAxisFormat,
  xAxisTickValues,
  enableGridX,
  enableGridY,
  legends,
  intl,
}) => {
  const containerRef = useRef(null);
  const [hoveredDatum, setHoveredDatum] = useState(null);

  const rows = options?.data || [];
  const chartHeight = Math.max(toNumber(height, 500), 240);
  const margin = {
    top: toNumber(marginTop, 24),
    right: toNumber(marginRight, 24),
    bottom: toNumber(marginBottom, 56),
    left: toNumber(marginLeft, 160),
  };

  const innerWidth = VIEWBOX_WIDTH - margin.left - margin.right;
  const rowHeight = 32;
  const computedChartHeight = Math.max(chartHeight, margin.top + margin.bottom + rows.length * rowHeight);
  const innerHeight = computedChartHeight - margin.top - margin.bottom;
  const axisFormat = customAxisFormat || format;
  const tickCount = Math.max(2, Math.min(10, toNumber(xAxisTickValues, 6)));
  const hasCustomTooltipTemplate =
    typeof tooltip === "string" && tooltip.trim().length > 0 && tooltip.trim() !== "{value}";

  const getRowColor = (row) => colorGenerator?.getColor?.(row.id, row) || DEFAULT_COLOR;

  const xDomain = useMemo(
    () => createPaddedDomain(rows.flatMap((row) => [row.low, row.high, row.center])),
    [rows],
  );
  const xScale = useMemo(
    () => d3.scaleLinear().domain(xDomain).range([margin.left, margin.left + innerWidth]),
    [xDomain, margin.left, innerWidth],
  );
  const yScale = useMemo(
    () =>
      d3
        .scaleBand()
        .domain(rows.map((row) => row.id))
        .range([margin.top, margin.top + innerHeight])
        .padding(0.35),
    [rows, margin.top, innerHeight],
  );
  const ticks = xScale.ticks(tickCount);

  if (rows.length === 0) {
    return null;
  }

  const normalizeTooltipDatum = (row) => ({
    id: row.id,
    label: row.label,
    value: row.center,
    color: getRowColor(row),
    data: {
      ...(row.variables || {}),
      label: row.label,
      value: row.center,
      center: row.center,
      low: row.low,
      high: row.high,
      centerLabel: options?.measureLabels?.center || row.variables?.centerLabel || "Center",
      lowLabel: options?.measureLabels?.low || row.variables?.lowLabel || "Low",
      highLabel: options?.measureLabels?.high || row.variables?.highLabel || "High",
      color: getRowColor(row),
    },
  });

  const showTooltip = (event, row) => {
    if (!tooltipEnabled || !containerRef.current) {
      return;
    }

    const bounds = containerRef.current.getBoundingClientRect();
    setHoveredDatum({
      datum: normalizeTooltipDatum(row),
      left: event.clientX - bounds.left + 12,
      top: event.clientY - bounds.top + 12,
    });
  };

  return (
    <div ref={containerRef} className="chart container" style={{ height, position: "relative" }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${computedChartHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {enableGridX &&
          ticks.map((tick) => (
            <line
              key={`grid-x-${tick}`}
              x1={xScale(tick)}
              x2={xScale(tick)}
              y1={margin.top}
              y2={margin.top + innerHeight}
              stroke="#e6e6e6"
              strokeWidth={1}
            />
          ))}
        {enableGridY &&
          rows.map((row) => {
            const y = yScale(row.id);
            if (y == null) {
              return null;
            }

            return (
              <line
                key={`grid-y-${row.id}`}
                x1={margin.left}
                x2={margin.left + innerWidth}
                y1={y + yScale.bandwidth() / 2}
                y2={y + yScale.bandwidth() / 2}
                stroke="#f0f0f0"
                strokeWidth={1}
              />
            );
          })}

        {rows.map((row) => {
          const y = yScale(row.id);
          if (y == null) {
            return null;
          }

          const cy = y + yScale.bandwidth() / 2;
          const color = getRowColor(row);
          return (
            <g key={row.id}>
              <rect
                x={margin.left}
                y={y}
                width={innerWidth}
                height={yScale.bandwidth()}
                fill="transparent"
                onMouseEnter={(event) => showTooltip(event, row)}
                onMouseMove={(event) => showTooltip(event, row)}
                onMouseLeave={() => setHoveredDatum(null)}
              />
              <line
                x1={xScale(row.low)}
                x2={xScale(row.high)}
                y1={cy}
                y2={cy}
                stroke={color}
                strokeWidth={3}
                strokeLinecap="round"
              />
              <line
                x1={xScale(row.center)}
                x2={xScale(row.center)}
                y1={cy - 10}
                y2={cy + 10}
                stroke={color}
                strokeWidth={3}
              />
              <circle cx={xScale(row.center)} cy={cy} r={4.5} fill={color} />
              <text
                x={margin.left - 12}
                y={cy}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="12px"
                fill="#333"
              >
                {row.label}
              </text>
            </g>
          );
        })}

        <line
          x1={margin.left}
          x2={margin.left + innerWidth}
          y1={margin.top + innerHeight}
          y2={margin.top + innerHeight}
          stroke="#666"
          strokeWidth={1}
        />
        {ticks.map((tick) => (
          <g key={`tick-${tick}`} transform={`translate(${xScale(tick)}, ${margin.top + innerHeight})`}>
            <line y2={6} stroke="#666" />
            <text y={20} textAnchor="middle" fontSize="11px" fill="#444">
              {intl.formatNumber(axisFormat?.style === "percent" ? tick / 100 : tick, axisFormat)}
            </text>
          </g>
        ))}
        {legends.bottom ? (
          <text
            x={margin.left + innerWidth / 2}
            y={computedChartHeight - 12}
            textAnchor="middle"
            fontSize="12px"
            fill="#333"
          >
            {legends.bottom}
          </text>
        ) : null}
        {legends.left ? (
          <text
            transform={`translate(20 ${margin.top + innerHeight / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize="12px"
            fill="#333"
          >
            {legends.left}
          </text>
        ) : null}
      </svg>

      {hoveredDatum ? (
        <div
          style={{
            position: "absolute",
            left: Math.min(hoveredDatum.left, 760),
            top: Math.min(hoveredDatum.top, computedChartHeight - 80),
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <Tooltip
            intl={intl}
            format={format}
            d={hoveredDatum.datum}
            tooltip={hasCustomTooltipTemplate ? tooltip : DEFAULT_INTERVAL_TOOLTIP}
            tooltipEnableMarkdown={tooltipEnableMarkdown}
          />
        </div>
      ) : null}
    </div>
  );
};

export default injectIntl(IntervalPlotChart);

