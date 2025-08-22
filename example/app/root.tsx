import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import './embeddable';
import type { Route } from "./+types/root";
import 'semantic-ui-css/semantic.min.css';
import "@devgateway/dvz-ui-react/dist/esm/common.css";
import "@devgateway/dvz-ui-react/dist/esm/styles.css";

// Custom styles
import "./scss/index.scss";

import Loading from "./components/layout/Loading";
import Favicon from "./components/layout/Favicon";


export const links: Route.LinksFunction = () => [
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
];

export function HydrateFallback() {
  return <Loading />
}


export function Layout({ children }: Readonly<{ children: React.ReactNode}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" media="all" href={import.meta.env.VITE_REACT_APP_WP_STYLES} />
        <Meta />
        <Links />
        <Favicon />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  if (typeof window === 'undefined') {
    return <Loading />
  }

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
