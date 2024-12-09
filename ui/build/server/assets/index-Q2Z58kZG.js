import { jsx, jsxs } from "react/jsx-runtime";
import "react-compiler-runtime";
import { useRef, useState, useEffect } from "react";
import { c as PostProvider, d as PostConsumer } from "./server-build-C_g_IF5C.js";
import { Container, Modal } from "semantic-ui-react";
import { P as PostIntro } from "./PostIntro-5si_cZk4.js";
/* empty css                           */
import * as d3 from "d3";
import { g as getDeviceType } from "./deviceType-CnQNKjrj.js";
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
const visibleStyle$1 = {
  visibility: "visible",
  position: "relative",
  height: "auto",
  width: "auto"
};
const DEFAULT_HIGHLIGHTED_POST$1 = 0;
const TimeLine$1 = (props) => {
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
    unique
  } = props;
  let {
    height,
    lineWidth,
    lineColor,
    subtitleWidth
  } = props;
  height = window.innerHeight;
  subtitleWidth = 250;
  const ref = useRef();
  const parentRef = useRef();
  const [displayTooltip, setDisplayTooltip] = useState(false);
  const [parentWidth, setParentWidth] = useState(0);
  const [tooltipData, setTooltipData] = useState(null);
  const getCircleId = (idx) => "circle" + unique + idx;
  const getTitleId = (idx) => "title" + unique + idx;
  const size = (idx) => {
    var _a;
    return ((_a = config[idx]) == null ? void 0 : _a.size) || 10;
  };
  const TooltipModal = ({ content, isOpen, style }) => {
    const addInlineStylesToHTML = (html) => {
      return html.replace(
        /<ul(.*?)>/g,
        '<ul class="has-white-color has-text-color has-standard-14-font-size" style="list-style-type:disc !important; list-style: initial !important; padding-left:20px; color:#fefefe;">'
      );
    };
    return /* @__PURE__ */ jsxs(
      Modal,
      {
        open: isOpen,
        onClose: () => setDisplayTooltip(false),
        size: "fullscreen",
        closeIcon: true,
        centered: true,
        style: {
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "0.5rem",
          ...style
        },
        children: [
          /* @__PURE__ */ jsx(Modal.Header, { style: { ...style, borderBottom: "none" } }),
          /* @__PURE__ */ jsx(
            Modal.Content,
            {
              className: "styled-list-content",
              style: { ...style },
              dangerouslySetInnerHTML: {
                __html: addInlineStylesToHTML(
                  content.props.children.props.post.content.rendered
                )
              }
            }
          )
        ]
      },
      content.props.children.key + "modal"
    );
  };
  const circleColor = (idx) => {
    var _a;
    return (_a = config[idx]) == null ? void 0 : _a.circleColor;
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
        let tooltipWidth = 400;
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
        let tooltipWidth = 400;
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
    d3.selectAll("#" + getCircleId(i)).style("stroke", "none").style("fill", circleColor(i));
    d3.selectAll("#label" + i).style("font-weight", "normal");
  };
  const highlightCircle = (i) => {
    unHighlightCircle(DEFAULT_HIGHLIGHTED_POST$1);
    d3.selectAll("#" + getCircleId(i)).style("stroke", circleColor(i)).style("fill", "#fff");
    d3.selectAll("#label" + i).style("font-weight", "bold");
  };
  useEffect(() => {
    const margin = {
      top: marginTop,
      right: marginRight,
      bottom: marginBottom,
      left: marginLeft
    };
    const svgWidth = ref.current.clientWidth;
    const parentWidth2 = parentRef.current.clientWidth;
    if (parentWidth2 > 0) {
      setParentWidth(parentWidth2);
    }
    const svgHeight = height;
    const deviceType = getDeviceType();
    const transformMap = {
      mobile: "75",
      tablet: "150",
      midTablet: "150",
      laptop: "150"
    };
    const subtitleWidthDeviceMap = {
      mobile: "250",
      tablet: "350",
      midTablet: "350",
      laptop: "400"
    };
    const titleXAxis = {
      mobile: 20,
      tablet: 30,
      midTablet: 30,
      laptop: 40
    };
    const yScale = d3.scaleLinear().domain([0, posts.length - 1]).range([margin.top, svgHeight - margin.bottom]);
    const svgElement = d3.select(ref.current);
    svgElement.attr("width", svgWidth).attr("height", svgHeight);
    const lineGenerator = d3.line();
    const data = [
      [0, yScale(0)],
      [0, yScale(posts.length - 1)]
    ];
    const pathString = lineGenerator(data);
    const g = svgElement.append("g").attr("transform", `translate(${transformMap[deviceType]},0)`);
    lineColor = "#E4E5EA";
    lineWidth = 6;
    g.append("path").attr("d", pathString).attr("stroke-width", lineWidth).attr("stroke", lineColor);
    g.selectAll(".circle").data(posts).enter().append("circle").attr("id", (d, i) => getCircleId(i)).attr("cx", 0).attr("cy", (d, i) => yScale(i)).attr("r", (d, i) => size(i)).style("fill", (d, i) => {
      var _a;
      return ((_a = config[i]) == null ? void 0 : _a.circleColor) || "#000";
    }).style("cursor", enableCirclePopup ? "pointer" : "default").on(isTouchDevice() ? "touchstart" : "mouseover", (event, d) => {
      event.preventDefault();
      if (enableCirclePopup) {
        isTouchDevice() ? onTouchStart(event, d) : onMouseOver(event, d);
      }
    }).on("mouseout", (event, d) => {
      event.preventDefault();
      unHighlightCircle(d.id);
    });
    g.selectAll(".title").data(posts).enter().append("foreignObject").attr("x", titleXAxis[deviceType]).attr("y", (d, i) => yScale(i) - parseInt(subtitleHeight) / 2).attr("width", parseInt(subtitleWidthDeviceMap[deviceType])).attr("height", parseInt(subtitleHeight)).append("xhtml:div").attr("id", (d, i) => {
      return getTitleId(i);
    }).style("font-size", parseInt(fontSize) + 1 + "px").style("color", (d, i) => titleColor(i)).style("font-weight", () => "bold").style("line-height", "1.2rem").style("text-align", "left").style("cursor", enableTitlePopup ? "pointer" : "default").html((d, i) => {
      const readmore = readMoreLabel(i);
      let title = d.title.rendered;
      if (readmore) {
        title += `<br><span style="font-size:${parseInt(fontSize) - 3}px;color:${titleColor(
          i
        )};text-decoration:underline;text-underline-offset:3px">${readmore}</span>`;
      }
      return title;
    }).each(function(d, i) {
      const foreignObject = d3.select(this.parentNode);
      setTimeout(() => {
        const bbox = this.getBoundingClientRect();
        foreignObject.attr("height", bbox.height);
        foreignObject.attr("y", yScale(i) - bbox.height / 2);
      }, 0);
    }).on(isTouchDevice() ? "touchstart" : "mouseover", (event, d, i) => {
      event.preventDefault();
      if (enableTitlePopup) {
        isTouchDevice() ? onTouchStart(event, d) : onMouseOver(event, d);
      }
    }).on("mouseout", (event, d, i, e) => {
      event.preventDefault();
      if (enableTitlePopup) {
        onMouseOut(event, d, d.id);
      }
    });
    g.selectAll(".year").data(posts).enter().append("text").attr("x", -40).attr("y", (d, i) => yScale(i)).attr("dy", "0.35em").style("text-anchor", "end").style("font-size", `${parseInt(fontSize) + 2}px`).style("font-weight", "400").style("fill", "#4C4D50").text((d) => {
      return d["meta_fields"]["subtitle"];
    });
    if (enableDefaultPopup) {
      d3.select("#" + getCircleId(DEFAULT_HIGHLIGHTED_POST$1)).dispatch(
        "mouseover"
      );
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "time line", style: { position: "relative" }, ref: parentRef, children: [
    posts.filter((post) => tooltipData && tooltipData.id === post.id).map((post) => {
      const safePostSlug = post.slug || "unknown-slug";
      const id = posts.indexOf(post);
      return /* @__PURE__ */ jsx(
        TooltipModal,
        {
          isOpen: displayTooltip,
          content: /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                backgroundColor: pointLineColor(id),
                color: tooltipFontColor(id)
              },
              children: /* @__PURE__ */ jsx(
                PostIntro,
                {
                  post,
                  style: visibleStyle$1
                },
                safePostSlug
              )
            }
          ),
          closeTooltip,
          style: {
            backgroundColor: pointLineColor(id),
            color: tooltipFontColor(id)
          }
        },
        safePostSlug + "_modal"
      );
    }),
    /* @__PURE__ */ jsx("svg", { height, width: parentWidth, ref })
  ] });
};
const PostCarousel$1 = (props) => {
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
    unique
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
    enableDefaultPopup: enableDefaultPopup == true || enableDefaultPopup == "true",
    closePopupOnMouseOut: closePopupOnMouseOut == true || closePopupOnMouseOut == "true"
  };
  return /* @__PURE__ */ jsx(
    Container,
    {
      style: { height: `${height}px` },
      className: `viz time line ${editing ? "editing" : ""}`,
      fluid: true,
      children: /* @__PURE__ */ jsx(
        PostProvider,
        {
          locale,
          type,
          taxonomy,
          categories,
          store: "carousel_" + parent + "_" + unique,
          page: 1,
          perPage: items,
          children: /* @__PURE__ */ jsx(PostConsumer, { children: /* @__PURE__ */ jsx(TimeLine$1, { ...timeProps }) })
        }
      )
    }
  );
};
const visibleStyle = {
  visibility: "visible",
  position: "relative",
  height: "auto",
  width: "auto"
};
const hiddenStyle = {
  position: "absolute",
  overflow: "hidden",
  display: "none"
};
const DEFAULT_HIGHLIGHTED_POST = 0;
const TimeLine = (props) => {
  const {
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
    unique
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
  const titleOffset = (idx) => {
    return config[idx].titleOffset;
  };
  const circleColor = (idx) => {
    var _a;
    return (_a = config[idx]) == null ? void 0 : _a.circleColor;
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
    d3.selectAll("#" + getCircleId(i)).style("stroke", "none").style("fill", circleColor(i));
    d3.selectAll("#label" + i).style("font-weight", "normal");
  };
  const highlightCircle = (i) => {
    unHighlightCircle(DEFAULT_HIGHLIGHTED_POST);
    d3.selectAll("#" + getCircleId(i)).style("stroke", circleColor(i)).style("fill", "#fff");
    d3.selectAll("#label" + i).style("font-weight", "bold");
  };
  useEffect(() => {
    const margin = {
      top: marginTop,
      right: marginRight,
      bottom: marginBottom,
      left: marginLeft
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
    const svgWidth = ref.current.clientWidth, svgHeight = height;
    const xScale = d3.scaleLinear().domain([0, posts.length - 1]).range([margin.left, svgWidth - margin.right]);
    const lineGenerator = d3.line();
    const data = [
      [xScale(0), 0],
      [xScale(posts.length - 1), 0]
    ];
    const pathString = lineGenerator(data);
    const svgElement = d3.select(ref.current);
    svgElement.attr("width", svgWidth).attr("height", svgHeight);
    svgElement.node().parentNode;
    const onMouseOver = (event, d, i) => {
      const xOffset = 30;
      const yOffset = 50;
      let position2 = [0, 0];
      if (event) {
        const rect = event.target.getBoundingClientRect();
        const parentDiv = event.target.closest(".time").getBoundingClientRect();
        const x = rect.left - parentDiv.left;
        const y = rect.top - parentDiv.top;
        position2 = [x + xOffset, y + yOffset];
        let tooltipWidth = 600;
        if (rect.left + x + tooltipWidth + xOffset > window.innerWidth) {
          position2[0] = x - tooltipWidth * 0.6;
        }
      }
      setDisplayTooltip(true);
      setTooltipData({ data: d, index: i, position: position2 });
      highlightCircle(i);
    };
    const onMouseOut = (event, d, i) => {
      unHighlightCircle(i);
    };
    const g = svgElement.append("g");
    g.attr("transform", `translate(${0},${graphicPosition})`);
    g.append("path").attr("d", pathString).attr("stroke-width", lineWidth).attr("stroke", lineColor);
    g.selectAll(".tick").data(posts).enter().append("path").attr(
      "d",
      (d, i) => lineGenerator([
        [xScale(i), 0],
        [
          xScale(i),
          pointPosition(i) === "top" ? tickLength(i) * -1 : tickLength(i)
        ]
      ])
    ).attr("stroke-width", lineWidth).attr("stroke", (d, i) => {
      return pointLineColor(i);
    }).on("mouseover", function(event, d, i) {
    });
    g.selectAll(".circle").data(posts).enter().append("circle").attr("id", (d, i) => {
      return getCircleId(i);
    }).attr("cx", (d, i) => {
      return xScale(i);
    }).attr("cy", 0).attr("id", (d, i) => {
      return getCircleId(i);
    }).attr("r", (d, i) => {
      return size(i);
    }).style("stroke-width", 3).style("cursor", enableCirclePopup ? "pointer" : "default").style("fill", (d, i) => {
      return circleColor(i);
    }).on("mouseover", function(event, d) {
      if (enableCirclePopup) {
        onMouseOver(event, d, postsIndexMap[d.id]);
      }
    }).on("mouseout", function(event, d, i) {
      if (enableCirclePopup) {
        onMouseOut(event, d, postsIndexMap[d.id]);
        if (closePopupOnMouseOut) {
          setDisplayTooltip(false);
          setTooltipData(null);
        }
      }
    });
    g.selectAll(".label").data(posts).enter().append("foreignObject").attr("id", (d, i) => {
      return "label" + i;
    }).attr("x", function(d, i) {
      return xScale(i) - subtitleWidth / 2;
    }).attr("width", subtitleWidth).attr("height", subtitleHeight).attr("overflow", "visible").style("opacity", 1).attr("y", (d, i) => subtitleOffset(i)).append("xhtml:div").style("color", (d, i) => labelColor(i)).style("font-size", parseInt(fontSize) - 2 + "px").style("line-height", "100%").style("text-align", "center").html((d, i) => {
      return d["meta_fields"]["subtitle"];
    }).on("mouseover", (event, d, i) => {
    }).on("mouseout", (event, d, i) => {
    }).classed("subtitle-class", true);
    g.selectAll(".title").data(posts).enter().append("foreignObject").attr("x", function(d, i) {
      return xScale(i) - titleWidth / 2;
    }).attr("width", titleWidth).attr("height", titleHeight).attr("overflow", "visible").style("opacity", 1).attr("y", (d, i) => titleOffset(i)).append("xhtml:div").attr("id", (d, i) => {
      return getTitleId(i);
    }).style("font-size", parseInt(fontSize) + 1 + "px").style("color", (d, i) => titleColor(i)).style("font-weight", (d) => "bold").style("line-height", "100%").style("text-align", "center").style("cursor", enableTitlePopup ? "pointer" : "default").html((d, i) => {
      const readmore = readMoreLabel(i);
      let title = d.title.rendered;
      if (readmore) {
        title += `<br><span style="font-size:${parseInt(fontSize) - 3}px;color:${titleColor(i)}">${readmore}</span>`;
      }
      return title;
    }).on("mouseover", (event, d, i) => {
      if (enableTitlePopup) {
        onMouseOver(event, d, postsIndexMap[d.id]);
      }
    }).on("mouseout", (event, d, i, e) => {
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "time line",
      onMouseLeave: (event) => {
        let classes = event.target.getAttribute("class");
        if (classes !== "ui fluid container excerpt") {
          setDisplayTooltip(false);
          setTooltipData(null);
          unHighlightCircle(DEFAULT_HIGHLIGHTED_POST);
        }
      },
      onMouseEnter: (event) => {
        if (closePopupOnMouseOut) {
          setDisplayTooltip(false);
          setTooltipData(null);
          unHighlightCircle(DEFAULT_HIGHLIGHTED_POST);
        }
      },
      style: { position: "relative" },
      children: [
        posts.map((p, i) => {
          const isVisible = tooltipData && tooltipData.index == i;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: "tooltip",
              onMouseOver: () => highlightCircle(i),
              onMouseOut: () => {
                unHighlightCircle(i);
              },
              style: {
                left: isVisible ? tooltipData.position[0] : 0,
                top: isVisible ? tooltipData.position[1] : 0,
                position: "absolute",
                pointerEvents: closePopupOnMouseOut ? "none" : "all"
              },
              children: isVisible && /* @__PURE__ */ jsx(
                "div",
                {
                  className: "tooltip",
                  style: {
                    backgroundColor: pointLineColor(i),
                    color: tooltipFontColor(i)
                  },
                  children: /* @__PURE__ */ jsx(
                    PostIntro,
                    {
                      post: p,
                      as: Container,
                      style: isVisible ? visibleStyle : hiddenStyle
                    },
                    p.slug
                  )
                }
              )
            }
          );
        }),
        /* @__PURE__ */ jsx("svg", { height, width: "100%", ref })
      ]
    }
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
    unique
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
    enableDefaultPopup: enableDefaultPopup == true || enableDefaultPopup == "true",
    closePopupOnMouseOut: closePopupOnMouseOut == true || closePopupOnMouseOut == "true"
  };
  return /* @__PURE__ */ jsx(
    Container,
    {
      style: { height: `${height}px` },
      className: `viz time line ${editing ? "editing" : ""}`,
      fluid: true,
      children: /* @__PURE__ */ jsx(
        PostProvider,
        {
          locale,
          type,
          taxonomy,
          categories,
          store: "carousel_" + parent + "_" + unique,
          page: 1,
          perPage: items,
          children: /* @__PURE__ */ jsx(PostConsumer, { children: /* @__PURE__ */ jsx(TimeLine, { ...timeProps }) })
        }
      )
    }
  );
};
let carousel;
if (["mobile", "tablet", "midTablet"].includes(getDeviceType())) {
  carousel = PostCarousel$1;
} else {
  carousel = PostCarousel;
}
const carousel$1 = carousel;
export {
  carousel$1 as default
};
