import React, { useMemo } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";

const defaultFormat = {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
};

const decodeValue = (value, editing) =>
    editing ? value : decodeURIComponent(value);

const parseJSON = (value, editing) => {
    try {
        return JSON.parse(decodeValue(value, editing));
    } catch {
        return null;
    }
};

const formatNumber = (value, fmt = defaultFormat, locale) => {
    if (value === null || value === undefined || value === "") return "–";
    const num = Number(value);
    if (Number.isNaN(num)) return value;
    try {
        const options = {
            style: fmt.style === "compacted" ? "decimal" : (fmt.style || "decimal"),
            notation: fmt.style === "compacted" ? "compact" : "standard",
            minimumFractionDigits: parseInt(fmt.minimumFractionDigits ?? 0, 10),
            maximumFractionDigits: parseInt(fmt.maximumFractionDigits ?? 2, 10),
        };
        if (fmt.style === "currency" && fmt.currency) {
            options.currency = fmt.currency;
        }
        const prefix = fmt.prefix || "";
        const suffix = fmt.suffix || "";
        return `${prefix}${new Intl.NumberFormat(locale, options).format(num)}${suffix}`;
    } catch {
        return String(value);
    }
};

const buildParams = (parsedFilters, dvzProxyDatasetId) => {
    const params = {};
    if (parsedFilters && parsedFilters.forEach) {
        parsedFilters.forEach((f) => {
            if (
                f.value != null &&
                f.value.filter((v) => v != null && v.toString().trim() !== "").length > 0
            ) {
                params[f.param] = f.value;
            }
        });
    }
    if (dvzProxyDatasetId) {
        params.dvzProxyDatasetId = dvzProxyDatasetId;
    }
    return params;
};

const getCsvHeaders = (csv) => {
    const firstLine = csv?.split("\n")[0] || "";
    return firstLine.split(",").map((header) => header.trim()).filter((header) => header.length > 0);
};

const buildDimensionKeys = ({ app, csvHeaders, dimension1, dimension2 }) => {
    const configured = [dimension1, dimension2].filter((dimension) => dimension && dimension !== "none");
    if (configured.length > 0) {
        return configured;
    }
    if (app === "csv" && csvHeaders.length > 0) {
        return [csvHeaders[0]];
    }
    return [];
};

const getNodeDimensionValue = (node) => node?.value ?? node?.id ?? "";

const hasMeaningfulValue = (value) =>
    value !== undefined && value !== null && value !== "";

const appendMetadataPathValues = (path, metadataChildren, dimensionKeys) => {
    const nextPath = [...path];

    const visitChildren = (children) => {
        if (!Array.isArray(children) || nextPath.length >= dimensionKeys.length) {
            return;
        }

        children.forEach((child) => {
            if (!child || typeof child !== "object" || nextPath.length >= dimensionKeys.length) {
                return;
            }

            nextPath.push(getNodeDimensionValue(child));

            if (Array.isArray(child.children) && child.children.length > 0) {
                visitChildren(child.children);
            }
        });
    };

    visitChildren(metadataChildren);

    return nextPath.slice(0, dimensionKeys.length);
};

const flattenHierarchicalRows = (nodes, dimensionKeys, path = []) => {
    if (!Array.isArray(nodes)) {
        return [];
    }
    return nodes.flatMap((node) => {
        if (!node || typeof node !== "object") {
            return [];
        }
        const nextPath = [...path];
        if (path.length < dimensionKeys.length) {
            nextPath[path.length] = getNodeDimensionValue(node);
        }
        if (Array.isArray(node.children) && node.children.length > 0) {
            return flattenHierarchicalRows(node.children, dimensionKeys, nextPath);
        }

        const leafPath = appendMetadataPathValues(nextPath, node.metadata?.children, dimensionKeys);
        const row = { ...node };
        dimensionKeys.forEach((key, index) => {
            if (!key || key === "none") {
                return;
            }

            if (!hasMeaningfulValue(row[key])) {
                row[key] = leafPath[index] ?? "";
            }
        });
        return [row];
    });
};

