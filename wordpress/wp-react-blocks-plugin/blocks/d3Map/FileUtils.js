const queryJsonFiles = ({
                            fileType,
                            taxonomy
                        }) => {

    const fileTypeFilter = taxonomy != 'none' && fileType != 'none' ? `&${taxonomy}=${fileType}` : ''
    const mapFiles = [{value: '', label: 'None'}]
    wp.apiFetch({
        path: '/wp/v2/media?mime_type=application/json' + fileTypeFilter,
    }).then(json => {
        if (json) {
            json.forEach(f => {
                mapFiles.push({value: f.id, label: f.title.rendered})
            })

            this.setState({mapFiles: mapFiles})
        }
    });
}

export default queryJsonFiles
