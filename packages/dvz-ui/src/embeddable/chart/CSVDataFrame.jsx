import React from "react";
import * as d3 from "d3";
import { alphaSort, dateSort, numericSort } from "./data/Utils";

const LineData = ({ children, data }) => {
  const {
    data: json,
    meta: { fields },
  } = data;
  const index = fields[0];
  const keys = fields.slice(1).filter((f) => !f.startsWith("_"));

  const chartData = keys.map((k) => {
    const row = {};
    row["id"] = k;
    row["data"] = json.map((j) => {
      const variables = {};
      Object.keys(j).forEach((k) => {
        variables[k] = j[k];
      });
      return {
        x: j[fields[0]],
        y: j[k],
        variables: { ...variables, field: k },
      };
    });

    return row;
  });

  /*
    const chartData = json.map(j => {
        const row = {}
        const variables={}

        row["id"] = j[fields[1]]
        row["data"] = fields.slice(1).filter(f=>!f.startsWith("_")).map(f => {
            Object.keys(j).forEach(k => {
                variables[k] = j[k]
            })
            return {"x": f, "y": j[f],variables:{...variables,field:f}}
        })

        return row
    })
*/

  const options = {
    indexBy: "id",
    keys: keys,
    data: chartData,
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { options })
  );
};
const PieData = ({ children, data }) => {
  const {
    data: json,
    meta: { fields },
  } = data;
  const index = fields[0];
  const keys = data.data.map((d) => d.ID);

  const chartData = json.map((j) => {
    const row = {};
    const variables = {};
    Object.keys(j).forEach((k) => {
      variables[k] = j[k];
    });
    variables["field"] = fields[1];
    row["variables"] = variables;
    row["id"] = j[fields[0]];
    row["label"] = j[fields[0]];
    row["value"] = j[fields[1]];
    return row;
  });

  const options = {
    keys,
    indexBy: "id",
    data: chartData,
  };
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { options })
  );
};
const BumpData = ({ children, data }) => {
  const {
    data: json,
    meta: { fields },
  } = data;
  const index = fields[0];
  const keys = fields.slice(1).filter((f) => !f.startsWith("_"));

  const chartData = json.map((j) => {
    const row = {};
    const variables = {};
    Object.keys(j).forEach((k) => {
      variables[k] = j[k];
    });

    row["id"] = j[fields[0]];
    row["data"] = fields
      .slice(1)
      .filter((f) => !f.startsWith("_"))
      .map((f) => {
        return { x: f, y: j[f] };
      });

    return row;
  });

  const options = {
    data: chartData,
  };
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { options })
  );
};
const BarData = ({ children, data, measures }) => {
  const {
    data: json,
    meta: { fields },
  } = data;

  const index = fields[0];
  const keys =
    measures && measures.length > 0
      ? measures
      : fields.slice(1).filter((f) => !f.startsWith("_"));

  const options = {
    indexBy: index,
    keys: keys,
    data: json,
  };
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { options })
  );
};

const SunburstData = ({ children, data }) => {
  const {
    data: json,
    meta: { fields },
  } = data;

  const hierarchyFields = fields.slice(0, Math.max(fields.length - 1, 1));
  const valueField = fields[fields.length - 1];
  const root = { id: "root", name: "Total", children: [] };

  root.variables = {
    label: "Total",
    name: "Total",
    category: "Total",
    path: "Total",
    depth: 0,
  };

  const getOrCreateChild = (children = [], label, id, path = [], depth = 0) => {
    let child = children.find((item) => item.id === id);
    if (!child) {
      child = {
        id,
        name: label,
        children: [],
        variables: {
          label,
          name: label,
          category: label,
          path: path.join(" / "),
          depth,
        },
      };
      children.push(child);
    }
    return child;
  };

  json.forEach((row, rowIndex) => {
    let cursor = root;
    const currentPath = ["Total"];

    hierarchyFields.forEach((field, fieldIndex) => {
      const label = row[field];
      if (label === undefined || label === null || label === "") {
        return;
      }

      currentPath.push(String(label));
      const childId = `${field}:${label}:${rowIndex}:${fieldIndex}`;
      const isLeaf = fieldIndex === hierarchyFields.length - 1;
      const child = getOrCreateChild(
        cursor.children,
        String(label),
        isLeaf ? childId : `${field}:${label}`,
        [...currentPath],
        fieldIndex + 1,
      );

      if (isLeaf) {
        child.loc = Number(row[valueField]) || 0;
        child.variables = {
          ...row,
          label: String(label),
          name: String(label),
          category: String(label),
          field: valueField,
          value: child.loc,
          path: currentPath.join(" / "),
          depth: fieldIndex + 1,
        };
        delete child.children;
      }

      cursor = child;
    });
  });

  const options = {
    indexBy: "id",
    keys: fields,
    data: root,
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { options })
  );
};

