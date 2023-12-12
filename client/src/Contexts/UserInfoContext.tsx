import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";

import { TUserInfo } from "../types";

export const UserInfoContext = createContext<TUserInfo | null>(null);

export default function UserInfoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userInfo, setUserInfo] = useState<TUserInfo | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/userInfo", { withCredentials: true })
      .then(({ data }) => setUserInfo(data));
  }, []);

  return (
    <UserInfoContext.Provider value={userInfo}>
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfoContext() {
  const context = useContext(UserInfoContext);

  if (!context) {
    throw new Error(
      "useUserInfoContext() muss im UserInfoProvider genutzt werden!"
    );
  }

  return context;
}
