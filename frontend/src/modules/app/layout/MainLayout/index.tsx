import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FC } from "react";
import { HelmetProvider } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { RQClient } from "../../../../config/rqClient";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
type Props = {
  children: React.ReactNode;
};
const MainLayout: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={{}}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <HelmetProvider>
          <QueryClientProvider client={RQClient()}>
            <ToastContainer />
            {children}
            <ReactQueryDevtools buttonPosition="top-right" />
          </QueryClientProvider>
        </HelmetProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
