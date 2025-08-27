/* eslint-disable no-unused-vars */
"use client";

import React, { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Paper, useTheme } from "@mui/material";

import { Avatar } from "@components/Bases/UI/Avatar";
import BaseText from "@components/Bases/Elements/BaseText";

import { app } from "@services/app.service";

import { showToast } from "@utils/notify.util";

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

interface ChatMessageProps {
  message: Message;
  session: Session;
  chatId: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, session, chatId }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOwnMessage = message.sender.id === session.user.user.id;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleDelete = async () => {
    handleClose();
    if (!message.id || !session?.user.token) return;

    try {
      await app({
        url: "api/message/delete",
        method: "DELETE",
        data: { messageId: message.id, chatId },
        token: session.user.token,
      });
    } catch (err: any) {
      showToast({ type: "error", message: "Failed to delete message" });
    }
  };

  const handleEdit = async () => {
    handleClose();
    if (!message.id || !session?.user.token) return;

    const newContent = prompt("Edit your message:", message.content);
    if (newContent === null || newContent === message.content) return;

    try {
      await app({
        url: "api/message/edit",
        method: "PATCH",
        data: { messageId: message.id, content: newContent, chatId },
        token: session.user.token,
      });
    } catch (err: any) {
      showToast({ type: "error", message: "Failed to edit message" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isOwnMessage ? "row-reverse" : "row",
        gap: 1,
        alignItems: "flex-start",
      }}>
      <Avatar name={message.sender.name} size={32} isCreator={false} />
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
          position: "relative",
        }}>
        {isOwnMessage && (
          <>
            <IconButton size="small" sx={{ position: "absolute", top: 4, right: 4 }} onClick={handleClick}>
              <ArrowDropDown fontSize="small" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </>
        )}

        <Box>
          <BaseText variant="subtitle2" text={message.sender.name} />
          <BaseText variant="body1" text={message.content} />
        </Box>

        <BaseText variant="caption" text={message.createdAt} sx={{ alignSelf: "end" }} />
      </Paper>
    </Box>
  );
};

export default ChatMessage;
