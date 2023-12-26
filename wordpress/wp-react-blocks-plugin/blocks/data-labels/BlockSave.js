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
            valueType,
            noDataMsg
        }
    } = props;
    const blockProps = useBlockProps.save({
        className: 'data label'
    });

    const levels = [dimension1]
    const source = levels.filter(l => l != 'none' && l != null).join('/')

    return (
        <div {...blockProps} className={"viz-component"}
             data-component={"datalabel"}
             data-height={height}
             data-source={source}
             data-dimension1={dimension1}
             data-app={app}
             data-measures={encodeURIComponent(JSON.stringify(measures))}
             data-format={encodeURIComponent(JSON.stringify(format))}
             data-group={group}
             data-filters={encodeURIComponent(JSON.stringify(filters))}
             data-no-data-message={noDataMsg}
             data-value-type={valueType}
>

            <InnerBlocks.Content/>
        </div>
    );
}

export default SaveComponent