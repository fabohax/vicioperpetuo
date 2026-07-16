import NextAuth, { type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const productionAuthUrl = "https://vicioperpetuo.com";
const isDev = process.env.NODE_ENV !== "production";
const allowedEmails = ["fabohax@gmail.com", "edicionesvicioperpetuo@gmail.com"];
const isVercel = Boolean(process.env.VERCEL);
const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

if (!isDev) {
  process.env.AUTH_URL ||= process.env.NEXTAUTH_URL || productionAuthUrl;
  process.env.NEXTAUTH_URL ||= process.env.AUTH_URL;
}

export const { handlers, auth } = NextAuth({
  secret: authSecret,
  trustHost: isDev || isVercel || process.env.AUTH_TRUST_HOST === "true",
  providers: [
    ...(isDev
      ? [
          CredentialsProvider({
            id: "dev-admin",
            name: "Dev Admin",
            credentials: {},
            async authorize() {
              return {
                id: "dev-admin",
                name: "Dev Admin",
                email: allowedEmails[0],
              };
            },
          }),
        ]
      : []),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      return Boolean(user.email && allowedEmails.includes(user.email));
    },
  },
});
