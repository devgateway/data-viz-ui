import React, { lazy } from "react";
import type { Route } from "./+types/slugPost";
import Header from "~/components/layout/Header";
const SlugPostContainer = lazy(async () => {
  const module = await import('@devgateway/dvz-ui-react/layout');
  return { default: module.SlugPostContainer };
});


const SlugPostRoute = ({ params }: Route.ComponentProps) => {
  return <SlugPostContainer  header={<Header locale={params.lan}/>} />
};

export default SlugPostRoute;