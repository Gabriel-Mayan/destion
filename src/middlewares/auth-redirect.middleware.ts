import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const publicRoutes = ["/login", "/register", "/recovery"];

export async function authRedirectMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  if (!isPublicRoute) return;

  const token = await getToken({ req: request, secret });

  if (!token) return;

  return NextResponse.redirect(new URL("/home", request.url));
}
