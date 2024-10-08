import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { ResponsiveRadar } from "@nivo/radar";
import Legends from "./Legends.jsx";

const DEFAULT_COLOR = "none";

const Chart = ({
  legends,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  options,
  intl,
  format,
  height,
  showLegends,
  legendPosition,
  legendLabel,
  legendCheckBack,
  legendLabelBack,
  legendLabelColor,

  colorGenerator,
  reverseLegend,
  radarCurve,
  radarFillOpacity,
  radarBorderWidth,
  radarGridLevels,
  radarGridShape,
  radarGridLabelOffset = 10,
  radarEnableDots,
  radarDotSize,
  radarEnableDotLabel,
  radarDotLabelOffset,
}) => {
  //Lenged Toggler filter
  const [filter, setFilter] = useState([]);
  const applyFilter = (values) => {
    return values ? values.filter((d) => filter.indexOf(d) === -1) : [];
  };
  const toggle = (id) => {
    const newFilter = filter.slice();
    if (newFilter.indexOf(id) > -1) {
      const index = newFilter.indexOf(id);
      newFilter.splice(index, 1);
    } else {
      newFilter.push(id);
    }
    setFilter(newFilter);
  };

  if (!options || !options.data) {
    //no data yet
    return null;
  }

  //margin settings
  const margins = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  };

  //Legends model
  const chartLegends = options.keys.map((k) => {
    let theColor;
    let enabled = true;
    if (filter.indexOf(k) > -1) {
      enabled = false;
      theColor = DEFAULT_COLOR;
    } else {
      theColor = colorGenerator.getColorByKey(k);
    }
    return {
      enabled: enabled,
      color: theColor,
      id: k,
      label: k,
    };
  });

  const customLayer = (props) => {
    return (
      <g>
        <line
          strokeWidth={1}
          style={{ strokeDasharray: "4,4", stroke: "rgb(51, 51, 51)" }}
          x1={props.centerX}
          y1={props.centerY}
          x2={props.centerX + props.radiusScale(70) * Math.sin(0)}
          y2={0}
        ></line>
        {props.radiusScale
          .ticks(radarGridLevels)
          .filter((t) => t > 0)
          .map((tick, index) => {
            const r = props.radiusScale(tick);
            const x = props.centerX + r * Math.sin(0) + 7;
            const y = props.centerY - r * Math.cos(0);
            return (
              <g>
                <line
                  strokeWidth={1}
                  style={{ stroke: "rgb(51, 51, 51)" }}
                  x1={x - 7}
                  y1={y - 4}
                  x2={x - 3}
                  y2={y - 4}
                ></line>

                <text
                  x={x}
                  y={y}
                  style={{
                    "font-family": "sans-serif",
                    "font-size": "11px",
                    fill: "rgb(51, 51, 51)",
                  }}
                >
                  {intl.formatNumber(
                    format.style === "percent" ? tick / 100 : tick,
                    format
                  )}
                </text>
              </g>
            );
          })}
      </g>
    );
  };

  return (
    <div style={{ height: height }} className={"radar"}>
      {options && options.data && options.data.length > 0 && (
        <>
          <ResponsiveRadar
            data={options.data}
            keys={applyFilter(options.keys)}
            indexBy={options.indexBy}
            colors={(d) => {
              const color = colorGenerator.getColor(d.key, d);
              return color;
            }}
            tooltipFormat={(d) => {
              return intl.formatNumber(
                format.style === "percent" ? d / 100 : d,
                format
              );
            }}
            borderColor={{ from: "color" }}
            curve={radarCurve}
            fillOpacity={radarFillOpacity}
            borderWidth={radarBorderWidth}
            gridLevels={radarGridLevels}
            gridShape={radarGridShape}
            gridLabelOffset={parseInt(radarGridLabelOffset)}
            enableDots={radarEnableDots}
            dotSize={radarDotSize}
            //dotColor={"#CCC"}
            //dotBorderColor={{from: 'color'}}
            dotBorderWidth={2}
            enableDotLabel={radarEnableDotLabel}
            dotLabelYOffset={radarDotLabelOffset}
            dotLabel={(d) => {
              return intl.formatNumber(
                format.style === "percent" ? d.value / 100 : d.value,
                format
              );
            }}
            blendMode="multiply"
            motionConfig="wobbly"
            margin={margins}
            animate={true}
            theme={{
              tooltip: {
                basic: {
                  whiteSpace: "pre",
                  display: "flex",
                  alignItems: "center",
                },
                container: {
                  background: "#EEE",
                  boxShadow: "",
                },
                table: {},
                tableCell: { padding: "3px 5px" },
              },
            }}
            layers={[
              "grid",
              "layers",
              "slices",
              customLayer,
              "dots",
              "axes",
              "legends",
              "mesh",
              "annotations",
            ]}
          />
          <Legends
            filter={filter}
            showLegends={showLegends}
            chartLegends={chartLegends}
            legendLabel={legendLabel}
            legendPosition={legendPosition}
            legendCheckBack={legendCheckBack}
            legendLabelBack={legendLabelBack}
            legendLabelColor={legendLabelColor}
            onToggle={toggle}
            reverseLegend={reverseLegend}
          ></Legends>
        </>
      )}
    </div>
  );
};

export default injectIntl(Chart);
