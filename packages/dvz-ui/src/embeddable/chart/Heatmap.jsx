import React from "react";
import { injectIntl } from "react-intl";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { isSequentialColorScheme } from "@nivo/colors";
import Tooltip from "./Tooltip.jsx";

const DEFAULT_HEATMAP_TOOLTIP =
  "<strong>{rowLabel}</strong><br/>{columnLabel}<br/>{measureLabel}: #(value)";

const formatNumericValue = (intl, format, value) => {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return intl.formatNumber(
    format?.style === "percent" ? value / 100 : value,
    format,
  );
};

const DefaultHeatmapTooltip = ({ datum, intl, format }) => (
  <div className="chart tooltip">
    <div>
      <strong>{datum?.data?.rowLabel || datum?.data?.row}</strong>
    </div>
    <div>{datum?.data?.columnLabel || datum?.data?.column}</div>
    <div>
      {(datum?.data?.measureLabel || "Value")}: {formatNumericValue(intl, format, datum?.value)}
    </div>
  </div>
);

const HeatmapChart = ({
  height,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  options,
  colors,
  legends,
  format,
  tooltipEnabled,
  tooltip,
  tooltipEnableMarkdown,
  intl,
}) => {
  if (!options?.data || options.data.length === 0) {
    return null;
  }

  const resolvedScheme = isSequentialColorScheme(colors?.scheme)
    ? colors.scheme
    : "yellow_orange_red";
  const hasCustomTooltipTemplate =
    typeof tooltip === "string" && tooltip.trim().length > 0 && tooltip.trim() !== "{value}";

  const normalizeTooltipDatum = (cell) => {
    const heatmapCell = cell?.cell || cell;
    const cellData = heatmapCell?.data || {};
    const baseData = cellData?.variables || cellData || {};
    const rowLabel =
      baseData?.rowLabel ||
      baseData?.row ||
      heatmapCell?.serieId ||
      heatmapCell?.yKey ||
      "Row";
    const columnLabel =
      baseData?.columnLabel ||
      baseData?.column ||
      heatmapCell?.xKey ||
      cellData?.x ||
      "Column";
    const value = heatmapCell?.value ?? cellData?.y ?? cellData?.value ?? null;

    return {
      id: `${rowLabel}:${columnLabel}`,
      value,
      color: heatmapCell?.color,
      data: {
        ...baseData,
        label: baseData?.label || `${rowLabel} / ${columnLabel}`,
        category: rowLabel,
        row: rowLabel,
        column: columnLabel,
        rowLabel,
        columnLabel,
        value,
        measureLabel: baseData?.measureLabel || options?.measureLabel || "Value",
        color: heatmapCell?.color,
      },
    };
  };

  return (
    <div className="chart container" style={{ height }}>
      <ResponsiveHeatMap
        data={options.data}
        margin={{
          top: Number.parseInt(marginTop, 10) || 24,
          right: Number.parseInt(marginRight, 10) || 24,
          bottom: Number.parseInt(marginBottom, 10) || 56,
          left: Number.parseInt(marginLeft, 10) || 90,
        }}
        valueFormat={(value) => formatNumericValue(intl, format, value)}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          legend: legends.bottom || options?.columnDimension || "",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          legend: legends.left || options?.rowDimension || "",
          legendOffset: -56,
          legendPosition: "middle",
        }}
        colors={{
          type: "sequential",
          scheme: resolvedScheme,
        }}
        emptyColor="#f3f3f3"
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.25]] }}
        enableLabels={false}
        animate={true}
        tooltip={(cell) => {
          if (!tooltipEnabled) {
            return null;
          }

          const normalizedDatum = normalizeTooltipDatum(cell);
          if (hasCustomTooltipTemplate) {
            return (
              <Tooltip
                intl={intl}
                format={format}
                d={normalizedDatum}
                tooltip={tooltip || DEFAULT_HEATMAP_TOOLTIP}
                tooltipEnableMarkdown={tooltipEnableMarkdown}
              />
            );
          }

          return <DefaultHeatmapTooltip datum={normalizedDatum} intl={intl} format={format} />;
        }}
        theme={{
          tooltip: {
            basic: { background: "#EEE", whiteSpace: "pre", display: "flex" },
            tableCell: { padding: "3px 5px" },
          },
        }}
      />
    </div>
  );
};

export default injectIntl(HeatmapChart);

