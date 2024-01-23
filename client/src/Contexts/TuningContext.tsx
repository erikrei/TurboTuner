import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { TUserCar } from "../types";

type TuningContextProviderProps = {
  children: React.ReactNode;
};

type TuningContext = {
  userCars: TUserCar[] | null;
  setUserCars: React.Dispatch<React.SetStateAction<TUserCar[] | null>>;
  selectedCarId: string | null;
  setSelectedCarId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedCar: TUserCar | null | undefined;
};

export const TuningContext = createContext<null | TuningContext>(null);

export default function TuningContextProvider({
  children,
}: TuningContextProviderProps) {
  const [userCars, setUserCars] = useState<TUserCar[] | null>(null);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const selectedCar =
    userCars && userCars.find((car) => car._id === selectedCarId);

  useEffect(() => {
    axios
      .get("http://localhost:3000/car/allUser", { withCredentials: true })
      .then(({ data }: { data: TUserCar[] }) => {
        setUserCars(data);
        setSelectedCarId(data[0]._id);
      });
  }, []);

  return (
    <TuningContext.Provider
      value={{
        userCars,
        setUserCars,
        selectedCarId,
        setSelectedCarId,
        selectedCar,
      }}
    >
      {children}
    </TuningContext.Provider>
  );
}

export function useTuningContext() {
  const context = useContext(TuningContext);
  if (!context) {
    throw new Error(
      "useTuningContext muss im TuningContextProvider genutzt werden."
    );
  }

  return context;
}
