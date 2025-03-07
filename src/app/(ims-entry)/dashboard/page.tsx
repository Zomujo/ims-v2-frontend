import { imsServerSession } from "@/lib/config/auth.config";

export default async function Dashboard() {
  const session = await imsServerSession();
  console.log("session>>>", session);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
