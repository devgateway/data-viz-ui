import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useParams,
  type LoaderFunctionArgs,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import 'semantic-ui-css/semantic.min.css';
import "@devgateway/dvz-ui-react/dist/esm/styles.css";
import "@devgateway/dvz-ui-react/dist/esm/common.css";
import { injectIntl } from "react-intl";
import Loading from "./components/layout/Loading";


export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const segments = pathname.split('/').filter(Boolean); // Split path and remove empty segments
  const firstSegment = segments[0];
  const DEFAULT_LOCALE = "en";
  const SUPPORTED_LOCALES = ["en", "fr"];

  // Check if the first segment is a supported locale
  const hasValidLocale = SUPPORTED_LOCALES.includes(firstSegment as any);

  // If no locale is present, redirect to the default locale
  if (!hasValidLocale) {
    const newPath = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
    return redirect(newPath, { status: 307 }); // 307 preserves the HTTP method
  }

  // If locale is valid, proceed without redirection
  return null;
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: import.meta.env.VITE_REACT_APP_WP_STYLES,
  },
];

export function HydrateFallback() {
  return <Loading />
}


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const InjectTitle = injectIntl((props) => {

  // @ts-expect-error description
  document.title = props.settings.description
  return <></>
});


export default function App() {

  return (
    <>
      {/* <ScrollToTop /> */}
      {/* <CustomizerWrapper>
        <InjectTitle />
      </CustomizerWrapper> */}

      <Outlet />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
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
