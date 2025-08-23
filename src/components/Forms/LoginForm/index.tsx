"use client";

import { z } from "zod";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Google } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";

import FormContainer from "@components/Forms/Container";
import BaseLink from "@components/Bases/Elements/BaseLink";
import BasicInput from "@components/Bases/Inputs/BasicInput";
import BaseButton from "@components/Bases/Elements/BaseButton";
import PasswordInput from "@components/Bases/Inputs/PasswordInput";

import { showToast } from "@utils/notify.util";

import { loginSchema as schema } from "./validation";

type IFormData = z.infer<typeof schema>;

export default function FormLogin() {
  const { control, handleSubmit, formState } = useForm<IFormData>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: IFormData) {
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);

    if (result?.error) {
      showToast({ type: "error", message: "Invalid email or password" });
      return;
    }

    window.location.reload();
  }

  return (
    <FormContainer handleSubmit={handleSubmit(onSubmit)} loading={isLoading} nextStepText="Sign in">
      <BasicInput name="email" label="Email" control={control} error={errors.email?.message} />
      <PasswordInput name="password" label="Password" control={control} error={errors.password?.message} />

      <BaseButton
        text="Sign in with Google"
        startIcon={<Google />}
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded"
      />

      <BaseLink href="/recovery" sx={{ alignSelf: "flex-end" }} text={"Forgot your password?"} />
    </FormContainer>
  );
}
