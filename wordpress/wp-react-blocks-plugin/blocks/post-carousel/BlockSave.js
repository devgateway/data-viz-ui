const SaveComponent = (props) => {
    const {
        setAttributes,
        attributes: {
            count,
            type,
            taxonomy,
            categories,
            height,
            autoSwitch,
            interval
        },
    } = props;

    const divClass = {}
    const divStyles = {}

    return (<div className={divClass} style={divStyles}>
            <div data-items={count} data-type={type} data-taxonomy={taxonomy} data-categories={categories.toString()}
                 className={"tcdi-component"}
                 data-height={height}
                 data-component={"postsCarousel"}
                 data-auto-switch={autoSwitch}
                 data-interval={interval}>
            </div>
        </div>


    );
}


export default SaveComponent