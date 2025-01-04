import { TaskStatus } from "../interfaces/taskStatus.type";

export const getStatusLabel = (status: TaskStatus) => {
  switch (status) {
    case "open":
      return "Abierta";
    case "in-progress":
      return "En curso";
    case "completed":
      return "Completada";
    default:
      return "Pendiente";
  }
};
