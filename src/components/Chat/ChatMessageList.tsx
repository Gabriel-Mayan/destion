"use client";

import React from "react";
import { Avatar, Box, Paper } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";

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

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export const ChatMessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  if (messages.length === 0) {
    return <BaseText variant="body2" color="text.secondary" text="No messages yet" align="center" sx={{ mt: 2 }} />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, px: 1 }}>
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
            <Avatar src={msg.sender.avatarUrl || undefined} sx={{ width: 32, height: 32, fontSize: 14 }}>
              {msg.sender.name[0]}
            </Avatar>

            <Paper
              sx={{
                p: 1,
                maxWidth: "80%",
                minWidth: "360px",
                bgcolor: isOwnMessage ? "primary.main" : "grey.200",
                color: isOwnMessage ? "primary.contrastText" : "text.primary",
                borderRadius: 2,
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 1,
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
    </Box>
  );
};
