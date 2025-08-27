import React from "react";
import { Divider, Paper } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import { ChatMessageList } from "@components/Chat/ChatMessageList";
import { ChatHeader } from "@components/Chat/ChatHeader";
import { ChatMessageSender } from "@components/Chat/ChatMessageSender";

interface User {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: User;
}

interface Chat {
  id: string;
  title: string;
  description: string;
  creator: User;
  participants: User[];
  messages: Message[];
}

interface ChatContainerProps {
  chatId: string;
  session: any;
  initialChatData?: Chat;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ chatId, session, initialChatData }) => {
  if (!initialChatData) return <BaseText variant="body1" text="Loading chat..." />;

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        mx: "auto",
        my: "auto",
        p: 2,
        pb: 0,
        height: "80vh",
        minWidth: "300px",
      }}>
      <ChatHeader creator={initialChatData.creator} participants={initialChatData.participants} chatName={initialChatData.title} />
      <Divider sx={{ mb: 1 }} />
      <ChatMessageList initialMessages={initialChatData.messages} session={session} chatId={chatId} />
      <ChatMessageSender chatId={chatId} session={session} />
    </Paper>
  );
};
