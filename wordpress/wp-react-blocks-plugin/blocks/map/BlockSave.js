import {useBlockProps} from '@wordpress/block-editor';

const SaveComponent = (props) => {

    const {
        attributes: {            
            type,
            height,
            dataSourceText,
            dataSourceLabel,
            dimension1,
            dimension2,
            measures,
            filters,
            app,
            csv,
            nationalAverageLabel,
            legendTitle,
            legendBreaks,
            zoomEnabled,
            showLegendLabels,
            mapFile,
            mainLayerId,
            mappingField,
            mapLabelField,
            hasMultipleMeasures,
            mapCenter,
            mapLabelShowValue,
            showTooltip,
            measureSelectorLabel,
            valueFormat,
            showOverallValue,
            autoGenerateBreaks,
            numberOfBreaks,
            colorScheme,
            showNoDataLabel,
            group,
            mapSymbols,
            tooltipTheme,
            labelFontColor,
            labelFontWeight,
            labelFontSize,
            legendFontSize,
            legendFontWeight,
            customTooltips,
            formatStyle,
            decimals,
            currency,
            tooltipFontSize,
            showAdminUnitLabel,
            mapNoDataColor,
            mapBoundaryColor,
            mapFocusBoundaryColor,
            highlightedLocation,
            tooltipFormat,
            showNoDataTooltip,
            mapContainerBgColor,
            mapPosition,
            taxonomy,
            fileType,
            enabledLayers,
            pointLabelColor,
            pointLabelFormat,
            showNoDataLegendItem,
            highlightedLocLabelFormat,
            mapType,
            enableSummaryView,
            defaultPointColor,
            aggregationFormula,
            zoomLevelToShowPoints,
            zoomOnFilter,
            zoomOnFilterField,
            labelsExclusionList,
            noDataText,
            customMeasureLabels,
            showShadingLayerLabels,
            datasetId
        }
    } = props;
    
    const blockProps = useBlockProps.save({
        className: 'viz component map'
    });

    const levels = [dimension1, dimension2]
    const source = levels.filter(l => l != 'none' && l != null).join('/')
    const validLegendBreaks = legendBreaks.filter(b => b.min || b.max);

    let params = {}
    filters.forEach(f => {
        if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
            params[f.param] = f.value
    })    

    return (
        <div {...blockProps}
            className={"viz-component"}
             data-component={"map"}
             data-group={group}
             data-height={height}             
             data-type={type}
             data-data-source-text={dataSourceText}
             data-data-source-label={dataSourceLabel}
             data-measures={Array.isArray(measures) ? measures.join(',') : []}
             data-app={app}
             data-source={source}   
             data-csv={encodeURIComponent(csv)} 
             data-national-average-label={nationalAverageLabel}
             data-legend-title={legendTitle}
             data-legend-breaks={encodeURIComponent(JSON.stringify(validLegendBreaks))}
             data-zoom-enabled={zoomEnabled}
             data-show-legend-labels={showLegendLabels}
             data-map-file={mapFile}
             data-main-layer-id={mainLayerId}
             data-mapping-field={mappingField}
             data-map-label-field={mapLabelField}
             data-has-multiple-measures={hasMultipleMeasures}
             data-map-center={mapCenter}
             data-map-label-show-value={mapLabelShowValue}
             data-show-tooltip={showTooltip}
             data-measure-selector-label={measureSelectorLabel}
             data-value-format={valueFormat}
             data-show-overall-value={showOverallValue}
             data-auto-generate-breaks={autoGenerateBreaks}
             data-number-of-breaks={numberOfBreaks}
             data-color-scheme={colorScheme}
             data-show-no-data-label={showNoDataLabel}
             data-tooltip-theme={tooltipTheme}
             data-label-font-weight={labelFontWeight}
             data-label-font-color={labelFontColor}
             data-label-font-size={labelFontSize}
             data-legend-font-size={legendFontSize}
             data-legend-font-weight={legendFontWeight}
             data-format-style={formatStyle}
             data-decimals={decimals}
             data-currency={currency}
             data-tooltip-font-size={tooltipFontSize}
             data-map-symbols={encodeURIComponent(JSON.stringify(mapSymbols))}
             data-filters={encodeURIComponent(JSON.stringify(params))}
             data-custom-tooltips={encodeURIComponent(JSON.stringify(customTooltips))}
             data-show-admin-unit-label={showAdminUnitLabel}
             data-map-no-data-color={mapNoDataColor}
             data-map-boundary-color={mapBoundaryColor}
             data-map-focus-boundary-color={mapFocusBoundaryColor}
             data-highlighted-location={highlightedLocation}
             data-tooltip-format={tooltipFormat}
             data-show-no-data-tooltip={showNoDataTooltip}
             data-map-container-bg-color={mapContainerBgColor}
             data-map-position={encodeURIComponent(mapPosition)}
             data-taxonomy={taxonomy}
             data-file-type={fileType}
             data-dimension1={dimension1}
             data-dimension2={dimension2}
             data-enabled-layers={encodeURIComponent(JSON.stringify(enabledLayers))}
             data-point-label-color={pointLabelColor}
             data-point-label-format={pointLabelFormat}
             data-show-no-data-legend-item={showNoDataLegendItem}
             data-highlighted-loc-label-format={highlightedLocLabelFormat}
             data-enable-summary-view={enableSummaryView}
             data-map-type={mapType}
             data-default-point-color={defaultPointColor}
             data-aggregation-formula={aggregationFormula}
             data-zoom-level-to-show-points={zoomLevelToShowPoints}
             data-zoom-on-filter={zoomOnFilter}
             data-zoom-on-filter-field={zoomOnFilterField}
             data-labels-exclusion-list={labelsExclusionList}
             data-no-data-text={noDataText}
             data-custom-measure-labels={encodeURIComponent(JSON.stringify(customMeasureLabels))}
             data-show-shading-layer-labels={showShadingLayerLabels}
             data-dataset-id={datasetId}  >
        </div>
    );
}


export default SaveComponent