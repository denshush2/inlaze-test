import { Task_APIApi } from "../../../../interfaces/openapi-zod-client.ts";

export const createTaskApi = ({
  username,
  title,
  description,
  dueDate,
}: {
  username: string;
  title: string;
  description?: string;
  dueDate?: string;
}) => {
  const response = Task_APIApi.post("/tasks", {
    userUsername: username,
    title,
    description,
    dueDate,
  });
  return response;
};
