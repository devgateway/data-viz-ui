import {PanelBody, PanelRow} from "@wordpress/components";


export const Model = {

    id: Date.now(),
    name: 'New Layer',
    app: "csv",
    dimension1: "none",
    dimension2: "none",
    measures: [],

    filters: [],

    csv: "",

    file: 'none',
    fillColor: '#000000',

    borderColor: '#000000',
    labelColor: '#000000',
    labelFontSize: 5,
    markLabelColor: '#000000',
    markFillColor: '#000000',
    markBorderColor: '#000000',
    markSizeScale: 5,
    labelFilter: [],
    labelSettings: {},
    opacity: 1,
    labelField: 'none',
    type: 'base', //base layer user will select only a file
    //type:'shape', //shape layer user will select file and data source
    //type:'data', //will select data source and symbols + symbols configuration
    useBreaks: false,
    format: {
        "style": "percent",
        "minimumFractionDigits": 1,
        "maximumFractionDigits": 1,
        "currency": "USD",
    },
    featureJoinAttribute: 'none',
    apiJoinAttribute: 'none',
    useCentroidPoint: false,
    usePattern: false,
    patternDiscriminator: 'none',
    patterns: [],
    tooltip: "Value {value}",
    breaks: [],

}


export default Model