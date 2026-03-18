import React, { useMemo } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
const decodeValue = (value, editing) =>
    editing ? value : decodeURIComponent(value);
const parseJSON = (value, editing) => {
    try {
        return JSON.parse(decodeValue(value, editing));
    } catch {
        return null;
    }
};
const formatNumber = (value, fmt, locale) => {
    if (value === null || value === undefined || value === "") return "–";
    const num = Number(value);
    if (isNaN(num)) return value;
    try {
        const options = {
            style: fmt.style === "compacted" ? "decimal" : (fmt.style || "decimal"),
            notation: fmt.style === "compacted" ? "compact" : "standard",
            minimumFractionDigits: parseInt(fmt.minimumFractionDigits ?? 0),
            maximumFractionDigits: parseInt(fmt.maximumFractionDigits ?? 2),
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
const DataTableInner = ({
    data,
    dimensionKey,
    dimensionHeader,
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
    const rows = useMemo(() => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (data.children && Array.isArray(data.children)) {
            return data.children.map((child) => {
                const row = { ...child };
                if (dimensionKey && dimensionKey !== "none" && !Object.prototype.hasOwnProperty.call(row, dimensionKey)) {
                    row[dimensionKey] = child.value;
                }
                return row;
            });
        }
        return data.data || [];
    }, [data, dimensionKey]);
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
                        <th style={thStyle}>
                            {dimensionHeader || ""}
                        </th>
                        {selectedMeasures.map((m) => (
                            <th key={m.name} style={{ ...thStyle, textAlign: "right" }}>
                                {m.label || m.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIdx) => {
                        const dimValue =
                            dimensionKey && dimensionKey !== "none"
                                ? (row[dimensionKey] ?? row.id ?? "")
                                : rowIdx + 1;
                        const rowBg =
                            stripedRows === "true" || stripedRows === true
                                ? rowIdx % 2 === 0
                                    ? "transparent"
                                    : "rgba(0,0,0,0.03)"
                                : "transparent";
                        return (
                            <tr key={rowIdx} style={{ backgroundColor: rowBg }}>
                                <td style={tdStyle("dimension")}>{String(dimValue)}</td>
                                {selectedMeasures.map((m) => (
                                    <td key={m.name} style={tdStyle("measure")}>
                                        {formatNumber(row[m.name], m.format, locale || intl?.locale)}
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
        "data-dimension-label": dimensionLabel = "",
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
    const csvHeaders = useMemo(() => getCsvHeaders(csv), [csv]);
    const csvDimensionKey = csvHeaders[0] || "none";
    const effectiveDimensionKey = app === "csv" ? csvDimensionKey : dimension1;
    const effectiveDimensionHeader = dimensionLabel || (effectiveDimensionKey !== "none" ? effectiveDimensionKey : "");
    const selectedMeasures = useMemo(() => {
        if (app === "csv" && csvHeaders.length > 0) {
            return csvHeaders.slice(1).map((name) => ({
                name,
                label: name,
                format: { style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 2 },
            }));
        }
        const appMeasures = parsedMeasures[app];
        if (!appMeasures || typeof appMeasures !== "object") return [];
        return Object.entries(appMeasures)
            .filter(([, cfg]) => cfg && cfg.selected)
            .map(([name, cfg]) => ({
                name,
                label: cfg.hasCustomLabel && cfg.customLabel ? cfg.customLabel : (cfg.label || name),
                format: cfg.format || { style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 2 },
            }));
    }, [parsedMeasures, app, csvHeaders]);
    const params = buildParams(parsedFilters, dvzProxyDatasetId);
    const dimensions = [];
    if (effectiveDimensionKey && effectiveDimensionKey !== "none") {
        dimensions.push(effectiveDimensionKey);
    }
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
                store={[app, unique, ...dimensions]}
                source={dimensions.join("/")}
            >
                <DataConsumer>
                    <DataTableInner
                        dimensionKey={effectiveDimensionKey}
                        dimensionHeader={effectiveDimensionHeader}
                        selectedMeasures={selectedMeasures}
                        locale={locale}
                        noDataText={noDataText}
                        headerBgColor={decode(headerBgColor)}
                        headerTextColor={decode(headerTextColor)}
                        stripedRows={stripedRows}
                        borderStyle={borderStyle}
                        fontSize={parseInt(fontSize) || 14}
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
