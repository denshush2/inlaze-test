import {
  AppBar,
  Box,
  Container,
  Divider,
  Grid2,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import UsersList from "../../containers/UsersList";
import { Outlet } from "react-router-dom";
import AddNewUser from "../../containers/AddNewUser";

const MainPageView: FC = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const handleCloseAddUser = () => setIsAddUserOpen(false);
  const handleOpenAddUser = () => setIsAddUserOpen(true);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo list
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid2 sx={{ mt: 2 }} container spacing={2}>
          <Grid2 size={{ xs: 4 }}>
            <Stack spacing={2}>
              <Box>
                {isAddUserOpen ? (
                  <AddNewUser onClose={handleCloseAddUser} />
                ) : (
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6">
                      <b>Usuarios</b>
                    </Typography>
                    <IconButton
                      onClick={handleOpenAddUser}
                      color="primary"
                      aria-label="add"
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                )}

                <Divider />
              </Box>
              <UsersList />
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 8 }}>
            <Outlet />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};
export default MainPageView;
