import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";

import axios from "axios";

import { TUserInfo } from "../types";

type UserInfoProviderProps = {
  children: ReactNode;
};

type TUserInfoContext = {
  userInfo: TUserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<TUserInfo | null>>;
};

const UserInfoContext = createContext<TUserInfoContext | null>(null);

export default function UserInfoProvider({ children }: UserInfoProviderProps) {
  const [userInfo, setUserInfo] = useState<TUserInfo | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/userInfo", { withCredentials: true })
      .then(({ data }: { data: TUserInfo }) => setUserInfo(data));
  }, []);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfo() {
  const context = useContext(UserInfoContext);

  if (!context) {
    throw new Error("useUserInfo muss im UserInfoProvider genutzt werden.");
  }

  return context;
}
