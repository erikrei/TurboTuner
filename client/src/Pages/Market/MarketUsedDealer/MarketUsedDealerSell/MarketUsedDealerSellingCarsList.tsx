import { useUsedDealerSelling } from "../../../../Contexts/UsedDealerSellingContext";

import MarketUsedDealerSellingCar from "./MarketUsedDealerSellingCar";

export default function MarketUsedDealerSellingCarsList() {
  const { userSellingCars } = useUsedDealerSelling();

  if (userSellingCars.length === 0) {
    return <span>Sie bieten keine Autos an.</span>;
  }

  return (
    <div className="selling-cars-list">
      {userSellingCars.map((car) => (
        <MarketUsedDealerSellingCar car={car} key={car._id} />
      ))}
    </div>
  );
}
