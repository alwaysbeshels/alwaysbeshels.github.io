import type { Lang } from "../i18n/paths";

const zone = "UTC";

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: zone,
  }).format(date);
}

export function formatMonth(iso: string, lang: Lang): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-CA", {
    month: "short",
    year: "numeric",
    timeZone: zone,
  }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
