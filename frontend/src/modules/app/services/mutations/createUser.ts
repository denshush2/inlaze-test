import { User_APIApi } from "../../../../interfaces/openapi-zod-client.ts";

export const createUserApi = ({ username }: { username: string }) => {
  const data = User_APIApi.post("/users", {
    username,
  });
  return data;
};
