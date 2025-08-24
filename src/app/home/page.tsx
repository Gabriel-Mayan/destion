import { IChatRoom } from "@components/Chat/ChatRoomCard";
import { ChatRoomsList } from "@components/Chat/ChatRoomList";

import { app } from "@services/app.service";
import { getServerSession } from "@services/auth.service";

export default async function ChatPage() {
  const session = await getServerSession();

  const response = await app({ url: "api/chat/list", token: session?.user.token, method: "GET" });
  const chats: IChatRoom[] = response.data;

  const userRooms = chats.filter((chat) => chat.creator.id === session?.user.user.id);
  const publicRooms = chats.filter((chat) => chat.isPublic);

  return <ChatRoomsList userRooms={userRooms} publicRooms={publicRooms} />;
}
