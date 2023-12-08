import React, { useEffect } from "react";
import { AxiosResponse } from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";

import { TAuthBoolean } from "../types";

export default function Dashboard() {
  const loaderData: AxiosResponse = useLoaderData() as AxiosResponse;
  const { isAuth }: TAuthBoolean = loaderData.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, []);

  return <h1>Dashboard</h1>;
}
