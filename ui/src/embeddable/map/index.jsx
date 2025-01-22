
import React from 'react';
import { connect } from "react-redux";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import Map from './map';
import MapDataFrame from './MapDataFrame';
import MapCSVDataFrame from './MapCSVDataFrame';

const countries = [
    { label: 'KENYA', value: 'KEN', center: [35.8166634, 0.1], scale: 2000}, 
    { label: 'Nigeria', value: 'NGA', center: [7.491302, 9.072264], scale: 2000}, 
    { label: 'South Africa', value: 'ZAF', center: [24.676997, -28.48322], scale: 2000 },
    { label: 'West Africa', value: 'West Africa', center: [-7.293255, 13.905720], scale: 1500 },
    { label: 'Africa', value: 'Africa', center: [13.134227,-11.523088], scale: 550 },
    { label: 'Ethiopia', value: 'ETH', center: [35.8166634, 1.7], scale: 2000}, 
    { label: 'Zambia', value: 'ZMB', center: [26.459455, -14.668135], scale: 2000},
    { label: 'Democratic Republic of the Congo', value: 'DRC', center: [23.174338, -5.837475], scale: 1250},
    { label: 'World', value: 'World', center: [0, 20.050043], scale: 150}
]

const MapWrapper = (props) => {
    const {
        unique,
        editing,
        "data-filters": filters = '{}',
        "data-app": app = 'csv',
        "data-csv": csv = '',
        'data-dimension1': dimension1 = '',
        'data-dimension2': dimension2 = '',
        "data-measures": measures = '[]',
        "data-height": height = 600,
          width = 960,
        "data-data-source-text": dataSourceText = 'NIDS',
        "data-data-source-label": dataSourceLabel = 'Source',
        "data-national-average-label": nationalAverageLabel = 'National Prevalence Avg',
        "data-legend-title": legendTitle = 'Tobacco Prevalence Rate',
        "data-legend-breaks": legendBreaks = '[]',
        "data-zoom-enabled": zoomEnabled = false, 
        "data-show-legend-labels": showLegendLabels = false,
        "data-map-file": mapFile = 'NG_Zones_topoJSON.json',
        "data-mapping-field": mappingField = 'zone',
        "data-map-label-field": mapLabelField = "admin",
        "data-has-multiple-measures": hasMultipleMeasures = "false",         
         topoJSONField = "collection",        
        'data-map-center': mapCenter = 'NGA', //country        
        "data-map-label-show-value": mapLabelShowValue = "false",
        "data-show-tooltip": showTooltip = "true",
        "data-measure-selector-label": measureSelectorLabel = "",
        "data-value-format": valueFormat = "",
        "data-show-overall-value": showOverallValue = "false",        
        "data-auto-generate-breaks": autoGenerateBreaks = "false",
        "data-number-of-breaks": numberOfBreaks = 5,
        "data-scheme": colorScheme = "reds",
        "data-show-no-data-label": showNoDataLabel = "false",
        "data-group": group = "default",
        "data-map-symbols": mapSymbols = '[]',
        "data-tooltip-theme": tooltipTheme = "map-tooltip-dark",
        "data-label-font-size": labelFontSize = 12,
        "data-label-font-weight" :labelFontWeight = "normal",
        "data-label-font-color": labelFontColor = "#595959",
        "data-legend-font-size": legendFontSize = 12,
        "data-legend-font-weight" : legendFontWeight = "normal",
        "data-custom-tooltips" : customTooltips = '[]',
        'data-format-style': style = "decimal",
        "data-decimals": decimals = "2",
        'data-currency': currency = "",
        'data-tooltip-font-size': tooltipFontSize = 14,
        'data-show-admin-unit-label': showAdminUnitLabel = "showAll",
        'data-map-no-data-color': mapNoDataColor = '#f8f8f8',
        'data-map-boundary-color': mapBoundaryColor = '#000',
        'data-map-focus-boundary-color': mapFocusBoundaryColor = '#000',
        'data-highlighted-location': highlightedLocation = '',
        'data-tooltip-format' : tooltipFormat = '{locationName} %({value},2) \n {label}: %({value},2)',
        'data-show-no-data-tooltip': showNoDataTooltip = "false",
        'data-map-container-bg-color': mapContainerBgColor = '#fff',
        'data-map-position': mapPosition = '{}',
        "data-main-layer-id": mainLayerId = '',
        'data-enabled-layers': enabledLayers = '[]',
        'data-point-label-color': pointLabelColor = '#fff',
        'data-point-label-format': pointLabelFormat = '{locationName} %({value},2)',
        'data-show-no-data-legend-item': showNoDataLegendItem = false,
        'data-highlighted-loc-label-format': highlightedLocLabelFormat = "{locationName} - Score: #({value},2)",
        'data-enable-summary-view': enableSummaryView = "false",
        'data-map-type': mapType = "DEFAULT",
        'data-default-point-color': defaultPointColor = '#FFFF00',
        'data-aggregation-formula': aggregationFormula = 'COUNT',
        'data-zoom-level-to-show-points': zoomLevelToShowPoints = 2,
        'data-zoom-on-filter': zoomOnFilter =  "false",
        'data-zoom-on-filter-field': zoomOnFilterField = "",
        'data-no-data-text': noDataText = "No Data",
        'data-labels-exclusion-list': labelsExclusionList = "",
        'data-custom-measure-labels': customMeasureLabels = "{}",
        'data-show-shading-layer-labels': showShadingLayerLabels = "ifUnitHasData",
    } = props  

    const decode = (value) => {
        if (editing) {
            return value
        }
        return decodeURIComponent(value)
    }

    const parse = (value) => {
        try {
            return JSON.parse(decode(value)); 
        } catch (error) {
            console.error("Error parsing value:", value, error);
            return null;
        }
    }


    const getBreaks = (legendBreaks) => {
        let legendBreaksNew = parse(legendBreaks) || []
        legendBreaksNew = legendBreaksNew.map((b) => {
            if (b.min) {
                b.min =  parseFloat(b.min);
            }
            
            if (b.max) {
                b.max =  parseFloat(b.max);
            }    
    
            b.color = decodeURIComponent(b.color);
            return b;    
        })

        return legendBreaksNew;
    }

    const getFilters = (filters) => {
        const ff = parse(filters)  || []  
        let params = {};
        if (ff && ff.forEach) {
            ff.forEach(f => {
                if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                    params[f.param] = f.value
            })
        } else {
            params = ff;
        }

        return params
    }

    const numberFormat = {
        style: (style === 'compacted') ? 'decimal' : style,
        notation: (style === 'compacted') ? 'compact' : "standard",
        currency: currency,
        minimumFractionDigits: parseInt(decimals),
        maximumFractionDigits: parseInt(decimals)
    }

    let layers = parse(enabledLayers) || []
    layers = layers.map(l => {
        l.bgColor = decodeURIComponent(l.bgColor)
        l.fontColor = decodeURIComponent(l.fontColor)
        return l
    })
    
    const country = countries.find(c => c.value === mapCenter)   

    const multipleMeasures = hasMultipleMeasures == true || hasMultipleMeasures == "true"    

    const levels = [dimension1, dimension2]
    const source = levels.filter(l => l != 'none' && l != null).join('/')

    const mapProps = {
        unique,
        editing,
        source: '/' + mapFile,
        center: country.center,
        scale: country.scale,
        measures,
        legendTitle,
        height,
        width,
        topoJSONField,
        mappingField,
        dataSourceText,
        dataSourceLabel,
        nationalAverageLabel,
        legendBreaks: getBreaks(legendBreaks),
        mapLabelField,
        zoomEnabled: zoomEnabled == true || zoomEnabled == "true",
        showLegendLabels: showLegendLabels == true || showLegendLabels == "true",
        multipleMeasures,
        app,
        mapLabelShowValue: mapLabelShowValue == true || mapLabelShowValue == "true",
        showTooltip: (showTooltip == true || showTooltip == "true"),
        showOverallValue: showOverallValue == true || showOverallValue == "true",
        measureSelectorLabel,
        valueFormat,
        autoGenerateBreaks: autoGenerateBreaks == true || autoGenerateBreaks == "true",
        showNoDataLabel: showNoDataLabel == true || showNoDataLabel == "true",
        numberOfBreaks,
        colorScheme,
        group,
        symbols: parse(mapSymbols) || [],
        tooltipTheme,
        labelFontSize,
        labelFontColor: decodeURIComponent(labelFontColor),
        labelFontWeight,
        legendFontSize,
        legendFontWeight,
        customTooltips: parse(customTooltips) || [],
        format: numberFormat,
        tooltipFontSize,
        showAdminUnitLabel,
        mapNoDataColor:decodeURIComponent(mapNoDataColor),
        mapBoundaryColor: decodeURIComponent(mapBoundaryColor),
        mapFocusBoundaryColor: decodeURIComponent(mapFocusBoundaryColor),
        highlightedLocation,
        tooltipFormat: tooltipFormat,
        showNoDataTooltip: showNoDataTooltip == true || showNoDataTooltip == "true",
        fields: source.split("/"),
        mapContainerBgColor: decodeURIComponent(mapContainerBgColor),
        mapPosition: parse(mapPosition),
        mainLayerId,
        enabledLayers: layers,
        pointLabelColor: decodeURIComponent(pointLabelColor),
        pointLabelFormat,
        showNoDataLegendItem: showNoDataLegendItem == true || showNoDataLegendItem == "true",
        highlightedLocLabelFormat,
        mapType,
        defaultPointColor: decodeURIComponent(defaultPointColor),
        zoomLevelToShowPoints,
        zoomOnFilter : zoomOnFilter == true || zoomOnFilter == "true",
        zoomOnFilterField: zoomOnFilterField,
        noDataText,
        labelsExclusionList: labelsExclusionList.split(',').map(l => l.trim()),
        showShadingLayerLabels
    } 
      
    const measureLabels = parse(customMeasureLabels) || {}
    const DataFrame = app === "csv" ? MapCSVDataFrame : MapDataFrame;   
    const measuresCSV = editing ? (parse(measures) || []).join(',') : measures    
    return (<DataProvider 
        params={getFilters(filters)}
        app={app}
        csv={decodeURIComponent(csv)}
        group={group}
        editing={editing}
        store={[app, unique, ...source.split("/")]} source={source}>
        <DataConsumer>
            <DataFrame measures={measuresCSV} multipleMeasures = {multipleMeasures} mapType={mapType} aggregationFormula={aggregationFormula} customMeasureLabels={measureLabels}>
                <Map  {...mapProps} />
            </DataFrame>
        </DataConsumer>

    </DataProvider>);

};

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(MapWrapper)
