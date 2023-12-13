import { useContext } from "react";
import { UserInfoContext } from "../Pages/DashboardLayout";

import "../styles/userInformation.css";

export default function UserInformation() {
  const userInfo = useContext(UserInfoContext);

  if (userInfo) {
    return (
      <section className="user-info">
        <h2>
          Willkommen, <span>{userInfo.username} !</span>
        </h2>
        <table>
          <tbody>
            <tr>
              <td>Kontostand</td>
              <td>{userInfo.money} €</td>
            </tr>
            <tr>
              <td>Punkte</td>
              <td>{userInfo.points}</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }

  return <h1>UserInfo Objekt konnte nicht geladen werden</h1>;
}
