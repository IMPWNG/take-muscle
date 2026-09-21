import { liftByName, templateById } from "./workouts";
import type { Effort, LiftKind, LiftSet, SessionAnalysis, SessionExerciseLog, SessionLog } from "./types";

const EFFORTS = new Set<Effort>(["easy", "normal", "hard"]);

function isTimedPrescription(value: string | undefined) {
  return Boolean(value && /\bs\b|sec|秒/i.test(value));
}

export function inferKind(exercise: {
  kind?: LiftKind;
  name?: string;
  prescription?: string;
}): LiftKind {
  if (exercise.kind === "load" || exercise.kind === "bodyweight" || exercise.kind === "timed") {
    return exercise.kind;
  }
  const meta = exercise.name ? liftByName(exercise.name) : null;
  if (meta?.kind) return meta.kind;
  if (isTimedPrescription(exercise.prescription) || isTimedPrescription(exercise.name)) {
    return "timed";
  }
  if (/traction|pull-?up|ab wheel|relevé|hanging leg/i.test(exercise.name ?? "")) {
    return "bodyweight";
  }
  return "load";
}

function normalizeSet(set: LiftSet, kind: LiftKind): LiftSet {
  const kg = set.kg ?? "";
  let reps = set.reps ?? "";
  let seconds = set.seconds ?? "";
  if (kind === "timed" && !seconds && reps) {
    seconds = reps;
    reps = "";
  }
  return {
    done: Boolean(set.done),
    kg: kind === "timed" ? "" : kg,
    reps: kind === "timed" ? "" : reps,
    seconds: kind === "timed" ? seconds : seconds,
    difficulty:
      set.difficulty && EFFORTS.has(set.difficulty) ? set.difficulty : null,
  };
}

function hydrateExercise(
  exercise: SessionExerciseLog,
  index: number,
  focus: string,
): SessionExerciseLog {
  const template = templateById(focus);
  const byId = exercise.id
    ? template?.exercises.find((item) => item.id === exercise.id)
    : undefined;
  const byName = template?.exercises.find((item) => item.name === exercise.name);
  const meta = byId ?? byName ?? template?.exercises[index] ?? liftByName(exercise.name);
  const kind = inferKind({
    kind: exercise.kind ?? meta?.kind,
    name: exercise.name,
    prescription: meta?.prescription,
  });
  return {
    id: exercise.id || meta?.id || `ex-${index}`,
    catalogId: exercise.catalogId ?? meta?.catalogId ?? null,
    name: exercise.name,
    kind,
    sets: (exercise.sets ?? []).map((set) => normalizeSet(set, kind)),
  };
}

type StoredAnalysis = {
  summary?: unknown;
  adjustments?: unknown;
  source?: unknown;
  warmupDone?: unknown;
};

export function unpackStoredAnalysis(raw: unknown): {
  analysis: SessionAnalysis | null;
  warmupDone: string[];
} {
  if (!raw || typeof raw !== "object") {
    return { analysis: null, warmupDone: [] };
  }
  const stored = raw as StoredAnalysis;
  const warmupDone = Array.isArray(stored.warmupDone)
    ? stored.warmupDone.filter((id): id is string => typeof id === "string")
    : [];
  if (typeof stored.summary === "string") {
    return {
      analysis: {
        summary: stored.summary,
        source: stored.source === "mammouth" || stored.source === "local" ? stored.source : undefined,
        adjustments: Array.isArray(stored.adjustments)
          ? (stored.adjustments as SessionAnalysis["adjustments"])
          : [],
      },
      warmupDone,
    };
  }
  return { analysis: null, warmupDone };
}

export function packStoredAnalysis(session: SessionLog) {
  const warmupDone = session.warmupDone ?? [];
  if (session.analysis) {
    return {
      summary: session.analysis.summary,
      adjustments: session.analysis.adjustments,
      source: session.analysis.source,
      warmupDone,
    };
  }
  if (warmupDone.length > 0) {
    return { warmupDone };
  }
  return null;
}

export function normalizeSession(session: SessionLog): SessionLog {
  return {
    ...session,
    analysis: session.analysis ?? null,
    warmupDone: Array.isArray(session.warmupDone) ? session.warmupDone : [],
    exercises: (session.exercises ?? []).map((exercise, index) =>
      hydrateExercise(exercise, index, session.focus),
    ),
  };
}
