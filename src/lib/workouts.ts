import type { ExerciseVariant, LiftKind, SessionExercise, WorkoutTemplate } from "./types";

export const WEEKLY_SPLIT: {
  day: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  templateId: string | null;
  note: "walk" | "restSmoothie" | "optional" | "rest" | "restBack";
}[] = [
  { day: "mon", templateId: "session-a", note: "walk" },
  { day: "tue", templateId: null, note: "rest" },
  { day: "wed", templateId: "session-b", note: "walk" },
  { day: "thu", templateId: null, note: "rest" },
  { day: "fri", templateId: "session-c", note: "walk" },
  { day: "sat", templateId: "session-d", note: "optional" },
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
  alternatives: ExerciseVariant[] = [],
): SessionExercise {
  return { id, catalogId, name, kind, sets, prescription, restSeconds, notes, alternatives };
}

function alt(
  catalogId: string | null,
  name: string,
  kind: LiftKind,
  notes: string,
  prescription?: string,
): ExerciseVariant {
  return { catalogId, name, kind, notes, prescription };
}

export const TEMPLATES: WorkoutTemplate[] = [
  {
    id: "session-a",
    name: "Séance A",
    focus: "Jambes, priorité force",
    durationMin: 75,
    ramp: "barbell",
    warmup: [{ id: "wu-cardio" }, { id: "wu-dyn-lower" }, { id: "wu-bw-squat" }],
    exercises: [
      lift(
        "sa-squat",
        "0043",
        "Back squat",
        "load",
        4,
        "4–6",
        180,
        "Départ 65 kg. ~2 reps en réserve. Si 4×6 propres : +2,5 kg. Presse si le squat barre ne convient pas.",
        [
          alt("0739", "Presse à cuisses", "load", "Si le squat barre gêne. Amplitude complète, genoux dans l’axe, ~2 reps en réserve."),
        ],
      ),
      lift(
        "sa-rdl",
        "0085",
        "Romanian deadlift",
        "load",
        3,
        "6–8",
        150,
        "Pas le max de 80 kg du classique. Départ 45–50 kg. Descente contrôlée, dos plat, 2 reps en réserve.",
        [
          alt("1757", "RDL haltère une jambe", "load", "Moins de charge lombaire. Hanche en arrière, dos plat."),
        ],
      ),
      lift(
        "sa-press",
        "0739",
        "Presse à cuisses",
        "load",
        3,
        "8–10",
        120,
        "Charge inconnue : monte progressivement, choisis ~2 reps en réserve, note le poids.",
        [
          alt("0743", "Hack squat", "load", "Si pas de presse. Amplitude complète, genoux dans l’axe."),
        ],
      ),
      lift(
        "sa-curl",
        "0586",
        "Leg curl",
        "load",
        3,
        "10–12",
        75,
        "Si 50 kg est une estimation : teste 40–45 kg. Contrôle 2 s à la descente.",
        [
          alt("0599", "Leg curl assis", "load", "Autre machine, mêmes ischios. Contrôle 2 s à la descente."),
        ],
      ),
      lift(
        "sa-calf",
        "1372",
        "Mollets debout",
        "load",
        3,
        "10–15",
        60,
        "Pause 1 s en bas et en haut. Amplitude complète.",
        [
          alt("1379", "Mollets assis", "load", "Si le mollet debout irrite le tendon d’Achille."),
        ],
      ),
      lift(
        "sa-plank",
        "0464",
        "Gainage",
        "timed",
        3,
        "30–60 s",
        45,
        "Bassin serré, pas de dos creux. Logue les secondes, pas un poids.",
        [
          alt("0472", "Relevés de jambes", "bodyweight", "Si tu préfères un mouvement plutôt qu’un hold.", "8–15"),
        ],
      ),
    ],
  },
  {
    id: "session-b",
    name: "Séance B",
    focus: "Pecs et dos, priorité force",
    durationMin: 75,
    ramp: "barbell",
    warmup: [{ id: "wu-cardio" }, { id: "wu-dyn-upper" }],
    exercises: [
      lift(
        "sb-bench",
        "0025",
        "Bench press",
        "load",
        4,
        "4–6",
        180,
        "Départ 55 kg, pas 70. 70 kg × 4–5 n’est pas une charge de travail ici. ~2 reps en réserve. Si 4×6 propres : +2,5 kg.",
        [
          alt("0289", "Développé couché haltères", "load", "Si la barre gêne l’épaule. Contrôle la descente."),
          alt("0577", "Presse pectoraux", "load", "Machine si barre et haltères gênent."),
        ],
      ),
      lift(
        "sb-pull",
        "0652",
        "Tractions pronation ou tirage vertical",
        "bodyweight",
        4,
        "6–8",
        150,
        "Assistées si besoin. Poitrine haute, pas de balancier. Tirage vertical si moins de 6 reps propres.",
        [
          alt("0198", "Tirage vertical", "load", "Si tu n’as pas 6 tractions propres. Poitrine haute, ~2 reps en réserve."),
          alt("0017", "Tractions assistées", "bodyweight", "Machine ou élastique. Sans aller à l’échec."),
        ],
      ),
      lift(
        "sb-incline",
        "0314",
        "Développé incliné haltères",
        "load",
        3,
        "8–10",
        120,
        "22,5 kg seulement si les 3 séries restent dans 8–10, amplitude contrôlée. Sinon 17,5–20 kg.",
        [
          alt("0047", "Développé incliné barre", "load", "Si tu n’as pas d’haltères assez lourds. Banc ~30°."),
        ],
      ),
      lift(
        "sb-row",
        "0049",
        "Rowing poitrine soutenue",
        "load",
        3,
        "8–10",
        90,
        "50 kg si le dos reste stable, sans élan. Qualité > chiffre affiché.",
        [
          alt("0861", "Rowing poulie", "load", "Rowing assis. Poitrine haute, tirage vers le bas des côtes."),
          alt("1350", "Rowing machine", "load", "Torse collé au pad, coudes près du corps."),
        ],
      ),
      lift(
        "sb-lat",
        "0334",
        "Élévations latérales",
        "load",
        3,
        "12–15",
        60,
        "Coudes légèrement pliés. Pas d’élan du buste. 2–3 séries.",
        [
          alt("0178", "Élévations latérales poulie", "load", "Tension continue. Coudes mous, pas d’élan."),
        ],
      ),
      lift(
        "sb-face",
        "0203",
        "Face pull",
        "load",
        3,
        "12–15",
        60,
        "Poulie haute, corde vers le visage. Épaules arrière. 2–3 séries.",
        [
          alt("0383", "Reverse fly", "load", "Oiseau haltères ou poulie. Stoppe 1–2 reps avant l’échec."),
        ],
      ),
    ],
  },
  {
    id: "session-c",
    name: "Séance C",
    focus: "Jambes, dos et pecs, priorité volume",
    durationMin: 80,
    ramp: "barbell",
    warmup: [{ id: "wu-cardio" }, { id: "wu-dyn-lower" }],
    exercises: [
      lift(
        "sc-trap",
        "0811",
        "Trap-bar deadlift",
        "load",
        3,
        "5–6",
        180,
        "Si le trap-bar est nouveau : front squat. Pas de max. Technique propre, ~2 reps en réserve.",
        [
          alt("0042", "Front squat", "load", "Si le trap-bar est nouveau ou non disponible. Torse droit, pas de max."),
          alt("0032", "Deadlift classique ou trap-bar", "load", "Classique seulement si la technique est déjà propre. Jamais à l’échec."),
        ],
      ),
      lift(
        "sc-bulgarian",
        "0410",
        "Bulgarian split squat",
        "load",
        3,
        "8–10 / jambe",
        90,
        "Genou avant dans l’axe. Haltères aux côtés. 8–10 par jambe.",
        [
          alt("0336", "Fentes haltères", "load", "Si l’arrière-pied surélevé irrite le genou."),
        ],
      ),
      lift(
        "sc-db-bench",
        "0289",
        "Développé couché haltères",
        "load",
        3,
        "8–12",
        120,
        "Haltères ou machine. Contrôle la descente. ~2 reps en réserve.",
        [
          alt("0577", "Presse pectoraux", "load", "Machine si pas d’haltères."),
        ],
      ),
      lift(
        "sc-row",
        "0292",
        "Rowing haltère unilatéral",
        "load",
        3,
        "8–12",
        90,
        "Un bras à la fois, dos plat. Poulie unilatérale si tu préfères.",
        [
          alt("0861", "Rowing poulie", "load", "Unilatéral à la poulie. Torse stable."),
        ],
      ),
      lift(
        "sc-hip",
        "1409",
        "Hip thrust",
        "load",
        3,
        "8–12",
        90,
        "Pause 1 s en haut. Hanches, pas dos.",
        [
          alt("3523", "Pont fessier", "bodyweight", "Sans barre si besoin. Pause 1 s en haut."),
        ],
      ),
      lift(
        "sc-fly",
        "0171",
        "Cable fly",
        "load",
        2,
        "12–15",
        60,
        "Arc contrôlé, coudes légèrement pliés. Ou pompes.",
        [
          alt("0308", "Écarté haltères", "load", "Pas de poulie : haltères, arc contrôlé."),
          alt(null, "Pompes", "bodyweight", "Si tu n’as pas de poulie. Amplitude complète, 12–15.", "12–15"),
        ],
      ),
      lift(
        "sc-abs",
        "0472",
        "Relevés de jambes",
        "bodyweight",
        3,
        "8–15",
        60,
        "2–3 séries. Bassin serré, pas de balancier.",
        [
          alt("0464", "Gainage", "timed", "Hold si tu préfères. Logue les secondes.", "30–45 s"),
        ],
      ),
    ],
  },
  {
    id: "session-d",
    name: "Séance D",
    focus: "Mobilité / récupération, 20–30 min",
    durationMin: 25,
    warmup: [
      { id: "d-walk" },
      { id: "d-ankle" },
      { id: "d-hip" },
      { id: "d-tspine" },
      { id: "d-squat" },
      { id: "d-pec" },
      { id: "d-walk2" },
    ],
    exercises: [],
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
    for (const exercise of template.exercises) {
      const altMatch = exercise.alternatives.find((item) => item.name === name);
      if (altMatch) return { ...exercise, ...altMatch };
    }
  }
  return null;
}

export function variantsFor(exercise: SessionExercise): ExerciseVariant[] {
  return [
    {
      catalogId: exercise.catalogId,
      name: exercise.name,
      kind: exercise.kind,
      notes: exercise.notes,
      prescription: exercise.prescription,
    },
    ...exercise.alternatives,
  ];
}

export function activeVariant(
  slot: SessionExercise,
  current: { catalogId?: string | null; name: string },
) {
  const all = variantsFor(slot);
  return (
    all.find((item) => item.catalogId && item.catalogId === current.catalogId) ??
    all.find((item) => item.name === current.name) ??
    all[0]
  );
}
