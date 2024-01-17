import { useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";

import { useTuningContext } from "../../Contexts/TuningContext";

import { TUserCar, TUserCarTuningComponent } from "../../types";

import TuningRemaining from "./TuningRemaining";
import TuningCarComponent from "./TuningCarComponent";

export default function TuningSelectedCar() {
  const { userCars, setUserCars, selectedCarId, selectedCar } =
    useTuningContext();

  function handleTuningClick(
    component: TUserCarTuningComponent,
    fast_tuning: boolean = false
  ) {
    selectedCar &&
      axios
        .put(
          `http://localhost:3000/tuning/car/${selectedCar._id}`,
          {
            component_name: component.component_name,
            new_component_level: component.component_level + 1,
            fast_tuning,
            car_name: selectedCar.name,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          const { tuning_information } = response.data as TUserCar;
          const newCars =
            userCars &&
            userCars.map((car) => {
              if (selectedCar && car._id !== selectedCar._id) {
                return car;
              } else {
                return {
                  ...car,
                  tuning_information,
                };
              }
            });
          setUserCars(newCars);
        });
  }

  useEffect(() => {
    if (
      selectedCar?.tuning_information &&
      selectedCar?.tuning_information?.tuning_end < new Date().getTime()
    ) {
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
  }, [selectedCarId]);

  if (!selectedCar) {
    return <ReactLoading type="spin" color="#219ebc" />;
  }

  return (
    <>
      <div className="selected-car-header">
        <p>CAR_ID: {selectedCar._id}</p>
        <p>CAR_NAME: {selectedCar.name}</p>
      </div>
      {selectedCar.tuning_information &&
        selectedCar.tuning_information.tuning_end > new Date().getTime() && (
          <TuningRemaining
            tuning_end={selectedCar.tuning_information.tuning_end}
          />
        )}
      <div className="selected-car-components">
        <h1>Komponenten</h1>
        {selectedCar.tuning_components.map((component) => (
          <TuningCarComponent
            key={component._id}
            component={component}
            handleTuning={handleTuningClick}
          />
        ))}
      </div>
    </>
  );
}
