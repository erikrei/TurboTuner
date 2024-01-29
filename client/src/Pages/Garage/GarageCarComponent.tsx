import { TUserCar } from "../../types";

import GarageCarOptions from "./GarageCarOptions";
import CarImage from "../../Components/CarImage";

type GarageCarComponentProps = {
  car: TUserCar;
};

export default function GarageCarComponent({ car }: GarageCarComponentProps) {
  return (
    <div className="car-container">
      <CarImage carName={car.name} />
      <GarageCarOptions car={car} />
    </div>
  );
}
