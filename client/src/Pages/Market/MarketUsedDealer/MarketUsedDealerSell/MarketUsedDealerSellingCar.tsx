import { TSellingCar } from "../../../../types";

import MarketUsedDealerRemoveCarButton from "./MarketUsedDealerRemoveCarButton";
import MarketUsedDealerSellingCarBids from "./MarketUsedDealerSellingCarBids";

type MarketUsedDealerSellingCarProps = {
  car: TSellingCar;
};

export default function MarketUsedDealerSellingCar({
  car,
}: MarketUsedDealerSellingCarProps) {
  return (
    <article className="selling-car">
      <p>{car.name}</p>
      <MarketUsedDealerRemoveCarButton car_id={car._id} />
      <MarketUsedDealerSellingCarBids bids={car.bids} car_id={car._id} />
    </article>
  );
}
