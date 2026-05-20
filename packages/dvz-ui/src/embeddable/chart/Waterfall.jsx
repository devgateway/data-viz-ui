import React, { useRef, useState } from "react";
import { injectIntl } from "react-intl";
import * as d3 from "d3";
import Tooltip from "./Tooltip.jsx";

const DEFAULT_WATERFALL_TOOLTIP =
  "<strong>{label}</strong><br/>Start: #(start)<br/>Change: #(value)<br/>End: #(end)";
const VIEWBOX_WIDTH = 1000;
const COLORS = {
  increase: "#2e7d32",
  decrease: "#c62828",
  total: "#1565c0",
};

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

const WaterfallChart = ({
  height,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  options,
  legends,
  format,
  customAxisFormat,
  tickRotation,
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

  const chartHeight = Math.max(toNumber(height, 500), 260);
  const margin = {
    top: toNumber(marginTop, 30),
    right: toNumber(marginRight, 24),
    bottom: Math.max(toNumber(marginBottom, 90), 90),
    left: Math.max(toNumber(marginLeft, 70), 70),
  };
  const innerWidth = VIEWBOX_WIDTH - margin.left - margin.right;
  const innerHeight = chartHeight - margin.top - margin.bottom;
  const axisFormat = customAxisFormat || format;
  const domain = createPaddedDomain(rows.flatMap((row) => [0, row.start, row.end]));
  const xScale = d3.scaleBand().domain(rows.map((row) => row.id)).range([margin.left, margin.left + innerWidth]).padding(0.28);
  const yScale = d3.scaleLinear().domain(domain).range([margin.top + innerHeight, margin.top]);
  const ticks = yScale.ticks(6);
  const hasCustomTooltipTemplate = typeof tooltip === "string" && tooltip.trim().length > 0 && tooltip.trim() !== "{value}";

  const normalizeTooltipDatum = (row) => ({
    id: row.id,
    label: row.label,
    value: row.value,
    color: COLORS[row.kind] || COLORS.increase,
    data: {
      ...(row.variables || {}),
      label: row.label,
      value: row.value,
      start: row.start,
      end: row.end,
      changeType: row.kind,
      stepType: row.kind,
      measureLabel: options?.measureLabels?.value || row.variables?.measureLabel || "Value",
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
      <svg width="100%" height="100%" viewBox={`0 0 ${VIEWBOX_WIDTH} ${chartHeight}`} preserveAspectRatio="xMidYMid meet">
        {ticks.map((tick) => (
          <g key={`tick-${tick}`}>
            <line
              x1={margin.left}
              x2={margin.left + innerWidth}
              y1={yScale(tick)}
              y2={yScale(tick)}
              stroke={tick === 0 ? "#999" : "#ececec"}
              strokeWidth={tick === 0 ? 1.5 : 1}
            />
            <text x={margin.left - 10} y={yScale(tick)} textAnchor="end" dominantBaseline="middle" fontSize="11px" fill="#444">
              {intl.formatNumber(axisFormat?.style === "percent" ? tick / 100 : tick, axisFormat)}
            </text>
          </g>
        ))}

        {rows.map((row, index) => {
          const x = xScale(row.id);
          if (x == null) {
            return null;
          }

          const barWidth = xScale.bandwidth();
          const yStart = yScale(row.start);
          const yEnd = yScale(row.end);
          const y = Math.min(yStart, yEnd);
          const barHeight = Math.max(Math.abs(yEnd - yStart), 2);
          const color = COLORS[row.kind] || COLORS.increase;

          const nextRow = rows[index + 1];
          const connectorY = yScale(row.end);
          const connectorX1 = x + barWidth;
          const connectorX2 = nextRow ? xScale(nextRow.id) : null;

          return (
            <g key={row.id}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                opacity={0.9}
                rx={3}
                onMouseEnter={(event) => showTooltip(event, row)}
                onMouseMove={(event) => showTooltip(event, row)}
                onMouseLeave={() => setHoveredDatum(null)}
              />
              <text
                x={x + barWidth / 2}
                y={y - 6}
                textAnchor="middle"
                fontSize="11px"
                fill="#333"
              >
                {intl.formatNumber(axisFormat?.style === "percent" ? row.end / 100 : row.end, axisFormat)}
              </text>
              {connectorX2 != null ? (
                <line
                  x1={connectorX1}
                  x2={connectorX2}
                  y1={connectorY}
                  y2={connectorY}
                  stroke="#888"
                  strokeDasharray="4 3"
                />
              ) : null}
              <text
                x={x + barWidth / 2}
                y={chartHeight - margin.bottom + 12}
                textAnchor="end"
                transform={`rotate(${tickRotation || 0}, ${x + barWidth / 2}, ${chartHeight - margin.bottom + 12})`}
                fontSize="11px"
                fill="#333"
              >
                {row.label}
              </text>
            </g>
          );
        })}

        {legends.left ? (
          <text transform={`translate(18 ${margin.top + innerHeight / 2}) rotate(-90)`} textAnchor="middle" fontSize="12px" fill="#333">
            {legends.left}
          </text>
        ) : null}
      </svg>

      <div className="legends container has-standard-12-font-size bottom">
        <div className="legend-sections">
          <div className="legends container has-standard-12-font-size items-section">
            {Object.entries(COLORS).map(([key, color]) => (
              <div key={key} className="legend item">
                <span className="checkmark-with-bg" style={{ backgroundColor: color }}></span>
                <label style={{ color: "#333" }}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
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
            top: Math.min(hoveredDatum.top, chartHeight - 80),
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <Tooltip
            intl={intl}
            format={format}
            d={hoveredDatum.datum}
            tooltip={hasCustomTooltipTemplate ? tooltip : DEFAULT_WATERFALL_TOOLTIP}
            tooltipEnableMarkdown={tooltipEnableMarkdown}
          />
        </div>
      ) : null}
    </div>
  );
};

export default injectIntl(WaterfallChart);

