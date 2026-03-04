import Colors from "./Colors";

const DEFAULT_SYSTEM_COLOR = "#9F9F9F";

class SystemColors extends Colors {
  constructor(
    app,
    type,
    colorBy,
    scheme,
    data,
    keys,
    indexBy,
    dimensionsMetadata,
    measuresMetadata,
    locale,
    options
  ) {
    super(colorBy, scheme, data, keys, indexBy);
    this.colorMap = {};
    this._colorBy = type == "line" ? "id" : colorBy;
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
        options.metadata.measures = updateItemLabels(options.metadata.measures);
        return options.metadata.measures;
      }
      return [];
    };
    if (this._indexBy && dimensionsMetadata?.size > 0) {
      [...dimensionsMetadata].forEach((c) => {
        if (c && c.items) {
          c.items.forEach((s) => {
            if (locale && s.labels && s.labels[locale.toUpperCase()]) {
              this.colorMap[s.labels[locale.toUpperCase()]] = s.categoryStyle;
            } else {
              this.colorMap[s.value] = s.categoryStyle;
            }
          });
        }
      });
    }
    if (measuresMetadata) {
      measuresMetadata = ifNoMeasuresUseOptionMeasures();
      [...measuresMetadata].forEach((c) => {
        if (c && c.styles) {
          if (locale && c.labels && c.labels[locale.toUpperCase()]) {
            this.colorMap[c.labels[locale.toUpperCase()]] = c.styles;
          } else {
            this.colorMap[c.label] = c.styles;
          }
        }
      });
    }
  }

  getColor(id, datum) {
    if (this._colorBy === "index") {
      return this.colorMap[datum[this._indexBy]]
        ? this.colorMap[datum[this._indexBy]].color
        : DEFAULT_SYSTEM_COLOR;
    } else {
      return this.colorMap[id] ? this.colorMap[id].color : DEFAULT_SYSTEM_COLOR;
    }
  }

  getColorByIndex(value) {
    return this.colorMap[value]
      ? this.colorMap[value].color
      : DEFAULT_SYSTEM_COLOR;
  }

  getColorByKey(value) {
    return this.colorMap[value]
      ? this.colorMap[value].color
      : DEFAULT_SYSTEM_COLOR;
  }
}

export default SystemColors;
