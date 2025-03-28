import {useBlockProps} from '@wordpress/block-editor';
import {InnerBlocks} from '@wordpress/editor'; // or wp.editor
const SaveComponent = (props) => {
    const {attributes: {
            measures,
            height,
            dimension1,
            app,
            format,
            filters,
            group,            
            noDataMsg,
            dvzProxyDatasetId,
            bigNumberFontSize,
            labelFontSize,
            percentFontSize,
            textColor,            
            label,
            showPercentageChange,
        }
    } = props;
    const blockProps = useBlockProps.save({
        className: 'big-number-trend'
    });

    const levels = [dimension1]
    const source = levels.filter(l => l != 'none' && l != null).join('/')

    return (
        <div {...blockProps} className={"viz-component"}
             data-component={"bignumbertrend"}
             data-height={height}
             data-source={source}
             data-app={app}
             data-dvz-proxy-dataset-id={dvzProxyDatasetId}
             data-measures={encodeURIComponent(JSON.stringify(measures))}
             data-dimension1={dimension1}
             data-format={encodeURIComponent(JSON.stringify(format))}
             data-group={group}
             data-filters={encodeURIComponent(JSON.stringify(filters))}
             data-no-data-message={noDataMsg}
             data-big-number-font-size={bigNumberFontSize}
             data-label-font-size={labelFontSize}
             data-percent-font-size={percentFontSize}
             data-text-color={encodeURIComponent(textColor)}            
             data-label={label}            
             data-show-percentage-change={showPercentageChange}>
            <InnerBlocks.Content/>
        </div>
    );
}

export default SaveComponent