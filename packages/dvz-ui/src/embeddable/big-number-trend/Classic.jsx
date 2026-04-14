import React from "react";
import { Popup } from "semantic-ui-react";
import template from 'string-template';
import BigNumberTrendContainer from './BigNumberTrendContainer.jsx';
import useBigNumberTrendData from './useBigNumberTrendData.js';


const DataFrame = (props) => {
    const {
        app,
        measure,
        dimension1,
        data,
        format,
        percentChangeFormat,
        label,
        textColor,
        bigNumberFontSize,
        percentFontSize,
        labelFontSize,
        showPercentageChange,
        intl,
        noDataText
    } = props

    const {
        percentChange,
        percentChangeFormatted,
        formattedNumber,
        templateContext
    } = useBigNumberTrendData({ data, app, measure, dimension1, format, percentChangeFormat, intl, noDataText })

    const numberStyle = { color: decodeURIComponent(props.numberColor), fontSize: bigNumberFontSize + 'px' }
    const percentStyle = { color: decodeURIComponent(props.percentColor), fontSize: percentFontSize + 'px' }
    const labelStyle = { color: decodeURIComponent(textColor), fontSize: labelFontSize + 'px' }

    const tooltip = (props.showTooltip && props.tooltipText) ? template(props.tooltipText, templateContext) : undefined

    return (
        <div className="trend">
            <div className="label" style={labelStyle}>{template(label, templateContext)}</div>
            <div className="number-and-icon">
                <span className="number" style={numberStyle}>{formattedNumber}</span>
                {percentChange > 0 && props.iconUp != "" && <img src={props.iconUp}></img>}
                {percentChange < 0 && props.iconDown != "" && <img src={props.iconDown}></img>}
                {percentChange > 0 && props.iconUp == "" && <div className={"icon trend arrow up"}/>}
                {percentChange < 0 && props.iconDown == "" && <div className={"icon trend arrow down"}/>}
            </div>
            {showPercentageChange && percentChange && (
                props.showTooltip && tooltip ? (
                    <Popup
                        content={tooltip}
                        position="top center"
                        inverted={props.tooltipStyle === 'dark'}
                        size="small"
                        trigger={<div className="percentage" style={percentStyle}>{percentChangeFormatted}</div>}
                    />
                ) : (
                    <div className="percentage" style={percentStyle}>{percentChangeFormatted}</div>
                )
            )}
        </div>
    )
}

const BigNumberTrend = (props) => (
    <BigNumberTrendContainer
        DataFrameComponent={DataFrame}
        containerClassName="chart container big-number-trend-container"
        defaultBackgroundColor="none"
        {...props}
    />
)

export default BigNumberTrend
