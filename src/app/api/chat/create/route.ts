/* eslint-disable no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

import { api } from "@services/api.service";

export async function POST(request: NextRequest) {
  const { title, description, isPublic } = await request.json();

  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "");

  try {
    const resposta = await api({ url: `chats`, data: { title, description, isPublic }, token });

    return NextResponse.json(resposta, { status: resposta.statusCode });
  } catch (error) {
    return NextResponse.json([], { status: 401 });
  }
}
