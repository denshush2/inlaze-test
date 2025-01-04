import { z } from "zod";

export const NewUserSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
});
