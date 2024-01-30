import { useState, useEffect } from "react";
import axios from "axios";
import { TUserCar } from "../../../../types";

import MarketUsedDealerUserCar from "./MarketUsedDealerUserCar";
import MarketUsedDealerActiveUserCar from "./MarketUsedDealerActiveUserCar";

export default function MarketUsedDealerUserCars() {
  const [userCars, setUserCars] = useState<TUserCar[]>([]);
  const [activeCar, setActiveCar] = useState<TUserCar | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/car/allUser", { withCredentials: true })
      .then(({ data }: { data: TUserCar[] }) => setUserCars(data));
  }, []);

  return (
    <section className="user-cars">
      <h2>Deine Autos</h2>
      {userCars.length > 1 ? (
        userCars.map((car) => (
          <MarketUsedDealerUserCar
            car={car}
            setActiveCar={setActiveCar}
            key={car._id}
          />
        ))
      ) : (
        <span>Du hast kein Auto, das du verkaufen könntest.</span>
      )}
      {activeCar && <MarketUsedDealerActiveUserCar activeCar={activeCar} />}
    </section>
  );
}
