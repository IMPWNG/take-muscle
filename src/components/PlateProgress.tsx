"use client";

import { progressPct } from "@/lib/stats";
import { T } from "@/components/T";
import { useLocale } from "@/hooks/useLocale";
import { msg, pathLabel } from "@/lib/i18n/copy";

export function PlateProgress({
  start,
  current,
  target,
}: {
  start: number;
  current: number;
  target: number;
}) {
  const { locale } = useLocale();
  const pct = progressPct(start, current, target);
  const filled = Math.round((pct / 100) * 7);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5">
      <div className="relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28">
        <div className="plate-ring absolute inset-0 rounded-full" />
        <div className="relative grid place-items-center text-center text-chalk">
          <span className="font-[family-name:var(--font-data)] text-2xl leading-none">
            {current.toFixed(1)}
          </span>
          <span className="mt-1 stamp text-[9px] text-chalk/70">kg</span>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <T text={msg(locale, "plates")} as="p" className="stamp text-[11px] text-ink-soft normal-case" />
        <div className="mt-2 flex items-end gap-1">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className={`h-10 w-4 rounded-sm ${
                i < filled ? "bg-rubber" : "bg-plate/25"
              }`}
              title={`${start + i + 1} kg`}
            />
          ))}
        </div>
        <T
          text={pathLabel(locale, Number(start.toFixed(0)), Number(target.toFixed(0)), pct.toFixed(0))}
          as="p"
          className="mt-2 text-sm text-ink-soft"
        />
      </div>
    </div>
  );
}
