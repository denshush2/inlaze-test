import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const endpoints = makeApi([
  {
    method: "post",
    path: "/loader/load-data",
    alias: "WebApiLoaderController_loadData",
    requestFormat: "json",
    response: z.boolean(),
  },
]);

export const Loader_APIApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
