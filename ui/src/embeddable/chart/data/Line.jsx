import React from "react";
import { getTranslatedValue, measuresMap, typesMap } from "./Utils";

const alphaSort = (reverse, locale, a, b) => {
  return new Intl.Collator(locale, {
    caseFirst: "upper",
    numeric: true,
    sensitivity: "variant",
  }).compare(reverse ? b : a, reverse ? a : b);
};
const numericSort = (reverse, a, b) => {
  return reverse ? b - a : a - b;
};

const getOptionsNoDimension = (props) => {
  const { data, measures, swap, dimensions, locale, customLabels } = props;
  let options = {};
  const selectedDimensions = dimensions.filter((f) => f != "");
  const measuresMetadata = new Set();
  if (selectedDimensions.length == 0 && data) {
    const mMap = measuresMap(data);
    const categories = new Set();
    const keys = new Set();
    let series = [];
    let indexBy;
    if (data.metadata && data.metadata.measures) {
      const selectedMeasures = data.metadata.measures
        .filter((m) => measures.includes(m.value))
        .sort((aMeasure, bMeasure) => {
          if (
            aMeasure.position != null &&
            bMeasure.position != null &&
            aMeasure.position != bMeasure.position
          ) {
            return aMeasure.position - bMeasure.position;
          }

          return 0;
        });
      series = [];
      indexBy = "measure";
      categories.add("measure");

      const variables = {};
      Object.keys(data).forEach((k) => {
        variables[k] = data[k];
      });

      selectedMeasures.forEach((m) => {
        const row = {};
        const label =
          customLabels[m.value] || getTranslatedValue(mMap[m.value], locale);
        row.type = "measure";
        row["measureFieldName"] = m.value;
        row["measure"] = label;
        row[label] = data[m.value];
        row.variables = variables;
        series.push(row);
        keys.add(label);
        measuresMetadata.add(mMap[m.value]);
      });

      options = {
        categories,
        indexBy,
        keys: Array.from(keys),
        measuresMetadata,
        data: series,
      };
    }
  }

  return options;
};
const includeOverallData = (props) => {
  const { data, measures, dimensions, overallLabel } = props;
  if (dimensions.length == 1 && data.children) {
    const overallAdded =
      data.children.filter((c) => c.value == overallLabel).length > 0;
    if (!overallAdded) {
      const overallData = {};
      overallData.type = dimensions[0];
      overallData.value = overallLabel;
      overallData.label = overallLabel;
      Object.keys(data).forEach((k) => {
        if (!["children", "metadata", "type", "value"].includes(k)) {
          overallData[k] = data[k];
        }
      });

      data.children = [overallData, ...data.children];
    }
  } else if (dimensions.length == 2 && data.children) {
    data.children.forEach((d) => {
      const overallAdded =
        d.children.filter((c) => c.value == overallLabel).length > 0;
      if (!overallAdded) {
        const overallData = {};
        overallData.type = dimensions[1];
        overallData.value = overallLabel;
        overallData.label = overallLabel;

        Object.keys(d).forEach((k) => {
          if (!["children", "metadata", "type", "value"].includes(k)) {
            overallData[k] = d[k];
          }
        });

        d.children = [overallData, ...d.children];
      }
    });
  }

  return data;
};

