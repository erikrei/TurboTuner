import { TSellingCarBid } from "../../../../types";

import MarketUsedDealerSellingCarSingleBid from "./MarketUsedDealerSellingCarSingleBid";

type MarketUsedDealerSellingCarBidsProps = {
  bids: TSellingCarBid[];
  car_id: string;
};

export default function MarketUsedDealerSellingCarBids({
  bids,
  car_id,
}: MarketUsedDealerSellingCarBidsProps) {
  if (bids.length === 0) {
    return <p>Keine Gebote auf das Auto</p>;
  }

  return (
    <div className="bids">
      {bids.map((bid) => (
        <MarketUsedDealerSellingCarSingleBid
          key={bid.bid_user}
          bid={bid}
          car_id={car_id}
        />
      ))}
    </div>
  );
}
