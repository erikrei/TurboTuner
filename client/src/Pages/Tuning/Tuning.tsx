import TuningContextProvider from "../../Contexts/TuningContext";

import "../../styles/tuning.css";

import TuningSelectedCar from "./TuningSelectedCar";
import TuningSelectCars from "./TuningSelectCars";

export default function Tuning() {
  return (
    <TuningContextProvider>
      <h1 className="content-headline">Tuning</h1>
      <TuningSelectCars />
      <section className="selected-car-container tmp-bg">
        <TuningSelectedCar />
      </section>
    </TuningContextProvider>
  );
}
