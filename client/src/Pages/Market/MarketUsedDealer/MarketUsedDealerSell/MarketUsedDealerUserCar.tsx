import { TUserCar } from "../../../../types";

import { useUserInfo } from "../../../../Contexts/UserInfoContext";

type MarketUsedDealerUserCarProps = {
  car: TUserCar;
  setActiveCar: React.Dispatch<React.SetStateAction<TUserCar | null>>;
};

export default function MarketUsedDealerUserCar({
  car,
  setActiveCar,
}: MarketUsedDealerUserCarProps) {
  const { userInfo } = useUserInfo();
  const isActiveCar = userInfo?.activeCar._id === car._id;
  return (
    <p
      className="user-car-name"
      onClick={() => setActiveCar(car)}
      hidden={isActiveCar}
    >
      {car.name}
    </p>
  );
}
