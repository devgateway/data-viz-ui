import React from "react";
import {
  alphaSort,
  dateSort,
  getTranslatedValue,
  measuresMap,
  numericSort,
  typesMap,
} from "./Utils";

const toNumber = (value) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
};

const sortRows = ({ rows, sort, sortReverse, locale }) => {
  const sortedRows = [...rows];

  if (sort === "alphabetically") {
    sortedRows.sort((left, right) =>
      alphaSort(sortReverse, locale, left.label || left.id, right.label || right.id),
    );
  } else if (sort === "date") {
    sortedRows.sort((left, right) => dateSort(sortReverse, left.label, right.label));
  } else if (sort === "values") {
    sortedRows.sort((left, right) => numericSort(sortReverse, left.center, right.center));
  } else if (sortReverse) {
    sortedRows.reverse();
  }

  return sortedRows;
};

const IntervalPlotDataFrame = (props) => {
  const { children, data, measures = [], dimensions = [], locale, customLabels = {} } = props;
  const selectedMeasures = (data?.metadata?.measures || [])
    .filter((measure) => measures.includes(measure.value))
    .sort((left, right) => (left.position || 0) - (right.position || 0));
  const [centerMeasure, lowMeasure, highMeasure] = selectedMeasures.map((measure) => measure.value);
  const activeDimensions = dimensions.filter((dimension) => dimension && dimension !== "none");
  const [primaryDimension, secondaryDimension] = activeDimensions;

  const options = {
    indexBy: "id",
    keys: [],
    colorKeys: [],
    colorData: [],
    colorIndexBy: "id",
    data: [],
    metadata: data?.metadata,
    dimensionsMetadata: new Set(),
    measuresMetadata: new Set(selectedMeasures),
    measureLabels: {
      center: centerMeasure,
      low: lowMeasure,
      high: highMeasure,
    },
  };

  if (!data || !centerMeasure || !lowMeasure || !highMeasure || !primaryDimension) {
    return React.Children.map(children, (child) => React.cloneElement(child, { options }));
  }

  const metadataMeasuresMap = measuresMap(data);
  const metadataTypesMap = typesMap(data);

  const getDimensionLabel = (dimension, value, fallbackLabel = value) => {
    const metadata = metadataTypesMap?.[dimension];
    const translated = metadata?.items?.find((item) => item.value === value);
    if (metadata) {
      options.dimensionsMetadata.add(metadata);
    }
    return translated ? getTranslatedValue(translated, locale) : (fallbackLabel ?? value);
  };

  const getMeasureLabel = (measure) =>
    customLabels?.[measure] || getTranslatedValue(metadataMeasuresMap?.[measure], locale) || measure;

  const measureLabels = {
    center: getMeasureLabel(centerMeasure),
    low: getMeasureLabel(lowMeasure),
    high: getMeasureLabel(highMeasure),
  };
  options.measureLabels = measureLabels;

  const buildRow = ({ row, label, extras = {} }) => {
    const center = toNumber(row?.[centerMeasure]);
    const low = toNumber(row?.[lowMeasure]);
    const high = toNumber(row?.[highMeasure]);

    if (center === null || low === null || high === null) {
      return null;
    }

    const resolvedLow = Math.min(low, high);
    const resolvedHigh = Math.max(low, high);
    const normalizedLabel = String(label);

    return {
      id: normalizedLabel,
      label: normalizedLabel,
      center,
      low: resolvedLow,
      high: resolvedHigh,
      value: center,
      variables: {
        ...row,
        ...extras,
        label: normalizedLabel,
        category: normalizedLabel,
        field: centerMeasure,
        value: center,
        center,
        low: resolvedLow,
        high: resolvedHigh,
        centerLabel: measureLabels.center,
        lowLabel: measureLabels.low,
        highLabel: measureLabels.high,
      },
    };
  };

  const rows = [];
  if (Array.isArray(data?.children) && data.children.length > 0) {
    data.children.forEach((parentRow) => {
      if (Array.isArray(parentRow?.children) && parentRow.children.length > 0) {
        const parentLabel = getDimensionLabel(
          parentRow.type || primaryDimension,
          parentRow.value,
          parentRow.label,
        );

        parentRow.children.forEach((row) => {
          const childLabel = getDimensionLabel(
            row.type || secondaryDimension || primaryDimension,
            row.value,
            row.label,
          );
          const combinedLabel = secondaryDimension ? `${parentLabel} — ${childLabel}` : childLabel;
          const builtRow = buildRow({
            row,
            label: combinedLabel,
            extras: {
              [primaryDimension]: parentLabel,
              ...(secondaryDimension ? { [secondaryDimension]: childLabel } : {}),
            },
          });

          if (builtRow) {
            rows.push(builtRow);
          }
        });
        return;
      }

      const label =
        parentRow?.[primaryDimension] != null
          ? getDimensionLabel(primaryDimension, parentRow[primaryDimension], parentRow[primaryDimension])
          : getDimensionLabel(parentRow.type || primaryDimension, parentRow.value, parentRow.label);
      const builtRow = buildRow({
        row: parentRow,
        label,
        extras: { [primaryDimension]: label },
      });

      if (builtRow) {
        rows.push(builtRow);
      }
    });
  }

  const sortedRows = sortRows({ rows, sort: props.sort, sortReverse: props.sortReverse, locale });
  options.keys = sortedRows.map((row) => row.id);
  options.colorKeys = options.keys;
  options.colorData = sortedRows;
  options.data = sortedRows;

  return React.Children.map(children, (child) => React.cloneElement(child, { options }));
};

export default IntervalPlotDataFrame;

