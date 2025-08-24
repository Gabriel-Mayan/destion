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

import { showToast } from "@utils/notify.util";

import { createChatSchema as schema } from "./validation";

type IFormData = z.infer<typeof schema>;

export default function CreateChatForm({ token }: { token: string }) {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<IFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      isPublic: true,
    },
  });
  const { errors } = formState;
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: IFormData) {
    try {
      setIsLoading(true);

      const response = await app({ url: "api/chat/create", data, token });

      showToast({ message: response.data?.message || "Chat created successfully!", type: "success" });

      router.push(`/chat/${response.data?.id}`);
    } catch (error: any) {
      showToast({ message: error?.message || "Failed to create chat", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormContainer handleSubmit={handleSubmit(onSubmit)} loading={isLoading} nextStepText="Create Chat">
      <BasicInput name="title" label="Chat Title" control={control} error={errors.title?.message} />
      <BasicInput name="description" label="Description (optional)" control={control} error={errors.description?.message} />
      <SwitchInput name="isPublic" label="Public Chat" control={control} />
    </FormContainer>
  );
}
