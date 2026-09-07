"use client";

import { CanteenTray } from "@/components/CanteenTray";
import { T } from "@/components/T";
import { todayIds, useTracker } from "@/hooks/useTracker";
import { useLocale } from "@/hooks/useLocale";
import { BOOSTERS, PROTEIN_MAX, PROTEIN_MIN, totalsFor } from "@/lib/program";
import { localDateKey } from "@/lib/stats";
import { msg, proteinTarget, surplusNote } from "@/lib/i18n/copy";
import { FOOD_ZH, foodLabel } from "@/lib/i18n/content";

export default function NutritionPage() {
  const { ready, state, toggleExtra } = useTracker();
  const { locale } = useLocale();
  if (!ready) return <T text={msg(locale, "loading")} as="p" className="pt-10 text-ink-soft" />;

  const date = localDateKey();
  const totals = totalsFor(todayIds(state, date));
  const extras = state.extraByDate[date] ?? [];
  const proteinOk = totals.proteinG >= PROTEIN_MIN;

  return (
    <div className="space-y-6 pt-2 sm:space-y-8 sm:pt-4">
      <header>
        <T text={msg(locale, "nutKicker")} as="p" className="stamp text-[11px] text-ink-soft normal-case" />
        <T text={msg(locale, "nutTitle")} as="h1" className="page-title font-[family-name:var(--font-display)]" />
        <T text={msg(locale, "nutLead")} as="p" className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft" />
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <article className="rounded-2xl bg-rubber p-4 text-chalk">
          <T text={msg(locale, "protein")} as="p" className="stamp text-[10px] text-chalk/60 normal-case" />
          <p className="font-[family-name:var(--font-data)] text-3xl">{totals.proteinG} g</p>
          <T
            text={proteinTarget(locale, PROTEIN_MIN, PROTEIN_MAX, proteinOk)}
            as="p"
            className="text-xs text-chalk/70"
          />
        </article>
        <article className="rounded-2xl bg-chalk p-4">
          <T text={msg(locale, "kcalLogged")} as="p" className="stamp text-[10px] text-ink-soft normal-case" />
          <p className="font-[family-name:var(--font-data)] text-3xl">{totals.kcal}</p>
          <T
            text={surplusNote(locale, state.profile.extraKcal)}
            as="p"
            className="text-xs text-ink-soft"
          />
        </article>
        <article className="rounded-2xl bg-chalk p-4">
          <T text={msg(locale, "nuts")} as="p" className="stamp text-[10px] text-ink-soft normal-case" />
          <T text={msg(locale, "nutOptions")} as="p" className="text-sm leading-6" />
        </article>
      </section>

      <CanteenTray />

      <section className="rounded-3xl bg-chalk p-5">
        <T text={msg(locale, "boostersTitle")} as="h2" className="font-[family-name:var(--font-display)] text-2xl" />
        <T text={msg(locale, "boostersLead")} as="p" className="mt-1 text-sm text-ink-soft" />
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {BOOSTERS.map((item) => {
            const on = extras.includes(item.id);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggleExtra(date, item.id)}
                  className={`flex w-full min-h-12 items-center justify-between rounded-2xl px-3 py-3 text-left ${
                    on ? "bg-sesame/25" : "bg-tile/60"
                  }`}
                >
                  <span>
                    <T text={foodLabel(locale, item.id)} as="span" className="block text-sm font-medium" />
                    <span className="text-xs text-ink-soft">
                      {locale !== "zh" ? `${FOOD_ZH[item.id] ?? ""} · ` : ""}
                      {item.kcal} kcal · {item.proteinG} g P
                    </span>
                  </span>
                  <T
                    text={msg(locale, on ? "added" : "add")}
                    as="span"
                    className="stamp text-[10px] normal-case"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
