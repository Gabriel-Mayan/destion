import { z } from "zod";

export const passwordChangeSchema = z
  .object({
    password: z.string().trim().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().trim().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
