import { coachSystem } from "@/lib/coach";

export const runtime = "nodejs";
export const maxDuration = 60;

type Incoming = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.MAMMOUTH_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Clé Mammouth manquante." }, { status: 503 });
  }

  const body = (await req.json()) as { messages?: Incoming[]; locale?: "fr" | "en" | "zh" };
  const messages = body.messages?.filter((m) => m.role === "user" || m.role === "assistant") ?? [];
  if (messages.length === 0) {
    return Response.json({ error: "Message vide." }, { status: 400 });
  }
  const locale = body.locale ?? "zh";

  const response = await fetch("https://api.mammouth.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mammouth-recommended",
      temperature: 0.6,
      stream: true,
      messages: [{ role: "system", content: coachSystem(locale) }, ...messages],
    }),
  });

  if (!response.ok || !response.body) {
    const text = await response.text();
    return Response.json(
      { error: `Mammouth ${response.status}: ${text.slice(0, 280)}` },
      { status: 502 },
    );
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}
