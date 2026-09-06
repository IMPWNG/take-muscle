import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  userId: text("user_id").primaryKey(),
  heightCm: integer("height_cm").notNull().default(192),
  startKg: numeric("start_kg", { precision: 5, scale: 2 }).notNull().default("83"),
  targetKg: numeric("target_kg", { precision: 5, scale: 2 }).notNull().default("90"),
  extraKcal: integer("extra_kcal").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const weights = pgTable(
  "weights",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    loggedOn: date("logged_on").notNull(),
    kg: numeric("kg", { precision: 5, scale: 2 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("weights_user_logged_idx").on(table.userId, table.loggedOn)],
);

export const mealChecks = pgTable(
  "meal_checks",
  {
    userId: text("user_id").notNull(),
    loggedOn: date("logged_on").notNull(),
    itemId: text("item_id").notNull(),
    kind: text("kind").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.loggedOn, table.itemId, table.kind] }),
    index("meal_checks_user_logged_idx").on(table.userId, table.loggedOn),
  ],
);

export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    loggedOn: date("logged_on").notNull(),
    name: text("name").notNull(),
    focus: text("focus").notNull().default(""),
    completed: boolean("completed").notNull().default(false),
    exercises: jsonb("exercises").notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("sessions_user_logged_idx").on(table.userId, table.loggedOn)],
);
