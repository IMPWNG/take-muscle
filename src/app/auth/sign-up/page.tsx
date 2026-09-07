"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { T } from "@/components/T";
import { useLocale } from "@/hooks/useLocale";
import { msg } from "@/lib/i18n/copy";
import { authClient } from "@/lib/auth/client";

export default function SignUpPage() {
  const { locale } = useLocale();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(event.currentTarget);
    const { error: signUpError } = await authClient.signUp.email({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      name: String(form.get("name") ?? "Matisse"),
      callbackURL: "/",
    });
    setPending(false);
    if (signUpError) {
      setError("auth");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-4 w-full max-w-sm space-y-4 rounded-3xl bg-chalk p-5 sm:mt-10 sm:p-6">
      <T text={msg(locale, "authSignUpTitle")} as="h1" className="font-[family-name:var(--font-display)] text-3xl" />
      <T text={msg(locale, "authLead")} as="p" className="text-sm text-ink-soft" />
      <label className="block text-sm">
        <T text={msg(locale, "authName")} as="span" />
        <input
          name="name"
          type="text"
          required
          defaultValue="Matisse"
          className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-white px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        <T text={msg(locale, "authEmail")} as="span" />
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-white px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        <T text={msg(locale, "authPassword")} as="span" />
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-white px-3 py-2"
        />
        <T text={msg(locale, "authPasswordHint")} as="span" className="mt-1 block text-xs text-ink-soft" />
      </label>
      {error && (
        <T text={msg(locale, "authErrorSignUp")} as="p" className="text-sm text-chili" />
      )}
      <button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-full bg-rubber px-4 text-sm text-chalk disabled:opacity-60"
      >
        <T text={msg(locale, pending ? "authCreating" : "authCreate")} />
      </button>
      <a href="/auth/sign-in" className="block text-center text-sm text-ink-soft underline">
        <T text={msg(locale, "authHaveAccount")} />
      </a>
    </form>
  );
}
