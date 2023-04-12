const SaveComponent = (props) => {

    const {
        attributes: {
            measuresGroups,
            group,
            label,
            app,
        }
    } = props;


    return (<div className={"viz-component"}
                 data-component={"measures"}
                 data-app={app}
                 data-label={label}
                 data-group={group}
                 data-measures-groups={encodeURIComponent(JSON.stringify(measuresGroups))}>
    </div>);
}


export default SaveComponent