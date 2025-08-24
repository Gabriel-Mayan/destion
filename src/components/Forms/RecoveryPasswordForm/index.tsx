/* eslint-disable no-unused-vars */
"use client";

import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormContainer from "@components/Forms/Container";
import BasicInput from "@components/Bases/Inputs/BasicInput";
import CaptchaInput from "@components/Bases/Inputs/CaptchaInput";

import { app } from "@services/app.service";

import { showToast } from "@utils/notify.util";

import { recoveryPasswordSchema as schema } from "./validation";

type IFormData = z.infer<typeof schema>;

export default function RecoveryPasswordForm() {
  const { control, handleSubmit, formState } = useForm<IFormData>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: IFormData) {
    try {
      setIsLoading(true);

      await app({ url: "api/auth/recovery-password", data });
    } catch (error) {
      setIsLoading(false);
    } finally {
      showToast({ message: "If the user is registered, a verification email has been sent.", type: "success" });

      setIsLoading(false);
    }
  }

  return (
    <FormContainer handleSubmit={handleSubmit(onSubmit)} loading={isLoading} nextStepText="Send">
      <BasicInput name="email" label="Email" control={control} error={errors.email?.message} />
      <CaptchaInput name="captcha" control={control} error={errors.captcha?.message} />
    </FormContainer>
  );
}
