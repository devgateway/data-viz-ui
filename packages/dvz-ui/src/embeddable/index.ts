import React, { lazy } from 'react'
import data from './reducers/data'
import embeddable from './reducers/embeddable'
import { injectIntl } from "react-intl";
import Immutable from 'immutable';

// components
const PageGallery = lazy(() => import("./pagegallery/index"));
const Download = lazy(() => import("./download/index"));
const PostsCarousel = lazy(() => import("./postscarousel/index"));
const Chart = lazy(() => import("./chart/index"));
const Filter = lazy(() => import("./filter/index"));
const ShowcaseForm = lazy(() => import("./showcase/index"));
const NewsLetter = lazy(() => import("./newsletter/index"));
const TabbedPosts = lazy(() => import("./tabbedposts/index"));
const PageModules = lazy(() => import("./pagemodules/index"));
const FeaturedTabs = lazy(() => import("./featuredtabs/index"));
const VerticalFeaturedTabs = lazy(() => import("./vertical-featuredtabs/index"));
const InlineList = lazy(() => import("./inlinelist/index"));
const AgreeAndDownload = lazy(() => import("./agree-and-download/index"));
const DownloadPdf = lazy(() => import("./downloadPDF/index"));
const MapView = lazy(() => import("./map/index"));
const DataFiltersReset = lazy(() => import("./filter-reset-button/index"));
const DataFiltersApply = lazy(() => import("./filters-apply-button/index"));
const Tooltip = lazy(() => import("./tooltip/index"));
const ReferencesList = lazy(() => import("./references/ReferencesList"));
const Reference = lazy(() => import("./references/Reference"));
const TimeLine = lazy(() => import("./time-line/index"));
const NewTimeLine = lazy(() => import("./new-time-line/index"));
const Measures = lazy(() => import("./measures/index"));
const Menu = lazy(() => import("./menu/index"));
const ChildPagesMenu = lazy(() => import("./child-page-menu/index"));
const NewMap = lazy(() => import("./d3Map/index"));
const ParallaxContainer = lazy(() => import("./parallax/index"));
const Wrapped = lazy(() => import("./wrapped/index"));
const SankeyChart = lazy(() => import("./sankeychart/index"));
const DataLabel = lazy(() => import("./datalabel/index"));
const Body = lazy(() => import("./body/index"));
const SupersetChart = lazy(() => import("./superset-chart/index"));
const SupersetDashboard = lazy(() => import("./superset-dashboard/index"));
const BigNumber = lazy(() => import("./big-number/index"));
const BigNumberTrend = lazy(() => import("./big-number-trend/index"));


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
    map: MapView,
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
    bigNumberTrend: BigNumberTrend,
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
