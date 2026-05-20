import React from "react";
import { getTranslatedValue, measuresMap, typesMap } from "./Utils";

const toNumber = (value) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
};

const HeatmapDataFrame = (props) => {
  const { children, data, measures = [], dimensions = [], locale, customLabels = {} } = props;
  const selectedMeasure = (data?.metadata?.measures || [])
    .filter((measure) => measures.includes(measure.value))
    .sort((left, right) => (left.position || 0) - (right.position || 0))[0]?.value;
  const activeDimensions = dimensions.filter((dimension) => dimension && dimension !== "none");
  const [rowDimension, columnDimension] = activeDimensions;

  const options = {
    indexBy: "id",
    keys: [],
    data: [],
    metadata: data?.metadata,
    rowDimension,
    columnDimension,
    measureLabel: selectedMeasure,
    columns: [],
    dimensionsMetadata: new Set(),
    measuresMetadata: new Set(),
  };

  if (!data || !selectedMeasure || !rowDimension || !columnDimension) {
    return React.Children.map(children, (child) => React.cloneElement(child, { options }));
  }

  const metadataMeasuresMap = measuresMap(data);
  const metadataTypesMap = typesMap(data);
  const rows = new Map();
  const columns = [];

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
  if (metadataMeasuresMap?.[selectedMeasure]) {
    options.measuresMetadata.add(metadataMeasuresMap[selectedMeasure]);
  }
  options.measureLabel = measureLabel;

  const setCell = ({ rowLabel, columnLabel, row }) => {
    if (!rowLabel || !columnLabel) {
      return;
    }

    const normalizedRowLabel = String(rowLabel);
    const normalizedColumnLabel = String(columnLabel);

    if (!rows.has(normalizedRowLabel)) {
      rows.set(normalizedRowLabel, {
        id: normalizedRowLabel,
        data: new Map(),
      });
    }

    if (!columns.includes(normalizedColumnLabel)) {
      columns.push(normalizedColumnLabel);
    }

    const value = toNumber(row?.[selectedMeasure]);
    rows.get(normalizedRowLabel).data.set(normalizedColumnLabel, {
      x: normalizedColumnLabel,
      y: value,
      variables: {
        ...row,
        label: `${normalizedRowLabel} / ${normalizedColumnLabel}`,
        category: normalizedRowLabel,
        row: normalizedRowLabel,
        column: normalizedColumnLabel,
        rowLabel: normalizedRowLabel,
        columnLabel: normalizedColumnLabel,
        field: selectedMeasure,
        value,
        measureLabel,
      },
    });
  };

  if (Array.isArray(data?.children) && data.children.length > 0) {
    data.children.forEach((parentRow) => {
      if (Array.isArray(parentRow?.children) && parentRow.children.length > 0) {
        const rowLabel = getDimensionLabel(
          parentRow.type || rowDimension,
          parentRow.value,
          parentRow.label,
        );

        parentRow.children.forEach((row) => {
          const columnLabel = getDimensionLabel(
            row.type || columnDimension,
            row.value,
            row.label,
          );
          setCell({ rowLabel, columnLabel, row });
        });
        return;
      }

      const rowLabel =
        parentRow?.[rowDimension] != null
          ? getDimensionLabel(rowDimension, parentRow[rowDimension], parentRow[rowDimension])
          : getDimensionLabel(parentRow.type || rowDimension, parentRow.value, parentRow.label);
      const columnValue = parentRow?.[columnDimension];
      const columnLabel =
        columnValue != null
          ? getDimensionLabel(columnDimension, columnValue, columnValue)
          : null;
      setCell({ rowLabel, columnLabel, row: parentRow });
    });
  }

  options.columns = columns;
  options.keys = columns;
  options.data = Array.from(rows.values()).map((row) => ({
    id: row.id,
    data: columns.map((column) =>
      row.data.get(column) || {
        x: column,
        y: null,
        variables: {
          label: `${row.id} / ${column}`,
          category: row.id,
          row: row.id,
          column,
          rowLabel: row.id,
          columnLabel: column,
          field: selectedMeasure,
          value: null,
          measureLabel,
        },
      },
    ),
  }));

  return React.Children.map(children, (child) => React.cloneElement(child, { options }));
};

export default HeatmapDataFrame;

