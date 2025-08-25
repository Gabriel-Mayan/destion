"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Paper, useTheme } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import { Avatar } from "@components/Bases/UI/Avatar";

import { SocketContext } from "@/context/SocketContext";

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
  currentUserId: string;
  chatId: string;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({ initialMessages, currentUserId, chatId }) => {
  const theme = useTheme();
  const { socket, socketIsConnected } = useContext(SocketContext);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!socket || !socketIsConnected) return;

    const handleMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket, socketIsConnected, chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

      {messages.map((msg) => {
        const isOwnMessage = msg.sender.id === currentUserId;
        return (
          <Box
            key={msg.id || Math.random()}
            sx={{
              display: "flex",
              flexDirection: isOwnMessage ? "row-reverse" : "row",
              gap: 1,
              alignItems: "flex-start",
            }}>
            <Avatar name={msg.sender.name} size={32} isCreator={false} />
            <Paper
              sx={{
                p: 1,
                minWidth: "150px",
                maxWidth: { xs: "60%", sm: "45%" },
                bgcolor: isOwnMessage ? theme.palette.chat.ownMessage : theme.palette.chat.otherMessage,
                color: isOwnMessage ? theme.palette.primary.contrastText : theme.palette.text.primary,
                borderRadius: 2,
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 1,
                wordBreak: "break-word",
              }}>
              <Box>
                <BaseText variant="subtitle2" text={msg.sender.name} />
                <BaseText variant="body1" text={msg.content} />
              </Box>
              <BaseText
                variant="caption"
                text={new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                sx={{ alignSelf: "end" }}
              />
            </Paper>
          </Box>
        );
      })}
      <div ref={messagesEndRef} />
    </Box>
  );
};
