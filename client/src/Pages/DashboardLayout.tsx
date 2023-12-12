import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useLoaderData, Navigate, useNavigate, Outlet } from "react-router-dom";
import { TAuthBoolean, TUserInfo } from "../types";

import UserInfoProvider from "../Contexts/UserInfoContext";

import UserInformation from "../Components/UserInformation";

export default function DashboardLayout() {
  const loaderData: AxiosResponse = useLoaderData() as AxiosResponse;
  const { isAuth }: TAuthBoolean = loaderData.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, []);

  return (
    <div className="dashboard-layout-container">
      <UserInfoProvider>
        <UserInformation />
        <Outlet />
      </UserInfoProvider>
    </div>
  );
}
