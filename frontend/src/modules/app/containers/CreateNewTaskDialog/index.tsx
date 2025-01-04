import {
  Box,
  Container,
  Drawer,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewTaskSchema } from "./types";
import { useTasks } from "../../hooks/useTasks";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  username: string;
};
const CreateNewTaskDialog: FC<Props> = ({ onClose, isOpen, username }) => {
  const { createTask, isCreatingTask } = useTasks(username);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<z.infer<typeof NewTaskSchema>>({
    resolver: zodResolver(NewTaskSchema),
    defaultValues: {
      dueDate: new Date(),
    },
  });
  const onSubmit = async (data: z.infer<typeof NewTaskSchema>) => {
    const response = await createTask({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate.toISOString(),
      username,
    });
    if (response) {
      onClose();
    }
  };
  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose}>
      <Container>
        <Box minHeight="30vh" display="flex" flexDirection="column">
          <Box my={2} display="flex" justifyContent="space-between">
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h5">
                    Crear nueva tarea para <b>{username}</b>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <IconButton onClick={onClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box my={2} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormControl fullWidth error={!!errors.title}>
                <FormLabel>Nombre de la tarea</FormLabel>
                <TextField {...register("title")} error={!!errors.title} />
                {errors.title && (
                  <FormHelperText error>{errors.title.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth error={!!errors.description}>
                <FormLabel>Descripción de la tarea(soporta markdown)</FormLabel>
                <TextField
                  {...register("description")}
                  error={!!errors.description}
                  fullWidth
                  multiline
                  minRows={3}
                  placeholder={`# Descripción de la tarea
Esta es la descripción de la tarea
`}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel>Fecha de finalización</FormLabel>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <DesktopDatePicker
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                  name={"dueDate"}
                />
              </FormControl>
              <LoadingButton
                type="submit"
                loading={isCreatingTask}
                variant="contained"
              >
                Crear
              </LoadingButton>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Drawer>
  );
};
export default CreateNewTaskDialog;
