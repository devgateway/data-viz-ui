import React from "react";
import type { Route } from "./+types/slugPost";
import { SlugPostContainer } from '@devgateway/dvz-ui-react/layout'



const SlugPostRoute = ({ loaderData }: Route.ComponentProps) => {
  return <SlugPostContainer />
};

export default SlugPostRoute;