import React, { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import template from 'string-template';
import { useFloating, autoUpdate, offset, flip, shift, FloatingPortal } from "@floating-ui/react";

const percentExpresion = /(\+?\%)[\(]([A-z0-9,.,-]+)\)/gi;
const numericExpresion = /(\+?\#)[\(]([A-z0-9,.,-]+)\)/gi;
const compactExpresion = /(\+?\#C)[\(]([A-z0-9,.,-]+)\)/gi;

// Minimum gap (px) to keep between the tooltip and the viewport edge.
const VIEWPORT_EDGE_MARGIN = 8;

// Chart libraries like nivo render our tooltip inside their own
// absolutely-positioned wrapper div, placed near the hovered point.
const isNivoTooltipWrapper = (el) => {
  if (!el) {
    return false;
  }

  const inlineStyle = (el.getAttribute("style") || "").toLowerCase();
  return (
    inlineStyle.includes("position: absolute") &&
    inlineStyle.includes("pointer-events: none")
  );
};

/**
 * Positions a tooltip bubble with floating-ui: anchored to wherever the host
 * chart library already placed its wrapper, and kept clear of the viewport
 * edges via the `shift`/`flip` middleware. Render the bubble through
 * <FloatingPortal> so its `fixed` positioning escapes the host wrapper's own
 * transform (nivo animates that transform with react-spring).
 */
export const useTooltipPosition = () => {
  const { refs, floatingStyles } = useFloating({
    placement: "top",
    strategy: "fixed",
    // The reference (nivo's wrapper) moves via a transform, not a resize/
    // layout change, so we need frame-by-frame tracking rather than the
    // default scroll/resize-only observers.
    whileElementsMounted: (referenceEl, floatingEl, update) =>
      autoUpdate(referenceEl, floatingEl, update, { animationFrame: true }),
    middleware: [offset(8), flip(), shift({ padding: VIEWPORT_EDGE_MARGIN })],
  });

  // The theme's `.chart.tooltip` styling (background, border, padding, ...)
  // is compiled scoped under `#root`/`.edit-post-visual-editor`. FloatingPortal
  // defaults to `document.body`, which escapes that scope and drops the
  // styling, so anchor the portal to whichever of those ancestors we find.
  const [portalRoot, setPortalRoot] = useState(null);

  const anchorRef = useCallback(
    (node) => {
      if (!node) {
        return;
      }
      const wrapper = isNivoTooltipWrapper(node.parentElement) ? node.parentElement : node;
      refs.setReference(wrapper);
      setPortalRoot(wrapper.closest("#root, .edit-post-visual-editor") || wrapper.ownerDocument.body);
    },
    [refs]
  );

  return { anchorRef, floatingRef: refs.setFloating, floatingStyles, portalRoot };
};

// Hides sticky/touch-triggered tooltips the instant the user scrolls, touches
// to scroll, or taps anywhere (used to dismiss the tooltip). Listeners are
// passive/capturing so they never block scrolling and fire on nested
// scroll containers, not just the window.
export const useHideTooltipOnScroll = (resetDeps = []) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(false);
  }, resetDeps);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const hide = () => setIsHidden(true);

    window.addEventListener("scroll", hide, { capture: true, passive: true });
    window.addEventListener("touchmove", hide, { capture: true, passive: true });
    window.addEventListener("pointerdown", hide, { capture: true, passive: true });

    return () => {
      window.removeEventListener("scroll", hide, { capture: true });
      window.removeEventListener("touchmove", hide, { capture: true });
      window.removeEventListener("pointerdown", hide, { capture: true });
    };
  }, []);

  return isHidden;
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
  const hideOnScroll = useHideTooltipOnScroll([d, str]);
  // Explicit, event-driven visibility -- independent of nivo's own hover
  // detection -- so the tooltip reacts to mouse/touch events on itself
  // instead of relying solely on the chart library re-rendering it.
  const [isHovered, setIsHovered] = useState(true);
  const { anchorRef, floatingRef, floatingStyles, portalRoot } = useTooltipPosition();

  // A new/changed data point should always start out visible.
  useEffect(() => {
    setIsHovered(true);
  }, [d, str]);

  if (!str) {
    return <div ref={anchorRef}></div>;
  }

  const isVisible = isHovered && !hideOnScroll;

  const show = () => setIsHovered(true);
  const hide = () => setIsHovered(false);
  const handleTouchStart = () => setIsHovered(true);
  const handleTouchEnd = (event) => {
    // Prevent the emulated mouse events that follow a tap from immediately
    // hiding the tooltip we just opened via touch.
    event.preventDefault();
  };

  const content = tooltipEnableMarkdown ? (
    <ReactMarkdown
      children={str}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    ></ReactMarkdown>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: str }}></div>
  );

  return (
    <div ref={anchorRef}>
      <FloatingPortal root={portalRoot}>
        <div
          ref={floatingRef}
          className={"chart tooltip"}
          role="tooltip"
          aria-hidden={!isVisible}
          style={{
            ...floatingStyles,
            visibility: isVisible ? "visible" : "hidden",
            pointerEvents: isVisible ? "auto" : "none",
          }}
          onMouseEnter={show}
          onMouseLeave={hide}
          onMouseOut={hide}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {content}
        </div>
      </FloatingPortal>
    </div>
  );
};

export default Tooltip;
