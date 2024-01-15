import { Outlet } from "react-router-dom";

import "../styles/dashboard.css";

import DashboardHeader from "../Components/DashboardHeader";
import UserInformation from "../Components/UserInformation";
import Navigation from "../Components/Navigation";

import UserInfoProvider from "../Contexts/UserInfoContext";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout-container">
      <DashboardHeader />
      <div className="dashboard-content-container">
        <UserInfoProvider>
          <aside className="app-sidebar">
            <UserInformation />
            <Navigation />
          </aside>
          <main>
            <Outlet />
          </main>
        </UserInfoProvider>
      </div>
    </div>
  );
}
