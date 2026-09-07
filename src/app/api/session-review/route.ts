import { requireUserId } from "@/lib/auth/server";
import { parseAnalysis, reviewSystem, sessionReviewPayload } from "@/lib/review";
import type { SessionLog } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const userId = await requireUserId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const apiKey = process.env.MAMMOUTH_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Clé Mammouth manquante." }, { status: 503 });
  }

  const body = (await req.json()) as {
    locale?: "fr" | "en" | "zh";
    session?: SessionLog;
    previous?: SessionLog | null;
  };
  if (!body.session?.exercises?.length) {
    return Response.json({ error: "Séance incomplète" }, { status: 400 });
  }

  const locale = body.locale ?? "zh";
  const payload = sessionReviewPayload(body.session, body.previous ?? null);

  const response = await fetch("https://api.mammouth.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mammouth-recommended",
      temperature: 0.3,
      messages: [
        { role: "system", content: reviewSystem(locale) },
        { role: "user", content: JSON.stringify(payload) },
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
    return Response.json(parseAnalysis(content));
  } catch {
    return Response.json({ error: "Impossible de lire l’analyse." }, { status: 502 });
  }
}
