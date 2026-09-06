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

export type GeneratedWorkout = {
  sessionName: string;
  sessionType: string;
  focusMuscles: string[];
  durationEstimatedMin: number;
  exercises: SessionExercise[];
  warmup: string;
  progressionNotes: string;
};

export type LiftSet = {
  done: boolean;
  kg: string;
  reps: string;
};

export type SessionLog = {
  id: string;
  date: string;
  name: string;
  focus: string;
  completed: boolean;
  exercises: {
    name: string;
    sets: LiftSet[];
  }[];
};

export type TrackerState = {
  profile: Profile;
  weights: WeightEntry[];
  checkedByDate: Record<string, string[]>;
  extraByDate: Record<string, string[]>;
  sessions: SessionLog[];
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
