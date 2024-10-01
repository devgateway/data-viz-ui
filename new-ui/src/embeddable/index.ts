import React, { lazy } from 'react'
import data from './reducers/data'
import embeddable from './reducers/embeddable'
import {injectIntl} from "react-intl";
import * as customizer from "@devgateway/customizer";

const PageGallery = lazy(() => import("./pagegallery"));
const Download = lazy(() => import("./download"));


let reducerList = {data, embeddable};

if (customizer.Reducers) {
    reducerList = {...reducerList, ...customizer.Reducers}
}

export const reducers = reducerList;

const components = {
    pageGallery: PageGallery,
    download: Download,
    redirect: () => null
}

export const getComponentByNameIgnoreCase = (name: string) => {

    const k = Object.keys(components).find(value => value.toLowerCase() === name.toLowerCase())
    if (k) {
        return injectIntl(components[k])
    } else {
        const customComponent = customizer.getComponentByNameIgnoreCase(name)
        if (customComponent) {
            return injectIntl(customComponent)
        }
    }
}