const normalizeFlatRows = (rows, dimensionKeys) => {
    if (!Array.isArray(rows)) {
        return [];
    }

    return rows.map((row) => {
        if (!row || typeof row !== "object") {
            return row;
        }

        const knownPath = [];

        dimensionKeys.forEach((key) => {
            if (hasMeaningfulValue(row[key])) {
                knownPath.push(row[key]);
            }
        });

        if (knownPath.length === 0 && hasMeaningfulValue(getNodeDimensionValue(row))) {
            knownPath.push(getNodeDimensionValue(row));
        }

        const leafPath = appendMetadataPathValues(knownPath, row.metadata?.children, dimensionKeys);
        const normalizedRow = { ...row };

        dimensionKeys.forEach((key, index) => {
            if (!key || key === "none") {
                return;
            }

            if (!hasMeaningfulValue(normalizedRow[key])) {
                normalizedRow[key] = leafPath[index] ?? "";
            }
        });

        return normalizedRow;
    });
};

const buildRows = (data, dimensionKeys) => {
    if (!data) {
        return [];
    }
    if (Array.isArray(data)) {
        if (data.some((row) => Array.isArray(row?.children) && row.children.length > 0)) {
            return flattenHierarchicalRows(data, dimensionKeys);
        }

        return normalizeFlatRows(data, dimensionKeys);
    }
    if (Array.isArray(data.data)) {
        if (data.data.some((row) => Array.isArray(row?.children) && row.children.length > 0)) {
            return flattenHierarchicalRows(data.data, dimensionKeys);
        }

        return normalizeFlatRows(data.data, dimensionKeys);
    }
    if (Array.isArray(data.children)) {
        return flattenHierarchicalRows(data.children, dimensionKeys);
    }
    return [];
};

const canPivotSecondDimension = (dimensionKeys, selectedMeasures) =>
    selectedMeasures.length === 1 &&
    Array.isArray(dimensionKeys) &&
    dimensionKeys.length > 1 &&
    dimensionKeys[1] &&
    dimensionKeys[1] !== "none";

const mergePivotValues = (currentValue, nextValue) => {
    if (!hasMeaningfulValue(currentValue)) {
        return nextValue;
    }
    if (!hasMeaningfulValue(nextValue)) {
        return currentValue;
    }

    const currentNumber = Number(currentValue);
    const nextNumber = Number(nextValue);

    if (!Number.isNaN(currentNumber) && !Number.isNaN(nextNumber)) {
        return currentNumber + nextNumber;
    }

    return nextValue;
};

const buildTableModel = ({ rows, dimensionKeys, dimensionHeaders, selectedMeasures }) => {
    if (!canPivotSecondDimension(dimensionKeys, selectedMeasures)) {
        return {
            mode: "standard",
            dimensionKeys: dimensionKeys.length > 0 ? dimensionKeys : [null],
            dimensionHeaders: dimensionHeaders.length > 0 ? dimensionHeaders : [""],
        };
    }

    const [rowDimensionKey, pivotDimensionKey] = dimensionKeys;
    const measure = selectedMeasures[0];
    const columns = [];
    const seenColumns = new Set();
    const groupedRows = [];
    const rowMap = new Map();

    rows.forEach((row) => {
        const rowDimensionValue = hasMeaningfulValue(row?.[rowDimensionKey]) ? row[rowDimensionKey] : "";
        const pivotDimensionValue = hasMeaningfulValue(row?.[pivotDimensionKey]) ? row[pivotDimensionKey] : "";

        if (!seenColumns.has(pivotDimensionValue)) {
            seenColumns.add(pivotDimensionValue);
            columns.push(pivotDimensionValue);
        }

        if (!rowMap.has(rowDimensionValue)) {
            const groupedRow = {
                dimensionValue: rowDimensionValue,
                values: new Map(),
            };
            rowMap.set(rowDimensionValue, groupedRow);
            groupedRows.push(groupedRow);
        }

        const groupedRow = rowMap.get(rowDimensionValue);
        groupedRow.values.set(
            pivotDimensionValue,
            mergePivotValues(groupedRow.values.get(pivotDimensionValue), row?.[measure.name]),
        );
    });

    return {
        mode: "pivot",
        rowHeader: dimensionHeaders[0] || rowDimensionKey,
        measure,
        columns,
        rows: groupedRows,
    };
};

