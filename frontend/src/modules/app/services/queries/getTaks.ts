import { Task_APIApi } from "../../../../interfaces/openapi-zod-client.ts";
import { TaskOrder } from "../../../../interfaces/taskOrder.type.ts";

export const getTasksApi = ({
  username,
  page,
  limit,
  order,
}: {
  username?: string;
  page?: number;
  limit?: number;
  order?: TaskOrder;
}) => {
  const tasks = Task_APIApi.get("/tasks", {
    queries: {
      username,
      page,
      limit,
      order,
    },
  });
  return tasks;
};
