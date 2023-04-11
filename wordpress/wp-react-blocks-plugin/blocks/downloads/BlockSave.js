import {InnerBlocks} from '@wordpress/editor'; // or wp.editor

const SaveComponent = (props) => {
    const {
        setAttributes,
        attributes: {
            type,
            height,
            checkPng,
            checkJpg,
            buttonLabel,
            defaultFormat,
            pngLabel,
            jpgLabel,
            pngText,
            jpgText,
            title,
            sectionTitle,
            style,
            useTitle,
            fontClass,
            fontSize,
            color,
            tooltip,
            downloadTooltip,
            includeSourceURL,
            sourceURLMarginLeft,
            sourceURLMarginTop,
            sourceURLFontSize
        },
    } = props;

    const divClass = {}
    const divStyles = {}
    const titleStyle={
        'font-size':(!fontClass)?fontSize:'auto',
        'color':color
    }

    return (<div className={divClass} style={divStyles}>
                <div 
                     data-height={height}
                     className={"tcdi-component self-render-component"}
                     data-component={"download"}
                     data-check-png={checkPng}                     
                     data-check-jpg={checkJpg}
                     data-button-label={buttonLabel}
                     data-default-format={defaultFormat}
                     data-png-label={pngLabel}
                     data-jpg-label={jpgLabel}
                     data-png-text={pngText}
                     data-jpg-text={jpgText}
                     data-title={title}
                     data-section-title={encodeURIComponent(`<p class="${fontClass}" style="font-size:${(!fontClass)?fontSize:'auto'};color:${color}">${sectionTitle}</p>`)}
                     data-style={style}
                     data-use-title={useTitle}
                     data-download-tooltip={encodeURIComponent(downloadTooltip)}
                     data-include-source-url={includeSourceURL}
                     data-source-urlmargin-left={sourceURLMarginLeft}			
			         data-source-urlmargin-top={sourceURLMarginTop}
			         data-source-urlfont-size={sourceURLFontSize}>
                    <InnerBlocks.Content />
                </div>
        </div>


    );
}


export default SaveComponent