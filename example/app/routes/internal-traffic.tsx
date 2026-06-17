import React from "react";
import { useParams } from "react-router";
import { InternalTrafficToggle } from "@devgateway/dvz-ui-react/tracker";
import type { Route } from "./+types/internal-traffic";

export function meta() {
  return [
    { title: "GA Internal Traffic Toggle" },
    { name: "description", content: "Internal traffic tracking toggle" },
  ];
}

/**
 * Route for toggling internal traffic bypass.
 * Simply enables/disables the _ga_internal_traffic cookie.
 */
export async function loader() {
  return {};
}

const InternalTrafficPage = () => {
  const params = useParams();
  const locale = params.lan || "en";
  const redirectTo = `/${locale}`;

  return <InternalTrafficToggle redirectTo={redirectTo} />;
};

export default InternalTrafficPage;
