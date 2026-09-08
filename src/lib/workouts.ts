import type { WorkoutTemplate } from "./types";

export const WEEKLY_SPLIT: {
  day: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  templateId: string | null;
  note: "walk" | "restSmoothie" | "optional" | "rest" | "restBack";
}[] = [
  { day: "mon", templateId: "upper-a", note: "walk" },
  { day: "tue", templateId: "lower-a", note: "walk" },
  { day: "wed", templateId: null, note: "restBack" },
  { day: "thu", templateId: "upper-b", note: "walk" },
  { day: "fri", templateId: "lower-b", note: "walk" },
  { day: "sat", templateId: null, note: "rest" },
  { day: "sun", templateId: null, note: "rest" },
];

export const TEMPLATES: WorkoutTemplate[] = [
  {
    id: "upper-a",
    name: "Upper A",
    focus: "Poussée et tirage : développé, tractions, épaules",
    durationMin: 80,
    warmup: [
      { id: "ua-pulse" },
      { id: "ua-shoulders" },
      { id: "ua-scap" },
      { id: "ua-cuff" },
      { id: "ua-ramp" },
    ],
    exercises: [
      {
        name: "Bench press",
        sets: 4,
        reps: "5–8",
        restSeconds: 150,
        notes: "1–3 reps en réserve. Contrôle la descente. Quand les 4 séries atteignent 8 reps propres : +2,5–5 %.",
      },
      {
        name: "Tractions pronation ou tirage vertical",
        sets: 4,
        reps: "6–10",
        restSeconds: 150,
        notes: "Poitrine haute, pas de balancier. Si les tractions n’atteignent pas 6 reps : tirage vertical.",
      },
      {
        name: "Rowing poitrine soutenue",
        sets: 3,
        reps: "8–12",
        restSeconds: 90,
        notes: "Poitrine collée au banc. Tire vers le bas des côtes. 1–3 reps en réserve.",
      },
      {
        name: "Développé incliné haltères",
        sets: 3,
        reps: "8–12",
        restSeconds: 90,
        notes: "Banc à 30°. Contrôle la descente. 1–3 reps en réserve.",
      },
      {
        name: "Élévations latérales",
        sets: 3,
        reps: "12–20",
        restSeconds: 60,
        notes: "Coudes légèrement pliés. Pas d’élan du buste. Stoppe 1–2 reps avant l’échec.",
      },
      {
        name: "Curl haltères",
        sets: 3,
        reps: "8–12",
        restSeconds: 75,
        notes: "Coudes stables, pas de balancier. Stoppe 1–2 reps avant l’échec.",
      },
      {
        name: "Extension triceps poulie",
        sets: 3,
        reps: "10–15",
        restSeconds: 75,
        notes: "Coudes collés au corps. Extension complète. Stoppe 1–2 reps avant l’échec.",
      },
    ],
  },
  {
    id: "lower-a",
    name: "Lower A",
    focus: "Force des jambes : squat, ischios, mollets",
    durationMin: 85,
    warmup: [
      { id: "la-pulse" },
      { id: "la-hips" },
      { id: "la-glutes" },
      { id: "la-pattern" },
      { id: "la-ramp" },
    ],
    exercises: [
      {
        name: "Back squat",
        sets: 4,
        reps: "5–8",
        restSeconds: 180,
        notes: "1–3 reps en réserve. Barre haute ou basse, genoux dans l’axe. Si le squat barre est inconfortable : presse à cuisses.",
      },
      {
        name: "Romanian deadlift",
        sets: 3,
        reps: "6–10",
        restSeconds: 150,
        notes: "Hanche en arrière, dos plat. Charge déjà les lombaires : 2–3 reps en réserve, jamais à l’échec.",
      },
      {
        name: "Hack squat",
        sets: 3,
        reps: "8–12",
        restSeconds: 120,
        notes: "Amplitude complète, genoux dans l’axe. Si pas de hack squat : presse à cuisses.",
      },
      {
        name: "Leg curl",
        sets: 3,
        reps: "10–15",
        restSeconds: 75,
        notes: "Contrôle la descente, 2 s. Stoppe 1–2 reps avant l’échec.",
      },
      {
        name: "Mollets debout",
        sets: 4,
        reps: "8–15",
        restSeconds: 45,
        notes: "Pause 1 s en bas et en haut. Amplitude complète.",
      },
      {
        name: "Ab wheel ou relevés de jambes",
        sets: 3,
        reps: "8–15",
        restSeconds: 60,
        notes: "Anti-extension : bassin serré, pas de dos creux. Si trop dur : relevés de jambes.",
      },
      {
        name: "Neck flexion / extension",
        sets: 2,
        reps: "15–20",
        restSeconds: 45,
        notes: "Charge très légère. Lent, 15–20 reps, sans douleur, sans à-coups.",
      },
    ],
  },
  {
    id: "upper-b",
    name: "Upper B",
    focus: "Épaules, dos, développé haltères",
    durationMin: 80,
    warmup: [
      { id: "ub-pulse" },
      { id: "ub-slides" },
      { id: "ub-cuff" },
      { id: "ub-rear" },
      { id: "ub-ramp" },
    ],
    exercises: [
      {
        name: "Overhead press",
        sets: 4,
        reps: "5–8",
        restSeconds: 150,
        notes: "Fessiers serrés, pas de cambrure. 1–3 reps en réserve.",
      },
      {
        name: "Tractions prise neutre",
        sets: 3,
        reps: "6–10",
        restSeconds: 150,
        notes: "Prise marteau. Si tu n’atteins pas 6 reps : tirage prise neutre.",
      },
      {
        name: "Rowing barre ou machine",
        sets: 3,
        reps: "8–12",
        restSeconds: 90,
        notes: "Torse stable, coudes près du corps, dos plat. 1–3 reps en réserve.",
      },
      {
        name: "Développé couché haltères",
        sets: 3,
        reps: "8–12",
        restSeconds: 90,
        notes: "Plus léger que le bench du lundi. Contrôle la descente. 1–3 reps en réserve.",
      },
      {
        name: "Cable fly",
        sets: 3,
        reps: "12–15",
        restSeconds: 60,
        notes: "Arc contrôlé, coudes légèrement pliés. Stoppe 1–2 reps avant l’échec.",
      },
      {
        name: "Reverse fly",
        sets: 3,
        reps: "15–20",
        restSeconds: 60,
        notes: "Épaules arrière, pour équilibrer le développé. Stoppe 1–2 reps avant l’échec.",
      },
      {
        name: "Curl incliné",
        sets: 3,
        reps: "10–15",
        restSeconds: 75,
        notes: "Banc incliné, bras en arrière, pas d’élan. Stoppe 1–2 reps avant l’échec.",
      },
      {
        name: "Triceps pushdown",
        sets: 3,
        reps: "10–15",
        restSeconds: 75,
        notes: "Coudes fixes. Corde ou barre. Stoppe 1–2 reps avant l’échec.",
      },
    ],
  },
  {
    id: "lower-b",
    name: "Lower B",
    focus: "Deadlift, jambes unilatérales, gainage",
    durationMin: 90,
    warmup: [
      { id: "lb-pulse" },
      { id: "lb-hinge" },
      { id: "lb-glutes" },
      { id: "lb-adductor" },
      { id: "lb-ramp" },
    ],
    exercises: [
      {
        name: "Deadlift classique ou trap-bar",
        sets: 3,
        reps: "3–6",
        restSeconds: 180,
        notes: "Technique propre. Trap-bar si le bas du dos fatigue. 2–3 reps en réserve, jamais à l’échec.",
      },
      {
        name: "Front squat ou hack squat",
        sets: 3,
        reps: "6–10",
        restSeconds: 150,
        notes: "Plus léger que le squat du mardi. Torse droit. 1–3 reps en réserve.",
      },
      {
        name: "Bulgarian split squat",
        sets: 3,
        reps: "8–12 / jambe",
        restSeconds: 90,
        notes: "Genou avant dans l’axe. Haltères aux côtés. Stoppe 1–2 reps avant l’échec.",
      },
      {
        name: "Hip thrust",
        sets: 3,
        reps: "8–12",
        restSeconds: 90,
        notes: "Pause 1 s en haut. Charge contrôlée : les lombaires sont déjà fatigués.",
      },
      {
        name: "Leg curl",
        sets: 3,
        reps: "10–15",
        restSeconds: 75,
        notes: "Contrôle la descente, 2 s. Stoppe 1–2 reps avant l’échec.",
      },
      {
        name: "Mollets assis",
        sets: 4,
        reps: "12–20",
        restSeconds: 45,
        notes: "Soléaire. Pause 1 s en bas. Amplitude complète.",
      },
      {
        name: "Copenhagen plank",
        sets: 3,
        reps: "20–40 s / côté",
        restSeconds: 45,
        notes: "Stabilité latérale. Genou sur le banc pour commencer, cheville plus tard.",
      },
      {
        name: "Side plank ou Pallof press",
        sets: 3,
        reps: "20–40 s",
        restSeconds: 45,
        notes: "Anti-rotation. Pallof si le side plank irrite l’épaule.",
      },
    ],
  },
];

export function templateById(id: string) {
  return TEMPLATES.find((item) => item.id === id);
}

export function warmupFor(templateId: string) {
  return templateById(templateId)?.warmup ?? [];
}

export function emptySets(count: number) {
  return Array.from({ length: count }, () => ({
    done: false,
    kg: "",
    reps: "",
  }));
}
