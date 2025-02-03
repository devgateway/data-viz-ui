const SaveComponent = (props) => {
    const {
        setAttributes,
        attributes: {
            type,
            taxonomy,
            categories,
            post_id,
            post_slug,
            media,
            download_style,
            text,
            cancel,
            agree


        },
    } = props;

    const divClass = {}
    const divStyles = {}
    return (<div className={divClass} style={divStyles}>
            <div
                 data-download-style={download_style}
                 data-post-slug={post_slug}
                 data-post-id={post_id}
                 data-media-id={media?media.id:null}
                 data-text={text}
                 data-agree={agree}
                 data-cancel={cancel}
                 data-post-type={type}
                 className={"viz-component"}
                 data-component={"agreeAndDownload"}>

                </div>
        </div>


    );
}


export default SaveComponent

