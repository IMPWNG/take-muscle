"use client";

import Link from "next/link";
import { CanteenTray } from "@/components/CanteenTray";
import { PlateProgress } from "@/components/PlateProgress";
import { T } from "@/components/T";
import { todayIds, useTracker } from "@/hooks/useTracker";
import { useLocale } from "@/hooks/useLocale";
import { totalsFor } from "@/lib/program";
import {
  currentBmi,
  formatDay,
  lastNWeekAverages,
  latestWeight,
  localDateKey,
  plateauStatus,
} from "@/lib/stats";
import { TEMPLATES, WEEKLY_SPLIT } from "@/lib/workouts";
import { BCP47 } from "@/lib/i18n";
import { homeSub, msg } from "@/lib/i18n/copy";
import { dayName, dayNote, plateauCopy, templateFocus, templateName } from "@/lib/i18n/content";

export default function HomePage() {
  const { ready, state } = useTracker();
  const { locale } = useLocale();
  if (!ready) return <T text={msg(locale, "loadingLog")} as="p" className="pt-10 text-ink-soft" />;

  const current = latestWeight(state.weights, state.profile.startKg);
  const today = totalsFor(todayIds(state));
  const plateau = plateauStatus(state.weights, state.profile);
  const copy = plateauCopy(locale, plateau.kind, plateau.delta);
  const weeks = lastNWeekAverages(state.weights, 3);
  const weekday = WEEKLY_SPLIT[(new Date().getDay() + 6) % 7];
  const todayTemplate = weekday.templateId
    ? TEMPLATES.find((item) => item.id === weekday.templateId)
    : null;

  return (
    <div className="space-y-5 pt-1 sm:space-y-8 sm:pt-4">
      <header className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="stamp text-[11px] text-ink-soft">{formatDay(localDateKey(), BCP47[locale])}</p>
          <T
            text={msg(locale, "homeTitle")}
            as="h1"
            className="page-title mt-1 max-w-xl font-[family-name:var(--font-display)]"
          />
          <T
            text={homeSub(locale, currentBmi(current, state.profile.heightCm).toFixed(1))}
            as="p"
            className="mt-2 max-w-lg text-sm leading-5 text-ink-soft sm:mt-3 sm:leading-6"
          />
        </div>
        <PlateProgress start={state.profile.startKg} current={current} target={state.profile.targetKg} />
      </header>

      <section className="grid grid-cols-3 gap-2 sm:gap-3">
        {weeks.map((week) => (
          <article key={week.start} className="rounded-2xl bg-chalk/80 p-2.5 sm:p-4">
            {week.current ? (
              <T text={msg(locale, "thisWeek")} as="p" className="stamp text-[9px] text-ink-soft normal-case sm:text-[10px]" />
            ) : (
              <p className="stamp text-[9px] text-ink-soft sm:text-[10px]">{week.range}</p>
            )}
            <p className="mt-1 font-[family-name:var(--font-data)] text-lg leading-none sm:text-2xl">
              {week.average ? `${week.average.toFixed(2)} kg` : "—"}
            </p>
            <p className="mt-1 text-[10px] leading-4 text-ink-soft sm:text-xs">
              {week.count} <TInlineWeek locale={locale} />
            </p>
          </article>
        ))}
      </section>

      <section
        className={`rounded-3xl p-5 ${
          plateau.kind === "plateau" ? "bg-chili text-chalk" : "bg-rubber text-chalk"
        }`}
      >
        <T text={msg(locale, "weeklyAvg")} as="p" className="stamp text-[11px] opacity-70 normal-case" />
        <T text={copy.title} as="h2" className="font-[family-name:var(--font-display)] text-2xl" />
        <T text={copy.detail} as="p" className="mt-2 max-w-2xl text-sm leading-6 opacity-90" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl bg-chalk p-5">
          <T text={msg(locale, "todayGym")} as="p" className="stamp text-[11px] text-ink-soft normal-case" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl">
            <T text={dayName(locale, weekday.day)} as="span" />
            {todayTemplate ? (
              <>
                {" · "}
                <T text={templateName(locale, todayTemplate.id)} as="span" />
              </>
            ) : (
              <>
                {" · "}
                <T text={msg(locale, "rest")} as="span" />
              </>
            )}
          </h2>
          {todayTemplate ? (
            <p className="mt-2 text-sm text-ink-soft">
              <T text={templateFocus(locale, todayTemplate.id)} as="span" />
              {` · ${todayTemplate.durationMin} min`}
            </p>
          ) : (
            <T text={dayNote(locale, weekday.note)} as="p" className="mt-2 text-sm text-ink-soft" />
          )}
          <div className="mt-4">
            <Link href="/entrainement" className="inline-flex min-h-11 items-center rounded-full bg-rubber px-5 py-2.5 text-sm text-chalk">
              <T text={msg(locale, "openSession")} />
            </Link>
          </div>
        </article>
        <article className="rounded-3xl bg-chalk p-5">
          <T text={msg(locale, "todayPlate")} as="p" className="stamp text-[11px] text-ink-soft normal-case" />
          <p className="font-[family-name:var(--font-data)] text-3xl">
            {today.proteinG}
            <span className="ml-1 text-base text-ink-soft">
              <T text={msg(locale, "proteinUnit")} as="span" />
            </span>
          </p>
          <p className="text-sm text-ink-soft">
            {today.kcal} <T text={msg(locale, "kcalChecked")} as="span" />
          </p>
          <T text={msg(locale, "proteinHint")} as="p" className="mt-3 text-xs leading-5 text-ink-soft" />
        </article>
      </section>

      <CanteenTray compact />

      <section>
        <T text={msg(locale, "denseTitle")} as="h2" className="font-[family-name:var(--font-display)] text-2xl" />
        <T text={msg(locale, "denseLead")} as="p" className="mt-1 text-sm text-ink-soft" />
        <div className="mt-4 overflow-hidden rounded-3xl bg-chalk">
          <table className="w-full text-sm">
            <tbody>
              {(
                [
                  ["rice", "riceUse"],
                  ["oats", "oatsUse"],
                  ["nutsFood", "nutsUse"],
                ] as const
              ).map(([food, use]) => (
                <tr key={food} className="border-t border-ink/8 first:border-0">
                  <T text={msg(locale, food)} as="th" className="px-3 py-2.5 text-left font-medium sm:px-4 sm:py-3" />
                  <T text={msg(locale, use)} as="td" className="px-3 py-2.5 text-ink-soft sm:px-4 sm:py-3" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function TInlineWeek({ locale }: { locale: "fr" | "en" | "zh" }) {
  return <T text={msg(locale, "weighIns")} as="span" />;
}
