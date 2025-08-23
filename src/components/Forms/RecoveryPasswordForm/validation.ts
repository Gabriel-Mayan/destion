import { z } from "zod";

export const recoveryPasswordSchema = z.object({
  email: z.email({ message: "Invalid email" }).min(1, "Required field"),
  captcha: z.string({ message: "Required field" }),
});
