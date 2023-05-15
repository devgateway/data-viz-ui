import {useBlockProps} from '@wordpress/block-editor';

const SaveComponent = (props) => {

    const {
        attributes: {            

        }
    } = props;
    
    const blockProps = useBlockProps.save({
        className: 'viz component map'
    });


    return (
        <div {...blockProps}
            className={"viz-component"}
             data-component={"newMap"}>
        </div>
    );
}


export default SaveComponent