import { Config } from '@/conf'
import { get } from '../../api/commons';
import type { Categories } from '@devgateway/wp-react-lib';

const API_ROOT = Config.REACT_APP_API_ROOT

interface DataResponse {
    [key: string]: any,
    metadata: {
        [key: string]: any
    },
    itemSize: number,
    children?: Record<string, DataResponse>[]
}


function queryParams(params: Record<string, string>) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
}

export const getCategories = ({ app, params }: { app: string, params?: Record<string, string> }) => {
    const finalUrl = `${API_ROOT ?? ''}/api/${app}/categories${params ? '?' + queryParams(params) : ''}`;
    return get(finalUrl)
}

export const getData = ({ source, app, params }: { source: string, app: string, params?: Record<string, string> }) => {
    const finalUrl = `${API_ROOT ?? ''}/api/${app}/stats/${source}${params ? '?' + queryParams(params) : ''}`;
    return get<DataResponse>(finalUrl);

}
