"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { templateById, warmupFor } from "@/lib/workouts";
import { formatDay, localDateKey, uid } from "@/lib/stats";
import { useTracker } from "@/hooks/useTracker";
import { useRestTimer } from "@/hooks/useRestTimer";
import { useLocale } from "@/hooks/useLocale";
import { T, TInline } from "@/components/T";
import { msg } from "@/lib/i18n/copy";
import {
  exerciseName,
  exerciseNotes,
  templateFocus,
  warmupCopy,
} from "@/lib/i18n/content";
import { TEMPLATES_I18N } from "@/lib/i18n/content";
import { BCP47, t, type Locale, type Text } from "@/lib/i18n";
import {
  adjustmentFor,
  analyzeSession,
  prepareForAnalysis,
  previousCompleted,
  seedSetsFromPrevious,
} from "@/lib/analyze";
import type {
  Effort,
  SessionExercise,
  SessionExerciseLog,
  SessionLog,
} from "@/lib/types";

const EFFORTS: Effort[] = ["easy", "normal", "hard"];
const TEMPLATES = [
  ["upper-a", "upperA"],
  ["lower-a", "lowerA"],
  ["upper-b", "upperB"],
  ["lower-b", "lowerB"],
] as const;

function toLog(
  name: string,
  focus: string,
  exercises: SessionExercise[],
  previous: SessionLog | null,
  locale: Locale,
): SessionLog {
  return {
    id: uid(),
    date: localDateKey(),
    name,
    focus,
    completed: false,
    analysis: null,
    warmupDone: [],
    exercises: exercises.map((exercise) => ({
      name: exercise.name,
      sets: seedSetsFromPrevious(exercise.name, exercise.sets, previous, locale),
    })),
  };
}

function sessionTitle(locale: Locale, name: string): Text {
  const match = Object.entries(TEMPLATES_I18N).find(
    ([, value]) => value.name.fr === name || value.name.en === name || value.name.zh === name,
  );
  if (match) return t(locale, match[1].name);
  return name;
}

function notesFor(session: SessionLog): SessionExercise[] {
  return templateById(session.focus)?.exercises ?? [];
}

function normalizeLog(session: SessionLog): SessionLog {
  return {
    ...session,
    analysis: session.analysis ?? null,
    warmupDone: session.warmupDone ?? [],
    exercises: session.exercises.map((exercise) => ({
      name: exercise.name,
      sets: exercise.sets.map((set) => ({
        done: set.done,
        kg: set.kg,
        reps: set.reps,
        difficulty: set.difficulty ?? null,
      })),
    })),
  };
}

function EffortStamps({
  value,
  locale,
  onPick,
}: {
  value: Effort | null;
  locale: Locale;
  onPick: (effort: Effort) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {EFFORTS.map((effort) => {
        const on = value === effort;
        return (
          <button
            key={effort}
            type="button"
            aria-pressed={on}
            onClick={() => onPick(effort)}
            className={`stamp min-h-10 rounded-lg px-1 text-[10px] leading-tight tracking-[0.1em] ${
              on
                ? effort === "hard"
                  ? "bg-chili text-chalk"
                  : effort === "easy"
                    ? "bg-sesame text-ink"
                    : "bg-rubber text-chalk"
                : "bg-white text-ink-soft shadow-[inset_0_0_0_1px_rgba(28,33,30,0.1)]"
            }`}
          >
            <TInline text={msg(locale, effort)} />
          </button>
        );
      })}
    </div>
  );
}

