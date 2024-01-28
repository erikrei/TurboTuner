import axios from "axios";
import toast from "react-hot-toast";

import { TUserCar, TUserInfo } from "../../types";

import { useUserInfo } from "../../Contexts/UserInfoContext";

import GarageActiveButton from "./GarageActiveButton";
import GarageScrapyardButton from "./GarageScrapyardButton";

type GarageCarOptionsProps = {
  car: TUserCar;
};

export default function GarageCarOptions({ car }: GarageCarOptionsProps) {
  const { userInfo, setUserInfo } = useUserInfo();

  function handleActiveCarClick() {
    axios
      .put(
        "http://localhost:3000/car/changeActiveCar",
        {
          car_id: car._id,
        },
        { withCredentials: true }
      )
      .then(({ data }: { data: TUserInfo }) => {
        setUserInfo && setUserInfo(data);
        toast.success(`${data.activeCar.name} wurde ausgewählt.`, {
          duration: 2000,
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      });
  }

  return (
    <div className="car-options">
      <h2>{car.name}</h2>
      {userInfo?.activeCar._id === car._id ? (
        <span>Aktiv</span>
      ) : (
        <>
          <GarageActiveButton handleActiveCarClick={handleActiveCarClick} />
          <GarageScrapyardButton car_id={car._id} />
        </>
      )}
    </div>
  );
}
