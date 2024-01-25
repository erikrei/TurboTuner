import DashboardLink from "../DashboardLink";

export default function DashboardRennenCountdownHeader() {
  return (
    <div className="rennencountdown-header">
      <p>Nächstes Rennen Countdown</p>
      <DashboardLink linkText="Zum Rennen anmelden" linkURL="race" />
    </div>
  );
}
