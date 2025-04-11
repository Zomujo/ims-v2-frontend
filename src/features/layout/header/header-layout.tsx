import {
  NotificationButton,
  UserProfileButton,
} from "./header-layout-components-server";
import { ReportIncidentButton } from "./header-layout-components-client";

export function HeaderLayout() {
  return (
    <header className="fixed top-0 right-0 z-5 flex h-(--header-height) w-[calc(100%-18rem)] items-center justify-end bg-white pr-6">
      <HeaderLayoutUIActions />
    </header>
  );
}

function HeaderLayoutUIActions() {
  return (
    <div className="flex items-center gap-x-6">
      <ReportIncidentButton />
      <NotificationButton />
      <UserProfileButton />
    </div>
  );
}
