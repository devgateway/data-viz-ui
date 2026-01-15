import { get } from '../../api/commons'

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const API_ROOT = process.env.VITE_REACT_APP_API_ROOT
console.log("API_ROOT==>", API_ROOT);

// In-flight request cache
const inFlightRequests = {}
const cache = {}
const TTL = 3 * 60 * 1000 // 5 minutes
function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
}

function makeRequestKey(url) {
    return url
}

function requestWithDeduplication(url) {
    const key = makeRequestKey(url)
    const now = Date.now()

    if (cache[key] && now - cache[key].timestamp < TTL) {
        return Promise.resolve(deepClone(cache[key].data))
    }

    if (inFlightRequests[key]) {
        return inFlightRequests[key].then(deepClone)
    }

    const req = get(url)
        .then(data => {
            cache[key] = { data, timestamp: Date.now() }
            return deepClone(data)
        })
        .finally(() => {
            delete inFlightRequests[key]
        })

    inFlightRequests[key] = req
    return req
}

export const getCategories = ({ app, params }) => {
    const finalUrl = `${API_ROOT ? API_ROOT : ''}/api/${app}/categories${params ? '?' + queryParams(params) : ''}`
    console.log("categories==>", finalUrl)

    return requestWithDeduplication(finalUrl)
}

export const getCategory = ({ app, type, params }) => {
    const finalUrl = `${API_ROOT ? API_ROOT : ''}/api/${app}/categories/${type}${params ? '?' + queryParams(params) : ''}`
    console.log("categories==>", finalUrl)

    return requestWithDeduplication(finalUrl)
}

export const getData = ({ source, app, params }) => {
    const finalUrl = `${API_ROOT ? API_ROOT : ''}/api/${app}/stats/${source}${params ? '?' + queryParams(params) : ''}`
    return requestWithDeduplication(finalUrl)
}