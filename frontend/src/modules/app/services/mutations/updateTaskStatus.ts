import { Task_APIApi } from "../../../../interfaces/openapi-zod-client.ts";
import { TaskStatus } from "../../../../interfaces/taskStatus.type";

export const updateTaskStatusApi = async ({
  status,
  taskId,
}: {
  taskId: string;
  status: TaskStatus;
}) => {
  const response = await Task_APIApi.patch(
    "/tasks/:taskId",
    {
      status: status,
    },
    {
      params: {
        taskId: taskId,
      },
    }
  );
  return response;
};