const DataTableInner = ({
    data,
    dimensionKeys,
    dimensionHeaders,
    selectedMeasures,
    locale,
    noDataText,
    headerBgColor,
    headerTextColor,
    stripedRows,
    borderStyle,
    fontSize,
    intl,
}) => {
    const rows = useMemo(() => buildRows(data, dimensionKeys), [data, dimensionKeys]);
    const tableModel = useMemo(
        () => buildTableModel({ rows, dimensionKeys, dimensionHeaders, selectedMeasures }),
        [rows, dimensionKeys, dimensionHeaders, selectedMeasures],
    );
    const displayDimensionKeys = tableModel.mode === "standard" ? tableModel.dimensionKeys : [null];
    const displayDimensionHeaders =
        tableModel.mode === "standard" ? tableModel.dimensionHeaders : [tableModel.rowHeader || ""];

    if (!rows || rows.length === 0) {
        return (
            <div className="data-table-no-data" style={{ fontSize: fontSize + "px" }}>
                {noDataText || "No data available"}
            </div>
        );
    }

    const thStyle = {
        backgroundColor: headerBgColor || "#f0f4f8",
        color: headerTextColor || "#2d3748",
        padding: "10px 14px",
        textAlign: "left",
        fontWeight: "600",
        fontSize: fontSize + "px",
        borderBottom: "2px solid #cbd5e0",
        whiteSpace: "nowrap",
    };

    const tdStyle = (col) => ({
        padding: "8px 14px",
        fontSize: fontSize + "px",
        borderBottom: borderStyle === "none" ? "none" : "1px solid #e2e8f0",
        textAlign: col === "dimension" ? "left" : "right",
        verticalAlign: "top",
    });

    return (
        <div className="data-table-wrapper" style={{ overflowX: "auto", width: "100%" }}>
            <table
                className="data-table"
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: fontSize + "px",
                    borderTop: borderStyle !== "none" ? "1px solid #e2e8f0" : "none",
                    borderLeft: borderStyle === "full" ? "1px solid #e2e8f0" : "none",
                    borderRight: borderStyle === "full" ? "1px solid #e2e8f0" : "none",
                }}
            >
                <thead>
                    <tr>
                        {displayDimensionHeaders.map((header, index) => (
                            <th key={`dimension-header-${index}`} style={thStyle}>
                                {header || ""}
                            </th>
                        ))}
                        {tableModel.mode === "pivot"
                            ? tableModel.columns.map((columnValue, index) => (
                                  <th
                                      key={`pivot-column-${index}-${String(columnValue)}`}
                                      style={{ ...thStyle, textAlign: "right" }}
                                  >
                                      {String(columnValue)}
                                  </th>
                              ))
                            : selectedMeasures.map((measure) => (
                                  <th key={measure.name} style={{ ...thStyle, textAlign: "right" }}>
                                      {measure.label || measure.name}
                                  </th>
                              ))}
                    </tr>
                </thead>
                <tbody>
                    {(tableModel.mode === "pivot" ? tableModel.rows : rows).map((row, rowIdx) => {
                        const rowBg =
                            stripedRows === "true" || stripedRows === true
                                ? rowIdx % 2 === 0
                                    ? "transparent"
                                    : "rgba(0,0,0,0.03)"
                                : "transparent";
                        return (
                            <tr key={rowIdx} style={{ backgroundColor: rowBg }}>
                                {displayDimensionKeys.map((dimensionKey, dimensionIndex) => {
                                    const dimensionValue =
                                        tableModel.mode === "pivot"
                                            ? row.dimensionValue
                                            : dimensionKey
                                              ? (row[dimensionKey] ?? "")
                                              : rowIdx + 1;
                                    return (
                                        <td key={`dimension-${dimensionIndex}`} style={tdStyle("dimension")}>
                                            {String(dimensionValue)}
                                        </td>
                                    );
                                })}
                                {tableModel.mode === "pivot"
                                    ? tableModel.columns.map((columnValue, columnIndex) => (
                                          <td
                                              key={`pivot-value-${columnIndex}-${String(columnValue)}`}
                                              style={tdStyle("measure")}
                                          >
                                              {formatNumber(
                                                  row.values.get(columnValue),
                                                  tableModel.measure.format,
                                                  locale || intl?.locale,
                                              )}
                                          </td>
                                      ))
                                    : selectedMeasures.map((measure) => (
                                          <td key={measure.name} style={tdStyle("measure")}>
                                              {formatNumber(
                                                  row[measure.name],
                                                  measure.format,
                                                  locale || intl?.locale,
                                              )}
                                          </td>
                                      ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const DataTable = (props) => {
    const {
        editing = false,
        unique,
        intl,
        "data-app": app = "csv",
        "data-dvz-proxy-dataset-id": dvzProxyDatasetId,
        "data-group": group = "default",
        "data-csv": csv = "",
        "data-dimension1": dimension1 = "none",
        "data-dimension2": dimension2 = "none",
        "data-dimension-label": dimensionLabel = "",
        "data-dimension2-label": dimensionLabel2 = "",
        "data-dimension-label2": previewDimensionLabel2 = "",
        "data-measures": measures = "{}",
        "data-filters": filters = "[]",
        "data-wait-for-filters": waitForFilters = "false",
        "data-no-data-text": noDataText = "No data available",
        "data-header-bg-color": headerBgColor = "#f0f4f8",
        "data-header-text-color": headerTextColor = "#2d3748",
        "data-striped-rows": stripedRows = "true",
        "data-border-style": borderStyle = "rows",
        "data-font-size": fontSize = 14,
        "data-height": height = 400,
    } = props;

    const locale = intl?.locale;
    const decode = (val) => decodeValue(val, editing);
    const parse = (val) => parseJSON(val, editing);
    const parsedMeasures = parse(measures) || {};
    const parsedFilters = parse(filters) || [];
    const effectiveDimensionLabel2 = dimensionLabel2 || previewDimensionLabel2;
    const csvHeaders = useMemo(() => getCsvHeaders(csv), [csv]);
    const effectiveDimensionKeys = useMemo(
        () => buildDimensionKeys({ app, csvHeaders, dimension1, dimension2 }),
        [app, csvHeaders, dimension1, dimension2],
    );
    const dimensionHeaders = useMemo(
        () => {
            const configuredLabels = [dimensionLabel, effectiveDimensionLabel2];
            return effectiveDimensionKeys.map((key, index) => configuredLabels[index] || key);
        },
        [effectiveDimensionKeys, dimensionLabel, effectiveDimensionLabel2],
    );
    const selectedMeasures = useMemo(() => {
        const appMeasures = parsedMeasures[app];
        if (appMeasures && typeof appMeasures === "object") {
            return Object.entries(appMeasures)
                .filter(([name, cfg]) => cfg && cfg.selected && !effectiveDimensionKeys.includes(name))
                .map(([name, cfg], index) => ({
                    name,
                    label: cfg.hasCustomLabel && cfg.customLabel ? cfg.customLabel : (cfg.label || name),
                    format: cfg.format || defaultFormat,
                    order: Number.isFinite(parseInt(cfg.order, 10)) ? parseInt(cfg.order, 10) : index + 1,
                    originalIndex: index,
                }))
                .sort((left, right) => left.order - right.order || left.originalIndex - right.originalIndex)
                .map(({ originalIndex, ...measure }) => measure);
        }
        if (app === "csv" && csvHeaders.length > 0) {
            return csvHeaders
                .filter((name) => !effectiveDimensionKeys.includes(name))
                .map((name, index) => ({
                    name,
                    label: name,
                    format: defaultFormat,
                    order: index + 1,
                }));
        }
        return [];
    }, [parsedMeasures, app, csvHeaders, effectiveDimensionKeys]);
    const params = buildParams(parsedFilters, dvzProxyDatasetId);

    return (
        <div
            className="data-table-component"
            style={{ maxHeight: height + "px", overflowY: "auto" }}
        >
            <DataProvider
                editing={editing}
                params={params}
                waitForFilters={waitForFilters === "true"}
                app={app}
                group={group}
                csv={csv}
                store={[app, unique, ...effectiveDimensionKeys]}
                source={effectiveDimensionKeys.join("/")}
            >
                <DataConsumer>
                    <DataTableInner
                        dimensionKeys={effectiveDimensionKeys}
                        dimensionHeaders={dimensionHeaders}
                        selectedMeasures={selectedMeasures}
                        locale={locale}
                        noDataText={noDataText}
                        headerBgColor={decode(headerBgColor)}
                        headerTextColor={decode(headerTextColor)}
                        stripedRows={stripedRows}
                        borderStyle={borderStyle}
                        fontSize={parseInt(fontSize, 10) || 14}
                        intl={intl}
                    />
                </DataConsumer>
            </DataProvider>
        </div>
    );
};

const mapStateToProps = () => ({});
const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DataTable));
