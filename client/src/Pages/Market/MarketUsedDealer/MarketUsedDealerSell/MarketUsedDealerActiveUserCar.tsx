import { TUserCar } from "../../../../types";

import MarketUsedDealerSellContainer from "./MarketUsedDealerSellContainer";

type MarketUsedDealerActiveUserCarProps = {
  activeCar: TUserCar;
};

export default function MarketUsedDealerActiveUserCar({
  activeCar,
}: MarketUsedDealerActiveUserCarProps) {
  return (
    <>
      <h2>Ausgewähltes Auto</h2>
      <article className="active-user-car">
        <h3>{activeCar.name}</h3>
      </article>
      <MarketUsedDealerSellContainer activeCarId={activeCar._id} />
    </>
  );
}
