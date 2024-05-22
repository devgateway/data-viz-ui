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
            useScrolls,
            readMoreLabel,
        },
    } = props;

    const divClass = {};
    const divStyles = {
        height: height + 'px', // Set the height style
    };

    const colorsParams = Object.keys(colors).map(k => colors[k]).join(",");

    return (
        <div className={divClass} style={divStyles}>
            <div
                data-items={count}
                data-height={height}
                data-color={colorsParams}
                data-type={type}
                data-taxonomy={taxonomy}
                data-categories={categories.toString()}
                className={"tcdi-component"}
                data-read-more-label={readMoreLabel}
                data-use-scrolls={useScrolls}
                data-component={"featuredTabs"}
            ></div>
        </div>
    );
}

export default SaveComponent;

