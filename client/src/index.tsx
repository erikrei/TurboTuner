import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import "./styles/index.css";

import userInfoLoader from "./Loaders/userInfoLoader";

import Authentication, { Login, Register } from "./Pages/Authentication";
import DashboardLayout from "./Pages/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
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
    loader: userInfoLoader,
    errorElement: <Navigate to="/" />,
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
