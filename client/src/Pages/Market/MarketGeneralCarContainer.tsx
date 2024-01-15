import { useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { TGeneralCar } from "../../types";

import { UserInfoContext } from "../DashboardLayout";

import MarketGeneralCarBuyButton from "./MarketGeneralCarBuyButton";

type MarketGeneralCarContainerProps = {
  generalCar: TGeneralCar;
};

export default function MarketGeneralCarContainer({
  generalCar,
}: MarketGeneralCarContainerProps) {
  const userInfo = useContext(UserInfoContext);

  function handleBuyGeneralCarClick() {
    axios
      .post(
        "http://localhost:3000/car/addToUser",
        {
          name: generalCar.name,
          price: generalCar.price,
        },
        { withCredentials: true }
      )
      .then(({ data }: { data: string }) => {
        userInfo &&
          userInfo.setUserInfo({
            ...userInfo.userInfo,
            money: userInfo.userInfo.money - generalCar.price,
          });
        toast.success(data, {
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      });
  }

  return (
    <article className="general-car">
      <img src={`${process.env.PUBLIC_URL}/assets/${generalCar.imgSrc}`} />
      <div className="general-car-text">
        <h2>{generalCar.name}</h2>
        <p>{generalCar.description}</p>
        <p>
          Preis <span className="general-car-price">{generalCar.price} €</span>
          <MarketGeneralCarBuyButton
            price={generalCar.price}
            handleBuy={handleBuyGeneralCarClick}
          />
        </p>
      </div>
      <Toaster position="bottom-right" />
    </article>
  );
}
