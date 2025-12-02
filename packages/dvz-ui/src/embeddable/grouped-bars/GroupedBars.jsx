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
        height: '32px'           
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
        labelFormat
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

    const dataItems = rawDataItems.length > 0 
        ? rawDataItems.sort((a, b) => alphaSort(false, intl.locale, a.value, b.value))
        : [];

    // Calculate total for percentage
    const barTotal = dataItems.reduce((acc, item) => acc + (item[measureField] || 0), 0);

    // Handle no data case
    if (dataItems.length === 0 || !measureField || !dimensionField) {
        return <NoDataDisplay textColor={textColor} />;
    }

    // Get bar color
    const getBarColor = (dimensionValue) => {
        if (dimensionValue && manualColors?.[app]?.[dimensionValue]) {
            return manualColors[app][dimensionValue];
        }
        return defaultBarColor;
    };

    return (
        <div className="grouped-bars-data-frame">
            {dataItems.map((item, index) => {
                const measureValue = item[measureField];
                const dimensionValue = item[dimensionField];
                const barWidth = measureValue && barTotal ? (measureValue / barTotal) * 100 : 0;
                const barColor = getBarColor(dimensionValue);

                return (
                    <BarItem
                        key={`${dimensionValue}-${index}`}
                        dimensionValue={dimensionValue}
                        measureValue={measureValue}
                        barWidth={barWidth}
                        barColor={barColor}
                        barBackgroundColor={barBackgroundColor}
                        textColor={textColor}
                        fontSize={fontSize}
                        format={format}
                        intl={intl}
                        labelPosition={labelPosition}
                        valuePosition={valuePosition}
                        labelWidth={labelWidth}
                        labelFormat={labelFormat}
                        vars={item.vars}
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
        "data-label-format": labelFormat
    } = props;

    
    const ref = useRef(null);
    const [mode, setMode] = useState(editMode);
    
    const viewMode = editing ? editMode : mode;
    const contentHeight = editing ? height - 80 : height - 40;
   
    const formatObject = parseJSON(format, editing);
    const numberFormat = createNumberFormat(formatObject);
    const parsedFilters = parseJSON(filters, editing);
    const parsedMeasures = parseJSON(measures, editing);
    const parsedManualColors = parseJSON(manualColors, editing);

    const params = buildParams(parsedFilters, dvzProxyDatasetId);
    const dimensions = getDimensions(dimension1);

    return (
        <div ref={ref}>
            <Container 
                className={`chart container grouped-bars-container ${editing ? 'editing' : ''}`}
                style={{ height: height + 'px', backgroundColor }}
                fluid
            >
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
                            manualColors={parsedManualColors}
                            measure={parsedMeasures?.[0] || null}
                            fontSize={fontSize}
                            textColor={textColor}
                            backGroundColor={backgroundColor}
                            noDataText={noDataText}
                            defaultBarColor={defaultBarColor}
                            barBackgroundColor={barBackgroundColor}
                            labelPosition={labelPosition}
                            valuePosition={valuePosition}
                            labelWidth={labelWidth}
                            labelFormat={labelFormat}
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