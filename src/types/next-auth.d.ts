/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";

type TUserSession = {
  id: string;
  nome: string;
  email: string;
  avatarUrl?: string;
};
export interface Session {
  user: { user: TUserSession; token?: string; accessTokenExpires?: number };
  error?: string;
}

declare module "next-auth" {
  interface Session {
    user: { user: TUserSession; token?: string; accessTokenExpires?: number };
    error?: string;
  }

  interface User extends TUserSession {}
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    nome?: string;
    email?: string;
    accessToken?: string;
    accessTokenExpires?: number;
    error?: string; // 👈 idem para o token
  }
}
