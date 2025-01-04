import { z } from "zod";

export const HttpErrorSchema = z.object({
  message: z.string(),
  statusCode: z.number(),
});
