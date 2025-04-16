import { getStoredDataInQueryParam } from "@/lib/utils";
import React, { useEffect } from "react";
import { CRUDACTION, CrudAction } from "../types/utitls.types";
import useImsSearchParams from "./use-ims-search-params";

type UsePageCRUDProps<T, K> = {
  data: T[];
  getSingleDataFn?: ({ id }: { id: string }) => Promise<K>;
};
const UI_STATE = "state";
export default function usePageCRUD<
  T extends { id: string },
  K extends { id: string } = T,
>({ data, getSingleDataFn }: Readonly<UsePageCRUDProps<T, K>>) {
  const [singleData, setSingleData] = React.useState<K | null>(null);
  const { getSearchParams, removeSearchParams, setSearchParams } =
    useImsSearchParams();

  const state = getSearchParams(UI_STATE);
  const isEditMode = state?.includes(CRUDACTION.EDIT);
  const isViewMode = state?.includes(CRUDACTION.VIEW);
  const getId = (action?: CrudAction) => {
    if (!action) return state?.split("-")[1];
    return getStoredDataInQueryParam({
      action,
      value: state,
    });
  };

  useEffect(() => {
    if (!getSingleDataFn) return;
    const getSingleData = async () => {
      const id = isEditMode ? getId(CRUDACTION.EDIT) : getId(CRUDACTION.VIEW);
      if (isEditMode || isViewMode) {
        setSingleData(null);
        const res = await getSingleDataFn({ id });
        setSingleData(res);
      } else {
        setSingleData(null);
      }
    };
    getSingleData();
  }, [isEditMode, isViewMode]);

  const getData = (action?: CrudAction) => {
    return data.find((item) => item.id === getId(action));
  };
  const getDataById = (id: string) => {
    return data.find((item) => item.id === id);
  };
  const handleEditBtnClicked = ({ id }: T) => {
    setSearchParams({ key: UI_STATE, value: `${CRUDACTION.EDIT}-${id}` });
  };
  const handleDeleteBtnClicked = ({ id }: T) => {
    setSearchParams({ key: UI_STATE, value: `${CRUDACTION.DELETE}-${id}` });
  };

  const handleActionBtnClicked = ({
    action,
    id,
  }: {
    action: CrudAction;
    id: string;
  }) => {
    setSearchParams({ key: UI_STATE, value: `${action}-${id}` });
  };
  const handleRemoveQueryparam = (e: boolean) => {
    if (!e && state) {
      removeSearchParams(UI_STATE);
    }
  };
  return {
    isEditMode,
    isViewMode,
    singleData,
    state,
    getId,
    getDataById,
    getData,
    handleEditBtnClicked,
    handleDeleteBtnClicked,
    handleRemoveQueryparam,
    handleActionBtnClicked,
    setSearchParams,
    removeSearchParams,
  };
}
