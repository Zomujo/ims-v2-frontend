"use client";
import { handleRequestState } from "@/lib/utils";
import {
  addDepartmentRequest,
  deleteDepartmentRequest,
  getDepartmentItemRequests,
  getDepartmentRequest,
  getDepartmentRequests,
  updateDepartmentRequest,
  updateRequestStatus,
} from "../shared/actions/department-request.actions";
import CrudPage from "../shared/components/crud-page";
import useFetchData from "../shared/hooks/use-fetch-data";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { CRUDACTION } from "../shared/types/utitls.types";
import { ScrollArea } from "../ui/scroll-area";
import { departmentRequestListTableColumns } from "./department-request.data";
import { useSessionData } from "@/hooks/useSessionData";
import {
  PermissionModules,
  UserRole,
} from "@features/shared/types/auth-action.types";
import { ImsForm } from "@features/shared/components/ims-forms";
import LoadingOverlay from "@features/ui/loadingOverlay";
import { useEffect, useState } from "react";
import useHookForm from "@features/shared/hooks/use-hook-form";
import { departmentRequestSchema } from "@features/department-request/department-request.schemas";
import { ImsButton } from "@features/shared/components/ims-button";
import HookFormField, {
  inputTypeNumber,
} from "@features/shared/components/hook-form-filed";
import { ImsSelect } from "@features/shared/components/ims-select";
import {
  CreateDepartmentRequestDto,
  IdData,
  RequestStatus,
} from "@features/shared/types/action.types";
import { Input } from "@features/ui/input";
import { Textarea } from "@features/ui/textarea";
import useImsSearchParams from "@features/shared/hooks/use-ims-search-params";
import { UI_STATE } from "@/lib/constant";
import { CacheKey } from "@/lib/cache/cache-data";

type DepartmentRequestProps = {
  items: IdData[];
};
export default function DepartmentRequestList({
  items,
}: DepartmentRequestProps) {
  const { canWrite, canDelete, role } = useSessionData();
  const [openModal, setOpenModal] = useState(false);
  const [modalActionProperties, setModalActionProperties] = useState({
    label: "Accept",
    crudAction: CRUDACTION.ACCEPT,
  });
  const { data, refetch, loading } = useFetchData({
    fetchFn:
      role === UserRole.CentralAdmin
        ? getDepartmentRequests
        : getDepartmentItemRequests,
    cacheKey: `${CacheKey.DepartmentRequestList}-${role}`,
  });

  const requests = data?.rows ?? [];
  const {
    state,
    isEditMode,
    getData,
    getId,
    removeSearchParams,
    handleEditBtnClicked,
    handleRemoveQueryparam,
    handleActionBtnClicked,
  } = usePageCRUD({ data: requests });

  useEffect(() => {
    refetch();
  }, [role]);

  const handleDelete = async (id: string) => {
    const res = deleteDepartmentRequest(id);
    setOpenModal(false);
    handleRequestState({ res, loadingMsg: "Deleting Request...." });
    res.then(() => {
      removeSearchParams(CRUDACTION.DELETE);
    });
    await res;
  };

  const handleStatusChange = async (
    id: string,
    status: RequestStatus,
    action: CRUDACTION,
  ) => {
    const res = updateRequestStatus(id, status);
    setOpenModal(false);
    const loadingMessageMap: Partial<Record<RequestStatus, string>> = {
      [RequestStatus.ACCEPTED]: "Accepting Request....",
      [RequestStatus.CANCELLED]: "Declining Request....",
      [RequestStatus.DELIVERED]: "Delivering Request....",
    };
    handleRequestState({
      res,
      loadingMsg: loadingMessageMap[status],
    });
    res.then(() => {
      removeSearchParams(action);
    });
    await res;
  };

  function handleAction(action: CRUDACTION, id: string) {
    setOpenModal(true);

    switch (action) {
      case CRUDACTION.ACCEPT:
        handleActionBtnClicked({ action: CRUDACTION.ACCEPT, id });
        setModalActionProperties({
          label: "Accept",
          crudAction: CRUDACTION.ACCEPT,
        });
        break;
      case CRUDACTION.DECLINE:
        handleActionBtnClicked({ action: CRUDACTION.DECLINE, id });
        setModalActionProperties({
          label: "Decline",
          crudAction: CRUDACTION.DECLINE,
        });
        break;
      case CRUDACTION.DELIVERED:
        handleActionBtnClicked({ action: CRUDACTION.DELIVERED, id });
        setModalActionProperties({
          label: "Delivered",
          crudAction: CRUDACTION.DELIVERED,
        });
        break;
      case CRUDACTION.DELETE:
        handleActionBtnClicked({ action: CRUDACTION.DELETE, id });
        setModalActionProperties({
          label: "Delete",
          crudAction: CRUDACTION.DELETE,
        });
        break;
    }
  }

  const handleModalAction = async (action: CRUDACTION) => {
    const id = getId(action);
    switch (action) {
      case CRUDACTION.DELETE:
        void handleDelete(id);
        break;
      case CRUDACTION.ACCEPT:
        void handleStatusChange(id, RequestStatus.ACCEPTED, action);
        break;
      case CRUDACTION.DECLINE:
        void handleStatusChange(id, RequestStatus.CANCELLED, action);
        break;
      case CRUDACTION.DELIVERED:
        void handleStatusChange(id, RequestStatus.DELIVERED, action);
        break;
    }
  };

  return (
    <ScrollArea className="mt-2 h-[calc(100%-5rem)] rounded-2xl bg-white pr-4">
      <CrudPage
        moduleName="department requests"
        data={requests}
        isLoading={role === undefined || loading}
        handleRemoveQueryparam={handleRemoveQueryparam}
        modalAction={() => handleModalAction(modalActionProperties.crudAction)}
        modalActionLabel={modalActionProperties.label}
        closeModal={() => setOpenModal(false)}
        currentDataDisplayName={getData(CRUDACTION.DELETE)?.requestNumber ?? ""}
        tableColumns={
          role === UserRole.CentralAdmin
            ? departmentRequestListTableColumns
            : departmentRequestListTableColumns.slice(1)
        }
        totalPages={data?.totalPages ?? 0}
        state={state}
        openModal={openModal}
        isEditMode={isEditMode}
        actions={(item) => [
          {
            label: "edit",
            icon: "lucide:edit-2",
            action: () => handleEditBtnClicked(item),
            hide:
              item.status !== RequestStatus.PENDING ||
              !canWrite(PermissionModules.DEPARTMENT_REQUESTS),
          },
          {
            label: "delete",
            icon: "solar:trash-bin-trash-line-duotone",
            type: "destructive",
            action: () => handleAction(CRUDACTION.DELETE, item.id),
            hide:
              role === UserRole.CentralAdmin ||
              item.status !== RequestStatus.PENDING ||
              !canDelete(PermissionModules.DEPARTMENT_REQUESTS),
          },
          {
            label: "accept",
            icon: "solar:power-bold-duotone",
            action: () => handleAction(CRUDACTION.ACCEPT, item.id),
            hide:
              role !== UserRole.CentralAdmin ||
              item.status !== RequestStatus.PENDING ||
              !canWrite(PermissionModules.DEPARTMENT_REQUESTS),
          },
          {
            label: "Cancel",
            icon: "solar:power-bold-duotone",
            type: "destructive",
            action: () => handleAction(CRUDACTION.DECLINE, item.id),
            hide:
              item.status === RequestStatus.DELIVERED ||
              !canWrite(PermissionModules.DEPARTMENT_REQUESTS),
          },
          {
            label: "delivered",
            icon: "solar:power-bold-duotone",
            action: () => handleAction(CRUDACTION.DELIVERED, item.id),
            hide:
              role !== UserRole.CentralAdmin ||
              item.status !== RequestStatus.ACCEPTED ||
              !canWrite(PermissionModules.DEPARTMENT_REQUESTS),
          },
        ]}
      >
        <DepartmentRequestForm
          isEditMode={isEditMode}
          requestId={getId(CRUDACTION.EDIT)}
          items={items}
        />
      </CrudPage>
    </ScrollArea>
  );
}

