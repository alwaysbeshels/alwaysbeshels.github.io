export const site = {
  name: "Shelsea's Lab",
  url: "https://alwaysbeshels.github.io",
  author: "Shelsea Saint-Fleur",
  themeColor: "#AC152B",
  ogImage: "/assets/brand/og-image.png",
  ogWidth: 1200,
  ogHeight: 630,
  repo: "https://github.com/alwaysbeshels/alwaysbeshels.github.io",
  updated: "2026-11-26",
  themeStorageKey: "shelseas-lab-theme",
  socials: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/alwaysbeshels",
      handle: "alwaysbeshels",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shelseastf/",
      handle: "shelseastf",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/alwaysbeshels.perso/",
      handle: "alwaysbeshels.perso",
    },
  ],
} as const;

export type SocialId = (typeof site.socials)[number]["id"];
