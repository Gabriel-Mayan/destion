/* eslint-disable no-console */
"use client";

import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormContainer from "@components/Forms/Container";
import PasswordInput from "@components/Bases/Inputs/PasswordInput";

import { app } from "@services/app.service";

import { showToast } from "@utils/notify.util";

import { passwordChangeSchema as schema } from "./validation";

type IFormData = z.infer<typeof schema>;

export default function ChangePasswordForm({ recoveryId }: { recoveryId: string }) {
  const { control, handleSubmit, formState } = useForm<IFormData>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: IFormData) {
    try {
      setIsLoading(true);

      const response = await app({
        url: "api/auth/change-password",
        data: { recoveryId, ...data },
      });

      showToast({ message: response.data.message, type: "success" });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormContainer handleSubmit={handleSubmit(onSubmit)} loading={isLoading} nextStepText="Change password">
      <PasswordInput name="password" label="New password" control={control} error={errors.password?.message} />
      <PasswordInput name="confirmPassword" label="Confirm new password" control={control} error={errors.confirmPassword?.message} />
    </FormContainer>
  );
}
