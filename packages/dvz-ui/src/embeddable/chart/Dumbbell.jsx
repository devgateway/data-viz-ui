import React, { useMemo, useRef, useState } from "react";
import { injectIntl } from "react-intl";
import * as d3 from "d3";
import Tooltip from "./Tooltip.jsx";

const DEFAULT_DUMBBELL_TOOLTIP =
  "<strong>{label}</strong><br/>{leftLabel}: #(left)<br/>{rightLabel}: #(right)<br/>Δ: #(delta)";
const VIEWBOX_WIDTH = 1000;
const DEFAULT_LEFT_COLOR = "#1f77b4";
const DEFAULT_RIGHT_COLOR = "#d62728";

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

const DumbbellChart = ({
  height,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  options,
  colorGenerator,
  legends,
  format,
  customAxisFormat,
  xAxisTickValues,
  enableGridX,
  enableGridY,
  tooltipEnabled,
  tooltip,
  tooltipEnableMarkdown,
  intl,
}) => {
  const containerRef = useRef(null);
  const [hoveredDatum, setHoveredDatum] = useState(null);
  const rows = options?.data || [];

  if (rows.length === 0) {
    return null;
  }

  const leftKey = options?.measureLabels?.left || options?.keys?.[0] || "Left";
  const rightKey = options?.measureLabels?.right || options?.keys?.[1] || "Right";
  const leftColor = colorGenerator?.getColorByKey?.(leftKey) || DEFAULT_LEFT_COLOR;
  const rightColor = colorGenerator?.getColorByKey?.(rightKey) || DEFAULT_RIGHT_COLOR;
  const chartHeight = Math.max(toNumber(height, 500), 260);
  const margin = {
    top: toNumber(marginTop, 24),
    right: toNumber(marginRight, 40),
    bottom: Math.max(toNumber(marginBottom, 56), 56),
    left: Math.max(toNumber(marginLeft, 180), 180),
  };
  const rowHeight = 34;
  const computedChartHeight = Math.max(chartHeight, margin.top + margin.bottom + rows.length * rowHeight);
  const innerWidth = VIEWBOX_WIDTH - margin.left - margin.right;
  const innerHeight = computedChartHeight - margin.top - margin.bottom;
  const axisFormat = customAxisFormat || format;
  const tickCount = Math.max(2, Math.min(10, toNumber(xAxisTickValues, 6)));
  const xDomain = useMemo(
    () => createPaddedDomain(rows.flatMap((row) => [row.left, row.right])),
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
  const hasCustomTooltipTemplate = typeof tooltip === "string" && tooltip.trim().length > 0 && tooltip.trim() !== "{value}";

  const normalizeTooltipDatum = (row) => ({
    id: row.id,
    label: row.label,
    value: row.right,
    color: rightColor,
    data: {
      ...(row.variables || {}),
      label: row.label,
      value: row.right,
      left: row.left,
      right: row.right,
      delta: row.delta,
      leftLabel: row.variables?.leftLabel || leftKey,
      rightLabel: row.variables?.rightLabel || rightKey,
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
      <svg width="100%" height="100%" viewBox={`0 0 ${VIEWBOX_WIDTH} ${computedChartHeight}`} preserveAspectRatio="xMidYMid meet">
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
          const leftX = xScale(row.left);
          const rightX = xScale(row.right);
          const isIncrease = row.delta >= 0;

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
                x1={leftX}
                x2={rightX}
                y1={cy}
                y2={cy}
                stroke="#8a8a8a"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <circle cx={leftX} cy={cy} r={6} fill={leftColor} />
              <circle cx={rightX} cy={cy} r={6} fill={rightColor} />
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
              <text
                x={Math.max(leftX, rightX) + 10}
                y={cy}
                dominantBaseline="middle"
                fontSize="11px"
                fill={isIncrease ? rightColor : leftColor}
              >
                {intl.formatNumber(
                  axisFormat?.style === "percent" ? row.delta / 100 : row.delta,
                  axisFormat,
                )}
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
          <text x={margin.left + innerWidth / 2} y={computedChartHeight - 12} textAnchor="middle" fontSize="12px" fill="#333">
            {legends.bottom}
          </text>
        ) : null}
        {legends.left ? (
          <text transform={`translate(20 ${margin.top + innerHeight / 2}) rotate(-90)`} textAnchor="middle" fontSize="12px" fill="#333">
            {legends.left}
          </text>
        ) : null}
      </svg>

      <div className="legends container has-standard-12-font-size bottom">
        <div className="legend-sections">
          <div className="legends container has-standard-12-font-size items-section">
            {[
              { id: leftKey, color: leftColor },
              { id: rightKey, color: rightColor },
            ].map((legend) => (
              <div key={legend.id} className="legend item">
                <span className="checkmark-with-bg" style={{ backgroundColor: legend.color }}></span>
                <label style={{ color: "#333" }}>{legend.id}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            tooltip={hasCustomTooltipTemplate ? tooltip : DEFAULT_DUMBBELL_TOOLTIP}
            tooltipEnableMarkdown={tooltipEnableMarkdown}
          />
        </div>
      ) : null}
    </div>
  );
};

export default injectIntl(DumbbellChart);

