"use client";

import { useForm } from "react-hook-form";
import { IconButton, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

import FormContainer from "@components/Forms/Container";
import BasicInput from "@components/Bases/Inputs/BasicInput";

import { app } from "@services/app.service";

import { showToast } from "@utils/notify.util";

import { Session } from "@/types/next-auth";

interface IMessageForm {
  content: string;
}

export const ChatMessageSender = ({ chatId, session }: { chatId: string; session: Session | null }) => {
  const { control, handleSubmit, reset, formState } = useForm<IMessageForm>({
    defaultValues: { content: "" },
  });

  const { errors } = formState;

  const onSubmit = async (data: IMessageForm) => {
    if (!data.content.trim() || !session) return;

    try {
      await app({ url: "api/chat/send-message", data: { ...data, chatId }, token: session.user.token });
      reset();
    } catch (error: any) {
      showToast({ message: error?.message || "Failed to send message", type: "error" });
    }
  };

  const handleEmojiClick = () => {
    showToast({ message: "Emoji picker not implemented yet", type: "info" });
  };

  return (
    <FormContainer handleSubmit={handleSubmit(onSubmit)} nextStepText="" sx={{ flexDirection: "row", gap: 1, p: 1, mb: -4 }}>
      <BasicInput
        name="content"
        label=""
        placeholder="Type your message..."
        control={control}
        error={errors.content?.message}
        sx={{ flex: 1, mb: 0 }}
        endAdornment={
          <InputAdornment position="end" sx={{ display: "flex", gap: 0.5 }}>
            <IconButton onClick={handleEmojiClick} color="primary">
              <InsertEmoticonIcon />
            </IconButton>

            <IconButton type="submit" color="primary">
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormContainer>
  );
};
