import React from "react";
import type { Route } from "./+types/slug";
import { getPages } from "@devgateway/wp-react-lib";
import { getMetaSeo } from "~/utils/meta-seo";
import { SlugContainer } from '@devgateway/dvz-ui-react/layout'
import Header from "~/embeddable/Header";
import { getApiUrl } from "~/utils/api-utils";

export async function loader({ request, params}: Route.LoaderArgs) {
  const posts = await getPages({
    slug: params.slug ?? "home",
    locale: params.lan,
    apiBaseUrl: getApiUrl(request),
  });

  const findPost = posts.data.find(post => post.slug === params.slug);
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
      { title: "Page not found" },
      { name: "description", content: "Page not found" },
    ];
  }

  return getMetaSeo(post, yoastHead);
}

const SlugRoute = ({ loaderData, params }: Route.ComponentProps) => {
  if (!loaderData.post) {
    return <div>Page not found</div>;
  }

  return <SlugContainer pages={loaderData.post} />;
};

export default SlugRoute;