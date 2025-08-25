import { Container } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import { IChatRoom } from "@components/Cards/ChatRoomCard";
import { ChatRoomsList } from "@components/Chat/ChatRoomList";

import { app } from "@services/app.service";
import { getServerSession } from "@services/auth.service";

export default async function ChatPage() {
  const session = await getServerSession();

  const response = await app({ url: "api/chat/list", token: session?.user.token, method: "GET" });
  const chats: IChatRoom[] = response.data;

  const userRooms = chats && chats.length && chats.filter((chat) => chat.isParticipant);
  const publicRooms = chats && chats.length && chats.filter((chat) => chat.isPublic);

  return (
    <Container sx={{ mt: 4, mb: 8 }}>
      <BaseText variant="h3" font="raleway" fontWeight="bold" text="Chat Rooms" />
      <BaseText variant="h6" mb={2} text="Your Rooms" />

      <ChatRoomsList userRooms={userRooms !== 0 ? userRooms : []} publicRooms={publicRooms !== 0 ? publicRooms : []} token={session?.user.token!} />
    </Container>
  );
}
