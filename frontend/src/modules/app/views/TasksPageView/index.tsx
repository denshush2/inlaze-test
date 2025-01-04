import {
  Box,
  Fab,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { useRouter } from "../../../../hooks/useRouter";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CreateNewTaskDialog from "../../containers/CreateNewTaskDialog";
import { useTasks } from "../../hooks/useTasks";
import TaskItem from "../../containers/TaskItem";
type Props = {
  username: string;
};
const TaskPageView: FC<Props> = ({ username }) => {
  const { push } = useRouter();
  const { data, isLoading } = useTasks(username);
  const [tab, setTab] = useState(0);
  const [isAddNewTaskDialogOpen, setIsAddNewTaskDialogOpen] = useState(false);
  const handleCloseAddNewTaskDialog = () => setIsAddNewTaskDialogOpen(false);
  const handleOpenAddNewTaskDialog = () => setIsAddNewTaskDialogOpen(true);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const selectedTasks = useMemo(() => {
    if (!data) return [];
    switch (tab) {
      case 0:
        return data;
      case 1:
        return data.filter((task) => task.status === "open");
      case 2:
        return data.filter((task) => task.status === "in-progress");
      case 3:
        return data.filter((task) => task.status === "completed");
      default:
        return data;
    }
  }, [data, tab]);
  const totalTasks = useMemo(() => {
    if (!data) return 0;
    return data.length;
  }, [data]);

  const completedTasks = useMemo(() => {
    if (!data) return 0;
    return data.filter((task) => task.status === "completed").length;
  }, [data]);

  const pendingTasks = useMemo(() => {
    if (!data) return 0;
    return data.filter((task) => task.status === "open").length;
  }, [data]);

  const inProgressTasks = useMemo(() => {
    if (!data) return 0;
    return data.filter((task) => task.status === "in-progress").length;
  }, [data]);
  return (
    <>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Tareas del usuario {username}</Typography>
          <IconButton
            onClick={() => push("/")}
            color="primary"
            aria-label="add"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label={`Mis tareas (${totalTasks})`} />
          <Tab label={`Pendientes (${pendingTasks})`} />
          <Tab label={`En progreso (${inProgressTasks})`} />
          <Tab label={`Completadas (${completedTasks})`} />
        </Tabs>

        <Box mt={2}>
          {isLoading && <Typography>Cargando tareas</Typography>}

          <Stack spacing={2}>
            {selectedTasks.map((task) => (
              <TaskItem
                key={task.id}
                username={username}
                title={task.title}
                description={task.description}
                dueDate={task.dueDate}
                status={task.status}
                taskId={task.id}
              />
            ))}
          </Stack>
        </Box>
        <Box position="fixed" bottom={15} right={15}>
          <Fab
            onClick={handleOpenAddNewTaskDialog}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>
      <CreateNewTaskDialog
        username={username}
        isOpen={isAddNewTaskDialogOpen}
        onClose={handleCloseAddNewTaskDialog}
      />
    </>
  );
};
export default TaskPageView;
