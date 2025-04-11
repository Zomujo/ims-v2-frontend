import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import { ButtonLink } from "./button-link";

type ImsNavTabProps = {
  label: string;
  icon: string;
  href: string;
};
export default function ImsNavTab({
  href,
  icon,
  label,
}: Readonly<ImsNavTabProps>) {
  const pathname = usePathname();
  return (
    <ButtonLink
      href={href}
      key={href}
      variant="ghost"
      className={cn(
        "flex items-center justify-start gap-x-2 rounded-xl p-0 py-6 pl-3 text-gray-500 hover:bg-[#EBF2FF]",
        {
          "bg-[#EBF2FF] text-black": pathname.includes(href),
        },
      )}
    >
      <Icon
        icon={icon}
        speed={20}
        className={cn("hover:text-[#415BE6]", {
          "text-[#415BE6]": pathname.includes(href),
        })}
      />
      <span>{label}</span>
    </ButtonLink>
  );
}
