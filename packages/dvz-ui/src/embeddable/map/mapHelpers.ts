// Pure/derived helpers extracted from map.jsx so the component body stays focused on hooks + D3 wiring.
import * as topojson from "topojson-client";
import geostats from "geostats";
import getDeviceCategory from "../../utils/deviceType";

export type Feature = any;
export type MetadataTypes = any[];

export interface LegendBreak {
  min?: number;
  max?: number;
  color?: string;
  measure?: string;
  filters?: Array<{ field: string; values: string }>;
}

export const COLOR_VARIABLE = "_Color_";
export const LOCATION = "location";
export const SHOW_ALL = "showAll";
export const SHOW_IF_HAS_DATA = "ifUnitHasData";
export const MAX_LABEL_LEN = 10;

export const deviceMapHeight: Record<string, number> = {
  mobile: 330,
  tablet: 250,
  midTablet: 250,
  laptop: 200,
  desktop: 100,
  wide: 100,
};

const colorSchemes: Record<string, string[]> = {
  greens: [
    "#ccffdd", "#b3ffcc", "#99ffbb", "#80ffaa", "#66ff99",
    "#4dff88", "#33ff77", "#1aff66", "#00ff55", "#00e64d",
  ],
  greys: [
    "#f2f2f2", "#e6e6e6", "#d9d9d9", "#cccccc", "#bfbfbf",
    "#b3b3b3", "#a6a6a6", "#999999", "#8c8c8c", "#808080",
  ],
  oranges: [
    "#fff0e6", "#ffe0cc", "#ffd1b3", "#ffc299", "#ffb380",
    "#ffa366", "#ff944d", "#ff8533", "#ff751a", "#ff6600",
  ],
  purples: [
    "#ffe6ff", "#ffccff", "#ffb3ff", "#ff99ff", "#ff80ff",
    "#ff66ff", "#ff4dff", "#ff33ff", "#ff1aff", "#ff00ff",
  ],
  reds: [
    "#ffe6e6", "#ffcccc", "#ffb3b3", "#ff9999", "#ff8080",
    "#ff6666", "#ff4d4d", "#ff3333", "#ff1a1a", "#ff0000",
  ],
  blues: [
    "#e6eeff", "#ccddff", "#b3ccff", "#99bbff", "#80aaff",
    "#6699ff", "#4d88ff", "#3377ff", "#1a66ff", "#0055ff",
  ],
};

export function getTranslatedItemLabel(
  data: MetadataTypes | undefined,
  itemNameOrCode: string | undefined,
  locale: string | undefined
): string | undefined {
  if (!data?.length) return itemNameOrCode;

  const items = data[0]?.items ?? [];
  const norm = (s: string | undefined) => s?.trim().toLowerCase() ?? "";
  const want = norm(itemNameOrCode);
  const localeKey = norm(locale).toUpperCase(); // e.g. "am" -> "AM"

  // Find by value (name) or by code
  const item =
    items.find((it: any) => norm(it.value) === want || norm(it.code) === want) ?? null;

  if (!item) return itemNameOrCode;

  // Prefer translated label if present; otherwise fallback to the canonical value
  const label =
    localeKey && item.labels && item.labels[localeKey]
      ? item.labels[localeKey]
      : item.value;

  return label?.trim() || item.value.trim();
}

// `zoomEnabledProp` fallback intentionally checks mobile/tablet/midTablet (differs from the
// 2-category fallback used for the d3 zoom-behavior binding itself) - matches original behavior.
export function classColor(zoomEnabledProp?: boolean): string {
  let zoomEnabled = zoomEnabledProp;
  if (!zoomEnabled) {
    zoomEnabled = ["mobile", "tablet", "midTablet"].includes(getDeviceCategory());
  }
  return zoomEnabled ? "active zoom-enabled" : "active";
}

export function generateBreaks(
  data: Feature[] | undefined,
  options: { autoGenerateBreaks?: boolean; numberOfBreaks: number; colorScheme: string }
): LegendBreak[] {
  const { autoGenerateBreaks, numberOfBreaks, colorScheme } = options;
  const generatedBreaks: LegendBreak[] = [];
  if (autoGenerateBreaks && data && data.length > 0) {
    const parsedData = data
      .filter((d) => d.properties && d.properties.value != null)
      .map((d) => d.properties.value.toFixed(2));

    const values: number[] = [];
    parsedData.forEach((item: any) => {
      if (item > 0) {
        const floor = item * 0.99;
        const ceil = item * 1.01;
        if (values.indexOf(floor) === -1) values.push(floor);
        if (values.indexOf(ceil) === -1) values.push(ceil);
      }
    });

    const colors = colorSchemes[colorScheme];
    if (values.length > 0) {
      const serie: any = new (geostats as any)(values);
      serie.setPrecision(2);
      const numberOfRanges = values.length > 1 ? values.length - 1 : values.length;
      serie.getJenks(Math.min(numberOfBreaks, numberOfRanges));
      serie.ranges.forEach((range: string, i: number) => {
        const legendBreak: LegendBreak = {};
        const adjustment = 0.01;
        legendBreak.min =
          parseFloat(range.substr(0, range.indexOf("-") - 1)) + (i > 0 ? adjustment : 0);
        legendBreak.max = parseFloat(range.substr(range.indexOf("-") + 2, range.length));
        legendBreak.color = colors[i];
        generatedBreaks.push(legendBreak);
      });

      return generatedBreaks;
    }
  }

  return generatedBreaks;
}

