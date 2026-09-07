"use client";

import { useState } from "react";
import { useTracker } from "@/hooks/useTracker";
import { useLocale } from "@/hooks/useLocale";
import { formatDay, localDateKey } from "@/lib/stats";
import { BCP47 } from "@/lib/i18n";
import { T } from "@/components/T";
import { msg } from "@/lib/i18n/copy";

export function WeightForm() {
  const { addWeight } = useTracker();
  const { locale } = useLocale();
  const [kg, setKg] = useState("");
  const [date, setDate] = useState(localDateKey());

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
      onSubmit={(event) => {
        event.preventDefault();
        const value = Number(kg.replace(",", "."));
        if (!Number.isFinite(value) || value < 50 || value > 150) return;
        addWeight(value, date);
        setKg("");
      }}
    >
      <label className="flex-1 text-sm">
        <T text={msg(locale, "wakeWeight")} />
        <input
          value={kg}
          onChange={(event) => setKg(event.target.value)}
          inputMode="decimal"
          placeholder="83.4"
          className="mt-1 h-12 w-full rounded-xl border border-ink/15 bg-chalk px-3 font-[family-name:var(--font-data)]"
        />
      </label>
      <label className="text-sm">
        <T text={msg(locale, "date")} />
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="mt-1 h-12 w-full rounded-xl border border-ink/15 bg-chalk px-3"
        />
      </label>
      <button
        type="submit"
        className="min-h-12 rounded-full bg-rubber px-5 py-2.5 text-sm text-chalk"
      >
        <T text={msg(locale, "save")} />
      </button>
      <p className="sr-only">{formatDay(date, BCP47[locale])}</p>
    </form>
  );
}
