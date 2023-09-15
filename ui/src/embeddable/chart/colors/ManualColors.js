import Colors from "./Colors";

class CustomColors extends Colors {

    constructor(app, type, colorBy, scheme, data, dimensionsMetadata, measuresMetadata, keys, indexBy, manualColors, locale, overallLabel, customLabels) {
        //colorBy, scheme, data, keys, indexBy
        super(colorBy, scheme, data, keys, indexBy)

        this._manualColor = {}

        this._manualColor[overallLabel] = manualColors ? manualColors['Overall'] : null

        //1 dimension by id == by measure        
        if (app != 'csv') {
            const mapByDimension = (whichDimension) => {
                debugger;
                const selectedDimension = [...dimensionsMetadata][whichDimension]

                if (selectedDimension) {
                    items = selectedDimension.items
                }

                if (manualColors != null && manualColors != undefined) {
                    Object.keys(manualColors).forEach(k => {
                        const vals = items.filter(i => i.code === k);
                        if (vals.length > 0 && vals[0].labels) {
                            let translated;
                            if (locale) {
                                translated = vals[0].labels[locale.toUpperCase()]
                            }
                            if (translated) {
                                this._manualColor[translated] = manualColors[k]
                            } else {
                                this._manualColor[vals[0].value] = manualColors[k]
                            }
                        }
                    })
                }
            }

            const mapByMeasure = () => {
                items = measuresMetadata
                Object.keys(manualColors).forEach(k => {
                    const vals = [...items].filter(i => i.value === k);
                    if (vals.length > 0 && vals[0].labels) {
                        const customLabel = customLabels[k]
                        if (customLabels && customLabel) {
                            this._manualColor[customLabel] = manualColors[k]
                        }

                        let translated;
                        if (locale) {
                            translated = vals[0].labels[locale.toUpperCase()]
                        }
                        if (translated) {
                            this._manualColor[translated] = manualColors[k]
                        } else {
                            this._manualColor[vals[0].label] = manualColors[k]
                        }
                    }
                })
            }

            let items = []
            const whichDimension = type == 'line' ? 1 : colorBy === "index" ? 0 : 1

            if (!dimensionsMetadata) {
                mapByMeasure()
            } else if (dimensionsMetadata.size == 1 && whichDimension == 1) {
                //single dimension color by measures
                if (indexBy == "measure") {
                    mapByDimension(0)
                } else {
                    mapByMeasure()
                }
            } else {
                mapByDimension(whichDimension)
            }
        } else {
            this._manualColor = manualColors
        }
    }

    getColor(id, datum) {

        if (this.colorBy === "index") {
            const color = this._manualColor[id] || this._manualColor[datum[this.indexBy]]
            return color ? color : "#5555"
        }
        if (this.colorBy === "id") {
            return this._manualColor[id] ? this._manualColor[id] : "#5555"
        }
        return "#5555";
    }

    getColorByIndex(value) {

    }

    getColorByKey(value) {

        return this._manualColor[value] ? this._manualColor[value] : "#5555";
    }
}


export default CustomColors





