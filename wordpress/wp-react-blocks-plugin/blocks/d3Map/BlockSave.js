import {useBlockProps} from '@wordpress/block-editor';

const SaveComponent = (props) => {

    const {
        attributes: {
            layers
        }
    } = props;

    const blockProps = useBlockProps.save({
        className: 'viz component map'
    });


    return (
        <div {...blockProps}
             className={"viz-component"}
             data-component={"newMap"}
             data-layers={encodeURIComponent(JSON.stringify(layers))}
             >
        </div>
    );
}


export default SaveComponent