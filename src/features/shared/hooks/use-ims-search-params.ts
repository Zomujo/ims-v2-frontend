import { useSearchParams } from "next/navigation";

export default function useImsSearchParams() {
  const searchParams = useSearchParams();

  const getSearchParams = (key: string) => {
    const params = searchParams.get(key);
    return params ?? "";
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

  return {
    getSearchParams,
    setSearchParams,
    removeSearchParams,
  };
}
