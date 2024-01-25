import { TUserCar } from "../../../types";

import DashboardTuninganzeigeCarHeader from "./DashboardTuninganzeigeCarHeader";
import DashboardTuninganzeigeCarContent from "./DashboardTuninganzeigeCarContent";

type DashboardTuninganzeigeCarProps = {
  car: TUserCar;
};

export default function DashboardTuninganzeigeCar({
  car,
}: DashboardTuninganzeigeCarProps) {
  return (
    <div className="tuninganzeige-car-container">
      <DashboardTuninganzeigeCarHeader carName={car.name} />
      {car.tuning_information && (
        <DashboardTuninganzeigeCarContent
          tuning_information={car.tuning_information}
        />
      )}
    </div>
  );
}
