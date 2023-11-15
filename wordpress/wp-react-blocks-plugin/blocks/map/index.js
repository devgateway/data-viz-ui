import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import Generic from "../icons";

registerBlockType(process.env.BLOCKS_NS+'/map',
    {
        title: __('Data Map'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            height: {
                type: 'Numeric',
                default: 500
            },
            dataSourceLabel: {
                type: 'String',
                default: "Source"
            },
            dataSourceText: {
                type: 'String',
                default: "NIDS"
            },
            source: {
                type: 'string',
                default: '',
            },
            dimension1: {
                type: 'String',
                default: 'zone'
            },
            dimension2: {
                type: 'String',
                default: 'gender'
            },
            app: {
                type: 'String',
                default: "csv"
            },
            measures: {
                type: "Array",
                default: ["prevalenceSmokeAny"]
            },
            filters: {
                type: "Array",
                default: []
            },

            csv: {
                type: "String",
                default: ""
            },
            nationalAverageLabel: {
                type: "String",
                default: "National Prevalence Avg"
            },
            legendTitle: {
                type: "String",
                default: "Tobacco Prevalence Rate"
            },
            types: {
                type: "Array",
                default: [{label: 'Map', value: 'map', supports: {singleMeasure: false, singleDimension: false}}]
            },
            showLegendLabels:{
                type:'Boolean',
                default: false
            },
            legendBreaks: {
                type: "Array",
                default: [{ min: 0, max: 2.99, color: '#66A3D9', label: '', filters: []}, { min: 3, max: 4.99, color: '#BC91D9', label: '', filters: []}, { min: 5, color: '#F26363', label: '', filters: []}]
            },
            showNoDataLegendItem: {
                type:'Boolean',
                default: false
            },
            zoomEnabled:{
                type:'Boolean',
                default: false
            },
            mapFile: {
                type: "String",
                default: "NG_Zones_topoJSON.json"
            },
            enabledLayers: {
                type: "Array",
                default:[]
            },
            mainLayerId: {
                type: "String",
                default: ""
            },
            mappingField: {
                type: "String",
                default: "zone"
            },
            mapLabelField: {
                type: "String",
                default: "zone"
            },
            hasMultipleMeasures: {
                type:'Boolean',
                default: false
            },
            mapCenter:{
                type: "String",
                default: "NGA"
            },
            mapLabelShowValue:{
                type:'Boolean',
                default: false
            },
            showTooltip:{
                type:'Boolean',
                default: true
            },
            measureSelectorLabel: {
                type: "String",
                default: ""
            },
            valueFormat:{
                type: "String",
                default: "%({value},2)"
            },
            showOverallValue:{
                type:'Boolean',
                default: false
            },
            autoGenerateBreaks: {
                type:'Boolean',
                default: false
            },
            numberOfBreaks:{
                type: 'Numeric',
                default: 5
            },
            colorScheme: {
                type: 'string',
                default: 'reds'
            },
            showNoDataLabel: {
                type:'Boolean',
                default: false
            },
            group: {
                type: 'String',
                default: 'default',
            },
            mapSymbols:{
                type: 'Array',
                default: []
            },
            tooltipTheme: {
                type: 'String',
                default: 'map-tooltip-dark',
            },
            labelFontColor: {
                type: 'String',
                default: encodeURIComponent("#595959"),
            },
            labelFontSize: {
                type: 'Numeric',
                default: 12,
            },
            labelFontWeight: {
                type: 'String',
                default: 'normal',
            },
            legendFontSize:{
                type: 'Numeric',
                default: 12,
            },
            legendFontWeight:{
                type: 'String',
                default: 'normal',
            },
            customTooltips: {
                type: "Array",
                default: []
            },
            formatStyle: {
                type: "String",
                "style": "percent",
            },
            decimals: {
                type: "Numeric",
                default: 2
            },
            currency: {
                type: "String",
                default: "USD"
            },
            tooltipFontSize:{
                type: 'Numeric',
                default: 14,
            },
            showAdminUnitLabel: {
                type: "String",
                default: "ifUnitHasData"
            },
            showShadingLayerLabels: {
                type: "String",
                default: "showAll"
            },
            mapNoDataColor: {
                type: 'String',
                default: encodeURIComponent("#f8f8f8"),
            },
            mapBoundaryColor: {
                type: 'String',
                default: encodeURIComponent("#000"),
            },
            mapFocusBoundaryColor: {
                type: 'String',
                default: encodeURIComponent("#000"),
            },
            highlightedLocation:{
                type: "String",
                default: ""
            },
            highlightedLocLabelFormat:{
                type: "String",
                default: "{locationName} - Score: #({value},2)"
            },
            tooltipFormat:{
                type: "String",
                default: "{locationName} %({value},2) \n {label}: %({value},2)"
            },
            showNoDataTooltip: {
                type:'Boolean',
                default: false
            },
            mapContainerBgColor: {
                type: 'String',
                default: encodeURIComponent("#fff"),
            },
            mapPosition: {
                type: 'String',
                default: '{}'
            },
            type: {
                type: 'string',
                default: "media",
            },
            taxonomy: {
                type: 'string',
                default: "none",
            },
            fileType: {
                type: 'string',
                default: "none",
            },
            panelStatus: {
                type: "Object",
                default: {}
            },
            pointLabelFormat:{
                type: "String",
                default: "%({value},2)"
            },
            pointLabelColor: {
                type: 'String',
                default: encodeURIComponent("#FFF"),
            },
            defaultPointColor: {
                type: 'String',
                default: encodeURIComponent("#FFFF00"),
            },
            mapType: {
                type: 'String',
                default: ""
            },
            enableSummaryView: {
                type:'Boolean',
                default: false
            },
            aggregationFormula: {
                type: 'String',
                default: "COUNT"
            },
            zoomLevelToShowPoints:{
                type: "Numeric",
                default: 2
            },
            zoomOnFilter: {
                type:'Boolean',
                default: false
            },
            zoomOnFilterField: {
                type: 'String',
                default: "name"
            },
            labelsExclusionList: {
                type: 'String',
                default: ""
            },
            noDataText: {
                type: 'String',
                default: "No Data"
            },
            customMeasureLabels: {
                type: "Object",
                default: {}
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
