import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation
} from "react-router";
import './embeddable';
import type { Route } from "./+types/root";

import { Loading, SSRFavicon } from '@devgateway/dvz-ui-react/layout';
// Replace ESM CSS imports with URL imports so we can control order via links()
import semanticCssHref from "semantic-ui-css/semantic.min.css?url";
import dvzCommonCssHref from "@devgateway/dvz-ui-react/dist/esm/common.css?url";
import dvzStylesCssHref from "@devgateway/dvz-ui-react/dist/esm/styles.css?url";
import appCssHref from "./scss/index.scss?url";


export const links: Route.LinksFunction = () => [
    { rel: "stylesheet", href: semanticCssHref },
    { rel: "stylesheet", href: dvzCommonCssHref },
    { rel: "stylesheet", href: dvzStylesCssHref },
    // Ensure your app styles load last to override library defaults
    { rel: "stylesheet", href: appCssHref },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: import.meta.env.VITE_REACT_APP_WP_STYLES ??
    "/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' id='wp-block-library-css"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap",
  },
  // Keep third‑party CSS in explicit order

];

export async function loader(): Promise<{ faviconUrl: string | null }> {
  const siteUrl = import.meta.env.VITE_REACT_APP_WP_API || "/wp/wp-json";

  try {
    const response = await fetch(siteUrl);
    const data = await response.json();

    return {
      faviconUrl: data?.site_icon_url || null,
    };
  } catch (error) {
    console.error('Failed to fetch favicon:', error);
    return {
      faviconUrl: null,
    };
  }
}

export function HydrateFallback() {
  return <Loading />
}


export function Layout({ children }: Readonly<{ children: React.ReactNode}>) {
  const data = useLoaderData<typeof loader>();

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <SSRFavicon siteLogo={data?.faviconUrl ?? ""} />
      </head>
      <body>
        {isNavigating && <Loading />}
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Outlet/>
  );
}

export function ErrorBoundary({ error }: Readonly<Route.ErrorBoundaryProps>) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
