const SaveComponent = (props) => {
    const {
        setAttributes, attributes: {
            count, type, taxonomy, categories, height, scrolls,
        },
    } = props;


    const divClass = {}
    const divStyles = {}

    return (<div className={divClass} style={divStyles}>
            <div
                data-count={count}
                data-type={type}
                data-taxonomy={taxonomy}
                data-categories={categories.toString()}
                className={"viz-component"}
                data-height={height}
                data-scrolls={scrolls}
                data-configuration={encodeURIComponent(JSON.stringify(props.attributes.configuration))}
                data-component={"parallaxContainer"}>
            </div>

        </div>


    );
}


export default SaveComponent