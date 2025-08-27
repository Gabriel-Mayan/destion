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

import { ChatRoomCreateCard } from "./ChatRoomCreateCard";

import { Session } from "@/types/next-auth";

interface ChatRoomsListProps {
  rooms: IChatRoom[];
  session: Session;
  title?: string;
  isMemberList?: boolean;
}

interface SocketPayload {
  type: "created" | "updated" | "deleted";
  chatId: string;
  data?: IChatRoom;
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

  const sortRooms = (rooms: IChatRoom[]) => rooms.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());

  useEffect(() => {
    if (!socket || !socketIsConnected) return;

    const handleSocketRoom = (payload: SocketPayload) => {
      switch (payload.type) {
        case "created":
          if (payload.data) setRooms((prev) => sortRooms([...prev, payload.data!]));
          break;

        case "updated":
          if (payload.data) setRooms((prev) => sortRooms(prev.map((room) => (room.id === payload.chatId ? payload.data! : room))));
          break;

        case "deleted":
          setRooms((prev) => prev.filter((room) => room.id !== payload.chatId));
          break;
      }
    };

    socket.on("chat", handleSocketRoom);

    return () => {
      socket.off("chat", handleSocketRoom);
    };
  }, [socket, socketIsConnected]);

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
        {rooms.length ? (
          rooms.map((room) => <ChatRoomCard key={room.id} room={room} onJoin={handleEnterRoom} session={session} />)
        ) : (
          <ChatRoomCreateCard />
        )}
      </Box>
    </Box>
  );
};
