import React from "react";
import { useLoaderData, useParams } from "react-router";
import { InternalTrafficToggle } from "@devgateway/dvz-ui-react/tracker";
import type { Route } from "./+types/internal-traffic";

export function meta() {
  return [
    { title: "GA Internal Traffic Toggle" },
    { name: "description", content: "Internal traffic tracking toggle" },
  ];
}

/**
 * Server-side loader reads the GA internal token from the runtime environment
 * so it can be forwarded to the client without relying on import.meta.env or
 * process.env in client code.
 */
export async function loader() {
  return {
    token: process.env.VITE_INTERNAL_GA_TOKEN ?? process.env.GA_TOKEN ?? "",
  };
}

const InternalTrafficPage = () => {
  const params = useParams();
  const data = useLoaderData<typeof loader>();

  // Prefer the value from the server loader; fall back to window.ENV for
  // client-side navigations where the loader data may not have re-run.
  const token =
    data?.token ||
    (typeof window !== "undefined" ? window.ENV?.INTERNAL_GA_TOKEN : "") ||
    "";

  const locale = params.lan || "en";
  const redirectTo = `/${locale}`;

  if (!token) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Configuration Error</h1>
        <p>
          VITE_INTERNAL_GA_TOKEN (or GA_TOKEN) environment variable is not set
          in the Docker runtime environment.
        </p>
      </div>
    );
  }

  return <InternalTrafficToggle token={token} redirectTo={redirectTo} />;
};

export default InternalTrafficPage;
