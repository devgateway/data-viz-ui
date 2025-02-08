import { PostConsumer, PostProvider } from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";
import "pure-react-carousel/dist/react-carousel.es.css";
import React, { useEffect, useRef, useState } from "react";
import { Container } from "semantic-ui-react";
import * as d3 from "d3";
import Carousel from './mobile';
import getDeviceType from "../../utils/deviceType";

const visibleStyle = {
  visibility: "visible",
  position: "relative",
  height: "auto",
  width: "auto",
};

const hiddenStyle = {
  position: "absolute",
  overflow: "hidden",
  display: "none",
};

const DEFAULT_HIGHLIGHTED_POST = 0;
const TimeLine = (props) => {
  const{
    posts,
    position,
    lineWidth,
    meta,
    locale,
    lineColor,
    height,
    config,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    fontSize,
    titleWidth,
    titleHeight,
    subtitleWidth,
    subtitleHeight,
    enableTitlePopup,
    enableCirclePopup,
    enableDefaultPopup,
    closePopupOnMouseOut,
    unique,
  } = props;
  const ref = useRef();
  const [displayTooltip, setDisplayTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);

  const pointPosition = (idx) => {
    return config[idx].position;
  };

  const tickLength = (idx) => {
    return config[idx].connectorLineHeight;
  };
  const subtitleOffset = (idx) => {
    return config[idx].subtitleOffset;
  };
  const connectorLineHeight = (idx) => {
    return config[idx].connectorLineHeight;
  };
  const titleOffset = (idx) => {
    return config[idx].titleOffset;
  };
  const circleColor = (idx) => {
    return config[idx]?.circleColor;
  };
  const pointLineColor = (idx) => {
    return config[idx].lineColor;
  };

  const titleColor = (idx) => {
    return config[idx].titleColor;
  };

  const labelColor = (idx) => {
    return config[idx].labelColor;
  };

  const tooltipFontColor = (idx) => {
    return config[idx].tooltipFontColor || "#fff";
  };

  const size = (idx) => {
    return config[idx].size;
  };

  const readMoreLabel = (idx) => {
    return config[idx].readMoreLabel;
  };

  const getCircleId = (idx) => {
    return "circle" + unique + idx;
  };

  const getTitleId = (idx) => {
    return "title" + unique + idx;
  };

  const unHighlightCircle = (i) => {
    d3.selectAll("#" + getCircleId(i))
      .style("stroke", "none")
      .style("fill", circleColor(i));

    d3.selectAll("#label" + i).style("font-weight", "normal");
  };

  const highlightCircle = (i) => {
    unHighlightCircle(DEFAULT_HIGHLIGHTED_POST);
    d3.selectAll("#" + getCircleId(i))
      .style("stroke", circleColor(i))
      .style("fill", "#fff");

    d3.selectAll("#label" + i).style("font-weight", "bold");
  };

  useEffect(() => {
    const margin = {
      top: marginTop,
      right: marginRight,
      bottom: marginBottom,
      left: marginLeft,
    };

    let graphicPosition = height / 2;
    if (position == "middle") {
      graphicPosition = height / 2;
    }
    if (position == "top") {
      graphicPosition = margin.top;
    }
    if (position == "bottom") {
      graphicPosition = height - margin.bottom;
    }

    const postsIndexMap = {};
    posts.forEach((p, i) => {
      postsIndexMap[p.id] = i;
    });

    const svgWidth = ref.current.clientWidth,
      svgHeight = height;

    const xScale = d3
      .scaleLinear()
      .domain([0, posts.length - 1])
      .range([margin.left, svgWidth - margin.right]);

    const lineGenerator = d3.line();
    const data = [
      [xScale(0), 0],
      [xScale(posts.length - 1), 0],
    ];
    const pathString = lineGenerator(data);

    /*making svg take available width*/
    const svgElement = d3.select(ref.current);
    svgElement.attr("width", svgWidth).attr("height", svgHeight);

    /* tooltip*/
    const parent = svgElement.node().parentNode;

    const onMouseOver = (event, d, i) => {
      const xOffset = 30;
      const yOffset = 50;
      let position = [0, 0];
      if (event) {
        const rect = event.target.getBoundingClientRect();
        const parentDiv = event.target.closest(".time").getBoundingClientRect();
        const x = rect.left - parentDiv.left;
        const y = rect.top - parentDiv.top;
        position = [x + xOffset, y + yOffset];
        const tooltipWidth = 600;
        if (rect.left + x + tooltipWidth + xOffset > window.innerWidth) {
          position[0] = x - tooltipWidth * 0.6;
        }
      }

      setDisplayTooltip(true);
      setTooltipData({ data: d, index: i, position });
      highlightCircle(i);
    };

    const onMouseOut = (event, d, i) => {
      unHighlightCircle(i);
    };

    /* g element */
    const g = svgElement.append("g");
    g.attr("transform", `translate(${0},${graphicPosition})`);

    /*Horizontal Line */
    g.append("path")
      .attr("d", pathString)
      .attr("stroke-width", lineWidth)
      .attr("stroke", lineColor);

    /*Vertical lines */
    g.selectAll(".tick")
      .data(posts)
      .enter()
      .append("path")
      .attr("d", (d, i) =>
        lineGenerator([
          [xScale(i), 0],
          [
            xScale(i),
            pointPosition(i) === "top" ? tickLength(i) * -1 : tickLength(i),
          ],
        ])
      )
      .attr("stroke-width", lineWidth)
      .attr("stroke", (d, i) => {
        return pointLineColor(i);
      })
      .on("mouseover", function (event, d, i) {});

    /* Circles */
    g.selectAll(".circle")
      .data(posts)
      .enter()
      .append("circle")
      .attr("id", (d, i) => {
        return getCircleId(i);
      })
      .attr("cx", (d, i) => {
        return xScale(i);
      })
      .attr("cy", 0)
      .attr("id", (d, i) => {
        return getCircleId(i);
      })
      .attr("r", (d, i) => {
        return size(i);
      })
      .style("stroke-width", 3)
      .style("cursor", enableCirclePopup ? "pointer" : "default")
      .style("fill", (d, i) => {
        return circleColor(i);
      })
      .on("mouseover", function (event, d) {
        if (enableCirclePopup) {
          onMouseOver(event, d, postsIndexMap[d.id]);
        }
      })
      .on("mouseout", function (event, d, i) {
        if (enableCirclePopup) {
          onMouseOut(event, d, postsIndexMap[d.id]);
          if (closePopupOnMouseOut) {
            setDisplayTooltip(false);
            setTooltipData(null);
          }
        }
      });

    /* Label (post subtitle custom field) */
    g.selectAll(".label")
      .data(posts)
      .enter()
      .append("foreignObject")
      .attr("id", (d, i) => {
        return "label" + i;
      })
      .attr("x", function (d, i) {
        return xScale(i) - subtitleWidth / 2;
      })
      .attr("width", subtitleWidth)
      .attr("height", subtitleHeight)
      .attr("overflow", "visible")
      .style("opacity", 1)
      .attr("y", (d, i) => subtitleOffset(i))
      .append("xhtml:div")
      .style("color", (d, i) => labelColor(i))
      .style("font-size", parseInt(fontSize) - 2 + "px")
      .style("line-height", "100%")
      .style("text-align", "center")
      .html((d, i) => {
        return d["meta_fields"]["subtitle"];
      })
      .on("mouseover", (event, d, i) => {
        //onMouseOver(d, i)
      })
      .on("mouseout", (event, d, i) => {
        //onMouseOut(d, i)
      })
      .classed("subtitle-class", true); // add the class "subtitle-class" to the div element

    /*Title*/
    g.selectAll(".title")
      .data(posts)
      .enter()
      .append("foreignObject")
      .attr("x", function (d, i) {
        return xScale(i) - titleWidth / 2;
      })
      .attr("width", titleWidth)
      .attr("height", titleHeight)
      .attr("overflow", "visible")
      .style("opacity", 1)
      .attr("y", (d, i) => titleOffset(i))
      .append("xhtml:div")
      .attr("id", (d, i) => {
        return getTitleId(i);
      })
      .style("font-size", parseInt(fontSize) + 1 + "px")
      .style("color", (d, i) => titleColor(i))
      .style("font-weight", (d) => "bold")
      .style("line-height", "100%")
      .style("text-align", "center")
      .style("cursor", enableTitlePopup ? "pointer" : "default")
      .style("overflow-wrap", "break-word")
      .html((d, i) => {
        const readmore = readMoreLabel(i);
        let title = d.title.rendered;
        if (readmore) {
          title += `<br><span style="font-size:${
            parseInt(fontSize) - 3
          }px;color:${titleColor(i)}">${readmore}</span>`;
        }
        return title;
      })
      .on("mouseover", (event, d, i) => {
        if (enableTitlePopup) {
          onMouseOver(event, d, postsIndexMap[d.id]);
        }
      })
      .on("mouseout", (event, d, i, e) => {
        if (enableTitlePopup) {
          onMouseOut(event, d, postsIndexMap[d.id]);
          if (closePopupOnMouseOut) {
            setDisplayTooltip(false);
            setTooltipData(null);
          }
        }
      });

    if (enableDefaultPopup) {
      let defaultDisplayed = false;
      if (enableCirclePopup) {
        defaultDisplayed = true;
        d3.select("#" + getCircleId(DEFAULT_HIGHLIGHTED_POST)).dispatch(
          "mouseover"
        );
      }
      if (!defaultDisplayed && enableTitlePopup) {
        d3.select("#" + getTitleId(DEFAULT_HIGHLIGHTED_POST)).dispatch(
          "mouseover"
        );
      }
    }
  }, []);

  return (
    <div
      className={"time line"}
      onMouseLeave={(event) => {
        let classes = event.target.getAttribute("class");
        //if event is from link in tooltip, dont hide the tooltip
        if (classes !== "ui fluid container excerpt") {
          setDisplayTooltip(false);
          setTooltipData(null);
          unHighlightCircle(DEFAULT_HIGHLIGHTED_POST);
        }
      }}
      onMouseEnter={(event) => {
        if (closePopupOnMouseOut) {
          setDisplayTooltip(false);
          setTooltipData(null);
          unHighlightCircle(DEFAULT_HIGHLIGHTED_POST);
        }
      }}
      style={{ position: "relative" }}
    >
      {posts.map((p, i) => {
        const isVisible = tooltipData && tooltipData.index == i;
        return (
          <div
            className={"tooltip"}
            onMouseOver={() => highlightCircle(i)}
            onMouseOut={() => {
              unHighlightCircle(i);
            }}
            style={{
              left: isVisible ? tooltipData.position[0] : 0,
              top: isVisible ? tooltipData.position[1] : 0,
              position: "absolute",
              pointerEvents: closePopupOnMouseOut ? "none" : "all",
            }}
          >
            {isVisible && (
              <div
                className={"tooltip"}
                style={{
                  backgroundColor: pointLineColor(i),
                  color: tooltipFontColor(i),
                }}
              >
                <PostIntro
                  post={p}
                  key={p.slug}
                  as={Container}
                  style={isVisible ? visibleStyle : hiddenStyle}
                />
              </div>
            )}
          </div>
        );
      })}
      <svg height={height} width={"100%"} ref={ref} />
    </div>
  );
};

