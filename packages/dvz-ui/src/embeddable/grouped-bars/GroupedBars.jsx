import React, { useRef, useState } from "react";
import { Container } from "semantic-ui-react";
import DataProvider from "../data/DataProvider.jsx";
import DataConsumer from "../data/DataConsumer.jsx";
import { connect } from "react-redux";
import { alphaSort } from "../utils/common.js";
import { formatContent } from "../common/ChartTooltip.jsx";

const DEFAULT_NO_DATA_MESSAGE = "No data matches your selection";
const DEFAULT_NO_DATA_TEXT = "-";
const DEFAULT_TEXT_COLOR = "#5a5d68";
const DEFAULT_BACKGROUND_COLOR = "none";
const DEFAULT_FONT_SIZE = 14;
const DEFAULT_BAR_COLOR = "#3182ce";
const DEFAULT_BAR_BACKGROUND_COLOR = "none";

const decodeValue = (value, editing) => {
    return editing ? value : decodeURIComponent(value);
};

const parseJSON = (value, editing) => {
    try {
        return JSON.parse(decodeValue(value, editing));
    } catch (error) {
        console.error("Error parsing value:", value, error);
        return null;
    }
};

const createNumberFormat = (formatObject) => {
    if (!formatObject) {
        return {
            notation: "standard",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            prefix: '',
            suffix: ''
        };
    }

    return {
        style: formatObject.style === 'compacted' ? 'decimal' : formatObject.style,
        notation: formatObject.style === 'compacted' ? 'compact' : 'standard',
        currency: formatObject.currency,
        minimumFractionDigits: parseInt(formatObject.minimumFractionDigits),
        maximumFractionDigits: parseInt(formatObject.maximumFractionDigits),
        prefix: formatObject.prefix || '',
        suffix: formatObject.suffix || ''
    };
};

// Extract a list of selected measures and their specific formats
const extractSelectedMeasures = (parsedMeasures, fallbackFormat, app, useCustomMeasureFormats = true) => {
    const selected = [];
    if (!parsedMeasures) return selected;

    const proxy = parsedMeasures[app];
    if (proxy && typeof proxy === 'object') {
        Object.entries(proxy).forEach(([name, cfg]) => {
            if (cfg && cfg.selected) {
                const fmt = useCustomMeasureFormats
                    ? createNumberFormat(cfg.format || fallbackFormat)
                    : fallbackFormat;

                const label = (cfg && typeof cfg.customLabel === 'string' && cfg.customLabel.trim().length > 0)
                    ? cfg.customLabel.trim()
                    : name;
                selected.push({ name, format: fmt, label });
            }
        });
    }

    // Fallback to the primary measure if none explicitly selected
    if (selected.length === 0) {
        const primary = Array.isArray(parsedMeasures)
            ? parsedMeasures[0]
            : parsedMeasures['0'];
        if (primary) {
            selected.push({ name: primary, format: fallbackFormat, label: primary });
        }
    }
    return selected;
};

const buildParams = (filters, dvzProxyDatasetId) => {
    const params = {};
    const parsedFilters = filters || [];

    if (parsedFilters.forEach) {
        parsedFilters.forEach(filter => {
            if (filter.value?.filter(v => v != null && v.toString().trim() !== "").length > 0) {
                params[filter.param] = filter.value;
            }
        });
    }

    if (dvzProxyDatasetId) {
        params.dvzProxyDatasetId = dvzProxyDatasetId;
    }

    return params;
};

const getDimensions = (dimension1) => {
    const dimensions = [];
    if (dimension1 && dimension1 !== "none") {
        dimensions.push(dimension1);
    }
    return dimensions;
};

