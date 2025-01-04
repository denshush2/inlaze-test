import { useMutation, useQuery } from "@tanstack/react-query";
import { RQ_KEYS } from "../../../config/constants/rqKeys";
import { toast } from "react-toastify";
import { RQClient } from "../../../config/rqClient";
import { AxiosError } from "axios";
import { HttpErrorSchema } from "../../../interfaces/httpError.schema";
import { GetUserParams, getUsersApi } from "../services/queries/getUsers";
import { createUserApi } from "../services/mutations/createUser";
import { useState } from "react";

export const useUsers = () => {
  const [searchParams, setSearchParams] = useState<GetUserParams>({
    page: 0,
    limit: 10,
  });
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [RQ_KEYS.USERS, searchParams],
    queryFn: () => getUsersApi(searchParams),
    throwOnError: () => {
      toast.error("No pudimos obtener los usuarios");
      return false;
    },
  });
  const { mutateAsync: createUser, isPending: isCreatingUser } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      toast.success("Usuario creado");
      RQClient().invalidateQueries({
        queryKey: [RQ_KEYS.USERS],
        refetchType: "all",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        const httpError = HttpErrorSchema.parse(error.response.data);
        toast.error(httpError.message);
      } else {
        toast.error("No pudimos crear el usuario");
      }
    },
  });
  return {
    data,
    isLoading,
    isError,
    error,
    createUser,
    isCreatingUser,
    setSearchParams,
    searchParams,
  };
};
