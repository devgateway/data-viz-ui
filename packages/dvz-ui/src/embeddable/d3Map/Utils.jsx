import * as d3 from "d3";
import { get } from "@/api/commons.js";

export const COLOR_VARIABLE = "_Color_";

// Fields that carry the dimension-tree's own structure rather than a
// business column - excluded when flattening a row into variables.
const standardProps = ['value', 'count', 'type', 'children', 'label', 'measure'];

// A row from the API's dimension tree only carries its own dimension
// (join key) and measures as flat keys; any other requested dimension
// (e.g. an "extra tooltip column") comes back nested under `children` as
// a { type, value } entry, the same way `patternDiscriminator` values do.
// This walks that tree and flattens every { type, value } pair it finds
// into `{ [type]: value }`, so they can be read like any other column.
export const extractVariables = (item) => {
    const variables = {};
    if (!item) {
        return variables;
    }
    Object.keys(item).forEach(key => {
        if (!standardProps.includes(key)) {
            variables[key] = item[key];
        }
    });
    if (item.type && item.value !== undefined) {
        variables[item.type] = item.value;
    }
    return variables;
}

export const extractVariablesDeep = (item) => {
    let variables = extractVariables(item);
    if (item && item.children && Array.isArray(item.children)) {
        item.children.forEach(child => {
            variables = { ...variables, ...extractVariablesDeep(child) };
        });
    }
    return variables;
}

// Lets a joined row override its computed break/gradient color via a
// "_Color_<measureName>" column, e.g. "_Color_gdp".
export const resolveOverrideColor = (meta, measure) => {
    if (!meta || !measure) {
        return null;
    }
    return meta[(COLOR_VARIABLE + measure).trim()] || null;
}

const requestQueue = {}

const cache = {};
const ttl = 3 * 60 * 1000; // 3 minutes
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const requestWithDeduplication = (url) => {
    const now = Date.now();
    const key = url;

    if (requestQueue[key]) {
        return requestQueue[key].then(deepClone);
    }

    if (cache[key] && now - cache[key].timestamp < ttl) {
        return Promise.resolve(deepClone(cache[key].data));
    }

    const req = d3.json(url)
        .then(data => {
            cache[key] = { data, timestamp: Date.now() };
            return data;
        })
        .finally(() => {
            delete requestQueue[key];
        });

    requestQueue[key] = req;

    return req.then(deepClone);
};



export const loadJSON = (url) => {
    return requestWithDeduplication(url)
}