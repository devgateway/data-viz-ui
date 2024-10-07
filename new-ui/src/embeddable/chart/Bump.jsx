import React, {useState} from 'react'
import {injectIntl} from 'react-intl';
import { ResponsiveBump } from '@nivo/bump'
import {
    colorSchemes,
    isCategoricalColorScheme,
    isSequentialColorScheme,
    sequentialColorInterpolators
} from "@nivo/colors";
import * as d3 from "d3";
import {useTheme} from "@nivo/core";

const getTextWidth = (text, font) => {
    // re-use canvas object for better performance
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}

const lightenDarkenColor = (col, amt) => {
    let usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    const num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

}


const Chart = ({
                   legends,
                   itemWidth,
                   options,
                   intl,
                   margin,
                   format,
                   colors,
                   groupMode,
                   height,
                   showLegends,
                   legendPosition,
                   tickRotation,
                   tickColor,
                   legendLabel
               }) => {


    const [filter, setFilter] = useState([])

    const applyFilter = (values) => {
        if (filter) {

            return values.filter(v => filter.indexOf(v.id) === -1);
        }
        return values
    }
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


    const CustomTick = tick => {
        const theme = useTheme()

        const width = getTextWidth(tick.value, "12px Roboto") + 15
        return (<g transform={`translate(${tick.x},${tick.y + 30})`}>
            <line stroke={tickColor} strokeWidth={1.5} y1={-32} y2={-12}/>
            <rect transform={`rotate(${tickRotation})`}
                  x={(-1 * (width) / 2 + 2)}
                  y={-6} rx={3} ry={3}
                  width={(width) + 2} height={22}
                  fill="rgba(0, 0, 0, .03)"/>

            <rect transform={`rotate(${tickRotation})`}
                  x={(-1 * (width) / 2)}
                  y={-12}
                  rx={2}
                  ry={2} width={width} height={22}
                  fill={tickColor}/>


            <text transform={`rotate(${tickRotation})`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                      ...theme.axis.ticks.text,
                      fill: '#FFF',
                      fontSize: "12px",
                  }}
            >
                {tick.value}
            </text>

        </g>)
    }

    const getColorByPosition = (position) => {
        if (colors.scheme) {

            const color = colorSchemes[colors.scheme]
            if (isSequentialColorScheme(colors.scheme)) {

                const interpolator = sequentialColorInterpolators[colors.scheme]
                const pos = position - (9 * parseInt((position / 9)))

                const scale = d3.scaleSequential(interpolator).domain([0, 8])

                return scale(pos)
            }

            if (isCategoricalColorScheme(colors.scheme)) {
                if (position > color.length - 1) {

                    const pos = position - (color.length * parseInt((position / color.length)))

                    return colorSchemes[colors.scheme][pos]
                } else {
                    return colorSchemes[colors.scheme][position]
                }
            }
        } else {
            return colors.colors[position]
        }
    }

    const getColor = (id) => {
        if (filter.indexOf(id) > -1) {
            return "#EEE"
        } else {
            return getColorByPosition(options.data.map(d => d.id).indexOf(id))
        }
    }


    const top = 5, right = 25, bottom = 60, left = 50;

    let margins = {top, right, bottom, left}

    if (legendPosition == 'right' && showLegends) {

        margins = {top, right: margin, bottom, left}
    }
    if (legendPosition == 'bottom' && showLegends) {

        margins = {top, right, bottom: margin, left}
    }
    if (legendPosition == 'left' && showLegends) {

        margins = {top, right, bottom, left: margin}
    }

    const chartLegends = options.data.map(d => ({id: d.id, label: d.id, color: getColor(d.id)}))


    return (
        <div style={{height: height}}>

            {options && options.data && <ResponsiveBump
                data={applyFilter(options.data)}

                margin={margins}
                xScale={{type: 'point'}}

                axisTop={null}
                axisRight={null}
                lineWidth={3}
                colors={d => getColor(d.id)}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: tickRotation,
                    legend: legends.bottom,
                    legendOffset: 100,
                    legendPosition: 'middle',
                    renderTick: CustomTick
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: legends.left,
                    legendPosition: 'middle',
                    legendOffset: -50
                }}
                pointSize={10}
                pointColor={{theme: 'background'}}
                pointBorderWidth={2}
                  pointLabelYOffset={-12}
                useMesh={true}
                animate={true}
                motionStiffness={130}
                motionDamping={15}
                tooltip={(d) => {
                    return (
                        <div className={"chart tooltip"} >


                        </div>
                    )
                }}


            />}

            <div className={`legends container has-standard-12-font-size  ${legendPosition}`}>
               {showLegends && legendLabel &&
                <div className={"legend item"}>
                 <label className="legend-title">{legendLabel}</label>
                </div>
              }
                {showLegends && chartLegends.map(legend => {
                    return (
                        <div className={"legend item"}>
                            <input type='checkbox' defaultChecked onChange={() => toggle(legend.id)}/>
                            <label style={{backgroundColor: legend.color, color: '#fff'}}>{legend.label}</label>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default injectIntl(Chart)
