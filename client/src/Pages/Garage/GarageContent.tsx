import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AxiosResponse } from "axios";
import { Toaster } from "react-hot-toast";

import { TUserCar } from "../../types";

import GarageCarComponent from "./GarageCarComponent";

export default function GarageContent() {
  const loaderData: AxiosResponse = useLoaderData() as AxiosResponse;
  const [userCars] = useState<TUserCar[]>(loaderData.data);

  return (
    <>
      <section className="user-car-container">
        {userCars.map((car) => (
          <GarageCarComponent car={car} key={car._id} />
        ))}
      </section>
      <Toaster position="bottom-right" />
    </>
  );
}
