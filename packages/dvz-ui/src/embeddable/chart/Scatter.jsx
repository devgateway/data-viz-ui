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

const DefaultScatterTooltip = ({ datum, intl, axisFormat }) => {
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
        {data?.xLabel || "X"}: {formatNumericValue(intl, axisFormat, data?.x)}
      </div>
      <div>
        {data?.yLabel || "Y"}: {formatNumericValue(intl, axisFormat, data?.y)}
      </div>
      {showSize ? (
        <div>
          {data?.sizeLabel || "Size"}: {formatNumericValue(intl, axisFormat, data?.size)}
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
}) => {
  const [filter, setFilter] = useState([]);

  const filteredSeries = useMemo(() => {
    if (!options?.data) {
      return [];
    }

    if (colorBy === "index") {
      return options.data
        .map((series) => ({
          ...series,
          data: (series.data || []).filter((point) => !filter.includes(point.label || point.id)),
        }))
        .filter((series) => series.data.length > 0);
    }

    return options.data.filter((series) => !filter.includes(series.id));
  }, [colorBy, filter, options?.data]);

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

  const getPointColor = (point) => {
    const colorDatum = {
      ...point,
      [colorIndexBy]: point?.label || point?.id,
    };

    if (colorBy === "index") {
      return colorGenerator.getColor(point?.label || point?.id, colorDatum);
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
    if (colorBy === "index") {
      const seen = new Set();
      return allFlatPoints
        .filter((point) => {
          const legendId = point.label || point.id;
          if (seen.has(legendId)) {
            return false;
          }
          seen.add(legendId);
          return true;
        })
        .map((point) => ({
          id: point.label || point.id,
          label: point.label || point.id,
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
  }, [allFlatPoints, colorBy, options?.data]);

  const axisFormat = customAxisFormat || format;
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
        xLabel,
        yLabel,
        sizeLabel,
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
            label: serieNodes[0]?.data?.label || serieId,
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

  const LabelsLayer = ({ nodes }) => {
    if (!scatterShowLabels) {
      return null;
    }

    return (
      <g pointerEvents="none">
        {nodes.map((node) => (
          <text
            key={`${node.serieId}:${node.id}`}
            x={node.x + 10}
            y={node.y - 10}
            fill={getPointColor({
              ...(node?.data || {}),
              serieId: node?.serieId,
              label: node?.data?.label || node?.id,
            })}
            fontSize="11px"
            fontFamily="sans-serif"
          >
            {node?.data?.label || node?.id}
          </text>
        ))}
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
          legend: legends.bottom || options?.measureLabels?.x || "",
          legendPosition: "middle",
          legendOffset: 46,
          format: (value) =>
            intl.formatNumber(
              axisFormat?.style === "percent" ? value / 100 : value,
              axisFormat,
            ),
        }}
        axisLeft={{
          ...(Number.isFinite(resolvedYAxisTicks) ? { tickValues: resolvedYAxisTicks } : {}),
          legend: legends.left || options?.measureLabels?.y || "",
          legendPosition: "middle",
          legendOffset: -46,
          format: (value) =>
            intl.formatNumber(
              axisFormat?.style === "percent" ? value / 100 : value,
              axisFormat,
            ),
        }}
        blendMode="multiply"
        colors={({ serieId, data }) =>
          getPointColor({
            ...data,
            serieId,
            label: data?.label || data?.id || serieId,
          })
        }
        nodeSize={({ data }) => {
          if (Number.isFinite(data?.size) && data.size > 0) {
            return pointSizeScale(data.size);
          }
          return toNumber(scatterMinSize, DEFAULT_MIN_SIZE);
        }}
        nodeColor={({ serieId, data }) =>
          getPointColor({
            ...data,
            serieId,
            label: data?.label || data?.id || serieId,
          })
        }
        nodeBorderWidth={1}
        nodeBorderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
        nodeOpacity={toNumber(scatterPointOpacity, 0.85)}
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
              axisFormat={axisFormat}
            />
          );
        }}
        useMesh={true}
        layers={[
          "grid",
          "axes",
          ReferenceLayer,
          ConnectedLinesLayer,
          "nodes",
          LabelsLayer,
          "mesh",
          "legends",
        ]}
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

export default injectIntl(ScatterChart);

