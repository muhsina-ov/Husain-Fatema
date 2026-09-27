import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReceptionPage from "./pages/ReceptionPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReceptionPage />
  </StrictMode>
);
