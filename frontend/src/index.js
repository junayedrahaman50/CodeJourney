import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <GoogleOAuthProvider clientId="926175553291-f1ooqt8ojtcrh1shqjqgv2pu7tos4bqt.apps.googleusercontent.com">
    <StrictMode>
      <HelmetProvider>
        <App />
        <ToastContainer style={{ fontSize: "1.2rem" }} />
      </HelmetProvider>
    </StrictMode>
  </GoogleOAuthProvider>
);