export function fillColor(
  d: Feature,
  breaks: LegendBreak[],
  options: {
    mapNoDataColor: string;
    mainLayerId?: string | number;
    enabledLayers: Array<{ id: any; bgColor?: string }>;
    selectedMeasure?: string | null;
  }
): string {
  const { mapNoDataColor, mainLayerId, enabledLayers, selectedMeasure } = options;
  if (d.properties && d.properties.variables && selectedMeasure && d.properties.value != null) {
    const key = COLOR_VARIABLE + selectedMeasure;
    const overrideColor = d.properties.variables[key.trim()];
    if (overrideColor) return overrideColor;
  }

  if (
    d.properties.value != null &&
    ((mainLayerId && d.properties.layerId === mainLayerId) || !mainLayerId)
  ) {
    const breakItem = breaks.find((item) => {
      if (item.min != null && item.max != null) {
        return d.properties.value >= item.min && d.properties.value <= item.max;
      }
      if (item.min != null) return d.properties.value >= item.min;
      if (item.max != null) return d.properties.value <= item.max;
      return false;
    });

    return breakItem && breakItem.color ? breakItem.color : mapNoDataColor;
  }

  const layerProps = enabledLayers.filter((l) => l.id === d.properties.layerId)[0];
  if (layerProps && layerProps.bgColor && (layerProps.bgColor as any) != "undefined") {
    return layerProps.bgColor as string;
  }

  return mapNoDataColor;
}

export function getLabelBoxWidth(d: Feature, mapLabelField: string): number {
  const defaultLength = 80;
  if (d.properties[mapLabelField]) {
    const textLength = d.properties[mapLabelField].length;
    if (textLength < 10) return defaultLength;
    return textLength * 8;
  }
  return 0;
}

export function getLabelBoxHeight(mapLabelShowValue?: boolean): number {
  return mapLabelShowValue ? 30 : 25;
}

export function getCollectionField(mainLayer: any, topoJSONField: string): string {
  if (mainLayer && mainLayer.objects) {
    const fields = Object.keys(mainLayer.objects);
    for (const index in fields) {
      const field = fields[index];
      if (mainLayer.objects[field].type == "GeometryCollection") {
        return field;
      }
    }
  }
  return topoJSONField;
}

export function extractFeatures(mainLayer: any, topoJSONField: string): Feature[] {
  const collectionField = getCollectionField(mainLayer, topoJSONField);
  if (mainLayer && mainLayer.objects && mainLayer.objects[collectionField]) {
    return (topojson as any).feature(mainLayer, mainLayer.objects[collectionField]).features;
  } else if (mainLayer && mainLayer.features) {
    return mainLayer.features;
  }
  return [];
}

export function getTranslatedLocationName(
  d: Feature,
  mappingField: string,
  metadataTypes: MetadataTypes
): string {
  // Check if we should use translated labels for this layer
  if (d.properties.displayLayerLabels && d.properties.layerLocale) {
    const labelField = d.properties.layerMappingField || mappingField;
    const rawLabel = d.properties[labelField];
    return getTranslatedItemLabel(metadataTypes, rawLabel, d.properties.layerLocale) as string;
  }

  return d.properties[mappingField];
}

export function createLabel(
  d: Feature,
  props: {
    mapLabelField: string;
    mapLabelShowValue?: boolean;
    intl: any;
    valueFormat: string;
    showNoDataLabel?: boolean;
    showAdminUnitLabel: string;
    noDataText: string;
    selectedMeasure?: string | null;
  },
  metadataTypes: MetadataTypes,
  formatContent: (format: string, vars: Record<string, any>, intl: any, noDataText?: string) => string
): string {
  const {
    mapLabelField,
    mapLabelShowValue,
    intl,
    valueFormat,
    showNoDataLabel,
    showAdminUnitLabel,
    noDataText,
    selectedMeasure,
  } = props;

  let label = "";
  if (
    showAdminUnitLabel == SHOW_ALL ||
    (showAdminUnitLabel == SHOW_IF_HAS_DATA && d.properties.hasDataRow) ||
    d.properties.displayLayerLabels
  ) {
    const labelField =
      d.properties.displayLayerLabels && d.properties.layerMappingField
        ? d.properties.layerMappingField
        : mapLabelField;
    const rawLabel = d.properties[labelField];

    const locale = d.properties.layerLocale || intl?.locale;
    label = getTranslatedItemLabel(metadataTypes, rawLabel, locale) as string;
    const abbrev = d.properties["abbrev"];
    if (label && label.length > MAX_LABEL_LEN && abbrev) {
      label = abbrev;
    }

    if (mapLabelShowValue) {
      if (d.properties.value != null) {
        const variables = d.properties.variables || {};
        label +=
          "<br><span class='map-label-value'>" +
          formatContent(
            valueFormat,
            { value: d.properties.value, measure: selectedMeasure, ...variables },
            intl
          ) +
          "</span>";
      } else if (showNoDataLabel == true && d.properties.value == null && d.properties.hasDataRow) {
        label += "<br><span class='map-label-value'>" + noDataText + "</span>";
      }
    }
  }

  return label;
}

export function getFilters(appliedFilters: Record<string, any> | undefined): Record<string, string> {
  const results: Record<string, string> = {};
  if (appliedFilters) {
    Object.keys(appliedFilters).forEach((k) => {
      const selected = appliedFilters[k];
      if (selected) {
        results[k] = Array.isArray(selected) ? selected.join(" ,") : selected;
      }
    });
  }
  return results;
}

export function getHighlightedLocationColor(
  data: { value?: number } | undefined,
  breaks: LegendBreak[],
  mapNoDataColor: string
): string {
  const value = data ? data.value : null;
  if (value != null) {
    const breakItem = breaks.find((item) => {
      if (item.min != null && item.max != null) return value >= item.min && value <= item.max;
      if (item.min != null) return value >= item.min;
      if (item.max != null) return value <= item.max;
      return false;
    });
    return breakItem && breakItem.color ? breakItem.color : mapNoDataColor;
  }
  return mapNoDataColor;
}
