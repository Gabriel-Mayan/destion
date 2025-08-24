/* eslint-disable no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

import { api } from "@services/api.service";

export async function POST(request: NextRequest) {
  const { name, email, password, confirmPassword } = await request.json();

  try {
    const resposta = await api({ url: `auth/register`, data: { name, email, password, confirmPassword } });

    return NextResponse.json(resposta, { status: resposta.statusCode });
  } catch (error) {
    return NextResponse.json([], { status: 401 });
  }
}
