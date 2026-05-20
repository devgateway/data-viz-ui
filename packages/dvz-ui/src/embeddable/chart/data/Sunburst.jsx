import React from "react";
import { getTranslatedValue, measuresMap, typesMap } from "./Utils";

const toNumericValue = (value) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
};

const buildVariables = ({ node = {}, label, measure, path, depth, value, extra = {} }) => ({
  ...node,
  ...extra,
  label,
  name: label,
  category: label,
  field: measure,
  value,
  path: path.join(" / "),
  depth,
});

const buildMeasureOnlyTree = ({ data, measures, locale, customLabels }) => {
  const mMap = measuresMap(data);
  const children = (data?.metadata?.measures || [])
    .filter((measure) => measures.includes(measure.value))
    .sort((left, right) => (left.position || 0) - (right.position || 0))
    .map((measure) => {
      const name = customLabels?.[measure.value] || getTranslatedValue(mMap[measure.value], locale);
      const value = toNumericValue(data?.[measure.value]);

      return {
        id: measure.value,
        name,
        loc: value,
        variables: buildVariables({
          node: data,
          label: name,
          measure: measure.value,
          path: ["Total", name],
          depth: 1,
          value,
        }),
      };
    })
    .filter((child) => child.loc > 0);

  return {
    id: "root",
    name: "Total",
    variables: buildVariables({
      node: data,
      label: "Total",
      measure: measures?.[0],
      path: ["Total"],
      depth: 0,
      value: null,
    }),
    children,
  };
};

const buildHierarchyNode = ({ node, metadataMap, measure, locale, parentDimension, path = [] }) => {
  if (!node) {
    return null;
  }

  const dimension = node.type || parentDimension;
  const metadata = dimension ? metadataMap?.[dimension] : null;
  const translatedLabel = metadata?.items?.find((item) => item.value === node.value);
  const name = translatedLabel ? getTranslatedValue(translatedLabel, locale) : (node.label || node.value || "Unknown");
  const currentPath = [...path, name];
  const children = Array.isArray(node.children)
    ? node.children
        .map((child) =>
          buildHierarchyNode({
            node: child,
            metadataMap,
            measure,
            locale,
            parentDimension: node.type,
            path: currentPath,
          }),
        )
        .filter(Boolean)
    : [];

  if (children.length > 0) {
    return {
      id: `${dimension || "node"}:${node.value}`,
      name,
      variables: buildVariables({
        node,
        label: name,
        measure,
        path: currentPath,
        depth: currentPath.length - 1,
        value: null,
        extra: dimension ? { [dimension]: name } : {},
      }),
      children,
    };
  }

  const value = toNumericValue(node?.[measure]);

  return {
    id: `${dimension || "node"}:${node.value}`,
    name,
    loc: value,
    variables: buildVariables({
      node,
      label: name,
      measure,
      path: currentPath,
      depth: currentPath.length - 1,
      value,
      extra: dimension ? { [dimension]: name } : {},
    }),
  };
};

const SunburstDataFrame = (props) => {
  const { children, data, measures, locale, customLabels } = props;
  const selectedMeasure =
    measures?.[0] ||
    data?.metadata?.measures
      ?.slice()
      ?.sort((left, right) => (left.position || 0) - (right.position || 0))?.[0]?.value;
  const resolvedMeasures = measures?.length > 0 ? measures : (selectedMeasure ? [selectedMeasure] : []);

  if (!data || !selectedMeasure) {
    const options = { data: null };
    return React.Children.map(children, (child) => React.cloneElement(child, { options }));
  }

  let root;
  if (!Array.isArray(data.children) || data.children.length === 0) {
    root = buildMeasureOnlyTree({ data, measures: resolvedMeasures, locale, customLabels });
  } else {
    const metadataMap = typesMap(data);
    root = {
      id: "root",
      name: "Total",
      variables: buildVariables({
        node: data,
        label: "Total",
        measure: selectedMeasure,
        path: ["Total"],
        depth: 0,
        value: null,
      }),
      children: data.children
        .map((node) =>
          buildHierarchyNode({
            node,
            metadataMap,
            measure: selectedMeasure,
            locale,
            path: ["Total"],
          }),
        )
        .filter(Boolean),
    };
  }

  const options = {
    indexBy: "id",
    keys: resolvedMeasures,
    metadata: data.metadata,
    data: root,
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { options }),
  );
};

export default SunburstDataFrame;

