import React from "react";
import SystemColors from "./SystemColors";
import PlainColor from "./PlainColor";
import ManualColors from "./ManualColors";
import {isCategoricalColorScheme, isSequentialColorScheme} from "@nivo/colors";
import SequentialColors from "./SequentialColors";
import CategoricalColors from "./CategoricalColors";

const COLOR_VARIABLE = "_Color"

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
            options: {data, keys, indexBy, dimensionsMetadata, measuresMetadata}
        } = this.props
        let colorManager;

        
        if (data) {

            if (scheme === "system") {
                colorManager = new SystemColors(app,type,colorBy, scheme, data, keys, indexBy, dimensionsMetadata, measuresMetadata, locale)
            } else if (scheme === "plain_color") {
                colorManager = new PlainColor(barColor)
            } else if (scheme == "manual") {
                colorManager = new ManualColors(app,type,colorBy, scheme, data, dimensionsMetadata, measuresMetadata, keys, indexBy, manualColors, locale,overallLabel)
            } else {

                if (isSequentialColorScheme(scheme)) {
                    colorManager = new SequentialColors(colorBy, scheme, data, keys, indexBy)
                }
                if (isCategoricalColorScheme(scheme)) {
                    colorManager = new CategoricalColors(colorBy, scheme, data, keys, indexBy)
                }
            }

            return (
                <div>
                    {React.Children.map(this.props.children, (child => React.cloneElement(child, {
                        ...this.props,
                        colorGenerator: colorManager
                    })))}
                </div>
            );
        }else{
            return null
        }

    }
}

export default ColorProvider;