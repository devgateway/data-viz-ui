import React, { lazy} from "react";
import type { Route } from "./+types/slug";
import { getPages } from "@devgateway/wp-react-lib/api";
import { getMetaSeo } from "~/utils/meta-seo";
import Loading from "~/components/layout/Loading";

const SlugContainer = lazy(async () => {
  const module = await import('@devgateway/dvz-ui-react/layout');
  return { default: module.SlugContainer };
});


export function HydrateFallback() {
  return <Loading />
}


export async function clientLoader({ request, params}: Route.ClientLoaderArgs) {
  const posts = await getPages({
    slug: params.slug ?? "home",
    locale: params.lan,
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

const SlugRoute = ({ loaderData }: Route.ComponentProps) => {
  return <SlugContainer />;
};

export default SlugRoute;