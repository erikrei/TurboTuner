import { AxiosResponse } from "axios";
import { useLoaderData } from "react-router-dom";

import { TSellingCar } from "../../../types";

import { useUserInfo } from "../../../Contexts/UserInfoContext";

import MarketUsedDealerCar from "./MarketUsedDealerCar/MarketUsedDealerCar";
import MarketUsedDealerCarBuyButton from "./MarketUsedDealerCar/MarketUsedDealerCarBuyButton";
import MarketUsedDealerBidContainer from "./MarketUsedDealerBids/MarketUsedDealerBidContainer";

export default function MarketUsedDealerSingleView() {
  const loaderData = useLoaderData() as AxiosResponse;
  const car: TSellingCar = loaderData.data;

  const { userInfo } = useUserInfo();

  let disableBuyButton = false;

  if (userInfo && userInfo.money < car.price) {
    disableBuyButton = true;
  }

  return (
    <>
      <MarketUsedDealerCar car={car} showLink={false} />
      <MarketUsedDealerCarBuyButton
        car_id={car._id}
        disableBtn={disableBuyButton}
        price={car.price}
      />
      <MarketUsedDealerBidContainer price={car.price} car_id={car._id} />
    </>
  );
}
