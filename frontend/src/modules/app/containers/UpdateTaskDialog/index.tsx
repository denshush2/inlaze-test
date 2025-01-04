import { FC } from "react";
import { UpdateTaskSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
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
import { LoadingButton } from "@mui/lab";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import { useTasks } from "../../hooks/useTasks";
type Props = {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  description?: string;
  dueDate?: string;
  taskId: string;
  username: string;
};

const UpdateTaskDialog: FC<Props> = ({
  isOpen,
  onClose,
  title,
  description,
  dueDate,
  taskId,
  username,
}) => {
  const { updateTask, isUpdatingTask } = useTasks(username);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<z.infer<typeof UpdateTaskSchema>>({
    resolver: zodResolver(UpdateTaskSchema),
    defaultValues: {
      dueDate: dueDate ? new Date(dueDate) : new Date(),
      title,
      description,
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateTaskSchema>) => {
    const response = await updateTask({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate.toISOString(),
      taskId,
    });
    if (response) {
      onClose();
    }
  };

  const updatedTitle = watch("title");
  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose}>
      <Container>
        <Box minHeight="30vh" display="flex" flexDirection="column">
          <Box my={2} display="flex" justifyContent="space-between">
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h5">
                    Moficar tarea <b>{updatedTitle}</b>
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
                loading={isUpdatingTask}
                variant="contained"
              >
                Actualizar
              </LoadingButton>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Drawer>
  );
};
export default UpdateTaskDialog;
