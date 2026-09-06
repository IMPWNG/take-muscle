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
    focus: "Poitrine, dos, épaules",
    durationMin: 70,
    exercises: [
      {
        name: "Bench press",
        sets: 4,
        reps: "5–8",
        restSeconds: 150,
        notes: "1–3 reps en réserve. +2,5–5 % quand tu fais 8 propre sur toutes les séries.",
      },
      {
        name: "Tractions pronation ou tirage vertical",
        sets: 4,
        reps: "6–10",
        restSeconds: 150,
        notes: "Si les tractions sont trop dures : tirage vertical. Poitrine haute, pas de balancier.",
      },
      {
        name: "Rowing poitrine soutenue",
        sets: 3,
        reps: "8–12",
        restSeconds: 90,
        notes: "Poitrine collée au banc. Tire vers le bas des côtes.",
      },
      {
        name: "Développé incliné haltères",
        sets: 3,
        reps: "8–12",
        restSeconds: 90,
        notes: "Banc à 30°. Contrôle la descente.",
      },
      {
        name: "Élévations latérales",
        sets: 3,
        reps: "12–20",
        restSeconds: 60,
        notes: "Coudes légèrement pliés. Pas d’élan du buste.",
      },
      {
        name: "Curl haltères",
        sets: 3,
        reps: "8–12",
        restSeconds: 75,
        notes: "Coudes stables. Pas de balancier.",
      },
      {
        name: "Extension triceps poulie",
        sets: 3,
        reps: "10–15",
        restSeconds: 75,
        notes: "Coudes collés au corps. Extension complète.",
      },
    ],
  },
  {
    id: "lower-a",
    name: "Lower A",
    focus: "Force et base : squats, ischios, mollets",
    durationMin: 75,
    exercises: [
      {
        name: "Back squat",
        sets: 4,
        reps: "5–8",
        restSeconds: 180,
        notes: "1–3 reps en réserve. Barre basse ou haute, genoux dans l’axe. Base pour plus tard.",
      },
      {
        name: "Romanian deadlift",
        sets: 3,
        reps: "6–10",
        restSeconds: 150,
        notes: "Hanche en arrière, dos plat. Travaille déjà les lombaires : ne va pas à l’échec.",
      },
      {
        name: "Hack squat",
        sets: 3,
        reps: "8–12",
        restSeconds: 120,
        notes: "Amplitude complète. Si pas de hack : presse à cuisses.",
      },
      {
        name: "Leg curl",
        sets: 3,
        reps: "10–15",
        restSeconds: 75,
        notes: "Contrôle la descente. Ischios pour une chaîne postérieure solide.",
      },
      {
        name: "Mollets debout",
        sets: 4,
        reps: "8–15",
        restSeconds: 45,
        notes: "Pause 1 s en bas et en haut.",
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
        notes: "Charge très légère. Lent, sans douleur, sans à-coups. Cou de grand gabarit : on construit doucement.",
      },
    ],
  },
  {
    id: "upper-b",
    name: "Upper B",
    focus: "Dos et épaules",
    durationMin: 70,
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
        notes: "Prise marteau. Si trop dur : tirage prise neutre.",
      },
      {
        name: "Rowing barre ou machine",
        sets: 3,
        reps: "8–12",
        restSeconds: 90,
        notes: "Torse stable. Coudes le long du corps. Dos plat.",
      },
      {
        name: "Développé couché haltères",
        sets: 3,
        reps: "8–12",
        restSeconds: 90,
        notes: "Plus léger que le bench du lundi. Haltères pour les épaules.",
      },
      {
        name: "Cable fly",
        sets: 3,
        reps: "12–15",
        restSeconds: 60,
        notes: "Arc contrôlé. Coudes légèrement pliés.",
      },
      {
        name: "Reverse fly",
        sets: 3,
        reps: "15–20",
        restSeconds: 60,
        notes: "Épaules arrière. Équilibre le développé pour un dos solide.",
      },
      {
        name: "Curl incliné",
        sets: 3,
        reps: "10–15",
        restSeconds: 75,
        notes: "Banc incliné. Bras en arrière, pas d’élan.",
      },
      {
        name: "Triceps pushdown",
        sets: 3,
        reps: "10–15",
        restSeconds: 75,
        notes: "Coudes fixes. Corde ou barre.",
      },
    ],
  },
  {
    id: "lower-b",
    name: "Lower B",
    focus: "Jambes, hanches, gainage",
    durationMin: 80,
    exercises: [
      {
        name: "Deadlift classique ou trap-bar",
        sets: 3,
        reps: "3–6",
        restSeconds: 180,
        notes: "Technique propre. Trap-bar si le bas du dos fatigue. Jamais à l’échec.",
      },
      {
        name: "Front squat ou hack squat",
        sets: 3,
        reps: "6–10",
        restSeconds: 150,
        notes: "Plus léger que le squat du mardi. Torse droit.",
      },
      {
        name: "Bulgarian split squat",
        sets: 3,
        reps: "8–12 / jambe",
        restSeconds: 90,
        notes: "Genou avant dans l’axe. Base unilatérale pour un corps grand.",
      },
      {
        name: "Hip thrust",
        sets: 3,
        reps: "8–12",
        restSeconds: 90,
        notes: "Pause 1 s en haut. Hanches solides, lombaires déjà fatiguées : charge contrôlée.",
      },
      {
        name: "Leg curl",
        sets: 3,
        reps: "10–15",
        restSeconds: 75,
        notes: "Deuxième dose d’ischios de la semaine.",
      },
      {
        name: "Mollets assis",
        sets: 4,
        reps: "12–20",
        restSeconds: 45,
        notes: "Soléaire. Pause en bas.",
      },
      {
        name: "Copenhagen plank",
        sets: 3,
        reps: "20–40 s / côté",
        restSeconds: 45,
        notes: "Stabilité latérale. Genou ou cheville sur le banc selon le niveau.",
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

export function emptySets(count: number) {
  return Array.from({ length: count }, () => ({
    done: false,
    kg: "",
    reps: "",
  }));
}
