"use client";

import { sortedWeights } from "@/lib/stats";
import type { WeightEntry } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { plain } from "@/lib/i18n";
import { copy } from "@/lib/i18n/copy";

export function WeightChart({
  weights,
  start,
  target,
  locale = "zh",
}: {
  weights: WeightEntry[];
  start: number;
  target: number;
  locale?: Locale;
}) {
  const points = sortedWeights(weights);
  const values = points.map((entry) => entry.kg);
  const min = Math.min(start - 0.5, ...values, start);
  const max = Math.max(target + 0.5, ...values, target);
  const w = 640;
  const h = 220;
  const pad = 28;

  const x = (i: number) => {
    if (points.length <= 1) return pad;
    return pad + (i / (points.length - 1)) * (w - pad * 2);
  };
  const y = (kg: number) => pad + ((max - kg) / (max - min || 1)) * (h - pad * 2);
  const d = points
    .map((entry, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(entry.kg)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-52 w-full" role="img" aria-label={plain(locale, copy.chartAria)}>
      <line x1={pad} x2={w - pad} y1={y(target)} y2={y(target)} stroke="#c9892a" strokeDasharray="6 6" />
      <text x={w - pad} y={y(target) - 8} textAnchor="end" fill="#3a433d" fontSize="11">
        {plain(locale, copy.goal)} {target} kg
      </text>
      <line x1={pad} x2={w - pad} y1={y(start)} y2={y(start)} stroke="#4a524c" strokeDasharray="4 8" />
      {points.length > 0 && (
        <path d={d} fill="none" stroke="#1c211e" strokeWidth="2.5" />
      )}
      {points.map((entry, i) => (
        <circle key={entry.id} cx={x(i)} cy={y(entry.kg)} r="4" fill="#c4452d" />
      ))}
    </svg>
  );
}
