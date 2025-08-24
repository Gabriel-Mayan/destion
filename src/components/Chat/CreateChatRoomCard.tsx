"use client";

import React from "react";
import { Add } from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";

export const CreateChatRoomCard = () => {
  const handleCreateRoom = () => {
    // chamada de API para criar a sala
  };

  return (
    <Card
      sx={{
        height: "25vh",
        width: "20vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "2px dashed #aaa",
        cursor: "pointer",
        transition: "0.2s all",
        "&:hover": {
          borderColor: "primary.main",
          backgroundColor: "#f9f9f9",
        },
      }}
      onClick={handleCreateRoom}>
      <CardContent sx={{ textAlign: "center" }}>
        <Add fontSize="large" color="primary" />
        <BaseText variant="body1" font="raleway" text="Create New Room" sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );
};
