import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useLoaderData } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "../../styles/garage.css";

import { TUserCar, TUserInfo } from "../../types";

import { useUserInfo } from "../../Contexts/UserInfoContext";

export default function Garage() {
  const loaderData: AxiosResponse = useLoaderData() as AxiosResponse;
  const [userCars, setUserCars] = useState<TUserCar[]>(loaderData.data);

  const { userInfo, setUserInfo } = useUserInfo();
  const activeCarId = userInfo?.activeCar._id;

  function handleActiveCarClick(car_id: string) {
    axios
      .put(
        "http://localhost:3000/car/changeActiveCar",
        {
          car_id,
        },
        { withCredentials: true }
      )
      .then(({ data }: { data: TUserInfo }) => {
        setUserInfo && setUserInfo(data);
        toast.success(`${data.activeCar.name} wurde ausgewählt.`, {
          duration: 2000,
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      });
  }

  return (
    <>
      <h1 className="content-headline">Garage</h1>
      <section className="user-car-container">
        {userCars.map((car) => (
          <div className="car-container" key={car._id}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/${car.name}.png`}
              alt={`${car.name}`}
            />
            <div className="car-options">
              <h2>
                {car.name}
                {activeCarId === car._id ? (
                  <span>Aktiv</span>
                ) : (
                  <button onClick={() => handleActiveCarClick(car._id)}>
                    auswählen
                  </button>
                )}
              </h2>
            </div>
          </div>
        ))}
        <Toaster position="bottom-right" />
      </section>
    </>
  );
}
