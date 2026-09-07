"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import type {
  Effort,
  SessionAnalysis,
  SessionExercise,
  SessionExerciseLog,
  SessionLog,
} from "@/lib/types";

const EFFORTS: Effort[] = ["easy", "normal", "hard"];

function toLog(
  name: string,
  focus: string,
  exercises: SessionExercise[],
  previous?: SessionLog | null,
): SessionLog {
  const lastByName = new Map(
    (previous?.exercises ?? []).map((exercise) => [exercise.name, exercise]),
  );
  return {
    id: uid(),
    date: localDateKey(),
    name,
    focus,
    completed: false,
    analysis: null,
    exercises: exercises.map((exercise) => {
      const last = lastByName.get(exercise.name);
      return {
        name: exercise.name,
        difficulty: null,
        sets: emptySets(exercise.sets).map((set, index) => ({
          ...set,
          kg: last?.sets[index]?.kg ?? last?.sets.at(-1)?.kg ?? "",
          reps: last?.sets[index]?.reps ?? "",
        })),
      };
    }),
  };
}

function sessionTitle(locale: "fr" | "en" | "zh", name: string): Text {
  const match = Object.entries(TEMPLATES_I18N).find(
    ([, value]) => value.name.fr === name || value.name.en === name || value.name.zh === name,
  );
  if (match) return t(locale, match[1].name);
  return name;
}

function normalizeLog(session: SessionLog): SessionLog {
  return {
    ...session,
    analysis: session.analysis ?? null,
    exercises: session.exercises.map((exercise) => ({
      ...exercise,
      difficulty: exercise.difficulty ?? null,
    })),
  };
}

