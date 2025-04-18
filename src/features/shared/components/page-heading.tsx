"use client";
import { settingPagesDescription } from "@/features/settings/settings.data";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type TitleFromPath = keyof typeof settingPagesDescription;

export default function PageHeading({
  routeLevel = 1,
  id = "",
}: Readonly<{ routeLevel?: number; id?: string }>) {
  const pathname = usePathname();
  const titleFromPath = pathname.split("/")[routeLevel];
  const title =
    settingPagesDescription[titleFromPath as TitleFromPath]?.title ??
    titleFromPath;
  const description =
    settingPagesDescription[titleFromPath as TitleFromPath]?.description ?? "";
  return (
    <>
      <h2
        className={cn("text-2xl font-bold text-[#111111] capitalize", {
          "text-xl": routeLevel === 2,
        })}
      >
        {id ? "Edit" : title.replace(/-/g, " ")}
      </h2>
      {description && (
        <p className="mt-4 text-sm text-gray-500">{description}</p>
      )}
    </>
  );
}
