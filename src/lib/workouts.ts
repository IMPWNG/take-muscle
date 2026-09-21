import type { LiftKind, WorkoutTemplate } from "./types";

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

function lift(
  id: string,
  catalogId: string | null,
  name: string,
  kind: LiftKind,
  sets: number,
  prescription: string,
  restSeconds: number,
  notes: string,
) {
  return { id, catalogId, name, kind, sets, prescription, restSeconds, notes };
}

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
      lift(
        "ua-bench",
        "0025",
        "Bench press",
        "load",
        4,
        "5–8",
        150,
        "1–3 reps en réserve. Contrôle la descente. Quand les 4 séries atteignent 8 reps propres : +2,5–5 %.",
      ),
      lift(
        "ua-pullup",
        "0652",
        "Tractions pronation ou tirage vertical",
        "bodyweight",
        4,
        "6–10",
        150,
        "Poitrine haute, pas de balancier. Si les tractions n’atteignent pas 6 reps : tirage vertical. Lest optionnel.",
      ),
      lift(
        "ua-row",
        "0049",
        "Rowing poitrine soutenue",
        "load",
        3,
        "8–12",
        90,
        "Poitrine collée au banc. Tire vers le bas des côtes. 1–3 reps en réserve.",
      ),
      lift(
        "ua-incline",
        "0314",
        "Développé incliné haltères",
        "load",
        3,
        "8–12",
        90,
        "Banc à 30°. Contrôle la descente. 1–3 reps en réserve.",
      ),
      lift(
        "ua-lat",
        "0334",
        "Élévations latérales",
        "load",
        3,
        "12–20",
        60,
        "Coudes légèrement pliés. Pas d’élan du buste. Stoppe 1–2 reps avant l’échec.",
      ),
      lift(
        "ua-curl",
        "0294",
        "Curl haltères",
        "load",
        3,
        "8–12",
        75,
        "Coudes stables, pas de balancier. Stoppe 1–2 reps avant l’échec.",
      ),
      lift(
        "ua-pushdown",
        "0201",
        "Extension triceps poulie",
        "load",
        3,
        "10–15",
        75,
        "Coudes collés au corps. Extension complète. Stoppe 1–2 reps avant l’échec.",
      ),
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
      lift(
        "la-squat",
        "0043",
        "Back squat",
        "load",
        4,
        "5–8",
        180,
        "1–3 reps en réserve. Barre haute ou basse, genoux dans l’axe. Si le squat barre est inconfortable : presse à cuisses.",
      ),
      lift(
        "la-rdl",
        "0085",
        "Romanian deadlift",
        "load",
        3,
        "6–10",
        150,
        "Hanche en arrière, dos plat. Charge déjà les lombaires : 2–3 reps en réserve, jamais à l’échec.",
      ),
      lift(
        "la-hack",
        "0743",
        "Hack squat",
        "load",
        3,
        "8–12",
        120,
        "Amplitude complète, genoux dans l’axe. Si pas de hack squat : presse à cuisses.",
      ),
      lift(
        "la-curl",
        "0586",
        "Leg curl",
        "load",
        3,
        "10–15",
        75,
        "Contrôle la descente, 2 s. Stoppe 1–2 reps avant l’échec.",
      ),
      lift(
        "la-calf",
        "1372",
        "Mollets debout",
        "load",
        4,
        "8–15",
        45,
        "Pause 1 s en bas et en haut. Amplitude complète.",
      ),
      lift(
        "la-abs",
        "0857",
        "Ab wheel ou relevés de jambes",
        "bodyweight",
        3,
        "8–15",
        60,
        "Anti-extension : bassin serré, pas de dos creux. Si trop dur : relevés de jambes.",
      ),
      lift(
        "la-neck",
        "1403",
        "Neck flexion / extension",
        "load",
        2,
        "15–20",
        45,
        "Charge très légère. Lent, 15–20 reps, sans douleur, sans à-coups.",
      ),
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
      lift(
        "ub-ohp",
        "1456",
        "Overhead press",
        "load",
        4,
        "5–8",
        150,
        "Fessiers serrés, pas de cambrure. 1–3 reps en réserve.",
      ),
      lift(
        "ub-pullup",
        "0651",
        "Tractions prise neutre",
        "bodyweight",
        3,
        "6–10",
        150,
        "Prise marteau. Si tu n’atteins pas 6 reps : tirage prise neutre. Lest optionnel.",
      ),
      lift(
        "ub-row",
        "0027",
        "Rowing barre ou machine",
        "load",
        3,
        "8–12",
        90,
        "Torse stable, coudes près du corps, dos plat. 1–3 reps en réserve.",
      ),
      lift(
        "ub-db-bench",
        "0289",
        "Développé couché haltères",
        "load",
        3,
        "8–12",
        90,
        "Plus léger que le bench du lundi. Contrôle la descente. 1–3 reps en réserve.",
      ),
      lift(
        "ub-fly",
        "0171",
        "Cable fly",
        "load",
        3,
        "12–15",
        60,
        "Arc contrôlé, coudes légèrement pliés. Stoppe 1–2 reps avant l’échec.",
      ),
      lift(
        "ub-rear-fly",
        "0383",
        "Reverse fly",
        "load",
        3,
        "15–20",
        60,
        "Épaules arrière, pour équilibrer le développé. Stoppe 1–2 reps avant l’échec.",
      ),
      lift(
        "ub-curl",
        "0318",
        "Curl incliné",
        "load",
        3,
        "10–15",
        75,
        "Banc incliné, bras en arrière, pas d’élan. Stoppe 1–2 reps avant l’échec.",
      ),
      lift(
        "ub-pushdown",
        "0201",
        "Triceps pushdown",
        "load",
        3,
        "10–15",
        75,
        "Coudes fixes. Corde ou barre. Stoppe 1–2 reps avant l’échec.",
      ),
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
      lift(
        "lb-dl",
        "0032",
        "Deadlift classique ou trap-bar",
        "load",
        3,
        "3–6",
        180,
        "Technique propre. Trap-bar si le bas du dos fatigue. 2–3 reps en réserve, jamais à l’échec.",
      ),
      lift(
        "lb-front",
        "0042",
        "Front squat ou hack squat",
        "load",
        3,
        "6–10",
        150,
        "Plus léger que le squat du mardi. Torse droit. 1–3 reps en réserve.",
      ),
      lift(
        "lb-bulgarian",
        "0410",
        "Bulgarian split squat",
        "load",
        3,
        "8–12 / jambe",
        90,
        "Genou avant dans l’axe. Haltères aux côtés. Stoppe 1–2 reps avant l’échec.",
      ),
      lift(
        "lb-hip",
        "1409",
        "Hip thrust",
        "load",
        3,
        "8–12",
        90,
        "Pause 1 s en haut. Charge contrôlée : les lombaires sont déjà fatigués.",
      ),
      lift(
        "lb-curl",
        "0586",
        "Leg curl",
        "load",
        3,
        "10–15",
        75,
        "Contrôle la descente, 2 s. Stoppe 1–2 reps avant l’échec.",
      ),
      lift(
        "lb-calf",
        "1379",
        "Mollets assis",
        "load",
        4,
        "12–20",
        45,
        "Soléaire. Pause 1 s en bas. Amplitude complète.",
      ),
      lift(
        "lb-copenhagen",
        "1775",
        "Copenhagen plank",
        "timed",
        3,
        "20–40 s / côté",
        45,
        "Stabilité latérale. Genou sur le banc pour commencer, cheville plus tard. Logue le temps tenu, pas un poids.",
      ),
      lift(
        "lb-side",
        "3544",
        "Side plank ou Pallof press",
        "timed",
        3,
        "20–40 s",
        45,
        "Anti-rotation. Pallof si le side plank irrite l’épaule. Logue le temps tenu.",
      ),
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
    seconds: "",
    difficulty: null as null,
  }));
}

export function liftById(id: string) {
  for (const template of TEMPLATES) {
    const found = template.exercises.find((item) => item.id === id);
    if (found) return found;
  }
  return null;
}

export function liftByName(name: string) {
  for (const template of TEMPLATES) {
    const found = template.exercises.find((item) => item.name === name);
    if (found) return found;
  }
  return null;
}
