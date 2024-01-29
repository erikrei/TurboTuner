import { useState, useEffect } from "react";
import axios from "axios";

import { TBuyingCarBid } from "../../../../types";

import MarketUsedDealerSingleBid from "./MarketUsedDealerSingleBid";

export default function MarketUsedDealerBids() {
  const [bids, setBids] = useState<TBuyingCarBid[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/useddealer/bids", {
        withCredentials: true,
      })
      .then(({ data }: { data: TBuyingCarBid[] }) => setBids(data));
  }, []);

  function handleBidRemove(car_id: string) {
    axios
      .put(`http://localhost:3000/useddealer/bid/remove/${car_id}`, null, {
        withCredentials: true,
      })
      .then(() => {
        const newBids = bids.filter((bid) => bid._id !== car_id);
        setBids(newBids);
      });
  }

  return (
    <div className="buying-bids-container">
      <h2>Abgegebene Gebote</h2>
      {bids.length > 0 ? (
        bids.map((bid) => (
          <MarketUsedDealerSingleBid
            key={bid._id}
            bid={bid}
            handleBidRemove={handleBidRemove}
          />
        ))
      ) : (
        <span>Keine Gebote abgegeben</span>
      )}
    </div>
  );
}
