"use client";

import { useRef, useState } from "react";
import type { ChatMessage, GeneratedWorkout } from "@/lib/types";
import { T } from "@/components/T";
import { useLocale } from "@/hooks/useLocale";
import { copy, msg, sessionReadyText } from "@/lib/i18n/copy";
import { plain } from "@/lib/i18n";

function renderText(text: string) {
  return text.split("\n").map((line, i) => (
    <p key={i} className={line.startsWith("- ") || line.match(/^\d+\./) ? "pl-3" : ""}>
      {line || "\u00a0"}
    </p>
  ));
}

function isWorkoutAsk(text: string) {
  return /s[eé]ance|workout|训练|课程|给我一套|give me a/i.test(text);
}

export function CoachChat({
  onWorkout,
}: {
  onWorkout?: (workout: GeneratedWorkout) => void;
}) {
  const { locale } = useLocale();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const bottom = useRef<HTMLDivElement>(null);
  const starters = [
    { key: "starter1" as const, workout: true },
    { key: "starter2" as const, workout: false },
    { key: "starter3" as const, workout: false },
    { key: "starter4" as const, workout: false },
  ];

  async function send(text: string, asWorkout = false) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setPending(true);
    setError("");

    try {
      const response = await fetch(asWorkout ? "/api/workout" : "/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, locale }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || plain(locale, copy.coachError));
      }

      if (asWorkout) {
        const workout = (await response.json()) as GeneratedWorkout;
        onWorkout?.(workout);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: sessionReadyText(
              locale,
              workout.sessionName,
              workout.warmup,
              workout.exercises
                .map((ex) => `• ${ex.name} — ${ex.sets} × ${ex.reps} (${ex.restSeconds}s)`)
                .join("\n"),
              workout.progressionNotes,
            ),
          },
        ]);
        return;
      }

      if (!response.body) throw new Error(plain(locale, copy.emptyStream));
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";
      let buffer = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith("data:")) continue;
          const data = trimmedLine.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const json = JSON.parse(data) as {
              choices?: { delta?: { content?: string } }[];
            };
            assistant += json.choices?.[0]?.delta?.content ?? "";
            setMessages((prev) => {
              const copyMessages = [...prev];
              copyMessages[copyMessages.length - 1] = { role: "assistant", content: assistant };
              return copyMessages;
            });
          } catch {
            // wait for the rest of the chunk
          }
        }
        bottom.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : plain(locale, copy.coachFail));
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-[28rem] flex-col rounded-[28px] bg-rubber p-4 text-chalk sm:p-5">
      <T text={msg(locale, "gymCoach")} as="p" className="stamp text-[11px] text-chalk/60 normal-case" />
      <T text={msg(locale, "whatToday")} as="h2" className="font-[family-name:var(--font-display)] text-2xl" />
      <T text={msg(locale, "cLead")} as="p" className="mt-1 text-sm text-chalk/70" />

      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {starters.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => send(plain(locale, copy[item.key]), item.workout)}
                className="rounded-full bg-plate px-3 py-1.5 text-left text-xs text-chalk"
              >
                <T text={msg(locale, item.key)} />
              </button>
            ))}
          </div>
        )}
        {messages.map((message, i) => (
          <article
            key={`${message.role}-${i}`}
            className={`max-w-[42rem] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-6 ${
              message.role === "user" ? "ml-auto bg-sesame text-ink" : "bg-plate/80"
            }`}
          >
            {renderText(message.content)}
          </article>
        ))}
        <div ref={bottom} />
      </div>

      {error && <p className="mt-3 text-sm text-sesame">{error}</p>}

      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void send(input, isWorkoutAsk(input) && /fais|g[eé]n[eè]re|aujourd|give me|今天|生成/i.test(input));
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={plain(locale, copy.placeholder)}
          className="min-w-0 flex-1 rounded-full bg-chalk px-4 py-2.5 text-sm text-ink"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-sesame px-4 py-2.5 text-sm text-ink disabled:opacity-50"
        >
          {pending ? "…" : <T text={msg(locale, "send")} />}
        </button>
      </form>
      <button
        type="button"
        disabled={pending}
        onClick={() => send(plain(locale, copy.generatePrompt), true)}
        className="mt-2 self-start text-xs text-chalk/70 underline"
      >
        <T text={msg(locale, "generateSession")} />
      </button>
    </div>
  );
}
