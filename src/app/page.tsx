import { DynamicPagination } from "@/features/shared/components/pagination";
import Search from "@/features/shared/components/search";

export default function Home() {
  return (
    <main className="py-12">
      <div className="mx-auto w-full max-w-5xl space-y-5">
        <DynamicPagination totalPages={14} />
        <Search placeholder="Search Category" />
      </div>
    </main>
  );
}
