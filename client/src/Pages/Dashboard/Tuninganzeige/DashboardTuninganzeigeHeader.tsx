import DashboardTuninganzeigeLink from "./DashboardTuninganzeigeLink";

export default function DashboardTuninganzeigeHeader() {
  return (
    <div className="tuninganzeige-header">
      <p>Derzeitige Tuningaufträge</p>
      <DashboardTuninganzeigeLink />
    </div>
  );
}