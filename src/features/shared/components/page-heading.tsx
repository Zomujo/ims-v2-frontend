"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { usePageHeading } from "@/hooks/usePageHeading";

export default function PageHeading({
  routeLevel = 1,
  id = "",
}: Readonly<{ routeLevel?: number; id?: string }>) {
  const pathname = usePathname();
  const titleFromPath = pathname.split("/")[routeLevel];
  const { title, description } = usePageHeading(
    titleFromPath.replace(/-/g, " "),
    "",
  );

  return (
    <>
      <h2
        className={cn("text-2xl font-bold text-[#111111] capitalize", {
          "text-xl": routeLevel === 2,
        })}
      >
        {id ? "Edit" : title}
      </h2>
      {description && (
        <p className="mt-4 text-sm text-gray-500">{description}</p>
      )}
    </>
  );
}
