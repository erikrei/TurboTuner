import { useLoaderData } from "react-router-dom";
import { AxiosResponse } from "axios";
import { TGeneralCar } from "../../types";

import { IoIosInformationCircle } from "react-icons/io";

import MarketGeneralCarContainer from "./MarketGeneralCarContainer";

export default function MarketDealer() {
  const generalCarsData = useLoaderData() as AxiosResponse;
  const generalCars: TGeneralCar[] = generalCarsData.data;

  return (
    <>
      <h1 className="content-headline">Autohändler</h1>
      <section className="class-information">
        <IoIosInformationCircle />
        <p>
          Die Klasse des Autos beschreibt die Qualität. Eine höhere Klasse
          bedeutet, dass das Auto einen schnelleren Startwert besitzt.
          Zusätzlich sind die Verbesserungen höher als die der niedrigeren
          Klassen, jedoch aber auch teurer.
        </p>
      </section>
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
