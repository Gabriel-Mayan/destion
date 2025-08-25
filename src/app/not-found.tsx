"use client";

import React from "react";
import { Container, Grid, useTheme } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import BaseImage from "@components/Bases/Elements/BaseImage";
import BaseButton from "@components/Bases/Elements/BaseButton";

const data = {
  title: "Page Not Found",
  description: "Sorry, the page you are looking for does not exist...",
  buttonText: "Home Page",
};

export default function NotFoundPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Container
      sx={{
        px: { xs: 4, sm: 8, md: 12 },
        gap: 3,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        alignItems: "center",
        justifyItems: "center",
        minWidth: "100%",
        minHeight: "100vh",
      }}>
      <Grid sx={{ display: "grid", flexDirection: "column", justifyItems: "center", alignContent: "center" }}>
        <BaseText variant="h3" fontWeight={700} gutterBottom text={data.title} />
        <BaseText variant="h6" color="text.secondary" text={data.description} />

        <BaseButton text={data.buttonText} />
      </Grid>

      <BaseImage
        src={isDark ? "/assets/not-found-dark.png" : "/assets/not-found.png"}
        sx={{
          display: { xs: "none", md: "block" },
          maskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        }}
      />
    </Container>
  );
}
