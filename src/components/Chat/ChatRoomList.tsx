"use client";

/* eslint-disable no-console */
import { Box, Container, Divider } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import { ChatRoomCard, IChatRoom } from "@components/Chat/ChatRoomCard";

import { CreateChatRoomCard } from "./CreateChatRoomCard";

interface Props {
  userRooms: IChatRoom[];
  publicRooms: IChatRoom[];
}

export const ChatRoomsList: React.FC<Props> = ({ userRooms, publicRooms }) => {
  const handleEnterRoom = (room: IChatRoom) => {
    console.log("Entering room:", room);
    // router.push(`/chat/${room.id}`)
  };

  const handleJoinRoom = (room: IChatRoom) => {
    console.log("Joining room:", room);
    // chamada de API para entrar na sala
  };

  return (
    <Container sx={{ p: 3 }}>
      <BaseText variant="h4" font="raleway" fontWeight="bold" mb={2} text="Chat Rooms" />
      <BaseText variant="h6" mb={2} text="Your Rooms" />

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
        }}>
        {userRooms.map((room) => (
          <ChatRoomCard key={room.id} room={room} isMember onEnter={handleEnterRoom} />
        ))}

        <CreateChatRoomCard />
      </Box>

      <Divider sx={{ my: 3 }} />

      <BaseText variant="h6" mb={2} text="Public Rooms" />

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
        }}>
        {publicRooms.map((room) => (
          <ChatRoomCard key={room.id} room={room} onJoin={handleJoinRoom} />
        ))}

        <CreateChatRoomCard />
      </Box>
    </Container>
  );
};
