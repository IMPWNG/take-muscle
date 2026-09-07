import { requireUserId } from "@/lib/auth/server";
import { analyzeSession } from "@/lib/analyze";
import type { SessionLog } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  return Response.json(analyzeSession(body.session, body.previous ?? null, body.locale ?? "zh"));
}
