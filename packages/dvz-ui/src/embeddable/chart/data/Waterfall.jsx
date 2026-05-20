import React from "react";
import { getTranslatedValue, measuresMap, typesMap } from "./Utils";

const TOTAL_STEP_TYPES = new Set(["total", "subtotal", "start", "end"]);

const toNumber = (value) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
};

const normalizeStepType = (value) => {
  if (value == null) {
    return null;
  }

  const normalized = String(value).trim().toLowerCase();
  if (TOTAL_STEP_TYPES.has(normalized)) {
    return "total";
  }
  if (["increase", "positive", "up", "gain"].includes(normalized)) {
    return "increase";
  }
  if (["decrease", "negative", "down", "loss"].includes(normalized)) {
    return "decrease";
  }
  return null;
};

const deriveStepType = ({ row, explicitStepType }) => {
  const inferredType =
    normalizeStepType(explicitStepType) ||
    normalizeStepType(row?.stepType) ||
    normalizeStepType(row?.waterfallType) ||
    normalizeStepType(row?.kind) ||
    normalizeStepType(row?.chartType);

  if (inferredType) {
    return inferredType;
  }

  const value = toNumber(row?.value);
  if (value == null) {
    return "increase";
  }

  return value < 0 ? "decrease" : "increase";
};

const WaterfallDataFrame = (props) => {
  const { children, data, measures = [], dimensions = [], locale, customLabels = {} } = props;
  const selectedMeasure = (data?.metadata?.measures || [])
    .filter((measure) => measures.includes(measure.value))
    .sort((left, right) => (left.position || 0) - (right.position || 0))[0]?.value;
  const activeDimensions = dimensions.filter((dimension) => dimension && dimension !== "none");
  const [stepDimension, stepTypeDimension] = activeDimensions;

  const options = {
    indexBy: "label",
    keys: ["increase", "decrease", "total"],
    data: [],
    metadata: data?.metadata,
    dimensionsMetadata: new Set(),
    measuresMetadata: new Set(),
    measureLabels: {
      value: selectedMeasure,
    },
  };

  if (!data || !selectedMeasure || !stepDimension) {
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

  let cumulative = 0;
  const steps = [];
  const sourceRows = Array.isArray(data?.children) ? data.children : [];

  sourceRows.forEach((row, index) => {
    const label = getDimensionLabel(row.type || stepDimension, row.value, row.label);
    const explicitStepType =
      stepTypeDimension && row?.[stepTypeDimension] != null ? row[stepTypeDimension] : null;
    const rawValue = toNumber(row?.[selectedMeasure]);

    if (label == null || rawValue == null) {
      return;
    }

    const kind = deriveStepType({ row: { ...row, value: rawValue }, explicitStepType });
    const start = kind === "total" ? 0 : cumulative;
    const end = kind === "total" ? rawValue : cumulative + rawValue;
    cumulative = end;

    steps.push({
      id: `${label}-${index}`,
      label,
      value: rawValue,
      start,
      end,
      kind,
      variables: {
        ...row,
        label,
        category: label,
        field: selectedMeasure,
        value: rawValue,
        start,
        end,
        changeType: kind,
        stepType: kind,
        measureLabel,
      },
    });
  });

  options.data = steps;

  return React.Children.map(children, (child) => React.cloneElement(child, { options }));
};

export default WaterfallDataFrame;

