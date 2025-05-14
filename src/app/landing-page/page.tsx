import Home from "@/app/landing-page/home";
import OptimizeInventory from "@/app/landing-page/optimize";
import Features from "@/app/landing-page/features";

export default function LandingPage() {
  return (
    <div className="flex h-auto w-full flex-col">
      <Home />
      <OptimizeInventory />
      <Features />
    </div>
  );
}
