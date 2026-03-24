import React, { useEffect, useMemo, useState } from "react";
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

const toBoolean = (value) => value === true || value === "true";

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

const compareTableValues = (left, right, locale) => {
    const leftHasValue = hasMeaningfulValue(left);
    const rightHasValue = hasMeaningfulValue(right);

    if (!leftHasValue && !rightHasValue) {
        return 0;
    }
    if (!leftHasValue) {
        return 1;
    }
    if (!rightHasValue) {
        return -1;
    }

    const leftString = String(left).trim();
    const rightString = String(right).trim();
    const leftNumber = Number(left);
    const rightNumber = Number(right);

    if (
        leftString !== "" &&
        rightString !== "" &&
        !Number.isNaN(leftNumber) &&
        !Number.isNaN(rightNumber)
    ) {
        return leftNumber - rightNumber;
    }

    return String(left).localeCompare(String(right), locale || undefined, {
        numeric: true,
        sensitivity: "base",
    });
};

const getNextSortDirection = (currentDirection) => {
    if (currentDirection === "asc") {
        return "desc";
    }
    if (currentDirection === "desc") {
        return null;
    }
    return "asc";
};

const getSortIndicator = (direction) => {
    if (direction === "asc") {
        return "↑";
    }
    if (direction === "desc") {
        return "↓";
    }
    return "↕";
};

const getSortAriaValue = (direction) => {
    if (direction === "asc") {
        return "ascending";
    }
    if (direction === "desc") {
        return "descending";
    }
    return "none";
};

