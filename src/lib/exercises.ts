import catalog from "../data/exercises.json";
import type { Locale } from "./i18n";

export const MEDIA_BASE =
  "https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/";

export type CatalogExercise = {
  id: string;
  name: string;
  equipment: string;
  bodyPart: string;
  gif: string;
  image: string;
  steps: { en: string[]; fr: string[]; zh: string[] };
};

const BY_ID = new Map((catalog as CatalogExercise[]).map((item) => [item.id, item]));

export function catalogById(id: string | null | undefined) {
  if (!id) return null;
  return BY_ID.get(id) ?? null;
}

export function mediaUrl(path: string | null | undefined) {
  if (!path) return null;
  return `${MEDIA_BASE}${path}`;
}

export function gifUrl(id: string | null | undefined) {
  const row = catalogById(id);
  return mediaUrl(row?.gif ?? null);
}

export function thumbUrl(id: string | null | undefined) {
  const row = catalogById(id);
  return mediaUrl(row?.image ?? null);
}

export function catalogCues(id: string | null | undefined, locale: Locale) {
  const row = catalogById(id);
  if (!row) return [];
  if (locale === "zh") return row.steps.zh.length ? row.steps.zh : row.steps.en;
  if (locale === "en") return row.steps.en;
  return row.steps.fr.length ? row.steps.fr : row.steps.en;
}
