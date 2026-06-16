import React, { useMemo, useState } from "react";
import { injectIntl } from "react-intl";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import * as d3 from "d3";
import Legends from "./Legends.jsx";
import Tooltip from "./Tooltip.jsx";

const DEFAULT_SERIES_LABEL = "Series";
const DEFAULT_MIN_SIZE = 10;
const DEFAULT_MAX_SIZE = 30;
const REFERENCE_LINE_COLOR = "#9aa0a6";
const CONNECTED_LINE_COLOR_OPACITY = 0.55;
const DEFAULT_SCATTER_TOOLTIP = "<strong>{label}</strong><br/>{xLabel}: #(x)<br/>{yLabel}: #(y)<br/>Series: {seriesDisplay}";

const toNumber = (value, fallback = null) => {
  if (value === "" || value === null || value === undefined) return fallback;
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
};

const createPaddedDomain = (values = []) => {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  if (finiteValues.length === 0) {
    return { min: "auto", max: "auto" };
  }

  const min = Math.min(...finiteValues);
  const max = Math.max(...finiteValues);
  if (min === max) {
    const padding = min === 0 ? 1 : Math.abs(min) * 0.1;
    return { min: min - padding, max: max + padding };
  }

  const padding = Math.max((max - min) * 0.08, 1e-9);
  return { min: min - padding, max: max + padding };
};

const formatNumericValue = (intl, axisFormat, value) => {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return intl.formatNumber(
    axisFormat?.style === "percent" ? value / 100 : value,
    axisFormat,
  );
};

const DefaultScatterTooltip = ({ datum, intl, xAxisFormat, yAxisFormat, sizeFormat, colorFormat }) => {
  const data = datum?.data || {};
  const label = data?.label || datum?.label || datum?.id;
  const showSeries = data?.series && data?.series !== label;
  const showSize = Number.isFinite(data?.size);

  return (
    <div className="chart tooltip">
      <div>
        <strong>{label}</strong>
      </div>
      {showSeries ? <div>Series: {data.series}</div> : null}
      <div>
        {data?.xLabel || "X"}: {formatNumericValue(intl, xAxisFormat, data?.x)}
      </div>
      <div>
        {data?.yLabel || "Y"}: {formatNumericValue(intl, yAxisFormat, data?.y)}
      </div>
      {showSize ? (
        <div>
          {data?.sizeLabel || "Size"}: {formatNumericValue(intl, sizeFormat, data?.size)}
        </div>
      ) : null}
      {Number.isFinite(data?.colorValue) ? (
        <div>
          {data?.colorLabel || "Color"}: {formatNumericValue(intl, colorFormat, data?.colorValue)}
        </div>
      ) : null}
    </div>
  );
};

