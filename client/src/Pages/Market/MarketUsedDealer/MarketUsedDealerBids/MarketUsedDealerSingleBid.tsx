import { NavLink } from "react-router-dom";

import { TBuyingCarBid } from "../../../../types";

type MarketUsedDealerSingleBidProps = {
  bid: TBuyingCarBid;
  handleBidRemove: (car_id: string) => void;
};

export default function MarketUsedDealerSingleBid({
  bid,
  handleBidRemove,
}: MarketUsedDealerSingleBidProps) {
  return (
    <div className="single-bid">
      <NavLink to={bid._id}>{bid.name}</NavLink>
      <span>{bid.bids[0].amount} €</span>
      <button onClick={() => handleBidRemove(bid._id)}>Gebot entfernen</button>
    </div>
  );
}
