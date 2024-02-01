import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useUsedDealerSelling } from "../../../../Contexts/UsedDealerSellingContext";

type MarketUsedDealerRemoveCarButtonProps = {
  car_id: string;
};

export default function MarketUsedDealerRemoveCarButton({
  car_id,
}: MarketUsedDealerRemoveCarButtonProps) {
  const { userSellingCars, setUserSellingCars } = useUsedDealerSelling();

  function handleRemoveCarClick() {
    axios
      .delete(`http://localhost:3000/useddealer/${car_id}`, {
        withCredentials: true,
      })
      .then(() => {
        const newSellingCarsList = userSellingCars.filter(
          (car) => car._id !== car_id
        );
        setUserSellingCars(newSellingCarsList);
        toast.success("Auto wurde erfolgreich vom Markt entfernt.", {
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
      <button onClick={handleRemoveCarClick}>Auto entfernen</button>
      <Toaster position="bottom-right" />
    </>
  );
}
