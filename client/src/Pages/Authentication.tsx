import React, { useEffect } from "react";
import { Outlet, NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import AuthForm from "../Components/AuthForm";

import authBackground from "../assets/auth_bg1920x1280.jpg";
import authBackgroundMobile from "../assets/auth_bg640x426.jpg";

import "../styles/authentication.css";

import { TAuthBoolean } from "../types";

export default function Authentication() {
  const loaderData: AxiosResponse = useLoaderData() as AxiosResponse;
  const { isAuth }: TAuthBoolean = loaderData.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/dashboard");
  }, []);

  return (
    <div className="auth-container">
      <picture>
        <source media="(min-width: 40rem)" srcSet={authBackground} />
        <img
          src={authBackgroundMobile}
          style={
            {
              // width: '1903px'
            }
          }
          alt="Hintergrundbild der Authentifikation: Schwarzer BMW"
        />
      </picture>
      <section className="authentication">
        <nav>
          <NavLink to="login">Login</NavLink>
          <NavLink to="register">Registrieren</NavLink>
        </nav>
        <Outlet />
      </section>
    </div>
  );
}

export function Login() {
  return <AuthForm type="login" btnName="Einloggen" />;
}

export function Register() {
  return <AuthForm type="register" btnName="Registrieren" />;
}
