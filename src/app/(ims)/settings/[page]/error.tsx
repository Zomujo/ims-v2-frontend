"use client";

export default function ErrorPage({
  error,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <section className="relative w-full rounded-2xl bg-white p-8">
      <h1 className="text-4xl font-bold text-red-600">Error</h1>
      <p className="mt-4 text-lg text-gray-700">
        An error occurred while loading the page.
      </p>
    </section>
  );
}
