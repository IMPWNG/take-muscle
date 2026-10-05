import type { LiftKind, LiftSet, SessionExerciseLog, SessionLog } from "./types";

export type RampKind = "barbell" | "hinge" | "db" | "machine" | "row";

export type RampStep = { kg: number; reps: string };

export const ALIASES: Record<string, string[]> = {
  "sa-squat": ["la-squat", "Back squat", "Squat", "0043"],
  "sa-rdl": ["la-rdl", "Romanian deadlift", "0085"],
  "sa-press": ["la-hack", "Hack squat", "Presse à cuisses", "0739", "0743"],
  "sa-curl": ["la-curl", "lb-curl", "Leg curl", "0586"],
  "sa-calf": ["la-calf", "lb-calf", "Mollets debout", "Mollets assis", "1372", "1379"],
  "sa-plank": ["Gainage", "0464", "lb-side", "lb-copenhagen"],
  "sb-bench": ["ua-bench", "Bench press", "Développé couché", "0025"],
  "sb-pull": ["ua-pullup", "ub-pullup", "0652", "0198", "0017"],
  "sb-incline": ["ua-incline", "Développé incliné haltères", "0314"],
  "sb-row": ["ua-row", "ub-row", "Rowing poitrine soutenue", "0049", "0861", "1350"],
  "sb-lat": ["ua-lat", "Élévations latérales", "0334"],
  "sb-face": ["ub-rear-fly", "Face pull", "Reverse fly", "0203", "0383"],
  "sc-trap": ["lb-dl", "Deadlift classique ou trap-bar", "Trap-bar deadlift", "0811", "0032", "0042"],
  "sc-bulgarian": ["lb-bulgarian", "Bulgarian split squat", "0410"],
  "sc-db-bench": ["ub-db-bench", "Développé couché haltères", "0289", "0577"],
  "sc-row": ["Rowing haltère unilatéral", "0292", "ua-row"],
  "sc-hip": ["lb-hip", "Hip thrust", "1409"],
  "sc-fly": ["ub-fly", "Cable fly", "0171"],
  "sc-abs": ["la-abs", "Relevés de jambes", "0472", "0857"],
};

export const FOCUS_ALIASES: Record<string, string[]> = {
  "session-a": ["lower-a"],
  "session-b": ["upper-a"],
  "session-c": ["lower-b", "upper-b"],
};

export const STARTING_LOADS: Record<string, { kg?: string; seconds?: string }> = {
  "sa-squat": { kg: "65" },
  "sa-rdl": { kg: "47.5" },
  "sa-curl": { kg: "42.5" },
  "sa-plank": { seconds: "40" },
  "sb-bench": { kg: "55" },
  "sb-incline": { kg: "20" },
  "sb-row": { kg: "50" },
  "sc-trap": { kg: "60" },
  "sc-db-bench": { kg: "20" },
};

const PRESET_RAMPS: Record<string, { work: number; steps: RampStep[] }> = {
  "sa-squat": {
    work: 65,
    steps: [
      { kg: 20, reps: "8–10" },
      { kg: 40, reps: "5" },
      { kg: 50, reps: "3" },
      { kg: 60, reps: "1–2" },
    ],
  },
  "sa-rdl": {
    work: 47.5,
    steps: [
      { kg: 30, reps: "8" },
      { kg: 40, reps: "5" },
    ],
  },
  "sb-bench": {
    work: 55,
    steps: [
      { kg: 20, reps: "10" },
      { kg: 30, reps: "5" },
      { kg: 40, reps: "3" },
      { kg: 47.5, reps: "1–2" },
    ],
  },
  "sb-incline": {
    work: 20,
    steps: [
      { kg: 10, reps: "8" },
      { kg: 15, reps: "5" },
    ],
  },
  "sb-row": {
    work: 50,
    steps: [
      { kg: 25, reps: "8" },
      { kg: 35, reps: "5" },
      { kg: 42.5, reps: "2–3" },
    ],
  },
  "sa-curl": {
    work: 42.5,
    steps: [
      { kg: 25, reps: "10" },
      { kg: 35, reps: "5" },
    ],
  },
};

function roundPlate(kg: number) {
  return Math.round(kg / 2.5) * 2.5;
}

function uniqueAscending(steps: RampStep[]) {
  const seen = new Set<number>();
  return steps.filter((step) => {
    if (seen.has(step.kg) || step.kg <= 0) return false;
    seen.add(step.kg);
    return true;
  });
}

