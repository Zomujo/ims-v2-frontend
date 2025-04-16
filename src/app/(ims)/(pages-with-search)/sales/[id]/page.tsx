import { PageBreadcrumb } from "@/features/sales/sales-component-client";
import SalesRecord from "@/features/sales/sales-record";
import PageHeading from "@/features/shared/components/page-heading";

export default async function NewSalePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <PageHeading id={id} routeLevel={2} />
      <PageBreadcrumb />
      <SalesRecord />
    </>
  );
}
