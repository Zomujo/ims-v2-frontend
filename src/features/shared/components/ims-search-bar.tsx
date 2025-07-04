"use client";
import { Input } from "@/features/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useRef, ChangeEvent } from "react";
import { useDebounceCallback } from "usehooks-ts";
import useImsSearchParams from "../hooks/use-ims-search-params";
import { cn } from "@/lib/utils";

const searchParamKey = "search";
export default function ImsSearchBar({
  placeholder = "Search",
  className,
}: Readonly<{ placeholder?: string; className?: string }>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setSearchParams, removeSearchParams, getSearchParams } =
    useImsSearchParams();

  const searchValue = getSearchParams(searchParamKey);

  const handleOnChange = useDebounceCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value = target.value;
      if (!value) {
        removeSearchParams(searchParamKey);
        return;
      }
      setSearchParams({ key: searchParamKey, value });
    },
    500,
  );

  const handleClearSearch = () => {
    removeSearchParams(searchParamKey);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };
  return (
    <div
      className={cn("relative flex w-full max-w-sm items-center", className)}
    >
      <SearchIcon size={20} className="z-5 -mr-8 text-gray-500" />
      <Input
        ref={inputRef}
        type="text"
        defaultValue={searchValue}
        onChange={handleOnChange}
        placeholder={placeholder}
        aria-placeholder={placeholder}
        className="h-10 w-sm bg-[#F4F7FA] pr-8 pl-9 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-gray-200"
      />
      {searchValue && (
        <button
          onClick={handleClearSearch}
          className="absolute right-2 z-5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-600 active:scale-90"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
