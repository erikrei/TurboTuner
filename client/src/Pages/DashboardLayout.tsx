import { AxiosResponse } from "axios";
import { useState, createContext } from "react";
import { useLoaderData, Outlet } from "react-router-dom";
import { TUserInfo } from "../types";

import UserInformation from "../Components/UserInformation";

export const UserInfoContext = createContext<TUserInfo | null>(null);

export default function DashboardLayout() {
  const loaderData: AxiosResponse = useLoaderData() as AxiosResponse;
  const initUserInfo: TUserInfo = loaderData.data;

  const [userInfo, setUserInfo] = useState<TUserInfo>(initUserInfo);

  return (
    <div className="dashboard-layout-container">
      <UserInfoContext.Provider value={userInfo}>
        <UserInformation />
        <Outlet />
      </UserInfoContext.Provider>
    </div>
  );
}
