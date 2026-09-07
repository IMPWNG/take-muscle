"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { emptyState, loadState, saveState } from "@/lib/storage";
import { localDateKey, uid } from "@/lib/stats";
import type { SessionLog, TrackerState } from "@/lib/types";

type TrackerContextValue = {
  ready: boolean;
  state: TrackerState;
  toggleFood: (date: string, id: string) => void;
  toggleExtra: (date: string, id: string) => void;
  addWeight: (kg: number, date?: string) => void;
  removeWeight: (id: string) => void;
  saveSession: (session: SessionLog) => void;
  deleteSession: (id: string) => void;
  setExtraKcal: (kcal: number) => void;
};

const TrackerContext = createContext<TrackerContextValue | null>(null);

function hasLocalData(state: TrackerState) {
  return (
    state.weights.length > 0 ||
    state.sessions.length > 0 ||
    Object.keys(state.checkedByDate).length > 0 ||
    Object.keys(state.extraByDate).length > 0
  );
}

function isEmptyRemote(state: TrackerState) {
  return !hasLocalData(state);
}

async function persistRemote(state: TrackerState) {
  const response = await fetch("/api/tracker", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state),
  });
  if (!response.ok) throw new Error("save failed");
}

export function TrackerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TrackerState>(emptyState);
  const [ready, setReady] = useState(false);
  const skipNextSave = useRef(true);

  useEffect(() => {
    let cancelled = false;
    const local = loadState();

    (async () => {
      try {
        const response = await fetch("/api/tracker");
        if (response.status === 401) {
          if (!cancelled) setState(local);
          return;
        }
        if (!response.ok) throw new Error("load failed");
        const remote = (await response.json()) as TrackerState;
        if (isEmptyRemote(remote) && hasLocalData(local)) {
          await persistRemote(local);
          if (!cancelled) setState(local);
        } else if (!cancelled) {
          setState(remote);
        }
      } catch {
        if (!cancelled) setState(local);
      } finally {
        if (!cancelled) {
          skipNextSave.current = true;
          setReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveState(state);
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    const timer = window.setTimeout(() => {
      persistRemote(state).catch(() => {});
    }, 500);
    return () => window.clearTimeout(timer);
  }, [ready, state]);

  const toggleInMap = useCallback(
    (key: "checkedByDate" | "extraByDate", date: string, id: string) => {
      setState((prev) => {
        const current = prev[key][date] ?? [];
        const next = current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id];
        return {
          ...prev,
          [key]: { ...prev[key], [date]: next },
        };
      });
    },
    [],
  );

  const saveSession = useCallback((session: SessionLog) => {
    setState((prev) => ({
      ...prev,
      sessions: [session, ...prev.sessions.filter((item) => item.id !== session.id)],
    }));
  }, []);

  const deleteSession = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      sessions: prev.sessions.filter((item) => item.id !== id),
    }));
  }, []);

  const value = useMemo<TrackerContextValue>(
    () => ({
      ready,
      state,
      toggleFood: (date, id) => toggleInMap("checkedByDate", date, id),
      toggleExtra: (date, id) => toggleInMap("extraByDate", date, id),
      addWeight: (kg, date = localDateKey()) => {
        setState((prev) => ({
          ...prev,
          weights: [...prev.weights, { id: uid(), date, kg }],
        }));
      },
      removeWeight: (id) => {
        setState((prev) => ({
          ...prev,
          weights: prev.weights.filter((entry) => entry.id !== id),
        }));
      },
      saveSession,
      deleteSession,
      setExtraKcal: (kcal) => {
        setState((prev) => ({
          ...prev,
          profile: { ...prev.profile, extraKcal: kcal },
        }));
      },
    }),
    [ready, state, toggleInMap, saveSession, deleteSession],
  );

  return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>;
}

export function useTracker() {
  const ctx = useContext(TrackerContext);
  if (!ctx) throw new Error("useTracker must be used inside TrackerProvider");
  return ctx;
}

export function todayIds(state: TrackerState, date = localDateKey()) {
  return [...(state.checkedByDate[date] ?? []), ...(state.extraByDate[date] ?? [])];
}
