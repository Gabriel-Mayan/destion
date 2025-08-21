"use client";

import React from "react";
import { Box, keyframes } from "@mui/material";

import Logo from "@components/Bases/UI/Logo";
import BaseText from "@components/Bases/Elements/BaseText";

const wave = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-20px) scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

interface LoadingProps {
  mensagem?: string;
}

export default function Loading({ mensagem = "Carregando..." }: LoadingProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}>
      <Logo href={null} sx={{ animation: `${wave} 2s ease-in-out infinite` }} size="bigger" />
      <BaseText text={mensagem} mt={2} color="white" fontSize={18} />
    </Box>
  );
}