export function SessionBoard() {
  const { saveSession, deleteSession, state } = useTracker();
  const { startRest } = useRestTimer();
  const { locale } = useLocale();
  const [log, setLog] = useState<SessionLog | null>(null);
  const [notes, setNotes] = useState<SessionExercise[]>([]);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const skipPersist = useRef(true);
  const boardRef = useRef<HTMLElement>(null);
  const carnetRef = useRef<HTMLElement>(null);

  const doneSets = useMemo(
    () => log?.exercises.reduce((n, ex) => n + ex.sets.filter((set) => set.done).length, 0) ?? 0,
    [log],
  );
  const totalSets = useMemo(
    () => log?.exercises.reduce((n, ex) => n + ex.sets.length, 0) ?? 0,
    [log],
  );
  const previousPlan = log
    ? previousCompleted(state.sessions, log.focus, log.id)
    : null;
  const warmupSteps = log ? warmupFor(log.focus) : [];
  const warmupDoneCount = warmupSteps.filter((step) =>
    (log?.warmupDone ?? []).includes(step.id),
  ).length;
  const todayCount = state.sessions.filter((session) => session.date === localDateKey()).length;

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
      applyLog(normalizeLog(open), template.exercises, true);
      return;
    }
    applyLog(
      toLog(
        template.name,
        template.id,
        template.exercises,
        previousCompleted(state.sessions, id),
        locale,
      ),
      template.exercises,
      true,
    );
  }

  function openSession(session: SessionLog) {
    setPendingDelete(null);
    applyLog(normalizeLog(session), undefined, true);
  }

  function closeLog() {
    skipPersist.current = true;
    setLog(null);
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

  function stampSet(exIndex: number, setIndex: number, effort: Effort, restSeconds: number) {
    if (!log) return;
    const exercise = log.exercises[exIndex];
    const current = exercise.sets[setIndex];
    const same = current.difficulty === effort;
    const turningOn = !current.done;
    patchExercise(exIndex, {
      ...exercise,
      sets: exercise.sets.map((set, j) =>
        j !== setIndex
          ? set
          : {
              ...set,
              difficulty: same ? null : effort,
              done: same ? set.done : true,
            },
      ),
    });
    if (!same && turningOn) startRest(restSeconds);
  }

  function toggleWarmup(id: string) {
    if (!log) return;
    const done = log.warmupDone ?? [];
    setLog({
      ...log,
      warmupDone: done.includes(id) ? done.filter((item) => item !== id) : [...done, id],
    });
  }

  function reopenSession() {
    if (!log) return;
    applyLog({ ...log, completed: false, analysis: null });
  }

  function finishSession() {
    if (!log) return;
    const prepared = prepareForAnalysis({ ...log, completed: true });
    applyLog({
      ...prepared,
      analysis: analyzeSession(
        prepared,
        previousCompleted(state.sessions, log.focus, log.id),
        locale,
      ),
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {TEMPLATES.map(([id, key]) => (
          <button
            key={id}
            type="button"
            onClick={() => startTemplate(id)}
            className={`min-h-12 rounded-2xl px-3 text-sm shadow-[inset_0_0_0_1px_rgba(28,33,30,0.1)] sm:min-h-11 sm:rounded-full sm:px-4 ${
              log?.focus === id ? "bg-rubber text-chalk" : "bg-chalk"
            }`}
          >
            <T text={msg(locale, key)} />
          </button>
        ))}
      </div>

      {log ? null : (
        <p className="text-sm leading-5 text-ink-soft">
          <T text={msg(locale, "startHint")} as="span" />{" "}
          {todayCount} <T text={msg(locale, "sessionsToday")} as="span" />
        </p>
      )}

      {log ? (
        <section
          ref={boardRef}
          className="rounded-[22px] bg-chalk p-3 shadow-[inset_0_0_0_1px_rgba(28,33,30,0.08)] sm:rounded-[24px] sm:p-5"
        >
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div className="min-w-0">
              <T
                text={templateFocus(locale, log.focus)}
                as="p"
                className="stamp text-[11px] text-ink-soft normal-case"
              />
              <T
                text={sessionTitle(locale, log.name)}
                as="h2"
                className="font-[family-name:var(--font-display)] text-[1.7rem] leading-none sm:text-3xl"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="min-w-0 flex-1 sm:flex-none">
                <T text={msg(locale, "sessionDate")} as="span" className="sr-only" />
                <input
                  type="date"
                  value={log.date}
                  onChange={(event) => setLog({ ...log, date: event.target.value })}
                  className="h-11 w-full rounded-xl border border-ink/10 bg-white px-3 font-[family-name:var(--font-data)] text-sm sm:w-auto"
                />
              </label>
              <p className="font-[family-name:var(--font-data)] text-sm">
                {doneSets}/{totalSets} <T text={msg(locale, "sets")} as="span" />
              </p>
              {state.sessions.length > 0 ? (
                <button
                  type="button"
                  onClick={() => carnetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="stamp min-h-11 rounded-full bg-white px-3 text-[10px] text-ink-soft shadow-[inset_0_0_0_1px_rgba(28,33,30,0.1)]"
                >
                  <TInline text={msg(locale, "jumpCarnet")} />
                </button>
              ) : null}
            </div>
          </div>

          {!log.completed && previousPlan?.analysis ? (
            <div className="mb-4 rounded-2xl bg-rubber p-3 text-chalk sm:p-4">
              <T
                text={msg(locale, "planTitle")}
                as="p"
                className="stamp text-[11px] text-chalk/60 normal-case"
              />
              <p className="mt-1 font-[family-name:var(--font-data)] text-[11px] text-chalk/55">
                {formatDay(previousPlan.date, BCP47[locale])}
              </p>
              <p className="mt-2 text-sm leading-5">{previousPlan.analysis.summary}</p>
              <ul className="mt-3 space-y-1">
                {previousPlan.analysis.adjustments.map((item) => (
                  <li
                    key={`${item.key ?? item.exercise}-${item.amount}`}
                    className="flex items-baseline justify-between gap-3 text-xs"
                  >
                    <span className="min-w-0 truncate">{item.exercise}</span>
                    <span className="shrink-0 font-[family-name:var(--font-data)] text-sesame">
                      {item.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {warmupSteps.length > 0 ? (
            <div className="mb-4 rounded-2xl bg-tile/50 p-3 sm:p-4">
              <div className="mb-2 flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <T
                    text={msg(locale, "warmupTitle")}
                    as="p"
                    className="stamp text-[11px] text-ink-soft normal-case"
                  />
                  <T
                    text={msg(locale, "warmupLead")}
                    as="p"
                    className="mt-1 text-xs leading-5 text-ink-soft"
                  />
                </div>
                <span className="stamp shrink-0 text-[10px] text-ink-soft">
                  {warmupDoneCount}/{warmupSteps.length}
                </span>
              </div>
              <ul className="space-y-1">
                {warmupSteps.map((step) => {
                  const stepCopy = warmupCopy(locale, step.id);
                  const on = (log.warmupDone ?? []).includes(step.id);
                  return (
                    <li key={step.id}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleWarmup(step.id)}
                        className={`flex w-full min-h-11 items-start gap-2 rounded-xl px-2 py-2 text-left text-sm ${
                          on ? "bg-sesame/20" : "hover:bg-white/70"
                        }`}
                      >
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-sm border ${
                            on
                              ? "border-chili bg-chili text-[10px] text-chalk"
                              : "border-ink/25"
                          }`}
                        >
                          {on ? "✓" : ""}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-2">
                            <T text={stepCopy.name} as="span" className="font-medium leading-5" />
                            <T
                              text={stepCopy.dose}
                              as="span"
                              className="shrink-0 font-[family-name:var(--font-data)] text-[11px] text-ink-soft"
                            />
                          </span>
                          <T
                            text={stepCopy.cue}
                            as="span"
                            className="mt-0.5 block text-[11px] leading-5 text-ink-soft"
                          />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          <div className="mb-3 flex items-end justify-between gap-2">
            <T
              text={msg(locale, "warmupWork")}
              as="p"
              className="stamp text-[11px] text-ink-soft normal-case"
            />
            <T
              text={msg(locale, "effortHint")}
              as="p"
              className="max-w-[16rem] text-right text-[11px] leading-4 text-ink-soft"
            />
          </div>
          <ol className="space-y-4">
            {log.exercises.map((exercise, exIndex) => {
              const meta = notes[exIndex];
              const adj = !log.completed
                ? adjustmentFor(previousPlan, exercise.name, locale)
                : null;
              return (
                <li
                  key={`${exercise.name}-${exIndex}`}
                  className="rounded-2xl bg-tile/50 p-2.5 sm:p-4"
                >
                  <div className="mb-2.5">
                    <T text={exerciseName(locale, exercise.name)} as="p" className="font-medium leading-tight" />
                    {adj ? (
                      <p className="mt-1 text-xs leading-5">
                        <span className="font-[family-name:var(--font-data)] text-chili">
                          {adj.amount}
                        </span>
                        <span className="ml-2 text-ink-soft">{adj.reason}</span>
                      </p>
                    ) : null}
                    {meta ? (
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-ink-soft sm:line-clamp-none">
                        {meta.sets} × {meta.reps} · {meta.restSeconds}s ·{" "}
                        <T text={exerciseNotes(locale, exercise.name, meta.notes)} as="span" />
                      </p>
                    ) : null}
                  </div>
                  <div className="grid gap-2">
                    {exercise.sets.map((set, setIndex) => (
                      <div
                        key={setIndex}
                        className="rounded-xl bg-white/80 p-2 shadow-[inset_0_0_0_1px_rgba(28,33,30,0.06)]"
                      >
                        <div className="grid grid-cols-[2.5rem_1fr_1fr] items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => toggleSet(exIndex, setIndex, meta?.restSeconds ?? 90)}
                            className={`h-11 w-10 rounded-full text-sm font-medium sm:w-11 ${
                              set.done ? "bg-chili text-chalk" : "bg-tile text-ink"
                            }`}
                          >
                            {setIndex + 1}
                          </button>
                          <label className="min-w-0">
                            <span className="sr-only">kg</span>
                            <input
                              value={set.kg}
                              onChange={(event) =>
                                updateSet(exIndex, setIndex, "kg", event.target.value)
                              }
                              placeholder="kg"
                              inputMode="decimal"
                              className="h-11 w-full rounded-xl border border-ink/10 bg-white px-2.5 font-[family-name:var(--font-data)] text-base sm:px-3"
                            />
                          </label>
                          <label className="min-w-0">
                            <span className="sr-only">reps</span>
                            <input
                              value={set.reps}
                              onChange={(event) =>
                                updateSet(exIndex, setIndex, "reps", event.target.value)
                              }
                              placeholder="reps"
                              inputMode="numeric"
                              className="h-11 w-full rounded-xl border border-ink/10 bg-white px-2.5 font-[family-name:var(--font-data)] text-base sm:px-3"
                            />
                          </label>
                        </div>
                        <div className="mt-1.5">
                          <EffortStamps
                            value={set.difficulty}
                            locale={locale}
                            onPick={(effort) =>
                              stampSet(exIndex, setIndex, effort, meta?.restSeconds ?? 90)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>

          {log.analysis ? (
            <div className="mt-5 rounded-2xl bg-rubber p-3 text-chalk sm:p-4">
              <T
                text={msg(locale, "debriefTitle")}
                as="p"
                className="stamp text-[11px] text-chalk/60 normal-case"
              />
              <p className="mt-2 text-sm leading-6">{log.analysis.summary}</p>
              <ul className="mt-3 space-y-2">
                {log.analysis.adjustments.map((item) => (
                  <li
                    key={`${item.key ?? item.exercise}-${item.change}`}
                    className="rounded-xl bg-white/8 px-3 py-2"
                  >
                    <p className="text-sm font-medium">{item.exercise}</p>
                    <p className="font-[family-name:var(--font-data)] text-sm text-sesame">
                      {item.amount}
                    </p>
                    <p className="text-xs leading-5 text-chalk/70">{item.reason}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-5 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
            {log.completed ? (
              <>
                <button
                  type="button"
                  onClick={reopenSession}
                  className="min-h-12 rounded-full bg-white px-5 py-3 text-sm shadow-[inset_0_0_0_1px_rgba(28,33,30,0.12)]"
                >
                  <T text={msg(locale, "reopenSession")} />
                </button>
                <button
                  type="button"
                  onClick={() => finishSession()}
                  className="min-h-12 rounded-full bg-rubber px-5 py-3 text-sm text-chalk"
                >
                  <T text={msg(locale, "retryAnalysis")} />
                </button>
              </>
            ) : (
              <button
                type="button"
                disabled={totalSets === 0}
                onClick={() => finishSession()}
                className="min-h-12 rounded-full bg-rubber px-5 py-3 text-sm text-chalk disabled:opacity-60"
              >
                <T text={msg(locale, "markDone")} />
              </button>
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
      ) : null}

      <section ref={carnetRef} className="scroll-mt-4">
        <T
          text={msg(locale, "loggedSessions")}
          as="h2"
          className="font-[family-name:var(--font-display)] text-[1.65rem] leading-none sm:text-2xl"
        />
        <T text={msg(locale, "carnetLead")} as="p" className="mt-1 text-sm leading-5 text-ink-soft" />
        {state.sessions.length === 0 ? (
          <T
            text={msg(locale, "carnetEmpty")}
            as="p"
            className="mt-3 rounded-2xl bg-chalk px-4 py-5 text-sm text-ink-soft"
          />
        ) : (
          <ul className="mt-3 divide-y divide-ink/10 overflow-hidden rounded-3xl bg-chalk">
            {state.sessions.map((session) => {
              const active = log?.id === session.id;
              const confirm = pendingDelete === session.id;
              return (
                <li key={session.id} className={`px-3 py-3 sm:px-4 ${active ? "bg-tile/60" : ""}`}>
                  <button
                    type="button"
                    onClick={() => openSession(session)}
                    className="flex w-full min-h-11 items-start justify-between gap-3 text-left"
                  >
                    <span className="min-w-0">
                      <span className="font-[family-name:var(--font-data)] text-sm">
                        {formatDay(session.date, BCP47[locale])}
                      </span>
                      <span className="mt-0.5 block truncate text-sm">
                        <T text={sessionTitle(locale, session.name)} as="span" />
                      </span>
                      {session.analysis ? (
                        <span className="mt-1 block line-clamp-2 text-xs leading-5 text-ink-soft">
                          {session.analysis.summary}
                        </span>
                      ) : null}
                    </span>
                    <T
                      text={msg(locale, session.completed ? "done" : "open")}
                      as="span"
                      className="stamp mt-0.5 shrink-0 text-[10px] text-ink-soft normal-case"
                    />
                  </button>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => openSession(session)}
                      className="min-h-11 flex-1 rounded-full bg-rubber px-4 text-sm text-chalk sm:flex-none"
                    >
                      <T text={msg(locale, "consultSession")} />
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
        )}
      </section>
    </div>
  );
}
