import { useContext } from "react";
import { UserInfoContext } from "../Pages/DashboardLayout";

export default function UserInformation() {
  const userInfo = useContext(UserInfoContext);

  if (userInfo) {
    return (
      <section className="user-info">
        <h2>
          Willkommen <span>{userInfo.username}</span>
        </h2>
        <p>
          Kontostand: <span>{userInfo.money}€</span>
        </p>
        <p>
          Punkte: <span>{userInfo.points}</span>
        </p>
      </section>
    );
  }

  return <h1>UserInfo Objekt konnte nicht geladen werden</h1>;
}
