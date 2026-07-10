import NextAuth, { type User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      const allowedEmails = ["fabohax@gmail.com", "edicionesvicioperpetuo@gmail.com"];
      return Boolean(user.email && allowedEmails.includes(user.email));
    },
  },
});
