import { type RouteConfig, route, layout, prefix, index } from "@react-router/dev/routes";

export default [
    layout("./components/layout/index.tsx", [
        index("./routes/home.tsx", {
            id: "home_index"
        }),
        ...prefix(":lan", [
            index("./routes/home.tsx"),
            route(":slug", "./routes/slug.tsx"),
            route(":parent/:slug", "./routes/slug.tsx", {
                id: "parent_slug"
            }),
            route("category/:slug", "./routes/category.tsx"),
            route("embeddable/:name", "./routes/embeddable.tsx"),
            route("preview/page/:id", "./routes/previewPage.tsx"),
            route("preview/:type/:id", "./routes/previewType.tsx"),
            route(":year/:month/:day/:slug", "./routes/slugPost.tsx"),
            route("parent/:year/:month/:day/:slug", "./routes/slugPost.tsx", {
                id: "parent_slug_with_year_month_day"
            }),
            route("/.well-known/appspecific/com.chrome.devtools.json", "./routes/devtools.tsx", {
                id: "devtools"
            })
        ]),

        // route("*", "./routes/not-found.tsx")

    ]),
    route("/.well-known/appspecific/com.chrome.devtools.json", "./routes/devtools.tsx")
] satisfies RouteConfig;
