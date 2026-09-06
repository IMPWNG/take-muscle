import { createNeonAuth } from "@neondatabase/auth/next/server";

function createAuth() {
  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  const secret = process.env.NEON_AUTH_COOKIE_SECRET;
  if (!baseUrl || !secret) {
    throw new Error("Neon Auth environment variables are missing");
  }
  return createNeonAuth({
    baseUrl,
    cookies: { secret },
  });
}

let authInstance: ReturnType<typeof createAuth> | null = null;

export function getAuth() {
  if (!authInstance) authInstance = createAuth();
  return authInstance;
}

export async function requireUserId() {
  const { data: session } = await getAuth().getSession();
  const userId = session?.user?.id;
  if (!userId) return null;
  return userId;
}
