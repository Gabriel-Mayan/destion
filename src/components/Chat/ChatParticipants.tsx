"use client";

import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { Avatar, Badge, Box } from "@mui/material";

interface User {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface ChatParticipantsProps {
  creator: User;
  participants: User[];
}

export const ChatParticipants: React.FC<ChatParticipantsProps> = ({ creator, participants }) => {
  const allParticipants = [creator, ...participants.filter((p) => p.id !== creator.id)];

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {allParticipants.map((p) =>
        p.id === creator.id ? (
          <Badge
            key={p.id}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={<StarIcon fontSize="small" sx={{ bgcolor: "warning.main", borderRadius: "50%", color: "white", p: "2px" }} />}>
            <Avatar src={p.avatarUrl || undefined}>{p.name[0]}</Avatar>
          </Badge>
        ) : (
          <Avatar key={p.id} src={p.avatarUrl || undefined}>
            {p.name[0]}
          </Avatar>
        )
      )}
    </Box>
  );
};
