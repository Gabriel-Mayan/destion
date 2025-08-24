import { z } from "zod";

export const createChatSchema = z.object({
  title: z.string().min(3, "Chat title must have at least 3 characters"),
  description: z.string().max(250, "Description must be at most 250 characters").optional(),
  isPublic: z.boolean(),
});
