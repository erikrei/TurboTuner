export default function DashboardBanner() {
  return (
    <img
      className="dashboard-banner"
      src={`${process.env.PUBLIC_URL}/assets/dashboard_banner.png`}
    />
  );
}