const BarOneDimension = (props) => {
  let options = {};
  const {
    data,
    measures,
    swap,
    dimensions,
    includeOverall,
    locale,
    customLabels,
    colorBy,
    hiddenBars,
  } = props;
  const selectedDimensions = dimensions.filter((f) => f != "");
  const selectedMeasures = data.metadata.measures
    .filter((m) => measures.includes(m.value))
    .sort((aMeasure, bMeasure) => {
      if (
        aMeasure.position != null &&
        bMeasure.position != null &&
        aMeasure.position != bMeasure.position
      ) {
        return aMeasure.position - bMeasure.position;
      }

      return 0;
    });

  if (includeOverall && measures.length == 1) {
    includeOverallData(props);
  }
  if (selectedDimensions.length == 0 && data) {
    options = getOptionsNoDimension(props);
  } else if (data && data.children && selectedDimensions.length > 0) {
    const mMap = measuresMap(data);
    const tMap = typesMap(data);
    const categories = new Set();
    const dimensionsMetadata = new Set();
    const measuresMetadata = new Set();
    const keys = new Set();
    const series = [];
    let indexBy;

    if (swap && selectedDimensions.length == 1 && measures.length > 0) {
      indexBy = "measure";
      selectedMeasures.forEach((measure) => {
        const row = {};
        row["measure"] =
          customLabels[measure.value] ||
          getTranslatedValue(mMap[measure.value], locale); // measureLabel(mMap, m)
        measuresMetadata.add(mMap[measure.value]);
        data.children.forEach((d) => {
          const value =
            getTranslatedValue(
              tMap[d.type].items.filter((i) => i.value === d.value)[0],
              locale
            ) || d.value;
          const variables = {};
          Object.keys(d).forEach((k) => {
            variables[k] = d[k];
          });
          variables[d.type] = d.value.toString();
          row["variables"] = variables;
          dimensionsMetadata.add(tMap[d.type]);
          row[value] = d[measure.value];
          keys.add(value);
        });

        series.push({ ...row });
      });
    } else {
      indexBy = data.children[0].type;
      Object.keys(data)
        .filter((k) => measures.indexOf(k) > -1)
        .forEach((k) => {
          const variables = {};
          const row = {};
          categories.add(customLabels[k] || mMap[k]?.label);
          measuresMetadata.add(mMap[k]);
          row["id"] = customLabels[k] || getTranslatedValue(mMap[k], locale);
          row["label"] = customLabels[k] || getTranslatedValue(mMap[k], locale);
          row["position"] =
            mMap && mMap[k] && mMap[k].position ? mMap[k].position : 0;
          row["data"] = data.children.map((d) => {
            const value =
              getTranslatedValue(
                tMap[d.type].items.filter((i) => i.value === d.value)[0],
                locale
              ) || d.value;
            const variables = {};
            Object.keys(d).forEach((k) => {
              variables[k] = d[k];
            });
            variables["value"] = d[k];
            variables[d.type] = d.value.toString();
            dimensionsMetadata.add(tMap[d.type]);
            keys.add(value);
            return {
              x: value,
              y: d[k],
              variables: variables,
            };
          });
          series.push({ ...row, variables, parent_variables: variables });
        });
    }
    const allKeys = Array.from(keys);
    let filtered =
      hiddenBars && series
        ? series.filter((s) => hiddenBars.indexOf(s[indexBy]) == -1)
        : series;

    if (props.sort == "alphabetically") {
      filtered = filtered.sort((a, b) =>
        alphaSort(props.sortreverse, locale, a[indexBy], b[indexBy])
      );
    }
    if (props.sort == "values") {
      filtered = filtered.sort((a, b) => {
        const va = Math.max(...allKeys.map((k) => a[k]));
        const vb = Math.max(...allKeys.map((k) => b[k]));
        return numericSort(props.sortreverse, va, vb);
      });
    }
    options = {
      metadata: data.metadata,
      indexBy,
      categories,
      dimensionsMetadata,
      measuresMetadata,
      keys: allKeys,
      data: filtered,
    };
  }
  return React.Children.map(props.children, (child) =>
    React.cloneElement(child, { options })
  );
};
const Bar2Dimensions = (props) => {
  const {
    data,
    measures,
    includeOverall,
    dimensions,
    hiddenBars,
    colorBy,
    locale,
    customLabels,
  } = props;
  const selectedDimensions = dimensions.filter((f) => f != "");
  let options = {};
  if (includeOverall) {
    includeOverallData(props);
  }

  if (selectedDimensions.length == 0 && data) {
    options = getOptionsNoDimension(props);
  } else if (data && data.children && selectedDimensions.length > 0) {
    const mMap = measuresMap(data);
    const tMap = typesMap(data);
    const field = measures[0];
    const dimensionsMetadata = new Set();
    // const measuresMetadata = new Set()
    const keys = new Set();
    const series = [];
    const vals = [];
    const indexBy = data.children[0].type;
    let total = 0;
    let variables;
    let parentValue;

    data.children.forEach((d) => {
      const row = { variables: {} };
      parentValue =
        getTranslatedValue(
          tMap[d.type] && tMap[d.type].items
            ? tMap[d.type].items.filter((i) => i.value === d.value)[0]
            : d.value,
          locale
        ) || d.value;
      row[d.type] = parentValue;
      row[parentValue] = d[field];
      variables = new Object();
      //variables[d.type] = d.value
      variables[d.type] = parentValue;
      row.parent_variables = variables;

      Object.keys(d).forEach((k) => {
        variables[k] = d[k];
      });

      dimensionsMetadata.add(tMap[d.type]);
      // measuresMetadata.add(mMap[field])

      if (!d.children) {
        keys.add(parentValue);
      }
      if (d.children) {
        //level 2
        d.children.forEach((d1) => {
          variables = new Object();
          dimensionsMetadata.add(tMap[d1.type]);

          const value =
            getTranslatedValue(
              tMap[d1.type] && tMap[d1.type].items
                ? tMap[d1.type].items.filter((i) => i.value === d1.value)[0]
                : d1.value,
              locale
            ) || d1.value;

          variables[d.type] = parentValue;
          variables[d1.type] = value;
          Object.keys(d1).forEach((k) => {
            variables[k] = d1[k];
          });
          row.variables[value] = variables;
          keys.add(value);
          total += d1[field];
          vals.push(d1[field]);
          row[value] = d1[field];
        });
      } else {
        const variables = new Object();
        variables[d.type] = parentValue;
        dimensionsMetadata.add(tMap[d.type]);
        Object.keys(data).forEach((k) => {
          variables[k] = d[k];
        });
        row.variables = variables;
      }
      series.push(row);
    });

    const upperLocale = locale.toUpperCase();

    const filtered =
      colorBy == "id"
        ? series
        : series.filter((s) => hiddenBars.indexOf(s[indexBy]) == -1);
    const allKeys = Array.from(keys);

    //first level sort

    if (props.sort == "alphabetically") {
      filtered.sort((a, b) =>
        alphaSort(props.sortreverse, locale, a[indexBy], b[indexBy])
      );
    } else if (props.sort == "values") {
      filtered.sort((a, b) => {
        if (props.sort2Dimension == "_total") {
          const va = Math.max(...allKeys.map((k) => a[k]));
          const vb = Math.max(...allKeys.map((k) => b[k]));
          return numericSort(props.sortreverse, va, vb);
        } else {
          //props.sort2Dimension is value of category
          ///Keys are labels we need to filter keys using the right label
          if (data?.metadata?.types?.length > 1) {
            const translatedSor2Dimension =
              data?.metadata?.types[1].items.filter((c) => {
                if (
                  props.sort2Dimension === c.value ||
                  (c.labels && c.labels[upperLocale] === props.sort2Dimension)
                ) {
                  return true;
                }
                return false;
              });
            if (translatedSor2Dimension.length > 0) {
              const sortVal = translatedSor2Dimension[0].labels[upperLocale]
                ? translatedSor2Dimension[0].labels[upperLocale]
                : translatedSor2Dimension[0].value;
              const va = Math.max(
                ...allKeys.filter((k) => k === sortVal).map((k) => a[k])
              );
              const vb = Math.max(
                ...allKeys.filter((k) => k === sortVal).map((k) => b[k])
              );
              return numericSort(props.sortreverse, va ? va : 0, vb ? vb : 0);
            }
          }
        }
      });
    }
    const arrayKeys = [...keys];

    //second level sort by position only
    if (data?.metadata?.types?.length > 1) {
      arrayKeys.sort((k1, k2) => {
        const item1 = data.metadata.types[1].items.filter(
          (f) => f.value == k1 || (f.labels && f.labels[upperLocale] == k1)
        );
        const item2 = data.metadata.types[1].items.filter(
          (f) => f.value == k2 || (f.labels && f.labels[upperLocale] == k2)
        );
        const pos1 = item1[0]?.position;
        const pos2 = item2[0]?.position;
        return pos1 - pos2;
      });
    }

    options = {
      metadata: data.metadata,
      dimensionsMetadata,
      indexBy,
      keys:
        colorBy == "index"
          ? arrayKeys
          : arrayKeys.filter((k) => hiddenBars.indexOf(k) == -1),
      data: filtered,
    };
  }

  return (
    <>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, { options })
      )}
    </>
  );
};

const BarData = (props) => {
  const { data, measures, dimensions } = props;
  const copyData = JSON.parse(JSON.stringify(data));
  if (dimensions.length === 1) {
    return <BarOneDimension {...props} data={copyData}></BarOneDimension>;
  } else {
    return <Bar2Dimensions {...props} data={copyData}></Bar2Dimensions>;
  }
};

export default BarData;
