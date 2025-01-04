import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

import { UserDto } from "./common";
import { HttpException } from "./common";

const GetUsersDto = z
  .object({ users: z.array(UserDto) })
  .strict()
  .passthrough();

export const schemas = {
  GetUsersDto,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/users",
    alias: "WebApiUserQueryController_getUsers",
    requestFormat: "json",
    parameters: [
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
        schema: z.unknown().optional(),
      },
      {
        name: "username",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: GetUsersDto,
  },
  {
    method: "post",
    path: "/users",
    alias: "WebApiUserMutationController_createUser",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ username: z.string() }).strict().passthrough(),
      },
    ],
    response: z.object({ username: z.string() }).strict().passthrough(),
    errors: [
      {
        status: 400,
        schema: HttpException,
      },
    ],
  },
]);

export const User_APIApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
