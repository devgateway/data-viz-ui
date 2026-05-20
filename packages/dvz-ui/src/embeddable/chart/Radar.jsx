import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { ResponsiveRadar } from "@nivo/radar";
import Legends from "./Legends.jsx";
import Tooltip from "./Tooltip.jsx";
import deviceType from "@/utils/deviceType.js";
import _ from "lodash";

const DEFAULT_COLOR = "none";

const Chart = ({
  editing,
  legends,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  options,
  intl,
  format,
  height,
  showLegends,
  legendPosition,
  legendLabel,
  legendCheckBack,
  legendLabelBack,
  legendLabelColor,
  colorGenerator,
  reverseLegend,
  radarCurve,
  radarFillOpacity,
  radarBorderWidth,
  radarGridLevels,
  radarGridShape,
  radarGridLabelOffset = 10,
  radarEnableDots,
  radarDotSize,
  radarEnableDotLabel,
  radarDotLabelOffset,
  tooltipEnabled,
  tooltip,
  tooltipEnableMarkdown,
  mobileCustomization,
  previewMode,
}) => {
  const [filter, setFilter] = useState([]);

  const isMobileDevice = deviceType() === "mobile";
  const isTabletDevice = ["tablet", "midTablet"].includes(deviceType());
  const isMobileOrTablet = isMobileDevice || isTabletDevice;

  const mobileConfigSettings = React.useMemo(
    () => JSON.parse(decodeURIComponent(mobileCustomization)),
    [mobileCustomization]
  );
  const isMobileCustomizationEnabled =
    isMobileOrTablet && (mobileConfigSettings?.showCustomization ?? false);
  const isNotDesktopPreview =
    isMobileCustomizationEnabled && previewMode !== "Desktop";
  const isNotEditingAndIsMobileCustomizationEnabled =
    !editing && isMobileCustomizationEnabled;
  if (!options || !options.data) return null;

  const applyFilter = (keys) => keys.filter((k) => !filter.includes(k));
  const toggle = (id) =>
    setFilter((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  // determines max chars per line
  function getMaxLineLength({
    tickValue,
    editing,
    previewMode,
    isMobileDevice,
    isTabletDevice,
    mobileConfigSettings,
    isNotDesktopPreview,
    isNotEditingAndIsMobileCustomizationEnabled,
  }) {
    let maxLineLength = 25;
    if (isNotDesktopPreview || isNotEditingAndIsMobileCustomizationEnabled) {
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
        !editing &&
        window.matchMedia("(min-width: 768px) and (max-width: 1250px)").matches
      ) {
        maxLineLength = 15;
      }
    }
    return maxLineLength;
  }

  // word-wrap helper
  const wrapText = (text, maxLen) => {
    const words = String(text).split(" ");
    const lines = [];
    let line = "";
    words.forEach((w) => {
      if (`${line} ${w}`.trim().length <= maxLen) {
        line = (line ? `${line} ` : "") + w;
      } else {
        lines.push(line);
        line = w;
      }
    });
    if (line) lines.push(line);
    return lines;
  };

  // ─── radial‐value tick layer ────────────────────────────────────────────
  const customLayer = ({ centerX, centerY, radiusScale }) => {
    const ticks = radiusScale.ticks(resolvedGridLevels).filter((t) => t > 0);
    const lineH = isMobileDevice
      ? mobileConfigSettings.mobileYAxisLineHeight ?? 12
      : isTabletDevice
      ? mobileConfigSettings.tabletYAxisLineHeight ?? 12
      : 12;

    return (
      <g>
        {ticks.map((tick, i) => {
          const r = radiusScale(tick);
          const x = centerX + r * Math.sin(0) + 7;
          const y = centerY - r * Math.cos(0);

          const label = intl.formatNumber(
            format.style === "percent" ? tick / 100 : tick,
            format
          );

          // compute max length dynamically
          const maxLen = getMaxLineLength({
            tickValue: tick,
            editing,
            previewMode,
            isMobileDevice,
            isTabletDevice,
            mobileConfigSettings,
            isNotDesktopPreview,
            isNotEditingAndIsMobileCustomizationEnabled,
          });
          const lines = wrapText(label, maxLen);

          return (
            <g key={i}>
              <line
                x1={x - 7}
                y1={y - 4}
                x2={x - 3}
                y2={y - 4}
                stroke="rgb(51,51,51)"
                strokeWidth={1}
              />
              {lines.map((ln, j) => (
                <text
                  key={j}
                  x={x}
                  y={y + j * lineH}
                  fontFamily="sans-serif"
                  fontSize="11px"
                  fill="rgb(51,51,51)"
                >
                  {ln}
                </text>
              ))}
            </g>
          );
        })}
      </g>
    );
  };

  // ─── override built-in "layers" labels via gridLabel ─────────────────
  const customGridLabel = ({ id, x, y }) => {
    // compute max length dynamically
    const maxLen = getMaxLineLength({
      tickValue: id,
      editing,
      previewMode,
      isMobileDevice,
      isTabletDevice,
      mobileConfigSettings,
      isNotDesktopPreview,
      isNotEditingAndIsMobileCustomizationEnabled,
    });
    const lines = wrapText(id, maxLen);

    const lineH = isMobileDevice
      ? mobileConfigSettings.mobileXAxisLineHeight ?? 12
      : isTabletDevice
      ? mobileConfigSettings.tabletXAxisLineHeight ?? 12
      : 12;

    const anchor = x > 5 ? "start" : x < -5 ? "end" : "middle";
    return (
      <g transform={`translate(${x}, ${y})`}>
        <text
          textAnchor={anchor}
          alignmentBaseline="middle"
          style={{
            fontFamily: "sans-serif",
            fontSize: "11px",
            fill: "#333",
            pointerEvents: "none",
          }}
        >
          {lines.map((ln, j) => (
            <tspan key={j} x={0} dy={j === 0 ? 0 : `${lineH}px`}>
              {ln}
            </tspan>
          ))}
        </text>
      </g>
    );
  };

  const deviceTypeMarginValueMap = () => {
    const isConcreteMobile =
      (!editing && isMobileDevice && isMobileCustomizationEnabled) ||
      (editing && previewMode === "Mobile" && isMobileCustomizationEnabled);
    const isConcreteTablet =
      (!editing && isTabletDevice && isMobileCustomizationEnabled) ||
      (editing && previewMode === "Tablet" && isMobileCustomizationEnabled);
    const deviceMap = {
      mobile: {
        marginLeft: mobileConfigSettings?.mobileMarginLeft,
        marginTop: mobileConfigSettings?.mobileMarginTop,
        marginRight: mobileConfigSettings?.mobileMarginRight,
        marginBottom: mobileConfigSettings?.mobileMarginBottom,
      },
      tablet: {
        marginLeft: mobileConfigSettings?.tabletMarginLeft,
        marginTop: mobileConfigSettings?.tabletMarginTop,
        marginRight: mobileConfigSettings?.tabletMarginRight,
        marginBottom: mobileConfigSettings?.tabletMarginBottom,
      },
    };
    if (isConcreteMobile) {
      return deviceMap.mobile;
    }
    if (isConcreteTablet) {
      return deviceMap.tablet;
    }
    return { marginLeft, marginTop, marginRight, marginBottom };
  };

  const radarMarginVals = deviceTypeMarginValueMap();

  const margins = {
    top: radarMarginVals.marginTop,
    right: radarMarginVals.marginRight,
    bottom: radarMarginVals.marginBottom,
    left: radarMarginVals.marginLeft,
  };

  const chartLegends = options.keys.map((k) => ({
    id: k,
    label: k,
    color: filter.includes(k) ? DEFAULT_COLOR : colorGenerator.getColorByKey(k),
    enabled: !filter.includes(k),
  }));

  const resolvedGridLevels = Number.parseInt(radarGridLevels, 10) || 3;
  const resolvedGridLabelOffset = Number.parseInt(radarGridLabelOffset, 10) || 0;
  const resolvedDotSize = Number.parseInt(radarDotSize, 10) || 0;
  const resolvedDotLabelOffset = Number.parseInt(radarDotLabelOffset, 10) || 0;
  const resolvedFillOpacity = Number.parseFloat(radarFillOpacity) || 0;
  const resolvedBorderWidth = Number.parseFloat(radarBorderWidth) || 0;
  const buildRadarTooltipDatum = React.useCallback(
    ({ index, data }) => {
      const sourceDatum = options.data.find(
        (item) => `${item?.[options.indexBy]}` === `${index}`
      );
      const radarValues = Array.isArray(data)
        ? data.reduce((acc, item) => {
            acc[item.id] = item.value;
            acc[`_${item.id}`] = item.value;
            acc[`${item.id}Formatted`] = item.formattedValue;
            return acc;
          }, {})
        : {};

      return {
        id: index,
        value: Array.isArray(data) && data.length === 1 ? data[0]?.value : undefined,
        data: {
          ...sourceDatum,
          variables: {
            ...(sourceDatum?.variables || {}),
            ...radarValues,
            category: index,
            field: index,
            value:
              Array.isArray(data) && data.length === 1 ? data[0]?.value : undefined,
          },
        },
      };
    },
    [options.data, options.indexBy]
  );

  return (
    <div style={{ height }} className="radar">
      <ResponsiveRadar
        data={options.data}
        keys={applyFilter(options.keys)}
        indexBy={options.indexBy}
        margin={margins}
        curve={radarCurve}
        maxValue="auto"
        valueFormat={(v) =>
          intl.formatNumber(format.style === "percent" ? v / 100 : v, format)
        }
        colors={(datum) => colorGenerator.getColorByKey(datum.key)}
        borderColor={{ from: "color" }}
        gridLevels={resolvedGridLevels}
        gridShape={radarGridShape}
        gridLabelOffset={resolvedGridLabelOffset}
        gridLabel={customGridLabel}
        enableDots={radarEnableDots}
        dotSize={resolvedDotSize}
        dotBorderWidth={2}
        enableDotLabel={radarEnableDotLabel}
        dotLabelYOffset={resolvedDotLabelOffset}
        dotLabel={(d) =>
          intl.formatNumber(
            format.style === "percent" ? d.value / 100 : d.value,
            format
          )
        }
        sliceTooltip={(datum) => {
          if (tooltipEnabled && tooltip && tooltip.trim().length > 0) {
            return (
              <Tooltip
                intl={intl}
                format={format}
                d={buildRadarTooltipDatum(datum)}
                tooltip={tooltip}
                tooltipEnableMarkdown={tooltipEnableMarkdown}
              />
            );
          }

          return null;
        }}
        fillOpacity={resolvedFillOpacity}
        borderWidth={resolvedBorderWidth}
        blendMode="multiply"
        motionConfig="wobbly"
        theme={{
          tooltip: {
            basic: { background: "#EEE", whiteSpace: "pre", display: "flex" },
            tableCell: { padding: "3px 5px" },
          },
        }}
        layers={[
          "grid",
          customLayer,
          "markers",
          "areas",
          "lines",
          "layers",
          "slices",
          "dots",
          "axes",
          "legends",
          "mesh",
          "annotations",
        ]}
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

export default injectIntl(Chart);
