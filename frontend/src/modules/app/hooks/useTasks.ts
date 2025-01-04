import { toast } from "react-toastify";
import { RQ_KEYS } from "../../../config/constants/rqKeys";
import { getTasksApi } from "../services/queries/getTaks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTaskApi } from "../services/mutations/createTask";
import { AxiosError } from "axios";
import { HttpErrorSchema } from "../../../interfaces/httpError.schema";
import { RQClient } from "../../../config/rqClient";
import { updateTaskStatusApi } from "../services/mutations/updateTaskStatus";
import { deleteTaskApi } from "../services/mutations/deleteTask";
import { updateTaskApi } from "../services/mutations/updateTask";

export const useTasks = (username: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [RQ_KEYS.TASKS, username],
    queryFn: () => getTasksApi({ username }),
    throwOnError: () => {
      toast.error("No pudimos obtener las tareas");
      return false;
    },
  });
  const { mutateAsync: createTask, isPending: isCreatingTask } = useMutation({
    mutationFn: createTaskApi,
    onSuccess: () => {
      toast.success("Tarea creada");
      RQClient().invalidateQueries({
        queryKey: [RQ_KEYS.TASKS, username],
        refetchType: "all",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        const httpError = HttpErrorSchema.parse(error.response.data);
        toast.error(httpError.message);
      } else {
        toast.error("No pudimos crear la tarea");
      }
    },
  });

  const { mutateAsync: updateTaskStatus, isPending: isUpdatingTaskStatus } =
    useMutation({
      mutationFn: updateTaskStatusApi,
      onSuccess: () => {
        toast.success("Tarea actualizada");
        RQClient().invalidateQueries({
          queryKey: [RQ_KEYS.TASKS, username],
          refetchType: "all",
        });
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response) {
          const httpError = HttpErrorSchema.parse(error.response.data);
          toast.error(httpError.message);
        } else {
          toast.error("No pudimos actualizar el estado de la tarea");
        }
      },
    });
  const { mutateAsync: deleteTask, isPending: isDeletingTask } = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      toast.success("Tarea eliminada");
      RQClient().invalidateQueries({
        queryKey: [RQ_KEYS.TASKS, username],
        refetchType: "all",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        const httpError = HttpErrorSchema.parse(error.response.data);
        toast.error(httpError.message);
      } else {
        toast.error("No pudimos eliminar la tarea");
      }
    },
  });

  const { mutateAsync: updateTask, isPending: isUpdatingTask } = useMutation({
    mutationFn: updateTaskApi,
    onSuccess: () => {
      toast.success("Tarea actualizada");
      RQClient().invalidateQueries({
        queryKey: [RQ_KEYS.TASKS, username],
        refetchType: "all",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        const httpError = HttpErrorSchema.parse(error.response.data);
        toast.error(httpError.message);
      } else {
        toast.error("No pudimos actualizar la tarea");
      }
    },
  });
  return {
    data,
    isLoading,
    isError,
    error,
    createTask,
    isCreatingTask,
    updateTaskStatus,
    isUpdatingTaskStatus,
    deleteTask,
    isDeletingTask,
    updateTask,
    isUpdatingTask,
  };
};
