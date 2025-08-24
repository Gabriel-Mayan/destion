/* eslint-disable no-console */
import { IChatRoom } from "@components/Chat/ChatRoomCard";
import { ChatRoomsList } from "@components/Chat/ChatRoomList";

import { app } from "@services/app.service";
import { getServerSession } from "@services/auth.service";

export default async function ChatPage() {
  const session = await getServerSession();

  const handleEnterRoom = (room: IChatRoom) => {
    console.log("Entering room:", room);
    // router.push(`/chat/${room.id}`)
  };

  const handleJoinRoom = (room: IChatRoom) => {
    console.log("Joining room:", room);
    // chamada de API para entrar na sala
  };

  const response = await app({ url: "api/chat/list", token: session?.user.token, method: "GET" });
  const chats: IChatRoom[] = response.data;

  const userRooms = chats.filter((chat) => !chat.isPublic);
  const publicRooms = chats.filter((chat) => chat.isPublic);

  return <ChatRoomsList userRooms={userRooms} publicRooms={publicRooms} onEnterRoom={handleEnterRoom} onJoinRoom={handleJoinRoom} />;
}
