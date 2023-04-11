const SaveComponent = (props) => {
    const {
        setAttributes,
        attributes: {
            count,
            type,
            taxonomy,
            categories,
            height,
            colors,
            readMoreLabel,
            coverWidth,
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
                     className={"tcdi-component"}
                     data-read-more-label={readMoreLabel}
                     data-component={"verticalTabs"}>
                </div>
        </div>


    );
}


export default SaveComponent