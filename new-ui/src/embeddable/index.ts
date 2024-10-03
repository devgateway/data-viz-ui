import React, { lazy } from 'react'
import data from './reducers/data'
import embeddable from './reducers/embeddable'
import {injectIntl} from "react-intl";
import * as customizer from "@devgateway/customizer";

// components
const PageGallery = lazy(() => import("./pagegallery"));
const Download = lazy(() => import("./download"));
const PostsCarousel = lazy(() => import("./postscarousel"));
const Filter = lazy(() => import("./filter"));
const ShowcaseForm = lazy(() => import("./showcase"));
const NewsLetter = lazy(() => import("./newsletter"));
const TabbedPosts = lazy(() => import("./tabbedposts"));
const PageModules = lazy(() => import("./pagemodules"));
const FeaturedTabs = lazy(() => import("./featuredtabs"));
const VerticalFeaturedTabs = lazy(() => import("./vertical-featuredtabs"));
const InlineList = lazy(() => import("./inlinelist"));
const DownloadPdf = lazy(() => import("./downloadPDF"));
const Map = lazy(() => import("./map"));
const DataFiltersReset = lazy(() => import("./datafiltersreset"));
const Tooltip = lazy(() => import("./tooltip"));
const ReferencesList = lazy(() => import("./references/ReferencesList"));
const Reference = lazy(() => import("./references/Reference"));
const TimeLine = lazy(() => import("./time-line"));
const NewTimeLine = lazy(() => import("./new-time-line"));
const Measures = lazy(() => import("./measures"));
const Menu = lazy(() => import("./menu"));
const ChildPagesMenu = lazy(() => import("./child-page-menu"));
const ParallaxContainer = lazy(() => import("./parallax"));

let reducerList = {data, embeddable};

if (customizer.Reducers) {
    reducerList = {...reducerList, ...customizer.Reducers}
}

export const reducers = reducerList;

const components = {
    pageGallery: PageGallery,
    postsCarousel: PostsCarousel,
    // chart: Chart,
    filter: Filter,
    showCaseForm: ShowcaseForm,
    newsLetter: NewsLetter,
    tabbedPosts: TabbedPosts,
    pageModules: PageModules,
    featuredTabs: FeaturedTabs,
    verticalTabs: VerticalFeaturedTabs,
    inlineList: InlineList,
    download: Download,
    downloadPdf: DownloadPdf,
    map: Map,
    dataFiltersReset: DataFiltersReset,
    tooltip: Tooltip,
    references: ReferencesList,
    reference: Reference,
    timeLine: TimeLine,
    newTimeLine: NewTimeLine,
    measures: Measures,
    menu: Menu,
    childPagesMenu: ChildPagesMenu,
    // newMap: NewMap,
    parallaxContainer: ParallaxContainer,
    // wrapped: Wrapped,
    // sankeyChart: SankeyChart,
    // dataLabel: DataLabel,
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
