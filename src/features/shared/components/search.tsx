"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/features/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";

const Search = ({ placeholder = "Search" }: { placeholder?: string }) => {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [search, searchParams, router]);

  return (
    <div className="flex h-auto w-full max-w-xl items-center justify-start gap-2 rounded-[10px] border-[1px] bg-[#F4F7FA] px-4 py-2">
      <SearchIcon size={20} className="text-[#64748B]" />

      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        aria-placeholder={placeholder}
        className="border-0 !px-0 !text-[16px] text-[#64748B] focus:outline-0"
      />
    </div>
  );
};

export default Search;
