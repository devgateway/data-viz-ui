import React, { useLayoutEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import template from 'string-template';

const percentExpresion = /(\+?\%)[\(]([A-z0-9,.,-]+)\)/gi;
const numericExpresion = /(\+?\#)[\(]([A-z0-9,.,-]+)\)/gi;
const compactExpresion = /(\+?\#C)[\(]([A-z0-9,.,-]+)\)/gi;

// Minimum gap (px) to keep between the tooltip and the viewport edge.
const VIEWPORT_EDGE_MARGIN = 8;

// Shift needed to bring [start, end] inside [0, viewportSize]; 0 if it already fits.
const clampShift = (start, end, viewportSize, overshoot = 0) => {
  if (start < VIEWPORT_EDGE_MARGIN) {
    return VIEWPORT_EDGE_MARGIN - start;
  }
  if (end > viewportSize - VIEWPORT_EDGE_MARGIN) {
    return viewportSize - VIEWPORT_EDGE_MARGIN - end - overshoot;
  }
  return 0;
};

// Nudges an already-positioned tooltip back inside the viewport via a
// corrective transform, without touching the chart library's own positioning
// (chart libraries like nivo can place tooltips past the screen edge).
export const clampTooltipToViewport = (el) => {
  if (!el || typeof window === "undefined") {
    return;
  }

  // Reset so we measure relative to the library's original position.
  el.style.transform = "";

  const rect = el.getBoundingClientRect();
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
  const mobileOvershoot = viewportWidth < 768 ? 12 : 40; // extra room on narrow viewports

  const shiftX = clampShift(rect.left, rect.right, viewportWidth, mobileOvershoot);
  const shiftY = clampShift(rect.top, rect.bottom, viewportHeight);

  if (shiftX || shiftY) {
    el.style.transform = `translate(${Math.round(shiftX)}px, ${Math.round(shiftY)}px)`;
  }
};

// Frames with an unchanged correction before we consider the tooltip settled.
const SETTLE_FRAMES = 6;
// Safety cap on a burst's length (~1s at 60fps) in case position never settles.
const MAX_BURST_FRAMES = 60;

/** 
 * Keeps a tooltip inside the viewport, re-clamping every frame for a short
 * burst whenever it might have moved (mount, resize, scroll) and stopping
 * once the correction settles. The burst is needed because animated wrappers
 * (e.g. nivo + react-spring) can still be mid-animation when we first measure. 
 */
export const useClampTooltipToViewport = (deps = []) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || !window.requestAnimationFrame) {
      clampTooltipToViewport(el);
      return undefined;
    }

    let frameId = null;

    const startBurst = () => {
      if (frameId != null) {
        window.cancelAnimationFrame(frameId);
      }

      let lastTransform = null;
      let unchangedFrames = 0;

      const tick = (frame) => {
        clampTooltipToViewport(el);

        unchangedFrames = el.style.transform === lastTransform ? unchangedFrames + 1 : 0;
        lastTransform = el.style.transform;

        const settled = unchangedFrames >= SETTLE_FRAMES || frame >= MAX_BURST_FRAMES;
        frameId = settled ? null : window.requestAnimationFrame(() => tick(frame + 1));
      };

      tick(0);
    };

    startBurst();

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(startBurst) : null;
    resizeObserver?.observe(el);

    // Capture phase catches scroll on any ancestor, not just the window.
    window.addEventListener("scroll", startBurst, true);
    window.addEventListener("resize", startBurst);

    return () => {
      if (frameId != null) {
        window.cancelAnimationFrame(frameId);
      }
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", startBurst, true);
      window.removeEventListener("resize", startBurst);
    };
  }, deps);

  return ref;
};

const applyFormat = (expresion, str, style, isPercent, intl, container) => {
  // Fall back to the raw string when intl isn't available (e.g. SSR).
  if (!intl || !intl.formatNumber) {
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
  if (!tooltip || !variables) {
    return "";
  }

  // Map the "_${field}" variable to _value when present.
  if (variables.field && variables[`_${variables.field}`]) {
    variables._value = variables[`_${variables.field}`];
  }
  // Fall back to category as the field name.
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

  // Must run before any early return below (rules of hooks).
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
