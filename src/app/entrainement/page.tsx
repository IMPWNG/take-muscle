"use client";

import { SessionBoard } from "@/components/SessionBoard";
import { T } from "@/components/T";
import { useTracker } from "@/hooks/useTracker";
import { useLocale } from "@/hooks/useLocale";
import { formatDay } from "@/lib/stats";
import { WEEKLY_SPLIT } from "@/lib/workouts";
import { BCP47 } from "@/lib/i18n";
import { msg } from "@/lib/i18n/copy";
import { dayName, dayNote, templateName } from "@/lib/i18n/content";

export default function TrainingPage() {
  const { ready, state } = useTracker();
  const { locale } = useLocale();
  if (!ready) return <T text={msg(locale, "loading")} as="p" className="pt-6 text-ink-soft" />;

  return (
    <div className="space-y-6 pt-2 sm:space-y-8 sm:pt-4">
      <header>
        <T text={msg(locale, "tKicker")} as="p" className="stamp text-[11px] text-ink-soft normal-case" />
        <T text={msg(locale, "tTitle")} as="h1" className="page-title font-[family-name:var(--font-display)]" />
        <T text={msg(locale, "tLead")} as="p" className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft" />
      </header>

      <SessionBoard />

      <ol className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {WEEKLY_SPLIT.map((day) => (
          <li
            key={day.day}
            className="min-w-[9.5rem] shrink-0 rounded-2xl bg-chalk px-4 py-3 sm:min-w-0"
          >
            <T text={dayName(locale, day.day)} as="p" className="stamp text-[10px] text-ink-soft normal-case" />
            {day.templateId ? (
              <T text={templateName(locale, day.templateId)} as="p" className="text-sm" />
            ) : (
              <T text={dayNote(locale, day.note)} as="p" className="text-sm" />
            )}
          </li>
        ))}
      </ol>

      <section className="grid gap-2 sm:grid-cols-2 sm:gap-3">
        {(
          [
            ["ruleIntensityTitle", "ruleIntensityDetail"],
            ["ruleBackTitle", "ruleBackDetail"],
            ["ruleAbsTitle", "ruleAbsDetail"],
            ["ruleNeckTitle", "ruleNeckDetail"],
          ] as const
        ).map(([title, detail]) => (
          <article key={title} className="rounded-2xl bg-chalk px-4 py-3">
            <T text={msg(locale, title)} as="p" className="stamp text-[10px] text-ink-soft normal-case" />
            <T text={msg(locale, detail)} as="p" className="mt-1 text-sm leading-5" />
          </article>
        ))}
      </section>

      {state.sessions.length > 0 && (
        <section>
          <T text={msg(locale, "loggedSessions")} as="h2" className="font-[family-name:var(--font-display)] text-2xl" />
          <ul className="mt-3 divide-y divide-ink/10 overflow-hidden rounded-3xl bg-chalk">
            {state.sessions.slice(0, 8).map((session) => (
              <li key={session.id} className="px-4 py-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span>{formatDay(session.date, BCP47[locale])}</span>
                  <span className="min-w-0 truncate">{session.name}</span>
                  <T
                    text={msg(locale, session.completed ? "done" : "open")}
                    as="span"
                    className="stamp shrink-0 text-[10px] text-ink-soft normal-case"
                  />
                </div>
                {session.analysis && (
                  <p className="mt-2 text-xs leading-5 text-ink-soft">{session.analysis.summary}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
