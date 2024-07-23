import Colors from "./Colors";

class PlainColor extends Colors {
    constructor(color) {
        super()
        this._color = color
    }

    getColor(id, datum) {
        return this._color;
    }

    getColorByIndex(value) {
        return this._color;
    }

    getColorByKey(value) {
        return this._color;
    }
}


export default PlainColor





