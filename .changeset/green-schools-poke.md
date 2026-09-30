---
"@devgateway/dvz-ui-react": minor
---

Fix chart tooltips: migrate to floating-ui for proper scroll detection and positioning

- Implemented `useTooltipPosition()` hook using @floating-ui/react with automatic viewport boundary detection (flip/shift middleware)
- Added `useHideTooltipOnScroll()` hook for instant tooltip dismissal on scroll/touch events
- Fixed theme scope styling by anchoring FloatingPortal to nearest `#root` or `.edit-post-visual-editor` ancestor
- Enabled frame-by-frame position tracking via autoUpdate with animationFrame option (required for Nivo's react-spring animations)
- Added independent hover/touch state management for better control over tooltip visibility
- Applied changes to Tooltip.jsx (Bar, Line, Pie charts) and ChartTooltip.jsx (Sankey, GroupedBars)

**Breaking changes:** None. Internal implementation detail; public API unchanged.
**Related:** Addresses off-screen tooltips, scroll persistence