const HeatmapData = ({ children, data }) => {
  const {
    data: json,
    meta: { fields },
  } = data;

  const [rowField, columnField, valueField] = fields;
  const rowMap = new Map();
  const columns = [];

  json.forEach((row, rowIndex) => {
    const rowLabel = row?.[rowField];
    const columnLabel = row?.[columnField];
    const numericValue = Number(row?.[valueField]);

    if (rowLabel === undefined || rowLabel === null || rowLabel === "") {
      return;
    }

    if (columnLabel === undefined || columnLabel === null || columnLabel === "") {
      return;
    }

    const normalizedRowLabel = String(rowLabel);
    const normalizedColumnLabel = String(columnLabel);
    if (!rowMap.has(normalizedRowLabel)) {
      rowMap.set(normalizedRowLabel, { id: normalizedRowLabel, data: new Map() });
    }

    if (!columns.includes(normalizedColumnLabel)) {
      columns.push(normalizedColumnLabel);
    }

    rowMap.get(normalizedRowLabel).data.set(normalizedColumnLabel, {
      x: normalizedColumnLabel,
      y: Number.isFinite(numericValue) ? numericValue : null,
      variables: {
        ...row,
        label: `${normalizedRowLabel} / ${normalizedColumnLabel}`,
        category: normalizedRowLabel,
        row: normalizedRowLabel,
        column: normalizedColumnLabel,
        rowLabel: normalizedRowLabel,
        columnLabel: normalizedColumnLabel,
        field: valueField,
        value: Number.isFinite(numericValue) ? numericValue : null,
        measureLabel: valueField,
      },
    });
  });

  const options = {
    indexBy: "id",
    keys: columns,
    columns,
    rowDimension: rowField,
    columnDimension: columnField,
    measureLabel: valueField,
    data: Array.from(rowMap.values()).map((row) => ({
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
            field: valueField,
            value: null,
            measureLabel: valueField,
          },
        },
      ),
    })),
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { options })
  );
};

const sortIntervalRows = ({ rows, sort, sortReverse }) => {
  const sortedRows = [...rows];

  if (sort === "alphabetically") {
    sortedRows.sort((left, right) =>
      alphaSort(sortReverse, "en", left.label || left.id, right.label || right.id),
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

const sortDumbbellRows = ({ rows, sort, sortReverse }) => {
  const sortedRows = [...rows];

  if (sort === "alphabetically") {
    sortedRows.sort((left, right) =>
      alphaSort(sortReverse, "en", left.label || left.id, right.label || right.id),
    );
  } else if (sort === "date") {
    sortedRows.sort((left, right) => dateSort(sortReverse, left.label, right.label));
  } else if (sort === "values") {
    sortedRows.sort((left, right) => numericSort(sortReverse, left.delta, right.delta));
  } else if (sortReverse) {
    sortedRows.reverse();
  }

  return sortedRows;
};

const IntervalPlotData = ({ children, data, sort, sortReverse }) => {
  const {
    data: json,
    meta: { fields },
  } = data;

  const [labelField, centerField, lowField, highField] = fields;
  const rows = json
    .map((row, rowIndex) => {
      const label = row?.[labelField] ?? `Item ${rowIndex + 1}`;
      const center = Number(row?.[centerField]);
      const low = Number(row?.[lowField]);
      const high = Number(row?.[highField]);

      if (!Number.isFinite(center) || !Number.isFinite(low) || !Number.isFinite(high)) {
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
          label: normalizedLabel,
          category: normalizedLabel,
          field: centerField,
          value: center,
          center,
          low: resolvedLow,
          high: resolvedHigh,
          centerLabel: centerField,
          lowLabel: lowField,
          highLabel: highField,
        },
      };
    })
    .filter(Boolean);

  const sortedRows = sortIntervalRows({ rows, sort, sortReverse });
  const options = {
    indexBy: "id",
    keys: sortedRows.map((row) => row.id),
    colorKeys: sortedRows.map((row) => row.id),
    colorData: sortedRows,
    colorIndexBy: "id",
    data: sortedRows,
    measureLabels: {
      center: centerField,
      low: lowField,
      high: highField,
    },
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { options })
  );
};

const WaterfallData = ({ children, data }) => {
  const {
    data: json,
    meta: { fields },
  } = data;

  const [labelField, valueField, typeField] = fields;
  let cumulative = 0;

  const chartData = json
    .map((row, rowIndex) => {
      const label = row?.[labelField] ?? `Step ${rowIndex + 1}`;
      const value = Number(row?.[valueField]);
      if (!Number.isFinite(value)) {
        return null;
      }

      const rawType = typeField ? String(row?.[typeField] ?? "").trim().toLowerCase() : "";
      const kind = ["total", "subtotal", "start", "end"].includes(rawType)
        ? "total"
        : value < 0
          ? "decrease"
          : "increase";
      const start = kind === "total" ? 0 : cumulative;
      const end = kind === "total" ? value : cumulative + value;
      cumulative = end;

      return {
        id: String(label),
        label: String(label),
        value,
        start,
        end,
        kind,
        variables: {
          ...row,
          label: String(label),
          category: String(label),
          field: valueField,
          value,
          start,
          end,
          changeType: kind,
          stepType: kind,
          measureLabel: valueField,
        },
      };
    })
    .filter(Boolean);

  const options = {
    indexBy: "id",
    keys: ["increase", "decrease", "total"],
    data: chartData,
    measureLabels: {
      value: valueField,
    },
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { options })
  );
};