const ScatterChart = ({
  legends,
  options,
  intl,
  format,
  customAxisFormat,
  measureFormats,
  height,
  showLegends,
  legendPosition,
  legendLabel,
  legendCheckBack,
  legendLabelBack,
  legendLabelColor,
  colorGenerator,
  colorBy,
  reverseLegend,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  tooltipEnabled,
  tooltip,
  tooltipEnableMarkdown,
  valueScale,
  enableGridX,
  enableGridY,
  xAxisTickValues,
  yAxisTickValues,
  scatterMinSize,
  scatterMaxSize,
  scatterShowLabels,
  scatterLabelPosition,
  scatterLabelColor,
  scatterLabelSize,
  scatterConnectPoints,
  scatterPointOpacity,
  scatterReferenceX,
  scatterReferenceY,
  scatterReferenceXLabel,
  scatterReferenceYLabel,
  scatterQuadrantTopLeftLabel,
  scatterQuadrantTopRightLabel,
  scatterQuadrantBottomLeftLabel,
  scatterQuadrantBottomRightLabel,
  scatterXAxisLegendOffset,
  scatterYAxisLegendOffset,
  offsetBottom,
  offsetY,
  tickRotation,
  tickColor,
  xLabelColor,
  overrideTickColor,
  offsetText,
}) => {
  const scatterLabelFontSize = toNumber(scatterLabelSize, 11);
  const scatterLabelPositionMode = scatterLabelPosition || "top-right";
  const resolvedScatterLabelColor =
    typeof scatterLabelColor === "string" && scatterLabelColor.trim().length > 0
      ? scatterLabelColor.trim()
      : "";

  const resolveLabelPlacement = (node) => {
    const offset = 10;

    switch (scatterLabelPositionMode) {
      case "top-left":
        return { x: node.x - offset, y: node.y - offset, textAnchor: "end", dominantBaseline: "alphabetic" };
      case "top":
        return { x: node.x, y: node.y - offset, textAnchor: "middle", dominantBaseline: "alphabetic" };
      case "right":
        return { x: node.x + offset, y: node.y, textAnchor: "start", dominantBaseline: "middle" };
      case "bottom-right":
        return { x: node.x + offset, y: node.y + offset, textAnchor: "start", dominantBaseline: "hanging" };
      case "bottom":
        return { x: node.x, y: node.y + offset, textAnchor: "middle", dominantBaseline: "hanging" };
      case "bottom-left":
        return { x: node.x - offset, y: node.y + offset, textAnchor: "end", dominantBaseline: "hanging" };
      case "left":
        return { x: node.x - offset, y: node.y, textAnchor: "end", dominantBaseline: "middle" };
      case "center":
        return { x: node.x, y: node.y, textAnchor: "middle", dominantBaseline: "middle" };
      default:
        return { x: node.x + offset, y: node.y - offset, textAnchor: "start", dominantBaseline: "alphabetic" };
    }
  };

  const [filter, setFilter] = useState([]);
  const colorByValuesMode = Boolean(options?.colorMeasure) && colorBy === "values";
  const effectiveColorBy =
    !colorByValuesMode && colorBy === "id" && (options?.data?.length || 0) <= 1
      ? "index"
      : colorBy;

  const filteredSeries = useMemo(() => {
    if (!options?.data) {
      return [];
    }

    if (effectiveColorBy === "index") {
      return options.data
        .map((series) => ({
          ...series,
          data: (series.data || []).filter((point) => !filter.includes(point.label || point.id)),
        }))
        .filter((series) => series.data.length > 0);
    }

    return options.data.filter((series) => !filter.includes(series.id));
  }, [effectiveColorBy, filter, options?.data]);

  const flatPoints = useMemo(
    () =>
      filteredSeries.flatMap((series) =>
        (series.data || []).map((point) => ({
          ...point,
          serieId: series.id,
          serieLabel: series.label || series.id,
        })),
      ),
    [filteredSeries],
  );

  const allFlatPoints = useMemo(
    () =>
      (options?.data || []).flatMap((series) =>
        (series.data || []).map((point) => ({
          ...point,
          serieId: series.id,
          serieLabel: series.label || series.id,
        })),
      ),
    [options?.data],
  );

  const colorIndexBy = options?.colorIndexBy || options?.indexBy || "label";
  const axisFormat = customAxisFormat || format;
  const xAxisFormat =
    measureFormats?.[options?.xMeasure] ||
    customAxisFormat ||
    axisFormat;
  const yAxisFormat =
    measureFormats?.[options?.yMeasure] ||
    customAxisFormat ||
    axisFormat;
  const sizeFormat =
    measureFormats?.[options?.sizeMeasure] ||
    customAxisFormat ||
    axisFormat;
  const colorValueFormat =
    measureFormats?.[options?.colorMeasure] ||
    customAxisFormat ||
    axisFormat;

  const getPointColor = (point) => {
    if (!colorGenerator || typeof colorGenerator.getColor !== "function") {
      return "#9F9F9F";
    }

    const resolvedColorValue =
      point?.colorValue ??
      point?.data?.colorValue ??
      point?.variables?.colorValue ??
      point?.data?.variables?.colorValue;

    if (colorByValuesMode && Number.isFinite(resolvedColorValue) && options?.colorMeasure) {
      const colorDatum = {
        ...point,
        [options.colorMeasure]: resolvedColorValue,
      };
      return colorGenerator.getColor(options.colorMeasure, colorDatum);
    }

    const resolvedIndex =
      point?.[colorIndexBy] ||
      point?.data?.[colorIndexBy] ||
      point?.colorKey ||
      point?.data?.colorKey ||
      point?.label ||
      point?.id ||
      point?.serieId ||
      DEFAULT_SERIES_LABEL;

    const colorDatum = {
      ...point,
      colorKey: resolvedIndex,
      [colorIndexBy]: resolvedIndex,
    };

    if (effectiveColorBy === "index") {
      return colorGenerator.getColor(resolvedIndex, colorDatum);
    }

    return colorGenerator.getColor(point?.serieId || DEFAULT_SERIES_LABEL, colorDatum);
  };

  const pointSizeScale = useMemo(() => {
    const pointsWithSize = flatPoints
      .map((point) => point.size)
      .filter((value) => Number.isFinite(value) && value > 0);

    const minSize = toNumber(scatterMinSize, DEFAULT_MIN_SIZE);
    const maxSize = toNumber(scatterMaxSize, DEFAULT_MAX_SIZE);

    if (pointsWithSize.length === 0) {
      return () => minSize;
    }

    const [minValue, maxValue] = d3.extent(pointsWithSize);
    if (minValue === maxValue) {
      return () => maxSize;
    }

    return d3.scaleSqrt().domain([minValue, maxValue]).range([minSize, maxSize]);
  }, [flatPoints, scatterMaxSize, scatterMinSize]);

  const chartLegends = useMemo(() => {
    if (colorByValuesMode) {
      return [];
    }

    if (effectiveColorBy === "index") {
      const seen = new Set();
      return allFlatPoints
        .filter((point) => {
          const legendId = point?.colorKey || point?.label || point?.id;
          if (seen.has(legendId)) {
            return false;
          }
          seen.add(legendId);
          return true;
        })
        .map((point) => ({
            id: point?.colorKey || point?.label || point?.id,
            label: point?.label || point?.id,
          color: getPointColor(point),
        }));
    }

    return (options?.data || []).map((series) => ({
      id: series.id,
      label: series.label || series.id,
      color: getPointColor({
        ...(series.data?.[0] || {}),
        serieId: series.id,
        label: series.data?.[0]?.label || series.label || series.id,
      }),
    }));
  }, [allFlatPoints, effectiveColorBy, colorByValuesMode, options?.data]);

  const colorValueExtent = useMemo(() => {
    if (!colorByValuesMode) {
      return null;
    }

    const colorValues = flatPoints
      .map((point) => point?.colorValue)
      .filter((value) => Number.isFinite(value));

    if (colorValues.length === 0) {
      return null;
    }

    const [minColorValue, maxColorValue] = d3.extent(colorValues);
    if (!Number.isFinite(minColorValue) || !Number.isFinite(maxColorValue)) {
      return null;
    }

    return { min: minColorValue, max: maxColorValue };
  }, [colorByValuesMode, flatPoints]);

  const GradientLegend = () => {
    if (!showLegends || !colorByValuesMode || !colorValueExtent || !options?.colorMeasure) {
      return null;
    }

    const measureKey = options.colorMeasure;
    const minColor = colorGenerator.getColor(measureKey, { [measureKey]: colorValueExtent.min });
    const maxColor = colorGenerator.getColor(measureKey, { [measureKey]: colorValueExtent.max });
    const gradientLabel = options?.measureLabels?.color || options?.colorMeasure || "Color";

    return (
      <div className={`legends container has-standard-12-font-size ${legendPosition}`}>
        <div className="legend item">
          <label className="legend-title">{gradientLabel}</label>
        </div>
        <div className="legend item" style={{ display: "block", width: "220px", maxWidth: "100%" }}>
          <div
            style={{
              height: "12px",
              borderRadius: "6px",
              background: `linear-gradient(90deg, ${minColor} 0%, ${maxColor} 100%)`,
              border: "1px solid rgba(0,0,0,0.15)",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginTop: "4px" }}>
            <span>{formatNumericValue(intl, colorValueFormat, colorValueExtent.min)}</span>
            <span>{formatNumericValue(intl, colorValueFormat, colorValueExtent.max)}</span>
          </div>
        </div>
      </div>
    );
  };

  const xDomain = createPaddedDomain(flatPoints.map((point) => point.x));
  const yDomain = createPaddedDomain(flatPoints.map((point) => point.y));
  const resolvedXAxisTicks = Number.parseInt(xAxisTickValues, 10);
  const resolvedYAxisTicks = Number.parseInt(yAxisTickValues, 10);

  const normalizeTooltipDatum = (node) => {
    const point = node?.node || node?.point || node;
    const pointData = point?.data || {};
    const xLabel = options?.measureLabels?.x || "X";
    const yLabel = options?.measureLabels?.y || "Y";
    const sizeLabel = options?.measureLabels?.size || "Size";
    const colorLabel = options?.measureLabels?.color || "Color";
    const seriesDisplay = point?.serieId || pointData.series || DEFAULT_SERIES_LABEL;
    const color = getPointColor({
      ...pointData,
      serieId: point?.serieId,
      label: pointData.label || point?.id || point?.serieId,
    });

    return {
      id: pointData.label || point?.id || point?.serieId,
      key: point?.serieId || pointData.series || DEFAULT_SERIES_LABEL,
      label: pointData.label || point?.id || point?.serieId,
      value: pointData.y ?? point?.value,
      color,
      data: {
        ...pointData,
        id: pointData.label || point?.id || point?.serieId,
        key: point?.serieId || pointData.series || DEFAULT_SERIES_LABEL,
        label: pointData.label || point?.id || point?.serieId,
        value: pointData.y ?? point?.value,
        x: pointData.x,
        y: pointData.y,
        size: pointData.size,
        colorValue: pointData.colorValue,
        xLabel,
        yLabel,
        sizeLabel,
        colorLabel,
        sizeDisplay: Number.isFinite(pointData.size) ? pointData.size : "",
        seriesDisplay,
        series: point?.serieId || pointData.series || DEFAULT_SERIES_LABEL,
        color,
      },
    };
  };

  const hasCustomTooltipTemplate =
    typeof tooltip === "string" &&
    tooltip.trim().length > 0 &&
    tooltip.trim() !== "{value}";

  const toggle = (id) => {
    setFilter((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  };

  const resolvedTickColor = overrideTickColor ? (tickColor || "rgb(92,93,99)") : "rgb(92,93,99)";
  const resolvedLabelColor = xLabelColor && xLabelColor !== "null" ? xLabelColor : "rgb(92,93,99)";
  const resolvedTickRotation = Number.isFinite(Number(tickRotation)) ? Number(tickRotation) : 0;
  const resolvedOffsetText = Number.isFinite(Number(offsetText)) ? Number(offsetText) : 0;

  const CustomXTick = (tick) => {
    const formatted = tick.format ? tick.format(tick.value) : String(tick.value);
    return (
      <g transform={`translate(${tick.x},${tick.y + 16 + resolvedOffsetText})`}>
        <text
          textAnchor={resolvedTickRotation !== 0 ? "end" : "middle"}
          dominantBaseline="middle"
          transform={`rotate(${resolvedTickRotation})`}
          style={{
            fill: resolvedLabelColor,
            fontSize: "12px",
            fontFamily: "sans-serif",
          }}
        >
          {formatted}
        </text>
      </g>
    );
  };

  const CustomYTick = (tick) => {
    const formatted = tick.format ? tick.format(tick.value) : String(tick.value);
    return (
      <g transform={`translate(${tick.x - 12},${tick.y})`}>
        <text
          textAnchor="end"
          dominantBaseline="middle"
          style={{
            fill: resolvedLabelColor,
            fontSize: "12px",
            fontFamily: "sans-serif",
          }}
        >
          {formatted}
        </text>
      </g>
    );
  };

  const ReferenceLayer = ({ xScale, yScale, innerWidth, innerHeight }) => {
    const referenceX = toNumber(scatterReferenceX);
    const referenceY = toNumber(scatterReferenceY);
    const showQuadrants = Number.isFinite(referenceX) && Number.isFinite(referenceY);

    return (
      <g pointerEvents="none">
        {Number.isFinite(referenceX) && (
          <g>
            <line
              x1={xScale(referenceX)}
              x2={xScale(referenceX)}
              y1={0}
              y2={innerHeight}
              stroke={REFERENCE_LINE_COLOR}
              strokeWidth={1.5}
              strokeDasharray="6 4"
            />
            {scatterReferenceXLabel ? (
              <text
                x={xScale(referenceX) + 8}
                y={14}
                fill={REFERENCE_LINE_COLOR}
                fontSize="11px"
                fontFamily="sans-serif"
              >
                {scatterReferenceXLabel}
              </text>
            ) : null}
          </g>
        )}
        {Number.isFinite(referenceY) && (
          <g>
            <line
              x1={0}
              x2={innerWidth}
              y1={yScale(referenceY)}
              y2={yScale(referenceY)}
              stroke={REFERENCE_LINE_COLOR}
              strokeWidth={1.5}
              strokeDasharray="6 4"
            />
            {scatterReferenceYLabel ? (
              <text
                x={8}
                y={Math.max(14, yScale(referenceY) - 8)}
                fill={REFERENCE_LINE_COLOR}
                fontSize="11px"
                fontFamily="sans-serif"
              >
                {scatterReferenceYLabel}
              </text>
            ) : null}
          </g>
        )}
        {showQuadrants && (
          <g fill={REFERENCE_LINE_COLOR} fontSize="11px" fontFamily="sans-serif">
            {scatterQuadrantTopLeftLabel ? (
              <text x={8} y={14}>
                {scatterQuadrantTopLeftLabel}
              </text>
            ) : null}
            {scatterQuadrantTopRightLabel ? (
              <text x={innerWidth - 8} y={14} textAnchor="end">
                {scatterQuadrantTopRightLabel}
              </text>
            ) : null}
            {scatterQuadrantBottomLeftLabel ? (
              <text x={8} y={innerHeight - 8}>
                {scatterQuadrantBottomLeftLabel}
              </text>
            ) : null}
            {scatterQuadrantBottomRightLabel ? (
              <text x={innerWidth - 8} y={innerHeight - 8} textAnchor="end">
                {scatterQuadrantBottomRightLabel}
              </text>
            ) : null}
          </g>
        )}
      </g>
    );
  };

  const ConnectedLinesLayer = ({ nodes }) => {
    if (!scatterConnectPoints) {
      return null;
    }

    const groupedNodes = nodes.reduce((accumulator, node) => {
      const serieId = node?.serieId || DEFAULT_SERIES_LABEL;
      if (!accumulator[serieId]) {
        accumulator[serieId] = [];
      }
      accumulator[serieId].push(node);
      return accumulator;
    }, {});

    return (
      <g pointerEvents="none">
        {Object.entries(groupedNodes).map(([serieId, serieNodes]) => {
          const path = [...serieNodes]
            .sort((left, right) => (left?.data?.x || 0) - (right?.data?.x || 0))
            .map((node) => `${node.x},${node.y}`)
            .join(" ");

          if (!path) {
            return null;
          }

          const color = getPointColor({
            ...(serieNodes[0]?.data || {}),
            serieId,
            colorKey: serieNodes[0]?.data?.colorKey || serieNodes[0]?.data?.label || serieId,
            label: serieNodes[0]?.data?.label || serieId,
            colorValue: serieNodes[0]?.data?.colorValue,
          });

          return (
            <polyline
              key={serieId}
              points={path}
              fill="none"
              stroke={color}
              strokeOpacity={CONNECTED_LINE_COLOR_OPACITY}
              strokeWidth={2}
            />
          );
        })}
      </g>
    );
  };

  const CustomNodesLayer = ({ nodes: layerNodes }) => {
    const opacity = toNumber(scatterPointOpacity, 0.85);
    return (
      <g>
        {layerNodes.map((node) => {
          const pointData = node?.data || {};
          const fill = getPointColor({
            ...pointData,
            serieId: node?.serieId,
            colorKey: pointData?.colorKey || pointData?.label || pointData?.id || node?.serieId,
            label: pointData?.label || pointData?.id || node?.serieId,
            colorValue: pointData?.colorValue,
          });
          const r = Number.isFinite(node?.size) ? node.size / 2 : 8;
          const borderColor = d3.color(fill) ? d3.color(fill).darker(0.6).toString() : fill;
          return (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={r}
              fill={fill}
              fillOpacity={opacity}
              stroke={borderColor}
              strokeWidth={1}
            />
          );
        })}
      </g>
    );
  };

  const LabelsLayer = ({ nodes }) => {
    if (!scatterShowLabels) {
      return null;
    }

    return (
      <g pointerEvents="none">
        {nodes.map((node) => {
          const placement = resolveLabelPlacement(node);
          const fallbackColor = getPointColor({
            ...(node?.data || {}),
            serieId: node?.serieId,
            colorKey: node?.data?.colorKey || node?.data?.label || node?.id,
            label: node?.data?.label || node?.id,
            colorValue: node?.data?.colorValue,
          });

          return (
            <text
              key={`${node.serieId}:${node.id}`}
              x={placement.x}
              y={placement.y}
              textAnchor={placement.textAnchor}
              dominantBaseline={placement.dominantBaseline}
              style={{
                fill: resolvedScatterLabelColor || fallbackColor,
                fontSize: `${scatterLabelFontSize}px`,
              }}
              fontFamily="sans-serif"
            >
              {node?.data?.label || node?.id}
            </text>
          );
        })}
      </g>
    );
  };

  if (!options?.data || filteredSeries.length === 0) {
    return null;
  }

  return (
    <div style={{ height }} className="scatter">
      <ResponsiveScatterPlot
        data={filteredSeries}
        margin={{
          top: marginTop,
          right: marginRight,
          bottom: marginBottom,
          left: marginLeft,
        }}
        xScale={{
          type: valueScale === "symlog" ? "symlog" : "linear",
          min: xDomain.min,
          max: xDomain.max,
        }}
        yScale={{
          type: valueScale === "symlog" ? "symlog" : "linear",
          min: yDomain.min,
          max: yDomain.max,
        }}
        enableGridX={enableGridX}
        enableGridY={enableGridY}
        axisBottom={{
          ...(Number.isFinite(resolvedXAxisTicks) ? { tickValues: resolvedXAxisTicks } : {}),
          renderTick: CustomXTick,
          legend: legends.bottom || options?.measureLabels?.x || "",
          legendPosition: "middle",
          legendOffset: toNumber(offsetBottom) ?? toNumber(scatterXAxisLegendOffset, 56),
          format: (value) =>
            intl.formatNumber(
              xAxisFormat?.style === "percent" ? value / 100 : value,
              xAxisFormat,
            ),
        }}
        axisLeft={{
          ...(Number.isFinite(resolvedYAxisTicks) ? { tickValues: resolvedYAxisTicks } : {}),
          renderTick: CustomYTick,
          legend: legends.left || options?.measureLabels?.y || "",
          legendPosition: "middle",
          legendOffset: toNumber(offsetY) ?? -(toNumber(scatterYAxisLegendOffset, 60)),
          format: (value) =>
            intl.formatNumber(
              yAxisFormat?.style === "percent" ? value / 100 : value,
              yAxisFormat,
            ),
        }}
        blendMode="normal"
        colors={{ scheme: "nivo" }}
        nodeSize={({ data }) => {
          if (Number.isFinite(data?.size) && data.size > 0) {
            return pointSizeScale(data.size);
          }
          return toNumber(scatterMinSize, DEFAULT_MIN_SIZE);
        }}

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
                tooltip={tooltip || DEFAULT_SCATTER_TOOLTIP}
                tooltipEnableMarkdown={tooltipEnableMarkdown}
              />
            );
          }

          return (
            <DefaultScatterTooltip
              datum={normalizedDatum}
              intl={intl}
              xAxisFormat={xAxisFormat}
              yAxisFormat={yAxisFormat}
              sizeFormat={sizeFormat}
              colorFormat={colorValueFormat}
            />
          );
        }}
        useMesh={true}
        layers={[
          "grid",
          "axes",
          ReferenceLayer,
          ConnectedLinesLayer,
          CustomNodesLayer,
          LabelsLayer,
          "mesh",
          "legends",
        ]}
        theme={{
          axis: {
            ticks: {
              line: { stroke: resolvedTickColor },
              text: { fill: resolvedLabelColor },
            },
            legend: {
              text: { fill: resolvedLabelColor },
            },
          },
          tooltip: {
            basic: { background: "#EEE", whiteSpace: "pre", display: "flex" },
            tableCell: { padding: "3px 5px" },
          },
        }}
      />
      {colorByValuesMode ? (
        <GradientLegend />
      ) : (
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
      )}
    </div>
  );
};

export default injectIntl(ScatterChart);
