"use client";

import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import FormContainer from "@components/Forms/Container";
import BasicInput from "@components/Bases/Inputs/BasicInput";
import SwitchInput from "@components/Bases/Inputs/SwitchInput";

import { app } from "@services/app.service";

import { createChatSchema, editChatSchema } from "./validation";

import { showToast } from "@/utils/notify.util";

type ChatData = {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
};

type IFormData = z.infer<typeof createChatSchema> | z.infer<typeof editChatSchema>;

interface CreateChatFormProps {
  token: string;
  chatData?: ChatData;
}

export default function CreateEditChatForm({ token, chatData }: CreateChatFormProps) {
  const router = useRouter();
  const isEdit = !!chatData;

  const schema = isEdit ? editChatSchema : createChatSchema;

  const { control, handleSubmit, formState } = useForm<IFormData>({
    resolver: zodResolver(schema),
    defaultValues: isEdit
      ? {
          title: chatData.name,
          description: chatData.description || "",
          isPublic: chatData.isPublic,
        }
      : { isPublic: true },
  });

  const { errors } = formState;
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: IFormData) {
    try {
      setIsLoading(true);

      const response = await app({
        url: `api/chat/${isEdit ? "edit" : "create"}`,
        method: isEdit ? "PATCH" : "POST",
        data: { ...data, chatId: chatData?.id },
        token,
      });

      showToast({ message: response.data?.message || `Chat ${isEdit ? "edited" : "created"} successfully!`, type: "success" });

      if (!isEdit) {
        router.push(`/home/chat/${response.data?.id}`);
      }
    } catch (error: any) {
      showToast({ message: error?.message || "Failed to submit chat", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormContainer handleSubmit={handleSubmit(onSubmit)} loading={isLoading} nextStepText={isEdit ? "Edit Chat" : "Create Chat"}>
      <BasicInput name="title" label="Chat Title" control={control} error={errors.title?.message} />
      <BasicInput name="description" label="Description (optional)" control={control} error={errors.description?.message} />
      <SwitchInput name="isPublic" label="Public Chat" control={control} />
    </FormContainer>
  );
}
