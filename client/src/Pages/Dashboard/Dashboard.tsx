import DashboardBanner from "./DashboardBanner";
import DashboardPatchNotes from "./PatchNotes/DashboardPatchNotes";
import DashboardRennergebnis from "./Rennergebnis/DashboardRennergebnis";
import DashboardTuninganzeige from "./Tuninganzeige/DashboardTuninganzeige";

export default function Dashboard() {
  return (
    <>
      <DashboardBanner />
      <section className="dashboard-content">
        <DashboardPatchNotes />
        <DashboardRennergebnis />
        <DashboardTuninganzeige />
      </section>
    </>
  );
}
