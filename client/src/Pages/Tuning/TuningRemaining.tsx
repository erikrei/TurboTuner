import { useEffect, useState } from "react";
import axios from "axios";

import { useTuningContext } from "../../Contexts/TuningContext";

import { TRemaining, TUserCar } from "../../types";

import TuningCancel from "./TuningCancel";

type TuningRemainingProps = {
  tuning_end: number;
};

export default function TuningRemaining({ tuning_end }: TuningRemainingProps) {
  const { userCars, setUserCars, selectedCarId, selectedCar } =
    useTuningContext();

  const [remainingTime, setRemainingTime] = useState<TRemaining>({
    showTime: true,
    feedbackMessage: "Tuningdauer wird berechnet...",
    time: undefined,
  });

  function handleTuningFinish() {
    axios
      .put(`http://localhost:3000/tuning/finish/${selectedCarId}`, null, {
        withCredentials: true,
      })
      .then((response) => {
        const finishedCarObject = response.data as TUserCar;
        const newCarObjects =
          userCars &&
          userCars.map((car) => {
            if (car._id === selectedCarId) return finishedCarObject;
            else return car;
          });
        setUserCars(newCarObjects);
      });
  }

  useEffect(() => {
    setRemainingTime({
      ...remainingTime,
      feedbackMessage: "Tuningdauer wird berechnet...",
      time: undefined,
    });
    const remainingInterval = setInterval(() => {
      const now = new Date().getTime();
      const remainingMS = new Date(tuning_end - now - 3600000);

      if (tuning_end - now > 0 && tuning_end - now < 1000) {
        setRemainingTime({
          ...remainingTime,
          showTime: false,
          feedbackMessage: "Tuning wird fertig gestellt...",
        });
      } else if (tuning_end - now > 1000) {
        setRemainingTime({
          ...remainingTime,
          feedbackMessage: "",
          time: {
            hours: remainingMS.getHours(),
            minutes: remainingMS.getMinutes(),
            seconds: remainingMS.getSeconds(),
          },
        });
      } else {
        clearInterval(remainingInterval);
        handleTuningFinish();
      }
    }, 1000);
    return () => clearInterval(remainingInterval);
  }, [selectedCarId]);

  return (
    <div className="remaining-time">
      {remainingTime.feedbackMessage && (
        <span>{remainingTime.feedbackMessage}</span>
      )}
      {remainingTime.showTime && remainingTime.time && (
        <>
          <span>Tuningdauer</span>
          <p>
            {remainingTime.time.hours !== 0 && (
              <span>{remainingTime.time.hours} Stunden</span>
            )}
            {remainingTime.time.minutes !== 0 && (
              <span>{remainingTime.time.minutes} Minuten</span>
            )}
            {remainingTime.time.seconds !== 0 && (
              <span>{remainingTime.time.seconds} Sekunden</span>
            )}
          </p>
        </>
      )}
      <TuningCancel hideButton={!remainingTime.time} />
    </div>
  );
}
