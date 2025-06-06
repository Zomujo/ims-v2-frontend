"use client";

import { PAGE_ROUTES } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { getItemsExpiry } from "../shared/actions/items.actions";
import CrudPage from "../shared/components/crud-page";
import useFetchData from "../shared/hooks/use-fetch-data";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { ScrollArea } from "../ui/scroll-area";
import { expiryItemsTableColumns } from "@features/expiry/expiry-items.data";

export default function ExpiryItemsList() {
  const router = useRouter();
  const { data, loading } = useFetchData({
    fetchFn: getItemsExpiry,
  });
  const expiryItems = data?.rows ?? [];
  const { state, isEditMode, handleRemoveQueryparam } = usePageCRUD({
    data: expiryItems,
  });

  const handleViewBatches = (id: string) => {
    router.push(PAGE_ROUTES.ITEMS.BATCHES.replace(":itemId", id));
  };

  return (
    <ScrollArea className="mt-2 h-[calc(100%-5rem)] rounded-2xl bg-white pr-4">
      <CrudPage
        moduleName="items"
        data={expiryItems}
        isLoading={loading}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={""}
        tableColumns={expiryItemsTableColumns}
        totalPages={0}
        state={state}
        isEditMode={isEditMode}
        actions={({ item }) => [
          {
            label: "Go to batch",
            icon: "lucide:edit-2",
            action: () => handleViewBatches(item.id),
          },
        ]}
        modalAction={function (): void {
          throw new Error("Function not implemented.");
        }}
      ></CrudPage>
    </ScrollArea>
  );
}
