import * as d3 from "d3";
import { get } from "@/api/commons.js";


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