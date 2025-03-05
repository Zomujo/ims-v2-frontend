import { DynamicPagination } from "@/features/shared/pagination";

export default function Home() {
  return (
    <main>
      <h1 className="text-red-900">Hello World</h1>
      <DynamicPagination totalPages={14} />
    </main>
  );
}
