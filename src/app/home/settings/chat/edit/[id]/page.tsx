import React from "react";

import BaseText from "@components/Bases/Elements/BaseText";
import Container from "@components/Bases/Layout/Container";
import CreateEditChatForm from "@components/Forms/CreateEditChatForm";

import { app } from "@services/app.service";
import { getServerSession } from "@services/auth.service";

type IPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditChatPage({ params }: IPageProps) {
  const chatId = (await params).id;
  const session = await getServerSession();

  const response = await app({ url: "api/chat/get-by-id", data: { chatId }, token: session?.user.token });
  const chat: any = response.data;

  return (
    <Container>
      <BaseText variant="h6" text="Edit a Chat Room" sx={{ mb: 2 }} />
      <CreateEditChatForm token={session?.user.token!} chatData={chat} />
    </Container>
  );
}
