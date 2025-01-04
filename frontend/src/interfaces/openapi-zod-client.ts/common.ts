import { z } from "zod";

export const UserDto = z
  .object({ username: z.string() })
  .strict()
  .passthrough();
export const HttpException = z
  .object({ statusCode: z.number(), message: z.string() })
  .strict()
  .passthrough();
