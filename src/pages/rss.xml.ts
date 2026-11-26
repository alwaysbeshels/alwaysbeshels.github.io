import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { site } from "../data/site";
import { loadPosts, postHref } from "../lib/content";
import { useUI } from "../i18n/ui";

export async function GET(context: APIContext) {
  const t = useUI("en");
  const posts = await loadPosts("en");
  return rss({
    title: t.rssTitle,
    description: "Notes from Shelsea's Lab.",
    site: context.site ?? site.url,
    trailingSlash: true,
    customData: "<language>en-ca</language>",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postHref(post),
    })),
  });
}
