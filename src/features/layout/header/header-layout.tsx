import { ReportIncidentButton } from "./header-layout-components";

export function HeaderLayout() {
  return (
    <header className="b flex h-25 items-center justify-end bg-white pr-6 text-white">
      <HeaderLayoutUIActions />
    </header>
  );
}

function HeaderLayoutUIActions() {
  return (
    <div className="">
      <ReportIncidentButton />
    </div>
  );
}
