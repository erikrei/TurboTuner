import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type MarketUsedDealerSellContainerProps = {
  activeCarId: string;
};

export default function MarketUsedDealerSellContainer({
  activeCarId,
}: MarketUsedDealerSellContainerProps) {
  const [sellingPrice, setSellingPrice] = useState("");
  const navigate = useNavigate();

  function handleSellingPriceChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    setSellingPrice(value);
  }

  function handleSellClick() {
    axios
      .post(
        `http://localhost:3000/useddealer/${activeCarId}`,
        {
          price: Number(sellingPrice),
        },
        { withCredentials: true }
      )
      .then((response) => {
        navigate("..");
      });
  }

  return (
    <div className="user-car-sell-container">
      <label htmlFor="selling-price">Verkaufspreis</label>
      <input
        type="number"
        name="selling-price"
        id="selling-price"
        onChange={(event) => handleSellingPriceChange(event)}
      />
      <button onClick={handleSellClick}>Verkaufen</button>
    </div>
  );
}
