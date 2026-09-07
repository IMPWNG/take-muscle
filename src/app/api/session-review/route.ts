import { requireUserId } from "@/lib/auth/server";
import { parseAnalysis, reviewSystem, sessionReviewPayload } from "@/lib/review";
import { isAbortError, withTimeout } from "@/lib/timeout";
import type { SessionLog } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAMMOUTH_TIMEOUT_MS = 25_000;

type ReviewErrorCode = "unauthorized" | "missing_key" | "incomplete" | "timeout" | "upstream" | "parse";

function errorJson(error: ReviewErrorCode, status: number, detail?: string) {
  return Response.json({ error, detail: detail?.slice(0, 280) }, { status });
}

async function callMammouth(apiKey: string, locale: "fr" | "en" | "zh", payload: unknown) {
  const timeout = withTimeout(MAMMOUTH_TIMEOUT_MS);
  try {
    return await fetch("https://api.mammouth.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: timeout.signal,
      body: JSON.stringify({
        model: "mammouth-recommended",
        temperature: 0.3,
        max_tokens: 1800,
        messages: [
          { role: "system", content: reviewSystem(locale) },
          { role: "user", content: JSON.stringify(payload) },
        ],
      }),
    });
  } finally {
    timeout.dispose();
  }
}

export async function POST(req: Request) {
  try {
    const userId = await requireUserId();
    if (!userId) return errorJson("unauthorized", 401);

    const apiKey = process.env.MAMMOUTH_API_KEY;
    if (!apiKey) return errorJson("missing_key", 503);

    const body = (await req.json()) as {
      locale?: "fr" | "en" | "zh";
      session?: SessionLog;
      previous?: SessionLog | null;
    };
    if (!body.session?.exercises?.length) {
      return errorJson("incomplete", 400);
    }

    const locale = body.locale ?? "zh";
    const payload = sessionReviewPayload(body.session, body.previous ?? null);

    let response: Response;
    try {
      response = await callMammouth(apiKey, locale, payload);
    } catch (error) {
      if (isAbortError(error)) return errorJson("timeout", 504);
      const detail = error instanceof Error ? error.message : "upstream failed";
      return errorJson("upstream", 502, detail);
    }

    if (!response.ok) {
      const text = await response.text();
      return errorJson("upstream", 502, `Mammouth ${response.status}: ${text}`);
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content ?? "";

    try {
      return Response.json(parseAnalysis(content));
    } catch {
      return errorJson("parse", 502);
    }
  } catch (error) {
    if (isAbortError(error)) return errorJson("timeout", 504);
    const detail = error instanceof Error ? error.message : "review failed";
    return errorJson("upstream", 500, detail);
  }
}
