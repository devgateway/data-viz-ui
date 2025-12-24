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

    this._manualColor = {};

    this._manualColor[overallLabel] = manualColors
      ? manualColors["Overall"]
      : null;

    if (app != "csv") {
      const mapByDimension = (whichDimension) => {
        items = [...dimensionsMetadata][whichDimension] ? [...dimensionsMetadata][whichDimension].items : [];
        if (manualColors != null && manualColors != undefined) {
          Object.keys(manualColors).forEach((k) => {
            const vals = items.filter((i) => i.code === k);
            if (vals.length > 0 && vals[0].labels) {
              let translated;
              if (locale) {
                translated = vals[0].labels[locale.toUpperCase()];
              }
              if (translated) {
                this._manualColor[translated] = manualColors[k];
              } else {
                this._manualColor[vals[0].value] = manualColors[k];
              }
            }
          });
        }
      };

      const updateItemLabels = (items) => {
        const updatedItems = items?.map((item) => {
          const groupName = item.group.label;
          if (item.label.includes(groupName)) return item;
          return {
            ...item,
            label: `${groupName} - ${item.label}`,
          };
        });
        return updatedItems;
      };

      const ifNoMeasuresUseOptionMeasures = () => {
        if (measuresMetadata && measuresMetadata.size > 0) {
          return measuresMetadata;
        } else if (options?.metadata?.measures.length > 0) {
          options.metadata.measures = updateItemLabels(
            options.metadata.measures
          );
          return options.metadata.measures;
        }
        return [];
      };

      const mapByMeasure = () => {
        items = ifNoMeasuresUseOptionMeasures();
        Object.keys(manualColors).forEach((k) => {
          const vals = [...items].filter((i) => i.value === k);
          if (vals.length > 0 && vals[0].labels) {
            const customLabel = customLabels[k];
            if (customLabels && customLabel) {
              this._manualColor[customLabel] = manualColors[k];
            }

            let translated;
            if (locale) {
              translated = vals[0].labels[locale.toUpperCase()];
            }
            if (translated) {
              this._manualColor[translated] = manualColors[k];
            } else {
              this._manualColor[vals[0].label] = manualColors[k];
            }
          }
        });
      };

      let items = [];
      const whichDimension = type === 'line' ? 1: colorBy === "index" ? 0 : 1;
      if (!dimensionsMetadata) {
        mapByMeasure();
      } else if (dimensionsMetadata.size == 1 && whichDimension == 1) {
        //single dimension color by measures
        if (indexBy == "measure") {
          mapByDimension(0);
        } else {
          mapByMeasure();
        }
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
    if (this.colorBy === "index") {
      const color =
        this._manualColor[id] || this._manualColor[datum[this.indexBy]];
      return color ? color : "#555555";
    }
    if (this.colorBy === "id") {
      return this._manualColor[id] ? this._manualColor[id] : "#555555";
    }
    return "#555555";
  }

  getColorByIndex(value) {}

  getColorByKey(value) {
    return this._manualColor[value] ? this._manualColor[value] : "#555555";
  }
}

export default CustomColors;
