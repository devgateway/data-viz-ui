const SaveComponent = (props) => {

    const {
        attributes: {
            title,
            showIcon,
            showLabel
        }
    } = props;

    const divClass = {}
    const divStyles = {}

    const urlParams = new URLSearchParams(window.location.search);
    const parent = urlParams.get('post');


    return (<div className={"viz-component"}
                 data-component={"childPagesMenu"}
                 data-parent={parent}
                 data-title={title}
                 data-show-icons={showIcon}
                 data-show-labels={showLabel}>
    </div>);
}


export default SaveComponent