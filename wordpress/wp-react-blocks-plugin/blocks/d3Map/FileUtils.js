export const getJsonFiles = () => {
    return wp.apiFetch({path: '/wp/v2/media?mime_type=application/json'});
}


export default this