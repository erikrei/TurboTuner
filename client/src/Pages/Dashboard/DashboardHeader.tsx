import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Clock from "react-live-clock";

export default function DashboardHeader() {
  const navigate = useNavigate();

  function handleLogoutUser() {
    axios
      .post("http://localhost:3000/auth/logout", null, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/");
      });
  }

  return (
    <header>
      <section className="time-container">
        <FaClock />
        <Clock format="dddd, HH:mm:ss" ticking />
      </section>
      <h1>TurboTuner</h1>
      <IoMdLogOut onClick={handleLogoutUser} />
    </header>
  );
}
