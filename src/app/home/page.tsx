import { Container } from "@mui/material";

import { IChatRoom } from "@components/ChatRoom/ChatRoomCard";
import { ChatRoomsList } from "@components/ChatRoom/ChatRoomList";

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
      <ChatRoomsList title={"My Chats"} rooms={userRooms !== 0 ? userRooms : []} session={session!} />
      <ChatRoomsList title={"Public Chats"} rooms={publicRooms !== 0 ? publicRooms : []} session={session!} />
    </Container>
  );
}
