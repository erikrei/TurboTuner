import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";

import { TAuthForm, TUser } from "../types";

export default function AuthForm({ type, btnName }: TAuthForm) {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUser>({
    username: "",
    password: "",
  });

  const toastSuccessStyles: React.CSSProperties = {
    backgroundColor: "green",
    color: 'white'
  };

  const toastErrorStyles: React.CSSProperties = {
    backgroundColor: "red",
    color: 'white'
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
      .post(`http://localhost:3000/auth/${type}`, user, {
        withCredentials: true,
      })
      .then((response: AxiosResponse) => {
        toast.success(
          `Erfolgreich eingeloggt als ${user.username}. Du wirst weitergeleitet...`,
          {
            style: toastSuccessStyles,
          }
        );
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
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
      .post(`http://localhost:3000/auth/${type}`, user, {
        withCredentials: true,
      })
      .then((response: AxiosResponse) => {
        toast.success(
          `Benutzer ${user.username} wurde erfolgreich registriert. Du kannst dich jetzt einloggen.`,
          {
            duration: 2000,
            style: toastSuccessStyles,
          }
        );
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
      <button type="submit">{btnName}</button>
      <Toaster />
    </form>
  );
}
