import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { ResponsivePie } from "@nivo/pie";
import Tooltip, { formatContent } from "./Tooltip";
import {
  colorSchemes,
  isCategoricalColorScheme,
  isSequentialColorScheme,
  sequentialColorInterpolators,
} from "@nivo/colors";
import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid";
import FlexWrapDetector from "../../layout/FlexWrapDetector";

const Chart = ({
  legends,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  options,
  intl,
  format,
  colors,
  groupMode,
  tooltipEnabled,
  height,
  showLegends,
  legendPosition,
  tickRotation,
  tickColor,
  tooltip,
  startAngle,
  endAngle,
  legendLabel,
  legendCheckBack,
  legendLabelBack,
  legendLabelColor,
  centerLabel,
  showArcLabels,
  showArcLinkLabels,
  slicePadding,
  colorGenerator,
  centerLabelFontWeight,
  centerLabelFontSize,
  centerLabelXOffset,
  centerLabelYOffset,
  tooltipEnableMarkdown,
  reverseLegend,
}) => {
  const [filter, setFilter] = useState([]);
  const [tooltipValue, setTooltipValue] = useState(tooltip);
  const [optionsVal, setOptions] = useState(options);
  const [bottomSpacing, setBottomSpacing] = useState(50);
  const [newMarginTop, setNewMarginTop] = useState(marginTop);
  const [wrapCount, setWrapCount] = useState(0);
  const [newMarginBottom, setNewMarginBottom] = useState(marginBottom);

  const chartLegends = optionsVal.data
    .sort((a, b) => {
      if (a.position && b.position) {
        return a.position - b.position;
      }
      return 0;
    })
    .map((d, index) => {
      const theColor = colorGenerator.getColor(d.id, d);
      return {
        color: theColor,
        id: d.id,
        label: d.label,
      };
    });

  useEffect(() => {
    setTooltipValue(tooltip);
    setOptions({
      ...options,
      id: uuidv4(),
    });
  }, [tooltip, options]);

  useEffect(() => {
    const adjustBottomForLegends = () => {
      const extraItems = Math.max(chartLegends.length - 5, 0);
      const adjustment = 5 * extraItems;
      setBottomSpacing(adjustment);
    };
    adjustBottomForLegends();
  }, [chartLegends]);

  const rightLegendDynamicStyle = {
    bottom: `-${bottomSpacing}px`,
  };

  const leftLegendDynamicStyle = {
    bottom: `-${bottomSpacing}px`,
    gap: "0px"
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

  const applyFilter = (values) => {
    if (filter) {
      return values.filter((d) => filter.indexOf(d.id) === -1);
    } else {
      return values;
    }
  };

  if (!optionsVal || !optionsVal.data) {
    return null;
  }

  const margins = {
    top: newMarginTop,
    right: marginRight,
    bottom: newMarginBottom,
    left: marginLeft,
  };

  const getColorByPosition = (position) => {
    if (colors.scheme) {
      const color = colorSchemes[colors.scheme];
      if (isSequentialColorScheme(colors.scheme)) {
        const interpolator = sequentialColorInterpolators[colors.scheme];
        const pos = position - 9 * parseInt(position / 9);
        const scale = d3.scaleSequential(interpolator).domain([0, 8]);
        return scale(pos);
      }
      if (isCategoricalColorScheme(colors.scheme)) {
        if (position > color.length - 1) {
          const pos =
            position - color.length * parseInt(position / color.length);
          return colorSchemes[colors.scheme][pos];
        } else {
          return colorSchemes[colors.scheme][position];
        }
      }
    } else {
      return colors.colors[position];
    }
  };

  const getColorByKey = (id) => {
    if (colors && colors.scheme) {
      const index = optionsVal.keys.findIndex((k) => k == id);
      return getColorByPosition(index);
    } else {
      return colors.colors[optionsVal.keys.findIndex((k) => k == id)];
    }
  };

  const getColorByIndex = (id) => {
    if (colors && colors.scheme) {
      const index = optionsVal.data.findIndex(
        (f) => f[optionsVal.indexBy] == id
      );
      return getColorByPosition(index);
    } else {
      return colors.colors[
        optionsVal.data.findIndex((f) => f[optionsVal.indexBy] == id)
      ];
    }
  };

  const getColor = (id, d) => {
    return getColorByIndex(id);
  };

  const legendTitle = () => {
    return (
      <>
        {showLegends && legendLabel && (
          <div className={"legend item"}>
            <label className="legend-title">{legendLabel}</label>
          </div>
        )}
      </>
    );
  };

  const legendItems = () => {
    if (reverseLegend) {
      chartLegends.reverse();
    }
    return (
      <>
        {showLegends &&
          chartLegends.map((legend) => {
            return (
              <div className={"legend item"} onClick={() => toggle(legend.id)}>
                <input
                  className={"ignore"}
                  type="checkbox"
                  checked={filter.length == 0 || !filter.includes(legend.id)}
                />
                <span
                  className={
                    legendCheckBack ? "checkmark-with-bg" : "checkmark"
                  }
                  style={{
                    backgroundColor:
                      legendCheckBack == true ? legend.color : "transparent",
                  }}
                ></span>

                <label
                  style={{
                    backgroundColor:
                      legendLabelBack == true ? legend.color : "transparent",
                    color: legendLabelColor,
                  }}
                >
                  {legend.label}
                </label>
              </div>
            );
          })}
      </>
    );
  };

  const CenterText = (layerProps) => {
    const { centerX, centerY } = layerProps;
    const centerText = centerLabel.split(/[\r\n]/g);
    let totalValue = 0;
    if (layerProps.dataWithArc) {
      totalValue = layerProps.dataWithArc.reduce(function (
        previousValue,
        currentValue
      ) {
        return previousValue + currentValue.value;
      },
      0);
    }

    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="start"
        dominantBaseline="central"
      >
        {centerText.map((label, i) => {
          return (
            <tspan
              x={centerX + parseInt(centerLabelXOffset)}
              y={centerY + parseInt(centerLabelYOffset) + i * 20}
              style={{
                fontSize: centerLabelFontSize + "px",
                fontWeight: centerLabelFontWeight,
                fill: "#000",
              }}
            >
              {formatContent(label, { totalValue }, intl)}
            </tspan>
          );
        })}
      </text>
    );
  };

  return (
    <div style={{ height: height }} className={"pie-chart"}>
      {optionsVal && optionsVal.data && optionsVal.data.length > 0 && (
        <>
          <ResponsivePie
            key={optionsVal.id}
            data={applyFilter(optionsVal.data)}
            margin={margins}
            startAngle={startAngle}
            endAngle={endAngle}
            sortByValue={true}
            innerRadius={0.7}
            padAngle={slicePadding}
            cornerRadius={3}
            colors={(d) => {
              return colorGenerator.getColor(d.id, d.data);
            }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["brighter", "2"]] }}
            enableArcLabels={showArcLabels}
            enableArcLinkLabels={showArcLinkLabels}
            arcLabelsTextColor="#333333"
            arcLinkLabelsSkipAngle={5}
            arcLabelsSkipAngle={15}
            sliceLabelsSkipAngle={20}
            arcLabel={(l) =>
              intl.formatNumber(
                format.style === "percent" ? l.value / 100 : l.value,
                format
              )
            }
            radialLabelsSkipAngle={20}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={1}
            radialLabelsLinkDiagonalLength={5}
            radialLabelsLinkHorizontalLength={16}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: "color" }}
            arcLinkLabel={(r) => r.label}
            layers={[
              "arcLinkLabels",
              "arcs",
              "arcLabels",
              "legends",
              CenterText,
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[]}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            tooltip={(d) => {
              if (d.datum && d.datum.data && d.datum.data.variables) {
                const percent = (d.datum.arc.angleDeg / 360) * 100;
                d.datum.data.variables.valuePercent = percent;
                d.datum.data.variables.category = d.datum.id;
              }
              if (tooltipEnabled && tooltip && tooltip.trim().length > 0) {
                return (
                  <Tooltip
                    intl={intl}
                    format={format}
                    d={d}
                    tooltip={tooltipValue}
                    tooltipEnableMarkdown={tooltipEnableMarkdown}
                  />
                );
              }
              return null;
            }}
          />
          {(legendPosition === "top" || legendPosition === "bottom") && (
            <div
              className={`legends container has-standard-12-font-size ${legendPosition}`}
            >
              <div className="legend-sections">
                <div className="title-section">{legendTitle()}</div>
                <FlexWrapDetector
                  onWrapChange={(count) => {
                    if (legendPosition === "top") {
                      setNewMarginTop(marginTop + (count / 2) * 40);
                      setWrapCount(count);
                    } else {
                      setNewMarginBottom(marginBottom + (count / 2) * 25);
                      setWrapCount(count);
                    }
                  }}
                  className={`legends container has-standard-12-font-size items-section`}
                >
                  {legendItems()}
                </FlexWrapDetector>
              </div>
            </div>
          )}

          {(legendPosition === "right" || legendPosition === "left") && (
            <div
              className={`legends container has-standard-12-font-size  ${legendPosition}`}
              style={
                legendPosition === "right"
                  ? rightLegendDynamicStyle
                  : leftLegendDynamicStyle
              }
            >
              {legendTitle()}
              {legendItems()}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default injectIntl(Chart);