"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Add } from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";

export const CreateChatRoomCard = () => {
  const router = useRouter();

  const handleCreateRoom = () => {
    router.push("/home/chat/create");
  };

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "48%", md: "31%", lg: "20vw" },
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
        <BaseText variant="body1" font="raleway" text="Create New Room" sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );
};
