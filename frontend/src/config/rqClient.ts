import { QueryClient } from "@tanstack/react-query";

let queryClientLinstance: QueryClient | null = null;
export const RQClient = (): QueryClient => {
  if (!queryClientLinstance) {
    queryClientLinstance = new QueryClient({
      defaultOptions: {
        queries: {
          throwOnError: (error, query) => {
            console.log(error);
            console.log(query);
            return false;
          },
          retry: 1,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
        },
      },
    });
  }
  return queryClientLinstance;
};
