"use client";

import React from "react";
import { Box, Avatar as MuiAvatar } from "@mui/material";
import { Star } from "@mui/icons-material";

interface RoomAvatarProps {
  name: string;
  isCreator?: boolean;
  size?: number;
}

export const Avatar: React.FC<RoomAvatarProps> = ({ name, isCreator = false, size = 48 }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-block", width: size, height: size }}>
      <MuiAvatar sx={{ width: size, height: size }}>{name[0]}</MuiAvatar>
      {isCreator && (
        <Star
          fontSize="small"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            bgcolor: "warning.main",
            borderRadius: "50%",
            color: "white",
            width: size * 0.375, // proporcional ao avatar
            height: size * 0.375,
            p: 0.2,
          }}
        />
      )}
    </Box>
  );
};
