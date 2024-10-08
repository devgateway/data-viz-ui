import React, { Fragment } from "react";
import { line } from "d3-shape";
import * as d3 from "d3";
import { formatContent } from "./Tooltip";
import { injectIntl } from "react-intl";

const Line = (
  data,
  lineColor,
  layout,
  groupMode,
  keys,
  tooltipContent,
  title,
  measure
) =>
  injectIntl((props) => {
    const { intl } = props;
    let centerLine = groupMode === "grouped";
    if (data) {
      const { bars, xScale, yScale, innerWidth, innerHeight } = props;
      let indexes = new Set();
      let lineData = [];
      let barWidth = 0;
      if (bars && bars.length > 0) {
        indexes = new Set(props.bars.map((b) => b.data.indexValue));
        lineData = data.data.filter((d) => {
          const indexesArray = Array.from(indexes);
          return indexesArray.find((i) => i == d[0]);
        });
        barWidth =
          layout === "horizontal" ? props.bars[0].height : props.bars[0].width;
      } else {
        centerLine = false;
        if (data.data) {
          data.data.forEach((it) => {
            if (it) {
              indexes.add(it[0]);
            }
          });
          lineData = data.data;
          barWidth =
            layout === "horizontal"
              ? innerHeight / indexes.size
              : innerWidth / indexes.size;
        }
      }

      let yIndex;
      let xIndex;
      if (layout === "horizontal") {
        xIndex = 1;
        yIndex = 0;
      } else {
        xIndex = 0;
        yIndex = 1;
      }
      const lineGenerator = line();
      lineGenerator
        .x((data) => {
          if (layout === "horizontal") {
            return xScale(data[xIndex]);
          } else {
            return (
              xScale(data[xIndex]) +
              (barWidth * (centerLine ? keys.length : 1)) / 2
            );
          }
        })
        .y((data) => {
          if (layout === "horizontal") {
            return (
              yScale(data[yIndex]) +
              (barWidth * (centerLine ? keys.length : 1)) / 2
            );
          } else {
            return yScale(data[yIndex]);
          }
        });

      const tooltip = d3
        .select("#root")
        .append("div")
        .attr("class", "chart tooltip")
        .style("transition", "all 1s ease-out;")
        .style("background-color", lineColor)
        .style("position", "absolute")
        .style("visibility", "hidden");

      return (
        <Fragment>
          <path
            d={lineGenerator(lineData)}
            fill="none"
            stroke-width={"4"}
            stroke={`${lineColor}`}
            style={{ pointerEvents: "none" }}
          />
          {lineData.map((d) => {
            const yScaleAdjustment =
              layout === "horizontal"
                ? (barWidth * (centerLine ? keys.length : 1)) / 2
                : 0;
            const xScaleAdjustment =
              layout === "horizontal"
                ? 0
                : (barWidth * (centerLine ? keys.length : 1)) / 2;

            return (
              <circle
                onMouseOver={(event) => {
                  tooltip.style("visibility", "visible");
                }}
                onMouseMove={(event) => {
                  if (tooltipContent && tooltipContent.trim().length > 0) {
                    tooltip.html(
                      formatContent(
                        tooltipContent,
                        {
                          x: d[0],
                          y: d[1],
                          title,
                          measure,
                        },
                        intl
                      )
                    );
                    tooltip
                      .style(
                        "top",
                        event.pageY -
                          tooltip.node().getBoundingClientRect().height +
                          "px"
                      )
                      .style(
                        "left",
                        event.pageX -
                          tooltip.node().getBoundingClientRect().width +
                          "px"
                      );
                  }
                }}
                onMouseOut={(event) => tooltip.style("visibility", "hidden")}
                key={d.index}
                cx={xScale(d[xIndex]) + xScaleAdjustment}
                cy={yScale(d[yIndex]) + yScaleAdjustment}
                r={7}
                fill={lineColor}
                style={{ pointerEvents: "all", cursor: "pointer" }}
              />
            );
          })}
        </Fragment>
      );
    } else {
      return null;
    }
  });

export default Line;
