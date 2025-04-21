import { PAGE_ROUTES } from "@/lib/constant";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(PAGE_ROUTES.DASHBOARD);
}
