import { z } from "zod";

export const UpdateTaskSchema = z.object({
  title: z
    .string()
    .min(3, "El nombre de la tarea debe tener al menos 3 caracteres"),
  description: z.string(),

  dueDate: z.date(),
});
