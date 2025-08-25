import { Container } from "@mui/material";

import { ChatContainer } from "@components/Chat/ChatContainer";

import { app } from "@services/app.service";
import { getServerSession } from "@services/auth.service";

type IPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ChatPage({ params }: IPageProps) {
  const chatId = (await params).id;
  const session = await getServerSession();

  const response = await app({ url: "api/chat/join", data: { chatId }, token: session?.user.token });
  const chat: any = response.data;

  return (
    <Container sx={{ my: 4 }}>
      <ChatContainer initialChatData={chat} chatId={chatId} session={session} />
    </Container>
  );
}
