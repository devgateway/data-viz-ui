class Colors {

    constructor(colorBy, scheme, data, keys, indexBy) {
        this._colorBy = colorBy;
        this._scheme = scheme;
        this._data = data;
        this._keys = keys;
        this._indexBy = indexBy;
        this._domain = [];
        this._color = null

    }

    get domain() {
        return this._domain;
    }

    get color() {
        return this._color;
    }

    get maxValue() {
        return this.domain && this.domain.length > 0 ? this.domain[1] : 0
    }

    get minValue() {
        return this.domain && this.domain.length > 0 ? this.domain[0] : 0
    }

    get colorBy() {
        return this._colorBy;
    }

    get scheme() {
        return this._scheme;
    }

    get data() {
        return this._data;
    }

    get keys() {
        return this._keys;
    }

    get indexBy() {
        return this._indexBy;
    }

    getColor(id, datum) {


    }

    getColorByIndex(value) {

    }

    getColorByKey(value) {

    }

    getColorByValue(value) {
        return this.color ? this.color(value) : null
    }
}

export default Colors