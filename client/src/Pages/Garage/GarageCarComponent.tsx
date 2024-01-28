import { TUserCar } from "../../types";

import GarageCarOptions from "./GarageCarOptions";
import GarageCarImage from "./GarageCarImage";

type GarageCarComponentProps = {
  car: TUserCar;
};

export default function GarageCarComponent({
  car,
}: GarageCarComponentProps) {
  return (
    <div className="car-container">
      <GarageCarImage carName={car.name} />
      <GarageCarOptions car={car} />
    </div>
  );
}
