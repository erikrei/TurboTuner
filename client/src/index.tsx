import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import "./styles/index.css";

import userInfoLoader from "./Loaders/userInfoLoader";
import userCarsLoader from "./Loaders/userCarsLoader";

import Authentication, { Login, Register } from "./Pages/Authentication";
import DashboardLayout from "./Pages/DashboardLayout";
import FirstCarSelection from "./Pages/FirstCarSelection";

import Garage from "./Pages/Garage";
import Tuning from "./Pages/Tuning";
import Dashboard from "./Pages/Dashboard";
import Market from "./Pages/Market";
import Race from "./Pages/Race";

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
    path: "/firstCar",
    element: <FirstCarSelection />,
    loader: userInfoLoader,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    loader: userInfoLoader,
    errorElement: <Navigate to="/" />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "garage",
        element: <Garage />,
        loader: userCarsLoader,
      },
      {
        path: "tuning",
        element: <Tuning />,
      },
      {
        path: "market",
        element: <Market />,
      },
      {
        path: "race",
        element: <Race />,
      },
    ],
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
