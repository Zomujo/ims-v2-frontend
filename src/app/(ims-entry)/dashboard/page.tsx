import { LogOutButton } from "@/features/auth/auth-components-client";
import { imsServerSession } from "@/lib/config/auth.config";

export default async function Dashboard() {
  const session = await imsServerSession();
  return (
    <div>
      <h1>Dashboard</h1>
      <div>{JSON.stringify(session?.user)}</div>
      <LogOutButton />
    </div>
  );
}
