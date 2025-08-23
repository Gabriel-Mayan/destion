import React from "react";
import { Box, Container } from "@mui/material";

import RecoveryPasswordForm from "@components/Forms/RecoveryPasswordForm";
import Logo from "@components/Bases/UI/Logo";

export default function RecoveryPasswordPage() {
  return (
    <Container maxWidth="xs" sx={{ my: 4, height: "70vh", width: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
        }}>
        <Logo size="medium" />
        <RecoveryPasswordForm />
      </Box>
    </Container>
  );
}
