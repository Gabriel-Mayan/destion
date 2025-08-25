/* eslint-disable no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import { Box, Divider } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import { ChatRoomCard, IChatRoom } from "@components/ChatRoom/ChatRoomCard";
import { AddButton } from "@components/Bases/UI/addButton";

import { showToast } from "@utils/notify.util";

interface ChatRoomsListProps {
  rooms: IChatRoom[];
  title?: string;
  isMemberList?: boolean;
}

export const ChatRoomsList: React.FC<ChatRoomsListProps> = ({ rooms, title, isMemberList = false }) => {
  const router = useRouter();

  const handleEnterRoom = async (chat: IChatRoom) => {
    try {
      router.push(`/home/chat/${chat.id}`);
    } catch (error) {
      showToast({
        type: "error",
        message: "Error entering chat, please try again in a few moments",
      });
    }
  };

  if (!rooms || rooms.length === 0) return null;

  return (
    <Box sx={{ mb: 4, px: { xs: 2, sm: 0 } }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <BaseText variant="h6" text={title} />
        <AddButton redirectTo="/home/chat/create" />
      </Box>
      <Divider sx={{ mt: -2, mb: 4 }} />

      <Box
        sx={{
          display: "grid",
          gap: { xs: 2, sm: 3 },
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(auto-fill, minmax(260px, 1fr))",
          },
        }}>
        {rooms.map((room) =>
          isMemberList ? (
            <ChatRoomCard key={room.id} room={room} isMember onEnter={handleEnterRoom} />
          ) : (
            <ChatRoomCard key={room.id} room={room} onJoin={handleEnterRoom} />
          )
        )}
      </Box>
    </Box>
  );
};
