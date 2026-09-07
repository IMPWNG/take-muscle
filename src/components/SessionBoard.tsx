"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { emptySets, templateById } from "@/lib/workouts";
import { formatDay, localDateKey, uid } from "@/lib/stats";
import { useTracker } from "@/hooks/useTracker";
import { useRestTimer } from "@/hooks/useRestTimer";
import { useLocale } from "@/hooks/useLocale";
import { T } from "@/components/T";
import { msg } from "@/lib/i18n/copy";
import {
  exerciseName,
  exerciseNotes,
  templateFocus,
} from "@/lib/i18n/content";
import { TEMPLATES_I18N } from "@/lib/i18n/content";
import { BCP47, t, type Text } from "@/lib/i18n";
import { analyzeSession } from "@/lib/analyze";
import type {
  SessionExercise,
  SessionExerciseLog,
  SessionLog,
} from "@/lib/types";

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

function notesFor(session: SessionLog): SessionExercise[] {
  return templateById(session.focus)?.exercises ?? [];
}

function stripDifficulty(session: SessionLog): SessionLog {
  return {
    ...session,
    analysis: session.analysis ?? null,
    exercises: session.exercises.map((exercise) => ({
      name: exercise.name,
      sets: exercise.sets.map((set) => ({
        done: set.done,
        kg: set.kg,
        reps: set.reps,
      })),
    })),
  };
}

