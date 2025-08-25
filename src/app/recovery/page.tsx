import React from "react";
import { Box, Container } from "@mui/material";

import RecoveryPasswordForm from "@components/Forms/RecoveryPasswordForm";
import Logo from "@components/Bases/UI/Logo";

export default function RecoveryPasswordPage() {
  return (
    <Container maxWidth="xs" sx={{ my: 8, height: "70vh", width: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
        <Logo size="medium" />
        <RecoveryPasswordForm />
      </Box>
    </Container>
  );
}
