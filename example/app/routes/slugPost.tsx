import React, { lazy } from "react";

const SlugPostContainer = lazy(async () => {
  const module = await import('@devgateway/dvz-ui-react/layout');
  return { default: module.SlugPostContainer };
});


const SlugPostRoute = ({ params }: any) => {
  return <SlugPostContainer />;
};

export default SlugPostRoute;