export function SessionBoard() {
  const { saveSession, deleteSession, state } = useTracker();
  const { startRest } = useRestTimer();
  const { locale } = useLocale();
  const [log, setLog] = useState<SessionLog | null>(null);
  const [notes, setNotes] = useState<SessionExercise[]>([]);
  const [reviewing, setReviewing] = useState(false);
  const [reviewError, setReviewError] = useState<Text | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const skipPersist = useRef(true);
  const boardRef = useRef<HTMLElement>(null);

  const doneSets = useMemo(
    () => log?.exercises.reduce((n, ex) => n + ex.sets.filter((set) => set.done).length, 0) ?? 0,
    [log],
  );
  const totalSets = useMemo(
    () => log?.exercises.reduce((n, ex) => n + ex.sets.length, 0) ?? 0,
    [log],
  );

  useEffect(() => {
    if (!log) return;
    if (skipPersist.current) {
      skipPersist.current = false;
      return;
    }
    const timer = window.setTimeout(() => saveSession(log), 400);
    return () => window.clearTimeout(timer);
  }, [log, saveSession]);

  function applyLog(
    next: SessionLog,
    templateExercises?: SessionExercise[],
    scroll = false,
  ) {
    skipPersist.current = true;
    setNotes(templateExercises ?? notesFor(next));
    setLog(next);
    saveSession(next);
    if (!scroll) return;
    window.requestAnimationFrame(() => {
      boardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function startTemplate(id: string) {
    const template = templateById(id);
    if (!template) return;
    const today = localDateKey();
    const open = state.sessions.find(
      (session) => session.focus === id && session.date === today && !session.completed,
    );
    if (open) {
      applyLog(stripDifficulty(open), template.exercises, true);
      return;
    }
    const previous = state.sessions.find(
      (session) => session.focus === id && session.completed,
    );
    applyLog(
      toLog(template.name, template.id, template.exercises, previous),
      template.exercises,
      true,
    );
  }

  function openSession(session: SessionLog) {
    setPendingDelete(null);
    applyLog(stripDifficulty(session), undefined, true);
    setReviewError(null);
  }

  function closeLog() {
    skipPersist.current = true;
    setLog(null);
    setReviewError(null);
    setPendingDelete(null);
  }

  function removeSession(id: string) {
    if (pendingDelete !== id) {
      setPendingDelete(id);
      return;
    }
    if (log?.id === id) {
      skipPersist.current = true;
      setLog(null);
      setReviewError(null);
    }
    deleteSession(id);
    setPendingDelete(null);
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
    if (turningOn) startRest(restSeconds);
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

  function reopenSession() {
    if (!log) return;
    applyLog({ ...log, completed: false, analysis: null });
    setReviewError(null);
  }

  function finishSession() {
    if (!log) return;
    const previous =
      state.sessions.find(
        (session) =>
          session.id !== log.id &&
          session.focus === log.focus &&
          session.completed,
      ) ?? null;
    applyLog({
      ...log,
      completed: true,
      analysis: analyzeSession({ ...log, completed: true }, previous, locale),
    });
    setReviewError(null);
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

      {!log && (
        <p className="text-sm text-ink-soft">
          <T text={msg(locale, "startHint")} as="span" />{" "}
          {todayCount} <T text={msg(locale, "sessionsToday")} as="span" />
        </p>
      )}

      {log && (
        <section
          ref={boardRef}
          className="rounded-[24px] bg-chalk p-4 shadow-[inset_0_0_0_1px_rgba(28,33,30,0.08)] sm:p-5"
        >
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
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
            <div className="flex flex-wrap items-center gap-2">
              <label className="text-sm text-ink-soft">
                <T text={msg(locale, "sessionDate")} as="span" className="sr-only" />
                <input
                  type="date"
                  value={log.date}
                  onChange={(event) => setLog({ ...log, date: event.target.value })}
                  className="h-11 rounded-xl border border-ink/10 bg-white px-3 font-[family-name:var(--font-data)] text-sm"
                />
              </label>
              <p className="font-[family-name:var(--font-data)] text-sm">
                {doneSets}/{totalSets} <T text={msg(locale, "sets")} as="span" />
              </p>
            </div>
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
                  <T text={reviewError} as="p" className="text-sm text-sesame" />
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

          <div className="mt-5 flex flex-wrap gap-2">
            {!log.completed && (
              <button
                type="button"
                disabled={reviewing || totalSets === 0}
                onClick={() => {
                  void finishSession();
                }}
                className="min-h-12 flex-1 rounded-full bg-rubber px-5 py-3 text-sm text-chalk disabled:opacity-60 sm:flex-none"
              >
                <T text={msg(locale, "markDone")} />
              </button>
            )}
            {log.completed && (
              <>
                <button
                  type="button"
                  disabled={reviewing}
                  onClick={reopenSession}
                  className="min-h-12 rounded-full bg-white px-5 py-3 text-sm shadow-[inset_0_0_0_1px_rgba(28,33,30,0.12)]"
                >
                  <T text={msg(locale, "reopenSession")} />
                </button>
                <button
                  type="button"
                  disabled={reviewing}
                  onClick={() => {
                    void finishSession();
                  }}
                  className="min-h-12 rounded-full bg-rubber px-5 py-3 text-sm text-chalk disabled:opacity-60"
                >
                  <T text={msg(locale, "retryAnalysis")} />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => removeSession(log.id)}
              className={`min-h-12 rounded-full px-5 py-3 text-sm ${
                pendingDelete === log.id
                  ? "bg-chili text-chalk"
                  : "bg-white text-chili shadow-[inset_0_0_0_1px_rgba(196,69,45,0.35)]"
              }`}
            >
              <T text={msg(locale, pendingDelete === log.id ? "confirmDelete" : "deleteSession")} />
            </button>
            <button
              type="button"
              onClick={closeLog}
              className="min-h-12 rounded-full bg-white px-5 py-3 text-sm shadow-[inset_0_0_0_1px_rgba(28,33,30,0.12)]"
            >
              <T text={msg(locale, "closeLog")} />
            </button>
          </div>
        </section>
      )}

      {state.sessions.length > 0 && (
        <section>
          <T text={msg(locale, "loggedSessions")} as="h2" className="font-[family-name:var(--font-display)] text-2xl" />
          <ul className="mt-3 divide-y divide-ink/10 overflow-hidden rounded-3xl bg-chalk">
            {state.sessions.map((session) => {
              const active = log?.id === session.id;
              const confirm = pendingDelete === session.id;
              return (
                <li key={session.id} className={`px-4 py-3 text-sm ${active ? "bg-tile/60" : ""}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => openSession(session)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <span className="font-[family-name:var(--font-data)]">
                        {formatDay(session.date, BCP47[locale])}
                      </span>
                      <span className="mt-0.5 block truncate">
                        <T text={sessionTitle(locale, session.name)} as="span" />
                      </span>
                    </button>
                    <T
                      text={msg(locale, session.completed ? "done" : "open")}
                      as="span"
                      className="stamp shrink-0 text-[10px] text-ink-soft normal-case"
                    />
                  </div>
                  {session.analysis && (
                    <p className="mt-2 text-xs leading-5 text-ink-soft">{session.analysis.summary}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => openSession(session)}
                      className="min-h-11 rounded-full bg-rubber px-4 text-sm text-chalk"
                    >
                      <T text={msg(locale, "editSession")} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSession(session.id)}
                      className={`min-h-11 rounded-full px-4 text-sm ${
                        confirm
                          ? "bg-chili text-chalk"
                          : "bg-white text-chili shadow-[inset_0_0_0_1px_rgba(196,69,45,0.35)]"
                      }`}
                    >
                      <T text={msg(locale, confirm ? "confirmDelete" : "deleteSession")} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
