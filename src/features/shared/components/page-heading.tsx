"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { usePageHeading } from "@/hooks/usePageHeading";
import { useSessionData } from "@/hooks/useSessionData";
import { format } from "date-fns";
import { RotateCw } from "lucide-react";

export default function PageHeading({
  routeLevel = 1,
  id = "",
}: Readonly<{ routeLevel?: number; id?: string }>) {
  const pathname = usePathname();
  const router = useRouter();

  const { firstName } = useSessionData();
  const titleFromPath = pathname.split("/")[routeLevel];
  const { title, description } = usePageHeading(
    titleFromPath.replace(/-/g, " "),
    "",
  );

  return (
    <>
      {title === "dashboard" ? (
        <div>
          <h2
            className={cn("text-2xl font-bold text-[#111111] capitalize", {
              "text-xl": routeLevel === 2,
            })}
          >
            Welcome {firstName}
          </h2>
          <div className="mt-4 flex gap-2 text-gray-500">
            <span>{format(new Date(), "EEEE, MMMM d, yyyy")}</span>
            <RotateCw
              onClick={() => router.refresh()}
              className="hover:bg-primary cursor-pointer rounded-full bg-gray-200 p-1 text-sm"
            />
          </div>
        </div>
      ) : (
        <h2
          className={cn("text-2xl font-bold text-[#111111] capitalize", {
            "text-xl": routeLevel === 2,
          })}
        >
          {id ? "Edit" : title}
        </h2>
      )}
      {description && (
        <p className="mt-4 text-sm text-gray-500">{description}</p>
      )}
    </>
  );
}
