import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import axios from "axios";

import { TSellingCar, TUserCar } from "../types";

type UsedDealerSellingContextProviderProps = {
  children: ReactNode;
};

type UsedDealerSellingContext = {
  userCars: TUserCar[];
  setUserCars: React.Dispatch<React.SetStateAction<TUserCar[]>>;
  activeCar: TUserCar | null;
  setActiveCar: React.Dispatch<React.SetStateAction<TUserCar | null>>;
  userSellingCars: TSellingCar[];
  setUserSellingCars: React.Dispatch<React.SetStateAction<TSellingCar[]>>;
};

export const UsedDealerSellingContext =
  createContext<UsedDealerSellingContext | null>(null);

export default function UsedDealerSellingContextProvider({
  children,
}: UsedDealerSellingContextProviderProps) {
  const [userCars, setUserCars] = useState<TUserCar[]>([]);
  const [activeCar, setActiveCar] = useState<TUserCar | null>(null);
  const [userSellingCars, setUserSellingCars] = useState<TSellingCar[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/useddealer/sellingcars", {
        withCredentials: true,
      })
      .then(({ data }: { data: TSellingCar[] }) => setUserSellingCars(data));
    axios
      .get("http://localhost:3000/car/allUser", { withCredentials: true })
      .then(({ data }: { data: TUserCar[] }) => setUserCars(data));
  }, []);

  return (
    <UsedDealerSellingContext.Provider
      value={{
        userCars,
        setUserCars,
        activeCar,
        setActiveCar,
        userSellingCars,
        setUserSellingCars,
      }}
    >
      {children}
    </UsedDealerSellingContext.Provider>
  );
}

export function useUsedDealerSelling() {
  const context = useContext(UsedDealerSellingContext);

  if (!context) {
    throw new Error(
      "useUsedDealerSelling muss in einem UsedDealerSellingContextProvider benutzt werden."
    );
  }

  return context;
}
