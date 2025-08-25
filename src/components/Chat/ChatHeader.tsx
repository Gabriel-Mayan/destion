"use client";

import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";

interface User {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface ChatHeaderProps {
  creator: User;
  participants: User[];
  chatName?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ creator, participants, chatName }) => {
  const allParticipants = [creator, ...participants.filter((p) => p.id !== creator.id)];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
        px: 1,
      }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar src={creator.avatarUrl || undefined} sx={{ width: 48, height: 48, fontSize: 18 }}>
          {creator.name[0]}
        </Avatar>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {chatName || creator.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {participants.length > 0 ? `${allParticipants.length} participant${allParticipants.length > 1 ? "s" : ""}` : "Just you"}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title="More">
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
