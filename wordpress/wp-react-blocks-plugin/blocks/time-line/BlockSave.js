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
            subtitleWidth,
            enableCirclePopup,
            enableTitlePopup,
            enableDefaultPopup,
            closePopupOnMouseOut,
            subtitleHeight,
            titleHeight
        },
    } = props;


    const divClass = {}
    const divStyles = {}

    return (<div className={divClass} style={divStyles}>
            <div data-items={count} data-type={type} data-taxonomy={taxonomy} data-categories={categories.toString()}
                 className={"viz-component"}
                 data-height={height}
                 data-component={"timeLine"}
                 data-config={encodeURIComponent(JSON.stringify(config))}
                 data-csv-line-color={encodeURIComponent(lineColor)}
                 data-position={position}
                 data-line-width={lineWidth}
                 data-margin-left={marginLeft}
                 data-margin-top={marginTop}
                 data-margin-right={marginRight}
                 data-margin-bottom={marginBottom}
                 data-font-size={fontSize}
                 data-title-width={titleWidth}
                 data-title-height={titleHeight}
                 data-subtitle-width={subtitleWidth}
                 data-subtitle-height={subtitleHeight}
                 data-enable-title-popup={enableTitlePopup}
                 data-enable-circle-popup={enableCirclePopup}
                 data-enable-default-popup={enableDefaultPopup}
                 data-close-popup-on-mouse-out={closePopupOnMouseOut}>
            </div>

        </div>


    );
}


export default SaveComponent