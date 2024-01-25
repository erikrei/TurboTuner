import { useState, useEffect } from "react";
import axios from "axios";

import { TUserCar } from "../../../types";

import DashboardTuninganzeigeHeader from "./DashboardTuninganzeigeHeader";
import DashboardTuninganzeigeContent from "./DashboardTuninganzeigeContent";

export default function DashboardTuninganzeige() {
  const [cars, setCars] = useState<TUserCar[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/car/allUser", { withCredentials: true })
      .then(({ data }: { data: TUserCar[] }) => setCars(data));
  }, []);

  return (
    <article className="tuninganzeige-container">
      <DashboardTuninganzeigeHeader />
      <DashboardTuninganzeigeContent cars={cars} />
    </article>
  );
}
