import Colors from "./Colors";

class CustomColors extends Colors {
  constructor(
    app,
    type,
    colorBy,
    scheme,
    data,
    dimensionsMetadata,
    measuresMetadata,
    keys,
    indexBy,
    manualColors = {},
    locale,
    overallLabel,
    customLabels,
    options
  ) {
    super(colorBy, scheme, data, keys, indexBy);
    this.type = type;

    this._manualColor = {};

    if (overallLabel) {
      this._manualColor[overallLabel] = manualColors
        ? manualColors["Overall"]
        : null;
    }

    if (app !== "csv") {
      const mapByDimension = (whichDimension) => {
        const dimsArray = dimensionsMetadata ? [...dimensionsMetadata] : [];
        const items = dimsArray[whichDimension] ? dimsArray[whichDimension].items || [] : [];
        if (manualColors != null && manualColors != undefined) {
          Object.keys(manualColors).forEach((k) => {
            const vals = items.filter((i) => i.code === k || i.value === k || i.id === k || i.label === k);
            const color = manualColors[k];
            this._manualColor[k] = color;

            if (vals.length > 0) {
              const val = vals[0];
              if (val.value !== undefined) this._manualColor[val.value] = color;
              if (val.label !== undefined) this._manualColor[val.label] = color;
              if (val.code !== undefined) this._manualColor[val.code] = color;
              if (val.id !== undefined) this._manualColor[val.id] = color;

              const customLabel = customLabels && (customLabels[k] || (val.value && customLabels[val.value]) || (val.code && customLabels[val.code]));
              if (customLabel) {
                this._manualColor[customLabel] = color;
              }

              if (val.labels) {
                let translated;
                if (locale) {
                  translated = val.labels[locale.toUpperCase()];
                }
                if (translated) {
                  this._manualColor[translated] = color;
                }
                Object.values(val.labels).forEach((l) => {
                  if (l) this._manualColor[l] = color;
                });
              }
            }
          });
        }
      };

      const updateItemLabels = (items) => {
        const updatedItems = items?.map((item) => {
          const groupName = item.group?.label;
          if (!groupName || item.label?.includes(groupName)) return item;
          return {
            ...item,
            label: `${groupName} - ${item.label}`,
          };
        });
        return updatedItems;
      };

      const ifNoMeasuresUseOptionMeasures = () => {
        if (measuresMetadata && measuresMetadata.size > 0) {
          return [...measuresMetadata];
        } else if (options?.metadata?.measures && options.metadata.measures.length > 0) {
          options.metadata.measures = updateItemLabels(
            options.metadata.measures
          );
          return options.metadata.measures;
        }
        return [];
      };

      const mapByMeasure = () => {
        const items = ifNoMeasuresUseOptionMeasures();
        if (manualColors != null && manualColors != undefined) {
          Object.keys(manualColors).forEach((k) => {
            const vals = [...items].filter((i) => i.value === k || i.code === k || i.id === k || i.label === k);
            const color = manualColors[k];
            this._manualColor[k] = color;

            if (vals.length > 0) {
              const val = vals[0];
              if (val.value !== undefined) this._manualColor[val.value] = color;
              if (val.label !== undefined) this._manualColor[val.label] = color;
              if (val.code !== undefined) this._manualColor[val.code] = color;
              if (val.id !== undefined) this._manualColor[val.id] = color;

              const customLabel = customLabels && (customLabels[k] || (val.value && customLabels[val.value]) || (val.code && customLabels[val.code]));
              if (customLabel) {
                this._manualColor[customLabel] = color;
              }

              if (val.labels) {
                let translated;
                if (locale) {
                  translated = val.labels[locale.toUpperCase()];
                }
                if (translated) {
                  this._manualColor[translated] = color;
                }
                Object.values(val.labels).forEach((l) => {
                  if (l) this._manualColor[l] = color;
                });
              }
            }
          });
        }
      };

      const whichDimension = type === 'line' ? 1 : colorBy === "index" ? 0 : 1;
      if (!dimensionsMetadata || dimensionsMetadata.size === 0) {
        mapByMeasure();
      } else if (dimensionsMetadata.size == 1 && whichDimension == 1) {
        //single dimension color by measures
        if (indexBy == "measure") {
          mapByDimension(0);
        } else {
          mapByMeasure();
        }
      } else if (dimensionsMetadata.size == 1 && whichDimension == 0) {
        mapByDimension(0);
      } else {
        mapByDimension(whichDimension);
      }
    } else {
      // For CSV, colors are nested by colorBy mode: manualColors['index'] or manualColors['id']
      // Get the colors for the current colorBy mode, or empty object if not set
      this._manualColor = (manualColors && manualColors[colorBy]) ? manualColors[colorBy] : {};
    }
  }

  getColor(id, datum) {
    if (this._manualColor[id]) {
      return this._manualColor[id];
    }
    if (datum) {
      if (this.indexBy && datum[this.indexBy] && this._manualColor[datum[this.indexBy]]) {
        return this._manualColor[datum[this.indexBy]];
      }
      if (datum.id && this._manualColor[datum.id]) {
        return this._manualColor[datum.id];
      }
      if (datum.label && this._manualColor[datum.label]) {
        return this._manualColor[datum.label];
      }
      if (datum.value && this._manualColor[datum.value]) {
        return this._manualColor[datum.value];
      }
      if (datum.code && this._manualColor[datum.code]) {
        return this._manualColor[datum.code];
      }
      if (datum.measure && this._manualColor[datum.measure]) {
        return this._manualColor[datum.measure];
      }
      if (datum.measureFieldName && this._manualColor[datum.measureFieldName]) {
        return this._manualColor[datum.measureFieldName];
      }
    }
    if (this.colorBy === "index") {
      const color =
        this._manualColor[id] || (datum && this.indexBy && this._manualColor[datum[this.indexBy]]);
      return color ? color : "#555555";
    }
    if (this.colorBy === "id") {
      return this._manualColor[id] ? this._manualColor[id] : "#555555";
    }
    return "#555555";
  }

  getColorByIndex(value) {
    return this._manualColor[value] ? this._manualColor[value] : "#555555";
  }

  getColorByKey(value) {
    return this._manualColor[value] ? this._manualColor[value] : "#555555";
  }
}

export default CustomColors;
