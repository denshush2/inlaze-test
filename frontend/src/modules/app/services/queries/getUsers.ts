import { User_APIApi } from "../../../../interfaces/openapi-zod-client.ts";

export type GetUserParams = {
  username?: string;
  page: number;
  limit: number;
  order?: string;
};
export const getUsersApi = async (queries: GetUserParams) => {
  const users = await User_APIApi.get("/users", {
    queries,
  });
  return users.users;
};
