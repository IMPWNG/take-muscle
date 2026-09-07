"use client";

import { LOCALES } from "@/lib/i18n";
import { useLocale } from "@/hooks/useLocale";

export function LocaleSwitch({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  return (
    <div className={`flex gap-1 ${compact ? "" : "mt-6"}`}>
      {LOCALES.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setLocale(item.id)}
          className={`min-h-9 min-w-9 rounded-full px-2.5 text-xs ${
            locale === item.id ? "bg-rubber text-chalk" : "bg-chalk/80 text-ink-soft"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
