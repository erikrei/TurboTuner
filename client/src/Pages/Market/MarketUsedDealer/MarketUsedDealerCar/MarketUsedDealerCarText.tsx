import { TSellingCar } from "../../../../types";

import MarketUsedDealerCarComponents from "./MarketUsedDealerCarComponents";
import MarketUsedDealerCarPrice from "./MarketUsedDealerCarPrice";

type MarketUsedDealerCarTextProps = {
  car: TSellingCar;
};

export default function MarketUsedDealerCarText({
  car,
}: MarketUsedDealerCarTextProps) {
  return (
    <div className="car-text">
      <h2>{car.name}</h2>
      <MarketUsedDealerCarComponents components={car.tuning_components} />
      <MarketUsedDealerCarPrice price={car.price} />
    </div>
  );
}