export function SessionBoard() {
  const { saveSession, state } = useTracker();
  const { locale } = useLocale();
  const [rest, setRest] = useState(0);
  const [log, setLog] = useState<SessionLog | null>(null);
  const [notes, setNotes] = useState<SessionExercise[]>([]);
  const [reviewing, setReviewing] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const skipPersist = useRef(true);

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

  useEffect(() => {
    if (!log) return;
    if (skipPersist.current) {
      skipPersist.current = false;
      return;
    }
    const timer = window.setTimeout(() => saveSession(log), 400);
    return () => window.clearTimeout(timer);
  }, [log, saveSession]);

  function applyLog(next: SessionLog, templateExercises?: SessionExercise[]) {
    skipPersist.current = true;
    if (templateExercises) setNotes(templateExercises);
    setLog(next);
    saveSession(next);
  }

  function startTemplate(id: string) {
    const template = templateById(id);
    if (!template) return;
    const today = localDateKey();
    const open = state.sessions.find(
      (session) => session.focus === id && session.date === today && !session.completed,
    );
    if (open) {
      applyLog(normalizeLog(open), template.exercises);
      return;
    }
    const previous = state.sessions.find(
      (session) => session.focus === id && session.completed,
    );
    applyLog(toLog(template.name, template.id, template.exercises, previous), template.exercises);
  }

  function patchExercise(exIndex: number, next: SessionExerciseLog) {
    if (!log) return;
    setLog({
      ...log,
      exercises: log.exercises.map((exercise, i) => (i === exIndex ? next : exercise)),
    });
  }

  function toggleSet(exIndex: number, setIndex: number, restSeconds: number) {
    if (!log) return;
    const exercise = log.exercises[exIndex];
    const turningOn = !exercise.sets[setIndex].done;
    patchExercise(exIndex, {
      ...exercise,
      sets: exercise.sets.map((set, j) =>
        j !== setIndex ? set : { ...set, done: !set.done },
      ),
    });
    if (turningOn) setRest(restSeconds);
  }

  function updateSet(exIndex: number, setIndex: number, field: "kg" | "reps", value: string) {
    if (!log) return;
    const exercise = log.exercises[exIndex];
    patchExercise(exIndex, {
      ...exercise,
      sets: exercise.sets.map((set, j) =>
        j !== setIndex ? set : { ...set, [field]: value },
      ),
    });
  }

  function setDifficulty(exIndex: number, difficulty: Effort) {
    if (!log) return;
    const exercise = log.exercises[exIndex];
    patchExercise(exIndex, {
      ...exercise,
      difficulty: exercise.difficulty === difficulty ? null : difficulty,
    });
  }

  async function finishSession() {
    if (!log) return;
    const completed: SessionLog = {
      ...log,
      completed: true,
      exercises: log.exercises.map((exercise) => ({
        ...exercise,
        difficulty: exercise.difficulty ?? "normal",
      })),
    };
    applyLog(completed);
    setReviewing(true);
    setReviewError(null);
    try {
      const previous = state.sessions.find(
        (session) =>
          session.id !== completed.id &&
          session.focus === completed.focus &&
          session.completed,
      );
      const response = await fetch("/api/session-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, session: completed, previous: previous ?? null }),
      });
      const payload = (await response.json()) as SessionAnalysis & { error?: string };
      if (!response.ok || !payload.summary || !payload.adjustments) {
        throw new Error(payload.error || "Analyse impossible.");
      }
      const withAnalysis = {
        ...completed,
        analysis: {
          summary: payload.summary,
          adjustments: payload.adjustments,
        },
      };
      applyLog(withAnalysis);
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : "Analyse impossible.");
    } finally {
      setReviewing(false);
    }
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
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {templates.map(([id, key]) => (
          <button
            key={id}
            type="button"
            onClick={() => startTemplate(id)}
            className={`min-h-11 shrink-0 rounded-full px-4 text-sm shadow-[inset_0_0_0_1px_rgba(28,33,30,0.1)] ${
              log?.focus === id ? "bg-rubber text-chalk" : "bg-chalk"
            }`}
          >
            <T text={msg(locale, key)} />
          </button>
        ))}
      </div>

      {rest > 0 && (
        <p className="gym-clock sticky top-2 z-10 rounded-[22px] px-4 py-3 font-[family-name:var(--font-data)] text-xl sm:text-2xl">
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
        <section className="rounded-[24px] bg-chalk p-4 shadow-[inset_0_0_0_1px_rgba(28,33,30,0.08)] sm:p-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div className="min-w-0">
              <T
                text={templateFocus(locale, log.focus)}
                as="p"
                className="stamp text-[11px] text-ink-soft normal-case"
              />
              <T
                text={sessionTitle(locale, log.name)}
                as="h2"
                className="font-[family-name:var(--font-display)] text-2xl leading-none sm:text-3xl"
              />
            </div>
            <p className="font-[family-name:var(--font-data)] text-sm">
              {doneSets}/{totalSets} <T text={msg(locale, "sets")} as="span" />
            </p>
          </div>
          <ol className="space-y-5">
            {log.exercises.map((exercise, exIndex) => {
              const meta = notes[exIndex];
              return (
                <li
                  key={`${exercise.name}-${exIndex}`}
                  className="rounded-2xl bg-tile/50 p-3 sm:p-4"
                >
                  <div className="mb-3">
                    <T text={exerciseName(locale, exercise.name)} as="p" className="font-medium leading-tight" />
                    {meta && (
                      <p className="mt-1 text-xs leading-5 text-ink-soft">
                        {meta.sets} × {meta.reps} · {meta.restSeconds}s ·{" "}
                        <T text={exerciseNotes(locale, exercise.name, meta.notes)} as="span" />
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    {exercise.sets.map((set, setIndex) => (
                      <div
                        key={setIndex}
                        className="grid grid-cols-[2.75rem_1fr_1fr] items-center gap-2 sm:grid-cols-[2.75rem_1fr_1fr_auto]"
                      >
                        <button
                          type="button"
                          onClick={() => toggleSet(exIndex, setIndex, meta?.restSeconds ?? 90)}
                          className={`h-11 w-11 rounded-full text-sm font-medium ${
                            set.done ? "bg-chili text-chalk" : "bg-white text-ink"
                          }`}
                        >
                          {setIndex + 1}
                        </button>
                        <label className="min-w-0">
                          <span className="sr-only">kg</span>
                          <input
                            value={set.kg}
                            onChange={(event) => updateSet(exIndex, setIndex, "kg", event.target.value)}
                            placeholder="kg"
                            inputMode="decimal"
                            className="h-11 w-full rounded-xl border border-ink/10 bg-white px-3 font-[family-name:var(--font-data)] text-base"
                          />
                        </label>
                        <label className="min-w-0">
                          <span className="sr-only">reps</span>
                          <input
                            value={set.reps}
                            onChange={(event) => updateSet(exIndex, setIndex, "reps", event.target.value)}
                            placeholder="reps"
                            inputMode="numeric"
                            className="h-11 w-full rounded-xl border border-ink/10 bg-white px-3 font-[family-name:var(--font-data)] text-base"
                          />
                        </label>
                        <T
                          text={msg(locale, "set")}
                          as="span"
                          className="hidden text-[11px] text-ink-soft sm:inline"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {EFFORTS.map((effort) => {
                      const on = exercise.difficulty === effort;
                      return (
                        <button
                          key={effort}
                          type="button"
                          onClick={() => setDifficulty(exIndex, effort)}
                          className={`stamp min-h-11 rounded-xl px-1 text-[10px] normal-case tracking-[0.08em] sm:text-[11px] ${
                            on
                              ? effort === "hard"
                                ? "bg-chili text-chalk"
                                : effort === "easy"
                                  ? "bg-sesame text-ink"
                                  : "bg-rubber text-chalk"
                              : "bg-white text-ink-soft shadow-[inset_0_0_0_1px_rgba(28,33,30,0.1)]"
                          }`}
                        >
                          <T text={msg(locale, effort)} />
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ol>

          {(reviewing || log.analysis || reviewError) && (
            <div className="mt-5 rounded-2xl bg-rubber p-4 text-chalk">
              <T
                text={msg(locale, "debriefTitle")}
                as="p"
                className="stamp text-[11px] text-chalk/60 normal-case"
              />
              {reviewing && (
                <T text={msg(locale, "analyzing")} as="p" className="mt-2 text-sm" />
              )}
              {reviewError && (
                <div className="mt-2">
                  <p className="text-sm text-sesame">{reviewError}</p>
                  <button
                    type="button"
                    onClick={() => {
                      void finishSession();
                    }}
                    className="mt-2 min-h-11 rounded-full bg-chalk px-4 text-sm text-ink"
                  >
                    <T text={msg(locale, "retryAnalysis")} />
                  </button>
                </div>
              )}
              {log.analysis && (
                <>
                  <p className="mt-2 text-sm leading-6">{log.analysis.summary}</p>
                  <ul className="mt-3 space-y-2">
                    {log.analysis.adjustments.map((item) => (
                      <li key={`${item.exercise}-${item.change}`} className="rounded-xl bg-white/8 px-3 py-2">
                        <p className="text-sm font-medium">{item.exercise}</p>
                        <p className="font-[family-name:var(--font-data)] text-sm text-sesame">
                          {item.amount}
                        </p>
                        <p className="text-xs leading-5 text-chalk/70">{item.reason}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {!log.completed && (
            <button
              type="button"
              disabled={reviewing || totalSets === 0}
              onClick={() => {
                void finishSession();
              }}
              className="mt-5 min-h-12 w-full rounded-full bg-rubber px-5 py-3 text-sm text-chalk disabled:opacity-60 sm:w-auto"
            >
              <T text={msg(locale, "markDone")} />
            </button>
          )}
        </section>
      )}
    </div>
  );
}
