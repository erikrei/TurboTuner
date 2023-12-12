import axios, { AxiosResponse } from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Clock from "react-live-clock";

export default function DashboardHeader() {
  const navigate: NavigateFunction = useNavigate();

  function handleLogoutUser() {
    axios
      .post("http://localhost:3000/auth/logout", null, {
        withCredentials: true,
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) navigate("/");
      });
  }

  return (
    <header>
      <section className="time-container">
        <Clock format="dddd, HH:mm:ss" ticking />
        <FaClock />
      </section>
      <h1>TurboTuner</h1>
      <IoMdLogOut onClick={handleLogoutUser} />
    </header>
  );
}
