import { Skeleton, Stack } from "@mui/material";
import { FC } from "react";

const UserListSkeleton: FC = () => {
  return (
    <Stack spacing={2}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} variant="rounded" height={80} />
      ))}
    </Stack>
  );
};
export default UserListSkeleton;
