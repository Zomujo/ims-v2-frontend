import { CrudPageProps } from "@/features/settings/settings.types";
import { PropsWithChildren } from "react";
import { CRUDACTION } from "../types/utitls.types";
import ImsAlertModal from "./ims-alert-modal";
import { ImsButton } from "./ims-button";
import { IMSDataTable } from "./ims-data-table";
import { ImsSheet } from "./ims-sheet";
import ImsDropdownMenu from "./ims-drop-down-menu";
import { Button } from "@/features/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

export default function CrudPage<T>({
  children,
  data,
  state,
  totalPages,
  isEditMode,
  tableColumns,
  openModal,
  currentDataDisplayName,
  actions,
  modalActionLabel,
  moduleName,
  modalAction,
  handleRemoveQueryparam,
  isLoading,
  closeModal,
  alertModalOnChange = true,
}: Readonly<PropsWithChildren<CrudPageProps<T>>>) {
  const allColumns = tableColumns.concat(getActionColumn({ actions }));
  return (
    <>
      <ImsSheet
        open={state === CRUDACTION.CREATE || isEditMode}
        onOpenChange={handleRemoveQueryparam}
        title={isEditMode ? `Edit ${moduleName}` : `Add new ${moduleName}`}
        description={
          isEditMode ? `Edit ${moduleName} details` : `Create new ${moduleName}`
        }
      >
        {children}
      </ImsSheet>
      <IMSDataTable<T, unknown>
        columns={allColumns}
        data={data}
        totalPages={totalPages}
        isLoading={isLoading}
      />
      <ImsAlertModal
        open={openModal || state?.includes("delete")}
        onOpenChange={alertModalOnChange ? handleRemoveQueryparam : undefined}
        title={modalActionLabel ?? "Delete"}
        description={
          <>
            Are you sure you want to{" "}
            {modalActionLabel?.toLocaleLowerCase() ?? "delete"}{" "}
            <b>{currentDataDisplayName}?</b> <br />
            This action cannot be undone.
          </>
        }
        actionNode={
          <ImsButton onClick={modalAction} variant="destructive">
            {modalActionLabel ?? "Delete"}
          </ImsButton>
        }
        cancelNode={<button onClick={closeModal}>Cancel</button>}
      />
    </>
  );
}

const getActionColumn = <TData, TValue>({
  actions,
}: Readonly<{
  actions: CrudPageProps<TData>["actions"];
}>): ColumnDef<TData, TValue> => {
  return {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const item = row.original;
      const actualActions = (actions(item) ?? []).filter(Boolean);
      return (
        <ImsDropdownMenu
          trigger={
            actualActions.length ? (
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            ) : (
              <div></div>
            )
          }
          align="start"
          menuItems={(actions(item) ?? [])
            .filter((obj) => obj)
            .map((actionItem) => {
              return {
                id: actionItem?.label ?? "",
                node: (
                  <Button
                    type="button"
                    className={cn(
                      "flex w-full justify-start rounded-none p-0 py-3 pl-3 capitalize",
                      {
                        "text-ims-red-300 hover:!text-ims-red-300":
                          actionItem?.type === "destructive",
                      },
                    )}
                    variant="ghost"
                    onClick={() => actionItem?.action()}
                  >
                    <Icon
                      className={cn({
                        "text-ims-red-300": actionItem?.type === "destructive",
                      })}
                      icon={actionItem?.icon ?? ""}
                    />
                    {actionItem?.label}
                  </Button>
                ),
              };
            })}
        />
      );
    },
  };
};
