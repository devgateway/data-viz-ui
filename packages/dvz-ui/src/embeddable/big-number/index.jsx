import React, { useRef, useState, useEffect } from "react";
import { Container, Grid } from "semantic-ui-react";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import { PostContent } from "@devgateway/wp-react-lib";
import { connect } from "react-redux";
import { useSpring, animated } from '@react-spring/web';

const Chart = (props) => {
    const {
        editing = false,
        unique,
        intl,
        childContent,
        "data-csv": csv = "",
        "data-dimension1": dimension1 = "none",
        "data-dvz-proxy-dataset-id": dvzProxyDatasetId,
        "data-no-data-message": noDataMsg = "No data matches your selection",
        "data-view-mode": editMode = 'info',
        'data-height': height,
        'data-app': app,
        'data-measures': measures = '{}',
        'data-format': format = '{}',
        'data-group': group,
        'data-filters': filters = '[]',
        'data-number-font-size': numberFontSize = 20,
        'data-label-font-size': labelFontSize = 20,
        'data-number-color': numberColor = '#000000',
        'data-label-color': labelColor = '#000000',
        'data-label': label = '',
        'data-group-label': groupLabel = '',
        'data-group-label-color': groupLabelColor = '',
        'data-group-label-font-size': groupLabelFontSize = '',
        "data-wait-for-filters": waitForFilters = "false",
        "data-no-data-text": noDataText = "-",
    } = props

    const locale = intl.locale
    const ref = useRef(null);
    const decode = (value) => {
        if (editing) {
            return value
        }
        return decodeURIComponent(value)
    }

    const parse = (value) => {
        try {
            return JSON.parse(decode(value))
        } catch (error) {
            console.error("error parsing value:" + value)
        }
        return null
    }


    const measuresObj = parse(measures)

    const formatObject = measuresObj && measuresObj[app] ? measuresObj[app].format : null

    console.log(formatObject)

    const numberFormat = formatObject ? {
        style: (formatObject.style === 'compacted') ? 'decimal' : formatObject.style,
        notation: (formatObject.style === 'compacted') ? 'compact' : "standard",
        currency: formatObject.currency,
        minimumFractionDigits: parseInt(formatObject.minimumFractionDigits),
        maximumFractionDigits: parseInt(formatObject.maximumFractionDigits)
    } : {
        notation: "standard",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }

    const [mode, setMode] = useState(editMode)
    const viewMode = editing ? editMode : mode
    const contentHeight = (editing ? height - 80 : height - 40)

    const params = {}
    const ff = parse(filters) || {}

    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
    }

    if (dvzProxyDatasetId) {
        params.dvzProxyDatasetId = dvzProxyDatasetId;
    }

    const dimensions = []
    if (dimension1 != "none") {
        dimensions.push(dimension1);
    }


    return (<div ref={ref}>

        <Container className={"chart container big-number-container"} style={{ "height": height + 'px' }} fluid={true}>
            {app && app != "none" && <DataProvider
                style={{ "height": `${contentHeight}px` }}
                params={params}
                app={app}
                group={group}
                source={dimensions.join("/")}
                csv={csv}
                editing={editing}
                waitForFilters={waitForFilters === "true"}
                store={[app, unique, ...dimensions]}
            >
                <DataConsumer>
                    <Group
                        dimension={dimension1}
                        locale={locale}
                        intl={intl}
                        app={app}
                        format={numberFormat}
                        measures={parse(measures)}
                        label={label}
                        numberFontSize={numberFontSize}
                        numberColor={numberColor}
                        labelFontSize={labelFontSize}
                        labelColor={labelColor}
                        noDataText={noDataText}
                        groupLabel={groupLabel}
                        groupLabelColor={groupLabelColor}
                        groupLabelFontSize={groupLabelFontSize}
                    >
                    </Group>
                </DataConsumer>
            </DataProvider>
            }
        </Container>
    </div>)

}

const Group = (props) => {
    const {
        app, measures, data, format, label, numberColor, numberFontSize, dimension,
        labelColor, labelFontSize, noDataText = '-', intl, groupLabel, groupLabelColor, groupLabelFontSize
    } = props;

    const measuresKeys = measures && measures[app] ? Object.keys(measures[app]).filter(k => measures[app][k].selected) : []
    if (dimension != "none") {
        const metadata = data.metadata.types.filter(t => t.dimension === dimension)[0]

        return data.children.map(dataItem => {
            const dimensionLabel = metadata.items.filter(i => i.code == dataItem.value)[0].value
            return <div className="big-number-group" style={{ "display": "flex", flexDirection: "column" }}>
                <span className="big-number-title"
                    style={{ color: groupLabelColor, fontSize: groupLabelFontSize + "px" }}>
                    <span className="dimension-text">{dimensionLabel}</span>
                    <span className="group-text"> {groupLabel}</span>
                </span>
                <div className="big-number-row" style={{ "display": "flex", flexDirection: "row" }}>
                    {measuresKeys.map(k => <div className="big-number-parent"><BigNumber showDimensionLabel={true}
                        metadata={metadata} dataItem={dataItem} measureField={k} measure={measures[app][k]} {...props}></BigNumber></div>)}
                </div>
            </div >


        })

    } else {
        return <div>
            <span style={{ color: groupLabelColor, fontSize: groupLabelFontSize + "px" }}> {groupLabel}</span>
            {measuresKeys.map(k => <BigNumber dataItem={data} measureField={k} measure={measures[app][k]} {...props}></BigNumber>)}
        </div>
    }

};



const BigNumber = ({ dataItem, format, measureField, measure, numberColor, numberFontSize, labelColor, labelFontSize, noDataText, label, intl }) => {

    debugger;
    const rawValue = dataItem?.[measureField] ?? null;
    const value = rawValue ? (format?.style === 'percent' ? rawValue / 100 : rawValue) : null;
    const [targetValue, setTargetValue] = useState(value);

    useEffect(() => {
        if (value !== null && value !== undefined) {
            setTargetValue(value);
        }
    }, [value]);

    const { number } = useSpring({
        from: { number: 0 },
        to: { number: targetValue ?? 0 },
        // reset: true,
        config: {
            mass: 1,
            tension: 120,
            friction: 30,
        },
    });

    const numberStyle = {
        color: decodeURIComponent(numberColor),
        fontSize: numberFontSize + 'px',
        textAlign: 'center'
    };

    const labelStyle = {
        color: decodeURIComponent(labelColor),
        fontSize: labelFontSize + 'px',
        textAlign: 'center'
    };

    const formatNumber = (val) =>
        intl.formatNumber(val, { ...format });

    return (
        <div className="big-number">

            <div style={numberStyle} className="big-number-value">
                {value === null ? noDataText : (
                    <animated.span>
                        {number.to((n) => formatNumber(n))}
                    </animated.span>
                )}
            </div>
            {measure?.customLabel && (
                <div style={labelStyle} className="big-number-label">
                    {measure.customLabel}
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const { "data-app": app, "data-group": group, } = ownProps
    const injectedMeasures = state.getIn(['data', 'measures', app, group])
    if (injectedMeasures) {
        return {
            "injectedMeasures": injectedMeasures,
        }
    } else {
        return {}
    }
}
const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(Chart)
