const SaveComponent = (props) => {

    const {
        attributes: {
           group,
           app,
           label
        }
    } = props;

    const divClass = {}
    const divStyles = {}

    return (<div className={"viz-component"}
             data-component={"dataFiltersApply"}
             data-group={group}
             data-app={app}
             data-label={label}>
        </div>);
}



export default SaveComponent