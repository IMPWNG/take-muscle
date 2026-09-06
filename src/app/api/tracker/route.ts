import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { mealChecks, profiles, sessions, weights } from "@/db/schema";
import { requireUserId } from "@/lib/auth/server";
import { DEFAULT_PROFILE } from "@/lib/program";
import type { SessionLog, TrackerState } from "@/lib/types";

export const runtime = "nodejs";

function mapsFromChecks(
  rows: { loggedOn: string; itemId: string; kind: string }[],
) {
  const checkedByDate: Record<string, string[]> = {};
  const extraByDate: Record<string, string[]> = {};
  for (const row of rows) {
    const target = row.kind === "extra" ? extraByDate : checkedByDate;
    const list = target[row.loggedOn] ?? [];
    list.push(row.itemId);
    target[row.loggedOn] = list;
  }
  return { checkedByDate, extraByDate };
}

async function loadState(userId: string): Promise<TrackerState> {
  const db = getDb();
  const [profileRow] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
  const weightRows = await db.select().from(weights).where(eq(weights.userId, userId));
  const checkRows = await db.select().from(mealChecks).where(eq(mealChecks.userId, userId));
  const sessionRows = await db.select().from(sessions).where(eq(sessions.userId, userId));
  const { checkedByDate, extraByDate } = mapsFromChecks(checkRows);

  return {
    profile: profileRow
      ? {
          heightCm: profileRow.heightCm,
          startKg: Number(profileRow.startKg),
          targetKg: Number(profileRow.targetKg),
          extraKcal: profileRow.extraKcal,
        }
      : { ...DEFAULT_PROFILE },
    weights: weightRows.map((row) => ({
      id: row.id,
      date: row.loggedOn,
      kg: Number(row.kg),
    })),
    checkedByDate,
    extraByDate,
    sessions: sessionRows.map((row) => ({
      id: row.id,
      date: row.loggedOn,
      name: row.name,
      focus: row.focus,
      completed: row.completed,
      exercises: (row.exercises as SessionLog["exercises"]) ?? [],
    })),
  };
}

export async function GET() {
  const userId = await requireUserId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json(await loadState(userId));
}

export async function PUT(req: Request) {
  const userId = await requireUserId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as TrackerState;
  if (!body?.profile || !Array.isArray(body.weights) || !Array.isArray(body.sessions)) {
    return Response.json({ error: "Invalid state" }, { status: 400 });
  }

  const db = getDb();
  const now = new Date();

  await db
    .insert(profiles)
    .values({
      userId,
      heightCm: body.profile.heightCm,
      startKg: String(body.profile.startKg),
      targetKg: String(body.profile.targetKg),
      extraKcal: body.profile.extraKcal,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: profiles.userId,
      set: {
        heightCm: body.profile.heightCm,
        startKg: String(body.profile.startKg),
        targetKg: String(body.profile.targetKg),
        extraKcal: body.profile.extraKcal,
        updatedAt: now,
      },
    });

  await db.delete(weights).where(eq(weights.userId, userId));
  if (body.weights.length > 0) {
    await db.insert(weights).values(
      body.weights.map((entry) => ({
        id: entry.id,
        userId,
        loggedOn: entry.date,
        kg: String(entry.kg),
      })),
    );
  }

  await db.delete(mealChecks).where(eq(mealChecks.userId, userId));
  const checkRows = [
    ...Object.entries(body.checkedByDate ?? {}).flatMap(([date, ids]) =>
      ids.map((itemId) => ({ userId, loggedOn: date, itemId, kind: "meal" })),
    ),
    ...Object.entries(body.extraByDate ?? {}).flatMap(([date, ids]) =>
      ids.map((itemId) => ({ userId, loggedOn: date, itemId, kind: "extra" })),
    ),
  ];
  if (checkRows.length > 0) {
    await db.insert(mealChecks).values(checkRows);
  }

  await db.delete(sessions).where(eq(sessions.userId, userId));
  if (body.sessions.length > 0) {
    await db.insert(sessions).values(
      body.sessions.map((session) => ({
        id: session.id,
        userId,
        loggedOn: session.date,
        name: session.name,
        focus: session.focus,
        completed: session.completed,
        exercises: session.exercises,
      })),
    );
  }

  return Response.json({ ok: true });
}
