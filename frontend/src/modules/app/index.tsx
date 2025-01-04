import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const AppModule: FC = () => {
  return <RouterProvider router={router} />;
};
export default AppModule;
