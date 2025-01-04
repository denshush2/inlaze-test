import { FC } from "react";
import { z } from "zod";
import { UserDto } from "../../../../interfaces/openapi-zod-client.ts/common";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { usePathname } from "../../../../hooks/usePathname";
import { useRouter } from "../../../../hooks/useRouter";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import UserListSkeleton from "../UserListSkeleton";
type Props = {
  users?: z.infer<typeof UserDto>[];
  isLoading?: boolean;
  isError?: boolean;
};
const UserListSection: FC<Props> = ({ users, isLoading, isError }) => {
  const { push } = useRouter();
  const pathname = usePathname();
  if (isLoading) return <UserListSkeleton />;
  if (isError) return <Typography>No pudimos obtener los usuarios</Typography>;
  if (!users) return <Typography>No pudimos obtener los usuarios</Typography>;
  if (users.length === 0) return <Typography>No hay usuarios</Typography>;
  return (
    <List sx={{ py: 0 }}>
      {users.map((user) => (
        <ListItemButton
          key={user.username}
          selected={pathname === `/users/${user.username}`}
          onClick={() => push(`/users/${user.username}`)}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={user.username} />
          <ListItemIcon>
            <ArrowForwardIosIcon />
          </ListItemIcon>
        </ListItemButton>
      ))}
    </List>
  );
};
export default UserListSection;
