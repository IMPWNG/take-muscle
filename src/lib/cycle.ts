import { localDateKey, parseDate } from "./stats";
import type { SessionExercise, SessionLog, WorkoutTemplate } from "./types";

export const CYCLE_IDS = ["session-a", "session-b", "session-c", "session-d"] as const;

export type CyclePhase = "start" | "build" | "deload" | "taper" | "done";

export function programStart(sessions: SessionLog[]) {
  const dates = sessions
    .filter((session) => (CYCLE_IDS as readonly string[]).includes(session.focus))
    .map((session) => session.date)
    .sort();
  return dates[0] ?? null;
}

export function programWeek(sessions: SessionLog[], today = localDateKey()) {
  const start = programStart(sessions);
  if (!start) return 1;
  const ms = parseDate(today).getTime() - parseDate(start).getTime();
  const days = Math.max(0, Math.floor(ms / 86_400_000));
  return Math.min(12, Math.floor(days / 7) + 1);
}

export function phaseFor(week: number): CyclePhase {
  if (week >= 13) return "done";
  if (week === 12) return "taper";
  if (week === 4 || week === 8) return "deload";
  if (week <= 3) return "start";
  return "build";
}

export function setFactor(week: number) {
  const phase = phaseFor(week);
  if (phase === "deload") return 0.5;
  if (phase === "taper") return 0.65;
  return 1;
}

export function scaleTemplate(template: WorkoutTemplate, week: number): WorkoutTemplate {
  const factor = setFactor(week);
  if (factor === 1) return template;
  return {
    ...template,
    exercises: template.exercises.map((exercise) => ({
      ...exercise,
      sets: Math.max(1, Math.round(exercise.sets * factor)),
    })),
  };
}

export function scaledLift(exercise: SessionExercise, week: number): SessionExercise {
  const factor = setFactor(week);
  if (factor === 1) return exercise;
  return { ...exercise, sets: Math.max(1, Math.round(exercise.sets * factor)) };
}
