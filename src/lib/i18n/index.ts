export type Locale = "fr" | "en" | "zh";

export type Zh = { zh: string; py: string };
export type Text = string | Zh;

export type Line = {
  fr: string;
  en: string;
  zh: string;
  py: string;
};

export const LOCALES: { id: Locale; label: string }[] = [
  { id: "zh", label: "中" },
  { id: "en", label: "EN" },
  { id: "fr", label: "FR" },
];

export const BCP47: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  zh: "zh-CN",
};

export function t(locale: Locale, line: Line): Text {
  if (locale === "zh") return { zh: line.zh, py: line.py };
  return line[locale];
}

export function plain(locale: Locale, line: Line): string {
  if (locale === "zh") return line.zh;
  return line[locale];
}

export const LOCALE_KEY = "take-muscle-locale";
