import React from "react";
import type { Route } from "./+types/home";
import { Page } from '@devgateway/wp-react-lib';
import ResponsiveContainer from "@devgateway/dvz-ui-react/layout";
import { useParams } from "react-router";
import { getPages } from "@devgateway/wp-react-lib";
import { getMetaSeo } from "../utils/meta-seo";
import { DEFAULT_LOCALE } from "~/utils/constants";
import Header from "~/embeddable/Header";
import { getApiUrl } from "~/utils/api-utils";

export async function loader({ request, params }: Route.LoaderArgs) {
  const posts = await getPages({
    slug: "home",
    locale: params.lan,
    apiBaseUrl: getApiUrl(request),
  });

  const findPost = posts.data.find(post => post.slug === "home");
  if (!findPost) {
    return {
      post: null,
    }
  }

  return {
    post: findPost,
  }
}



export function meta({ data }: Route.MetaArgs): Route.MetaDescriptors {
  const post = data?.post;
  const yoastHead = post?.yoast_head_json ?? {};
  if (!post || !yoastHead) {
    return [
      { title: "Home" },
      { name: "description", content: "Home" },
    ];
  }

  return getMetaSeo(post, yoastHead);
}


const Home = ({
  loaderData
}: Route.ComponentProps) => {
  const params = useParams();
  const locale = params.lan ?? DEFAULT_LOCALE;

  return (
    <ResponsiveContainer locale={locale} header={<Header {...loaderData} locale={params.lan}/>}>
      <Page pages={[loaderData.post]} />
    </ResponsiveContainer>
  )
};

export default Home;