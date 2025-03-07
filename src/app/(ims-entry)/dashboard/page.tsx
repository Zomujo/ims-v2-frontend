import { imsServerSession } from "@/lib/config/auth.config";

export default async function Dashboard() {
  const session = await imsServerSession();
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
