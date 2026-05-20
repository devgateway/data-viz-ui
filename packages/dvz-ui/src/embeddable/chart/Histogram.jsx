import React, { useMemo, useState } from "react";
import { injectIntl } from "react-intl";
import { ResponsiveBar } from "@nivo/bar";
import Tooltip from "./Tooltip.jsx";
import Legends from "./Legends.jsx";

const DEFAULT_HISTOGRAM_TOOLTIP =
  "<strong>{series}</strong><br/>{binStart} – {binEnd}<br/>Count: #(value)";

const HistogramChart = ({
  options,
  intl,
  format,
  customAxisFormat,
  colorGenerator,
  height,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  tickRotation,
  xAxisTickValues,
  yAxisTickValues,
  legends,
  tooltipEnabled,
  tooltip,
  tooltipEnableMarkdown,
  showLegends,
  legendPosition,
  legendLabel,
  legendCheckBack,
  legendLabelBack,
  legendLabelColor,
  reverseLegend,
}) => {
  const [filter, setFilter] = useState([]);

  const filteredKeys = useMemo(
    () => (options?.keys || []).filter((key) => !filter.includes(key)),
    [filter, options?.keys],
  );
  const axisFormat = customAxisFormat || format;
  const resolvedXTicks = Number.parseInt(xAxisTickValues, 10);
  const resolvedYTicks = Number.parseInt(yAxisTickValues, 10);
  const hasCustomTooltipTemplate = typeof tooltip === "string" && tooltip.trim().length > 0 && tooltip.trim() !== "{value}";

  const chartLegends = useMemo(
    () =>
      (options?.keys || []).map((key) => ({
        id: key,
        label: key,
        color: colorGenerator?.getColorByKey?.(key) || "#4c78a8",
      })),
    [colorGenerator, options?.keys],
  );

  if (!options?.data || options.data.length === 0 || filteredKeys.length === 0) {
    return null;
  }

  const normalizeTooltipDatum = (datum) => ({
    id: datum.id,
    label: datum.indexValue,
    value: datum.value,
    color: datum.color,
    data: {
      ...(datum.data || {}),
      label: datum.indexValue,
      category: datum.indexValue,
      value: datum.value,
      series: datum.id,
      binStart: datum.data?.binStart,
      binEnd: datum.data?.binEnd,
      measureLabel: options?.measureLabels?.value || "Value",
    },
  });

  const toggle = (id) => {
    setFilter((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id],
    );
  };

  return (
    <div className="histogram" style={{ height }}>
      <ResponsiveBar
        data={options.data}
        keys={filteredKeys}
        indexBy="label"
        margin={{
          top: Number.parseInt(marginTop, 10) || 24,
          right: Number.parseInt(marginRight, 10) || 24,
          bottom: Math.max(Number.parseInt(marginBottom, 10) || 70, 70),
          left: Math.max(Number.parseInt(marginLeft, 10) || 70, 70),
        }}
        padding={0.16}
        groupMode="grouped"
        colors={(datum) => colorGenerator?.getColorByKey?.(datum.id) || "#4c78a8"}
        borderRadius={2}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
        axisBottom={{
          ...(Number.isFinite(resolvedXTicks) ? { tickValues: resolvedXTicks } : {}),
          tickRotation: tickRotation || 0,
          legend: legends.bottom || options?.measureLabels?.value || "",
          legendPosition: "middle",
          legendOffset: 56,
        }}
        axisLeft={{
          ...(Number.isFinite(resolvedYTicks) ? { tickValues: resolvedYTicks } : {}),
          legend: legends.left || "Count",
          legendPosition: "middle",
          legendOffset: -56,
          format: (value) => intl.formatNumber(value, axisFormat),
        }}
        labelSkipWidth={18}
        labelSkipHeight={18}
        enableLabel={false}
        tooltip={(datum) => {
          if (!tooltipEnabled) {
            return null;
          }

          const normalizedDatum = normalizeTooltipDatum(datum);
          return (
            <Tooltip
              intl={intl}
              format={format}
              d={normalizedDatum}
              tooltip={hasCustomTooltipTemplate ? tooltip : DEFAULT_HISTOGRAM_TOOLTIP}
              tooltipEnableMarkdown={tooltipEnableMarkdown}
            />
          );
        }}
        theme={{
          tooltip: {
            basic: { background: "#EEE", whiteSpace: "pre", display: "flex" },
            tableCell: { padding: "3px 5px" },
          },
        }}
      />
      <Legends
        filter={filter}
        showLegends={showLegends}
        chartLegends={chartLegends}
        legendLabel={legendLabel}
        legendPosition={legendPosition}
        legendCheckBack={legendCheckBack}
        legendLabelBack={legendLabelBack}
        legendLabelColor={legendLabelColor}
        onToggle={toggle}
        reverseLegend={reverseLegend}
      />
    </div>
  );
};

export default injectIntl(HistogramChart);