export function DepartmentRequestForm({
  isEditMode,
  requestId,
  items,
}: Readonly<{
  isEditMode?: boolean;
  requestId?: string;
  items: IdData[];
}>) {
  const { removeSearchParams } = useImsSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const form = useHookForm({
    resolver: departmentRequestSchema,
    defaultValues: { itemId: "", quantity: 0, additionalNotes: "" },
  });

  const handleSubmit = async (data: unknown) => {
    const res =
      isEditMode && requestId
        ? updateDepartmentRequest(requestId, data as CreateDepartmentRequestDto)
        : addDepartmentRequest(data as CreateDepartmentRequestDto);
    handleRequestState({
      res,
      loadingMsg: isEditMode
        ? "Updating department request..."
        : "Creating department request...",
    });
    await res;
    removeSearchParams(UI_STATE);
  };

  useEffect(() => {
    const fetchRequest = async () => {
      if (!requestId) return;
      setIsLoading(true);
      const { data } = await getDepartmentRequest(requestId);
      if (data) {
        form.reset({
          itemId: data.item.id,
          quantity: data.quantity,
          additionalNotes: data.additionalNotes,
        });
      }
      setIsLoading(false);
    };
    if (isEditMode && requestId) {
      void fetchRequest();
    }
  }, []);

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <ImsForm
        className="overflow-y-auto [&>*]:px-4"
        form={form}
        handleAuthSubmit={handleSubmit}
        RenderActions={
          <div className="flex w-full gap-4">
            <ImsButton
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              className="flex-1"
              isLoading={form.formState.isSubmitting}
              isLoadingLabel={
                isEditMode ? "Updating Request" : "Adding Request..."
              }
              variant="imsPrimary"
              type="submit"
            >
              Add Request
            </ImsButton>
          </div>
        }
        RenderInputs={
          <>
            <HookFormField
              formControl={form.control}
              name="itemId"
              label="Item"
              renderInput={({ field }) => (
                <ImsSelect
                  options={(items ?? []).map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))}
                  moduleName="item category"
                  {...field}
                  className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
                />
              )}
            />
            <HookFormField
              formControl={form.control}
              name="quantity"
              label="Quantity"
              renderInput={({ field }) => (
                <Input
                  {...inputTypeNumber(field)}
                  type="number"
                  className="focus-visible:ring-ims-blue-300 bg-white"
                />
              )}
            />
            <HookFormField
              formControl={form.control}
              name="additionalNotes"
              label="Additional Notes"
              renderInput={({ field }) => (
                <Textarea
                  {...field}
                  className="focus-visible:ring-ims-blue-300 bg-white"
                  placeholder="Add notes"
                />
              )}
            />
          </>
        }
      />
    </>
  );
}
