import React from "react";
import type { Route } from "./+types/home";
import { PageConsumer, PageProvider, Page } from '@devgateway/wp-react-lib';
import ResponsiveContainer from "@devgateway/dvz-ui-react/layout";
import { useParams } from "react-router";
import { getPages } from "@devgateway/wp-react-lib/api";
import { getMetaSeo } from "../utils/meta-seo";
import Loading from "~/components/layout/Loading";
import { DEFAULT_LOCALE } from "~/utils/constants";

export function HydrateFallback() {
  return <Loading />
}


export async function clientLoader({ request, params}: Route.ClientLoaderArgs) {
  const posts = await getPages({
    slug: "home",
    locale: params.lan,
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
    <PageProvider
      slug={"home"}
      locale={locale}
      store={"home"}>
      <PageConsumer>
        <ResponsiveContainer locale={locale}>
          <PageConsumer>
            <Page />
          </PageConsumer>
        </ResponsiveContainer>
      </PageConsumer>
    </PageProvider>
  )
};

export default Home;