import React from "react";
import * as d3 from "d3";
import { getTranslatedValue, measuresMap, typesMap } from "./Utils";

const toNumber = (value) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
};

const createBinLabel = (intl, start, end) => {
  const formatter = new Intl.NumberFormat(intl || undefined, {
    maximumFractionDigits: 2,
  });
  return `${formatter.format(start)} – ${formatter.format(end)}`;
};

const HistogramDataFrame = (props) => {
  const { children, data, measures = [], dimensions = [], locale, customLabels = {} } = props;
  const selectedMeasure = (data?.metadata?.measures || [])
    .filter((measure) => measures.includes(measure.value))
    .sort((left, right) => (left.position || 0) - (right.position || 0))[0]?.value;
  const activeDimensions = dimensions.filter((dimension) => dimension && dimension !== "none");
  const [observationDimension, seriesDimension] = activeDimensions;

  const options = {
    indexBy: "label",
    keys: [],
    data: [],
    metadata: data?.metadata,
    dimensionsMetadata: new Set(),
    measuresMetadata: new Set(),
    measureLabels: {
      value: selectedMeasure,
    },
  };

  if (!data || !selectedMeasure || !observationDimension) {
    return React.Children.map(children, (child) => React.cloneElement(child, { options }));
  }

  const metadataMeasuresMap = measuresMap(data);
  const metadataTypesMap = typesMap(data);
  const selectedMeasureMetadata = metadataMeasuresMap?.[selectedMeasure];
  if (selectedMeasureMetadata) {
    options.measuresMetadata.add(selectedMeasureMetadata);
  }

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

  const measureLabel = getMeasureLabel(selectedMeasure);
  options.measureLabels.value = measureLabel;

  const observations = [];
  if (Array.isArray(data?.children) && data.children.length > 0) {
    data.children.forEach((parentRow) => {
      if (Array.isArray(parentRow?.children) && parentRow.children.length > 0) {
        parentRow.children.forEach((row) => {
          const value = toNumber(row?.[selectedMeasure]);
          if (value == null) {
            return;
          }

          const seriesLabel = getDimensionLabel(
            row.type || seriesDimension || parentRow.type || observationDimension,
            row.value,
            row.label,
          );
          const observationLabel = getDimensionLabel(
            parentRow.type || observationDimension,
            parentRow.value,
            parentRow.label,
          );
          observations.push({
            label: observationLabel,
            series: seriesLabel,
            value,
          });
        });
        return;
      }

      const value = toNumber(parentRow?.[selectedMeasure]);
      if (value == null) {
        return;
      }

      observations.push({
        label: getDimensionLabel(parentRow.type || observationDimension, parentRow.value, parentRow.label),
        series: measureLabel,
        value,
      });
    });
  }

  const allValues = observations.map((item) => item.value).filter((value) => value != null);
  if (allValues.length === 0) {
    return React.Children.map(children, (child) => React.cloneElement(child, { options }));
  }

  const binCount = Math.max(5, Math.min(20, Math.ceil(Math.sqrt(allValues.length))));
  const binGenerator = d3.bin().thresholds(binCount);
  const bins = binGenerator(allValues);
  const seriesKeys = Array.from(new Set(observations.map((item) => item.series)));

  options.keys = seriesKeys;
  options.colorKeys = seriesKeys;
  options.colorIndexBy = "id";
  options.colorData = seriesKeys.map((key) => ({ id: key }));
  options.bins = bins.map((bin, index) => ({
    index,
    x0: bin.x0,
    x1: bin.x1,
    label: createBinLabel(locale, bin.x0 ?? 0, bin.x1 ?? 0),
  }));
  options.data = options.bins.map((bin) => {
    const isLastBin = bin.index === options.bins.length - 1;
    const row = {
      id: bin.label,
      label: bin.label,
      binStart: bin.x0,
      binEnd: bin.x1,
    };

    seriesKeys.forEach((seriesKey) => {
      row[seriesKey] = observations.filter((item) =>
        item.series === seriesKey &&
        item.value >= bin.x0 &&
        (isLastBin ? item.value <= (bin.x1 ?? item.value) : item.value < (bin.x1 ?? item.value + 1)),
      ).length;
    });

    return row;
  });

  return React.Children.map(children, (child) => React.cloneElement(child, { options }));
};

export default HistogramDataFrame;

