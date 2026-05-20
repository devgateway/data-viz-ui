import React, { useMemo, useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { injectIntl } from 'react-intl';
import Tooltip from "./Tooltip.jsx";

import { useTheme } from '@nivo/core'

const CustomTick = (tick, colors) => {
    const theme = useTheme()

    return (
        <g transform={`translate(${tick.x},${tick.y + 20})`}>
            <rect x={-14} y={-6} rx={3} ry={3} width={28} height={24} fill="rgba(0, 0, 0, .05)"/>
            <rect x={-12} y={-12} rx={2} ry={2} width={24} height={24} fill="rgb(232, 193, 160)"/>
            {tick.value < 0 ? <line stroke={colors[1]} strokeWidth={1.5} y1={-22} y2={-12}/> : (tick.value) > 0 ?
                <line stroke={colors[0]} strokeWidth={1.5} y1={-22} y2={-12}/> : 'sas'}

            <text
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                    ...theme.axis.ticks.text,
                    fill: '#333',
                    fontSize: 10,
                }}
            >
                {tick.value < 0 ? tick.value * -1 : tick.value}
            </text>
        </g>
    )
}


const Chart = ({ options, intl, format, colorGenerator, height, tooltipEnabled, tooltip, tooltipEnableMarkdown }) => {
    const [filter, setFilter] = useState([])

    const toggle = (id) => {
        const newFilter = filter.slice();
        if (newFilter.indexOf(id) > -1) {
            const index = newFilter.indexOf(id);
            newFilter.splice(index, 1);
        } else {
            newFilter.push(id)
        }
        setFilter(newFilter)
    }

    const applyFilter = (values) => {

        if (filter) {
            return values.filter(d => filter.indexOf(d[options.indexBy]) === -1);

        } else {
            return values
        }
    }


    if (!options || !options.data || !options.keys || options.keys.length < 2) {
        return null
    }

    const transformed = useMemo(() => {
        const [negativeKey, positiveKey] = options.keys;
        const data = (options.data || []).map((datum) => ({
            ...datum,
            [negativeKey]: Math.abs(Number(datum[negativeKey]) || 0) * -1,
            [positiveKey]: Math.abs(Number(datum[positiveKey]) || 0),
        }));

        const absoluteMax = data.reduce((currentMax, datum) => {
            const values = [Math.abs(Number(datum[negativeKey]) || 0), Math.abs(Number(datum[positiveKey]) || 0)];
            return Math.max(currentMax, ...values);
        }, 0);

        return {
            data,
            negativeKey,
            positiveKey,
            maxValue: absoluteMax,
        };
    }, [options]);

    const legendColors = [
        colorGenerator?.getColorByKey?.(transformed.negativeKey) || '#b45309',
        colorGenerator?.getColorByKey?.(transformed.positiveKey) || '#2563eb',
    ];

    const divergingCommonProps = {
        margin: {top: 30, right: 10, bottom: 30, left: 120},
        padding: 1,
        maxValue: transformed.maxValue,
        minValue: transformed.maxValue * -1,
        data: applyFilter(transformed.data),
        layout: 'horizontal',
        indexBy: options.indexBy,
        colorBy: 'id',
        borderWidth: 1,
        borderRadius: 3,
        enableGridX: false,
        enableGridY: false,
        label: d => intl.formatNumber(Math.abs(d.value / 100), format),
        labelTextColor: 'inherit:darker(1.2)',
        axisTop: null,

        axisBottom: {
            rotation: -45,
            format: v => intl.formatNumber(Math.abs(v / 100), {...format, minimumFractionDigits: 0}),
        },
        axisLeft: {
            tickSize: 0,
            tickPadding: 10,
        },
        axisRight: null,

        markers: [
            {
                axis: 'x',
                value: 0,
                lineStyle: {strokeOpacity: 0},
                textStyle: {fill: legendColors[0]},
                legend: transformed.negativeKey,

                legendPosition: 'top-left',
                legendOrientation: 'horizontal',
                legendOffsetY: -10,

            },
            {
                axis: 'x',
                value: 0,
                lineStyle: {fill: '#DDD', stroke: '#DDD', strokeDasharray: "3 2"},
                legendPosition: 'top',
                legendOrientation: 'horizontal',
                legendOffsetY: -10,
            },
            {
                axis: 'x',
                value: 0,
                lineStyle: {strokeOpacity: 0},
                textStyle: {fill: legendColors[1]},
                legend: transformed.positiveKey,
                legendPosition: 'top-right',
                legendOrientation: 'horizontal',
                legendOffsetY: -10,
                legendOffsetX: 10,
            },
        ],
    }

    return (
        <div className="has-interactive-panel">
            <div className="chart container" style={{ height }}>
                {options.data &&
                <ResponsiveBar
                    {...divergingCommonProps}
                    keys={[transformed.negativeKey, transformed.positiveKey]}
                    padding={0.4}
                    colors={legendColors}
                    tooltip={(d) => {
                        if (tooltipEnabled && tooltip && tooltip.trim().length > 0) {
                            return (
                                <Tooltip
                                    intl={intl}
                                    format={format}
                                    d={d}
                                    tooltip={tooltip}
                                    tooltipEnableMarkdown={tooltipEnableMarkdown}
                                />
                            )
                        }

                        return null
                    }}

                />}
            </div>
            <div className="interactive panel">

                <div className="item active"> Show/Hidden :</div>
                {options.data.map(d => <div className={filter.indexOf(d[options.indexBy]) > -1 ? 'item' : 'item active'}
                                            onClick={e => toggle(d[options.indexBy])}>{d[options.indexBy]}</div>)}
            </div>
        </div>
    )
}

export default injectIntl(Chart)
