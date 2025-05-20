import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";
import { redirect } from "react-router";

export default [
    index("routes/home.tsx"),
    layout("./components/layout/index.tsx", [
        route(":lan/embeddable/:name", "./routes/embeddable.tsx")
    ]),
    route("/.well-known/appspecific/com.chrome.devtools.json", "./routes/devtools.tsx")
] satisfies RouteConfig;
