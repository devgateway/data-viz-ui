export const getJsonFiles = () => {
    return wp.apiFetch({path: '/wp/v2/media?per_page=100&mime_type=application/json'});
}

export default this