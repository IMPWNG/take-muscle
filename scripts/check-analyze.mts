import { analyzeSession, seedSetsFromPrevious } from "../src/lib/analyze";
import { phaseFor, programWeek, scaleTemplate, setFactor } from "../src/lib/cycle";
import { rampForLift, rampsForExercise, STARTING_LOADS } from "../src/lib/loads";
import type { SessionLog } from "../src/lib/types";
import { templateById } from "../src/lib/workouts";

function set(partial: {
  kg?: string;
  reps?: string;
  seconds?: string;
  difficulty?: "easy" | "normal" | "hard";
  done?: boolean;
}) {
  return {
    done: partial.done ?? true,
    kg: partial.kg ?? "",
    reps: partial.reps ?? "",
    seconds: partial.seconds ?? "",
    difficulty: partial.difficulty ?? null,
  };
}

const squatRamp = rampForLift("sa-squat", "barbell", 65);
if (squatRamp.map((step) => step.kg).join(",") !== "20,40,50,60") {
  throw new Error(`squat ramp ${JSON.stringify(squatRamp)}`);
}
const benchRamp = rampForLift("sb-bench", "barbell", 55);
if (benchRamp.map((step) => step.kg).join(",") !== "20,30,40,47.5") {
  throw new Error(`bench ramp ${JSON.stringify(benchRamp)}`);
}
const squatFromStart = rampsForExercise({
  id: "sa-squat",
  name: "Back squat",
  kind: "load",
  sets: [set({ kg: "", done: false })],
});
if (squatFromStart.map((step) => `${step.kg}×${step.reps}`).join(" → ") !== "20×8–10 → 40×5 → 50×3 → 60×1–2") {
  throw new Error(`squat warmup series ${JSON.stringify(squatFromStart)}`);
}

if (setFactor(4) !== 0.5 || setFactor(12) !== 0.65 || setFactor(2) !== 1) {
  throw new Error("deload/taper factors");
}
const sessionA = templateById("session-a");
if (!sessionA) throw new Error("missing session-a");
if (scaleTemplate(sessionA, 4).exercises[0].sets !== 2) {
  throw new Error("deload squat sets");
}

const oldBench: SessionLog = {
  id: "old",
  date: "2026-09-21",
  name: "Upper A",
  focus: "upper-a",
  completed: true,
  analysis: null,
  warmupDone: [],
  exercises: [
    {
      id: "ua-bench",
      catalogId: "0025",
      name: "Bench press",
      kind: "load",
      sets: [set({ kg: "60", reps: "8", difficulty: "easy" })],
    },
  ],
};

const seeded = seedSetsFromPrevious(
  { id: "sb-bench", catalogId: "0025", name: "Bench press", kind: "load", sets: 4 },
  null,
  [oldBench],
  "fr",
);
if (seeded[0].kg !== "60") throw new Error(`memory seed got ${seeded[0].kg}`);
if (seeded[0].kg === STARTING_LOADS["sb-bench"]?.kg) {
  throw new Error("history should beat starting load");
}

const timed: SessionLog = {
  id: "s1",
  date: "2026-10-04",
  name: "Séance A",
  focus: "session-a",
  completed: true,
  analysis: null,
  warmupDone: [],
  exercises: [
    {
      id: "sa-plank",
      catalogId: "0464",
      name: "Gainage",
      kind: "timed",
      sets: [
        set({ seconds: "20", difficulty: "hard" }),
        set({ seconds: "18", difficulty: "hard" }),
        set({ seconds: "15", difficulty: "hard" }),
      ],
    },
  ],
};

const benchEasy: SessionLog = {
  id: "s2",
  date: "2026-10-04",
  name: "Séance B",
  focus: "session-b",
  completed: true,
  analysis: null,
  warmupDone: [],
  exercises: [
    {
      id: "sb-bench",
      catalogId: "0025",
      name: "Bench press",
      kind: "load",
      sets: [
        set({ kg: "55", reps: "6", difficulty: "easy" }),
        set({ kg: "55", reps: "6", difficulty: "easy" }),
        set({ kg: "55", reps: "6", difficulty: "easy" }),
        set({ kg: "55", reps: "6", difficulty: "easy" }),
      ],
    },
  ],
};

const benchHard: SessionLog = {
  ...benchEasy,
  id: "s3",
  exercises: [
    {
      id: "sb-bench",
      catalogId: "0025",
      name: "Bench press",
      kind: "load",
      sets: [
        set({ kg: "70", reps: "4", difficulty: "hard" }),
        set({ kg: "70", reps: "3", difficulty: "hard" }),
        set({ kg: "70", reps: "3", difficulty: "hard" }),
        set({ kg: "70", reps: "3", difficulty: "hard" }),
      ],
    },
  ],
};

for (const session of [timed, benchEasy, benchHard]) {
  const result = analyzeSession(session, null, "fr");
  const adj = result.adjustments[0];
  console.log(session.exercises[0].name, adj.change, adj.amount, "|", adj.reason);
  if (session.exercises[0].kind === "timed" && adj.change !== "drop_time" && adj.change !== "add_time" && adj.change !== "keep") {
    throw new Error("timed analysis used a load change");
  }
  if (session.exercises[0].kind === "timed" && /(kg|reps)/i.test(adj.amount)) {
    throw new Error("timed amount mentioned kg/reps");
  }
}

const easyAdj = analyzeSession(benchEasy, null, "fr").adjustments[0];
if (easyAdj.change !== "add_weight") throw new Error(`easy bench should add_weight, got ${easyAdj.change}`);
const hardAdj = analyzeSession(benchHard, null, "fr").adjustments[0];
if (hardAdj.change !== "drop_weight") throw new Error(`hard bench should drop_weight, got ${hardAdj.change}`);

const week = programWeek([
  { ...benchEasy, date: "2026-10-04", focus: "session-b", completed: true },
], "2026-10-04");
if (week !== 1) throw new Error(`week ${week}`);
if (phaseFor(4) !== "deload" || phaseFor(12) !== "taper") throw new Error("phases");

console.log("ok");