const DumbbellData = ({ children, data, sort, sortReverse }) => {
  const {
    data: json,
    meta: { fields },
  } = data;

  const [labelField, leftField, rightField] = fields;
  const rows = json
    .map((row, rowIndex) => {
      const label = row?.[labelField] ?? `Item ${rowIndex + 1}`;
      const left = Number(row?.[leftField]);
      const right = Number(row?.[rightField]);

      if (!Number.isFinite(left) || !Number.isFinite(right)) {
        return null;
      }

      return {
        id: String(label),
        label: String(label),
        left,
        right,
        value: right,
        delta: right - left,
        variables: {
          ...row,
          label: String(label),
          category: String(label),
          field: rightField,
          value: right,
          left,
          right,
          delta: right - left,
          leftLabel: leftField,
          rightLabel: rightField,
        },
      };
    })
    .filter(Boolean);

  const sortedRows = sortDumbbellRows({ rows, sort, sortReverse });
  const options = {
    indexBy: "id",
    keys: [leftField, rightField],
    colorKeys: [leftField, rightField],
    colorData: [{ id: leftField }, { id: rightField }],
    colorIndexBy: "id",
    data: sortedRows,
    measureLabels: {
      left: leftField,
      right: rightField,
    },
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { options })
  );
};

const HistogramData = ({ children, data }) => {
  const {
    data: json,
    meta: { fields },
  } = data;

  const [labelField, valueField, thirdField, fourthField] = fields;
  const observations = json
    .map((row, rowIndex) => {
      const value = Number(row?.[valueField]);
      if (!Number.isFinite(value)) {
        return null;
      }

      const thirdValue = thirdField ? row?.[thirdField] : null;
      const fourthValue = fourthField ? Number(row?.[fourthField]) : null;
      const inferredWeight =
        thirdField && thirdValue != null && Number.isFinite(Number(thirdValue)) && !fourthField
          ? Number(thirdValue)
          : null;
      const series =
        thirdField && (!Number.isFinite(Number(thirdValue)) || fourthField)
          ? String(thirdValue)
          : valueField;
      const weight = Number.isFinite(fourthValue)
        ? fourthValue
        : Number.isFinite(inferredWeight)
          ? inferredWeight
          : 1;

      return {
        label: row?.[labelField] ?? `Observation ${rowIndex + 1}`,
        value,
        series,
        weight,
      };
    })
    .filter(Boolean);

  const values = observations.map((item) => item.value);
  const binCount = Math.max(5, Math.min(20, Math.ceil(Math.sqrt(values.length || 1))));
  const bins = d3.bin().thresholds(binCount)(values);
  const seriesKeys = Array.from(new Set(observations.map((item) => item.series)));

  const options = {
    indexBy: "label",
    keys: seriesKeys,
    colorKeys: seriesKeys,
    colorData: seriesKeys.map((key) => ({ id: key })),
    colorIndexBy: "id",
    data: bins.map((bin, index) => {
      const binStart = bin.x0 ?? 0;
      const binEnd = bin.x1 ?? binStart;
      const isLastBin = index === bins.length - 1;
      const row = {
        id: `${binStart}-${binEnd}`,
        label: `${binStart} – ${binEnd}`,
        binStart,
        binEnd,
      };

      seriesKeys.forEach((seriesKey) => {
        row[seriesKey] = observations
          .filter((item) => {
            const inLowerBound = item.value >= binStart;
            const inUpperBound = isLastBin ? item.value <= binEnd : item.value < binEnd;
            return item.series === seriesKey && inLowerBound && inUpperBound;
          })
          .reduce((sum, item) => sum + item.weight, 0);
      });

      return row;
    }),
    measureLabels: {
      value: valueField,
    },
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { options })
  );
};

