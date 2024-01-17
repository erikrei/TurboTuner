import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { TGeneralCar } from "../../types";

import { useUserInfo } from "../../Contexts/UserInfoContext";

import MarketGeneralCarBuyButton from "./MarketGeneralCarBuyButton";

type MarketGeneralCarContainerProps = {
  generalCar: TGeneralCar;
};

export default function MarketGeneralCarContainer({
  generalCar,
}: MarketGeneralCarContainerProps) {
  const { userInfo, setUserInfo } = useUserInfo();

  function handleBuyGeneralCarClick() {
    axios
      .post(
        "http://localhost:3000/car/addToUser",
        {
          name: generalCar.name,
        },
        { withCredentials: true }
      )
      .then(({ data }: { data: string }) => {
        userInfo &&
          setUserInfo({
            ...userInfo,
            money: userInfo.money - generalCar.price,
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
        <h2>
          {generalCar.name}{" "}
          <span className="general-car-class">Klasse {generalCar.quality}</span>
        </h2>
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
