"use client";
import { settingPagesDescription } from "@/features/settings/settings.data";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type TitleFromPath = keyof typeof settingPagesDescription;

export default function PageHeading({
  routeLevel = 1,
}: Readonly<{ routeLevel?: number }>) {
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
        className={cn("text-3xl font-bold text-[#111111] capitalize", {
          "text-2xl": routeLevel === 2,
        })}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm text-gray-500">{description}</p>
      )}
    </>
  );
}
