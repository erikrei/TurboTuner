import { useState } from "react";
import axios from "axios";

type MarketUsedDealerBidContainerProps = {
  car_id: string;
  price: number;
};

export default function MarketUsedDealerBidContainer({
  car_id,
  price,
}: MarketUsedDealerBidContainerProps) {
  const [bidValue, setBidValue] = useState<string>("");
  const [bidError, setBidError] = useState({
    showError: false,
    errorMessage: "",
  });

  function handleBidValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setBidValue(value);
  }

  function handleBidClick() {
    const bidValueNumber = Number(bidValue);

    if (!bidValueNumber) {
      setBidError({
        showError: true,
        errorMessage: "Sie müssen eine gültige Zahl eingeben.",
      });
    } else if (bidValue.indexOf(".") !== -1) {
      setBidError({
        showError: true,
        errorMessage: "Die Zahl darf keine Nachkommastellen enthalten.",
      });
    } else if (bidValueNumber >= price) {
      setBidError({
        showError: true,
        errorMessage: "Das Gebot kann nicht gleich oder über dem Preis sein.",
      });
    } else if (bidValueNumber < price * 0.8) {
      setBidError({
        showError: true,
        errorMessage: "Das Angebot kann nicht unter 80% des Preises liegen.",
      });
    } else {
      setBidError({
        showError: false,
        errorMessage: "",
      });
      axios.put(
        `http://localhost:3000/useddealer/bid/add/${car_id}`,
        {
          amount: bidValueNumber,
        },
        { withCredentials: true }
      );
    }
  }

  return (
    <div>
      <label htmlFor="bid">Bieten</label>
      <input
        type="number"
        name="bid"
        id="bid"
        onChange={(event) => handleBidValueChange(event)}
      />
      <button onClick={handleBidClick}>Gebot abgeben</button>
      {bidError.showError && <span>{bidError.errorMessage}</span>}
    </div>
  );
}
