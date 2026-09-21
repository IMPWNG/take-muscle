import type { AdjustmentChange, SessionAnalysis, SessionLog } from "./types";
import { liftByName, templateById } from "./workouts";

const ALLOWED = new Set<AdjustmentChange>([
  "add_weight",
  "drop_weight",
  "add_reps",
  "drop_reps",
  "add_time",
  "drop_time",
  "keep",
]);

export function reviewSystem(locale: "fr" | "en" | "zh") {
  const langRule =
    locale === "en"
      ? "Write summary, exercise, amount, and reason in clear English."
      : locale === "zh"
        ? "summary、exercise、amount 和 reason 用简洁的简体中文写。动作名可保留常用英文。"
        : "Écris summary, exercise, amount et reason en français, direct, précis, sans marketing.";

  return `Tu es le coach musculation de Take Muscle. Tu lis UNE séance déjà faite et tu prescris la séance IDENTIQUE suivante.

Athlète : homme, 1,92 m, bulk 83 → 90 kg, Upper/Lower 4 jours, 1–3 reps en réserve. Jamais un lourd à l’échec.

Tu dois t’aligner SUR CE QUI EST NOTÉ, pas sur un programme théorique.
Chaque série a : kg, reps, seconds, difficulty (easy | normal | hard).
Chaque mouvement a un kind : load | bodyweight | timed.

Règles d’effort (prioritaires) :
- hard = trop difficile. INTERDIT d’ajouter. Si reps/temps sous le bas de fourchette → drop. Sinon → keep.
- easy + toutes les séries au haut de fourchette, propres → add (poids, reps ou temps selon kind).
- normal + haut de fourchette → petit add. normal + encore dans la fourchette → add_reps (load/bodyweight) ou keep (timed).
- Séries manquantes → keep.

kind = timed (holds : Copenhagen, side plank, etc.) :
- La métrique est seconds. JAMAIS de kg. JAMAIS de reps.
- change uniquement add_time | drop_time | keep.
- amount uniquement du temps : "+5 s", "−5 s", "identique".
- Si l’athlète a noté 20 s dur, tu ne parles PAS de 20 kg ni de 20 reps.

kind = bodyweight (tractions, ab wheel…) :
- La métrique est reps. kg seulement si l’athlète a noté un lest > 0.
- N’invente pas une charge. Si kg est vide, ne propose pas +2,5 kg.

kind = load :
- Métrique : kg + reps.
- Haut de fourchette partout, pas hard → +2,5 kg si ≥ 20 kg, sinon +1–2 kg.
- Encore dans la fourchette → +1–2 reps, PAS le poids.
- Charge en baisse vs previous → drop_weight ou keep.

Autres :
- Squat, RDL, deadlift, hip thrust, row : conservateur.
- Cou : toujours keep, très léger.
- amount doit coller au change. Raison : une phrase liée AUX CHIFFRES NOTÉS (kg/reps/s + tampon).

${langRule}

Réponds UNIQUEMENT avec un JSON :
{
  "summary": "2–4 phrases. Ce qui s’est passé, plan pour la prochaine séance identique.",
  "adjustments": [
    {
      "key": "id exact du mouvement",
      "exercise": "nom",
      "change": "add_weight" | "drop_weight" | "add_reps" | "drop_reps" | "add_time" | "drop_time" | "keep",
      "amount": "ex. +2,5 kg | +1–2 reps | +5 s | identique",
      "reason": "une phrase liée aux séries notées"
    }
  ]
}
Un objet par exercice, dans le même ordre. Pas de markdown.`;
}

export function parseAnalysis(content: string, session: SessionLog): SessionAnalysis {
  const match = content.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("JSON introuvable");
  const raw = JSON.parse(match[0]) as Partial<SessionAnalysis>;
  if (!raw.summary || !Array.isArray(raw.adjustments)) {
    throw new Error("Analyse incomplète");
  }
  const byKey = new Map(session.exercises.map((exercise) => [exercise.id, exercise]));
  const byName = new Map(session.exercises.map((exercise) => [exercise.name, exercise]));
  const adjustments = raw.adjustments.map((item, index) => {
    const fallback = session.exercises[index];
    const matched =
      (item.key ? byKey.get(item.key) : undefined) ??
      byName.get(item.exercise) ??
      fallback;
    let change: AdjustmentChange =
      item.change && ALLOWED.has(item.change) ? item.change : "keep";
    let amount = String(item.amount ?? "identique");
    let reason = String(item.reason ?? "");
    if (matched?.kind === "timed") {
      if (change === "add_weight" || change === "add_reps") change = "add_time";
      if (change === "drop_weight" || change === "drop_reps") change = "drop_time";
      if (/kg|rep/i.test(amount)) {
        amount = change === "drop_time" ? "−5 s" : change === "add_time" ? "+5 s" : "identique";
      }
      if (/kg|\breps?\b/i.test(reason)) {
        reason = reason
          .replace(/\b\d+(?:[.,]\d+)?\s*kg\b/gi, "")
          .replace(/\b\d+\s*reps?\b/gi, (chunk) => chunk.replace(/reps?/i, "s"))
          .replace(/\s{2,}/g, " ")
          .trim();
      }
    }
    if (matched?.kind !== "timed" && (change === "add_time" || change === "drop_time")) {
      change = change === "add_time" ? "add_reps" : "keep";
    }
    return {
      key: matched?.id ?? item.key ?? fallback?.id ?? "",
      exercise: String(item.exercise ?? matched?.name ?? ""),
      change,
      amount,
      reason,
    };
  });
  return {
    summary: String(raw.summary),
    source: "mammouth",
    adjustments,
  };
}

function setPayload(set: SessionLog["exercises"][number]["sets"][number], kind: SessionLog["exercises"][number]["kind"], index: number) {
  if (kind === "timed") {
    return {
      set: index + 1,
      seconds: set.seconds || null,
      difficulty: set.difficulty,
      done: set.done,
    };
  }
  if (kind === "bodyweight") {
    return {
      set: index + 1,
      reps: set.reps || null,
      addedKg: set.kg || null,
      difficulty: set.difficulty,
      done: set.done,
    };
  }
  return {
    set: index + 1,
    kg: set.kg || null,
    reps: set.reps || null,
    difficulty: set.difficulty,
    done: set.done,
  };
}

export function sessionReviewPayload(session: SessionLog, previous: SessionLog | null) {
  const template = templateById(session.focus);
  return {
    athlete: {
      heightCm: 192,
      startKg: 83,
      targetKg: 90,
      split: "Upper/Lower 4 days",
      rir: "1–3",
    },
    session: {
      name: session.name,
      focus: session.focus,
      date: session.date,
      exercises: session.exercises.map((exercise) => {
        const meta =
          template?.exercises.find((item) => item.id === exercise.id) ??
          template?.exercises.find((item) => item.name === exercise.name) ??
          liftByName(exercise.name);
        return {
          key: exercise.id,
          name: exercise.name,
          kind: exercise.kind,
          prescription: meta?.prescription ?? null,
          catalogId: exercise.catalogId,
          sets: exercise.sets.map((set, index) => setPayload(set, exercise.kind, index)),
        };
      }),
    },
    previous: previous
      ? {
          date: previous.date,
          exercises: previous.exercises.map((exercise) => ({
            key: exercise.id,
            name: exercise.name,
            kind: exercise.kind,
            sets: exercise.sets.map((set, index) => setPayload(set, exercise.kind, index)),
          })),
        }
      : null,
  };
}
