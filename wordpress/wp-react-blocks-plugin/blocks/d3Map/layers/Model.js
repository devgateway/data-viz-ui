import {PanelBody, PanelRow} from "@wordpress/components";

export const FieldSet = {
    "ID ": "id",
    "NAME": "name",
    "APP": "app",
    "DIMENSION_1": "dimension1",
    "DIMENSION_2": "dimension2",
    "MEASURES": "measures",
    "FILTERS": "filters",
    "CSV": "csv",
    "FILE": "file",
    "COLOR": "color",
    "OPACITY": "opacity",
    "LABEL_FIELD": "labelField",
    "TYPE": "type"


}

export class Model {
    id = Date.now();
    name = 'New Layer'
    app = "csv"
    dimension1 = "none"
    dimension2 = "none"
    measures = []

    filters = []

    csv = ""

    file = 'none'
    fillColor = '#000000'

    borderColor = '#000000'
    labelColor = '#000000'
    labelFontSize = 5


    markFillColor = '#000000'
    markBorderColor = '#000000'
    markSizeScale = 0.5
    labelFilter = []
    opacity = 1


    labelField = 'none'
    type = 'base' //base layer user will select only a file
    //type:'shape', //shape layer user will select file and data source
    //type:'data', //will select data source and symbols + symbols configuration

    format = {
        "style": "percent",
        "minimumFractionDigits": 1,
        "maximumFractionDigits": 1,
        "currency": "USD"
    }
    featureJoinAttribute = 'none'
    apiJoinAttribute = 'none'
    useCentroidPoint = false


    tooltip = "Value {value}"
    breaks = []

    constructor() {

    }


}


export default Model