import { useState } from "react";
import axios from "axios";
import { TError } from "../../../../types";

import toast, { Toaster } from "react-hot-toast";

import { useUserInfo } from "../../../../Contexts/UserInfoContext";

import checkIntegerInput from "../../../../Helpers/checkIntegerInput";
import MarketUsedDealerBidText from "./MarketUsedDealerBidText";
import MarketUsedDealerBidButton from "./MarketUsedDealerBidButton";

type MarketUsedDealerBidContainerProps = {
  car_id: string;
  price: number;
};

export default function MarketUsedDealerBidContainer({
  car_id,
  price,
}: MarketUsedDealerBidContainerProps) {
  const [bidValue, setBidValue] = useState<string>("");
  const [bidError, setBidError] = useState<TError>({
    showError: false,
    errorMessage: "",
  });
  const { userInfo, setUserInfo } = useUserInfo();

  function handleBidClick() {
    const bidValueNumber = Number(bidValue);
    const errorObj = checkIntegerInput(bidValue, price, userInfo?.money);

    setBidError(errorObj);

    if (!errorObj.showError) {
      axios
        .put(
          `http://localhost:3000/useddealer/bid/add/${car_id}`,
          {
            amount: bidValueNumber,
          },
          { withCredentials: true }
        )
        .then(() => {
          userInfo &&
            setUserInfo({
              ...userInfo,
              money: userInfo.money - bidValueNumber,
            });
        });
      setBidValue("");
      toast.success(`Gebot in Höhe von ${bidValue} € erfolgreich abgegeben`, {
        duration: 1500,
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    }
  }

  return (
    <div className="bid-container">
      <MarketUsedDealerBidText setBidValue={setBidValue} bidValue={bidValue} />
      <MarketUsedDealerBidButton
        handleBidClick={handleBidClick}
        errorObj={bidError}
      />
      <Toaster position="bottom-right" />
    </div>
  );
}
