import { AxiosResponse } from "axios";
import { useLoaderData, Navigate } from "react-router-dom";

import "../../styles/dashboard.css";

import CarCard from "./CarCard";

import { TUserInfo } from "../../types";

export default function FirstCarSelection() {
  const loaderData: AxiosResponse = useLoaderData() as AxiosResponse;
  const { firstLogin }: TUserInfo = loaderData.data;

  if (firstLogin) {
    return (
      <div className="dashboard-layout-container first-car-selection">
        <h1>Startauto auswählen</h1>
        <section className="cards-container">
          <CarCard carName="CelestialCruiser" />
          <CarCard carName="HorizonVista" />
        </section>
      </div>
    );
  }

  return <Navigate to="/dashboard" />;
}
