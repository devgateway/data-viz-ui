import { PostConsumer, PostProvider } from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";
import "pure-react-carousel/dist/react-carousel.es.css";
import React, { useEffect, useRef, useState } from "react";
import { Container } from "semantic-ui-react";
import * as d3 from "d3";
import getDeviceType from "../../utils/deviceType";
import { Modal } from "semantic-ui-react";

const visibleStyle = {
  visibility: "visible",
  position: "relative",
  height: "auto",
  width: "auto",
};

const DEFAULT_HIGHLIGHTED_POST = 0;

const TimeLine = (props) => {
  const {
    posts,
    config,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    fontSize,
    subtitleHeight,
    enableTitlePopup,
    enableCirclePopup,
    enableDefaultPopup,
    closePopupOnMouseOut,
    unique,
  } = props;

  let {
    height,
    lineWidth,
    lineColor,
    subtitleWidth
  } = props;

  height = window.innerHeight;
  // eslint-disable-next-line unused-imports/no-unused-vars
  subtitleWidth = 250;

  const ref = useRef();
  const parentRef = useRef();
  const [displayTooltip, setDisplayTooltip] = useState(false);
  const [parentWidth, setParentWidth] = useState(0);
  const [tooltipData, setTooltipData] = useState(null);

  const getCircleId = (idx) => "circle" + unique + idx;
  const getTitleId = (idx) => "title" + unique + idx;

  const size = (idx) => config[idx]?.size || 10;

  const TooltipModal = ({ content, isOpen, style }) => {
    const addInlineStylesToHTML = (html) => {
      return html.replace(
        /<ul(.*?)>/g,
        '<ul class="has-white-color has-text-color has-standard-14-font-size" style="list-style-type:disc !important; list-style: initial !important; padding-left:20px; color:#fefefe;">'
      );
    };
    return (
      <Modal
        key={content.props.children.key + "modal"}
        open={isOpen}
        onClose={() => setDisplayTooltip(false)}
        size="fullscreen"
        closeIcon
        centered
        style={{
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "0.5rem",
          ...style,
        }}
      >
        <Modal.Header style={{ ...style, borderBottom: "none" }}></Modal.Header>
        <Modal.Content
          className="styled-list-content"
          style={{ ...style }}
          dangerouslySetInnerHTML={{
            __html: addInlineStylesToHTML(
              content.props.children.props.post.content.rendered
            ),
          }}
        ></Modal.Content>
      </Modal>
    );
  };

  const circleColor = (idx) => {
    return config[idx]?.circleColor;
  };

  const titleColor = (idx) => {
    return config[idx].titleColor;
  };

  const pointLineColor = (idx) => {
    return config[idx].lineColor;
  };

  const tooltipFontColor = (idx) => {
    return config[idx].tooltipFontColor || "#fff";
  };

  const readMoreLabel = (idx) => {
    return config[idx].readMoreLabel;
  };

  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  const onTouchStart = (event, d) => {
    event.preventDefault();
    if (isTouchDevice()) {
      const xOffset = 260;
      const yOffset = 50;
      let position = [0, 0];
      if (event) {
        const rect = event.target.getBoundingClientRect();
        const parentDiv = event.target.closest(".time").getBoundingClientRect();
        const x = rect.left - parentDiv.left;
        const y = rect.top + parentDiv.top;
        position = [x + xOffset, y + yOffset];
        const tooltipWidth = 400;
        if (rect.left + x + tooltipWidth + xOffset > window.innerWidth) {
          position[0] = x - tooltipWidth * 0.6;
        }
      }
      setDisplayTooltip(true);
      setTooltipData({ data: d, id: d.id, position });
      highlightCircle(d.id);
    }
  };

  const onMouseOver = (event, d) => {
    event.preventDefault();
    if (!isTouchDevice()) {
      const xOffset = 260;
      const yOffset = 50;
      let position = [0, 0];
      if (event) {
        const rect = event.target.getBoundingClientRect();
        const parentDiv = event.target.closest(".time").getBoundingClientRect();
        const x = rect.left - parentDiv.left;
        const y = rect.top + parentDiv.top;
        position = [x + xOffset, y + yOffset];
        const tooltipWidth = 400;
        if (rect.left + x + tooltipWidth + xOffset > window.innerWidth) {
          position[0] = x - tooltipWidth * 0.6;
        }
      }
      setDisplayTooltip(true);
      setTooltipData({ data: d, id: d.id, position });
      highlightCircle(d.id);
    }
  };

  const onMouseOut = (event, d, i) => {
    event.preventDefault();
    unHighlightCircle(d.id);
  };

  const closeTooltip = () => {
    setDisplayTooltip(false);
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

    const svgWidth = ref.current.clientWidth;
    const parentWidth = parentRef.current.clientWidth;
    if(parentWidth > 0) {
      setParentWidth(parentWidth);
    }
    const svgHeight = height;

    const deviceType = getDeviceType();

    const transformMap = {
      mobile: "75",
      tablet: "150",
      midTablet: "150",
      laptop: "150",
    };

    const subtitleWidthDeviceMap = {
      mobile: "250",
      tablet: "350",
      midTablet: "350",
      laptop: "400",
    };

    const titleXAxis = {
      mobile: 20,
      tablet: 30,
      midTablet: 30,
      laptop: 40,
    };

    // Create a vertical yScale
    const yScale = d3
      .scaleLinear()
      .domain([0, posts.length - 1])
      .range([margin.top, svgHeight - margin.bottom]);

    const svgElement = d3.select(ref.current);
    svgElement.attr("width", svgWidth).attr("height", svgHeight);

    // Define the vertical path line
    const lineGenerator = d3.line();
    const data = [
      [0, yScale(0)],
      [0, yScale(posts.length - 1)],
    ];
    const pathString = lineGenerator(data);

    const g = svgElement
      .append("g")
      .attr("transform", `translate(${transformMap[deviceType]},0)`);
    lineColor = "#E4E5EA";
    lineWidth = 6;

    // Vertical line
    g.append("path")
      .attr("d", pathString)
      .attr("stroke-width", lineWidth)
      .attr("stroke", lineColor);

    // Circles for each event
    g.selectAll(".circle")
      .data(posts)
      .enter()
      .append("circle")
      .attr("id", (d, i) => getCircleId(i))
      .attr("cx", 0)
      .attr("cy", (d, i) => yScale(i))
      .attr("r", (d, i) => size(i))
      .style("fill", (d, i) => config[i]?.circleColor || "#000")
      .style("cursor", enableCirclePopup ? "pointer" : "default")
      .on(isTouchDevice() ? "touchstart" : "mouseover", (event, d) => {
        event.preventDefault();
        if (enableCirclePopup) {
          isTouchDevice() ? onTouchStart(event, d) : onMouseOver(event, d);
        }
      })
      .on("mouseout", (event, d) => {
        event.preventDefault();
        unHighlightCircle(d.id);
        if (closePopupOnMouseOut) {
        }
      });

    // titles (Post Title)
    g.selectAll(".title")
      .data(posts)
      .enter()
      .append("foreignObject")
      .attr("x", titleXAxis[deviceType]) // Move the label to the right of the timeline
      .attr("y", (d, i) => yScale(i) - parseInt(subtitleHeight) / 2)
      .attr("width", parseInt(subtitleWidthDeviceMap[deviceType]))
      .attr("height", parseInt(subtitleHeight))
      .append("xhtml:div")
      .attr("id", (d, i) => {
        return getTitleId(i);
      })
      .style("font-size", parseInt(fontSize) + 1 + "px")
      .style("color", (d, i) => titleColor(i))
      .style("font-weight", () => "bold")
      .style("line-height", "1.2rem")
      .style("text-align", "left")
      .style("cursor", enableTitlePopup ? "pointer" : "default")
      .html((d, i) => {
        const readmore = readMoreLabel(i);
        let title = d.title.rendered;
        if (readmore) {
          title += `<br><span style="font-size:${
            parseInt(fontSize) - 3
          }px;color:${titleColor(
            i
          )};text-decoration:underline;text-underline-offset:3px">${readmore}</span>`;
        }
        return title;
      })
      .each(function (d, i) {
        const foreignObject = d3.select(this.parentNode); // Select the foreignObject

        // Wait for the DOM to be updated before calculating the height
        setTimeout(() => {
          const bbox = this.getBoundingClientRect(); // Get the actual bounding box of the rendered content
          foreignObject.attr("height", bbox.height); // Update the height based on actual content

          // Update y position to vertically center the content
          foreignObject.attr("y", yScale(i) - bbox.height / 2);
        }, 0); // Timeout ensures the DOM is rendered first before measuring
      })
      .on(isTouchDevice() ? "touchstart" : "mouseover", (event, d, i) => {
        event.preventDefault();
        if (enableTitlePopup) {
          isTouchDevice() ? onTouchStart(event, d) : onMouseOver(event, d);
        }
      })
      .on("mouseout", (event, d, i, e) => {
        event.preventDefault();
        if (enableTitlePopup) {
          onMouseOut(event, d, d.id);
          if (closePopupOnMouseOut) {
          }
        }
      });

    g.selectAll(".year")
      .data(posts)
      .enter()
      .append("text")
      .attr("x", -40) // Position years to the left of the circles
      .attr("y", (d, i) => yScale(i))
      .attr("dy", "0.35em")
      .style("text-anchor", "end")
      .style("font-size", `${parseInt(fontSize) + 2}px`)
      .style("font-weight", "400")
      .style("fill", "#4C4D50")
      .text((d) => {
        return d["meta_fields"]["subtitle"];
      });

    if (enableDefaultPopup) {
      d3.select("#" + getCircleId(DEFAULT_HIGHLIGHTED_POST)).dispatch(
        "mouseover"
      );
    }
  }, []);

  return (
    <div className={"time line"} style={{ position: "relative" }} ref={parentRef}>
      {posts
        .filter((post) => tooltipData && tooltipData.id === post.id)
        .map((post) => {
          const safePostSlug = post.slug || "unknown-slug";
          const id = posts.indexOf(post);
          return (
            <TooltipModal
              isOpen={displayTooltip}
              key={safePostSlug + "_modal"}
              content={
                <div
                  style={{
                    backgroundColor: pointLineColor(id),
                    color: tooltipFontColor(id),
                  }}
                >
                  <PostIntro
                    post={post}
                    key={safePostSlug}
                    style={visibleStyle}
                  />
                </div>
              }
              closeTooltip={closeTooltip}
              style={{
                backgroundColor: pointLineColor(id),
                color: tooltipFontColor(id),
              }}
            />
          );
        })}
      <svg height={height} width={parentWidth} ref={ref} />
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
    "data-subtitle-width": subtitleWidth = 250,
    "data-subtitle-height": subtitleHeight = 60,
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

export default PostCarousel;