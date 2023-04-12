import {InnerBlocks} from '@wordpress/editor'; // or wp.editor

const SaveComponent = (props) => {
    const {
        setAttributes,
        attributes: {
            type,
            height,
            buttonLabel,
            pdfLabel,
            url
        },
    } = props;

    const divClass = {}
    const divStyles = {}
    
    return (<div className={divClass} style={divStyles}>
                <div 
                     data-height={height}
                     className={"viz-component"}
                     data-component={"downloadpdf"}
                     data-button-label={buttonLabel}
                     data-pdf-label={pdfLabel}
                     data-url={url}
                >

                    <InnerBlocks.Content></InnerBlocks.Content>
                </div>
        </div>


    );
}


export default SaveComponent