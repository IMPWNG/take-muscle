"use client";

import { T } from "@/components/T";
import { useLocale } from "@/hooks/useLocale";
import { useRestTimer } from "@/hooks/useRestTimer";
import { msg } from "@/lib/i18n/copy";

export function RestClock() {
  const { remaining, clearRest } = useRestTimer();
  const { locale } = useLocale();
  if (remaining <= 0) return null;

  const minutes = Math.floor(remaining / 60);
  const seconds = String(remaining % 60).padStart(2, "0");

  return (
    <div className="pointer-events-none fixed inset-x-2 z-40 bottom-[calc(4.6rem+env(safe-area-inset-bottom))] lg:inset-x-auto lg:right-8 lg:bottom-8 lg:w-80">
      <div className="pointer-events-auto gym-clock flex items-center justify-between gap-3 rounded-[22px] px-4 py-3">
        <p className="font-[family-name:var(--font-data)] text-xl leading-none sm:text-2xl">
          <T text={msg(locale, "restTimer")} as="span" /> {minutes}:{seconds}
        </p>
        <button
          type="button"
          onClick={clearRest}
          className="min-h-11 shrink-0 rounded-full bg-chalk/15 px-3 text-xs text-chalk"
        >
          <T text={msg(locale, "skipRest")} />
        </button>
      </div>
    </div>
  );
}
