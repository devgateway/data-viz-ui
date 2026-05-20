import React from "react";
import { alphaSort, dateSort, getTranslatedValue, measuresMap, typesMap } from "./Utils";

const toNumber = (value) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
};

const buildVariables = ({ row, pointLabel, seriesLabel, xMeasure, yMeasure, sizeMeasure }) => ({
  ...row,
  label: pointLabel,
  category: pointLabel,
  field: yMeasure,
  x: row?.[xMeasure],
  y: row?.[yMeasure],
  value: row?.[yMeasure],
  series: seriesLabel,
  ...(sizeMeasure ? { size: row?.[sizeMeasure] } : {}),
});

const buildPoint = ({ row, pointLabel, seriesLabel, xMeasure, yMeasure, sizeMeasure }) => {
  const x = toNumber(row?.[xMeasure]);
  const y = toNumber(row?.[yMeasure]);

  if (x === null || y === null) {
    return null;
  }

  return {
    x,
    y,
    size: sizeMeasure ? toNumber(row?.[sizeMeasure]) : null,
    label: pointLabel,
    id: pointLabel,
    value: y,
    variables: buildVariables({ row, pointLabel, seriesLabel, xMeasure, yMeasure, sizeMeasure }),
  };
};

const sortPoints = ({ points, sort, sortReverse, locale }) => {
  const sorted = [...points];

  if (sort === "alphabetically") {
    sorted.sort((left, right) =>
      alphaSort(sortReverse, locale, left?.label || "", right?.label || ""),
    );
  } else if (sort === "date") {
    sorted.sort((left, right) => dateSort(sortReverse, left?.label, right?.label));
  } else {
    sorted.sort((left, right) => left.x - right.x);
  }

  return sorted;
};

const ScatterDataFrame = (props) => {
  const { children, data, measures = [], dimensions = [], locale, customLabels = {} } = props;
  const selectedMeasures = (data?.metadata?.measures || [])
    .filter((measure) => measures.includes(measure.value))
    .sort((left, right) => (left.position || 0) - (right.position || 0));

  const [xMeasure, yMeasure, sizeMeasure] = selectedMeasures.map((measure) => measure.value);
  const options = {
    indexBy: "label",
    keys: [],
    colorIndexBy: "label",
    colorKeys: [],
    colorData: [],
    metadata: data?.metadata,
    measuresMetadata: new Set(selectedMeasures),
    dimensionsMetadata: new Set(),
    data: [],
  };

  if (!data || !xMeasure || !yMeasure) {
    return React.Children.map(children, (child) => React.cloneElement(child, { options }));
  }

  const metadataMeasuresMap = measuresMap(data);
  const metadataTypesMap = typesMap(data);
  const activeDimensions = dimensions.filter((dimension) => dimension && dimension !== "none");
  const seriesMap = new Map();
  const flatPoints = [];

  const getDimensionLabel = (dimension, value, fallbackLabel = value) => {
    const metadata = metadataTypesMap?.[dimension];
    const translated = metadata?.items?.find((item) => item.value === value);
    if (metadata) {
      options.dimensionsMetadata.add(metadata);
    }
    return translated ? getTranslatedValue(translated, locale) : (fallbackLabel || value);
  };

  const getMeasureLabel = (measure) =>
    customLabels?.[measure] || getTranslatedValue(metadataMeasuresMap?.[measure], locale) || measure;

  const ensureSeries = (seriesId, label = seriesId) => {
    if (!seriesMap.has(seriesId)) {
      seriesMap.set(seriesId, { id: seriesId, label, data: [] });
    }
    return seriesMap.get(seriesId);
  };

  const addPointToSeries = (seriesId, point) => {
    if (!point) {
      return;
    }

    const series = ensureSeries(seriesId);
    series.data.push(point);
    flatPoints.push({ label: point.label, seriesId, ...point });
  };

  if (!Array.isArray(data?.children) || data.children.length === 0) {
    const seriesLabel = getMeasureLabel(yMeasure);
    const point = buildPoint({
      row: data,
      pointLabel: seriesLabel,
      seriesLabel,
      xMeasure,
      yMeasure,
      sizeMeasure,
    });
    addPointToSeries(seriesLabel, point);
  } else if (activeDimensions.length <= 1) {
    const pointDimension = activeDimensions[0];
    const singleSeriesId = getMeasureLabel(yMeasure);

    data.children.forEach((row) => {
      const pointLabel = pointDimension
        ? getDimensionLabel(row.type || pointDimension, row.value, row.label)
        : (row.label || row.value || singleSeriesId);
      const point = buildPoint({
        row,
        pointLabel,
        seriesLabel: singleSeriesId,
        xMeasure,
        yMeasure,
        sizeMeasure,
      });
      addPointToSeries(singleSeriesId, point);
    });
  } else {
    const [pointDimension, seriesDimension] = activeDimensions;

    data.children.forEach((parentRow) => {
      const pointLabel = getDimensionLabel(
        parentRow.type || pointDimension,
        parentRow.value,
        parentRow.label,
      );

      if (!Array.isArray(parentRow.children) || parentRow.children.length === 0) {
        return;
      }

      parentRow.children.forEach((row) => {
        const seriesLabel = getDimensionLabel(
          row.type || seriesDimension,
          row.value,
          row.label,
        );
        const point = buildPoint({
          row,
          pointLabel,
          seriesLabel,
          xMeasure,
          yMeasure,
          sizeMeasure,
        });
        addPointToSeries(seriesLabel, point);
      });
    });
  }

  const series = Array.from(seriesMap.values())
    .map((item) => ({
      ...item,
      data: sortPoints({
        points: item.data,
        sort: props.sort,
        sortReverse: props.sortReverse,
        locale,
      }),
    }))
    .filter((item) => item.data.length > 0);

  options.keys = series.map((item) => item.id);
  options.colorKeys = options.keys;
  options.colorData = flatPoints;
  options.data = series;
  options.xMeasure = xMeasure;
  options.yMeasure = yMeasure;
  options.sizeMeasure = sizeMeasure;
  options.measureLabels = {
    x: getMeasureLabel(xMeasure),
    y: getMeasureLabel(yMeasure),
    size: sizeMeasure ? getMeasureLabel(sizeMeasure) : null,
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { options }),
  );
};

export default ScatterDataFrame;

