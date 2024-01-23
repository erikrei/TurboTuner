import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";

import { TUser, TUserInfo } from "../../types";

type AuthFormProps = {
  type: string;
};

export default function AuthForm({ type }: AuthFormProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUser>({
    username: "",
    password: "",
  });

  const toastSuccessStyles: React.CSSProperties = {
    backgroundColor: "green",
    color: "white",
  };

  const toastErrorStyles: React.CSSProperties = {
    backgroundColor: "red",
    color: "white",
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleLoginUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post(`http://localhost:3000/auth/login`, user, {
        withCredentials: true,
      })
      .then(({ data }: { data: TUserInfo }) => {
        data.firstLogin ? navigate("/firstCar") : navigate("/dashboard");
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          const feedbackMessage: string = error.response.data as string;
          toast.error(feedbackMessage, {
            duration: 2000,
            style: toastErrorStyles,
          });
        }
      });
  }

  function handleRegisterUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post(`http://localhost:3000/auth/register`, user, {
        withCredentials: true,
      })
      .then(({ data }: { data: string }) => {
        toast.success(data, {
          duration: 2000,
          style: toastSuccessStyles,
        });
      })
      .catch((error: AxiosError) => {
        const feedbackMessage: string = error.response?.data as string;
        toast.error(feedbackMessage, {
          duration: 2000,
          style: toastErrorStyles,
        });
      });
  }

  return (
    <form
      onSubmit={
        type === "login"
          ? (event) => handleLoginUser(event)
          : (event) => handleRegisterUser(event)
      }
    >
      <label htmlFor="username">
        Benutzername
        <input
          autoComplete="off"
          type="text"
          name="username"
          id="username"
          onChange={(event) => handleInputChange(event)}
        />
      </label>
      <label htmlFor="password">
        Passwort
        <input
          type="password"
          name="password"
          id="password"
          onChange={(event) => handleInputChange(event)}
        />
      </label>
      <button type="submit">
        {type === "login" ? "Einloggen" : "Registrieren"}
      </button>
      <Toaster />
    </form>
  );
}
