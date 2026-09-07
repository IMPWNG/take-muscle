"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LocaleSwitch } from "@/components/LocaleSwitch";
import { RestClock } from "@/components/RestClock";
import { SignOutButton } from "@/components/SignOutButton";
import { T } from "@/components/T";
import { useLocale } from "@/hooks/useLocale";
import { useRestTimer } from "@/hooks/useRestTimer";
import { msg } from "@/lib/i18n/copy";

const LINKS = [
  { href: "/", label: "navHome", short: "navHomeShort" },
  { href: "/nutrition", label: "navFood", short: "navFoodShort" },
  { href: "/entrainement", label: "navGym", short: "navGymShort" },
  { href: "/poids", label: "navWeight", short: "navWeightShort" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { locale } = useLocale();
  const { remaining } = useRestTimer();
  const isAuth = pathname.startsWith("/auth");
  const localeClass = locale === "zh" ? "font-[family-name:var(--font-zh)]" : "";

  if (isAuth) {
    return (
      <div className={`mx-auto flex min-h-full max-w-6xl flex-col px-4 pb-10 pt-4 sm:px-6 sm:pt-6 ${localeClass}`}>
        <div className="mb-6 flex items-center justify-between gap-3">
          <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl">Take Muscle</p>
          <LocaleSwitch compact />
        </div>
        <main className="flex min-w-0 flex-1 justify-center">{children}</main>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex min-h-full max-w-6xl flex-col px-4 pt-4 sm:px-6 sm:pt-6 lg:flex-row lg:gap-10 lg:px-8 lg:pb-10 ${
        remaining > 0
          ? "pb-[calc(9.75rem+env(safe-area-inset-bottom))]"
          : "pb-[calc(5.75rem+env(safe-area-inset-bottom))]"
      } ${localeClass}`}
    >
      <aside className="mb-8 hidden w-56 shrink-0 lg:block">
        <div className="sticky top-8">
          <p className="stamp text-[11px] text-ink-soft">83 → 90 kg</p>
          <Link href="/" className="mt-2 block font-[family-name:var(--font-display)] text-4xl leading-none tracking-tight">
            Take
            <br />
            Muscle
          </Link>
          <T text={msg(locale, "tagline")} as="p" className="mt-4 max-w-[14rem] text-sm leading-5 text-ink-soft" />
          <nav className="mt-8 flex flex-col gap-1">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-rubber text-chalk"
                      : "text-ink-soft hover:bg-chalk/70 hover:text-ink"
                  }`}
                >
                  <T text={msg(locale, link.label)} />
                </Link>
              );
            })}
          </nav>
          <LocaleSwitch />
          <div className="mt-6">
            <SignOutButton />
          </div>
        </div>
      </aside>

      <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
        <Link href="/" className="min-w-0">
          <p className="stamp text-[10px] text-ink-soft">83 → 90 kg</p>
          <p className="font-[family-name:var(--font-display)] text-2xl leading-none">Take Muscle</p>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <LocaleSwitch compact />
          <SignOutButton />
        </div>
      </div>

      <main className="min-w-0 flex-1">{children}</main>

      <RestClock />

      <nav className="fixed inset-x-3 bottom-[max(0.65rem,env(safe-area-inset-bottom))] z-20 grid grid-cols-4 gap-1 rounded-[28px] bg-rubber/95 p-1.5 text-chalk shadow-xl backdrop-blur lg:hidden">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`grid min-h-12 place-items-center rounded-2xl px-1 text-center text-[12px] leading-tight ${
                active ? "bg-sesame text-ink" : "text-chalk/85"
              }`}
            >
              <T text={msg(locale, link.short)} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
