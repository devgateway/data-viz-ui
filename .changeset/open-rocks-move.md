---
"@devgateway/dvz-ui-react": patch
---

Fix chart tooltips extending off-screen near the edges of the viewport, on both desktop and mobile. Tooltips are now clamped to stay within the visible viewport bounds instead of relying solely on the chart library's own (container-relative) positioning.

- `Tooltip.jsx` (used by Bar, Line, Pie and Bump charts) and `ChartTooltip.jsx` (used by GroupedBars and Sankey) now measure the rendered tooltip and nudge it back on-screen if it overflows the left, right, top or bottom edge of the viewport.
- The manual d3 tooltip in `LineLayer.jsx` (line-over-bar overlay) is clamped the same way instead of always positioning itself using unbounded `pageX`/`pageY` offsets.
