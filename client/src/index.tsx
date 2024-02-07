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
import scrapyardDataLoader from "./Loaders/scrapyardDataLoader";
import usedCarsLoader from "./Loaders/usedCarsLoader";
import usedSingleCarLoader from "./Loaders/usedSingleCarLoader";
import buildingsLoader from "./Loaders/buildingsLoader";

import Authentication, {
  Login,
  Register,
} from "./Pages/Authentication/Authentication";
import DashboardLayout from "./Pages/Dashboard/DashboardLayout";
import FirstCarSelection from "./Pages/FirstCarSelection/FirstCarSelection";

import Garage from "./Pages/Garage/Garage";
import Scrapyard from "./Pages/Garage/Scrapyard/Scrapyard";
import Tuning from "./Pages/Tuning/Tuning";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Market from "./Pages/Market/Market";
import MarketDealer from "./Pages/Market/MarketDealer";
import MarketUsedDealer from "./Pages/Market/MarketUsedDealer/MarketUsedDealer";
import MarketUsedDealerBuy from "./Pages/Market/MarketUsedDealer/MarketUsedDealerBuy";
import MarketUsedDealerSell from "./Pages/Market/MarketUsedDealer/MarketUsedDealerSell/MarketUsedDealerSell";
import MarketUsedDealerSingleView from "./Pages/Market/MarketUsedDealer/MarketUsedDealerSingleView";
import Race from "./Pages/Race/Race";
import RaceRanking from "./Pages/Race/RaceRanking";
import Buildings from "./Pages/Buildings/Buildings";

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
        path: "garage/scrapyard/:car_id",
        element: <Scrapyard />,
        loader: ({ params }) => scrapyardDataLoader(params.car_id!),
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
        path: "market/useddealer",
        element: <MarketUsedDealer />,
        children: [
          {
            path: "buy",
            element: <MarketUsedDealerBuy />,
            loader: usedCarsLoader,
          },
          {
            path: "sell",
            element: <MarketUsedDealerSell />,
          },
          {
            path: "buy/:car_id",
            element: <MarketUsedDealerSingleView />,
            loader: ({ params }) => usedSingleCarLoader(params.car_id!),
          },
        ],
      },
      {
        path: "race",
        element: <Race />,
        loader: racesLoader,
      },
      {
        path: "race/ranking",
        element: <RaceRanking />,
      },
      {
        path: "buildings",
        element: <Buildings />,
        loader: buildingsLoader,
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
