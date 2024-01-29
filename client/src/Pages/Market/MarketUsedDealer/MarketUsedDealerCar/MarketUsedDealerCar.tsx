import { TSellingCar } from "../../../../types";

import CarImage from "../../../../Components/CarImage";
import MarketUsedDealerCarText from "./MarketUsedDealerCarText";
import MarketUsedDealerCarLink from "./MarketUsedDealerCarLink";

type MarketUsedDealerCarProps = {
  car: TSellingCar;
  showLink: boolean;
};

export default function MarketUsedDealerCar({
  car,
  showLink,
}: MarketUsedDealerCarProps) {
  return (
    <article className="car-container">
      <CarImage carName={car.name} />
      <MarketUsedDealerCarText car={car} />
      {showLink && <MarketUsedDealerCarLink car_id={car._id} />}
    </article>
  );
}
