import { useUsedDealerSelling } from "../../../../Contexts/UsedDealerSellingContext";
import { useUserInfo } from "../../../../Contexts/UserInfoContext";

import MarketUsedDealerUserCar from "./MarketUsedDealerUserCar";

export default function MarketUsedDealerUserCarsList() {
  const { userCars } = useUsedDealerSelling();
  const { userInfo } = useUserInfo();

  const carsAllowedToSell = userCars.filter(
    (car) => !car.tuning_information && car._id !== userInfo?.activeCar._id
  );

  if (carsAllowedToSell.length === 0) {
    return <span>Du hast kein Auto, das du verkaufen könntest.</span>;
  }

  return (
    <div className="user-cars-list">
      {userCars.map((car) => (
        <MarketUsedDealerUserCar car={car} key={car._id} />
      ))}
    </div>
  );
}
