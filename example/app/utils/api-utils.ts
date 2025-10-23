export const getApiUrl = (req: Request) => {
    if (process.env.REACT_APP_WP_API){
        return String(process.env.REACT_APP_WP_API);
    }
    //get hostname from request
    const url = new URL(req.url);
    return `${url.origin}/wp/wp-json`;
}