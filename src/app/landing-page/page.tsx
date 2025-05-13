import Home from "@/app/landing-page/home";
import OptimizeInventory from "@/app/landing-page/optimize";

export default function LandingPage() {
  return (
    <div className="flex h-auto w-full flex-col">
      <Home />
      <OptimizeInventory />
    </div>
  );
}
