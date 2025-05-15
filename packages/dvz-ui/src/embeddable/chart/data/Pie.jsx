import React from "react";

import { measuresMap, typesMap, getTranslatedValue } from "./Utils";

export const PieData = (props) => {
  const { children, data, measures, locale, customLabels } = props;
  const dimensionsMetadata = new Set();
  const measuresMetadata = new Set();
  const mMap = measuresMap(data);

  const varValues = {};
  if (data && data.children) {
    const values = [];
    const tMap = typesMap(data);
    const keys = [];
   
    data.children.forEach((d) => {
      dimensionsMetadata.add(tMap[d.type]);
      if (d.children) {
        d.children.forEach((d1) => {
          const row = new Object();
          const variables = new Object();        

          variables[d.type] =
            getTranslatedValue(
              tMap[d.type].items.filter((i) => i.value === d.value)[0],
              locale
            ) || d.value;
          variables[d1.type] =
            getTranslatedValue(
              tMap[d1.type].items.filter((i) => i.value === d1.value)[0],
              locale
            ) || d1.value;

          Object.keys(d1).forEach((k) => {
            variables[k] = d1[k];
          });
          row.id =
            getTranslatedValue(
              tMap[d.type].items.filter((i) => i.value === d.value)[0],
              locale
            ) +
            " - " +
            getTranslatedValue(
              tMap[d1.type].items.filter((i) => i.value === d1.value)[0],
              locale
            );          

          keys.push(d.value + " - " + d1.value);
          row.value = d1[measures[0]];
          row.label =
            getTranslatedValue(
              tMap[d.type].items.filter((i) => i.value === d.value)[0],
              locale
            ) +
            " - " +
            getTranslatedValue(
              tMap[d1.type].items.filter((i) => i.value === d1.value)[0],
              locale
            ); //Male /African ect (dimension value)
          row.variables = variables;
          values.push(row);

          //Add metadata for second dimension                 
          let metadata = Array.from(dimensionsMetadata).find(i => i.dimension === d1.type) || { ...tMap[d1.type] };

          if (!Array.from(dimensionsMetadata).some(i => i.dimension === d1.type)) {
            dimensionsMetadata.add(metadata);
          }
          
          let metaItem = metadata.items.find(i => i.id === row.id) || {
            dimension: d1.type,
            type: d1.type,
            categoryStyle: { color: '#484848' },
            position: 0,
            labels: {},
            code: row.id,
            value: row.id,
            id: row.id
          };
          
          if (!metadata.items.some(i => i.id === row.id)) {
            metadata.items.push(metaItem);
          }
        });
      } else {
        const category = tMap[d.type].items.filter(
          (i) => i.value === d.value
        )[0];
        const row = new Object();
        const variables = new Object();
        variables[d.type] = getTranslatedValue(category, locale) || d.value;
        Object.keys(data).forEach((k) => {
          variables[k] = d[k];
        });

        dimensionsMetadata.add(tMap[d.type]);
        row.id = getTranslatedValue(category, locale) || d.value;
        row.label = getTranslatedValue(category, locale) || d.value;
        row.position = category.position || 0;
        row.value = d[measures[0]];
        row.variables = variables;
        values.push(row);
      }
    });

    const options = {
      indexBy: "id",
      keys: [],
      measuresMetadata,
      dimensionsMetadata,
      data: values.sort((d1, d2) => d2.value - d1.value),
      metadata: data.metadata,
    };
    return React.Children.map(children, (child) =>
      React.cloneElement(child, { options })
    );
  } else {
    const selectedMeasures = data.metadata.measures.filter((m) =>
      measures.includes(m.value)
    );
    const values = [];

    const variables = {};
    Object.keys(data).forEach((k) => {
      variables[k] = data[k];
    });

    selectedMeasures.forEach((m) => {
      const row = {};
      row.type = "measure";
      row["measureFieldName"] = m.value;
      row["id"] =
        customLabels[m.value] || getTranslatedValue(mMap[m.value], locale);
      row["position"] = m.position;
      row["label"] =
        customLabels[m.value] || getTranslatedValue(mMap[m.value], locale);
      row["value"] = data[m.value];
      row.variables = variables;
      values.push(row);
    });

    const options = {
      indexBy: "id",
      keys: [],
      measuresMetadata,
      dimensionsMetadata,
      data: values.sort((d1, d2) => d2.value - d1.value),
      metadata: data.metadata,
    };

    //No dimensions selected
    return React.Children.map(children, (child) =>
      React.cloneElement(child, { options })
    );
  }
};

export default PieData;
