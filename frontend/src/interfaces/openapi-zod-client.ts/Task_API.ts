import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

import { HttpException } from "./common";
import { UserDto } from "./common";

const TaskDto = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string().datetime({ offset: true }).optional(),
    status: z.enum(["open", "in-progress", "completed"]).default("open"),
    user: UserDto,
  })
  .strict()
  .passthrough();
const TaskStatus = z.enum(["open", "in-progress", "completed"]);
const UpdateTaskDto = z
  .object({
    title: z.string(),
    description: z.string(),
    dueDate: z.string().datetime({ offset: true }),
    status: TaskStatus,
  })
  .partial()
  .strict()
  .passthrough();
const CreateTaskBodyDto = z
  .object({
    userUsername: z.string(),
    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string().datetime({ offset: true }).optional(),
  })
  .strict()
  .passthrough();

export const schemas = {
  TaskDto,
  TaskStatus,
  UpdateTaskDto,
  CreateTaskBodyDto,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/tasks",
    alias: "WebApiTaskMutationController_createTask",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateTaskBodyDto,
      },
    ],
    response: TaskDto,
    errors: [
      {
        status: 400,
        schema: HttpException,
      },
    ],
  },
  {
    method: "get",
    path: "/tasks",
    alias: "WebApiTaskQueryController_getTasks",
    requestFormat: "json",
    parameters: [
      {
        name: "username",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "order",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(TaskDto),
  },
  {
    method: "patch",
    path: "/tasks/:taskId",
    alias: "WebApiTaskMutationController_updateTask",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateTaskDto,
      },
      {
        name: "taskId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: TaskDto,
    errors: [
      {
        status: 400,
        schema: HttpException,
      },
    ],
  },
  {
    method: "delete",
    path: "/tasks/:taskId",
    alias: "WebApiTaskMutationController_deleteTask",
    requestFormat: "json",
    parameters: [
      {
        name: "taskId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.boolean(),
    errors: [
      {
        status: 400,
        schema: HttpException,
      },
    ],
  },
  {
    method: "get",
    path: "/tasks/:taskId",
    alias: "WebApiTaskQueryController_getTask",
    requestFormat: "json",
    parameters: [
      {
        name: "taskId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: TaskDto,
    errors: [
      {
        status: 404,
        description: `Task not found`,
        schema: HttpException,
      },
    ],
  },
]);

export const Task_APIApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
