import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
// import "primereact/resources/themes/vela-green/theme.css";
import "primereact/resources/themes/arya-green/theme.css";
import { router } from "./router/PrivateRoute.tsx";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </StrictMode>
);
