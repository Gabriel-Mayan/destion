"use client";

import { Box } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";

import BaseText from "@components/Bases/Elements/BaseText";
import ChatMessage from "@components/Chat/ChatMessage";

import { SocketContext } from "@/context/SocketContext";
import { Session } from "@/types/next-auth";

interface User {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface Message {
  id?: string;
  sender: User;
  content: string;
  createdAt: string;
  chat?: { id: string };
}

interface ChatMessageListProps {
  initialMessages: Message[];
  session: Session;
  chatId: string;
}

interface SocketPayload {
  type: "created" | "updated" | "deleted";
  chatId: string;
  message?: Message;
  messageId?: string;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({ initialMessages, session, chatId }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { socket, socketIsConnected } = useContext(SocketContext);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!socket || !socketIsConnected) return;

    const handleSocketMessage = (payload: SocketPayload) => {
      if (payload.chatId !== chatId) return;

      switch (payload.type) {
        case "created":
          if (payload.message) {
            setMessages((prev) => [...prev, payload.message!].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
          }
          break;

        case "updated":
          if (payload.message) {
            setMessages((prev) => prev.map((msg) => (msg.id === payload.message!.id ? { ...msg, content: payload.message!.content } : msg)));
          }
          break;

        case "deleted":
          if (payload.messageId) {
            setMessages((prev) => prev.filter((msg) => msg.id !== payload.messageId));
          }
          break;
      }
    };

    socket.on("message", handleSocketMessage);

    return () => {
      socket.off("message", handleSocketMessage);
    };
  }, [socket, socketIsConnected, chatId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        px: 1,
        flex: 1,
        overflowY: "auto",
        maxHeight: "60vh",
      }}>
      {messages.length === 0 && <BaseText variant="body2" color="text.secondary" text="No messages yet" align="center" sx={{ mt: 2 }} />}

      {messages.map((msg) => (
        <ChatMessage key={msg.id || Math.random()} message={msg} session={session} chatId={chatId} />
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};
