import Bar from "../Bar";
import Line from "../Line";
import Pie from "../Pie";
import Radar from "../Radar";
import Bump from "../Bump";
import Waterfall from "../Waterfall";
import Dumbbell from "../Dumbbell";
import Histogram from "../Histogram";
import Heatmap from "../Heatmap";
import IntervalPlot from "../IntervalPlot";
import Scatter from "../Scatter";
import Sunburst from "../Sunburst";
import Diverging from "../Diverging";
import CSVDataFrame from "../CSVDataFrame";
import dataFrames from "../data";

export const DEFAULT_CHART_TYPE = "bar";

const hasSelectedMeasures = (measures = []) => Array.isArray(measures) && measures.length > 0;
const hasAtLeastSelectedMeasures = (measures = [], minimum = 1) => Array.isArray(measures) && measures.length >= minimum;
const hasConfiguredDimension = (dimension) => dimension && dimension !== "none";

export const CHART_DEFINITIONS = {
  bar: {
    component: Bar,
    apiDataFrame: dataFrames.BarDataFrame,
    csvType: "bar",
    requiresColorProvider: true,
    supportsMeasureSelector: true,
    isMissingRequiredParams: ({ app, dimension1, selectedMeasures }) =>
      app !== "csv" && !hasConfiguredDimension(dimension1) && !hasSelectedMeasures(selectedMeasures),
  },
  line: {
    component: Line,
    apiDataFrame: dataFrames.LineDataFrame,
    csvType: "line",
    requiresColorProvider: true,
    supportsMeasureSelector: true,
    isMissingRequiredParams: ({ app, dimension1, selectedMeasures }) =>
      app !== "csv" && (!hasConfiguredDimension(dimension1) || !hasSelectedMeasures(selectedMeasures)),
  },
  pie: {
    component: Pie,
    apiDataFrame: dataFrames.PieDataFrame,
    csvType: "pie",
    requiresColorProvider: true,
    supportsMeasureSelector: true,
    isMissingRequiredParams: ({ app, selectedMeasures }) =>
      app !== "csv" && !hasSelectedMeasures(selectedMeasures),
  },
  radar: {
    component: Radar,
    apiDataFrame: dataFrames.BarDataFrame,
    csvType: "radar",
    requiresColorProvider: true,
    supportsMeasureSelector: false,
    isMissingRequiredParams: ({ app, selectedMeasures }) =>
      app !== "csv" && !hasSelectedMeasures(selectedMeasures),
  },
  bump: {
    component: Bump,
    apiDataFrame: dataFrames.LineDataFrame,
    csvType: "bump",
    requiresColorProvider: true,
    supportsMeasureSelector: false,
    isMissingRequiredParams: ({ app, dimension1, selectedMeasures }) =>
      app !== "csv" && (!hasConfiguredDimension(dimension1) || !hasSelectedMeasures(selectedMeasures)),
  },
  waterfall: {
    component: Waterfall,
    apiDataFrame: dataFrames.WaterfallDataFrame,
    csvType: "waterfall",
    requiresColorProvider: false,
    supportsMeasureSelector: false,
    isMissingRequiredParams: ({ app, dimension1, selectedMeasures }) =>
      app !== "csv" && (!hasConfiguredDimension(dimension1) || !hasSelectedMeasures(selectedMeasures)),
  },
  dumbbell: {
    component: Dumbbell,
    apiDataFrame: dataFrames.DumbbellDataFrame,
    csvType: "dumbbell",
    requiresColorProvider: true,
    supportsMeasureSelector: false,
    isMissingRequiredParams: ({ app, dimension1, selectedMeasures }) =>
      app !== "csv" && (!hasConfiguredDimension(dimension1) || !hasAtLeastSelectedMeasures(selectedMeasures, 2)),
  },
  histogram: {
    component: Histogram,
    apiDataFrame: dataFrames.HistogramDataFrame,
    csvType: "histogram",
    requiresColorProvider: true,
    supportsMeasureSelector: false,
    isMissingRequiredParams: ({ app, dimension1, selectedMeasures }) =>
      app !== "csv" && (!hasConfiguredDimension(dimension1) || !hasSelectedMeasures(selectedMeasures)),
  },
  scatter: {
    component: Scatter,
    apiDataFrame: dataFrames.ScatterDataFrame,
    csvType: "scatter",
    requiresColorProvider: true,
    supportsMeasureSelector: false,
    isMissingRequiredParams: ({ app, dimension1, selectedMeasures }) =>
      app !== "csv" && (!hasConfiguredDimension(dimension1) || !hasAtLeastSelectedMeasures(selectedMeasures, 2)),
  },
  heatmap: {
    component: Heatmap,
    apiDataFrame: dataFrames.HeatmapDataFrame,
    csvType: "heatmap",
    requiresColorProvider: false,
    supportsMeasureSelector: false,
    isMissingRequiredParams: ({ app, dimension1, dimension2, selectedMeasures }) =>
      app !== "csv" &&
      (!hasConfiguredDimension(dimension1) ||
        !hasConfiguredDimension(dimension2) ||
        !hasSelectedMeasures(selectedMeasures)),
  },
  sunburst: {
    component: Sunburst,
    apiDataFrame: dataFrames.SunburstDataFrame,
    csvType: "sunburst",
    requiresColorProvider: false,
    supportsMeasureSelector: true,
    isMissingRequiredParams: () => false,
  },
  intervalPlot: {
    component: IntervalPlot,
    apiDataFrame: dataFrames.IntervalPlotDataFrame,
    csvType: "intervalPlot",
    requiresColorProvider: true,
    supportsMeasureSelector: false,
    isMissingRequiredParams: ({ app, dimension1, selectedMeasures }) =>
      app !== "csv" &&
      (!hasConfiguredDimension(dimension1) || !hasAtLeastSelectedMeasures(selectedMeasures, 3)),
  },
  diverging: {
    component: Diverging,
    apiDataFrame: dataFrames.BarDataFrame,
    csvType: "diverging",
    requiresColorProvider: true,
    supportsMeasureSelector: false,
    isMissingRequiredParams: ({ app, dimension1, selectedMeasures }) =>
      app !== "csv" && (!hasConfiguredDimension(dimension1) || !hasAtLeastSelectedMeasures(selectedMeasures, 2)),
  },
};

export const getChartDefinition = (type) => CHART_DEFINITIONS[type] || CHART_DEFINITIONS[DEFAULT_CHART_TYPE];

export const resolveChartDataFrame = ({ type, app }) => {
  const definition = getChartDefinition(type);
  if (app === "csv") {
    return {
      component: CSVDataFrame,
      runtimeType: definition.csvType,
    };
  }

  return {
    component: definition.apiDataFrame,
    runtimeType: type,
  };
};

