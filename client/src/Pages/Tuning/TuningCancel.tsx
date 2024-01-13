import { useContext } from "react";
import axios from "axios";
import { useTuningContext } from "../../Contexts/TuningContext";
import { UserInfoContext } from "../DashboardLayout";

import { TUserCarTuningCancel } from "../../types";

type TuningCancelProps = {
  hideButton: boolean;
};

export default function TuningCancel({ hideButton }: TuningCancelProps) {
  const { selectedCarId, userCars, setUserCars } = useTuningContext();
  const userInfo = useContext(UserInfoContext);

  function handleCancelTuningClick() {
    axios
      .put(`http://localhost:3000/tuning/cancel/${selectedCarId}`, null, {
        withCredentials: true,
      })
      .then(({ data }: { data: TUserCarTuningCancel }) => {
        const newSelectedCar = data.userCarResponse;
        const newUserCars =
          userCars &&
          userCars.map((car) => {
            if (car._id === selectedCarId) return newSelectedCar;
            else {
              return car;
            }
          });
        setUserCars(newUserCars);
        userInfo?.setUserInfo({
          ...userInfo.userInfo,
          money: userInfo.userInfo.money + data.moneyToReturn,
        });
      });
  }

  return (
    <button onClick={handleCancelTuningClick} hidden={hideButton}>
      Tuning abbrechen
    </button>
  );
}
