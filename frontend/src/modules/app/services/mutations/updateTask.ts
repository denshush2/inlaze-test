import { Task_APIApi } from "../../../../interfaces/openapi-zod-client.ts";

export const updateTaskApi = async ({
  taskId,
  title,
  description,
  dueDate,
}: {
  taskId: string;
  title: string;
  description: string;
  dueDate: string;
}) => {
  const response = await Task_APIApi.patch(
    "/tasks/:taskId",
    {
      title,
      description,
      dueDate,
    },
    {
      params: {
        taskId,
      },
    }
  );
  return response;
};
