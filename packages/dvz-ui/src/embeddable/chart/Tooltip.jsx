import React, { useLayoutEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import template from 'string-template';

const percentExpresion = /(\+?\%)[\(]([A-z0-9,.,-]+)\)/gi;
const numericExpresion = /(\+?\#)[\(]([A-z0-9,.,-]+)\)/gi;
const compactExpresion = /(\+?\#C)[\(]([A-z0-9,.,-]+)\)/gi;

// Minimum distance (in px) to keep between the tooltip and the edge of the viewport.
const VIEWPORT_EDGE_MARGIN = 8;

// Nudges an already-positioned element back within the viewport bounds.
// Chart libraries (e.g. nivo) position tooltips relative to the data point,
// which can push them past the left/right/top/bottom edge of the screen -
// most noticeably on narrow/mobile viewports or when the point is near an edge.
// This measures the rendered element and applies a corrective local transform,
// without altering the positioning logic of the chart library itself.
export const clampTooltipToViewport = (el) => {
  if (!el || typeof window === "undefined") {
    return;
  }

  // Reset any previous adjustment before measuring so we always compute
  // the correction relative to the library's original position.
  el.style.transform = "";

  const rect = el.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isMobile = viewportWidth < 768; // Adjust this threshold as needed

  let shiftX = 0;
  if (rect.left < VIEWPORT_EDGE_MARGIN) {
    shiftX = VIEWPORT_EDGE_MARGIN - rect.left;
  } else if (rect.right > viewportWidth - VIEWPORT_EDGE_MARGIN) {
    shiftX = viewportWidth - VIEWPORT_EDGE_MARGIN - rect.right - (isMobile ? 12 : 40); // Adjust for mobile if needed
  }

  let shiftY = 0;
  if (rect.top < VIEWPORT_EDGE_MARGIN) {
    shiftY = VIEWPORT_EDGE_MARGIN - rect.top;
  } else if (rect.bottom > viewportHeight - VIEWPORT_EDGE_MARGIN) {
    shiftY = viewportHeight - VIEWPORT_EDGE_MARGIN - rect.bottom;
  }

  if (shiftX || shiftY) {
    el.style.transform = `translate(${Math.round(shiftX)}px, ${Math.round(shiftY)}px)`;
  }
};

// Hook that keeps a tooltip element within the viewport whenever its
// content (and therefore size/position) changes.
//
// The parent tooltip wrapper (e.g. nivo's TooltipWrapper) animates its
// position with react-spring, so a single one-off measurement can catch it
// mid-animation and "freeze" a correction that overshoots once the
// animation settles. To avoid that, we keep re-measuring on every animation
// frame for as long as the tooltip is mounted, so the applied correction
// always matches the wrapper's current (not intermediate) position.
export const useClampTooltipToViewport = (deps = []) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !window.requestAnimationFrame) {
      clampTooltipToViewport(ref.current);
      return undefined;
    }

    let frameId;
    const tick = () => {
      clampTooltipToViewport(ref.current);
      frameId = window.requestAnimationFrame(tick);
    };
    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, deps);

  return ref;
};

const applyFormat = (expresion, str, style, isPercent, intl, container) => {
  // If intl is not available (e.g., during SSR), use a simple fallback formatter
  if (!intl || !intl.formatNumber) {
    // Return string as-is if intl is not available
    return str;
  }

  let result;
  let str1 = str;
  while ((result = expresion.exec(str)) !== null) {
    const arg = result[2];
    const numFormat = result[1];
    const format = (n, d = 2) => {
      return intl.formatNumber(isPercent ? n / 100 : n, {
        maximumFractionDigits: d,
        ...style,
        signDisplay: numFormat && numFormat.startsWith("+") ? "never" : "auto",
      });
    };
    const formatted = format.apply(this, arg.split(","));
    str1 = str1.replaceAll(result[0], formatted);
  }
  return str1;
};

export const formatContent = (
  tooltip,
  variables,
  intl,
  tooltipEnableMarkdown
) => {
  // Guard against undefined/null values
  if (!tooltip || !variables) {
    return "";
  }

  // if variables have a property called "field" and another property with the value being _${field},
  // add _value to the variables object with the value of the _${field} property
  if (variables.field && variables[`_${variables.field}`]) {
    variables._value = variables[`_${variables.field}`];
  }
  //if there is a category prop in the variables and field is not defined, set field to category
  if (!variables.field && variables.category) {
    variables.field = variables.category;
  }
  let str = tooltipEnableMarkdown
    ? template(tooltip, variables)
    : template(tooltip, variables).replace(/(?:\r\n|\r|\n)/g, "<br>");
  str = applyFormat(percentExpresion, str, { style: "percent" }, true, intl);
  str = applyFormat(numericExpresion, str, { style: "decimal" }, false, intl);
  str = applyFormat(
    compactExpresion,
    str,
    { notation: "compact" },
    false,
    intl
  );
  return str;
};

const Tooltip = ({ tooltip, d, intl, tooltipEnableMarkdown }) => {
  let str = "";

  // Guard against undefined/null values during SSR
  if (d && tooltip) {
    const datum = d.datum || d.point || d;
    const { data } = datum || {};

    if (data) {
      const current =
        d.value ||
        (d.datum ? d.datum.value : null) ||
        (d.point ? d.point.data.y : null);

      let vars;
      if (data.variables) {
        vars = typeof data.variables[d.id] === 'object'
          ? data.variables[d.id]
          : data.variables;
      } else {
        vars = data;
      }

      const params = {
        field: d.point ? d.point.serieId : (d.id || ''),
        ...vars,
        value: current,
      };

      if (data.measureFieldName && data.variables) {
        params.populationValue =
          data.variables[data.measureFieldName + "Population"];
      }

      str = formatContent(tooltip, params, intl, tooltipEnableMarkdown);
    }
  }

  // Rules of hooks require this to run on every render, before any
  // conditional early returns based on the computed content.
  const tooltipRef = useClampTooltipToViewport([str, tooltipEnableMarkdown]);

  if (!str) {
    return <div></div>;
  }

  if (tooltipEnableMarkdown) {
    return (
      <div ref={tooltipRef} className={"chart tooltip"}>
        <ReactMarkdown
          children={str}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        ></ReactMarkdown>
      </div>
    );
  } else {
    return (
      <div ref={tooltipRef} className={"chart tooltip"}>
        <div dangerouslySetInnerHTML={{ __html: str }}></div>
      </div>
    );
  }
};

export default Tooltip;
