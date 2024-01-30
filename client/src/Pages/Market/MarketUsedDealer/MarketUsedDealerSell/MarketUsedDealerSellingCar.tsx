import { TSellingCar } from "../../../../types";

type MarketUsedDealerSellingCarProps = {
  car: TSellingCar;
};

export default function MarketUsedDealerSellingCar({
  car,
}: MarketUsedDealerSellingCarProps) {
  return (
    <article className="selling-car">
      <p>{car.name}</p>
      <div className="bids">
        {car.bids.length > 0 ? (
          car.bids.map((bid) => <span key={bid.bid_user}>{bid.amount} €</span>)
        ) : (
          <span>Keine Gebote auf das Auto</span>
        )}
      </div>
    </article>
  );
}
