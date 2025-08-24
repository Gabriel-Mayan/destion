import React from "react";
import { Box, Container } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import CreateChatForm from "@components/Forms/CreateChatForm";

import { getServerSession } from "@services/auth.service";

export default async function CreateChatPage() {
  const session = await getServerSession();

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
        }}>
        <BaseText variant="h5" text="Create a new Chat Room" sx={{ mb: 2 }} />
        <CreateChatForm token={session?.user.token!} />
      </Box>
    </Container>
  );
}
