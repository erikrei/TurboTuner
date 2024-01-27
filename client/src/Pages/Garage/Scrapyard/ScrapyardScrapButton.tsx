import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useUserInfo } from "../../../Contexts/UserInfoContext";

type ScrapyardScrapButtonProps = {
  scrapyardPrice: number;
  carId: string;
};

export default function ScrapyardScrapButton({
  scrapyardPrice,
  carId,
}: ScrapyardScrapButtonProps) {
  const { userInfo, setUserInfo } = useUserInfo();
  const navigate = useNavigate();

  function handleSellClick() {
    axios
      .delete(`http://localhost:3000/scrapyard/${carId}/${scrapyardPrice}`, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/dashboard/garage");
        userInfo &&
          setUserInfo({
            ...userInfo,
            money: userInfo.money + scrapyardPrice,
          });
      });
  }

  return (
    <button onClick={handleSellClick}>
      Für {scrapyardPrice}€ verschrotten
    </button>
  );
}
