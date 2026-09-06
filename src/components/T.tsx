"use client";

import type { Text } from "@/lib/i18n";

type Tag = "span" | "p" | "h1" | "h2" | "h3" | "li" | "th" | "td" | "label";

export function T({
  text,
  as: Comp = "span",
  className,
}: {
  text: Text;
  as?: Tag;
  className?: string;
}) {
  if (typeof text === "string") {
    return <Comp className={className}>{text}</Comp>;
  }
  return (
    <Comp className={className}>
      <span className="block">{text.zh}</span>
      <span className="mt-0.5 block text-[0.72em] font-normal normal-case leading-snug tracking-wide opacity-55">
        {text.py}
      </span>
    </Comp>
  );
}

export function TInline({ text }: { text: Text }) {
  if (typeof text === "string") return <>{text}</>;
  return (
    <span className="inline-flex flex-col align-middle leading-tight">
      <span>{text.zh}</span>
      <span className="text-[0.68em] font-normal normal-case tracking-wide opacity-55">
        {text.py}
      </span>
    </span>
  );
}
