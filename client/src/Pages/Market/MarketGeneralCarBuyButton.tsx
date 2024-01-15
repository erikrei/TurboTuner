import { useContext } from "react";

import { UserInfoContext } from "../DashboardLayout";

type MarketGeneralCarBuyButtonProps = {
  price: number;
  handleBuy: () => void;
};

export default function MarketGeneralCarBuyButton({
  price,
  handleBuy,
}: MarketGeneralCarBuyButtonProps) {
  const userInfo = useContext(UserInfoContext)?.userInfo;

  let disableButton: boolean = false;

  if (userInfo) {
    disableButton = userInfo.money < price;
  }

  return (
    <>
      <button disabled={disableButton} onClick={handleBuy}>
        Kaufen
      </button>
      {userInfo && disableButton && (
        <span className="error">
          Zu wenig Geld ({price - userInfo.money} € fehlen)
        </span>
      )}
    </>
  );
}
