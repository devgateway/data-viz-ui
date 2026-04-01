import React from "react";
import { getTranslatedValue, measuresMap, typesMap, alphaSort, numericSort, dateSort } from "./Utils";


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
        const label = customLabels[m.value] || getTranslatedValue(mMap[m.value], locale);

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

const LineOneDimension = (props) => {
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
  } else if (data && data.children && data.children.length > 0 && selectedDimensions.length > 0) {
    const mMap = measuresMap(data); //map of measures by label
    const tMap = typesMap(data); //map of dimensions by label
    const categories = new Set();
    const dimensionsMetadata = new Set();
    const measuresMetadata = new Set();
    const keys = new Set();
    const series = [];
    const indexBy = data.children[0].type;

    const firstDimensionItems = data?.metadata?.types?.find(d => d.dimension == selectedDimensions[0])?.items || [];
    if (props.sort == "alphabetically") {
      firstDimensionItems.sort((a, b) =>
        alphaSort(props.sortReverse, locale, a.value, b.value)
      );
    } else if (props.sort == "values") {
      firstDimensionItems.sort((a, b) =>
        numericSort(props.sortReverse, a.value, b.value)
      );
    } else if (props.sort == "date") {
      firstDimensionItems.sort((a, b) =>
        dateSort(props.sortReverse, a.value, b.value)
      );
    }

    measures.forEach(measure => {
      const serie = { variables: {} };
      serie.id = getTranslatedValue(mMap[measure], locale);

      serie.label = customLabels[measure] || getTranslatedValue(mMap[measure], locale);
      const serieData = [];
      firstDimensionItems.forEach(fdi => {// first dimension
        const itemData = data.children.find(c => c.value === fdi.value)
        if (itemData) {
          const variables = {};
          Object.keys(itemData).forEach((k) => {
            variables[k] = itemData[k];
          });
          variables["value"] = itemData[measure];
          variables[itemData.type] = itemData.value.toString();
          dimensionsMetadata.add(tMap[itemData.type]);
          serieData.push({ x: itemData.value, y: itemData[measure], variables: variables });
          serie.data = serieData;
        }
      });
      series.push(serie);
    });

    const allKeys = Array.from(keys);
    let filtered =
      hiddenBars?.length > 0 && series?.length > 0
        ? series.filter((s) => hiddenBars.indexOf(s[indexBy]) == -1)
        : series;

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


const Line2Dimensions = (props) => {
  const {
    data,
    measures,
    includeOverall,
    dimensions,
    hiddenBars,
    colorBy,
    locale,
  } = props;
  const selectedDimensions = dimensions.filter((f) => f != "");
  let options = {};
  if (includeOverall) {
    includeOverallData(props);
  }

  if (selectedDimensions.length == 0 && data) {
    options = getOptionsNoDimension(props);
  } else if (data && data.children && data.children.length > 0 && selectedDimensions.length > 0) {
    const mMap = measuresMap(data);
    const tMap = typesMap(data);
    const field = measures[0];
    const dimensionsMetadata = new Set();
    const measuresMetadata = new Set()
    const keys = []
    const series = [];
    const indexBy = data.children[0]?.type;

    const firstDimensionItems = data?.metadata?.types?.find(d => d.dimension == selectedDimensions[0])?.items || [];

    const secondDimensionItems = data?.metadata?.types?.find(d => d.dimension == selectedDimensions[1])?.items || [];
    if (props.sortSecondDimension == "alphabetically") {
      secondDimensionItems.sort((a, b) =>
        alphaSort(props.sortReverseSecondDimension, locale, a.value, b.value)
      );
    } else if (props.sortSecondDimension == "date") {
      secondDimensionItems.sort((a, b) =>
        dateSort(props.sortReverseSecondDimension, a.value, b.value)
      );
    }

    measuresMetadata.add(mMap[field])

    secondDimensionItems.forEach(sdi => {
      const serie = { variables: {} };
      serie.id = sdi.value;
      serie.label = sdi.value;
      const serieData = [];
      firstDimensionItems.forEach(fdi => {
        const itemData = data.children.find(c => c.value === fdi.value)
        dimensionsMetadata.add(tMap[itemData?.type]);
        const childItemData = itemData?.children.find(c => c.value === sdi.value)
        if (childItemData) {
          dimensionsMetadata.add(tMap[childItemData?.type]);
          const variables = {};
          Object.keys(childItemData).forEach((k) => {
            variables[k] = childItemData[k];
          });
          variables["value"] = childItemData[measures[0]];
          variables[itemData.type] = itemData.value.toString();
          variables[childItemData.type] = childItemData.value.toString();
          serieData.push({ x: itemData.value, y: childItemData[measures[0]], variables });

          if (keys.indexOf(itemData.value) == -1) {
            keys.push(itemData.value);
          }
        }
      })
      serie.data = serieData;
      series.push(serie);
    });

    //add series data for missing keys
    series.forEach((s) => {
      keys.forEach((k) => {
        if (!s.data.find((d) => d.x == k)) {
          s.data.push({ x: k, y: null, variables: {} })
        }
      });
    })

    //sort series by x value
    series.forEach((s) => {
      s.data.sort((a, b) => {
        if (props.sort == "alphabetically") {
          return alphaSort(props.sortReverse, locale, a.x, b.x);
        } else if (props.sort == "date") {
          return dateSort(props.sortReverse, a.x, b.x);
        }
        return 0;
      });
    });

    const filtered =
      colorBy == "id"
        ? series
        : series.filter((s) => hiddenBars.indexOf(s[indexBy]) == -1);
    const arrayKeys = [...keys];

    options = {
      metadata: data.metadata,
      dimensionsMetadata,
      measuresMetadata,
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

const LineData = (props) => {
  const { data, measures, dimensions } = props;
  const copyData = JSON.parse(JSON.stringify(data));
  if (dimensions.length === 1) {
    return <LineOneDimension {...props} data={copyData}></LineOneDimension>;
  } else {
    return <Line2Dimensions {...props} data={copyData}></Line2Dimensions>;
  }
};

export default LineData;
