import type { Effort, LiftSet, SessionAnalysis, SessionLog } from "./types";

const EFFORTS = new Set<Effort>(["easy", "normal", "hard"]);

function normalizeSet(set: LiftSet): LiftSet {
  return {
    done: Boolean(set.done),
    kg: set.kg ?? "",
    reps: set.reps ?? "",
    difficulty:
      set.difficulty && EFFORTS.has(set.difficulty) ? set.difficulty : null,
  };
}

type StoredAnalysis = {
  summary?: unknown;
  adjustments?: unknown;
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
    exercises: (session.exercises ?? []).map((exercise) => ({
      name: exercise.name,
      sets: (exercise.sets ?? []).map((set) => normalizeSet(set)),
    })),
  };
}
