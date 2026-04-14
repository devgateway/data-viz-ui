import { Config } from '@/conf';
import { get } from '../../api/commons';

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const API_ROOT = process.env.VITE_REACT_APP_API_ROOT || Config.REACT_APP_API_ROOT || null;
const fallbackUrl = typeof window !== 'undefined' ? window.location.origin : '';


// In-flight request cache
const inFlightRequests = {};
const cache = {};
const TTL = 3 * 60 * 1000; // 5 minutes
function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

function makeRequestKey(url) {
    return url;
}

function requestWithDeduplication(url, withHeaders = false) {
    const key = makeRequestKey(url);
    const now = Date.now();

    if (cache[key] && now - cache[key].timestamp < TTL) {
        return Promise.resolve(deepClone(cache[key].data));
    }

    if (inFlightRequests[key]) {
        return inFlightRequests[key].then(deepClone);
    }

    const req = get(url, {}, withHeaders)
        .then(data => {
            cache[key] = { data, timestamp: Date.now() };
            if (withHeaders) {
                return { data: deepClone(data), meta: cache[key].meta };
            } else {
                return deepClone(data);
            }
        })
        .finally(() => {
            delete inFlightRequests[key];
        });

    inFlightRequests[key] = req;
    return req;
}

export const getCategories = ({ app, params }) => {
    const finalUrl = `${API_ROOT ? API_ROOT : fallbackUrl}/api/${app}/categories${params ? '?' + queryParams(params) : ''}`;
    return requestWithDeduplication(finalUrl);
};

export const getCategory = ({ app, type, params }) => {
    const finalUrl = `${API_ROOT ? API_ROOT : ''}/api/${app}/categories/${type}${params ? '?' + queryParams(params) : ''}`;

    return requestWithDeduplication(finalUrl)
}

export const getData = ({ source, app, params }) => {
    const finalUrl = `${API_ROOT ? API_ROOT : fallbackUrl}/api/${app}/stats/${source}${params ? '?' + queryParams(params) : ''}`;
    return requestWithDeduplication(finalUrl);
};

export const getCustomPosts = ({ postType, taxonomy, category, taxonomyFilters, before, perPage, page, locale, after, ordering, orderingDirection, wpApiBase }) => {
    const hasApiBase = wpApiBase !== undefined && wpApiBase !== null && wpApiBase !== "";
    const apiBase = hasApiBase ? wpApiBase : Config.REACT_APP_WP_API;
    console.log("Using API base:", apiBase);
    const url = `${apiBase}/wp/v2/${postType}`;
    const queryParams = new URLSearchParams();

    // Collect taxonomy values per key, then serialize as comma-separated lists
    const taxonomyToValues = new Map();

    const addTaxValues = (tax, values) => {
        if (!tax || values == null) return;
        const existing = taxonomyToValues.get(tax) || [];
        if (Array.isArray(values)) {
            values.forEach(v => {
                if (v == null) return;
                existing.push(String(v));
            });
        } else {
            existing.push(String(values));
        }
        taxonomyToValues.set(tax, existing);
    };

    // support multiple taxonomy filters at once via taxonomyFilters map
    if (taxonomyFilters && taxonomyFilters instanceof Map) {
        taxonomyFilters.forEach((values, tax) => {
            addTaxValues(tax, values);
        });
    }

    // Backwards compatibility: support legacy single taxonomy+category params
    if (taxonomy && category != null) {
        addTaxValues(taxonomy, category);
    }

    // Serialize taxonomy params: join duplicate taxonomy values with commas
    taxonomyToValues.forEach((values, tax) => {
        const uniqueOrdered = Array.from(new Set(values));
        if (uniqueOrdered.length === 0) {
            return;
        }
        queryParams.set(tax, uniqueOrdered.join(','));
    });


    if (before) queryParams.append("before", before.toISOString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (page) queryParams.append("page", page.toString());
    if (locale) queryParams.append("locale", locale);
    if (after) queryParams.append("after", after.toISOString());

    // append ordering
    if (ordering) queryParams.append("orderby", ordering);
    if (orderingDirection) queryParams.append("order", orderingDirection);

    // Preserve commas for taxonomy value lists for readability and parity with WordPress APIs
    const queryString = queryParams.toString().replace(/%2C/g, ',');
    return get(`${url}?${queryString}`, {
        headers: {
            'Content-Type': 'application/json',
        }, 
    }, true);

};