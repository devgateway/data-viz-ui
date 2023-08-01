const SaveComponent = (props) => {
    const {
        setAttributes, attributes: {
            params, name,height
        },
    } = props;


    const divClass = {}
    const divStyles = {}

    return (<div className={divClass} style={divStyles}>
            <div
                data-name={name}
                data-height={height}
                className={"viz-component"}
                data-params={encodeURIComponent(JSON.stringify(params))}
                data-component={"wrapped"}>
            </div>

        </div>


    );
}


export default SaveComponent