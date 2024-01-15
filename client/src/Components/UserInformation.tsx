import { Navigate } from "react-router-dom";

import "../styles/userInformation.css";

import UserInformationContainer from "./UserInformationContainer";

import { useUserInfo } from "../Contexts/UserInfoContext";

export default function UserInformation() {
  const userInfo = useUserInfo().userInfo;

  if (userInfo?.firstLogin) {
    return <Navigate to="/firstCar" />;
  }

  return <UserInformationContainer />;
}
