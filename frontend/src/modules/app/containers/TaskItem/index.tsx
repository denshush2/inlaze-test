import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { parseISO } from "date-fns";
import DropdownButton from "../../../../components/DropdownButton";
import LoopIcon from "@mui/icons-material/Loop";
import DoneIcon from "@mui/icons-material/Done";
import TrashIcon from "@mui/icons-material/Delete";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import IconEdit from "@mui/icons-material/Edit";
import { TaskStatus } from "../../../../interfaces/taskStatus.type";
import { getStatusLabel } from "../../../../utils/getStatusLabel";
import { useTasks } from "../../hooks/useTasks";
import Markdown from "react-markdown";
import { DropdownButtonOption } from "../../../../components/DropdownButton/types";
import UpdateTaskDialog from "../UpdateTaskDialog";
type Props = {
  title: string;
  description?: string;
  dueDate?: string;
  status: string;
  taskId: string;
  username: string;
};

const TaskItem: FC<Props> = ({
  title,
  taskId,
  description,
  dueDate,
  status,
  username,
}) => {
  const theme = useTheme();
  const { updateTaskStatus, isUpdatingTaskStatus, deleteTask, isDeletingTask } =
    useTasks(username);
  const [isUpdateTaskDialogOpen, setIsUpdateTaskDialogOpen] = useState(false);
  const handleCloseUpdateTaskDialog = () => setIsUpdateTaskDialogOpen(false);
  const handleOpenUpdateTaskDialog = () => setIsUpdateTaskDialogOpen(true);
  const getBackgroundStatusColor = useMemo(() => {
    switch (status) {
      case "open":
        return theme.palette.background.paper;
      case "in-progress":
        return theme.palette.info.light;
      case "completed":
        return theme.palette.success.light;
      default:
        return theme.palette.background.paper;
    }
  }, [status, theme]);
  const handleSelect = async (option: DropdownButtonOption) => {
    console.log(option);
    await updateTaskStatus({
      status: option.value as TaskStatus,
      taskId,
    });
  };
  const handleDelete = async () => {
    await deleteTask({ taskId });
  };
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box
          sx={{
            borderRadius: 2,
            width: "100%",
            display: "block",
            minWidth: "700px",
            border: "1px solid #ccc",
          }}
        >
          <Paper elevation={2} sx={{ borderRadius: 2, width: "100%" }}>
            <Box
              p={2}
              sx={{
                width: "100%",
                borderRadius: 2,
                borderRight: `4px solid ${getBackgroundStatusColor}`,
                borderLeft: `1px solid ${getBackgroundStatusColor}`,
                borderTop: `2px solid ${getBackgroundStatusColor}`,
                borderBottom: `2px solid ${getBackgroundStatusColor}`,
                cursor: "pointer",
              }}
              onDoubleClick={() => {
                console.log("DOUBLE CLICKEED");
              }}
            >
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">{title}</Typography>
                <DropdownButton
                  loading={isUpdatingTaskStatus}
                  title={getStatusLabel(status as TaskStatus)}
                  stopPropagation
                  options={[
                    {
                      icon: <PendingActionsIcon />,
                      label: "Pendiente",
                      value: "open",
                      disabled: status === "open",
                    },
                    {
                      icon: <LoopIcon />,
                      label: "En curso",
                      value: "in-progress",
                      disabled: status === "in-progress",
                    },
                    {
                      icon: <DoneIcon />,
                      label: "Completada",
                      value: "completed",
                      disabled: status === "completed",
                    },
                  ]}
                  onSelect={handleSelect}
                />
              </Box>
              <Box
                sx={{
                  overflow: "auto",
                }}
              >
                <Markdown>{description}</Markdown>
              </Box>
              <Typography variant="body1">
                {dueDate
                  ? `Fecha de finalización: ${parseISO(
                      dueDate
                    ).toLocaleString()}`
                  : ""}
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Box mx={1} alignSelf={"flex-start"}>
          <IconButton onClick={handleOpenUpdateTaskDialog} aria-label="edit">
            <IconEdit />
          </IconButton>
          {isDeletingTask ? (
            <CircularProgress size={20} />
          ) : (
            <IconButton color="error" onClick={handleDelete}>
              {<TrashIcon />}
            </IconButton>
          )}
        </Box>
      </Box>
      <UpdateTaskDialog
        isOpen={isUpdateTaskDialogOpen}
        onClose={handleCloseUpdateTaskDialog}
        title={title}
        taskId={taskId}
        username={username}
        description={description ?? undefined}
      />
    </>
  );
};

export default TaskItem;
