import DashboardBanner from "./DashboardBanner";
import DashboardPatchNotes from "./PatchNotes/DashboardPatchNotes";
import DashboardRennergebnis from "./Rennergebnis/DashboardRennergebnis";

export default function Dashboard() {
  return (
    <>
      <DashboardBanner />
      <section className="dashboard-content">
        <DashboardPatchNotes />
        <DashboardRennergebnis />
      </section>
    </>
  );
}
