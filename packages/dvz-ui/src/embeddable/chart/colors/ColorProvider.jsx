import React from "react";
import SystemColors from "./SystemColors";
import PlainColor from "./PlainColor";
import ManualColors from "./ManualColors";
import {
  isDivergingColorScheme,
  isCategoricalColorScheme,
  isSequentialColorScheme,
} from "@nivo/colors";
import SequentialColors from "./SequentialColors";
import CategoricalColors from "./CategoricalColors";

const COLOR_VARIABLE = "_Color";

class ColorProvider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      app,
      type,
      colorBy,
      scheme,
      barColor,
      manualColors,
      locale,
      overallLabel,
      customLabels,
      options
    } = this.props;
    let colorManager;
    const {
      data,
      keys,
      indexBy,
      dimensionsMetadata,
      measuresMetadata,
      colorData,
      colorKeys,
      colorIndexBy,
    } = this.props.options;
    const resolvedColorData = colorData || data;
    const resolvedColorKeys = colorKeys || keys;
    const resolvedColorIndexBy = colorIndexBy || indexBy;
    if (data) {
      if (scheme === "system") {
        colorManager = new SystemColors(
          app,
          type,
          colorBy,
          scheme,
          resolvedColorData,
          resolvedColorKeys,
          resolvedColorIndexBy,
          dimensionsMetadata,
          measuresMetadata,
          locale,
          options
        );
      } else if (scheme === "plain_color") {
        colorManager = new PlainColor(barColor);
      } else if (scheme == "manual") {
        colorManager = new ManualColors(
          app,
          type,
          colorBy,
          scheme,
          resolvedColorData,
          dimensionsMetadata,
          measuresMetadata,
          resolvedColorKeys,
          resolvedColorIndexBy,
          manualColors,
          locale,
          overallLabel,
          customLabels,
          options
        );
      } else {
        if (isSequentialColorScheme(scheme) || isDivergingColorScheme(scheme)) {
          colorManager = new SequentialColors(
            colorBy,
            scheme,
            resolvedColorData,
            resolvedColorKeys,
            resolvedColorIndexBy
          );
        }
        if (isCategoricalColorScheme(scheme)) {
          colorManager = new CategoricalColors(
            colorBy,
            scheme,
            resolvedColorData,
            resolvedColorKeys,
            resolvedColorIndexBy
          );
        }
      }

      return (
        <div>
          {React.Children.map(this.props.children, (child) =>
            React.cloneElement(child, {
              ...this.props,
              colorGenerator: colorManager,
            })
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ColorProvider;
