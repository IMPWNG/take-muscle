import { coachSystem, workoutJsonInstructions } from "@/lib/coach";
import type { GeneratedWorkout } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

type Incoming = { role: "user" | "assistant"; content: string };

function parseWorkout(content: string): GeneratedWorkout {
  const match = content.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("JSON introuvable");
  const raw = JSON.parse(match[0]) as Partial<GeneratedWorkout>;
  if (!raw.sessionName || !Array.isArray(raw.exercises)) {
    throw new Error("Séance incomplète");
  }
  return {
    sessionName: raw.sessionName,
    sessionType: raw.sessionType ?? "full",
    focusMuscles: raw.focusMuscles ?? [],
    durationEstimatedMin: raw.durationEstimatedMin ?? 60,
    warmup: raw.warmup ?? "",
    exercises: raw.exercises.map((exercise) => ({
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      restSeconds: exercise.restSeconds,
      notes: exercise.notes,
    })),
    progressionNotes: raw.progressionNotes ?? "",
  };
}

export async function POST(req: Request) {
  const apiKey = process.env.MAMMOUTH_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Clé Mammouth manquante." }, { status: 503 });
  }

  const body = (await req.json()) as { messages?: Incoming[]; locale?: "fr" | "en" | "zh" };
  const locale = body.locale ?? "zh";
  const last =
    body.messages?.at(-1)?.content ??
    (locale === "en"
      ? "Give me a lifting workout for today."
      : locale === "zh"
        ? "给我今天的力量训练。"
        : "Génère une séance de musculation aujourd’hui.");

  const response = await fetch("https://api.mammouth.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mammouth-recommended",
      temperature: 0.5,
      messages: [
        { role: "system", content: coachSystem(locale) },
        { role: "user", content: `${workoutJsonInstructions(locale)}\n\nRequest: ${last}` },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return Response.json(
      { error: `Mammouth ${response.status}: ${text.slice(0, 280)}` },
      { status: 502 },
    );
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content ?? "";

  try {
    return Response.json(parseWorkout(content));
  } catch {
    return Response.json({ error: "Impossible de lire la séance." }, { status: 502 });
  }
}