export function rampSteps(kind: RampKind, workKg: number): RampStep[] {
  if (!Number.isFinite(workKg) || workKg <= 0) return [];
  if (kind === "db") {
    const light = Math.max(5, roundPlate(workKg * 0.45));
    const mid = roundPlate(workKg * 0.7);
    return uniqueAscending(
      [
        light < workKg ? { kg: light, reps: "8" } : null,
        mid > light && mid < workKg ? { kg: mid, reps: "5" } : null,
      ].filter((step): step is RampStep => Boolean(step)),
    );
  }
  if (kind === "hinge") {
    return uniqueAscending(
      [
        { kg: roundPlate(workKg * 0.6), reps: "8" },
        { kg: roundPlate(workKg * 0.8), reps: "5" },
      ].filter((step) => step.kg < workKg - 1),
    );
  }
  if (kind === "machine") {
    return uniqueAscending(
      [
        { kg: roundPlate(workKg * 0.55), reps: "10" },
        { kg: roundPlate(workKg * 0.75), reps: "5" },
      ].filter((step) => step.kg < workKg - 1),
    );
  }
  if (kind === "row") {
    return uniqueAscending(
      [
        { kg: roundPlate(workKg * 0.5), reps: "8" },
        { kg: roundPlate(workKg * 0.7), reps: "5" },
        { kg: roundPlate(workKg - 7.5), reps: "2–3" },
      ].filter((step) => step.kg >= 15 && step.kg < workKg - 1),
    );
  }
  const bar = 20;
  const mid = roundPlate(workKg * 0.6);
  const heavy = roundPlate(workKg * 0.75);
  const last = roundPlate(workKg - (workKg >= 60 ? 5 : 7.5));
  return uniqueAscending(
    [
      { kg: bar, reps: workKg >= 50 ? "8–10" : "8" },
      mid > bar + 2 && mid < workKg ? { kg: mid, reps: "5" } : null,
      heavy > mid + 2 && heavy < workKg ? { kg: heavy, reps: "3" } : null,
      last > heavy + 1 && last < workKg ? { kg: last, reps: "1–2" } : null,
    ].filter((step): step is RampStep => Boolean(step)),
  );
}

export function rampForLift(id: string, kind: RampKind, workKg: number): RampStep[] {
  const preset = PRESET_RAMPS[id];
  if (preset && Math.abs(preset.work - workKg) < 1) return preset.steps;
  return rampSteps(kind, workKg);
}

export function workKgOf(exercise: { id: string; sets: LiftSet[] }) {
  const fromSets = workKgFromSets(exercise.sets);
  if (fromSets) return fromSets;
  const start = Number(STARTING_LOADS[exercise.id]?.kg);
  return Number.isFinite(start) && start > 0 ? start : null;
}

export function rampsForExercise(exercise: {
  id: string;
  name: string;
  kind: LiftKind;
  sets: LiftSet[];
}): RampStep[] {
  const kind = rampKindFor(exercise.id, exercise.name, exercise.kind);
  const kg = workKgOf(exercise);
  if (!kind || kg == null) return [];
  return rampForLift(exercise.id, kind, kg);
}

export function rampKindFor(id: string, name: string, kind: LiftKind): RampKind | null {
  if (kind !== "load") return null;
  const key = `${id} ${name}`.toLowerCase();
  if (/incline|haltère|dumbbell|db-bench/.test(key)) return "db";
  if (/rdl|romanian/.test(key)) return "hinge";
  if (/row|rowing/.test(key)) return "row";
  if (/bulgarian|fente/.test(key)) return "db";
  if (/squat|bench|deadlift|trap|soulevé/.test(key)) return "barbell";
  return "machine";
}

export function memoryKeys(slotId: string, catalogId: string | null, name: string) {
  return new Set([slotId, name, catalogId ?? "", ...(ALIASES[slotId] ?? [])].filter(Boolean));
}

function matches(exercise: SessionExerciseLog, slotId: string, catalogId: string | null, name: string) {
  const keys = memoryKeys(slotId, catalogId, name);
  return keys.has(exercise.id) || keys.has(exercise.name) || (exercise.catalogId ? keys.has(exercise.catalogId) : false);
}

export function findRememberedLift(
  sessions: SessionLog[],
  slotId: string,
  catalogId: string | null,
  name: string,
  exceptId?: string,
) {
  for (const session of sessions) {
    if (session.id === exceptId || !session.completed) continue;
    const found = session.exercises.find((exercise) => matches(exercise, slotId, catalogId, name));
    if (found) return found;
  }
  return null;
}

export function workKgFromSets(sets: LiftSet[]) {
  const values = sets
    .map((set) => Number(String(set.kg).replace(",", ".")))
    .filter((value) => Number.isFinite(value) && value > 0);
  return values[0] ?? null;
}