const ScatterData = ({ children, data }) => {
  const {
    data: json,
    meta: { fields },
  } = data;

  const [labelField, xField, yField, sizeField, seriesField] = fields;
  const seriesMap = new Map();
  const flatPoints = [];

  json.forEach((row, rowIndex) => {
    const x = Number(row?.[xField]);
    const y = Number(row?.[yField]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }

    const pointLabel = row?.[labelField] ?? `Point ${rowIndex + 1}`;
    const seriesId = seriesField && row?.[seriesField] ? row[seriesField] : yField;
    const point = {
      x,
      y,
      size: sizeField ? Number(row?.[sizeField]) : null,
      label: pointLabel,
      id: pointLabel,
      value: y,
      variables: {
        ...row,
        label: pointLabel,
        category: pointLabel,
        field: yField,
        x,
        y,
        value: y,
        series: seriesId,
        ...(sizeField ? { size: Number(row?.[sizeField]) } : {}),
      },
    };

    if (!seriesMap.has(seriesId)) {
      seriesMap.set(seriesId, { id: seriesId, label: seriesId, data: [] });
    }

    seriesMap.get(seriesId).data.push(point);
    flatPoints.push({ label: pointLabel, seriesId, ...point });
  });

  const options = {
    indexBy: "label",
    keys: Array.from(seriesMap.keys()),
    colorIndexBy: "label",
    colorKeys: Array.from(seriesMap.keys()),
    colorData: flatPoints,
    data: Array.from(seriesMap.values()).map((series) => ({
      ...series,
      data: [...series.data].sort((left, right) => left.x - right.x),
    })),
    xMeasure: xField,
    yMeasure: yField,
    sizeMeasure: sizeField || null,
    measureLabels: {
      x: xField,
      y: yField,
      size: sizeField || null,
    },
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { options })
  );
};

const CSVDataFrame = ({ children, data, keys, type, measures, sort, sortReverse }) => {
  if (type == "bar") {
    return (
      <BarData data={data} keys={keys} measures={measures}>
        {children}
      </BarData>
    );
  }
  if (type == "line") {
    return (
      <LineData data={data} keys={keys} measures={measures}>
        {children}
      </LineData>
    );
  }

  if (type == "bump") {
    return (
      <BumpData data={data} keys={keys} measures={measures}>
        {children}
      </BumpData>
    );
  }
  if (type == "waterfall") {
    return (
      <WaterfallData data={data} keys={keys} measures={measures}>
        {children}
      </WaterfallData>
    );
  }
  if (type == "dumbbell") {
    return (
      <DumbbellData data={data} keys={keys} measures={measures} sort={sort} sortReverse={sortReverse}>
        {children}
      </DumbbellData>
    );
  }
  if (type == "histogram") {
    return (
      <HistogramData data={data} keys={keys} measures={measures}>
        {children}
      </HistogramData>
    );
  }
  if (type == "pie") {
    return (
      <PieData data={data} keys={keys} measures={measures}>
        {children}
      </PieData>
    );
  }
  if (type == "radar") {
    return (
      <BarData data={data} keys={keys} measures={measures}>
        {children}
      </BarData>
    );
  }

  if (type == "diverging") {
    return (
      <BarData data={data} keys={keys} measures={measures}>
        {children}
      </BarData>
    );
  }

  if (type == "sunburst") {
    return (
      <SunburstData data={data} keys={keys} measures={measures}>
        {children}
      </SunburstData>
    );
  }

  if (type == "scatter") {
    return (
      <ScatterData data={data} keys={keys} measures={measures}>
        {children}
      </ScatterData>
    );
  }

  if (type == "heatmap") {
    return (
      <HeatmapData data={data} keys={keys} measures={measures}>
        {children}
      </HeatmapData>
    );
  }

  if (type == "intervalPlot") {
    return (
      <IntervalPlotData
        data={data}
        keys={keys}
        measures={measures}
        sort={sort}
        sortReverse={sortReverse}
      >
        {children}
      </IntervalPlotData>
    );
  }

  return null;
};

export default CSVDataFrame;
