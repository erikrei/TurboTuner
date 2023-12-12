import { Outlet, NavLink } from "react-router-dom";
import AuthForm from "../Components/AuthForm";

import authBackground from "../assets/auth_bg1920x1280.jpg";
import authBackgroundMobile from "../assets/auth_bg640x426.jpg";

import "../styles/authentication.css";

export default function Authentication() {
  return (
    <div className="auth-container">
      <picture>
        <source media="(min-width: 40rem)" srcSet={authBackground} />
        <img
          src={authBackgroundMobile}
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
