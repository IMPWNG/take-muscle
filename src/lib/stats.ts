import { bmi, WEEKLY_GAIN_MIN } from "./program";
import type { Profile, WeightEntry } from "./types";

export function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseDate(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function formatDay(key: string, locale = "fr-FR") {
  return parseDate(key).toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function weekdayIndex(date = new Date()) {
  return (date.getDay() + 6) % 7;
}

export function startOfWeek(date = new Date()) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  copy.setDate(copy.getDate() - weekdayIndex(copy));
  return copy;
}

export function isoWeekRange(date = new Date()) {
  const start = startOfWeek(date);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return localDateKey(d);
  });
  return days;
}

export function sortedWeights(weights: WeightEntry[]) {
  return [...weights].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}

export function latestWeight(weights: WeightEntry[], fallback: number) {
  const sorted = sortedWeights(weights);
  return sorted.at(-1)?.kg ?? fallback;
}

export function weekAverage(weights: WeightEntry[], weekStart: Date) {
  const keys = new Set(isoWeekRange(weekStart));
  const values = weights.filter((entry) => keys.has(entry.date)).map((entry) => entry.kg);
  if (values.length === 0) return null;
  return values.reduce((sum, kg) => sum + kg, 0) / values.length;
}

export function lastNWeekAverages(weights: WeightEntry[], n: number) {
  const current = startOfWeek();
  return Array.from({ length: n }, (_, i) => {
    const start = new Date(current);
    start.setDate(current.getDate() - (n - 1 - i) * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
      start: localDateKey(start),
      range: `${start.getDate()}/${start.getMonth() + 1} – ${end.getDate()}/${end.getMonth() + 1}`,
      current: i === n - 1,
      average: weekAverage(weights, start),
      count: weights.filter((entry) => isoWeekRange(start).includes(entry.date)).length,
    };
  });
}

export function plateauStatus(weights: WeightEntry[], profile: Profile) {
  const weeks = lastNWeekAverages(weights, 3);
  const avgs = weeks
    .map((week) => week.average)
    .filter((value): value is number => value !== null);

  if (avgs.length < 2) {
    return { kind: "warmup" as const, delta: 0 };
  }

  const newest = avgs.at(-1) ?? profile.startKg;
  const previous = avgs.at(-2) ?? newest;
  const delta = newest - previous;

  if (delta >= WEEKLY_GAIN_MIN) {
    return { kind: "up" as const, delta };
  }

  if (weeks.filter((week) => week.average !== null).length >= 3 && newest - avgs[0] < 0.2) {
    return { kind: "plateau" as const, delta };
  }

  return { kind: "flat" as const, delta };
}

export function kgToGo(current: number, target: number) {
  return Math.max(0, target - current);
}

export function progressPct(start: number, current: number, target: number) {
  if (target <= start) return 0;
  return Math.min(100, Math.max(0, ((current - start) / (target - start)) * 100));
}

export function currentBmi(kg: number, heightCm: number) {
  return bmi(kg, heightCm);
}

export function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
