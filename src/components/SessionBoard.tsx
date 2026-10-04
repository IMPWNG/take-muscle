"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { activeVariant, templateById, variantsFor, warmupPlan } from "@/lib/workouts";
import { phaseFor, programWeek, scaleTemplate } from "@/lib/cycle";
import { findRememberedLift, rampForLift, rampKindFor, workKgFromSets } from "@/lib/loads";
import { catalogCues, gifUrl, thumbUrl } from "@/lib/exercises";
import { formatDay, localDateKey, uid } from "@/lib/stats";
import { useTracker } from "@/hooks/useTracker";
import { useRestTimer } from "@/hooks/useRestTimer";
import { useLocale } from "@/hooks/useLocale";
import { T, TInline } from "@/components/T";
import { msg } from "@/lib/i18n/copy";
import {
  cycleBanner,
  exerciseName,
  exerciseNotes,
  templateFocus,
  warmupCopy,
  TEMPLATES_I18N,
} from "@/lib/i18n/content";
import { BCP47, t, type Locale, type Text } from "@/lib/i18n";
import {
  adjustmentFor,
  mobilityDebrief,
  previousCompleted,
  prepareForAnalysis,
  seedSetsFromPrevious,
} from "@/lib/analyze";
import { normalizeSession } from "@/lib/session-log";
import type {
  Effort,
  ExerciseVariant,
  LiftKind,
  LiftSet,
  SessionAnalysis,
  SessionExercise,
  SessionExerciseLog,
  SessionLog,
  WarmupStep,
} from "@/lib/types";

const EFFORTS: Effort[] = ["easy", "normal", "hard"];
const TEMPLATES = [
  ["session-a", "sessionA"],
  ["session-b", "sessionB"],
  ["session-c", "sessionC"],
  ["session-d", "sessionD"],
] as const;

function rememberedVariant(exercise: SessionExercise, previous: SessionLog | null, history: SessionLog[]) {
  const last =
    previous?.exercises.find((item) => item.id === exercise.id) ??
    previous?.exercises.find((item) => item.name === exercise.name) ??
    findRememberedLift(history, exercise.id, exercise.catalogId, exercise.name, previous?.id);
  return last &&
    variantsFor(exercise).some(
      (item) =>
        (item.catalogId && item.catalogId === last.catalogId) || item.name === last.name,
    )
    ? activeVariant(exercise, last)
    : exercise;
}

function toLog(
  name: string,
  focus: string,
  exercises: SessionExercise[],
  previous: SessionLog | null,
  history: SessionLog[],
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
    exercises: exercises.map((exercise) => {
      const variant = rememberedVariant(exercise, previous, history);
      return {
        id: exercise.id,
        catalogId: variant.catalogId,
        name: variant.name,
        kind: variant.kind,
        sets: seedSetsFromPrevious(
          { ...exercise, catalogId: variant.catalogId, name: variant.name, kind: variant.kind },
          previous,
          history,
          locale,
        ),
      };
    }),
  };
}

function rampLabel(exercise: { id: string; name: string; kind: LiftKind; sets: LiftSet[] }) {
  const kind = rampKindFor(exercise.id, exercise.name, exercise.kind);
  const kg = workKgFromSets(exercise.sets);
  if (!kind || !kg) return "";
  const steps = rampForLift(exercise.id, kind, kg);
  return steps.length ? ` · ${steps.map((step) => `${step.kg}×${step.reps}`).join(" → ")}` : "";
}

