import React, { useRef, useState } from "react";
import { Container } from "semantic-ui-react";
import DataProvider from "../data/DataProvider.jsx";
import DataConsumer from "../data/DataConsumer.jsx";
import { connect } from "react-redux";


const BigNumberTrendContainer = (props) => {
    const {
        DataFrameComponent,
        containerClassName,
        defaultBackgroundColor = 'none',
        decodeTooltip = false,
        editing = false,
        unique,
        intl,
        "data-csv": csv = "",
        "data-dvz-proxy-dataset-id": dvzProxyDatasetId,
        "data-view-mode": editMode = 'info',
        'data-height': height,
        'data-app': app,
        'data-measures': measures = '{}',
        'data-format': format = '{}',
        'data-group': group,
        'data-filters': filters = '[]',
        'data-text-color': textColor = '#5a5d68',
        'data-number-color': numberColor = '#5a5d68',
        'data-percent-color': percentColor = '#5a5d68',
        'data-big-number-font-size': bigNumberFontSize = 20,
        'data-label-font-size': labelFontSize = 20,
        'data-percent-font-size': percentFontSize = 20,
        'data-label': label = '',
        'data-dimension1': dimension1,
        'data-show-percentage-change': showPercentageChange = 'false',
        "data-wait-for-filters": waitForFilters = "false",
        "data-no-data-text": noDataText = "-",
        "data-icon-image": iconImage = "",
        "data-icon-up": iconUp = "",
        "data-icon-down": iconDown = "",
        'data-show-tooltip': showTooltip = 'false',
        'data-tooltip-text': rawTooltipText = '',
        'data-tooltip-style': tooltipStyle = 'light',
        'data-percent-change-format': percentChangeFormatRaw = '{}'
    } = props

    // backgroundColor default differs between Classic ('none') and Alternative ('#5a5d68')
    const backgroundColor = props['data-back-ground-color'] || defaultBackgroundColor

    const ref = useRef(null)

    const decode = (value) => editing ? value : decodeURIComponent(value)

    const parse = (value) => {
        try {
            return JSON.parse(decode(value))
        } catch (error) {
            console.error("error parsing value:" + value)
        }
        return null
    }

    const percentChangeFormatObj = parse(percentChangeFormatRaw)
    const percentChangeFormat = (percentChangeFormatObj && Object.keys(percentChangeFormatObj).length > 0)
        ? percentChangeFormatObj
        : { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }

    const formatObject = parse(format)
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
    const contentHeight = editing ? height - 80 : height - 40

    const params = {}
    const ff = parse(filters) || {}

    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
    }

    if (dvzProxyDatasetId) {
        params.dvzProxyDatasetId = dvzProxyDatasetId
    }

    const dimensions = []
    if (dimension1 !== 'none') {
        dimensions.push(dimension1)
    }

    const tooltipText = decodeTooltip ? decode(rawTooltipText) : rawTooltipText

    return (
        <div ref={ref}>
            <Container
                className={`${containerClassName} ${editing ? 'editing' : ''}`}
                style={{ "height": height + 'px', backgroundColor }}
                fluid={true}
            >
                <DataProvider
                    style={{ "height": `${contentHeight}px` }}
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
                        <DataFrameComponent
                            iconImage={iconImage}
                            iconUp={iconUp}
                            iconDown={iconDown}
                            editing={editing}
                            locale={intl.locale}
                            intl={intl}
                            app={app}
                            format={numberFormat}
                            dimension1={dimension1}
                            measure={parse(measures)[0] || null}
                            label={label}
                            bigNumberFontSize={bigNumberFontSize}
                            textColor={textColor}
                            numberColor={numberColor}
                            percentColor={percentColor}
                            backGroundColor={backgroundColor}
                            labelFontSize={labelFontSize}
                            percentFontSize={percentFontSize}
                            showPercentageChange={showPercentageChange == 'true' || showPercentageChange == true}
                            noDataText={noDataText}
                            showTooltip={showTooltip == 'true' || showTooltip === true}
                            tooltipText={tooltipText}
                            tooltipStyle={tooltipStyle}
                            percentChangeFormat={percentChangeFormat}
                        >
                        </DataFrameComponent>
                    </DataConsumer>
                </DataProvider>
            </Container>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { "data-app": app, "data-group": group } = ownProps
    const injectedMeasures = state.getIn(['data', 'measures', app, group])
    return injectedMeasures ? { injectedMeasures } : {}
}

export default connect(mapStateToProps, {})(BigNumberTrendContainer)
