import type { ExerciseVariant, LiftKind, SessionExercise, WorkoutTemplate } from "./types";

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
  alternatives: ExerciseVariant[] = [],
): SessionExercise {
  return { id, catalogId, name, kind, sets, prescription, restSeconds, notes, alternatives };
}

function alt(
  catalogId: string,
  name: string,
  kind: LiftKind,
  notes: string,
  prescription?: string,
): ExerciseVariant {
  return { catalogId, name, kind, notes, prescription };
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
        [
          alt("0289", "Développé couché haltères", "load", "Même stimulus, plus d’amplitude d’épaule. Contrôle la descente. 1–3 reps en réserve."),
          alt("0577", "Presse pectoraux", "load", "Si la barre ou les haltères gênent l’épaule. Même fourchette, 1–3 reps en réserve."),
        ],
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
        [
          alt("0198", "Tirage vertical", "load", "Si tu n’as pas la barre, ou moins de 6 tractions propres. Poitrine haute, 1–3 reps en réserve."),
          alt("0017", "Tractions assistées", "bodyweight", "Machine ou élastique. Même schéma de traction, sans aller à l’échec."),
        ],
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
        [
          alt("1350", "Rowing machine", "load", "Si tu n’as pas de banc incliné. Torse collé au pad, coudes près du corps."),
          alt("0292", "Rowing haltère unilatéral", "load", "Un bras à la fois, dos plat. Utile si le bas du dos fatigue."),
        ],
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
        [
          alt("0047", "Développé incliné barre", "load", "Si tu n’as pas d’haltères assez lourds. Banc ~30°, 1–3 reps en réserve."),
        ],
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
        [
          alt("0178", "Élévations latérales poulie", "load", "Tension continue. Coudes mous, pas d’élan. Stoppe 1–2 reps avant l’échec."),
        ],
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
        [
          alt("0313", "Curl marteau", "load", "Prise neutre, plus doux pour le coude. Coudes stables, stoppe 1–2 reps avant l’échec."),
        ],
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
        [
          alt("0200", "Pushdown corde", "load", "Corde : ouvre un peu les mains en bas. Coudes fixes."),
        ],
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
        [
          alt("0739", "Presse à cuisses", "load", "Si la barre sur le dos gêne. Amplitude complète, genoux dans l’axe, 1–3 reps en réserve."),
          alt("1760", "Goblet squat", "load", "Haltère contre la poitrine. Utile si tu n’as pas de squat rack."),
        ],
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
        [
          alt("1757", "RDL haltère une jambe", "load", "Moins de charge lombaire. Hanche en arrière, dos plat, 2–3 reps en réserve."),
          alt("0489", "Extension lombaire", "load", "Léger. Si le RDL barre est trop lourd aujourd’hui. Jamais à l’échec."),
        ],
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
        [
          alt("0739", "Presse à cuisses", "load", "Pas de hack squat : même travail de quadriceps, amplitude complète."),
          alt("1760", "Goblet squat", "load", "Si tu n’as ni hack ni presse. Haltère contre la poitrine."),
        ],
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
        [
          alt("0599", "Leg curl assis", "load", "Même ischios, autre angle. Contrôle 2 s à la descente."),
        ],
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
        [
          alt("1379", "Mollets assis", "load", "Si le mollet debout irrite le genou ou le tendon d’Achille."),
        ],
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
        [
          alt("0472", "Relevés de jambes", "bodyweight", "Si l’ab wheel est trop dur ou indisponible. Bassin serré, pas de balancier."),
        ],
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
        [
          alt("0716", "Neck side stretch", "load", "Si la flexion/extension gêne. Très léger, lent, sans douleur."),
        ],
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
        [
          alt("0405", "Développé épaules haltères", "load", "Si la barre au-dessus de la tête gêne. Assis, dos calé, 1–3 reps en réserve."),
          alt("0091", "Développé militaire assis", "load", "Barre assise, moins de bas du dos. Pas de cambrure."),
        ],
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
        [
          alt("0818", "Tirage prise neutre", "load", "Poulie en V. Si tu n’as pas 6 tractions propres."),
          alt("0017", "Tractions assistées", "bodyweight", "Machine ou élastique. Même schéma, sans échec."),
        ],
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
        [
          alt("0861", "Rowing poulie", "load", "Si le rowing barre charge trop les lombaires. Poitrine haute, tirage vers le bas des côtes."),
          alt("0293", "Rowing haltères penché", "load", "Haltères, dos plat. Alternative si pas de barre."),
        ],
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
        [
          alt("0577", "Presse pectoraux", "load", "Si tu n’as pas d’haltères. Même poussée horizontale, 1–3 reps en réserve."),
        ],
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
        [
          alt("0308", "Écarté haltères", "load", "Pas de poulie : haltères, arc contrôlé, stoppe 1–2 reps avant l’échec."),
        ],
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
        [
          alt("0203", "Face pull", "load", "Poulie haute, corde vers le visage. Épaules arrière, pas de bas du dos."),
        ],
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
        [
          alt("0313", "Curl marteau", "load", "Si tu n’as pas de banc incliné. Prise neutre, coudes stables."),
        ],
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
        [
          alt("0200", "Pushdown corde", "load", "Corde : ouvre un peu les mains en bas. Coudes fixes."),
        ],
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
        [
          alt("0811", "Trap-bar deadlift", "load", "Moins de contrainte lombaire. Technique propre, 2–3 reps en réserve."),
        ],
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
        [
          alt("0743", "Hack squat", "load", "Si le front squat bloque les poignets ou les épaules. Torse droit."),
          alt("1760", "Goblet squat", "load", "Haltère contre la poitrine. Même torse droit, charge plus légère."),
        ],
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
        [
          alt("0336", "Fentes haltères", "load", "Si l’arrière-pied surélevé irrite le genou. Petit pas, buste droit."),
          alt("1460", "Fentes marchées", "bodyweight", "Sans charge si le genou est sensible. Buste droit."),
        ],
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
        [
          alt("3523", "Pont fessier", "bodyweight", "Sans barre si le hip thrust n’est pas possible. Pause 1 s en haut, hanches pas dos."),
        ],
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
        [
          alt("0599", "Leg curl assis", "load", "Même ischios, autre machine. Contrôle 2 s à la descente."),
        ],
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
        [
          alt("1372", "Mollets debout", "load", "Si tu n’as pas de mollet assis. Pause 1 s en bas et en haut."),
        ],
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
        [
          alt("3667", "Adduction couché", "timed", "Si le Copenhagen est trop dur. Hold latéral plus court, même logique de secondes.", "20–40 s / côté"),
          alt("0598", "Adduction machine", "load", "Machine adducteurs si tu ne peux pas tenir le hold. Stoppe 1–2 reps avant l’échec.", "10–15"),
        ],
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
        [
          alt("0979", "Pallof press", "load", "Si le side plank irrite l’épaule. Anti-rotation, 1–2 reps en réserve.", "8–12 / côté"),
          alt("0464", "Gainage", "timed", "Planche face au sol si le side plank n’est pas possible. Bassin serré.", "20–40 s"),
        ],
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
