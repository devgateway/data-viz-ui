import React from "react";
import { Grid, Popup } from "semantic-ui-react";
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
    const yoyStyle = { color: decodeURIComponent(props.percentColor), fontSize: percentFontSize + 'px', lineHeight: 1.1 }
    const percentBlockStyle = { display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }
    const labelStyle = { color: decodeURIComponent(textColor), fontSize: labelFontSize + 'px' }

    const tooltip = (props.showTooltip && props.tooltipText) ? template(props.tooltipText, templateContext) : undefined

    return <Grid padded={true}>
        <Grid.Row>
            <Grid.Column width={4}>

                {props.iconImage && props.iconImage != "" && <img className={"icon main"} src={props.iconImage}></img>}
            </Grid.Column>
            <Grid.Column textAlign={"right"} width={12}>

                <img className={`icon up ${percentChange > 0 ? 'visible' : 'hidden'}`} src={props.iconUp}></img>
                <img className={`icon up ${percentChange < 0 ? 'visible' : 'hidden'}`} s src={props.iconDown}></img>

                {showPercentageChange && percentChange != null && (
                    props.showTooltip && tooltip ? (
                        <Popup
                            content={tooltip}
                            position="top center"
                            inverted={props.tooltipStyle === 'dark'}
                            size="small"
                            trigger={
                                <div style={percentBlockStyle}>
                                    <div className="percentage" style={percentStyle}> {percentChange > 0 ? '+' : ''}{percentChange == 0 ? '=' : ''}{percentChangeFormatted}</div>
                                    <div className="percentage-yoy" style={yoyStyle}>YoY</div>
                                </div>
                            }
                        />
                    ) : (
                        <div style={percentBlockStyle}>
                            <div className="percentage" style={percentStyle}> {percentChange > 0 ? '+' : ''}{percentChange == 0 ? '=' : ''}{percentChangeFormatted}</div>
                            <div className="percentage-yoy" style={yoyStyle}>YoY</div>
                        </div>
                    )
                )}
            </Grid.Column>

        </Grid.Row>
        <Grid.Row>
            <Grid.Column width={16}>
                <span className="number" style={numberStyle}>{formattedNumber}</span>
            </Grid.Column>

        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <div className="label" style={labelStyle}>{template(label, templateContext)}</div>
            </Grid.Column>
        </Grid.Row>

    </Grid>
}

const BigNumberTrend = (props) => (
    <BigNumberTrendContainer
        DataFrameComponent={DataFrame}
        containerClassName="alternative big number container"
        defaultBackgroundColor="#5a5d68"
        decodeTooltip={true}
        {...props}
    />
)

export default BigNumberTrend