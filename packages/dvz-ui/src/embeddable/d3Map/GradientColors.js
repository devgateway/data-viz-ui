
const sequentialColors = [
    {
        "value": "blues",
        "label": "blues",
        "startColor": "#f7fbff",
        "endColor": "#08306b"
    },
    {
        "value": "greens",
        "label": "greens",
        "startColor": "#f7fcf5",
        "endColor": "#00441b"
    },
    {
        "value": "greys",
        "label": "greys",
        "startColor": "#ffffff",
        "endColor": "#000000"
    },
    {
        "value": "oranges",
        "label": "oranges",
        "startColor": "#fff5eb",
        "endColor": "#7f2704"
    },
    {
        "value": "purples",
        "label": "purples",
        "startColor": "#fcfbfd",
        "endColor": "#3f007d"
    },
    {
        "value": "reds",
        "label": "reds",
        "startColor": "#fff5f0",
        "endColor": "#67000d"
    },
    {
        "value": "blue_green",
        "label": "blue_green",
        "startColor": "#f7fcfd",
        "endColor": "#00441b"
    },
    {
        "value": "blue_purple",
        "label": "blue_purple",
        "startColor": "#f7fcfd",
        "endColor": "#4d004b"
    },
    {
        "value": "green_blue",
        "label": "green_blue",
        "startColor": "#f7fcf0",
        "endColor": "#084081"
    },
    {
        "value": "orange_red",
        "label": "orange_red",
        "startColor": "#fff7ec",
        "endColor": "#7f0000"
    },
    {
        "value": "purple_blue_green",
        "label": "purple_blue_green",
        "startColor": "#fff7fb",
        "endColor": "#014636"
    },
    {
        "value": "purple_blue",
        "label": "purple_blue",
        "startColor": "#fff7fb",
        "endColor": "#023858"
    },
    {
        "value": "purple_red",
        "label": "purple_red",
        "startColor": "#f7f4f9",
        "endColor": "#67001f"
    },
    {
        "value": "red_purple",
        "label": "red_purple",
        "startColor": "#fff7f3",
        "endColor": "#49006a"
    },
    {
        "value": "yellow_green_blue",
        "label": "yellow_green_blue",
        "startColor": "#ffffd9",
        "endColor": "#081d58"
    },
    {
        "value": "yellow_green",
        "label": "yellow_green",
        "startColor": "#ffffe5",
        "endColor": "#004529"
    },
    {
        "value": "yellow_orange_brown",
        "label": "yellow_orange_brown",
        "startColor": "#ffffe5",
        "endColor": "#662506"
    },
    {
        "value": "yellow_orange_red",
        "label": "yellow_orange_red",
        "startColor": "#ffffcc",
        "endColor": "#800026"
    }
]

class GradientColors {

    constructor(props) {
        const { gradientScheme, gradientReverse, data = [], defaultFillColor, measure } = props;
        this.defaultFillColor = defaultFillColor;
        this.measure = measure;
        this.valueColors = this.createGradient(gradientScheme, data, gradientReverse);
        this.getColor = this.getColor.bind(this)
    }

    createGradient(gradientScheme, data, gradientReverse) {

        const gradientLimits = sequentialColors.find(sc => sc.value == gradientScheme) || {
            "startColor": "#ffffff",
            "endColor": "#000000"
        };
        const dataSorted = data.slice().sort((a, b) => a[this.measure] - b[this.measure]);

        function hexToRgb(hex) {
            hex = hex.replace(/^#/, '');
            if (hex.length === 3) {
                hex = hex.split('').map(c => c + c).join('');
            }
            return {
                r: parseInt(hex.substr(0, 2), 16),
                g: parseInt(hex.substr(2, 2), 16),
                b: parseInt(hex.substr(4, 2), 16)
            };
        }

        // Convert RGB to hex
        function rgbToHex({ r, g, b }) {
            const toHex = c => c.toString(16).padStart(2, '0');
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        }

        const startHex = gradientReverse ? gradientLimits.endColor : gradientLimits.startColor;
        const endHex = gradientReverse ? gradientLimits.startColor : gradientLimits.endColor;

        this.startColor = startHex;
        this.endColor = endHex;

        const startRgb = hexToRgb(startHex);
        const endRgb = hexToRgb(endHex);
        const valueColors = [];

        for (let i = 0; i < data.length; i++) {
            const ratio = data.length > 1 ? i / (data.length - 1) : 1;
            const r = Math.round(startRgb.r + (endRgb.r - startRgb.r) * ratio);
            const g = Math.round(startRgb.g + (endRgb.g - startRgb.g) * ratio);
            const b = Math.round(startRgb.b + (endRgb.b - startRgb.b) * ratio);
            valueColors.push({ value: dataSorted[i][this.measure], color: rgbToHex({ r, g, b }) });
        }
        return valueColors;
    }

    getColor(value) {

        if (this.valueColors.length > 0) {
            const colorValue = this.valueColors.find(vc => vc.value == value)
            return colorValue?.color || this.defaultFillColor;
        }
        return this.defaultFillColor;
    }

    getStartColor() {

        return this.startColor;
    }

    getEndColor() {
        return this.endColor;
    }

}

export default GradientColors