import { useLoaderData } from "react-router-dom";
import { AxiosResponse } from "axios";
import { TSellingCar } from "../../../types";

import MarketUsedDealerCar from "./MarketUsedDealerCar/MarketUsedDealerCar";

export default function MarketUsedDealerAllCars() {
  const loaderData = useLoaderData() as AxiosResponse;
  const sellingCars: TSellingCar[] = loaderData.data;

  return (
    <section className="used-cars">
      {sellingCars.map((car) => (
        <MarketUsedDealerCar key={car._id} car={car} showLink={true} />
      ))}
    </section>
  );
}
