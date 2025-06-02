import NavigationBar from "@features/home/navigation-bar";
import Hero from "@features/home/hero";
import styles from "./home.module.css";
import { cn } from "@/lib/utils";
import OptimizeInventory from "@features/home/optimize";
import Features from "@features/home/features";
import Pricing from "@/features/home/pricing";
import Reviews from "@features/home/reviews";
import Faq from "@features/home/faq";
import Contact from "@features/home/contact";
import Footer from "@features/home/footer";

const Home = () => {
  return (
    <div>
      <div className={cn(styles.homeBackground, "xl:px-[150px]")}>
        <NavigationBar />
        <Hero />
      </div>
      <OptimizeInventory />
      <Features />
      <Pricing />
      <Reviews />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
