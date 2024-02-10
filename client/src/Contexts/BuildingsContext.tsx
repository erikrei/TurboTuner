import { ReactNode, createContext, useContext, useState } from "react";

import { TBuildingInformation } from "../types";

type BuildingsContextProviderProps = {
  children: ReactNode;
};

type BuildingsContextProps = {
  buildings: TBuildingInformation[];
  setBuildings: React.Dispatch<React.SetStateAction<TBuildingInformation[]>>;
};

const BuildingsContext = createContext<BuildingsContextProps | null>(null);

export default function BuildingsContextProvider({
  children,
}: BuildingsContextProviderProps) {
  const [buildings, setBuildings] = useState<TBuildingInformation[]>([]);

  return (
    <BuildingsContext.Provider
      value={{
        buildings,
        setBuildings,
      }}
    >
      {children}
    </BuildingsContext.Provider>
  );
}

export function useBuildings() {
  const context = useContext(BuildingsContext);

  if (!context) {
    throw new Error(
      "useBuildings muss im BuildingsContextProvider benutzt werden."
    );
  }

  return context;
}
