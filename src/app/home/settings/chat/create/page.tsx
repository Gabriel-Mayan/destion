import React from "react";

import BaseText from "@components/Bases/Elements/BaseText";
import Container from "@components/Bases/Layout/Container";
import CreateEditChatForm from "@components/Forms/CreateEditChatForm";

import { getServerSession } from "@services/auth.service";

export default async function CreateChatPage() {
  const session = await getServerSession();

  return (
    <Container>
      <BaseText variant="h6" text="Create a new Chat Room" sx={{ mb: 2 }} />
      <CreateEditChatForm token={session?.user.token!} />
    </Container>
  );
}
