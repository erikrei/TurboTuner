import { useState, useEffect } from "react";
import axios from "axios";

import { TSellingCar } from "../../../../types";

import MarketUsedDealerSellingCar from "./MarketUsedDealerSellingCar";

export default function MarketUsedDealerSellingCars() {
  const [userSellingCars, setUserSellingCars] = useState<TSellingCar[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/useddealer/sellingcars", {
        withCredentials: true,
      })
      .then(({ data }: { data: TSellingCar[] }) => setUserSellingCars(data));
  }, []);

  return (
    <section className="user-selling-cars">
      <h2>Deine angebotenen Autos</h2>
      {userSellingCars.length > 0 ? (
        userSellingCars.map((car) => (
          <MarketUsedDealerSellingCar car={car} key={car._id} />
        ))
      ) : (
        <span>Sie bieten keine Autos an.</span>
      )}
    </section>
  );
}
