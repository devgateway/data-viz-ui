/* eslint-disable no-debugger */
import { Config } from '@/conf'
import {get} from '../../api/commons'
const API_ROOT = process.env.VITE_REACT_APP_API_ROOT ? process.env.VITE_REACT_APP_API_ROOT : "http://localhost"; //"http://localhost"; //Config.REACT_APP_API_ROOT;

console.log("API_ROOT==>", API_ROOT);

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
}

export const getCategories=({app, params})=>{
    const finalUrl = `${API_ROOT ? API_ROOT: ''}/api/${app}/categories${params ? '?' + queryParams(params) : ''}`;
    console.log("categories==>", finalUrl);
    return get(finalUrl)
}

export const getData = ({source, app, params}) => {
    const finalUrl = `${API_ROOT ? API_ROOT: ''}/api/${app}/stats/${source}${params? '?' + queryParams(params) : ''}`;
    console.log("data==>", finalUrl);
    return get(finalUrl)
}