const BarItem = ({ 
    dimensionValue, 
    measureValue, 
    barWidth, 
    barColor, 
    barBackgroundColor,
    textColor, 
    fontSize, 
    format, 
    labelPosition,
    valuePosition,
    labelWidth,
    labelHeight,
    labelFormat,
    vars,
    intl 
}) => {    
    
    const labelStyle = {
        fontSize: fontSize + 'px',
        color: textColor,
        width: `${labelWidth}%`,              
        flex: `0 0 ${labelWidth}%`,            
        whiteSpace: 'normal',         
        wordBreak: 'break-word',
        overflow: 'hidden',
        lineHeight: '1.2',
        display: 'flex',              
        alignItems: 'center',    
        height: labelHeight + 'px'           
    }; 

    let lformat = decodeURIComponent(labelFormat);
    let labelString = formatContent(lformat, vars ? vars : {value: dimensionValue}, intl);
    if (labelPosition === 'left') {      
        return (
            <div className="grouped-bar-item" style={{ marginBottom: "10px" }}>
                <div style={{ 
                    display: "flex", 
                    alignItems: "flex-start",    // allow taller label without shrinking bar
                    gap: "12px"
                }}>
                    <div className="grouped-bar-label" style={labelStyle} dangerouslySetInnerHTML={{__html: labelString}}>
                    </div>
                    <div 
                        className="grouped-bar-bar-container" 
                        style={{ 
                            backgroundColor: barBackgroundColor, 
                            height: "32px", 
                            borderRadius: "8px", 
                            overflow: "hidden", 
                            position: "relative",
                            flex: "1",
                            minWidth: 0            // allow flex container to shrink properly
                        }}
                    >
                        <div 
                            className="grouped-bar-bar" 
                            style={{ 
                                width: barWidth + '%', 
                                backgroundColor: barColor, 
                                height: "100%", 
                                display: "flex", 
                                alignItems: "center", 
                                paddingLeft: "8px",
                                paddingRight: "8px"
                            }}
                        >
                            <span style={{ 
                                color: "#ffffff", 
                                fontSize: "14px", 
                                fontWeight: "500",
                                whiteSpace: "nowrap"
                            }}>
                                {valuePosition === 'bar' 
                                    ? `${format.prefix}${new Intl.NumberFormat(intl.locale, format).format(measureValue)}${format.suffix}`
                                    : `${barWidth.toFixed(1)}%`
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grouped-bar-item" style={{ marginBottom: "10px" }}>
            <div style={{ 
                display: "flex", 
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "6px"
            }}>
                <div className="grouped-bar-label" style={labelStyle} dangerouslySetInnerHTML={{__html: labelString}}>
                </div>
                {valuePosition === 'top' && (
                    <div 
                        className="grouped-bar-measure" 
                        style={{ 
                            fontSize: fontSize + 'px', 
                            color: textColor,
                            whiteSpace: "nowrap",
                            flex: "1",
                            textAlign: "right"
                        }}
                    >
                        {format.prefix}
                        {new Intl.NumberFormat(intl.locale, format).format(measureValue)}
                        {format.suffix}
                    </div>
                )}
            </div>
            <div 
                className="grouped-bar-bar-container" 
                style={{ 
                    backgroundColor: barBackgroundColor, 
                    height: "32px", 
                    borderRadius: "8px", 
                    overflow: "hidden", 
                    position: "relative" 
                }}
            >
                <div 
                    className="grouped-bar-bar" 
                    style={{ 
                        width: barWidth + '%', 
                        backgroundColor: barColor, 
                        height: "100%", 
                        display: "flex", 
                        alignItems: "center", 
                        paddingLeft: "8px",
                        paddingRight: "8px"
                    }}
                >
                    <span style={{ 
                        color: "#ffffff", 
                        fontSize: "14px", 
                        fontWeight: "500",
                        whiteSpace: "nowrap"
                    }}>
                        {valuePosition === 'bar' 
                            ? `${format.prefix}${new Intl.NumberFormat(intl.locale, format).format(measureValue)}${format.suffix}`
                            : `${barWidth.toFixed(1)}%`
                        }
                    </span>
                </div>
            </div>
        </div>
    );
};


const NoDataDisplay = ({ textColor, message = "No data to display" }) => {
    return (
        <div className="grouped-bars-data-frame">
            <div className="no-data-text" style={{ color: textColor }}>
                {message}
            </div>
        </div>
    );
};

// Render one dimension label with multiple bars (one per selected measure)
const BarGroup = ({
    dimensionValue,
    measureEntries,
    mainEntry,
    barBackgroundColor,
    textColor,
    fontSize,
    labelPosition,
    labelWidth,
    labelHeight,
    labelFormat,
    vars,
    intl,
    valuePosition,
    format,
    showMeasureLabels = false
}) => {
    const labelStyle = {
        fontSize: fontSize + 'px',
        color: textColor,
        width: `${labelWidth}%`,
        flex: `0 0 ${labelWidth}%`,
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        overflow: 'hidden',
        lineHeight: '1.2',
        display: 'flex',
        alignItems: 'center',
        height: labelHeight + 'px'
    };

    const lformat = decodeURIComponent(labelFormat || '');
    const labelString = formatContent(lformat, vars ? vars : { value: dimensionValue }, intl);

    const isSingleMeasure = Array.isArray(measureEntries) && measureEntries.length === 1 && !mainEntry;
    const topValueNode = (valuePosition === 'top' && isSingleMeasure)
        ? (
            <div
                className="grouped-bar-measure"
                style={{
                    fontSize: fontSize + 'px',
                    color: textColor,
                    whiteSpace: 'nowrap',
                    flex: '1',
                    textAlign: 'right'
                }}
            >
                {format.prefix}
                {new Intl.NumberFormat(intl.locale, format).format(measureEntries[0].value)}
                {format.suffix}
            </div>
        ) : null;

    const barsStack = (
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
            {measureEntries.map((entry, idx) => (
                <div
                    key={`${dimensionValue}-${entry.name}-${idx}`}
                    className="grouped-bar-bar-container"
                    style={{
                        backgroundColor: barBackgroundColor,
                        height: '28px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <div
                        className="grouped-bar-bar"
                        style={{
                            width: entry.width + '%',
                            backgroundColor: entry.color,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '8px',
                            paddingRight: '8px'
                        }}
                    >
                        <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: '500', whiteSpace: 'nowrap' }}>
                            {showMeasureLabels ? (
                                <>
                                    {(entry.label || entry.name)}
                                    {((entry.label && entry.label !== entry.name) ? ' ' : ': ')}
                                </>
                            ) : null}
                            {valuePosition === 'bar'
                                ? `${entry.format?.prefix || ''}${new Intl.NumberFormat(intl.locale, entry.format || format).format(entry.value)}${entry.format?.suffix || ''}`
                                : `${(entry.width || 0).toFixed(1)}%`}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );

    const mainColumn = mainEntry ? (
        <div
            className="grouped-bar-main"
            style={{
                flex: '0 0 140px',
                backgroundColor: (mainEntry.color || barBackgroundColor),
                borderRadius: '8px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 0
            }}
        >
            <span style={{
                color: textColor,
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: 1,
                whiteSpace: 'nowrap'
            }}>
                {mainEntry.format?.prefix || ''}
                {new Intl.NumberFormat(intl.locale, mainEntry.format || format).format(mainEntry.value)}
                {mainEntry.format?.suffix || ''}
            </span>
            <span style={{
                color: textColor,
                fontSize: fontSize + 'px',
                fontWeight: 500,
                lineHeight: 1.2,
                marginTop: 6,
                textAlign: 'center',
                whiteSpace: 'nowrap'
            }}>
                {mainEntry.label || mainEntry.name}
            </span>
        </div>
    ) : null;

    if (labelPosition === 'left') {
        return (
            <div className="grouped-bar-item" style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div className="grouped-bar-label" style={labelStyle} dangerouslySetInnerHTML={{ __html: labelString }} />
                    {mainColumn}
                    {barsStack}
                </div>
            </div>
        );
    }

    // Default/top label rendering: label above the stack
    return (
        <div className="grouped-bar-item" style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '6px' }}>
                <div className="grouped-bar-label" style={labelStyle} dangerouslySetInnerHTML={{ __html: labelString }} />
                {topValueNode}
            </div>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: '12px' }}>
                {mainColumn}
                {barsStack}
            </div>
        </div>
    );
};


const DataFrame = (props) => {
    const { 
        app, 
        measure,        
        dimension1,
        data,
        format,
        textColor,
        fontSize,
        intl,
        manualColors,
        defaultBarColor,
        barBackgroundColor,
        labelPosition,
        valuePosition,
        labelWidth,
        labelHeight,
        labelFormat,
        sorting,
        sortDirection,
        topN,
        barSizeCriteria,
        selectedMeasures,
        mainMeasureName,
        barSizeUseGroup = false,
        showMeasureLabels = false
    } = props;

    
    const processData = () => {
        if (!data) return { dataItems: [], measureField: null, dimensionField: null };

        if (app === "csv") {
            const { data: json, meta: { fields } } = data;
            const dimensionField = fields[0];
            const measureField = fields[1];
            
            const dataItems = data.data.map(d => ({
                value: d[dimensionField],
                [measureField]: d[measureField],
                [dimensionField]: d[dimensionField]
            }));

            return { dataItems, measureField, dimensionField };
        } else {
            const children = data.children || [];
            const measureField = measure;
            const dimensionField = dimension1;

            const dataItems = children.map(d => ({
                value: d.value,
                [measureField]: d[measureField],
                [dimensionField]: d.value,
                vars: {...d}
            }));

            return { dataItems, measureField, dimensionField };
        }
    };

    const { dataItems: rawDataItems, measureField, dimensionField } = processData();

    // Prepare selected measures list (multi-measure support)
    const selected = (selectedMeasures && selectedMeasures.length > 0)
        ? selectedMeasures
        : (measureField ? [{ name: measureField, format: format }] : (measure ? [{ name: measure, format: format }] : []));

    // Apply sorting (support multi-measure by using first selected measure when needed)
    let dataItems;
    if (sorting === 'measure') {
        // Prefer main measure for sorting when in multi-measure mode
        const sortMeasure = mainMeasureName || measureField || (selected[0] ? selected[0].name : null);
        dataItems = rawDataItems.sort((a, b) => {
            const aValue = sortMeasure
                ? (((a.vars && a.vars[sortMeasure]) ?? a[sortMeasure] ?? 0))
                : 0;
            const bValue = sortMeasure
                ? (((b.vars && b.vars[sortMeasure]) ?? b[sortMeasure] ?? 0))
                : 0;
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        });
    } else if (sorting === 'dimension') {
        dataItems = rawDataItems.sort((a, b) => {
            return sortDirection === 'asc'
                ? alphaSort(false, intl.locale, a.value, b.value)
                : alphaSort(true, intl.locale, a.value, b.value);
        });
    } else {
        dataItems = rawDataItems;
    }

    // Apply Top N selection rules
    // - Single measure: keep first N after current sorting (existing behavior)
    // - Multiple measures with a main measure: select top N by main measure values, then keep current sorting among those
    // - Multiple measures without a main measure: ignore Top N
    if (topN && !isNaN(parseInt(topN))) {
        const n = parseInt(topN);
        if (n > 0) {
            if (selected.length <= 1) {
                dataItems = dataItems.slice(0, n);
            } else if (mainMeasureName) {
                // Determine top N items based on main measure values (descending)
                const ranked = [...rawDataItems].sort((a, b) => {
                    const aVal = ((a.vars && a.vars[mainMeasureName]) ?? a[mainMeasureName] ?? 0) || 0;
                    const bVal = ((b.vars && b.vars[mainMeasureName]) ?? b[mainMeasureName] ?? 0) || 0;
                    return bVal - aVal;
                });
                const allowed = new Set(
                    ranked.slice(0, n).map(item => item[dimensionField])
                );
                dataItems = dataItems.filter(item => allowed.has(item[dimensionField]));
            }
            // else: no main measure -> ignore Top N
        }
    }

    // Calculate totals and maxima for multi-measure scaling
    const barTotal = dataItems.reduce((acc, item) => acc + (item[measureField] || 0), 0);
    const maxMeasure = Math.max(...dataItems.map(i => i[measureField] || 0));
    const measureTotals = {};
    selected.forEach(sm => {
        measureTotals[sm.name] = dataItems.reduce((acc, item) => {
            const v = (item.vars && item.vars[sm.name]) ?? item[sm.name] ?? 0;
            return acc + (v || 0);
        }, 0);
    });
    const globalMax = Math.max(
        0,
        ...selected.flatMap(sm => dataItems.map(item => ((item.vars && item.vars[sm.name]) ?? item[sm.name] ?? 0)))
    );

    const globalTotal = Object.values(measureTotals).reduce((acc, val) => acc + val, 0);

    //group totals - total of all measures, grouped by dimension
    const groupTotals = {};
    dataItems.forEach(item => {
        const dimValue = item[dimensionField];
        groupTotals[dimValue] = 0;
        selected.forEach(sm => {
            const v = (item.vars && item.vars[sm.name]) ?? item[sm.name] ?? 0;
            groupTotals[dimValue] += (v || 0);
        });
    });

    // group max across selected measures within the row
    const groupMaxByDim = {};
    dataItems.forEach(item => {
        const dimValue = item[dimensionField];
        const values = selected.map(sm => {
            const v = (item.vars && item.vars[sm.name]) ?? item[sm.name] ?? 0;
            return v || 0;
        });
        groupMaxByDim[dimValue] = values.length > 0 ? Math.max(...values) : 0;
    });
    

    // Handle no data case
    if (dataItems.length === 0 || !dimensionField || (selected.length === 0 && !measureField)) {
        return <NoDataDisplay textColor={textColor} />;
    }

    // Get bar color: prefer measure-based, then dimension-based, then default
    const getBarColor = (measureName, dimensionValue) => {
        const mode = props.manualColorsMode || 'dimension';
        const appColors = manualColors?.[app] || {};
        if (mode === 'measure') {
            if (appColors.measures && appColors.measures[measureName]) {
                return appColors.measures[measureName];
            }
            // Optional fallback to dimension color if measure not set
            if (dimensionValue && appColors[dimensionValue]) {
                return appColors[dimensionValue];
            }
            return defaultBarColor;
        }
        // mode === 'dimension'
        if (dimensionValue && appColors[dimensionValue]) {
            return appColors[dimensionValue];
        }
        // Optional fallback to measure color if dimension not set
        if (appColors.measures && appColors.measures[measureName]) {
            return appColors.measures[measureName];
        }
        return defaultBarColor;
    };

    return (
        <div className="grouped-bars-data-frame">
            {dataItems.map((item, index) => {
                const dimensionValue = item[dimensionField];

                // Build entries for all selected measures
                const allEntries = selected.map(sm => {
                    const rawVal = (item.vars && item.vars[sm.name]) ?? item[sm.name] ?? 0;
                    const mVal = typeof rawVal === 'number' ? rawVal : (parseFloat(rawVal) || 0);
                    let width = 0;
                    if (barSizeCriteria === 'percentage') {
                        if (selected.length > 1) {
                            if (barSizeUseGroup) {
                                const groupTotal = groupTotals[dimensionValue] || 0;
                                width = groupTotal > 0 ? (mVal / groupTotal) * 100 : 0;
                            } else {
                                // Global percentage across all selected measures and rows
                                const total = globalTotal || 0;
                                width = total > 0 ? (mVal / total) * 100 : 0;
                            }
                        } else {
                            // Single-measure percentage: use the measure's global total
                            const total = measureTotals[sm.name] || 0;
                            width = total > 0 ? (mVal / total) * 100 : 0;
                        }
                    } else if (barSizeCriteria === 'relative_max') {
                        if (selected.length > 1 && barSizeUseGroup) {
                            const groupMax = groupMaxByDim[dimensionValue] || 0;
                            width = groupMax > 0 ? (mVal / groupMax) * 100 : 0;
                        } else {
                            width = globalMax > 0 ? (mVal / globalMax) * 100 : 0;
                        }
                    } else {
                        // default fall-back
                        width = globalMax > 0 ? (mVal / globalMax) * 100 : 0;
                    }
                    width = Math.max(0, Math.min(100, width));
                    const color = getBarColor(sm.name, dimensionValue);
                    return { name: sm.name, label: sm.label || sm.name, value: mVal, width, color, format: sm.format || format };
                });

                const mainEntry = mainMeasureName
                    ? allEntries.find(e => e.name === mainMeasureName)
                    : null;
                let measureEntries = mainEntry
                    ? allEntries.filter(e => e.name !== mainMeasureName)
                    : allEntries;

                // When sorting by measure, also sort bars within each group by their values
                if (sorting === 'measure') {
                    measureEntries = [...measureEntries].sort((a, b) =>
                        sortDirection === 'asc' ? (a.value - b.value) : (b.value - a.value)
                    );
                }

                return (
                    <BarGroup
                        key={`${dimensionValue}-${index}`}
                        dimensionValue={dimensionValue}
                        measureEntries={measureEntries}
                        mainEntry={mainEntry}
                        barBackgroundColor={barBackgroundColor}
                        textColor={textColor}
                        fontSize={fontSize}
                        labelPosition={labelPosition}
                        valuePosition={valuePosition}
                        format={format}
                        labelWidth={labelWidth}
                        labelHeight={labelHeight}
                        labelFormat={labelFormat}
                        vars={item.vars}
                        intl={intl}
                        showMeasureLabels={showMeasureLabels}
                    />
                );
            })}
        </div>
    );
};

const Chart = (props) => {
    const {
        editing = false,
        unique,
        intl,
        "data-csv": csv = "",
        "data-dvz-proxy-dataset-id": dvzProxyDatasetId,
        "data-no-data-message": noDataMsg = DEFAULT_NO_DATA_MESSAGE,
        "data-view-mode": editMode = 'info',
        'data-height': height,
        'data-app': app,
        'data-measures': measures = '{}',
        'data-format': format = '{}',
        'data-group': group,
        'data-filters': filters = '[]',
        'data-text-color': textColor = DEFAULT_TEXT_COLOR,
        'data-back-ground-color': backgroundColor = DEFAULT_BACKGROUND_COLOR,
        'data-font-size': fontSize = DEFAULT_FONT_SIZE,
        'data-dimension1': dimension1,
        "data-wait-for-filters": waitForFilters = "false",
        "data-no-data-text": noDataText = DEFAULT_NO_DATA_TEXT,
        "data-manual-colors": manualColors = "{}",
        "data-default-bar-color": defaultBarColor = DEFAULT_BAR_COLOR,
        "data-bar-background-color": barBackgroundColor = DEFAULT_BAR_BACKGROUND_COLOR,
        "data-label-position": labelPosition,
        "data-value-position": valuePosition,
        "data-label-width": labelWidth,
        "data-label-height": labelHeight,
        "data-label-format": labelFormat,
        "data-sorting": sorting,
        "data-sort-direction": sortDirection,
        "data-top-n": topN,
        "data-bar-size-criteria": barSizeCriteria,
        "data-main-measure": mainMeasureProp,
        "data-show-measure-labels": showMeasureLabelsProp,
        "data-bar-size-use-group": barSizeUseGroupProp,
        "data-enable-manual-colors": enableManualColorsProp,
        "data-manual-colors-mode": manualColorsModeProp,
    } = props;

    
    const ref = useRef(null);
    const [mode, setMode] = useState(editMode);
    
    const viewMode = editing ? editMode : mode;
    const contentHeight = editing ? height - 80 : height - 40;
   
    const formatObject = parseJSON(format, editing);
    const numberFormat = createNumberFormat(formatObject);
    const parsedFilters = parseJSON(filters, editing);
    const parsedMeasures = parseJSON(measures, editing);    
    const parsedManualColorsRaw = parseJSON(manualColors, editing);

    // Compute selected measures (names + formats) and pass to DataFrame
    const selectedMeasures = extractSelectedMeasures(parsedMeasures, numberFormat, app, (props["data-enable-custom-measure-formats"] === "true"));

    // Determine effective main measure from WordPress block prop
    const selectedNames = selectedMeasures.map(sm => sm.name);
    const decodedMainProp = (typeof mainMeasureProp === 'string' && mainMeasureProp.length > 0) ? decodeValue(mainMeasureProp) : null;
    const normalizedMain = decodedMainProp && decodedMainProp.toLowerCase() === 'none' ? null : (decodedMainProp || null);
    const effectiveMainMeasure = selectedMeasures.length > 1
        ? (normalizedMain === null ? null : (selectedNames.includes(normalizedMain) ? normalizedMain : selectedNames[0]))
        : null;

    const params = buildParams(parsedFilters, dvzProxyDatasetId);
    const dimensions = getDimensions(dimension1);
    const effectiveBarSizeCriteria = barSizeCriteria;
    const barSizeUseGroup = barSizeUseGroupProp === "true";
    const enableManualColors = enableManualColorsProp === "true";
    const manualColorsMode = manualColorsModeProp || 'dimension';

    // interpret showMeasureLabels flag
    const showMeasureLabels = showMeasureLabelsProp === "true";

    return (
        <div ref={ref}>
            <Container 
                className={`chart container grouped-bars-container ${editing ? 'editing' : ''}`}
                style={{ height: height + 'px', backgroundColor }}
                fluid
            >
                {/* Main measure configured via WordPress block; no local dropdown */}
                <DataProvider
                    style={{ height: `${contentHeight}px` }}
                    params={params}
                    app={app}
                    group={group}
                    csv={csv}
                    editing={editing}
                    waitForFilters={waitForFilters === "true"}
                    store={[app, unique, ...dimensions]}
                    source={dimensions.join("/")}
                >
                    <DataConsumer>
                        <DataFrame
                            editing={editing}
                            locale={intl.locale}
                            intl={intl}
                            app={app}
                            format={numberFormat}
                            dimension1={dimension1}
                            manualColors={enableManualColors ? parsedManualColorsRaw : {}}
                            manualColorsMode={manualColorsMode}
                            measure={selectedMeasures.length === 1 ? selectedMeasures[0]?.name : null}                           
                            fontSize={fontSize}
                            textColor={decodeValue(textColor)}
                            backGroundColor={decodeValue(backgroundColor)}
                            noDataText={noDataText}
                            defaultBarColor={decodeValue(defaultBarColor)}
                            barBackgroundColor={decodeValue(barBackgroundColor)}
                            labelPosition={labelPosition}
                            valuePosition={selectedMeasures.length > 1 ? 'bar' : valuePosition}
                            labelWidth={labelWidth}
                            labelHeight={labelHeight}
                            labelFormat={labelFormat}
                            sorting={sorting}
                            sortDirection={sortDirection}
                            topN={topN}
                            barSizeCriteria={effectiveBarSizeCriteria}
                            barSizeUseGroup={barSizeUseGroup}
                            selectedMeasures={selectedMeasures}
                            mainMeasureName={effectiveMainMeasure}
                            showMeasureLabels={showMeasureLabels}
                            />
                    </DataConsumer>
                </DataProvider>
            </Container>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const { "data-app": app, "data-group": group } = ownProps;
    const injectedMeasures = state.getIn(['data', 'measures', app, group]);
    
    return injectedMeasures ? { injectedMeasures } : {};
};

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(Chart);