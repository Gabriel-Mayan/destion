/* eslint-disable no-unused-vars */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

import FormContainer from "@components/Forms/Container";
import BasicInput from "@components/Bases/Inputs/BasicInput";

import { app } from "@services/app.service";

import { showToast } from "@utils/notify.util";

interface IMessageFormProps {
  onSend: (content: string) => Promise<void>;
}

interface IMessageForm {
  content: string;
}

export const SendMessageForm = ({ chatId, token }: { chatId: string; token: string }) => {
  const { control, handleSubmit, reset, formState } = useForm<IMessageForm>({
    defaultValues: { content: "" },
  });

  const { errors } = formState;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IMessageForm) => {
    if (!data.content.trim()) return;

    try {
      setIsLoading(true);

      await app({ url: "api/chat/send-message", data: { ...data, chatId }, token });

      reset();
    } catch (error: any) {
      showToast({ message: error?.message || "Failed to send message", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer handleSubmit={handleSubmit(onSubmit)} loading={isLoading} sx={{ flexDirection: "row", gap: 1, mb: -6 }} nextStepText="">
      <BasicInput
        name="content"
        label=""
        placeholder="Type your message..."
        control={control}
        error={errors.content?.message}
        sx={{ flex: 1 }}
        endAdornment={
          <IconButton type="submit" color="primary" disabled={isLoading}>
            <SendIcon />
          </IconButton>
        }
      />
    </FormContainer>
  );
};
