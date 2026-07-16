import { signIn } from "next-auth/react";

export function signInAsAdmin(callbackUrl: string) {
  const provider = process.env.NODE_ENV === "production" ? "google" : "dev-admin";
  return signIn(provider, { callbackUrl });
}
