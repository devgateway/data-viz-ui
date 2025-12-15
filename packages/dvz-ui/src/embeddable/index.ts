import React, { lazy } from 'react'
import data from './reducers/data'
import embeddable from './reducers/embeddable'
import { injectIntl } from "react-intl";
import * as Immutable from 'immutable';

// components
const PageGallery = lazy(() => import("./pagegallery"));
const Download = lazy(() => import("./download"));
const PostsCarousel = lazy(() => import("./postscarousel"));
const Chart = lazy(() => import("./chart"));
const Filter = lazy(() => import("./filter"));
const ShowcaseForm = lazy(() => import("./showcase"));
const NewsLetter = lazy(() => import("./newsletter"));
const TabbedPosts = lazy(() => import("./tabbedposts"));
const PageModules = lazy(() => import("./pagemodules"));
const FeaturedTabs = lazy(() => import("./featuredtabs"));
const VerticalFeaturedTabs = lazy(() => import("./vertical-featuredtabs"));
const InlineList = lazy(() => import("./inlinelist"));
const AgreeAndDownload = lazy(() => import("./agree-and-download/"));
const DownloadPdf = lazy(() => import("./downloadPDF"));
const Map = lazy(() => import("./map"));
const DataFiltersReset = lazy(() => import("./filter-reset-button"));
const DataFiltersApply = lazy(() => import("./filters-apply-button"));
const Tooltip = lazy(() => import("./tooltip"));
const ReferencesList = lazy(() => import("./references/ReferencesList"));
const Reference = lazy(() => import("./references/Reference"));
const TimeLine = lazy(() => import("./time-line"));
const NewTimeLine = lazy(() => import("./new-time-line"));
const Measures = lazy(() => import("./measures"));
const Menu = lazy(() => import("./menu"));
const ChildPagesMenu = lazy(() => import("./child-page-menu"));
const NewMap = lazy(() => import("./d3Map"));
const ParallaxContainer = lazy(() => import("./parallax"));
const Wrapped = lazy(() => import("./wrapped"));
const SankeyChart = lazy(() => import("./sankeychart"));
const DataLabel = lazy(() => import("./datalabel"));
const Body = lazy(() => import("./body"));
const SupersetChart = lazy(() => import("./superset-chart"));
const SupersetDashboard = lazy(() => import("./superset-dashboard"));
const BigNumber = lazy(() => import("./big-number"));
const GroupedBars = lazy(() => import("./grouped-bars"));
const BigNumberTrend = lazy(() => import("./big-number-trend"));
const PostsWithFilters = lazy(() => import("./posts-with-filters"));
const SmallNumber = lazy(() => import("./small-number"));


export const components = {
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
    dataFiltersApply: DataFiltersApply,
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
    wrapped: Wrapped,
    sankeyChart: SankeyChart,
    dataLabel: DataLabel,
    body: Body,
	supersetChart: SupersetChart,
    supersetDashboard: SupersetDashboard,
    agreeAndDownload: AgreeAndDownload,
	bigNumber: BigNumber,
    groupedBars: GroupedBars,
    bigNumberTrend: BigNumberTrend,
    postsWithFilters: PostsWithFilters,
    smallNumber: SmallNumber,
    redirect: () => null
}

export const customizer = {
    components: {},
    reducers: {} as Record<string, (state: Immutable.MapOf<{
        mode: string;
    }> | undefined, action: any) => any>,
    registerCustomEmbeddables: (components: Record<string, React.ComponentType<any>>) => {
        for (const [key, value] of Object.entries(components)) {
            customizer.components[key] = value
        }
    },
    getComponentByNameIgnoreCase : (name: string) => {
        const k = Object.keys(customizer.components).find(value => value.toLowerCase() === name.toLowerCase())
        if (k) {
            const Component = customizer.components[k]
            return React.memo(injectIntl(Component))
        }
        return null
    },
    registerCustomReducers: (reducers: (state: Immutable.MapOf<{
        mode: string;
    }> | undefined, action: any) => any) => {
        for (const [key, value] of Object.entries(reducers)) {
            customizer.reducers[key] = value
        }
    },
    getReducers: () => {
        return customizer.reducers
    }
}

export const getComponentByNameIgnoreCase = (name: string) => {

    const k = Object.keys(components).find(value => value.toLowerCase() === name.toLowerCase())
    if (k) {
        const Component = components[k]
        return React.memo(injectIntl(Component))
    }

    const customComponent = customizer.getComponentByNameIgnoreCase(name)
    if (customComponent) {
        return React.memo(injectIntl(customComponent))
    }

    return null
}


export const reducers =  { data, embeddable, ...customizer.getReducers() };