function stepView(locale: Locale, step: WarmupStep) {
  if (step.kg != null) {
    return {
      name: t(locale, {
        fr: "Montée en charge",
        en: "Load ramp",
        zh: "热身加重",
        py: "rè shēn jiā zhòng",
      }),
      dose: `${step.kg} kg × ${step.reps}`,
      cue: msg(locale, "warmupRampCue"),
    };
  }
  return warmupCopy(locale, step.id);
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

function KindBadge({ kind, locale }: { kind: LiftKind; locale: Locale }) {
  const key = kind === "timed" ? "kindTimed" : kind === "bodyweight" ? "kindBody" : "kindLoad";
  return (
    <span className="stamp rounded-full bg-rubber/10 px-2 py-0.5 text-[9px] text-ink-soft normal-case">
      <TInline text={msg(locale, key)} />
    </span>
  );
}

function SetFields({
  kind,
  set,
  locale,
  onChange,
}: {
  kind: LiftKind;
  set: LiftSet;
  locale: Locale;
  onChange: (field: "kg" | "reps" | "seconds", value: string) => void;
}) {
  const fieldClass =
    "h-11 w-full rounded-xl border border-ink/10 bg-white px-2.5 font-[family-name:var(--font-data)] text-base sm:px-3";
  if (kind === "timed") {
    return (
      <label className="min-w-0">
        <span className="sr-only">
          <TInline text={msg(locale, "seconds")} />
        </span>
        <input
          value={set.seconds}
          onChange={(event) => onChange("seconds", event.target.value)}
          placeholder={locale === "zh" ? "秒" : "s"}
          inputMode="numeric"
          className={fieldClass}
        />
      </label>
    );
  }
  if (kind === "bodyweight") {
    return (
      <>
        <label className="min-w-0">
          <span className="sr-only">
            <TInline text={msg(locale, "reps")} />
          </span>
          <input
            value={set.reps}
            onChange={(event) => onChange("reps", event.target.value)}
            placeholder={locale === "zh" ? "次" : "reps"}
            inputMode="numeric"
            className={fieldClass}
          />
        </label>
        <label className="min-w-0">
          <span className="sr-only">
            <TInline text={msg(locale, "addedKg")} />
          </span>
          <input
            value={set.kg}
            onChange={(event) => onChange("kg", event.target.value)}
            placeholder={locale === "zh" ? "负重kg" : "kg+"}
            inputMode="decimal"
            className={fieldClass}
          />
        </label>
      </>
    );
  }
  return (
    <>
      <label className="min-w-0">
        <span className="sr-only">kg</span>
        <input
          value={set.kg}
          onChange={(event) => onChange("kg", event.target.value)}
          placeholder="kg"
          inputMode="decimal"
          className={fieldClass}
        />
      </label>
      <label className="min-w-0">
        <span className="sr-only">reps</span>
        <input
          value={set.reps}
          onChange={(event) => onChange("reps", event.target.value)}
          placeholder={locale === "zh" ? "次" : "reps"}
          inputMode="numeric"
          className={fieldClass}
        />
      </label>
    </>
  );
}

function remapSets(sets: LiftSet[], from: LiftKind, to: LiftKind): LiftSet[] {
  if (from === to) return sets;
  return sets.map((set) => ({
    ...set,
    done: false,
    kg: to === "timed" ? "" : set.kg,
    reps: to === "timed" ? "" : set.reps || (from === "timed" ? set.seconds : ""),
    seconds: to === "timed" ? set.seconds || set.reps : "",
  }));
}

function AltPicker({
  locale,
  slot,
  current,
  onPick,
}: {
  locale: Locale;
  slot: SessionExercise;
  current: { catalogId: string | null; name: string };
  onPick: (variant: ExerciseVariant) => void;
}) {
  const variants = variantsFor(slot);
  const active = activeVariant(slot, current);
  return (
    <ul className="mt-2 space-y-1 rounded-2xl bg-white/90 p-1.5 shadow-[inset_0_0_0_1px_rgba(28,33,30,0.08)]">
      {variants.map((variant, index) => {
        const on =
          (variant.catalogId && variant.catalogId === active.catalogId) ||
          variant.name === active.name;
        const src = thumbUrl(variant.catalogId) ?? gifUrl(variant.catalogId);
        return (
          <li key={`${variant.catalogId ?? variant.name}-${index}`}>
            <button
              type="button"
              aria-pressed={on}
              onClick={() => onPick(variant)}
              className={`flex w-full min-h-12 items-center gap-2 rounded-xl px-2 py-1.5 text-left ${
                on ? "bg-sesame/25" : "hover:bg-tile/70"
              }`}
            >
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt=""
                  className="h-11 w-11 shrink-0 rounded-lg object-cover bg-rubber"
                />
              ) : (
                <span className="h-11 w-11 shrink-0 rounded-lg bg-tile" />
              )}
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <T
                    text={exerciseName(locale, variant.name)}
                    as="span"
                    className="block text-sm font-medium leading-5"
                  />
                  {index === 0 ? (
                    <span className="stamp shrink-0 text-[9px] text-ink-soft">
                      <TInline text={msg(locale, "prescribed")} />
                    </span>
                  ) : null}
                </span>
                <T
                  text={exerciseNotes(locale, variant.name, variant.notes)}
                  as="span"
                  className="mt-0.5 block line-clamp-2 text-[11px] leading-4 text-ink-soft"
                />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function LiftMedia({ catalogId, name }: { catalogId: string | null; name: string }) {
  const src = gifUrl(catalogId);
  if (!src) return null;
  return (
    <div className="relative aspect-square w-[5.5rem] shrink-0 overflow-hidden rounded-2xl bg-rubber sm:w-28">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <span className="sr-only">{name}</span>
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
  const [reviewing, setReviewing] = useState(false);
  const [reviewError, setReviewError] = useState<"auth" | "fail" | null>(null);
  const [pickerId, setPickerId] = useState<string | null>(null);
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
  const previousPlan = log ? previousCompleted(state.sessions, log.focus, log.id) : null;
  const week = programWeek(state.sessions);
  const phase = phaseFor(week);
  const template = log ? templateById(log.focus) : null;
  const firstKg = log?.exercises[0] ? workKgFromSets(log.exercises[0].sets) : null;
  const warmupSteps = template ? warmupPlan(template, firstKg) : [];
  const warmupDoneCount = warmupSteps.filter((step) => (log?.warmupDone ?? []).includes(step.id)).length;
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

  function applyLog(next: SessionLog, templateExercises?: SessionExercise[], scroll = false) {
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
    const scaled = scaleTemplate(template, programWeek(state.sessions));
    const today = localDateKey();
    const open = state.sessions.find(
      (session) => session.focus === id && session.date === today && !session.completed,
    );
    if (open) {
      applyLog(normalizeSession(open), scaled.exercises, true);
      return;
    }
    applyLog(
      toLog(
        template.name,
        template.id,
        scaled.exercises,
        previousCompleted(state.sessions, id),
        state.sessions,
        locale,
      ),
      scaled.exercises,
      true,
    );
  }

  function openSession(session: SessionLog) {
    setPendingDelete(null);
    applyLog(normalizeSession(session), undefined, true);
  }

  function closeLog() {
    skipPersist.current = true;
    setLog(null);
    setPendingDelete(null);
    setReviewError(null);
    setPickerId(null);
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

  function applyVariant(exIndex: number, variant: ExerciseVariant) {
    if (!log) return;
    const exercise = log.exercises[exIndex];
    patchExercise(exIndex, {
      ...exercise,
      catalogId: variant.catalogId,
      name: variant.name,
      kind: variant.kind,
      sets: remapSets(exercise.sets, exercise.kind, variant.kind),
    });
    setPickerId(null);
  }

  function toggleSet(exIndex: number, setIndex: number, restSeconds: number) {
    if (!log) return;
    const exercise = log.exercises[exIndex];
    const current = exercise.sets[setIndex];
    const turningOn = !current.done;
    patchExercise(exIndex, {
      ...exercise,
      sets: exercise.sets.map((set, i) => (i === setIndex ? { ...set, done: !set.done } : set)),
    });
    if (turningOn) startRest(restSeconds);
  }

  function updateSet(
    exIndex: number,
    setIndex: number,
    field: "kg" | "reps" | "seconds",
    value: string,
  ) {
    if (!log) return;
    const exercise = log.exercises[exIndex];
    patchExercise(exIndex, {
      ...exercise,
      sets: exercise.sets.map((set, i) => (i === setIndex ? { ...set, [field]: value } : set)),
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
      sets: exercise.sets.map((set, i) =>
        i === setIndex
          ? { ...set, difficulty: same ? null : effort, done: true }
          : set,
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
    setReviewError(null);
    applyLog({ ...log, completed: false, analysis: null });
  }

  async function finishSession() {
    if (!log) return;
    if (log.focus === "session-d") {
      applyLog({ ...log, completed: true, analysis: mobilityDebrief(locale) });
      return;
    }
    const prepared = prepareForAnalysis({ ...log, completed: true });
    applyLog({ ...prepared, analysis: null });
    setReviewing(true);
    setReviewError(null);
    try {
      const response = await fetch("/api/session-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          session: prepared,
          previous: previousCompleted(state.sessions, log.focus, log.id),
        }),
      });
      if (response.status === 401) {
        setReviewError("auth");
        return;
      }
      if (!response.ok) {
        setReviewError("fail");
        return;
      }
      const analysis = (await response.json()) as SessionAnalysis;
      applyLog({ ...prepared, analysis });
    } catch {
      setReviewError("fail");
    } finally {
      setReviewing(false);
    }
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

      <p className="rounded-2xl bg-tile/60 px-3 py-2.5 text-sm leading-5">
        <span className="stamp text-[10px] text-ink-soft normal-case">
          <TInline text={cycleBanner(locale, week, phase).title} />
        </span>
        <T text={cycleBanner(locale, week, phase).detail} as="span" className="mt-1 block text-ink-soft" />
      </p>

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
                  const stepCopy = stepView(locale, step);
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
                            on ? "border-chili bg-chili text-[10px] text-chalk" : "border-ink/25"
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

          {log.exercises.length > 0 ? (
          <>
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
              const slot = notes[exIndex];
              const variant = slot ? activeVariant(slot, exercise) : null;
              const adj = !log.completed
                ? adjustmentFor(previousPlan, { id: exercise.id, name: exercise.name }, locale)
                : null;
              const cues = catalogCues(exercise.catalogId, locale).slice(0, 3);
              const grid =
                exercise.kind === "timed"
                  ? "grid-cols-[2.5rem_1fr]"
                  : "grid-cols-[2.5rem_1fr_1fr]";
              const swapped = Boolean(slot && variant && variant.name !== slot.name);
              const open = pickerId === exercise.id;
              const hasAlts = (slot?.alternatives.length ?? 0) > 0;
              return (
                <li key={`${exercise.id}-${exIndex}`} className="rounded-2xl bg-tile/50 p-2.5 sm:p-4">
                  <div className="mb-2.5 flex gap-3">
                    <LiftMedia catalogId={exercise.catalogId} name={exercise.name} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <T
                          text={exerciseName(locale, exercise.name)}
                          as="p"
                          className="font-medium leading-tight"
                        />
                        <KindBadge kind={exercise.kind} locale={locale} />
                      </div>
                      {hasAlts ? (
                        <button
                          type="button"
                          aria-expanded={open}
                          onClick={() => setPickerId(open ? null : exercise.id)}
                          className="mt-1.5 stamp min-h-9 rounded-full bg-white px-3 text-[10px] text-ink shadow-[inset_0_0_0_1px_rgba(28,33,30,0.12)]"
                        >
                          <TInline text={msg(locale, "alternative")} />
                          {swapped ? " · " : null}
                          {swapped ? <TInline text={exerciseName(locale, slot.name)} /> : null}
                        </button>
                      ) : null}
                      {adj ? (
                        <p className="mt-1 text-xs leading-5">
                          <span className="font-[family-name:var(--font-data)] text-chili">
                            {adj.amount}
                          </span>
                          <span className="ml-2 text-ink-soft">{adj.reason}</span>
                        </p>
                      ) : null}
                      {slot ? (
                        <p className="mt-1 font-[family-name:var(--font-data)] text-[11px] text-ink-soft">
                          {slot.sets} × {variant?.prescription ?? slot.prescription} · {slot.restSeconds}s
                          {rampLabel(exercise)}
                        </p>
                      ) : null}
                      {cues.length > 0 ? (
                        <ul className="mt-1.5 hidden space-y-0.5 sm:block">
                          {cues.map((cue) => (
                            <li key={cue} className="text-[11px] leading-4 text-ink-soft">
                              {cue}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {slot ? (
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-ink-soft sm:line-clamp-none">
                          <T
                            text={exerciseNotes(
                              locale,
                              exercise.name,
                              variant?.notes ?? slot.notes,
                            )}
                            as="span"
                          />
                        </p>
                      ) : null}
                    </div>
                  </div>
                  {open && slot ? (
                    <AltPicker
                      locale={locale}
                      slot={slot}
                      current={exercise}
                      onPick={(next) => applyVariant(exIndex, next)}
                    />
                  ) : null}
                  {cues.length > 0 ? (
                    <p className="mb-2 line-clamp-2 text-[11px] leading-4 text-ink-soft sm:hidden">
                      {cues[0]}
                    </p>
                  ) : null}
                  <div className="grid gap-2">
                    {exercise.sets.map((set, setIndex) => (
                      <div
                        key={setIndex}
                        className="rounded-xl bg-white/80 p-2 shadow-[inset_0_0_0_1px_rgba(28,33,30,0.06)]"
                      >
                        <div className={`grid items-center gap-1.5 ${grid}`}>
                          <button
                            type="button"
                            onClick={() => toggleSet(exIndex, setIndex, slot?.restSeconds ?? 90)}
                            className={`h-11 w-10 rounded-full text-sm font-medium sm:w-11 ${
                              set.done ? "bg-chili text-chalk" : "bg-tile text-ink"
                            }`}
                          >
                            {setIndex + 1}
                          </button>
                          <SetFields
                            kind={exercise.kind}
                            set={set}
                            locale={locale}
                            onChange={(field, value) => updateSet(exIndex, setIndex, field, value)}
                          />
                        </div>
                        <div className="mt-1.5">
                          <EffortStamps
                            value={set.difficulty}
                            locale={locale}
                            onPick={(effort) =>
                              stampSet(exIndex, setIndex, effort, slot?.restSeconds ?? 90)
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
          <p className="mt-2 text-[10px] leading-4 text-ink-soft">
            <T text={msg(locale, "gifCredit")} />
          </p>
          </>
          ) : null}

          {reviewing ? (
            <div className="mt-5 rounded-2xl bg-rubber p-4 text-chalk">
              <T
                text={msg(locale, "analyzing")}
                as="p"
                className="stamp text-[11px] text-chalk/60 normal-case"
              />
              <T text={msg(locale, "analyzingLead")} as="p" className="mt-2 text-sm leading-6" />
            </div>
          ) : null}

          {reviewError ? (
            <div className="mt-5 rounded-2xl bg-chili p-4 text-chalk">
              <T
                text={msg(locale, reviewError === "auth" ? "reviewAuth" : "reviewFail")}
                as="p"
                className="text-sm leading-6"
              />
            </div>
          ) : null}

          {log.analysis ? (
            <div className="mt-5 rounded-2xl bg-rubber p-3 text-chalk sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <T
                  text={msg(locale, "debriefTitle")}
                  as="p"
                  className="stamp text-[11px] text-chalk/60 normal-case"
                />
                <span className="stamp text-[9px] text-chalk/45">
                  <TInline
                    text={msg(locale, log.analysis.source === "mammouth" ? "coachAi" : "coachLocal")}
                  />
                </span>
              </div>
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
                {log.focus === "session-d" ? null : (
                <button
                  type="button"
                  disabled={reviewing}
                  onClick={() => finishSession()}
                  className="min-h-12 rounded-full bg-rubber px-5 py-3 text-sm text-chalk disabled:opacity-60"
                >
                  <T text={msg(locale, reviewing ? "analyzing" : "retryAnalysis")} />
                </button>
                )}
              </>
            ) : (
              <button
                type="button"
                disabled={(log.focus !== "session-d" && totalSets === 0) || reviewing}
                onClick={() => finishSession()}
                className="min-h-12 rounded-full bg-rubber px-5 py-3 text-sm text-chalk disabled:opacity-60"
              >
                <T
                  text={msg(
                    locale,
                    reviewing ? "analyzing" : log.focus === "session-d" ? "markDoneLight" : "markDone",
                  )}
                />
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
