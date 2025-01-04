import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppModule from "./modules/app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppModule />
  </StrictMode>
);
