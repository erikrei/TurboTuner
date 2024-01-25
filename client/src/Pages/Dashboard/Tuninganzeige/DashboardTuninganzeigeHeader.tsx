import DashboardLink from "../DashboardLink";

export default function DashboardTuninganzeigeHeader() {
  return (
    <div className="tuninganzeige-header">
      <p>Derzeitige Tuningaufträge</p>
      <DashboardLink linkText="Zum Tuning" linkURL="tuning" />
    </div>
  );
}
