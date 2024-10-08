import { sequentialColorInterpolators } from "@nivo/colors";
import * as d3 from "d3";
import Colors from "./Colors";

class SequentialColors extends Colors {
  constructor(colorBy, scheme, data, keys, indexBy) {
    super(colorBy, scheme, data, keys, indexBy);

    if (colorBy === "index") {
      this._domain = [0, this.data.length];
    }
    if (colorBy === "id") {
      this._domain = [0, this.keys.length];
    }
    if (colorBy === "values") {
      const values = data
        .map((d) => keys.map((k) => d[k]))
        .flatMap((d) => d)
        .filter((n) => n != undefined);
      this._domain = [Math.min(...values), Math.max(...values)];
    }

    const interpolator = sequentialColorInterpolators[this.scheme];
    this._color = d3.scaleSequential(interpolator);
    this._color.domain(this._domain);
  }

  getColor(id, datum) {
    if (this.colorBy === "index") {
      const indexes = this.data.map((d) => d[this.indexBy]);
      return this.color(indexes.indexOf(datum[this.indexBy]));
    }
    if (this.colorBy === "id") {
      return this.color(this.keys.indexOf(id));
    }

    if (this.colorBy === "values") {
      return this.color(datum[id]);
    }
  }

  getColorByIndex(value) {
    const indexes = this.data.map((d) => d[this.indexBy]);
    return this.color(indexes.indexOf(value));
  }

  getColorByKey(value) {
    return this.color(this.keys.indexOf(value));
  }
}

export default SequentialColors;
