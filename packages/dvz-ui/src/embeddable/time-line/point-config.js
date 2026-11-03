/**
 * Fallback settings for timeline points that have no saved entry in the
 * block's `data-config` array (e.g. posts added after the config was saved).
 */
export const DEFAULT_POINT_CONFIG = {
  position: "bottom",
  connectorLineHeight: 50,
  subtitleOffset: 55,
  titleOffset: 75,
  circleColor: "#000",
  lineColor: "#000",
  titleColor: "#000",
  labelColor: "#000",
  tooltipFontColor: "#fff",
  size: 10,
  readMoreLabel: "",
};

/**
 * Returns the configuration for the point at `idx`. The config array may be
 * shorter than the list of posts (or not an array at all), so fall back to the
 * last configured point and finally to the defaults instead of throwing.
 */
export const getPointConfig = (config, idx) => {
  const list = Array.isArray(config) ? config : [];
  const entry = list[idx] || list[list.length - 1] || {};
  return { ...DEFAULT_POINT_CONFIG, ...entry };
};
