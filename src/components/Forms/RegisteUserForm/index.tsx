"use client";

import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import FormContainer from "@components/Forms/Container";
import BasicInput from "@components/Bases/Inputs/BasicInput";
import PasswordInput from "@components/Bases/Inputs/PasswordInput";

import { app } from "@services/app.service";

import { showToast } from "@utils/notify.util";

import { createUserSchema as schema } from "./validation";

type IFormData = z.infer<typeof schema>;

export default function CreateUserForm() {
  const { control, handleSubmit, formState } = useForm<IFormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const { errors } = formState;
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: IFormData) {
    try {
      setIsLoading(true);

      const response = await app({ url: "/api/users/create", data });

      showToast({ message: response.data.message || "User created successfully!", type: "success" });

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      return router.push(result?.error ? "/login" : "/home");
    } catch (error: any) {
      showToast({ message: error?.message || "Failed to create user", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormContainer handleSubmit={handleSubmit(onSubmit)} loading={isLoading} nextStepText="Create user">
      <BasicInput name="name" label="Full Name" control={control} error={errors.name?.message} />
      <BasicInput name="email" label="Email" control={control} error={errors.email?.message} />
      <PasswordInput name="password" label="Password" control={control} error={errors.password?.message} />
      <PasswordInput name="confirmPassword" label="Confirm Password" control={control} error={errors.confirmPassword?.message} />
    </FormContainer>
  );
}
