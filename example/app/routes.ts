import { type RouteConfig, route, layout, prefix, index } from "@react-router/dev/routes";
import { redirect } from 'react-router';

export default [
    layout("./components/layout/index.tsx", [
        ...prefix(":lan", [
            index("./routes/home.tsx"),
            route(":slug", "./routes/slug.tsx"),
            route(":parent/:slug", "./routes/parent-slug.tsx"),
            // route(":lan/category/:slug", "./routes/category.tsx"),
            route("embeddable/:name", "./routes/embeddable.tsx"),
            // route(":lan/preview/page/:id", "./routes/previewPage.tsx"),
            // route(":lan/preview/:type/:id", "./routes/previewType.tsx"),
            // route(":lan/:year/:month/:day/:slug", "./routes/slugPost.tsx"),
            // route(":lan/:parent/:year/:month/:day/:slug", "./routes/slugPost.tsx"),
        ]),
        // route("*", "./routes/not-found.tsx")

    ]),
    route("/.well-known/appspecific/com.chrome.devtools.json", "./routes/devtools.tsx")
] satisfies RouteConfig;
