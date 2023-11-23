import * as d3 from "d3";


class BreaksStyles {

    constructor(props) {
        const {breaks, defaultFillColor, defaultBorderColor, defaultSize} = props;
        this.breaks = breaks;
        this.defaultFillColor = defaultFillColor
        this.defaultBorderColor = defaultBorderColor
        this.defaultSize = defaultSize
        const lessThan = breaks.filter(b => b.type !== 'graterThan');
        const graterThanStyles = breaks.filter(b => b.type === 'graterThan');
        if (graterThanStyles.length > 0) {
            this.graterThanStyle = graterThanStyles[0];
        }

        this.domain = lessThan.map(d => Number(d.end))

        this.sizeScale = d3.scaleThreshold()
            .domain(this.domain)
            .range(lessThan.map(d => d.size));

        this.colorScale = d3.scaleThreshold()
            .domain(lessThan.map(d => d.end))
            .range(breaks.map(d => d.color));


        this.getSize = this.getSize.bind(this)
        this.getColor = this.getColor.bind(this)
    }


    getSize(value) {

        if (this.breaks.length > 0) {
            if (value > Math.max(...this.domain)) {
                return this.graterThanStyle.size
            }
            return this.defaultSize + this.sizeScale(value)
        }
        return this.defaultSize
    }


    getColor(value, isMarker) {

        if (this.breaks.length > 0) {
            if (value > Math.max(...this.domain)) {
                return this.graterThanStyle.color
            }
            return this.colorScale(value)

        }


        return this.defaultFillColor
    }

}

export default BreaksStyles