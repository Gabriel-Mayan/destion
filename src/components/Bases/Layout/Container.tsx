"use client";

import React from "react";
import { Box, Container as MuiContainer } from "@mui/material";

import Logo from "@components/Bases/UI/Logo";

interface IFormContainerProps {
  children: React.ReactNode;
  showLogo?: boolean;
  sx?: any;
}

const Container: React.FC<IFormContainerProps> = ({ children, showLogo = true, sx }) => {
  return (
    <MuiContainer
      maxWidth="xs"
      sx={{
        my: 8,
        height: "70vh",
        width: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}>
      <Box
        sx={{
          width: "80vw",
          height: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          transition: "background 0.3s, box-shadow 0.3s",
        }}>
        {showLogo && <Logo size="medium" />}
        {children}
      </Box>
    </MuiContainer>
  );
};

export default Container;
