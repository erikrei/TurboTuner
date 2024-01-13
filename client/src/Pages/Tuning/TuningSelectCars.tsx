import { useTuningContext } from "../../Contexts/TuningContext";

export default function TuningSelectCars() {
  const { userCars, setSelectedCarId } = useTuningContext();

  return (
    userCars && (
      <select
        name="current-car"
        id="current-car"
        onChange={(event) => setSelectedCarId(event.target.value)}
      >
        {userCars &&
          userCars.map((car) => (
            <option key={car._id} value={car._id}>
              {car.name}{" "}
              {car.tuning_information &&
                car.tuning_information.tuning_end > new Date().getTime() &&
                "[is tuning]"}
            </option>
          ))}
      </select>
    )
  );
}
