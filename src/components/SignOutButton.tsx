"use client";

import { T } from "@/components/T";
import { useLocale } from "@/hooks/useLocale";
import { msg } from "@/lib/i18n/copy";
import { signOutAction } from "@/app/auth/actions";

export function SignOutButton() {
  const { locale } = useLocale();
  return (
    <form action={signOutAction}>
      <button type="submit" className="min-h-11 px-2 text-xs text-ink-soft underline">
        <T text={msg(locale, "authSignOut")} />
      </button>
    </form>
  );
}
