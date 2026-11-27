import type { Lang } from "../i18n/paths";

/**
 * Career timeline.
 *
 * The page renders this array top to bottom. Put the newest work first.
 * Nothing here is sorted for you.
 *
 * HOW TO FILL AN ENTRY
 * 1. Replace every "TODO" string with the real fact.
 * 2. Set `start` to an ISO date (`YYYY-MM-DD`). Use `end: null` and
 *    `current: true` if the role is ongoing. Otherwise set `end` too.
 * 3. Set `placeholder` to false. While it is true, the card is dashed and
 *    labelled "To be completed", and missing dates show as "TODO: dates".
 * 4. Write the summary in both `en` and `fr`. Keep the French in Québec
 *    French (ingénieure, courriel, Grand Montréal, B.Ing.).
 * 5. Do not add an employer, a title, or a date you are not sure of.
 *    A blank is better than a guess. The known facts — data engineer,
 *    Greater Montréal, B.Eng. in computer engineering — already appear
 *    in the strip above the timeline. They are not a job entry.
 *
 * `kind` is "work" or "education". `id` becomes the anchor (#id).
 *
 * Completed example, left commented until the facts are real:
 *
 * {
 *   id: "example-role",
 *   placeholder: false,
 *   kind: "work",
 *   start: "2022-06-01",
 *   end: null,
 *   current: true,
 *   en: {
 *     title: "Data engineer",
 *     org: "Example Company",
 *     location: "Montréal",
 *     summary: "One or two sentences about the work, in your own words.",
 *   },
 *   fr: {
 *     title: "Ingénieure de données",
 *     org: "Exemple inc.",
 *     location: "Montréal",
 *     summary: "Une ou deux phrases sur le travail, dans vos mots.",
 *   },
 * },
 */
export type TimelineEntry = {
  id: string;
  /** True until title, organization, and dates are all real. */
  placeholder: boolean;
  kind: "work" | "education";
  /** ISO date (YYYY-MM-DD), or null while unknown. */
  start: string | null;
  /** ISO date, or null if the role is current — or still unknown. */
  end: string | null;
  /** True only when placeholder is false, end is null, and the role is current. */
  current: boolean;
  en: TimelineCopy;
  fr: TimelineCopy;
};

type TimelineCopy = {
  title: string;
  org: string;
  location: string;
  summary: string;
};

export const timeline: TimelineEntry[] = [
  {
    id: "role-current",
    placeholder: true,
    kind: "work",
    start: null,
    end: null,
    current: false,
    en: {
      title: "TODO: role",
      org: "TODO: company",
      location: "Greater Montréal",
      summary:
        "This entry is a blank. The role, the employer, and the dates have not been added.",
    },
    fr: {
      title: "TODO\u202F: poste",
      org: "TODO\u202F: employeur",
      location: "Grand Montréal",
      summary:
        "Cette entrée est un blanc. Le poste, l'employeur et les dates n'ont pas encore été ajoutés.",
    },
  },
  {
    id: "education-computer-engineering",
    placeholder: true,
    kind: "education",
    start: null,
    end: null,
    current: false,
    en: {
      title: "B.Eng. in Computer Engineering",
      org: "TODO: university",
      location: "TODO: city",
      summary:
        "The degree is real: a B.Eng. in computer engineering. The university and the years are still blank.",
    },
    fr: {
      title: "B.Ing. en génie informatique",
      org: "TODO\u202F: université",
      location: "TODO\u202F: ville",
      summary:
        "Le diplôme est réel\u202F: un baccalauréat en génie informatique. L'université et les années sont encore en blanc.",
    },
  },
];

export function timelineCopy(entry: TimelineEntry, lang: Lang): TimelineCopy {
  return entry[lang];
}
