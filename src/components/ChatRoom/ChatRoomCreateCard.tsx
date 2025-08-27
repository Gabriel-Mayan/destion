"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Add } from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";

export const ChatRoomCreateCard = () => {
  const router = useRouter();

  const handleCreateRoom = () => {
    router.push("/home/settings/chat/create");
  };

  return (
    <Card
      sx={{
        width: "100%",
        minHeight: 180,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "2px dashed #aaa",
        borderRadius: 4,
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
        <BaseText variant="body1" font="raleway" text="Create New Chat Room" sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );
};
