import type { PostType , PostYoastHeadJSON } from "@devgateway/wp-react-lib";

export const getMetaSeo = (post: PostType, yoastHead: PostYoastHeadJSON) => {
    return [
        { title: post.title.rendered },
        { name: "description", content: yoastHead.description },
        { name: "og:title", content: yoastHead.title },
        { name: "author", content: yoastHead.author },
        { name: "og:description", content: yoastHead.description },
        { name: "og:image", content: yoastHead.og_image?.[0]?.url },
        { name: "og:image:width", content: yoastHead.og_image?.[0]?.width },
        { name: "og:image:height", content: yoastHead.og_image?.[0]?.height },
        { name: "og:image:type", content: yoastHead.og_image?.[0]?.type },
        { name: "og:image:alt", content: yoastHead.title },
        { name: "og:url", content: yoastHead.og_url },
        { name: "og:site_name", content: yoastHead.og_site_name },
        { name: "og:type", content: yoastHead.og_type },
        { name: "og:locale", content: yoastHead.og_locale },
        { name: "canonical", content: yoastHead.canonical ?? yoastHead.og_url },
        { name: "robots", content: Object.values(yoastHead.robots ?? {}).join(",") },
        { name: "twitter:card", content: yoastHead.twitter_card },
        { name: "twitter:title", content: yoastHead.title },
        { name: "twitter:description", content: yoastHead.description },
        { name: "twitter:image", content: yoastHead.twitter_image },
        { name: "twitter:site", content: yoastHead.twitter_site },

        // json-ld
        { "script:ld+json": yoastHead.schema },
    ]
}