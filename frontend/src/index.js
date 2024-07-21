import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <ToastContainer style={{ fontSize: "1.2rem" }} />
    </HelmetProvider>
  </StrictMode>
);
