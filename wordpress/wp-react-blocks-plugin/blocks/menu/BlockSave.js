const SaveComponent = (props) => {

    const {
        attributes: {
            name,
            icon,
            label,
            icon_media_id,
            showIcons,
            showLabels,
        }
    } = props;

    const divClass = {}
    const divStyles = {}


    return (<div className={"viz-component"}
                 data-component={"menu"}
                 data-icon={encodeURIComponent(icon)}
                 data-icon-media-id={icon_media_id}
                 data-name={name}
                 data-label={label}
                 data-show-icons={showIcons}
                 data-show-labels={showLabels}>
    </div>);
}


export default SaveComponent