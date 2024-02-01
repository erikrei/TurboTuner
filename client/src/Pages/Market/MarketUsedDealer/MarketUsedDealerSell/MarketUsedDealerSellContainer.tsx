import { useState } from "react";

type MarketUsedDealerSellContainerProps = {
  activeCarId: string;
  handleSellClick: (car_id: string, car_price: number) => void;
};

export default function MarketUsedDealerSellContainer({
  activeCarId,
  handleSellClick,
}: MarketUsedDealerSellContainerProps) {
  const [sellingPrice, setSellingPrice] = useState("");

  return (
    <div className="user-car-sell-container">
      <label htmlFor="selling-price">Verkaufspreis</label>
      <input
        type="number"
        name="selling-price"
        id="selling-price"
        value={sellingPrice}
        onChange={(event) => setSellingPrice(event.target.value)}
      />
      <button
        onClick={() => handleSellClick(activeCarId, Number(sellingPrice))}
      >
        Verkaufen
      </button>
    </div>
  );
}
