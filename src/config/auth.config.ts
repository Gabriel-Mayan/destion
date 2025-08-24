/* eslint-disable no-unused-vars */
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { api } from "@services/api.service";

// TODO Eventualmente fazer ajustes para usar o token do backend e a autenticação do google
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

          return response?.token ? response : null;
        } catch {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  },

  callbacks: {
    async signIn({ account, profile }) {
      // 🔹 Fluxo social login
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
        } catch (err) {
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
        return { ...token, ...user };
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: token,
      };
    },
  },

  pages: {
    error: "/login",
    signIn: "/login",
    signOut: "/login",
  },
};
