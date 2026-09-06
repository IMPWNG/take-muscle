"use client";

import { MEALS, totalsFor } from "@/lib/program";
import { todayIds, useTracker } from "@/hooks/useTracker";
import { useLocale } from "@/hooks/useLocale";
import { localDateKey } from "@/lib/stats";
import { T } from "@/components/T";
import { msg } from "@/lib/i18n/copy";
import { FOOD_ZH, foodLabel, mealHint, mealTitle } from "@/lib/i18n/content";
import type { MealSlotId } from "@/lib/types";

export function CanteenTray({ date = localDateKey(), compact = false }) {
  const { state, toggleFood } = useTracker();
  const { locale } = useLocale();
  const checked = state.checkedByDate[date] ?? [];
  const totals = totalsFor(todayIds(state, date));

  return (
    <section className="tray rounded-[28px] p-4 sm:p-5">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <T text={msg(locale, "trayTitle")} as="p" className="stamp text-[11px] text-ink-soft normal-case" />
          <T text={msg(locale, "canteen")} as="h2" className="font-[family-name:var(--font-display)] text-2xl" />
        </div>
        <p className="font-[family-name:var(--font-data)] text-sm text-ink-soft">
          {totals.proteinG} g P · {totals.kcal} kcal
        </p>
      </div>
      <div className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 xl:grid-cols-3"}`}>
        {MEALS.map((meal) => {
          const mealChecked = meal.items.filter((item) => checked.includes(item.id)).length;
          return (
            <article
              key={meal.id}
              className="rounded-2xl bg-chalk/80 p-3 shadow-[inset_0_0_0_1px_rgba(28,33,30,0.08)]"
            >
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <T
                  text={mealTitle(locale, meal.id as MealSlotId)}
                  as="h3"
                  className="font-[family-name:var(--font-display)] text-lg leading-tight"
                />
                <span className="stamp text-[10px] text-ink-soft">
                  {mealChecked}/{meal.items.length}
                </span>
              </div>
              {!compact && (
                <T
                  text={mealHint(locale, meal.id as MealSlotId)}
                  as="p"
                  className="mb-3 text-xs leading-5 text-ink-soft"
                />
              )}
              <ul className="space-y-1.5">
                {meal.items.map((item) => {
                  const on = checked.includes(item.id);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => toggleFood(date, item.id)}
                        className={`flex w-full items-start gap-2 rounded-xl px-2 py-1.5 text-left text-sm transition scroll-mb-24 ${
                          on ? "bg-sesame/20" : "hover:bg-white/70"
                        }`}
                      >
                        <span
                          className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-sm border ${
                            on
                              ? "border-chili bg-chili text-[10px] text-chalk"
                              : "border-ink/25"
                          }`}
                        >
                          {on ? "✓" : ""}
                        </span>
                        <span className="min-w-0 flex-1">
                          <T text={foodLabel(locale, item.id)} as="span" className="block leading-5" />
                          <span className="block text-[11px] text-ink-soft">
                            {locale !== "zh" ? `${FOOD_ZH[item.id] ?? ""} · ` : ""}
                            {item.proteinG} g P · {item.kcal} kcal
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
