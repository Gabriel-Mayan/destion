/* eslint-disable no-unused-vars */
"use client";

import { Box } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

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
}

interface ChatMessageListProps {
  initialMessages: Message[];
  session: Session;
  chatId: string;
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

    const handleMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
    };

    const handleMessageEdit = (editedMsg: Message) => {
      setMessages((prev) => prev.map((msg) => (msg.id === editedMsg.id ? { ...msg, content: editedMsg.content } : msg)));
    };

    const handleMessageDelete = (deletedMsg: { id: string }) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== deletedMsg.id));
    };

    socket.on("message", handleMessage);
    socket.on("message-edit", handleMessageEdit);
    socket.on("message-delete", handleMessageDelete);

    return () => {
      socket.off("message", handleMessage);
      socket.off("message-edit", handleMessageEdit);
      socket.off("message-delete", handleMessageDelete);
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
        <ChatMessage key={msg.id || Math.random()} message={msg} session={session} chatId={msg.id!} />
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};
