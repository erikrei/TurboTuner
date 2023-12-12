import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./styles/index.css";

import authLoader from "./Loaders/authLoader";

import Authentication, { Login, Register } from "./Pages/Authentication";
import DashboardLayout from "./Pages/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
    loader: authLoader,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    loader: authLoader,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
