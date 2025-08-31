import DashboardOverview from "@features/dashboard/dashboardOverview";

export const dynamic = "force-static";

export default async function Dashboard() {
  return <DashboardOverview />;
}
