"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "take-muscle-rest-ends-at";

type RestTimerValue = {
  remaining: number;
  startRest: (seconds: number) => void;
  clearRest: () => void;
};

const RestTimerContext = createContext<RestTimerValue | null>(null);

function readEndsAt() {
  if (typeof window === "undefined") return 0;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  const endsAt = Number(raw);
  return Number.isFinite(endsAt) ? endsAt : 0;
}

function secondsLeft(endsAt: number) {
  if (endsAt <= 0) return 0;
  return Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
}

export function RestTimerProvider({ children }: { children: ReactNode }) {
  const [endsAt, setEndsAt] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const stored = readEndsAt();
    if (stored > Date.now()) setEndsAt(stored);
  }, []);

  useEffect(() => {
    if (endsAt <= 0) {
      setRemaining(0);
      return;
    }
    const tick = () => {
      const left = secondsLeft(endsAt);
      setRemaining(left);
      if (left <= 0) {
        sessionStorage.removeItem(STORAGE_KEY);
        setEndsAt(0);
      }
    };
    tick();
    const timer = window.setInterval(tick, 250);
    return () => window.clearInterval(timer);
  }, [endsAt]);

  const startRest = useCallback((seconds: number) => {
    const next = Date.now() + Math.max(1, seconds) * 1000;
    sessionStorage.setItem(STORAGE_KEY, String(next));
    setEndsAt(next);
  }, []);

  const clearRest = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setEndsAt(0);
    setRemaining(0);
  }, []);

  const value = useMemo(
    () => ({ remaining, startRest, clearRest }),
    [remaining, startRest, clearRest],
  );

  return <RestTimerContext.Provider value={value}>{children}</RestTimerContext.Provider>;
}

export function useRestTimer() {
  const ctx = useContext(RestTimerContext);
  if (!ctx) throw new Error("useRestTimer must be used inside RestTimerProvider");
  return ctx;
}
