import Home from "@/app/landing-page/home";
import OptimizeInventory from "@/app/landing-page/optimize";
import Features from "@/app/landing-page/features";
import Pricing from "@/app/landing-page/pricing";
import Reviews from "@/app/landing-page/reviews";

export default function LandingPage() {
  return (
    <div className="flex h-auto w-full flex-col">
      <Home />
      <OptimizeInventory />
      <Features />
      <Pricing />
      <Reviews />
    </div>
  );
}
