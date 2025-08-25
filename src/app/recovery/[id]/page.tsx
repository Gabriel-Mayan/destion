import React from "react";
import { Box, Container } from "@mui/material";

import Logo from "@components/Bases/UI/Logo";
import ChangePasswordForm from "@components/Forms/ChangePasswordForm";

type IPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ChangePasswordPage({ params }: IPageProps) {
  const recoveryId = (await params).id;

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
        <ChangePasswordForm recoveryId={recoveryId} />
      </Box>
    </Container>
  );
}
