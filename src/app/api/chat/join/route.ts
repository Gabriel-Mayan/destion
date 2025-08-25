/* eslint-disable no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

import { api } from "@services/api.service";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "");

  const { chatId } = await request.json();

  try {
    const resposta = await api({ url: `chats/${chatId}/join`, token });

    return NextResponse.json(resposta, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
