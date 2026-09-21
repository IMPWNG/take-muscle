import { analyzeSession } from "../src/lib/analyze";
import type { SessionLog } from "../src/lib/types";

function set(partial: { kg?: string; reps?: string; seconds?: string; difficulty?: "easy" | "normal" | "hard"; done?: boolean }) {
  return {
    done: partial.done ?? true,
    kg: partial.kg ?? "",
    reps: partial.reps ?? "",
    seconds: partial.seconds ?? "",
    difficulty: partial.difficulty ?? null,
  };
}

const timed: SessionLog = {
  id: "s1",
  date: "2026-09-21",
  name: "Lower B",
  focus: "lower-b",
  completed: true,
  analysis: null,
  warmupDone: [],
  exercises: [
    {
      id: "lb-copenhagen",
      catalogId: "1775",
      name: "Copenhagen plank",
      kind: "timed",
      sets: [set({ seconds: "20", difficulty: "hard" }), set({ seconds: "18", difficulty: "hard" }), set({ seconds: "15", difficulty: "hard" })],
    },
  ],
};

const benchEasy: SessionLog = {
  id: "s2",
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
      sets: [
        set({ kg: "60", reps: "8", difficulty: "easy" }),
        set({ kg: "60", reps: "8", difficulty: "easy" }),
        set({ kg: "60", reps: "8", difficulty: "easy" }),
        set({ kg: "60", reps: "8", difficulty: "easy" }),
      ],
    },
  ],
};

const benchHard: SessionLog = {
  ...benchEasy,
  id: "s3",
  exercises: [
    {
      id: "ua-bench",
      catalogId: "0025",
      name: "Bench press",
      kind: "load",
      sets: [
        set({ kg: "80", reps: "5", difficulty: "hard" }),
        set({ kg: "80", reps: "4", difficulty: "hard" }),
        set({ kg: "80", reps: "4", difficulty: "hard" }),
        set({ kg: "80", reps: "3", difficulty: "hard" }),
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
console.log("ok");
