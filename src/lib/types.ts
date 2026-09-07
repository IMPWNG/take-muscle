export type Profile = {
  heightCm: number;
  startKg: number;
  targetKg: number;
  extraKcal: number;
};

export type WeightEntry = {
  id: string;
  date: string;
  kg: number;
};

export type MealSlotId =
  | "breakfast"
  | "lunch"
  | "snack"
  | "dinner"
  | "night";

export type FoodItem = {
  id: string;
  label: string;
  zh: string;
  proteinG: number;
  kcal: number;
  note?: string;
};

export type MealSlot = {
  id: MealSlotId;
  title: string;
  hint: string;
  items: FoodItem[];
};

export type SessionExercise = {
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  notes: string;
};

export type WorkoutTemplate = {
  id: string;
  name: string;
  focus: string;
  durationMin: number;
  exercises: SessionExercise[];
};

export type LiftSet = {
  done: boolean;
  kg: string;
  reps: string;
};

export type Effort = "easy" | "normal" | "hard";

export type SessionExerciseLog = {
  name: string;
  sets: LiftSet[];
  difficulty: Effort | null;
};

export type SessionAdjustment = {
  exercise: string;
  change: "add_weight" | "drop_weight" | "add_reps" | "drop_reps" | "keep";
  amount: string;
  reason: string;
};

export type SessionAnalysis = {
  summary: string;
  adjustments: SessionAdjustment[];
};

export type SessionLog = {
  id: string;
  date: string;
  name: string;
  focus: string;
  completed: boolean;
  exercises: SessionExerciseLog[];
  analysis: SessionAnalysis | null;
};

export type TrackerState = {
  profile: Profile;
  weights: WeightEntry[];
  checkedByDate: Record<string, string[]>;
  extraByDate: Record<string, string[]>;
  sessions: SessionLog[];
};
