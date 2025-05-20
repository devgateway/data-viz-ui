import React from "react";
import { Category } from "@devgateway/wp-react-lib";
import ResponsiveContainer from "@devgateway/dvz-ui-react/layout";

const CategoryRoute = ({ params }: any) => {
  const { lan, slug } = params;
  return (
    <ResponsiveContainer locale={lan}>
      <Category slug={slug} />
    </ResponsiveContainer>
  );
};

export default CategoryRoute;