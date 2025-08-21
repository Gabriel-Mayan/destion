/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";

type TUserSession = {
  id: string;
  nome: string;
  email: string;
  token: string;
};

declare module "next-auth" {
  interface Session {
    user: TUserSession;
  }

  interface User extends Session.user {}
}
