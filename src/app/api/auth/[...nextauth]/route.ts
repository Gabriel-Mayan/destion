import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { api } from "@services/api.service";

interface CustomUser extends User {
  token: string;
  expiresIn: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        try {
          const response = await api({
            url: "auth/login",
            method: "POST",
            data: { email, password },
          });

          return response?.token ? (response as CustomUser) : null;
        } catch {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          await api({
            url: "auth/social-login",
            method: "POST",
            data: {
              email: profile?.email,
              name: profile?.name,
              avatarUrl: profile?.image,
            },
          });
          return true;
        } catch {
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user) {
        token.id = user.id ?? token.id;
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
        token.picture = (user as any).picture ?? token.picture;
      }

      if (account?.provider === "credentials" && user) {
        const u = user as CustomUser;
        token.token = u.token;

        (token as any).accessTokenExpires = Date.now() + u.expiresIn * 1000;
        return { ...token, ...user } as any;
      }

      if ((token as any).accessTokenExpires && Date.now() >= (token as any).accessTokenExpires) {
        return { ...token, error: "AccessTokenExpired" };
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: token,
        error: (token as any).error,
      };
    },
  },

  pages: {
    error: "/login",
    signIn: "/login",
    signOut: "/logout",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
