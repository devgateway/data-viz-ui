import { jsx, jsxs } from "react/jsx-runtime";
import "react-compiler-runtime";
import { useRef, useState, useEffect } from "react";
import { c as PostProvider, d as PostConsumer } from "./server-build-C_g_IF5C.js";
import { Container } from "semantic-ui-react";
import { P as PostIntro } from "./PostIntro-5si_cZk4.js";
/* empty css                           */
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import * as d3 from "d3";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "use-sync-external-store/with-selector.js";
import "react-intl";
import "prop-types";
import "react-dom/client";
import "immutable";
import "papaparse";
import "@devgateway/customizer";
import "@reduxjs/toolkit";
import "@artsy/fresnel";
import "clsx";
import "semantic-ui-react/dist/commonjs/lib/index.js";
import "query-string";
import "./PostIntro-aMWZI1YM.js";
const TimeLine = ({
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
  subtitleWidth,
  onSelectSlide,
  currentSlide
}) => {
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
  const titleOffset = (idx) => {
    return config[idx].titleOffset;
  };
  const circleColor = (idx) => {
    return config[idx].circleColor;
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
  const size = (idx) => {
    return config[idx].size;
  };
  const readMoreLabel = (idx) => {
    return config[idx].readMoreLabel;
  };
  useEffect(() => {
    const margin = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft };
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
    const svgWidth = ref.current.clientWidth, svgHeight = height;
    const xScale = d3.scaleLinear().domain([0, posts.length - 1]).range([margin.left, svgWidth - margin.right]);
    const lineGenerator = d3.line();
    const data = [[xScale(0), 0], [xScale(posts.length - 1), 0]];
    const pathString = lineGenerator(data);
    const svgElement = d3.select(ref.current);
    svgElement.attr("width", svgWidth).attr("height", svgHeight);
    const onclick = (i) => {
      onSelectSlide(i);
    };
    svgElement.node().parentNode;
    const onMouseOver = (d, i) => {
      const offset = 30;
      const position2 = [d3.event.pageX + offset, d3.event.pageY - offset];
      const tooltipWidth = 600;
      if (d3.event.pageX + tooltipWidth + offset > window.innerWidth) {
        position2[0] = d3.event.pageX - tooltipWidth - offset;
      }
      setDisplayTooltip(true);
      setTooltipData({ data: d, index: i, position: position2 });
      d3.selectAll("#circle" + i).style("stroke", circleColor(i)).style("fill", "#fff");
      d3.selectAll("#label" + i).style("font-weight", "bold");
    };
    const onMouseOut = (d, i) => {
      d3.selectAll("#circle" + i).style("stroke", "none").style("fill", circleColor(i));
      d3.selectAll("#label" + i).style("font-weight", "normal");
    };
    const g = svgElement.append("g");
    g.attr("transform", `translate(${0},${graphicPosition})`);
    g.append("path").attr("d", pathString).attr("stroke-width", lineWidth).attr("stroke", lineColor);
    g.selectAll(".tick").data(posts).enter().append("path").attr("d", (d, i) => lineGenerator([[xScale(i), 0], [xScale(i), pointPosition(i) === "top" ? tickLength(i) * -1 : tickLength(i)]])).attr("stroke-width", lineWidth).attr("stroke", (d, i) => {
      return pointLineColor(i);
    }).on("mouseover", function(d, i) {
    });
    g.selectAll(".label").data(posts).enter().append("foreignObject").attr("id", (d, i) => {
      return "label" + i;
    }).attr("x", function(d, i) {
      return xScale(i) - subtitleWidth / 2;
    }).attr("width", subtitleWidth).attr("height", "50px").attr("overflow", "visible").style("opacity", 1).attr("y", (d, i) => subtitleOffset(i)).append("xhtml:div").style("color", (d, i) => labelColor(i)).style("font-size", parseInt(fontSize) - 2 + "px").style("line-height", "100%").style("text-align", "center").html((d, i) => {
      return d["meta_fields"]["subtitle"];
    }).on("mouseover", (d, i) => {
      onMouseOver(d, i);
    }).on("mouseout", (d, i) => {
      onMouseOut(d, i);
    });
    g.selectAll(".title").data(posts).enter().append("foreignObject").attr("x", function(d, i) {
      return xScale(i) - titleWidth / 2;
    }).attr("width", titleWidth).attr("height", "50px").attr("overflow", "visible").style("opacity", 1).attr("y", (d, i) => titleOffset(i)).append("xhtml:div").style("font-size", parseInt(fontSize) + 1 + "px").style("color", (d, i) => titleColor(i)).style("font-weight", (d) => "bold").style("line-height", "100%").style("text-align", "center").html((d, i) => {
      const readmore = readMoreLabel(i);
      let title = d.title.rendered;
      if (readmore) {
        title += `<br><a href="${d.link}" target="_blank" style="font-size:${parseInt(fontSize) - 3}px;color:${titleColor(i)}">${readmore}</a>`;
      }
      return title;
    }).on("mouseover", (d, i) => {
      onMouseOver(d, i);
    }).on("mouseout", (d, i) => {
      onMouseOut(d, i);
    });
    g.selectAll(".circle").data(posts).enter().append("circle").attr("class", (d, i) => {
      if (i == currentSlide) {
        return "active";
      }
      return "normal";
    }).attr("cx", (d, i) => {
      return xScale(i);
    }).attr("cy", 0).attr("id", (d, i) => {
      return "circle" + i;
    }).attr("r", (d, i) => {
      return size(i);
    }).style("stroke-width", 3).style("fill", (d, i) => {
      return circleColor(i);
    }).on("mouseover", function(d, i) {
      onMouseOver(d, i);
    }).on("mouseout", function(d, i) {
      onMouseOut(d, i);
    }).on("click", function(d, i) {
      onclick(i);
    });
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "line", children: /* @__PURE__ */ jsx("svg", { height, width: "100%", ref }) });
};
const Carousel = (props) => {
  let i = 0;
  const { posts, height, interval, autoSwitch, currentSlide } = props;
  return /* @__PURE__ */ jsx(
    CarouselProvider,
    {
      currentSlide,
      interval,
      isPlaying: autoSwitch,
      totalSlides: posts.length,
      children: /* @__PURE__ */ jsx(Slider, { style: { height: `${height}px` }, tag: "ul", children: posts.map((p) => /* @__PURE__ */ jsx(Slide, { index: i++, tag: "li", children: /* @__PURE__ */ jsx(PostIntro, { post: p, fluid: true }) })) })
    }
  );
};
const Component = (props) => {
  const {
    "data-type": type,
    "data-taxonomy": taxonomy,
    "data-categories": categories,
    "data-count": items,
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
    "data-subtitle-width": subtitleWidth = 50,
    editing,
    parent,
    unique
  } = props;
  const [currentSlide, setCurrentSlide] = useState([0]);
  const decode = (value) => {
    if (editing) {
      return value;
    }
    return decodeURIComponent(value);
  };
  const parse = (value) => {
    return JSON.parse(decode(value));
  };
  const timeProps = {
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    lineWidth,
    height: 150,
    position,
    lineColor: decode(lineColor),
    config: JSON.parse(decodeURIComponent(config)),
    fontSize,
    titleWidth,
    subtitleWidth
  };
  return /* @__PURE__ */ jsx(
    Container,
    {
      style: { height: `${height}px` },
      className: `viz new-time-line ${editing ? "" : ""}`,
      fluid: true,
      children: /* @__PURE__ */ jsxs(
        PostProvider,
        {
          type,
          taxonomy,
          categories: parse(categories),
          store: "carousel_" + parent + "_" + unique,
          page: 1,
          perPage: items,
          children: [
            /* @__PURE__ */ jsx(Container, { className: "carousel-section", children: /* @__PURE__ */ jsx(PostConsumer, { children: /* @__PURE__ */ jsx(Carousel, { currentSlide, height: height - 250, interval: 5, autoSwitch: false }) }) }),
            /* @__PURE__ */ jsx(Container, { className: "time-line-section", children: /* @__PURE__ */ jsx(PostConsumer, { children: /* @__PURE__ */ jsx(TimeLine, { currentSlide, onSelectSlide: (i) => {
              setCurrentSlide(i);
            }, ...timeProps }) }) })
          ]
        }
      )
    }
  );
};
export {
  Component as default
};
