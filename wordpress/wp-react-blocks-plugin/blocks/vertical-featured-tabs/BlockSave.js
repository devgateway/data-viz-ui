const SaveComponent = (props) => {
    const {
        attributes: {
            count,
            type,
            taxonomy,
            categories,
            height,
            colors,
            readMoreLabel,
            coverWidth,
            previewMode
        },
    } = props;

    const divClass = {}
    const divStyles = {}

    return (<div className={divClass} style={divStyles}>
                <div data-count={count}
                     data-height={height}
                     data-colors={encodeURIComponent(JSON.stringify(colors))}
                     data-type={type}
                     data-taxonomy={taxonomy}
                     data-cover-width={coverWidth}
                     data-categories={encodeURIComponent(JSON.stringify(categories))}
                     className={"viz-component"}
                     data-read-more-label={readMoreLabel}
                     data-component={"verticalTabs"}
                     data-preview-mode={previewMode}
                     >
                </div>
        </div>


    );
}


export default SaveComponent
