import type { Lang } from "./paths";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalPage = {
  title: string;
  description: string;
  sections: LegalSection[];
};

export const legal: Record<Lang, { privacy: LegalPage; terms: LegalPage }> = {
  en: {
    privacy: {
      title: "Privacy policy",
      description:
        "Shelsea's Lab is a static site with no analytics, no cookies, and no trackers. Here is exactly what that means.",
      sections: [
        {
          heading: "The short version",
          paragraphs: [
            "This is a static personal site. It does not use analytics, advertising, or tracking cookies. I do not set cookies at all, and I do not embed third-party scripts.",
          ],
        },
        {
          heading: "What the host sees",
          paragraphs: [
            "The site is hosted on GitHub Pages. When your browser requests a page, GitHub receives the usual technical data for that request: IP address, browser type, and the page address. Those logs belong to GitHub, under GitHub’s privacy policy. I do not receive a copy, and I do not add a logger of my own.",
          ],
        },
        {
          heading: "What stays in your browser",
          paragraphs: [
            "Language is the address you open. English is at the root, French is under /fr/. Nothing about language is stored.",
            "If you switch the colour theme, the choice is saved in localStorage on your device, under the key shelseas-lab-theme. The value is light or dark. It is not sent to me. If you never touch the toggle, nothing is written, and the site follows your system setting. Clearing site data for this domain removes the key. The site still works if storage is blocked.",
          ],
        },
        {
          heading: "Search",
          paragraphs: [
            "Search uses Pagefind. The index is part of the site, and the query runs in your browser. Queries are not sent to a search service I operate.",
          ],
        },
        {
          heading: "Other sites",
          paragraphs: [
            "Links to C’est déjà l’enfer, GitHub, LinkedIn, Instagram, and project repositories leave this site. Those sites have their own policies. I do not embed their trackers here. Fonts are files on this site, not a request to a font service.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "There is no form, no account, and no mailing list. The profiles on the about page are how to reach me.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of use",
      description:
        "Plain-language terms for Shelsea's Lab. Not a contract written by a lawyer.",
      sections: [
        {
          heading: "What this is",
          paragraphs: [
            "A personal site. This is not legal advice, and these terms were not written by a lawyer. They say, in plain language, how I expect the site to be used.",
          ],
        },
        {
          heading: "The work",
          paragraphs: [
            "The code of this website is published under the MIT license. The writing, and the flask logo — the S-shaped mark of Shelsea's Lab — identify me. You can use the code under that license. Please do not take the logo and present it as your own.",
            "Morning Press is a separate project under the MIT license. C’est déjà l’enfer is a live site. Its source is not published from these pages.",
          ],
        },
        {
          heading: "The timeline",
          paragraphs: [
            "Some experience entries are blanks, marked to be completed, with TODO in the fields. They are not claims about an employer, a title, or a date.",
          ],
        },
        {
          heading: "No warranty",
          paragraphs: [
            "The site is provided as-is. Pages can be wrong, out of date, or unavailable. Sites I link to are not under my control.",
          ],
        },
        {
          heading: "Please don’t",
          paragraphs: [
            "Don’t disrupt the host, don’t present my writing as yours, and don’t suggest that I endorse you.",
          ],
        },
        {
          heading: "Reach me",
          paragraphs: [
            "The about page lists GitHub, LinkedIn, and Instagram. There is no other contact channel on this site.",
          ],
        },
      ],
    },
  },
  fr: {
    privacy: {
      title: "Politique de confidentialité",
      description:
        "Le Shelsea's Lab est un site statique, sans analytique, sans cookies et sans traceurs. Voici précisément ce que ça veut dire.",
      sections: [
        {
          heading: "En bref",
          paragraphs: [
            "C’est un site personnel statique. Il n’utilise pas d’analytique, pas de publicité et pas de cookies de suivi. Je ne dépose aucun témoin (cookie), et je n’intègre aucun script tiers.",
          ],
        },
        {
          heading: "Ce que l’hébergeur voit",
          paragraphs: [
            "Le site est hébergé sur GitHub Pages. Quand votre navigateur demande une page, GitHub reçoit les données techniques habituelles de la requête\u202F: l’adresse IP, le type de navigateur et l’adresse de la page. Ces journaux appartiennent à GitHub, selon sa politique de confidentialité. Je n’en reçois pas de copie, et je n’ajoute pas de journal de mon côté.",
          ],
        },
        {
          heading: "Ce qui reste dans votre navigateur",
          paragraphs: [
            "La langue, c’est l’adresse que vous ouvrez. L’anglais est à la racine, le français est sous /fr/. Rien n’est enregistré à ce sujet.",
            "Si vous changez le thème de couleur, le choix est conservé dans le localStorage de votre appareil, sous la clé shelseas-lab-theme. La valeur est light ou dark. Elle ne m’est pas envoyée. Si vous ne touchez pas au bouton, rien n’est écrit, et le site suit le réglage de votre système. Effacer les données du site pour ce domaine retire la clé. Le site fonctionne même si le stockage est bloqué.",
          ],
        },
        {
          heading: "Recherche",
          paragraphs: [
            "La recherche utilise Pagefind. L’index fait partie du site, et la requête s’exécute dans votre navigateur. Les requêtes ne sont pas envoyées à un service de recherche que j’exploite.",
          ],
        },
        {
          heading: "Autres sites",
          paragraphs: [
            "Les liens vers C’est déjà l’enfer, GitHub, LinkedIn, Instagram et les dépôts des projets quittent ce site. Ces sites ont leurs propres politiques. Je n’y intègre pas leurs traceurs. Les polices sont des fichiers de ce site, pas une requête vers un service de polices.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Il n’y a pas de formulaire, pas de compte et pas d’infolettre. Les profils de la page À propos sont le moyen de me joindre.",
          ],
        },
      ],
    },
    terms: {
      title: "Conditions d’utilisation",
      description:
        "Des conditions en langage clair pour le Shelsea's Lab. Pas un contrat rédigé par une avocate.",
      sections: [
        {
          heading: "De quoi il s’agit",
          paragraphs: [
            "Un site personnel. Ce n’est pas un avis juridique, et ces conditions n’ont pas été rédigées par une avocate. Elles disent, simplement, comment j’envisage l’usage du site.",
          ],
        },
        {
          heading: "Le travail",
          paragraphs: [
            "Le code de ce site est publié sous la licence MIT. Les textes, et le logo de la fiole — le S du Shelsea's Lab — m’identifient. Vous pouvez utiliser le code selon cette licence. Merci de ne pas prendre le logo pour le présenter comme le vôtre.",
            "Morning Press est un projet à part, sous licence MIT. C’est déjà l’enfer est un site en ligne. Son code source n’est pas publié à partir de ces pages.",
          ],
        },
        {
          heading: "Le parcours",
          paragraphs: [
            "Certaines entrées du parcours sont des blancs, marqués à compléter, avec des TODO dans les champs. Ce ne sont pas des affirmations sur un employeur, un titre ou une date.",
          ],
        },
        {
          heading: "Aucune garantie",
          paragraphs: [
            "Le site est fourni tel quel. Des pages peuvent être inexactes, périmées ou indisponibles. Les sites vers lesquels je pointe ne sont pas sous mon contrôle.",
          ],
        },
        {
          heading: "Merci de ne pas",
          paragraphs: [
            "Ne pas nuire à l’hébergeur, ne pas présenter mes textes comme les vôtres, et ne pas laisser entendre que je vous approuve.",
          ],
        },
        {
          heading: "Me joindre",
          paragraphs: [
            "La page À propos liste GitHub, LinkedIn et Instagram. Il n’y a pas d’autre moyen de contact sur ce site.",
          ],
        },
      ],
    },
  },
};
