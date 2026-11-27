import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { loadAlternateMap } from "./src/i18n/alternates";

const site = "https://alwaysbeshels.github.io";
const alternates = loadAlternateMap();

export default defineConfig({
  site,
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const pair = alternates.get(pathname);
        if (!pair) return item;
        return {
          ...item,
          links: [
            { lang: "en-CA", url: new URL(pair.en, site).href },
            { lang: "fr-CA", url: new URL(pair.fr, site).href },
            { lang: "x-default", url: new URL(pair.en, site).href },
          ],
        };
      },
    }),
  ],
});
