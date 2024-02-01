import { TUserCar } from "../../../../types";

import { useUserInfo } from "../../../../Contexts/UserInfoContext";
import { useUsedDealerSelling } from "../../../../Contexts/UsedDealerSellingContext";

type MarketUsedDealerUserCarProps = {
  car: TUserCar;
};

export default function MarketUsedDealerUserCar({
  car,
}: MarketUsedDealerUserCarProps) {
  const { setActiveCar } = useUsedDealerSelling();
  const { userInfo } = useUserInfo();
  const isActiveCar = userInfo?.activeCar._id === car._id;

  if (isActiveCar || car.tuning_information) return null;

  return (
    <p className="user-car-name" onClick={() => setActiveCar(car)}>
      {car.name}
    </p>
  );
}
