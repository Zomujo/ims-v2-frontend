import { LogOutButton } from "@/features/auth/auth-components-client";
import { imsServerSession } from "@/lib/config/auth.config";

export default async function Dashboard() {
  const session = await imsServerSession();

  // const { access } = await transformPermissionsToMap(PermissionModules.ITEMS);

  return (
    <div>
      <h1>Dashboard</h1>
      <div></div>
      <p className="max-w-[80%] text-pretty break-words">
        {session?.user?.permissions}
      </p>
      <br />
      {/* {access.DELETE && <p>Can delete items</p>} */}
      <br />
      <p className="max-w-[80%] text-pretty break-words">
        {session?.user?.tokens.accessToken}
      </p>
      <LogOutButton />
    </div>
  );
}
