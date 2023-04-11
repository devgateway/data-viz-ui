const SaveComponent = (props) => {
    const {
        setAttributes,
        attributes: {
            count,
            type,
            taxonomy,
            categories,
            height,
            config,
            lineColor,
            lineWidth,
            position,
            marginLeft,
            marginTop,
            marginRight,
            marginBottom,
            fontSize,
            titleWidth,
            subtitleWidth
        },
    } = props;


    const divClass = {}
    const divStyles = {}

    return (<div className={divClass} style={divStyles}>
            <div data-count={count} data-type={type} data-taxonomy={taxonomy} data-categories={categories.toString()}
                 className={"tcdi-component"}
                 data-height={height}
                 data-component={"newTimeLine"}
                 data-config={encodeURIComponent(JSON.stringify(config))}
                 data-line-color={encodeURIComponent(lineColor)}
                 data-position={position}
                 data-line-width={lineWidth}
                 data-margin-left={marginLeft}
                 data-margin-top={marginTop}
                 data-margin-right={marginRight}
                 data-margin-bottom={marginBottom}
                 data-font-size={fontSize}
                 data-title-width={titleWidth}
                 data-subtitle-width={subtitleWidth}>
            </div>

        </div>


    );
}


export default SaveComponent