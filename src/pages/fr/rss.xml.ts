import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { site } from "../../data/site";
import { loadPosts, postHref } from "../../lib/content";
import { useUI } from "../../i18n/ui";

export async function GET(context: APIContext) {
  const t = useUI("fr");
  const posts = await loadPosts("fr");
  return rss({
    title: t.rssTitle,
    description: "Notes du Shelsea's Lab.",
    site: context.site ?? site.url,
    trailingSlash: true,
    customData: "<language>fr-ca</language>",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postHref(post),
    })),
  });
}
