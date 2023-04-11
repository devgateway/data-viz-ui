const SaveComponent = (props) => {

    const {
        attributes: {
           group,
           app,
           resetLabel
        }
    } = props;

    const divClass = {}
    const divStyles = {}

    return (<div className={"tcdi-component"}
             data-component={"dataFiltersReset"}
             data-group={group}
             data-app={app}
             data-reset-label={resetLabel}>
        </div>);
}


export default SaveComponent