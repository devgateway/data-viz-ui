import {useBlockProps} from '@wordpress/block-editor';

const SaveComponent = (props) => {

    const {
        attributes: {
            layers,
            height,
            group,
            backGroundColor,
            mapPosition
        }
    } = props;

    const blockProps = useBlockProps.save({
        className: 'viz component map'
    });


    return (
        <div {...blockProps}
             className={"viz-component"}
             data-height={height}
             data-group={group}
             data-back-ground-color={backGroundColor}
             data-map-position={encodeURIComponent(JSON.stringify(mapPosition))}
             data-component={"newMap"}
             data-layers={encodeURIComponent(JSON.stringify(layers))}
             >
        </div>
    );
}


export default SaveComponent