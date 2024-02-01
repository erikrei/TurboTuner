import MarketUsedDealerSellContainer from "./MarketUsedDealerSellContainer";

import { useUsedDealerSelling } from "../../../../Contexts/UsedDealerSellingContext";

type MarketUsedDealerActiveUserCarProps = {
  handleSellClick: (car_id: string, car_price: number) => void;
};

export default function MarketUsedDealerActiveUserCar({
  handleSellClick,
}: MarketUsedDealerActiveUserCarProps) {
  const { activeCar } = useUsedDealerSelling();

  if (!activeCar) return null;

  return (
    <>
      <h2>Ausgewähltes Auto</h2>
      <article className="active-user-car">
        <h3>{activeCar.name}</h3>
        <MarketUsedDealerSellContainer
          activeCarId={activeCar._id}
          handleSellClick={handleSellClick}
        />
      </article>
    </>
  );
}
