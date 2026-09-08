import { DEFAULT_PROFILE } from "./program";
import { normalizeSession } from "./session-log";
import type { SessionLog, TrackerState } from "./types";

export const STORAGE_KEY = "take-muscle-v1";

export const emptyState = (): TrackerState => ({
  profile: { ...DEFAULT_PROFILE },
  weights: [],
  checkedByDate: {},
  extraByDate: {},
  sessions: [],
});

export function loadState(): TrackerState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<TrackerState>;
    const base = emptyState();
    return {
      profile: { ...base.profile, ...parsed.profile },
      weights: parsed.weights ?? [],
      checkedByDate: parsed.checkedByDate ?? {},
      extraByDate: parsed.extraByDate ?? {},
      sessions: (parsed.sessions ?? []).map((session) =>
        normalizeSession(session as SessionLog),
      ),
    };
  } catch {
    return emptyState();
  }
}

export function saveState(state: TrackerState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
