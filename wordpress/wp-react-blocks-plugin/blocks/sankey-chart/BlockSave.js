import {useBlockProps} from '@wordpress/block-editor';
import {InnerBlocks} from '@wordpress/editor'; // or wp.editor
const SaveComponent = (props) => {
    const {attributes: {
            measures,
            height,
            scheme,
            dimension1,
            dimension2,
            dimension3,
            app,
            tooltipHTML,
            format,
            filters,
            layout,
            group,
            noDataMessage,
            tooltipEnabled,
            tooltipEnableMarkdown,
            csv,
            sort,
            nodeThickness,
            nodeOpacity,
            nodeHoverOpacity,
            nodeInnerPadding,
            nodeSpacing,
            nodeHoverOthersOpacity,
            nodeBorderWidth,
            nodeBorderRadius,
            linkOpacity,
            linkHoverOpacity,
            linkHoverOthersOpacity,
            linkContract,
            enableLinkGradient,
            enableLabels,
            labelPosition,
            labelPadding,
            useCustomLabelColor,
            labelTextColor,
            labelOrientation,
            showLegends,
            legendPosition,
            marginLeft,
            marginRight,
            marginBottom,
            marginTop,
            legendLabel,
            useLabelBackground,
            useCheckBoxBackground,
            legendLabelColor,
            reverseLegend,
            manualColors,
            noDataMsg
        }
    } = props;
    const blockProps = useBlockProps.save({
        className: 'sankey chart'
    });

    const levels = [dimension1, dimension2, dimension3]
    const source = levels.filter(l => l != 'none' && l != null).join('/')

    return (
        <div {...blockProps} className={"viz-component"}
             data-component={"sankeychart"}
             data-height={height}
             data-source={source}
             data-dimension1={dimension1}
             data-dimension2={dimension2}
             data-dimension3={dimension3}
             data-scheme={scheme}
             data-margin-left={marginLeft}
             data-margin-top={marginTop}
             data-margin-right={marginRight}
             data-margin-bottom={marginBottom}
             data-show-legends={showLegends}
             data-legend-position={legendPosition}
             data-app={app}
             data-measures={encodeURIComponent(JSON.stringify(measures))}
             data-format={encodeURIComponent(JSON.stringify(format))}
             data-tooltip-html={encodeURIComponent(tooltipHTML)}
             data-layout={layout}
             data-group={group}
             data-filters={encodeURIComponent(JSON.stringify(filters))}
             data-no-data-message={noDataMessage}
             data-legend-label={legendLabel}
             data-tooltip-enabled={tooltipEnabled}
             data-use-label-background={useLabelBackground}
             data-use-check-box-background={useCheckBoxBackground}
             data-legend-label-color={legendLabelColor}
             data-tooltip-enable-markdown={tooltipEnableMarkdown}
             data-reverse-legend={reverseLegend}
             data-sort={sort}
             data-node-thickness={nodeThickness}
             data-node-opacity={nodeOpacity}
             data-node-hover-opacity={nodeHoverOpacity}
             data-node-inner-padding={nodeInnerPadding}
             data-node-spacing={nodeSpacing}
             data-node-hover-others-opacity={nodeHoverOthersOpacity}
             data-node-border-width={nodeBorderWidth}
             data-node-border-radius={nodeBorderRadius}
             data-link-opacity={linkOpacity}
             data-link-hover-opacity={linkHoverOpacity}
             data-link-hover-others-opacity={linkHoverOthersOpacity}
             data-link-contract={linkContract}
             data-enable-link-gradient={enableLinkGradient}
             data-enable-labels={enableLabels}
             data-label-position={labelPosition}
             data-label-padding={labelPadding}
             data-use-custom-label-color={useCustomLabelColor}
             data-label-text-color={labelTextColor}
             data-label-orientation={labelOrientation}
             data-manual-colors={encodeURIComponent(JSON.stringify(manualColors))}
             data-no-data-message={noDataMsg}
             data-csv={csv}

>

            <InnerBlocks.Content/>
        </div>
    );
}

export default SaveComponent