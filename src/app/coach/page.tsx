"use client";

import { useState } from "react";
import { CoachChat } from "@/components/CoachChat";
import { SessionBoard } from "@/components/SessionBoard";
import { T } from "@/components/T";
import { useLocale } from "@/hooks/useLocale";
import { msg } from "@/lib/i18n/copy";
import type { GeneratedWorkout } from "@/lib/types";

export default function CoachPage() {
  const { locale } = useLocale();
  const [workout, setWorkout] = useState<GeneratedWorkout | null>(null);

  return (
    <div className="space-y-8 pt-6">
      <header>
        <T text={msg(locale, "cKicker")} as="p" className="stamp text-[11px] text-ink-soft normal-case" />
        <T text={msg(locale, "cTitle")} as="h1" className="font-[family-name:var(--font-display)] text-4xl" />
        <T text={msg(locale, "cLead")} as="p" className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft" />
      </header>
      <CoachChat onWorkout={setWorkout} />
      {workout && (
        <section>
          <T text={msg(locale, "generated")} as="h2" className="font-[family-name:var(--font-display)] text-2xl" />
          <p className="mt-1 text-sm text-ink-soft">{workout.warmup}</p>
          <div className="mt-4">
            <SessionBoard initial={workout} />
          </div>
        </section>
      )}
    </div>
  );
}
