"use client";

import { useActionState } from "react";
import { T } from "@/components/T";
import { useLocale } from "@/hooks/useLocale";
import { msg } from "@/lib/i18n/copy";
import { signInWithEmail } from "@/app/auth/actions";

export default function SignInPage() {
  const { locale } = useLocale();
  const [state, formAction, pending] = useActionState(signInWithEmail, null);

  return (
    <form action={formAction} className="mx-auto mt-10 max-w-sm space-y-4 rounded-3xl bg-chalk p-6">
      <T text={msg(locale, "authSignInTitle")} as="h1" className="font-[family-name:var(--font-display)] text-3xl" />
      <T text={msg(locale, "authLead")} as="p" className="text-sm text-ink-soft" />
      <label className="block text-sm">
        <T text={msg(locale, "authEmail")} as="span" />
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        <T text={msg(locale, "authPassword")} as="span" />
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-3 py-2"
        />
      </label>
      {state?.error && <p className="text-sm text-chili">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-rubber px-4 py-2.5 text-sm text-chalk disabled:opacity-60"
      >
        <T text={msg(locale, pending ? "authSigningIn" : "authSignIn")} />
      </button>
      <a href="/auth/sign-up" className="block text-center text-sm text-ink-soft underline">
        <T text={msg(locale, "authNeedAccount")} />
      </a>
    </form>
  );
}
