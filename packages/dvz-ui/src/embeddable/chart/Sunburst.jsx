import React from "react";
import { injectIntl } from "react-intl";
import { ResponsiveSunburst } from "@nivo/sunburst";
import Tooltip from "./Tooltip.jsx";

const DEFAULT_SUNBURST_TOOLTIP = "<strong>{label}</strong><br/>#(value)";

const formatNumericValue = (intl, format, value) => {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return intl.formatNumber(
    format?.style === "percent" ? value / 100 : value,
    format,
  );
};

const DefaultSunburstTooltip = ({ datum, intl, format }) => (
  <div className="chart tooltip">
    <div>
      <strong>{datum?.data?.label || datum?.id}</strong>
    </div>
    <div>{formatNumericValue(intl, format, datum?.value)}</div>
  </div>
);

const Chart = ({
  height,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  options,
  colors,
  format,
  tooltipEnabled,
  tooltip,
  tooltipEnableMarkdown,
  intl,
}) => {
  if (!options?.data) {
    return null;
  }

  const colorScheme = colors?.scheme && colors.scheme !== "system"
    ? colors.scheme
    : "nivo";
  const hasCustomTooltipTemplate =
    typeof tooltip === "string" &&
    tooltip.trim().length > 0 &&
    tooltip.trim() !== "{value}";

  const normalizeTooltipDatum = (node) => {
    const sunburstNode = node?.node || node?.datum || node;
    const nodeData = sunburstNode?.data || {};
    const label = nodeData?.name || nodeData?.label || sunburstNode?.id || "Value";
    const value = sunburstNode?.value ?? nodeData?.loc ?? nodeData?.value ?? null;
    const path = nodeData?.path || label;
    const baseData = nodeData?.variables || nodeData || {};

    return {
      id: sunburstNode?.id || nodeData?.id || label,
      label,
      value,
      color: sunburstNode?.color,
      data: {
        ...baseData,
        label,
        name: label,
        category: nodeData?.category || label,
        value,
        path,
        depth: sunburstNode?.depth ?? nodeData?.depth ?? 0,
        color: sunburstNode?.color,
      },
    };
  };

  return (
    <div className="chart container" style={{ height }}>
      <ResponsiveSunburst
        data={options.data}
        margin={{
          top: Number.parseInt(marginTop, 10) || 24,
          right: Number.parseInt(marginRight, 10) || 24,
          bottom: Number.parseInt(marginBottom, 10) || 24,
          left: Number.parseInt(marginLeft, 10) || 24,
        }}
        id="id"
        value="loc"
        cornerRadius={2}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.25]] }}
        colors={{ scheme: colorScheme }}
        childColor={{ from: "color", modifiers: [["brighter", 0.08]] }}
        animate={true}
        motionConfig="gentle"
        isInteractive={true}
        tooltip={(node) => {
          if (!tooltipEnabled) {
            return null;
          }

          const normalizedDatum = normalizeTooltipDatum(node);

          if (hasCustomTooltipTemplate) {
            return (
              <Tooltip
                intl={intl}
                format={format}
                d={normalizedDatum}
                tooltip={tooltip}
                tooltipEnableMarkdown={tooltipEnableMarkdown}
              />
            );
          }

          return <DefaultSunburstTooltip datum={normalizedDatum} intl={intl} format={format} />;
        }}
      />
    </div>
  );
};

export default injectIntl(Chart);
