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
    locale
  ) {
    super(colorBy, scheme, data, keys, indexBy);
    this.colorMap = {};
    this._colorBy = type == "line" ? "id" : colorBy;

    if (this._indexBy && dimensionsMetadata) {
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
