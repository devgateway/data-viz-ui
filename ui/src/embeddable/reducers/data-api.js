import {get} from '../../api/commons'
const API_ROOT = process.env.VITE_REACT_APP_API_ROOT

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
}

export const getCategories=({app, params})=>{
    return get(`${API_ROOT ? API_ROOT : ''}/api/${app}/categories/${params ? '?' + queryParams(params) : ''}`)
}

export const getData = ({source, app, params}) => {
    return get(`${API_ROOT ? API_ROOT : ''}/api/${app}/stats/${source}${params ? '?' + queryParams(params) : ''}`)
}
