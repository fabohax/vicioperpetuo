import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      const allowedEmails = ["fabohax@gmail.com", "edicionesvicioperpetuo@gmail.com"];
      
      // Check if the email is defined and in the allowed emails
      if (user.email && allowedEmails.includes(user.email)) {
        return true; // Allow sign-in
      }
      return false; // Deny sign-in
    },
  },
};

export default NextAuth(authOptions);
