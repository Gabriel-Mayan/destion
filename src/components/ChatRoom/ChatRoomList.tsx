/* eslint-disable no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import { Box, Divider } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import { ChatRoomCard, IChatRoom } from "@components/ChatRoom/ChatRoomCard";

import { app } from "@services/app.service";

import { showToast } from "@utils/notify.util";

import { ChatRoomCreateCard } from "./ChatRoomCreateCard";

interface ChatRoomsListProps {
  rooms: IChatRoom[];
  title?: string;
  token: string;
  isMemberList?: boolean;
  showCreateCard?: boolean;
}

export const ChatRoomsList: React.FC<ChatRoomsListProps> = ({ rooms, title, token, isMemberList = false, showCreateCard = false }) => {
  const router = useRouter();

  const handleEnterRoom = async (chat: IChatRoom) => {
    try {
      await app({ url: "api/chat/join", token, data: { chatId: chat.id } });

      router.push(`/home/chat/${chat.id}`);
    } catch (error) {
      showToast({ type: "error", message: "Error entering chat, please try again in a few moments" });
    }
  };

  if (!rooms || rooms.length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      {title && <BaseText variant="h6" mb={2} text={title} />}
      <Box
        sx={{
          gap: 3,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
        }}>
        {rooms.map((room) =>
          isMemberList ? (
            <ChatRoomCard key={room.id} room={room} isMember onEnter={handleEnterRoom} />
          ) : (
            <ChatRoomCard key={room.id} room={room} onJoin={handleEnterRoom} />
          )
        )}

        {showCreateCard && <ChatRoomCreateCard />}
      </Box>

      {title && <Divider sx={{ my: 3 }} />}
    </Box>
  );
};
