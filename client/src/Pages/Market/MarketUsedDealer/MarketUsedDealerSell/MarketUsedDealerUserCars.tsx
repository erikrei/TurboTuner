import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { TSellingCar } from "../../../../types";

import checkSellingInput from "../../../../Helpers/checkSellingInput";

import MarketUsedDealerUserCarsList from "./MarketUsedDealerUserCarsList";
import MarketUsedDealerActiveUserCar from "./MarketUsedDealerActiveUserCar";

import { useUsedDealerSelling } from "../../../../Contexts/UsedDealerSellingContext";

export default function MarketUsedDealerUserCars() {
  const {
    userCars,
    activeCar,
    userSellingCars,
    setUserCars,
    setActiveCar,
    setUserSellingCars,
  } = useUsedDealerSelling();

  function handleSellClick(car_id: string, car_price: number) {
    if (checkSellingInput(car_price)) {
      axios
        .post(
          `http://localhost:3000/useddealer/${car_id}`,
          {
            price: car_price,
          },
          { withCredentials: true }
        )
        .then(({ data }: { data: TSellingCar }) => {
          setActiveCar(null);
          setUserCars(userCars.filter((car) => car._id !== car_id));
          setUserSellingCars([...userSellingCars, data]);
          toast.success(
            `${activeCar?.name} wurde erfolgreich zum Verkauf für ${car_price} € angeboten.`,
            {
              duration: 2000,
              style: {
                backgroundColor: "green",
                color: "white",
              },
            }
          );
        });
    }
  }

  return (
    <>
      <section className="user-cars">
        <h2>Deine Autos</h2>
        <MarketUsedDealerUserCarsList />
        <MarketUsedDealerActiveUserCar handleSellClick={handleSellClick} />
      </section>
      <Toaster position="bottom-right" />
    </>
  );
}
