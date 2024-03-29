import { useState, useEffect } from "react";
import axios from "axios";

import { TBuyingCarBid } from "../../../../types";

import { useUserInfo } from "../../../../Contexts/UserInfoContext";

import MarketUsedDealerSingleBid from "./MarketUsedDealerSingleBid";

export default function MarketUsedDealerBids() {
  const [bids, setBids] = useState<TBuyingCarBid[]>([]);
  const { userInfo, setUserInfo } = useUserInfo();

  useEffect(() => {
    axios
      .get("http://localhost:3000/useddealer/bids", {
        withCredentials: true,
      })
      .then(({ data }: { data: TBuyingCarBid[] }) => setBids(data));
  }, []);

  function handleBidRemove(car_id: string, bid_amount: number) {
    axios
      .put(
        `http://localhost:3000/useddealer/bid/remove/${car_id}`,
        { user_id: userInfo?._id },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        const newBids = bids.filter((bid) => bid._id !== car_id);
        setBids(newBids);
        userInfo &&
          setUserInfo({
            ...userInfo,
            money: userInfo.money + bid_amount,
          });
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
