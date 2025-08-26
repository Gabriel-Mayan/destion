/* eslint-disable no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

import { api } from "@services/api.service";

export async function PATCH(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "");

  const { title, chatId, description, isPublic } = await request.json();

  try {
    const resposta = await api({ url: `chats/${chatId}`, data: { title, description, isPublic }, token, method: "PATCH" });

    return NextResponse.json(resposta, { status: resposta.statusCode });
  } catch (error) {
    return NextResponse.json([], { status: 401 });
  }
}
