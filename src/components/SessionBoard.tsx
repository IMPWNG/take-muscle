"use client";

import { useEffect, useMemo, useState } from "react";
import { emptySets, templateById } from "@/lib/workouts";
import { localDateKey, uid } from "@/lib/stats";
import { useTracker } from "@/hooks/useTracker";
import { useLocale } from "@/hooks/useLocale";
import { T } from "@/components/T";
import { msg } from "@/lib/i18n/copy";
import {
  exerciseName,
  exerciseNotes,
  templateFocus,
} from "@/lib/i18n/content";
import { TEMPLATES_I18N } from "@/lib/i18n/content";
import { t, type Text } from "@/lib/i18n";
import type { GeneratedWorkout, SessionExercise, SessionLog } from "@/lib/types";

function toLog(name: string, focus: string, exercises: SessionExercise[]): SessionLog {
  return {
    id: uid(),
    date: localDateKey(),
    name,
    focus,
    completed: false,
    exercises: exercises.map((exercise) => ({
      name: exercise.name,
      sets: emptySets(exercise.sets),
    })),
  };
}

function sessionTitle(locale: "fr" | "en" | "zh", name: string): Text {
  const match = Object.entries(TEMPLATES_I18N).find(
    ([, value]) => value.name.fr === name || value.name.en === name || value.name.zh === name,
  );
  if (match) return t(locale, match[1].name);
  return name;
}

export function SessionBoard({
  initial,
}: {
  initial?: GeneratedWorkout | null;
}) {
  const { saveSession, state } = useTracker();
  const { locale } = useLocale();
  const [rest, setRest] = useState(0);
  const [log, setLog] = useState<SessionLog | null>(null);
  const [notes, setNotes] = useState<SessionExercise[]>([]);

  useEffect(() => {
    if (!initial) return;
    setNotes(initial.exercises);
    setLog(toLog(initial.sessionName, initial.sessionType, initial.exercises));
  }, [initial]);

  const doneSets = useMemo(
    () => log?.exercises.reduce((n, ex) => n + ex.sets.filter((set) => set.done).length, 0) ?? 0,
    [log],
  );
  const totalSets = useMemo(
    () => log?.exercises.reduce((n, ex) => n + ex.sets.length, 0) ?? 0,
    [log],
  );

  useEffect(() => {
    if (rest <= 0) return;
    const timer = window.setInterval(() => setRest((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [rest]);

  function startTemplate(id: string) {
    const template = templateById(id);
    if (!template) return;
    setNotes(template.exercises);
    setLog(toLog(template.name, template.id, template.exercises));
  }

  function toggleSet(exIndex: number, setIndex: number, restSeconds: number) {
    if (!log) return;
    const next: SessionLog = {
      ...log,
      exercises: log.exercises.map((exercise, i) =>
        i !== exIndex
          ? exercise
          : {
              ...exercise,
              sets: exercise.sets.map((set, j) =>
                j !== setIndex ? set : { ...set, done: !set.done },
              ),
            },
      ),
    };
    setLog(next);
    const turningOn = !log.exercises[exIndex].sets[setIndex].done;
    if (turningOn) setRest(restSeconds);
  }

  function updateSet(exIndex: number, setIndex: number, field: "kg" | "reps", value: string) {
    if (!log) return;
    setLog({
      ...log,
      exercises: log.exercises.map((exercise, i) =>
        i !== exIndex
          ? exercise
          : {
              ...exercise,
              sets: exercise.sets.map((set, j) =>
                j !== setIndex ? set : { ...set, [field]: value },
              ),
            },
      ),
    });
  }

  const todayCount = state.sessions.filter((session) => session.date === localDateKey()).length;
  const templates = [
    ["upper-a", "upperA"],
    ["lower-a", "lowerA"],
    ["upper-b", "upperB"],
    ["lower-b", "lowerB"],
  ] as const;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {templates.map(([id, key]) => (
          <button
            key={id}
            type="button"
            onClick={() => startTemplate(id)}
            className="rounded-full bg-chalk px-3 py-1.5 text-sm shadow-[inset_0_0_0_1px_rgba(28,33,30,0.1)]"
          >
            <T text={msg(locale, key)} />
          </button>
        ))}
      </div>

      {rest > 0 && (
        <p className="rounded-2xl bg-sesame/20 px-4 py-3 font-[family-name:var(--font-data)] text-lg">
          <T text={msg(locale, "restTimer")} as="span" />{" "}
          {Math.floor(rest / 60)}:{String(rest % 60).padStart(2, "0")}
        </p>
      )}

      {!log && (
        <p className="text-sm text-ink-soft">
          <T text={msg(locale, "startHint")} as="span" />{" "}
          {todayCount} <T text={msg(locale, "sessionsToday")} as="span" />
        </p>
      )}

      {log && (
        <section className="rounded-[24px] bg-chalk p-4 shadow-[inset_0_0_0_1px_rgba(28,33,30,0.08)]">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <T
                text={templateFocus(locale, log.focus)}
                as="p"
                className="stamp text-[11px] text-ink-soft normal-case"
              />
              <T
                text={sessionTitle(locale, log.name)}
                as="h2"
                className="font-[family-name:var(--font-display)] text-2xl"
              />
            </div>
            <p className="font-[family-name:var(--font-data)] text-sm">
              {doneSets}/{totalSets} <T text={msg(locale, "sets")} as="span" />
            </p>
          </div>
          <ol className="space-y-4">
            {log.exercises.map((exercise, exIndex) => {
              const meta = notes[exIndex];
              return (
                <li key={`${exercise.name}-${exIndex}`}>
                  <div className="mb-2">
                    <T text={exerciseName(locale, exercise.name)} as="p" className="font-medium" />
                    {meta && (
                      <p className="text-xs text-ink-soft">
                        {meta.sets} × {meta.reps} · {meta.restSeconds}s ·{" "}
                        <T text={exerciseNotes(locale, exercise.name, meta.notes)} as="span" />
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    {exercise.sets.map((set, setIndex) => (
                      <div key={setIndex} className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleSet(exIndex, setIndex, meta?.restSeconds ?? 90)}
                          className={`h-8 w-8 rounded-full text-xs ${
                            set.done ? "bg-chili text-chalk" : "bg-tile"
                          }`}
                        >
                          {setIndex + 1}
                        </button>
                        <input
                          value={set.kg}
                          onChange={(event) => updateSet(exIndex, setIndex, "kg", event.target.value)}
                          placeholder="kg"
                          inputMode="decimal"
                          className="rounded-lg border border-ink/10 bg-white px-2 py-1.5 font-[family-name:var(--font-data)] text-sm"
                        />
                        <input
                          value={set.reps}
                          onChange={(event) => updateSet(exIndex, setIndex, "reps", event.target.value)}
                          placeholder="reps"
                          inputMode="numeric"
                          className="rounded-lg border border-ink/10 bg-white px-2 py-1.5 font-[family-name:var(--font-data)] text-sm"
                        />
                        <T text={msg(locale, "set")} as="span" className="text-[11px] text-ink-soft" />
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            onClick={() => {
              saveSession({ ...log, completed: true });
            }}
            className="mt-5 rounded-full bg-rubber px-5 py-2.5 text-sm text-chalk"
          >
            <T text={msg(locale, "markDone")} />
          </button>
        </section>
      )}
    </div>
  );
}
