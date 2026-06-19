import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "react-router";
import "./embeddable";
import type { Route } from "./+types/root";
import React from "react";
import { SSRFavicon } from "@devgateway/dvz-ui-react/layout";
// Replace ESM CSS imports with URL imports so we can control order via links()
import semanticCssHref from "semantic-ui-css/semantic.min.css?url";
import dvzCommonCssHref from "@devgateway/dvz-ui-react/dist/esm/common.css?url";
import appCssHref from "./scss/index.scss?url";
import { getApiUrl } from "./utils/api-utils";
import { ClientAnalyticsWrapper } from "./layout/ClientAnalyticsWrapper";

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href:
      import.meta.env.VITE_REACT_APP_WP_STYLES ??
      "/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6id='wp-block-library-css",
  },
  { rel: "stylesheet", href: semanticCssHref },
  { rel: "stylesheet", href: dvzCommonCssHref },
  // Ensure your app styles load last to override library defaults

  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },

  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap",
  },
  { rel: "stylesheet", href: appCssHref },
  // Keep third‑party CSS in explicit order
];

export interface PublicEnv {
  REACT_APP_GA_CODE: string;
}

/**
 * Fetches the dviz settings from the WordPress REST API (`/dg/v1/settings`)
 * and extracts the `google_analytics_code` configured in WP admin.
 * Falls back to the Docker runtime env var `VITE_REACT_APP_GA_CODE` if the
 * settings endpoint is unreachable.
 */
async function fetchPublicEnv(wpApiBase: string): Promise<PublicEnv> { 
  const defaultLocale = process.env.VITE_REACT_APP_DEFAULT_LOCALE ?? "en";

  try {
    const settingsUrl = `${wpApiBase}/dg/v1/settings?lang=${defaultLocale}`;
    console.log("[root] Fetching dviz settings from:", settingsUrl);
    const res = await fetch(settingsUrl);
    if (!res.ok) {
      throw new Error(`Settings endpoint returned ${res.status}`);
    }
    const settings = await res.json();
    const gaCode = settings?.google_analytics_code ?? "";
    console.log(
      "[root] GA code from dviz settings:",
      gaCode ? gaCode.substring(0, 5) + "..." : "NONE",
    );

    return {
      REACT_APP_GA_CODE: gaCode,
    };
  } catch (error) {
    console.error(
      "[root] Failed to fetch dviz settings, falling back to env var:",
      error,
    );
    return {
      REACT_APP_GA_CODE: process.env.VITE_REACT_APP_GA_CODE ?? "",
    };
  }
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ faviconUrl: string | null; ENV: PublicEnv }> {
  const siteUrl = getApiUrl(request);
  console.log("siteUrl", siteUrl);

  // Fetch site info and dviz settings in parallel
  const envPromise = fetchPublicEnv(siteUrl);

  try {
    const [response, ENV] = await Promise.all([fetch(siteUrl), envPromise]);
    const data = await response.json();

    return {
      faviconUrl: data?.site_icon_url || null,
      ENV,
    };
  } catch (error) {
    console.error("Failed to fetch favicon:", error);
    const ENV = await envPromise.catch(() => ({
      REACT_APP_GA_CODE: process.env.VITE_REACT_APP_GA_CODE ?? "",
    }));
    return {
      faviconUrl: null,
      ENV,
    };
  }
}

// export function HydrateFallback() {
//   return <Loading />
// }

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
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
        <div id="root">{children}</div>
        <ScrollRestoration />
        {/*
          Inject runtime env vars into the client so that client-only code
          (e.g. ClientAnalyticsWrapper) can read window.ENV without relying
          on Vite's import.meta.env or process.env.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data?.ENV ?? {})};`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ClientAnalyticsWrapper>
      <Outlet />
    </ClientAnalyticsWrapper>
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
