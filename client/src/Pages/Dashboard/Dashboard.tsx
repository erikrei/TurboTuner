import DashboardBanner from "./DashboardBanner";
import DashboardPatchNotes from "./DashboardPatchNotes";

export default function Dashboard() {
  return (
    <>
      <DashboardBanner />
      <section className="dashboard-content">
        <DashboardPatchNotes />
      </section>
    </>
  );
}
