const SaveComponent = (props) => {

    const {
        attributes: {
            name,
            showIcon,
            showLabel
        }
    } = props;

    const divClass = {}
    const divStyles = {}


    return (<div className={"viz-component"}
                 data-component={"menu"}
                 data-name={name}
                 data-show-icons={showIcon}
                 data-show-labels={showLabel}>
    </div>);
}


export default SaveComponent