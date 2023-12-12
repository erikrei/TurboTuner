// import { useUserInfoContext } from "../Contexts/UserInfoContext";
import { useContext } from "react";
import { UserInfoContext } from "../Contexts/UserInfoContext";

export default function UserInformation() {
  const userInfo = useContext(UserInfoContext);

  if (userInfo) {
    return (
      <section className="user-info">
        <h2>Willkommen</h2>
        <p>
          Kontostand: <span>{userInfo.money}€</span>
        </p>
        <p>
          Punkte: <span>{userInfo.points}</span>
        </p>
      </section>
    );
  }

  return <h1>UserInformation mit leerem UserInfo Objekt</h1>;
}
