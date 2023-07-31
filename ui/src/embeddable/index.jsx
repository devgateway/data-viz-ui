import React from 'react'
import asyncComponent from "../AsyncComponent";

import data from './reducers/data'
import embeddable from './reducers/embeddable'
import {injectIntl} from "react-intl";

const TabbedPosts = asyncComponent(() => import("./tabbedposts/"));
const PostsCarousel = asyncComponent(() => import("./postscarousel/"));
const PageGallery = asyncComponent(() => import("./pagegallery/"));
const PageModules = asyncComponent(() => import("./pagemodules/"));
const FeaturedTabs = asyncComponent(() => import("./featuredtabs/"));
const VerticalFeaturedTabs = asyncComponent(() => import("./vertical-featuredtabs/"));
const InlineList = asyncComponent(() => import("./inlinelist/"));
const Chart = asyncComponent(() => import("./chart/"));
const NewsLetter = asyncComponent(() => import("./newsletter/"));
const ShowcaseForm = asyncComponent(() => import("./showcase/"));
const Filter = asyncComponent(() => import("./filter/"));
const Download = asyncComponent(() => import("./download/"));
const DownloadPdf = asyncComponent(() => import('./downloadPDF/'))
const Map = asyncComponent(() => import('./map/'))
const DataFiltersReset = asyncComponent(() => import('./datafiltersreset/'))
const Tooltip = asyncComponent(() => import('./tooltip/'))
const ReferencesList = asyncComponent(() => import('./references/ReferencesList'))
const Reference = asyncComponent(() => import('./references/Reference'))
const TimeLine = asyncComponent(() => import('./time-line'))
const NewTimeLine = asyncComponent(() => import('./new-time-line'))
const Measures = asyncComponent(() => import('./measures'))
const Menu = asyncComponent(() => import('./menu'))
const ChildPagesMenu = asyncComponent(() => import('./child-page-menu'))
const NewMap = asyncComponent(() => import('./d3Map'))
const ParallaxContainer = asyncComponent(() => import('./parallax/'))

export const reducers = {
    data, embeddable
}


const components = {
    pageGallery: PageGallery,
    postsCarousel: PostsCarousel,
    chart: Chart,
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
    newMap: NewMap,
    parallaxContainer: ParallaxContainer,
    redirect: () => null

}

export const getComponentByNameIgnoreCase = (name) => {
    
    const k = Object.keys(components).filter(value => value.toLowerCase() == name.toLowerCase())
    return injectIntl(components[k])
}
