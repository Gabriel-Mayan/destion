import { Container, Divider, Paper } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import { ChatMessageList } from "@components/Chat/ChatMessageList";
import { ChatParticipants } from "@components/Chat/ChatParticipants";
import { SendMessageForm } from "@components/Forms/MessageForm";

import { getServerSession } from "@services/auth.service";
import { app } from "@services/app.service";

type IPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ChatPage({ params }: IPageProps) {
  const chatId = (await params).id;
  const session = await getServerSession();

  const response = await app({ url: "api/chat/details", data: { chatId }, token: session?.user.token });
  const chat: any = response.data;

  return (
    <Container sx={{ my: 4 }}>
      <BaseText variant="h4" font="raleway" fontWeight="bold" text={chat.title} />
      <BaseText variant="h6" mb={2} text={chat.description} />

      <Paper sx={{ display: "flex", borderRadius: 2, flexDirection: "column", mx: "auto", my: "auto", p: 2, pb: 0 }}>
        <ChatParticipants creator={chat.creator} participants={chat.participants} />
        <Divider sx={{ my: 2 }} />
        <ChatMessageList messages={chat.messages} currentUserId={session?.user.user.id!} />
        <SendMessageForm chatId={chatId} session={session} />
      </Paper>
    </Container>
  );
}