const PostCarousel = (props) => {
  const {
    "data-type": type,
    "data-taxonomy": taxonomy,
    "data-categories": categories,
    "data-items": items,
    "data-height": height,
    "data-line-color": lineColor = "#000",
    "data-config": config = "{}",
    "data-position": position = "middle",
    "data-line-width": lineWidth = "1",
    "data-margin-left": marginLeft = 50,
    "data-margin-top": marginTop = 25,
    "data-margin-right": marginRight = 50,
    "data-margin-bottom": marginBottom = 25,
    "data-font-size": fontSize = 14,
    "data-title-width": titleWidth = 100,
    "data-title-height": titleHeight = 50,
    "data-subtitle-width": subtitleWidth = 50,
    "data-subtitle-height": subtitleHeight = 20,
    "data-enable-title-popup": enableTitlePopup = "false",
    "data-enable-circle-popup": enableCirclePopup = "true",
    "data-enable-default-popup": enableDefaultPopup = "false",
    "data-close-popup-on-mouse-out": closePopupOnMouseOut = "false",
    editing,
    parent,
    unique,
  } = props;

  const locale = props.intl.locale;

  const id = unique ? unique : Math.random().toString(36).substring(2, 9);

  const timeProps = {
    unique: id,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    lineWidth,
    height,
    position,
    lineColor: decodeURIComponent(lineColor),
    config: JSON.parse(decodeURIComponent(config)),
    fontSize,
    titleWidth,
    titleHeight,
    subtitleWidth,
    subtitleHeight,
    enableTitlePopup: enableTitlePopup == true || enableTitlePopup == "true",
    enableCirclePopup: enableCirclePopup == true || enableCirclePopup == "true",
    enableDefaultPopup:
      enableDefaultPopup == true || enableDefaultPopup == "true",
    closePopupOnMouseOut:
      closePopupOnMouseOut == true || closePopupOnMouseOut == "true",
  };
  return (
    <Container
      style={{ height: `${height}px` }}
      className={`viz time line ${editing ? "editing" : ""}`}
      fluid={true}
    >
      <PostProvider
        locale={locale}
        type={type}
        taxonomy={taxonomy}
        categories={categories}
        store={"carousel_" + parent + "_" + unique}
        page={1}
        perPage={items}
      >
        <PostConsumer>
          <TimeLine {...timeProps}></TimeLine>
        </PostConsumer>
      </PostProvider>
    </Container>
  );
};

let carousel;
if(['mobile', 'tablet', 'midTablet'].includes(getDeviceType())) {
    carousel = Carousel
} else {
    carousel = PostCarousel
}

export default carousel;
