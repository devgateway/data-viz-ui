const SaveComponent = (props) => {
    const {
        setAttributes, attributes: {
            path, group, isActionPlan
        },
    } = props;


    const divClass = {}
    const divStyles = {}

    return (<div className={divClass} style={divStyles}>
            <div
                data-group={group}
                className={"viz-component"}
                data-component={"supersetDashboard"}>
            </div>

        </div>


    );
}


export default SaveComponent