const escapeCsvCell = (value) => {
    const normalizedValue = value === null || value === undefined ? "" : String(value);
    if (/[,"\n\r]/.test(normalizedValue)) {
        return `"${normalizedValue.replace(/"/g, '""')}"`;
    }
    return normalizedValue;
};

const buildCsvContent = (rows) => rows.map((row) => row.map(escapeCsvCell).join(",")).join("\n");

const sanitizeFilename = (value) => {
    const normalizedValue = String(value || "data-table")
        .trim()
        .replace(/[^a-z0-9-_]+/gi, "-")
        .replace(/^-+|-+$/g, "");

    return normalizedValue || "data-table";
};

const isValidSortDirection = (value) => value === "asc" || value === "desc";

const parseSortColumnToken = (value) => {
    if (!value || typeof value !== "string" || !value.includes(":")) {
        return null;
    }

    const separatorIndex = value.indexOf(":");
    const columnType = value.slice(0, separatorIndex);
    const columnKey = value.slice(separatorIndex + 1);

    if (!columnType || !columnKey) {
        return null;
    }

    return {
        columnType,
        columnKey,
    };
};

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

const getRowSortValue = ({ row, rowIndex, tableModel, sortConfig }) => {
    if (!sortConfig) {
        return undefined;
    }

    if (tableModel.mode === "pivot") {
        if (sortConfig.columnType === "dimension") {
            return row.dimensionValue;
        }
        if (sortConfig.columnType === "pivot") {
            return row.values.get(sortConfig.columnKey);
        }
        return undefined;
    }

    if (sortConfig.columnType === "dimension") {
        return sortConfig.columnKey ? row?.[sortConfig.columnKey] : rowIndex + 1;
    }
    if (sortConfig.columnType === "measure") {
        return row?.[sortConfig.columnKey];
    }

    return undefined;
};

const buildExportMatrix = ({
    tableModel,
    tableRows,
    displayDimensionKeys,
    displayDimensionHeaders,
    selectedMeasures,
    locale,
    intl,
}) => {
    const headerRow =
        tableModel.mode === "pivot"
            ? [tableModel.rowHeader || "", ...tableModel.columns.map((columnValue) => String(columnValue))]
            : [
                  ...displayDimensionHeaders.map((header) => header || ""),
                  ...selectedMeasures.map((measure) => measure.label || measure.name),
              ];

    const bodyRows = tableRows.map((row, rowIdx) => {
        if (tableModel.mode === "pivot") {
            return [
                row.dimensionValue,
                ...tableModel.columns.map((columnValue) =>
                    formatNumber(
                        row.values.get(columnValue),
                        tableModel.measure.format,
                        locale || intl?.locale,
                    ),
                ),
            ];
        }

        return [
            ...displayDimensionKeys.map((dimensionKey) =>
                dimensionKey ? row?.[dimensionKey] ?? "" : rowIdx + 1,
            ),
            ...selectedMeasures.map((measure) =>
                formatNumber(row?.[measure.name], measure.format, locale || intl?.locale),
            ),
        ];
    });

    return [headerRow, ...bodyRows];
};

const buildResolvedDefaultSortConfig = ({
    defaultSortColumn,
    defaultSortDirection,
    tableModel,
    dimensionKeys,
    selectedMeasures,
}) => {
    if (!isValidSortDirection(defaultSortDirection)) {
        return null;
    }

    const parsedToken = parseSortColumnToken(defaultSortColumn);
    if (!parsedToken) {
        return null;
    }

    if (parsedToken.columnType === "dimension") {
        if (tableModel.mode === "pivot") {
            return dimensionKeys[0] === parsedToken.columnKey
                ? {
                      scope: tableModel.mode,
                      columnType: "dimension",
                      columnKey: null,
                      direction: defaultSortDirection,
                  }
                : null;
        }

        return dimensionKeys.includes(parsedToken.columnKey)
            ? {
                  scope: tableModel.mode,
                  columnType: "dimension",
                  columnKey: parsedToken.columnKey,
                  direction: defaultSortDirection,
              }
            : null;
    }

    if (parsedToken.columnType === "measure" && tableModel.mode === "standard") {
        return selectedMeasures.some((measure) => measure.name === parsedToken.columnKey)
            ? {
                  scope: tableModel.mode,
                  columnType: "measure",
                  columnKey: parsedToken.columnKey,
                  direction: defaultSortDirection,
              }
            : null;
    }

    if (parsedToken.columnType === "pivot" && tableModel.mode === "pivot") {
        return tableModel.columns.includes(parsedToken.columnKey)
            ? {
                  scope: tableModel.mode,
                  columnType: "pivot",
                  columnKey: parsedToken.columnKey,
                  direction: defaultSortDirection,
              }
            : null;
    }

    return null;
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
    editing,
    showExportButton,
    exportFileNameBase,
    defaultSortColumn,
    defaultSortDirection,
}) => {
    const [sortConfig, setSortConfig] = useState(null);
    const [hasUserSorted, setHasUserSorted] = useState(false);
    const [hoveredSortKey, setHoveredSortKey] = useState(null);
    const rows = useMemo(() => buildRows(data, dimensionKeys), [data, dimensionKeys]);
    const tableModel = useMemo(
        () => buildTableModel({ rows, dimensionKeys, dimensionHeaders, selectedMeasures }),
        [rows, dimensionKeys, dimensionHeaders, selectedMeasures],
    );
    const displayDimensionKeys = tableModel.mode === "standard" ? tableModel.dimensionKeys : [null];
    const displayDimensionHeaders =
        tableModel.mode === "standard" ? tableModel.dimensionHeaders : [tableModel.rowHeader || ""];
    const resolvedDefaultSortConfig = useMemo(
        () =>
            buildResolvedDefaultSortConfig({
                defaultSortColumn,
                defaultSortDirection,
                tableModel,
                dimensionKeys,
                selectedMeasures,
            }),
        [defaultSortColumn, defaultSortDirection, tableModel, dimensionKeys, selectedMeasures],
    );

    useEffect(() => {
        if (editing || !hasUserSorted) {
            setSortConfig(resolvedDefaultSortConfig);
        }
    }, [resolvedDefaultSortConfig, hasUserSorted, editing]);

    const displayedRows = useMemo(() => {
        const tableRows = tableModel.mode === "pivot" ? tableModel.rows : rows;

        if (!sortConfig?.direction) {
            return tableRows;
        }

        return tableRows
            .map((row, index) => ({ row, index }))
            .sort((left, right) => {
                const comparison = compareTableValues(
                    getRowSortValue({
                        row: left.row,
                        rowIndex: left.index,
                        tableModel,
                        sortConfig,
                    }),
                    getRowSortValue({
                        row: right.row,
                        rowIndex: right.index,
                        tableModel,
                        sortConfig,
                    }),
                    locale || intl?.locale,
                );

                if (comparison === 0) {
                    return left.index - right.index;
                }

                return sortConfig.direction === "desc" ? comparison * -1 : comparison;
            })
            .map(({ row }) => row);
    }, [rows, tableModel, sortConfig, locale, intl]);
    const exportMatrix = useMemo(
        () =>
            buildExportMatrix({
                tableModel,
                tableRows: displayedRows,
                displayDimensionKeys,
                displayDimensionHeaders,
                selectedMeasures,
                locale,
                intl,
            }),
        [
            tableModel,
            displayedRows,
            displayDimensionKeys,
            displayDimensionHeaders,
            selectedMeasures,
            locale,
            intl,
        ],
    );

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

    const sortButtonStyle = (textAlign) => ({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: textAlign === "right" ? "flex-end" : "flex-start",
        gap: "6px",
        width: "100%",
        padding: "4px 6px",
        margin: 0,
        border: "none",
        borderRadius: "6px",
        background: "transparent",
        color: "inherit",
        font: "inherit",
        fontWeight: "inherit",
        cursor: "pointer",
        transition: "background-color 120ms ease, box-shadow 120ms ease, color 120ms ease",
    });

    const sortIndicatorStyle = (isActive, isHovered) => ({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: `${Math.max(fontSize + 4, 18)}px`,
        height: `${Math.max(fontSize + 4, 18)}px`,
        padding: "0 4px",
        borderRadius: "999px",
        opacity: isActive || isHovered ? 1 : 0,
        visibility: isActive || isHovered ? "visible" : "hidden",
        fontSize: `${Math.max(fontSize - 1, 12)}px`,
        lineHeight: 1,
        backgroundColor: isActive ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)",
        boxShadow: isHovered ? "inset 0 0 0 1px rgba(255,255,255,0.24)" : "none",
        transition: "opacity 120ms ease, visibility 120ms ease, box-shadow 120ms ease",
    });

    const exportButtonStyle = {
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #cbd5e0",
        backgroundColor: "#ffffff",
        color: "#1a202c",
        fontSize: `${Math.max(fontSize - 1, 12)}px`,
        fontWeight: 600,
        cursor: "pointer",
    };

    const handleSortToggle = (scope, columnType, columnKey) => {
        setHasUserSorted(true);
        setSortConfig((currentSort) => {
            const isSameColumn =
                currentSort?.scope === scope &&
                currentSort?.columnType === columnType &&
                currentSort?.columnKey === columnKey;
            const nextDirection = getNextSortDirection(
                isSameColumn ? currentSort?.direction : null,
            );

            if (!nextDirection) {
                return null;
            }

            return {
                scope,
                columnType,
                columnKey,
                direction: nextDirection,
            };
        });
    };

    const getColumnSortDirection = (scope, columnType, columnKey) =>
        sortConfig?.scope === scope &&
        sortConfig?.columnType === columnType &&
        sortConfig?.columnKey === columnKey
            ? sortConfig.direction
            : null;

    const getSortKey = (scope, columnType, columnKey) =>
        `${scope}:${columnType}:${columnKey === null ? "__null__" : String(columnKey)}`;

    const renderHeaderContent = ({ scope, columnType, columnKey, label, textAlign = "left" }) => {
        const direction = getColumnSortDirection(scope, columnType, columnKey);

        const nextDirection = getNextSortDirection(direction);
        const accessibleLabel = String(
            label ||
                intl?.formatMessage({
                    id: "dataTable.column",
                    defaultMessage: "Column",
                }) ||
                "Column",
        );
        const nextDirectionLabel =
            nextDirection === null
                ? intl?.formatMessage({
                      id: "dataTable.clearSorting",
                      defaultMessage: "clear sorting",
                  }) || "clear sorting"
                : nextDirection === "desc"
                ? intl?.formatMessage({
                      id: "dataTable.descending",
                      defaultMessage: "descending",
                  }) || "descending"
                : intl?.formatMessage({
                      id: "dataTable.ascending",
                      defaultMessage: "ascending",
                  }) || "ascending";
        const ariaLabel =
            intl?.formatMessage(
                {
                    id: "dataTable.sortToggle",
                    defaultMessage: "Sort by {column} {direction}",
                },
                {
                    column: accessibleLabel,
                    direction: nextDirectionLabel,
                },
            ) || `Sort by ${accessibleLabel} ${nextDirectionLabel}`;
        const sortKey = getSortKey(scope, columnType, columnKey);
        const isHovered = hoveredSortKey === sortKey;
        const isActive = direction === "asc" || direction === "desc";

        return (
            <button
                type="button"
                onClick={() => handleSortToggle(scope, columnType, columnKey)}
                onMouseEnter={() => setHoveredSortKey(sortKey)}
                onMouseLeave={() => setHoveredSortKey((currentKey) => currentKey === sortKey ? null : currentKey)}
                onFocus={() => setHoveredSortKey(sortKey)}
                onBlur={() => setHoveredSortKey((currentKey) => currentKey === sortKey ? null : currentKey)}
                aria-label={ariaLabel}
                style={{
                    ...sortButtonStyle(textAlign),
                    backgroundColor: isHovered ? "rgba(255,255,255,0.12)" : "transparent",
                    boxShadow: isHovered ? "inset 0 0 0 1px rgba(255,255,255,0.2)" : "none",
                }}
            >
                <span>{label || ""}</span>
                <span aria-hidden="true" style={sortIndicatorStyle(isActive, isHovered)}>
                    {getSortIndicator(direction)}
                </span>
            </button>
        );
    };

    const handleExport = () => {
        if (exportMatrix.length <= 1 || typeof window === "undefined") {
            return;
        }

        const csvContent = buildCsvContent(exportMatrix);
        const blob = new Blob([`\uFEFF${csvContent}`], {
            type: "text/csv;charset=utf-8;",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `${sanitizeFilename(exportFileNameBase)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="data-table-wrapper" style={{ overflowX: "auto", width: "100%" }}>
            {showExportButton && exportMatrix.length > 1 && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
                    <button type="button" onClick={handleExport} style={exportButtonStyle}>
                        {intl?.formatMessage({
                            id: "dataTable.exportCsv",
                            defaultMessage: "Export CSV",
                        }) || "Export CSV"}
                    </button>
                </div>
            )}
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
                            <th
                                key={`dimension-header-${index}`}
                                style={thStyle}
                                aria-sort={getSortAriaValue(
                                    getColumnSortDirection(
                                        tableModel.mode,
                                        "dimension",
                                        displayDimensionKeys[index],
                                    ),
                                )}
                            >
                                {renderHeaderContent({
                                    scope: tableModel.mode,
                                    columnType: "dimension",
                                    columnKey: displayDimensionKeys[index],
                                    label: header || "",
                                })}
                            </th>
                        ))}
                        {tableModel.mode === "pivot"
                            ? tableModel.columns.map((columnValue, index) => (
                                  <th
                                      key={`pivot-column-${index}-${String(columnValue)}`}
                                      style={{ ...thStyle, textAlign: "right" }}
                                      aria-sort={getSortAriaValue(
                                          getColumnSortDirection(
                                              tableModel.mode,
                                              "pivot",
                                              columnValue,
                                          ),
                                      )}
                                  >
                                      {renderHeaderContent({
                                          scope: tableModel.mode,
                                          columnType: "pivot",
                                          columnKey: columnValue,
                                          label: String(columnValue),
                                          textAlign: "right",
                                      })}
                                  </th>
                              ))
                            : selectedMeasures.map((measure) => (
                                  <th
                                      key={measure.name}
                                      style={{ ...thStyle, textAlign: "right" }}
                                      aria-sort={getSortAriaValue(
                                          getColumnSortDirection(
                                              tableModel.mode,
                                              "measure",
                                              measure.name,
                                          ),
                                      )}
                                  >
                                      {renderHeaderContent({
                                          scope: tableModel.mode,
                                          columnType: "measure",
                                          columnKey: measure.name,
                                          label: measure.label || measure.name,
                                          textAlign: "right",
                                      })}
                                  </th>
                              ))}
                    </tr>
                </thead>
                <tbody>
                    {displayedRows.map((row, rowIdx) => {
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
        "data-show-export-button": showExportButton = "false",
        "data-export-file-name": exportFileName = "",
        "data-default-sort-column": defaultSortColumn = "",
        "data-default-sort-direction": defaultSortDirection = "none",
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
                        editing={editing}
                        showExportButton={toBoolean(showExportButton)}
                        exportFileNameBase={decode(exportFileName) || group || "data-table"}
                        defaultSortColumn={decode(defaultSortColumn)}
                        defaultSortDirection={decode(defaultSortDirection)}
                    />
                </DataConsumer>
            </DataProvider>
        </div>
    );
};

const mapStateToProps = () => ({});
const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DataTable));
