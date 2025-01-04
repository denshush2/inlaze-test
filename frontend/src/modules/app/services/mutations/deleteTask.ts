import { Task_APIApi } from "../../../../interfaces/openapi-zod-client.ts";

export const deleteTaskApi = async ({ taskId }: { taskId: string }) => {
  const response = await Task_APIApi.delete("/tasks/:taskId", undefined, {
    params: {
      taskId,
    },
  });
  return response;
};
