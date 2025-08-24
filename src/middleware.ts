import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import middlewares from "./middlewares";

export async function middleware(request: NextRequest) {
  for await (const middleware of middlewares) {
    const response = await middleware(request);

    if (response) return response;
  }

  return NextResponse.next();
}
