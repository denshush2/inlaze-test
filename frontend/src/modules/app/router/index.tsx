import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import MainPage from "../pages/MainPage";
import TaskPage from "../pages/TaskPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <MainPage />
      </MainLayout>
    ),
    children: [
      {
        path: "users/:username",
        element: <TaskPage />,
      },
    ],
  },
]);
