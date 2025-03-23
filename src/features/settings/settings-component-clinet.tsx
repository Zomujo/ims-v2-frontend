"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { ButtonLink } from "../shared/components/button-link";
import { settingsSidebarNavItems } from "./settings.data";
import { Dispatch, SetStateAction } from "react";
import { ImsButton } from "../shared/components/ims-button";

export function SettingsSidebar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="flex h-full w-85 flex-col gap-y-1 rounded-2xl bg-white px-5 py-7">
      {settingsSidebarNavItems.map((item) => {
        return (
          <ButtonLink
            href={item.href}
            key={item.href}
            variant="ghost"
            className={cn(
              "flex items-center justify-start gap-x-2 rounded-xl p-0 py-6 pl-3 text-gray-500 hover:bg-[#EBF2FF]",
              {
                "bg-[#EBF2FF] text-black": pathname.includes(item.href),
              },
            )}
          >
            <Icon
              icon={item.icon}
              speed={20}
              className={cn("hover:text-[#415BE6]", {
                "text-[#415BE6]": pathname.includes(item.href),
              })}
            />
            {item.label}
          </ButtonLink>
        );
      })}
    </nav>
  );
}

export function SettingsFromActions({
  isSubmitting,
  setEidtForm,
  editForm,
}: Readonly<{
  isSubmitting: boolean;
  editForm: boolean;
  setEidtForm: Dispatch<SetStateAction<boolean>>;
}>) {
  return (
    <div className="absolute top-0 right-0 flex gap-4">
      {!editForm && (
        <ImsButton
          startIcon={<Icon icon="hugeicons:edit-01" />}
          isLoading={isSubmitting}
          isLoadingLabel="Logging in..."
          variant="outline"
          type="button"
          onClick={() => setEidtForm((prev) => !prev)}
        >
          Edit
        </ImsButton>
      )}
      {editForm && (
        <>
          <ImsButton
            isLoading={isSubmitting}
            isLoadingLabel="Logging in..."
            variant="ghost"
            className="order-last cursor-pointer justify-self-end bg-red-50 text-red-600 hover:bg-red-600 hover:text-white md:order-none"
            type="reset"
            onClick={() => {
              setEidtForm((prev) => !prev);
            }}
          >
            Discard
          </ImsButton>
          <ImsButton
            isLoading={isSubmitting}
            isLoadingLabel="Logging in..."
            variant="ghost"
            className="bg-ims-blue-300 hover:bg-ims-blue-200 dark:bg-ims-blue-300 dark:hover:bg-ims-blue-300/80 order-last cursor-pointer justify-self-end text-white hover:text-white md:order-none"
            type="submit"
          >
            Save
          </ImsButton>
        </>
      )}
    </div>
  );
}
