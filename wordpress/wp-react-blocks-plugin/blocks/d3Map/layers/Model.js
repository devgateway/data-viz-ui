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

    opacity: 1,

    fillColor: '#FFFFFF',
    markFillColor: '#FFFFFF',
    markFillColor2: '#FFFFFF',

    borderColor: '#000000',
    markBorderColor: '#000000',
    markBorderColor2: '#000000',
    markSizeScale: 2,
    markSizeScale2: 2,
    markerLabelSize: 1,

    labelColor: '#000000',
    markLabelColor: '#000000',
    labelFontSize: 2,

    labelFilter: [],
    labelSettings: {},

    labelField: 'none',
    type: 'base', //base layer user will select only a file
    //type:'shape', //shape layer user will select file and data source
    //type:'data', //will select data source and symbols + symbols configuration
    useBreaks: false,
    usePattern: false,
    pointStyleBy: 'none',
    format: {
        "style": "percent",
        "minimumFractionDigits": 1,
        "maximumFractionDigits": 1,
        "currency": "USD",
    },
    featureJoinAttribute: 'none',
    apiJoinAttribute: 'none',
    useCentroidPoint: true,
    patternDiscriminator: 'none',
    patternDiscriminatorLabel: null,
    patterns: [],
    pointDimensionStyles: [],
    tooltip: "Value {value}",
    breaks: [],
    customMeasuresLabels: {},
    visible: true,
    flowValuesFrom: 'origin',
    datasetId: ''    
}


export default Model;