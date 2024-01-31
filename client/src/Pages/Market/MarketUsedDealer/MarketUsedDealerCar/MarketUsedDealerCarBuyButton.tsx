import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useUserInfo } from "../../../../Contexts/UserInfoContext";

import ErrorFeedback from "../../../../Components/ErrorFeedback";

type MarketUsedDealerCarBuyButton = {
  car_id: string;
  disableBtn: boolean;
  price: number;
};

export default function MarketUsedDealerCarBuyButton({
  car_id,
  disableBtn,
  price,
}: MarketUsedDealerCarBuyButton) {
  const { userInfo, setUserInfo } = useUserInfo();
  const navigate = useNavigate();

  function handleBuyClick() {
    axios
      .delete(`http://localhost:3000/useddealer/buy/price/${car_id}`, {
        withCredentials: true,
      })
      .then(() => {
        userInfo &&
          setUserInfo({
            ...userInfo,
            money: userInfo.money - price,
          });
        navigate("..");
      });
  }

  return (
    <>
      <button onClick={handleBuyClick} disabled={disableBtn}>
        Auto kaufen
      </button>
      <ErrorFeedback
        errorText="Nicht genug Geld, um das Auto zu kaufen."
        showFeedback={disableBtn}
      />
    </>
  );
}
