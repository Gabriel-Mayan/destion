/* eslint-disable no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import { Box, Divider } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import { ChatRoomCard, IChatRoom } from "@components/Cards/ChatRoomCard";

import { app } from "@services/app.service";

import { showToast } from "@utils/notify.util";

import { CreateChatRoomCard } from "../Cards/CreateChatRoomCard";

interface Props {
  token: string;
  userRooms: IChatRoom[];
  publicRooms: IChatRoom[];
}

export const ChatRoomsList: React.FC<Props> = ({ userRooms, publicRooms, token }) => {
  const router = useRouter();

  const handleEnterRoom = async (chat: IChatRoom) => {
    try {
      await app({ url: "api/chat/join", token, data: { chatId: chat.id } });

      router.push(`/home/chat/${chat.id}`);
    } catch (error) {
      showToast({ type: "error", message: "Error entering chat, please try again in a few moments" });
    }
  };

  return (
    <Box>
      <Box
        sx={{
          gap: 3,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
        }}>
        {userRooms && userRooms.map((room) => <ChatRoomCard key={room.id} room={room} isMember onEnter={handleEnterRoom} />)}

        <CreateChatRoomCard />
      </Box>

      <Divider sx={{ my: 3 }} />

      <BaseText variant="h6" mb={2} text="Public Rooms" />

      <Box
        sx={{
          gap: 3,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
        }}>
        {publicRooms && publicRooms.map((room) => <ChatRoomCard key={room.id} room={room} onJoin={handleEnterRoom} />)}

        <CreateChatRoomCard />
      </Box>
    </Box>
  );
};
