import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function loginMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/login")) return;

  const token = await getToken({ req: request, secret });

  if (!token) return;

  return NextResponse.redirect(new URL("/home", request.url));
}
