import { requireUserId } from "@/lib/auth/server";
import { analyzeSession } from "@/lib/analyze";
import { parseAnalysis, reviewSystem, sessionReviewPayload } from "@/lib/review";
import { normalizeSession } from "@/lib/session-log";
import type { SessionLog } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAMMOUTH_URL = "https://api.mammouth.ai/v1/chat/completions";
const TIMEOUT_MS = 22_000;

async function mammouthReview(session: SessionLog, previous: SessionLog | null, locale: "fr" | "en" | "zh") {
  const key = process.env.MAMMOUTH_API_KEY;
  if (!key) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(MAMMOUTH_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mammouth-recommended",
        temperature: 0.15,
        messages: [
          { role: "system", content: reviewSystem(locale) },
          {
            role: "user",
            content: JSON.stringify(sessionReviewPayload(session, previous)),
          },
        ],
      }),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;
    return parseAnalysis(content, session);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: Request) {
  const userId = await requireUserId();
  if (!userId) return Response.json({ error: "unauthorized" }, { status: 401 });

  const body = (await req.json()) as {
    locale?: "fr" | "en" | "zh";
    session?: SessionLog;
    previous?: SessionLog | null;
  };
  if (!body.session?.exercises?.length) {
    return Response.json({ error: "incomplete" }, { status: 400 });
  }

  const locale = body.locale ?? "zh";
  const session = normalizeSession(body.session);
  const previous = body.previous ? normalizeSession(body.previous) : null;
  const ai = await mammouthReview(session, previous, locale);
  return Response.json(ai ?? analyzeSession(session, previous, locale));
}
