import React, { lazy } from "react";
import type { Route } from "./+types/slugPost";

const SlugPostContainer = lazy(async () => {
  const module = await import('@devgateway/dvz-ui-react/layout');
  return { default: module.SlugPostContainer };
});


const SlugPostRoute = ({ params }: Route.ComponentProps) => {
  return <SlugPostContainer />
};

export default SlugPostRoute;