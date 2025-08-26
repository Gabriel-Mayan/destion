/* eslint-disable no-unused-vars */
"use client";

import { Box, Divider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SocketContext } from "@context/SocketContext";

import { AddButton } from "@components/Bases/UI/addButton";
import BaseText from "@components/Bases/Elements/BaseText";
import { ChatRoomCard, IChatRoom } from "@components/ChatRoom/ChatRoomCard";

import { showToast } from "@utils/notify.util";

import { Session } from "@/types/next-auth";

interface ChatRoomsListProps {
  rooms: IChatRoom[];
  session: Session;
  title?: string;
  isMemberList?: boolean;
}

export const ChatRoomsList: React.FC<ChatRoomsListProps> = ({ rooms: initialRooms, title, session }) => {
  const router = useRouter();
  const { socket, socketIsConnected } = useContext(SocketContext);

  const [rooms, setRooms] = useState<IChatRoom[]>(initialRooms);

  const handleEnterRoom = async (chat: IChatRoom) => {
    try {
      router.push(`/home/chat/${chat.id}`);
    } catch (error) {
      showToast({ type: "error", message: "Error entering chat, please try again in a few moments" });
    }
  };

  useEffect(() => {
    if (!socket || !socketIsConnected) return;

    const handleRoomDeleted = (deletedRoom: { id: string }) => {
      setRooms((prev) => prev.filter((room) => room.id !== deletedRoom.id));
    };

    const handleRoomEdited = (editedRoom: IChatRoom) => {
      setRooms((prev) => prev.map((room) => (room.id === editedRoom.id ? { ...room, ...editedRoom } : room)));
    };

    socket.on("deleted-room", handleRoomDeleted);
    socket.on("edited-room", handleRoomEdited);

    return () => {
      socket.off("deleted-room", handleRoomDeleted);
      socket.off("edited-room", handleRoomEdited);
    };
  }, [socket, socketIsConnected]);

  if (!rooms || rooms.length === 0) return null;

  return (
    <Box sx={{ mb: 4, px: { xs: 2, sm: 0 } }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <BaseText variant="h6" text={title} />
        <AddButton redirectTo="/home/settings/chat/create" />
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
        {rooms.map((room) => (
          <ChatRoomCard key={room.id} room={room} onJoin={handleEnterRoom} session={session} />
        ))}
      </Box>
    </Box>
  );
};
