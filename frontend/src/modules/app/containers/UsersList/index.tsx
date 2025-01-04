import { Box, InputAdornment, Paper, Stack, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import IconSearch from "@mui/icons-material/Search";
import { useDebounce } from "../../../../hooks/useDebounce";
import UserListSection from "../../components/UserListSection";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { LoadingButton } from "@mui/lab";
const UsersList: FC = () => {
  const { data, isLoading, isError, setSearchParams, searchParams } =
    useUsers();
  const [searchUsername, setSearchUsername] = useState("");
  const debouncedNitInput = useDebounce(searchUsername, 300);
  useEffect(() => {
    if (debouncedNitInput) {
      setSearchParams((prev) => ({ ...prev, username: debouncedNitInput }));
    } else {
      setSearchParams({
        page: 0,
        limit: 10,
      });
    }
  }, [debouncedNitInput, setSearchParams]);
  const updateSearchUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUsername(e.target.value);
  };
  const handleNextPage = () => {
    setSearchParams((prev) => ({ ...prev, page: prev.page + 1 }));
  };
  const handlePreviousPage = () => {
    setSearchParams((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  return (
    <Box>
      <Paper elevation={2}>
        <Box>
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={searchUsername}
              onChange={updateSearchUsername}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch />
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="Buscar usuarios"
            />
            <UserListSection
              users={data ? data : []}
              isLoading={isLoading}
              isError={isError}
            />
          </Stack>
        </Box>
      </Paper>
      <Box display="flex" justifyContent="space-between">
        <LoadingButton
          disabled={searchParams.page === 0}
          onClick={searchParams.page > 0 ? handlePreviousPage : undefined}
          startIcon={<ArrowBackIosIcon />}
        >
          Atras
        </LoadingButton>
        <LoadingButton
          onClick={handleNextPage}
          disabled={data && data.length < searchParams.limit}
          endIcon={<ArrowForwardIosIcon />}
        >
          Siguiente
        </LoadingButton>
      </Box>
    </Box>
  );
};
export default UsersList;
