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
import racesLoader from "./Loaders/racesLoader";
import generalCarsLoader from "./Loaders/generalCarsLoader";

import Authentication, { Login, Register } from "./Pages/Authentication/Authentication";
import DashboardLayout from "./Pages/Dashboard/DashboardLayout";
import FirstCarSelection from "./Pages/FirstCarSelection/FirstCarSelection";

import Garage from "./Pages/Garage/Garage";
import Tuning from "./Pages/Tuning/Tuning";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Market from "./Pages/Market/Market";
import MarketDealer from "./Pages/Market/MarketDealer";
import Race from "./Pages/Race/Race";
import RaceRanking from "./Pages/Race/RaceRanking";

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
        path: "market/dealer",
        element: <MarketDealer />,
        loader: generalCarsLoader,
      },
      {
        path: "race",
        element: <Race />,
        loader: racesLoader,
      },
      {
        path: "race/ranking",
        element: <RaceRanking />
      }
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
