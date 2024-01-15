import { useUserInfo } from "../Contexts/UserInfoContext";

export default function UserInformationContainer() {
  const { userInfo } = useUserInfo();

  if (!userInfo) {
    return (
      <p className="loader-text">Benutzerinformationen werden geladen...</p>
    );
  }

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
