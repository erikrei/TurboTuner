import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { TSellingCarBid } from "../../../../types";

import { useUsedDealerSelling } from "../../../../Contexts/UsedDealerSellingContext";
import { useUserInfo } from "../../../../Contexts/UserInfoContext";

type MarketUsedDealerSellingCarSingleBidProps = {
  bid: TSellingCarBid;
  car_id: string;
};

export default function MarketUsedDealerSellingCarSingleBid({
  bid,
  car_id,
}: MarketUsedDealerSellingCarSingleBidProps) {
  const { userSellingCars, setUserSellingCars } = useUsedDealerSelling();
  const { userInfo, setUserInfo } = useUserInfo();

  function handleRemoveBidClick() {
    axios
      .put(
        `http://localhost:3000/useddealer/bid/remove/${car_id}`,
        {
          user_id: bid.bid_user,
        },
        { withCredentials: true }
      )
      .then(() => {
        const newUserSellingCars = userSellingCars.map((car) => {
          if (car._id !== car_id) return car;
          const otherCarBids = car.bids.filter(
            (filterBid) => filterBid._id !== bid._id
          );
          return {
            ...car,
            bids: otherCarBids,
          };
        });
        setUserSellingCars(newUserSellingCars);
        toast.success("Gebot wurde erfolgreich entfernt.", {
          duration: 2000,
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      });
  }

  function handleAcceptBidClick() {
    axios
      .delete(
        `http://localhost:3000/useddealer/buy/bid/${car_id}/${bid.bid_user}`,
        { withCredentials: true }
      )
      .then(({ data }: { data: string }) => {
        const newUserSellingCars = userSellingCars.filter(
          (car) => car._id !== car_id
        );
        setUserSellingCars(newUserSellingCars);
        userInfo &&
          setUserInfo({
            ...userInfo,
            money: userInfo.money + bid.amount,
          });
        toast.success(data, {
          duration: 2000,
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      });
  }

  return (
    <>
      <div className="bid-container">
        <span>{bid.amount} €</span>
        <button onClick={handleAcceptBidClick}>Gebot annehmen</button>
        <button onClick={handleRemoveBidClick}>Gebot ablehnen</button>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}
