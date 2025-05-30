import { useSearchParams } from "next/navigation";

export default function useImsSearchParams() {
  const searchParams = useSearchParams();

  const getSearchParams = (key: string) => {
    const params = searchParams.get(key);
    return params ?? "";
  };

  const getArraySearchParams = (key: string) => {
    const params = searchParams.getAll(key);
    return params ?? [];
  };

  const updateSearchParams = (
    action: (queryParams: URLSearchParams) => void,
  ) => {
    const params = new URLSearchParams(window.location.search);
    action(params);
    window.history.replaceState({}, "", `?${params.toString()}`);
  };

  const removeSearchParams = (key: string) => {
    updateSearchParams((params) => params.delete(key));
  };

  const setSearchParams = ({ key, value }: { key: string; value: string }) => {
    updateSearchParams((params) => params.set(key, value));
  };

  const setArraySearchParams = ({
    key,
    values,
  }: {
    key: string;
    values: (string | number)[];
  }) => {
    updateSearchParams((params) => {
      params.delete(key);

      values.forEach((value) => {
        params.append(key, value.toString());
      });
    });
  };

  return {
    getSearchParams,
    setSearchParams,
    removeSearchParams,
    setArraySearchParams,
    getArraySearchParams,
  };
}
