import { TUserInfo } from "../types";

type Props = {
  userInfo: TUserInfo;
};

export default function UserInformationContainer({ userInfo }: Props) {
  return (
    <div className="user-info-content">
      <div className="info-container">
        <p className="info-category">Benutzername</p>
        <p className="info-value">{userInfo.username}</p>
      </div>
      <div className="info-container">
        <p className="info-category">Kontostand</p>
        <p className="info-value">{userInfo.money} €</p>
      </div>
      <div className="info-container">
        <p className="info-category">Punkte</p>
        <p className="info-value">{userInfo.points}</p>
      </div>
      <div className="info-container">
        <p className="info-category">Ausgewähltes Auto</p>
        <p className="info-value">{userInfo.activeCar.name}</p>
      </div>
    </div>
  );
}
