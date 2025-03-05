import { DynamicPagination } from "@/features/shared/components/pagination";

export default function Home() {
  return (
    <main>
      <h1 className="text-red-900">Hello World</h1>
      <div className="w-full max-w-5xl">
        <DynamicPagination totalPages={14} />
      </div>
    </main>
  );
}
