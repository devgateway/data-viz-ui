import React, { lazy } from "react";
import { Category } from "@devgateway/wp-react-lib";
import Loading from "~/components/layout/Loading";

const ResponsiveContainer = lazy(() => import("@devgateway/dvz-ui-react/layout"));

export function HydrateFallback() {
  return <Loading />
}


const CategoryRoute = ({ params }: any) => {
  const { lan, slug } = params;
  return (
    <ResponsiveContainer locale={lan}>
      <Category slug={slug} />
    </ResponsiveContainer>
  );
};

export default CategoryRoute;