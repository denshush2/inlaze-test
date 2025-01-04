import { Box, IconButton, Stack, TextField } from "@mui/material";
import { FC, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewUserSchema } from "./types";
import { z } from "zod";
import { toast } from "react-toastify";
import { useUsers } from "../../hooks/useUsers";

type Props = {
  onClose: () => void;
};

const AddNewUser: FC<Props> = ({ onClose }) => {
  const { createUser, isCreatingUser } = useUsers();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<z.infer<typeof NewUserSchema>>({
    resolver: zodResolver(NewUserSchema),
  });
  useEffect(() => {
    if (errors.username) {
      toast.error(errors.username.message);
    }
  }, [errors]);
  const onSubmit = async (data: z.infer<typeof NewUserSchema>) => {
    console.log(data);
    await createUser(data);
    onClose();
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("username")}
        error={!!errors.username}
        size="small"
        label="Nombre de usuario"
        variant="outlined"
      />
      <Stack direction="row" spacing={2}>
        <LoadingButton
          loading={isCreatingUser}
          type="submit"
          size="small"
          variant="contained"
        >
          Agregar
        </LoadingButton>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};
export default AddNewUser;
