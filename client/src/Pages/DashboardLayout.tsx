import { AxiosResponse } from "axios";
import { useState, createContext } from "react";
import { useLoaderData, Outlet, Navigate } from "react-router-dom";
import { TUserInfo } from "../types";

import "../styles/dashboard.css";

import DashboardHeader from "../Components/DashboardHeader";
import UserInformation from "../Components/UserInformation";

export const UserInfoContext = createContext<TUserInfo | null>(null);

export default function DashboardLayout() {
  const loaderData: AxiosResponse = useLoaderData() as AxiosResponse;
  const initUserInfo: TUserInfo = loaderData.data;

  const [userInfo, setUserInfo] = useState<TUserInfo>(initUserInfo);

  if (userInfo.firstLogin) return <Navigate to="/firstCar" />;

  return (
    <div className="dashboard-layout-container">
      <DashboardHeader />
      <div className="dashboard-content-container">
        <UserInfoContext.Provider value={userInfo}>
          <aside>
            <UserInformation />
          </aside>
          <main>
            <Outlet />
          </main>
        </UserInfoContext.Provider>
      </div>
    </div>
  );
}
