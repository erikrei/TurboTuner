import { useContext } from "react";
import { UserInfoContext } from "../Pages/DashboardLayout";

import "../styles/userInformation.css";

import UserInformationContainer from "./UserInformationContainer";

export default function UserInformation() {
  const userInfo = useContext(UserInfoContext)?.userInfo;

  if (userInfo) {
    return <UserInformationContainer userInfo={userInfo} />;
  }

  return <h1>UserInfo Objekt konnte nicht geladen werden</h1>;
}
