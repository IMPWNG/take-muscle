import type { SessionAdjustment, SessionAnalysis, SessionLog } from "./types";

export function reviewSystem(locale: "fr" | "en" | "zh") {
  const langRule =
    locale === "en"
      ? "Write summary, exercise names, amount, and reason in clear English."
      : locale === "zh"
        ? "summary、exercise、amount 和 reason 用简洁的简体中文写。动作名可保留常用英文。"
        : "Écris summary, exercise, amount et reason en français, direct, sans marketing.";

  return `Tu es le coach de progression de Take Muscle. Tu ne discutes pas. Tu lis une séance déjà faite et tu dis quoi changer la prochaine fois.

Athlète : homme, 1,92 m, 83 → 90 kg, Upper/Lower 4 jours.
Règles :
- 1–3 reps en réserve. Jamais pousser un lourd à l’échec.
- Facile + haut de la fourchette de reps sur toutes les séries → +2,5 à 5 % de charge.
- Facile mais reps encore bas dans la fourchette → d’abord + reps, pas le poids.
- Normal → garder, ou + petite charge seulement si toutes les séries sont au plafond propre.
- Dur → garder ou −2,5 à 5 %. Ne jamais ajouter.
- Squat, RDL, deadlift, hip thrust, rowing : rester conservateur (lombaires déjà chargés).
- Cou : toujours très léger. Si dur, baisser.
- ${langRule}

Réponds UNIQUEMENT avec un JSON :
{
  "summary": "2–4 phrases. Ce qui s’est passé, et le plan pour la prochaine séance identique.",
  "adjustments": [
    {
      "exercise": "nom exact de l’exercice",
      "change": "add_weight" | "drop_weight" | "add_reps" | "drop_reps" | "keep",
      "amount": "ex. +2,5 kg" | "ex. +1–2 reps" | "identique",
      "reason": "une phrase, liée à facile/normal/dur et aux séries notées"
    }
  ]
}
Un objet par exercice de la séance. Pas de markdown.`;
}

export function parseAnalysis(content: string): SessionAnalysis {
  const match = content.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("JSON introuvable");
  const raw = JSON.parse(match[0]) as Partial<SessionAnalysis>;
  if (!raw.summary || !Array.isArray(raw.adjustments)) {
    throw new Error("Analyse incomplète");
  }
  const allowed = new Set<SessionAdjustment["change"]>([
    "add_weight",
    "drop_weight",
    "add_reps",
    "drop_reps",
    "keep",
  ]);
  return {
    summary: String(raw.summary),
    adjustments: raw.adjustments.map((item) => {
      const change = item.change;
      return {
        exercise: String(item.exercise ?? ""),
        change: change && allowed.has(change) ? change : "keep",
        amount: String(item.amount ?? "identique"),
        reason: String(item.reason ?? ""),
      };
    }),
  };
}

export function sessionReviewPayload(session: SessionLog, previous: SessionLog | null) {
  return {
    session: {
      name: session.name,
      focus: session.focus,
      date: session.date,
      exercises: session.exercises.map((exercise) => ({
        name: exercise.name,
        difficulty: exercise.difficulty ?? "normal",
        sets: exercise.sets.map((set, index) => ({
          set: index + 1,
          kg: set.kg,
          reps: set.reps,
          done: set.done,
        })),
      })),
    },
    previous: previous
      ? {
          date: previous.date,
          exercises: previous.exercises.map((exercise) => ({
            name: exercise.name,
            difficulty: exercise.difficulty,
            sets: exercise.sets.map((set) => ({ kg: set.kg, reps: set.reps })),
          })),
        }
      : null,
  };
}
