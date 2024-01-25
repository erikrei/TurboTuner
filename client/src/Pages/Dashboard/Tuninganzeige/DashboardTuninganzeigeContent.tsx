import { TUserCar } from "../../../types";

import DashboardTuninganzeigeCar from "./DashboardTuninganzeigeCar";

type DashboardTuninganzeigeContentProps = {
  cars: TUserCar[];
};

export default function DashboardTuninganzeigeContent({
  cars,
}: DashboardTuninganzeigeContentProps) {
  const carsWithTuningInformation = cars.filter(
    (car) => car.tuning_information
  );

  return (
    <div className="tuninganzeige-content">
      {carsWithTuningInformation.length ? (
        carsWithTuningInformation.map((car) => (
          <DashboardTuninganzeigeCar key={car._id} car={car} />
        ))
      ) : (
        <span>Keine Tuningaufträge vorhanden.</span>
      )}
    </div>
  );
}
