"use server";

import { getAuth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export async function signInWithEmail(
  _prev: { error: string } | null,
  formData: FormData,
) {
  const { error } = await getAuth().signIn.email({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (error) return { error: error.message || "Connexion impossible." };
  redirect("/");
}

export async function signUpWithEmail(
  _prev: { error: string } | null,
  formData: FormData,
) {
  const { error } = await getAuth().signUp.email({
    email: String(formData.get("email") ?? ""),
    name: String(formData.get("name") ?? "Matisse"),
    password: String(formData.get("password") ?? ""),
  });
  if (error) return { error: error.message || "Inscription impossible." };
  redirect("/");
}

export async function signOutAction() {
  await getAuth().signOut();
  redirect("/auth/sign-in");
}
