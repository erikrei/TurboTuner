import { useLoaderData } from "react-router-dom";
import { AxiosResponse } from "axios";
import { TGeneralCar } from "../../types";

import MarketGeneralCarContainer from "./MarketGeneralCarContainer";

export default function MarketDealer() {
  const generalCarsData = useLoaderData() as AxiosResponse;
  const generalCars: TGeneralCar[] = generalCarsData.data;

  return (
    <>
      <h1 className="content-headline">Autohändler</h1>
      <main className="general-cars-container">
        {generalCars.map((generalCar) => (
          <MarketGeneralCarContainer
            key={generalCar._id}
            generalCar={generalCar}
          />
        ))}
      </main>
    </>
  );
}
