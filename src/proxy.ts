import { getAuth } from "@/lib/auth/server";

export default getAuth().middleware({
  loginUrl: "/auth/sign-in",
});

export const config = {
  matcher: ["/((?!_next|favicon.ico|auth|api/auth).*)"],
};
