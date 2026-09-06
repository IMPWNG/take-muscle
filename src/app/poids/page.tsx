"use client";

import { WeightChart } from "@/components/WeightChart";
import { WeightForm } from "@/components/WeightForm";
import { T } from "@/components/T";
import { useTracker } from "@/hooks/useTracker";
import { useLocale } from "@/hooks/useLocale";
import {
  currentBmi,
  formatDay,
  lastNWeekAverages,
  latestWeight,
  plateauStatus,
  sortedWeights,
} from "@/lib/stats";
import { WEEKLY_GAIN_MAX, WEEKLY_GAIN_MIN } from "@/lib/program";
import { BCP47 } from "@/lib/i18n";
import { msg } from "@/lib/i18n/copy";
import { plateauCopy } from "@/lib/i18n/content";

export default function WeightPage() {
  const { ready, state, removeWeight } = useTracker();
  const { locale } = useLocale();
  if (!ready) return <T text={msg(locale, "loading")} as="p" className="pt-10 text-ink-soft" />;

  const current = latestWeight(state.weights, state.profile.startKg);
  const plateau = plateauStatus(state.weights, state.profile);
  const copy = plateauCopy(locale, plateau.kind, plateau.delta);
  const weeks = lastNWeekAverages(state.weights, 6);
  const entries = [...sortedWeights(state.weights)].reverse();
  const bmi = currentBmi(current, state.profile.heightCm).toFixed(1);

  return (
    <div className="space-y-8 pt-6">
      <header>
        <T text={msg(locale, "wKicker")} as="p" className="stamp text-[11px] text-ink-soft normal-case" />
        <T text={msg(locale, "wTitle")} as="h1" className="font-[family-name:var(--font-display)] text-4xl" />
        <T text={msg(locale, "wLead")} as="p" className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft" />
        <p className="mt-2 text-xs text-ink-soft">
          BMI {bmi} · +{WEEKLY_GAIN_MIN}–{WEEKLY_GAIN_MAX} kg
        </p>
      </header>

      <section className="rounded-3xl bg-chalk p-5">
        <WeightForm />
        <div className="mt-6">
          <WeightChart
            weights={state.weights}
            start={state.profile.startKg}
            target={state.profile.targetKg}
            locale={locale}
          />
        </div>
      </section>

      <section className={`rounded-3xl p-5 ${plateau.kind === "plateau" ? "bg-chili text-chalk" : "bg-rubber text-chalk"}`}>
        <T text={copy.title} as="h2" className="font-[family-name:var(--font-display)] text-2xl" />
        <T text={copy.detail} as="p" className="mt-2 text-sm leading-6 opacity-90" />
      </section>

      <section>
        <T text={msg(locale, "weeklyAvgs")} as="h2" className="font-[family-name:var(--font-display)] text-2xl" />
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {weeks.map((week) => (
            <article key={week.start} className="rounded-2xl bg-chalk p-4">
              {week.current ? (
                <T text={msg(locale, "thisWeek")} as="p" className="stamp text-[10px] text-ink-soft normal-case" />
              ) : (
                <p className="stamp text-[10px] text-ink-soft">{week.range}</p>
              )}
              <p className="font-[family-name:var(--font-data)] text-xl">
                {week.average ? `${week.average.toFixed(2)} kg` : (
                  <T text={msg(locale, "notEnough")} as="span" />
                )}
              </p>
              <p className="text-xs text-ink-soft">
                {week.count} / 3 <T text={msg(locale, "usefulWeighs")} as="span" />
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <T text={msg(locale, "history")} as="h2" className="font-[family-name:var(--font-display)] text-2xl" />
        <ul className="mt-3 divide-y divide-ink/10 overflow-hidden rounded-3xl bg-chalk">
          {entries.length === 0 && (
            <T text={msg(locale, "noEntries")} as="li" className="px-4 py-5 text-sm text-ink-soft" />
          )}
          {entries.map((entry) => (
            <li key={entry.id} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm">{formatDay(entry.date, BCP47[locale])}</span>
              <span className="font-[family-name:var(--font-data)]">{entry.kg.toFixed(1)} kg</span>
              <button
                type="button"
                onClick={() => removeWeight(entry.id)}
                className="text-xs text-chili"
              >
                <T text={msg(locale, "remove")} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
