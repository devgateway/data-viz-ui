const SaveComponent = (props) => {
    const {
        setAttributes, attributes: {
            file, header, message, height, group, useAutoRestore, sessionTimeOut
        },
    } = props;


    const divClass = {}
    const divStyles = {}

    return (<div className={divClass} style={divStyles}>
            <div
                data-group={group}
                data-height={height}
                data-file={file}
                data-header={header}
                data-use-auto-restore={useAutoRestore}
                data-session-timeout={sessionTimeOut}
                data-message={message}
                className={"viz-component"}
                data-component={"jsonDataProvider"}>
            </div>

        </div>


    );
}


export default SaveComponent