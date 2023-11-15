import {colorSchemes} from "@nivo/colors";
import * as d3 from "d3";

import Colors from './Colors'

class CategoricalColors extends Colors {

    constructor(colorBy, scheme, data, keys, indexBy) {


        super(colorBy, scheme, data, keys, indexBy)

        if (colorBy === "index") {
            this._domain = this.data.map(d => d[this.indexBy])
        }
        if (colorBy === "id") {
            debugger
            this._domain = this.keys
        }

        if (colorBy === "values") {
            const values = data.map(d => keys.map(k => d[k])).flatMap(d => d).filter(n => n != undefined)
            this._domain = [Math.min(...values), Math.max(...values)]
        }


        this._color = d3.scaleOrdinal(colorSchemes[this.scheme])
        this._color.domain(this._domain)

    }



    getColorByValue(value) {
        if (this.colorBy === "values") {
            return "gray"
        }
        return this.color(value)
    }

    getColor(id, datum) {

        if (this.colorBy === "index") {
            return this.color(datum[this.indexBy])
        }
        if (this.colorBy === "id") {
            //console.log(`Bar color  ${id} : ${this.color(id)}`)
            return this.color(id)
        }
        return "gray"
    }

    getColorByIndex(value) {
        if (this.colorBy === "values") {
            return "gray"
        }
        return this.color(value)
    }

    getColorByKey(value) {
        if (this.colorBy === "values") {
            return "gray"
        }

        return this.color(value)
    }


}


export default CategoricalColors





